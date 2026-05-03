import dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// The real singleton — only created once in production/dev.
const _real: PrismaClient = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = _real;

/**
 * Holds the current Prisma client.
 * Tests can replace this with a mock via `setPrismaClient()`.
 */
let _client: PrismaClient = _real;

/** Returns the active Prisma client (real or test mock). */
export function getPrisma(): PrismaClient {
  return _client;
}

/** Tests: inject a mock client before the route handler runs. */
export function setPrismaClient(mock: PrismaClient): void {
  _client = mock;
}

/** Tests: restore the real Prisma client. */
export function resetPrismaClient(): void {
  _client = _real;
}

// Keep the named `prisma` export for backward compatibility with any code
// that already imports it directly — but note tests should use setPrismaClient.
export const prisma = _real;
