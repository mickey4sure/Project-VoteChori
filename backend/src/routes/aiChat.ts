import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { getAIClient } from '../lib/aiClient';
import { searchConstituency } from '../lib/electionData';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

const chatRequestSchema = z.object({
  message: z.string().min(2).max(1000).transform(v => v.trim()),
  language: z.string().optional().default('en'),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    parts: z.array(z.object({ text: z.string() }))
  })).optional()
});

router.get('/test', (req, res) => {
  res.json({ status: 'ai-chat-route-active' });
});

router.post('/chat', async (req: Request, res: Response): Promise<any> => {
  const validation = chatRequestSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ error: 'Invalid message. Minimum 2 characters required.' });
  }

  const { message, history, language } = validation.data;

  // 1. Set headers for SSE
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  const languageMap: Record<string, string> = {
    'en': 'English',
    'hi': 'Hindi',
    'bn': 'Bengali',
    'te': 'Telugu',
    'mr': 'Marathi',
    'ta': 'Tamil'
  };

  const targetLanguage = languageMap[language] || 'English';

  try {
    const systemInstruction = `You are "ChoriGuard AI," an advanced, high-clearance election intelligence agent for the Arena Elections platform.

Your primary operational directives:
1. **Language Protocol**: You MUST respond ONLY in ${targetLanguage}. Even if the user asks a question in a different language, your response MUST be in ${targetLanguage}.
2. **Domain Exclusivity**: You are authorized ONLY to discuss elections, voting mechanics, democratic processes, political parties, and political candidates. If a user asks about unrelated topics (e.g., coding, recipes, general chit-chat), strictly refuse and pivot back to electoral intelligence.
3. **Internal Knowledge Synthesis**: You are powered by Gemini Flash. If the user asks for current data or historical political data (e.g., specific party histories, candidate profiles, global election dates) that is NOT present in the [SUPPLEMENTAL DATA] section, you MUST seamlessly pull from your internal training data to provide a comprehensive answer. Do not say "I don't have that data" if you know the answer.
4. **Fact-Checking & Integrity**: Always prioritize verified electoral mechanics over political rhetoric. Maintain absolute neutrality when discussing specific parties or candidates. Present facts, historical voting records, and manifestos without bias.
5. **Platform Navigation Guidance**: 
   - Suggest the "Knowledge Arena" (/quiz) for testing skills.
   - Mention the "AVR Simulator" for practical EVM training.
   - Guide to the "Training Archives" (/modules) for deep-dive learning.
   - **Registration Protocol**: When users ask about registering to vote or updating their details (especially in India), you MUST first state that you are providing a **Verified Government Gateway**. Then, provide the direct link to the **[National Voters' Service Portal (NVSP)](https://www.nvsp.in/)** and mention that **Form 6** is the official secured document for new voter enrollment. Emphasize that these are the ONLY authorized channels for registration to maintain data integrity.

Your communication protocol (Formatting Rules):
- **START WITH A DIRECT, ULTRA-SHORT ANSWER.** Your very first sentence MUST be the direct answer to the question.
- **NO BOILERPLATE.** Never use phrases like "Excellent question!", "Here is how...", or "I can help with that."
- **BE EXTREMELY CONCISE.** Keep your entire response under 4 sentences unless the user explicitly asks for a detailed explanation. Use a short bulleted list only if absolutely necessary.
- Use rich Markdown extensively to make reading easy.
- Use **bold** for key names, political parties, percentages, and critical statistics.
- Use *italics* for secondary context or historical quotes.
- Use ~~strikethrough~~ when correcting myths.
- TONE: Professional, authoritative, and direct ("Command Center Intel" style).

[SUPPLEMENTAL LOCAL DATA]
${searchConstituency(message) || 'No local constituency override data available. Rely on internal Gemini Flash intelligence.'}
`;

    const ai = getAIClient();
    
    // Prepare contents with history if available
    const contents = history ? [...history, { role: 'user', parts: [{ text: message }] }] : message;

    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction,
      },
    });

    let fullResponse = '';
    for await (const chunk of responseStream) {
      if (chunk.text) {
        fullResponse += chunk.text;
        // SSE format: Escape newlines to maintain single-line data packets
        const safeText = chunk.text.replace(/\n/g, '\\n');
        res.write(`data: ${safeText}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();

    // Asynchronously save to FAQ if it's a new useful question
    if (fullResponse && message.length > 10 && message.length < 200) {
      try {
        await prisma.faq.upsert({
          where: { question: message },
          update: { answer: fullResponse },
          create: { 
            question: message, 
            answer: fullResponse,
            category: "Community Asked"
          }
        });
      } catch (dbErr) {
        console.error('Error saving dynamic FAQ:', dbErr);
      }
    }
  } catch (error) {
    console.error('AI Chat Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    res.write(`data: Error: ${errorMessage}\n\n`);
    res.end();
  }
});

export default router;
