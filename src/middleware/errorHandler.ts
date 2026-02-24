import type { Request, Response, NextFunction } from 'express';
import logger from '../../config/logger.js';

interface OperationalError extends Error {
  statusCode?: number;
  status?: number;
  isOperational?: boolean;
}

function isOperational(err: OperationalError): boolean {
  if (err.statusCode != null && err.statusCode >= 400 && err.statusCode < 500) return true;
  if (err.isOperational === true) return true;
  if (err.name === 'HttpError') return true;
  return false;
}

export default function errorHandler(
  err: OperationalError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const statusCode = err.statusCode ?? err.status ?? 500;
  const message = err.message ?? 'Internal Server Error';
  const isDev = process.env.NODE_ENV !== 'production';

  if (!isOperational(err)) {
    logger.error({ err: err.message, stack: err.stack, url: _req.originalUrl });
  } else {
    logger.warn({ err: err.message, statusCode, url: _req.originalUrl });
  }

  res.status(statusCode).json({
    error: message,
    ...(isDev && err.stack ? { stack: err.stack } : {}),
  });
}
