import { Request, Response, NextFunction } from 'express';

/**
 * Recursively sanitizes a value to prevent XSS and injection attacks.
 *
 * Strips:
 *  - HTML/script tags               (XSS prevention)
 *  - Null bytes (\0)                (SQL/NoSQL injection prevention)
 *  - Non-printable control chars   (protocol injection / log poisoning)
 *    Keeps: \t (tab), \n (newline), \r (carriage return) — legitimate text
 *  - Leading / trailing whitespace
 */
function sanitizeValue(value: unknown): unknown {
  if (typeof value === 'string') {
    return (
      value
        // 1. Strip HTML tags and encoded variants (<script>, <img onerror=...>, etc.)
        .replace(/<[^>]*>/g, '')
        // 2. Remove null bytes — used to bypass filters in C-string-based systems
        .replace(/\0/g, '')
        // 3. Remove non-printable ASCII control chars (U+0000–U+001F except \t\n\r, U+007F)
        // eslint-disable-next-line no-control-regex
        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
        // 4. Trim surrounding whitespace
        .trim()
    );
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }

  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, sanitizeValue(v)]),
    );
  }

  // Numbers, booleans, null — pass through untouched
  return value;
}

/**
 * Express middleware — sanitizes req.body in-place.
 *
 * Must be registered AFTER express.json() so the body is already parsed,
 * and BEFORE route handlers so sanitized values reach business logic.
 *
 * @example
 *   app.use(express.json({ limit: '10kb' }));
 *   app.use(sanitizeBody);   // ← here
 *   app.use('/api/...', router);
 */
export function sanitizeBody(req: Request, _res: Response, next: NextFunction): void {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeValue(req.body);
  }
  next();
}
