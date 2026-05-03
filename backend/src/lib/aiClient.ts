import { GoogleGenAI } from '@google/genai';

// Module-level singleton — lazy so tests can inject a mock before first use
let _instance: GoogleGenAI | null = null;

/** Returns the shared AI client, creating it on first call. */
export function getAIClient(): GoogleGenAI {
  if (!_instance) {
    _instance = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
  }
  return _instance;
}

/** Tests: inject a mock client (call before the route handler runs). */
export function setAIClient(client: GoogleGenAI): void {
  _instance = client;
}

/** Tests: reset so the next call creates a fresh real client. */
export function resetAIClient(): void {
  _instance = null;
}
