import { Router, Request, Response } from 'express';
import { getPrisma } from '../lib/db';
import { factCheckRequestSchema } from '../validators/factCheckValidator';
import { getAIClient } from '../lib/aiClient';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.post('/stream', requireAuth, async (req: Request, res: Response): Promise<any> => {
  // 1. Validate payload using Zod
  const validationResult = factCheckRequestSchema.safeParse(req.body);
  if (!validationResult.success) {
    return res.status(400).json({ errors: validationResult.error.errors });
  }

  const { query } = validationResult.data;

  // 2. Set the proper SSE response headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  try {
    // 3. Query Prisma for known rumors to optionally augment AI (RAG)
    let knownFact = null;
    try {
      knownFact = await getPrisma().factCheck.findFirst({
        where: {
          rumorText: {
            contains: query,
            mode: 'insensitive', // Case-insensitive matching for PostgreSQL
          },
        },
      });
    } catch (dbError) {
      const errorMessage = dbError instanceof Error ? dbError.message : String(dbError);
      console.warn(
        'Prisma DB Warning: Could not connect to fetch RAG context. Falling back to default AI logic.',
        errorMessage,
      );
    }

    const aiPrompt =
      knownFact && knownFact.isVerified
        ? `User Query: ${query}\n\nContext from official database: ${knownFact.officialFact}`
        : query;

    // 4. Construct System Prompt & Call Gemini via Streaming
    const systemInstruction =
      'You are an Election Integrity Fact-Checker. You combat misinformation. You are unbiased. If asked about the EVM or VVPAT, explain how they guarantee secure voting. You must cite your logic.';

    const ai = getAIClient();
    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: aiPrompt,
      config: {
        systemInstruction,
      },
    });

    // 5. Iterate over the AI stream and write each chunk
    for await (const chunk of responseStream) {
      if (chunk.text) {
        const safeText = chunk.text.replace(/\n/g, '\\n');
        res.write(`data: ${safeText}\n\n`);
      }
    }

    // Close the stream when finished
    res.write('event: end\ndata: {}\n\n');
    res.end();
  } catch (error: any) {
    console.error('Fact check SSE error:', error);

    let errorMessage =
      'Error generating fact-check response. Please verify your API Key and backend connection.';

    if (error?.status === 403) {
      errorMessage =
        'API Access Denied: The Gemini API is not enabled for your Google Cloud Project. Please enable it in the GCP Console.';
    } else if (error?.status === 503 || (error?.message && error.message.includes('503'))) {
      errorMessage =
        'The Gemini AI model is currently experiencing high demand (Error 503). Please wait a moment and try again!';
    } else if (error?.message) {
      // Safely parse JSON error message if it's stringified
      try {
        const parsed = JSON.parse(error.message);
        if (parsed.error && parsed.error.message) {
          errorMessage = `API Error: ${parsed.error.message}`;
        } else {
          errorMessage = error.message;
        }
      } catch (_e) {
        errorMessage = `API Error: ${error.message}`;
      }
    }

    res.write(`data: ${errorMessage}\n\n`);
    res.end();
  }
});

export default router;
