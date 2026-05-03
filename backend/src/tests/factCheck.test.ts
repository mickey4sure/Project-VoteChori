import { expect } from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import { GoogleGenAI } from '@google/genai';
import { setAIClient, resetAIClient } from '../lib/aiClient';
import { setPrismaClient, resetPrismaClient } from '../lib/db';
import { createApp } from '../app';

const VALID_BODY = { query: 'Are EVMs tampered?' };

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Minimal async-iterable that yields text chunks then done. */
function makeStream(chunks: string[]) {
  return {
    [Symbol.asyncIterator]() {
      let i = 0;
      return {
        async next() {
          if (i < chunks.length) return { value: { text: chunks[i++] }, done: false };
          return { value: undefined, done: true };
        },
      };
    },
  };
}

function mockAI(chunks: string[] = ['EVMs are secure.']) {
  return {
    models: { generateContentStream: sinon.stub().resolves(makeStream(chunks)) },
  };
}

/** Fake Prisma client whose factCheck.findFirst resolves to `result`. */
function mockPrismaOk(result: any) {
  return {
    factCheck: { findFirst: sinon.stub().resolves(result) },
  } as any;
}

/** Fake Prisma client whose factCheck.findFirst rejects with `err`. */
function mockPrismaErr(err: Error) {
  return {
    factCheck: { findFirst: sinon.stub().rejects(err) },
  } as any;
}

/** Collects the full SSE body from a streaming response. */
async function sseRequest(
  app: any,
  body: object,
): Promise<{ status: number; headers: any; text: string }> {
  let text = '';
  const res = await (request(app) as any)
    .post('/api/fact-check/stream')
    .send(body)
    .buffer(true)
    .parse((response: any, cb: any) => {
      response.on('data', (c: Buffer) => {
        text += c.toString();
      });
      response.on('end', () => cb(null, text));
    });
  return { status: res.status, headers: res.headers, text };
}

// ── Test suite ────────────────────────────────────────────────────────────────

describe('POST /api/fact-check/stream', () => {
  afterEach(() => {
    resetAIClient();
    resetPrismaClient();
  });

  // ── SSE headers & status ──────────────────────────────────────────────────

  it('returns 200 with Content-Type: text/event-stream', async () => {
    setPrismaClient(mockPrismaOk(null));
    setAIClient(mockAI() as unknown as GoogleGenAI);
    const { status, headers } = await sseRequest(createApp(), VALID_BODY);
    expect(status).to.equal(200);
    expect(headers['content-type']).to.include('text/event-stream');
  });

  it('streams AI text chunks as SSE data events', async () => {
    setPrismaClient(mockPrismaOk(null));
    setAIClient(mockAI(['EVMs are secure.']) as unknown as GoogleGenAI);
    const { text } = await sseRequest(createApp(), VALID_BODY);
    expect(text).to.include('data: EVMs are secure.');
    expect(text).to.include('event: end');
  });

  // ── Validation ────────────────────────────────────────────────────────────

  it('returns 400 when query is missing', async () => {
    setPrismaClient(mockPrismaOk(null));
    setAIClient(mockAI() as unknown as GoogleGenAI);
    const res = await request(createApp()).post('/api/fact-check/stream').send({});
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('errors');
  });

  it('returns 400 when query is too short', async () => {
    setPrismaClient(mockPrismaOk(null));
    setAIClient(mockAI() as unknown as GoogleGenAI);
    const res = await request(createApp()).post('/api/fact-check/stream').send({ query: 'hi' });
    expect(res.status).to.equal(400);
  });

  // ── DB fallback ───────────────────────────────────────────────────────────

  it('continues streaming even if Prisma throws', async () => {
    setPrismaClient(mockPrismaErr(new Error('DB refused')));
    setAIClient(mockAI() as unknown as GoogleGenAI);
    const { text } = await sseRequest(createApp(), VALID_BODY);
    expect(text).to.include('data:');
    expect(text).to.include('event: end');
  });

  // ── RAG augmentation ──────────────────────────────────────────────────────

  it('augments AI prompt with DB fact when isVerified=true', async () => {
    const ai = mockAI(['Augmented response.']);
    setAIClient(ai as unknown as GoogleGenAI);
    setPrismaClient(
      mockPrismaOk({
        id: 1,
        rumorText: 'EVMs are tampered',
        officialFact: 'EVMs meet IS/EEC standards.',
        isVerified: true,
        createdAt: new Date(),
      }),
    );

    await sseRequest(createApp(), VALID_BODY);

    const args = ai.models.generateContentStream.firstCall.args[0];
    expect(args.contents).to.include('Context from official database');
    expect(args.contents).to.include('EVMs meet IS/EEC standards.');
  });

  it('does NOT augment prompt when isVerified=false', async () => {
    const ai = mockAI(['Plain response.']);
    setAIClient(ai as unknown as GoogleGenAI);
    setPrismaClient(
      mockPrismaOk({
        id: 2,
        rumorText: 'EVMs are tampered',
        officialFact: 'Some unverified fact.',
        isVerified: false,
        createdAt: new Date(),
      }),
    );

    await sseRequest(createApp(), VALID_BODY);

    const args = ai.models.generateContentStream.firstCall.args[0];
    expect(args.contents).to.equal(VALID_BODY.query);
  });
});
