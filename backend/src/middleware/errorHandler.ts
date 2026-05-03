import { Request, Response, NextFunction } from 'express';

/**
 * Shape of errors the app intentionally throws.
 * Business logic can do: throw Object.assign(new Error('msg'), { statusCode: 404 })
 */
interface AppError extends Error {
  statusCode?: number;
  status?: number;
  /** Zod-style validation errors array */
  errors?: unknown[];
}

/**
 * Centralized Express error handler.
 *
 * Must be the LAST middleware registered (4-argument signature is how Express
 * identifies error handlers). Catches anything passed via next(err) or thrown
 * inside async route handlers wrapped with try/catch.
 *
 * Behaviour:
 *  - Development: includes full error message + optional details
 *  - Production:  generic message for 5xx errors (no stack leak)
 */
export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void {
  const statusCode = err.statusCode ?? err.status ?? 500;
  const isProduction = process.env.NODE_ENV === 'production';

  // Always log the full error server-side
  console.error(`[error] ${statusCode} — ${err.message}`, isProduction ? '' : err.stack);

  // Structured response: never expose stack traces to the client
  const body: Record<string, unknown> = {
    error: {
      status: statusCode,
      message:
        statusCode < 500 || !isProduction
          ? err.message
          : 'An internal server error occurred. Please try again.',
    },
  };

  // Forward validation error details on 400s (safe to expose)
  if (statusCode === 400 && err.errors) {
    body.error = { ...(body.error as object), details: err.errors };
  }

  res.status(statusCode).json(body);
}
