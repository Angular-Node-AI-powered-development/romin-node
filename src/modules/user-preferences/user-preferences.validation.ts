import type { Request, Response, NextFunction } from 'express';
import { badRequest } from '../../utils/httpError.js';

/** PUT /api/user-preferences */
export function validateUpsert(req: Request, _res: Response, next: NextFunction): void {
  const b = req.body;
  if (!b || typeof b !== 'object') {
    throw badRequest('Request body must be a JSON object');
  }
  const body: Record<string, unknown> = {};
  if (b.filter !== undefined) {
    if (b.filter !== null && (typeof b.filter !== 'object' || Array.isArray(b.filter))) {
      throw badRequest('filter must be null or an object');
    }
    body.filter = b.filter;
  }
  if (b.date_range_start !== undefined) {
    if (b.date_range_start !== null && typeof b.date_range_start !== 'string') {
      throw badRequest('date_range_start must be null or ISO date string');
    }
    body.date_range_start = b.date_range_start;
  }
  if (b.date_range_end !== undefined) {
    if (b.date_range_end !== null && typeof b.date_range_end !== 'string') {
      throw badRequest('date_range_end must be null or ISO date string');
    }
    body.date_range_end = b.date_range_end;
  }
  (req as Request & { preferencesBody: Record<string, unknown> }).preferencesBody = body;
  next();
}
