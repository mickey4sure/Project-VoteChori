import { z } from 'zod';

export const factCheckRequestSchema = z.object({
  query: z
    .string({ required_error: 'query field is required.' })
    .min(10, 'Query must be at least 10 characters long.')
    .max(500, 'Query must be under 500 characters.')
    // Schema-level sanitization: trim edges, collapse whitespace runs
    // This is defense-in-depth — the sanitizeBody middleware already stripped
    // HTML/null-bytes before this runs, but .transform() guarantees it at the type level.
    .transform((val) => val.trim().replace(/\s+/g, ' ')),
});

/** Inferred type of a validated + sanitized fact-check request body */
export type FactCheckRequest = z.infer<typeof factCheckRequestSchema>;
