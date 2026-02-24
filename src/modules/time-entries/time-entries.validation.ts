import type { Request, Response, NextFunction } from 'express';
import { badRequest } from '../../utils/httpError.js';

const ISO_REGEX = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?)?$/;

function parseIsoDate(s: unknown): string | null {
  if (typeof s !== 'string') return null;
  if (!ISO_REGEX.test(s)) return null;
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : s;
}

/** GET /api/time-entries?start=&end= */
export function validateList(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const start = parseIsoDate(req.query.start);
  const end = parseIsoDate(req.query.end);
  if (!start || !end) {
    throw badRequest('Query start and end are required (ISO 8601 date or datetime)');
  }
  if (new Date(start) >= new Date(end)) {
    throw badRequest('start must be before end');
  }
  (req as Request & { dateRange: { start: string; end: string } }).dateRange = { start, end };
  next();
}

/** POST /api/time-entries */
export function validateCreate(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const b = req.body;
  if (!b || typeof b !== 'object') {
    throw badRequest('Request body must be a JSON object');
  }
  if (typeof b.description !== 'string' || b.description.trim() === '') {
    throw badRequest('description is required');
  }
  if (typeof b.project_task !== 'string' || b.project_task.trim() === '') {
    throw badRequest('project_task is required');
  }
  if (typeof b.feature !== 'string' || b.feature.trim() === '') {
    throw badRequest('feature is required');
  }
  if (typeof b.billable !== 'boolean') {
    throw badRequest('billable is required (boolean)');
  }
  const start = parseIsoDate(b.start_time);
  const end = parseIsoDate(b.end_time);
  if (!start || !end) {
    throw badRequest('start_time and end_time are required (ISO 8601)');
  }
  if (new Date(start) >= new Date(end)) {
    throw badRequest('start_time must be before end_time');
  }
  req.body = {
    description: (b.description as string).trim(),
    project_task: (b.project_task as string).trim(),
    feature: (b.feature as string).trim(),
    billable: b.billable as boolean,
    start_time: start,
    end_time: end,
  };
  next();
}

/** PATCH /api/time-entries/:id */
export function validateUpdate(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const id = req.params.id;
  if (!id) {
    throw badRequest('Route param id is required');
  }
  const b = req.body;
  if (!b || typeof b !== 'object') {
    throw badRequest('Request body must be a JSON object');
  }
  const body: Record<string, unknown> = {};
  if (b.description !== undefined) {
    if (typeof b.description !== 'string' || b.description.trim() === '') {
      throw badRequest('description must be a non-empty string');
    }
    body.description = (b.description as string).trim();
  }
  if (b.project_task !== undefined) {
    if (typeof b.project_task !== 'string' || b.project_task.trim() === '') {
      throw badRequest('project_task must be a non-empty string');
    }
    body.project_task = (b.project_task as string).trim();
  }
  if (b.feature !== undefined) {
    if (typeof b.feature !== 'string' || b.feature.trim() === '') {
      throw badRequest('feature must be a non-empty string');
    }
    body.feature = (b.feature as string).trim();
  }
  if (b.billable !== undefined) {
    if (typeof b.billable !== 'boolean') {
      throw badRequest('billable must be a boolean');
    }
    body.billable = b.billable;
  }
  if (b.start_time !== undefined) {
    const start = parseIsoDate(b.start_time);
    if (!start) throw badRequest('start_time must be ISO 8601');
    body.start_time = start;
  }
  if (b.end_time !== undefined) {
    const end = parseIsoDate(b.end_time);
    if (!end) throw badRequest('end_time must be ISO 8601');
    body.end_time = end;
  }
  if (Object.keys(body).length === 0) {
    throw badRequest('At least one field is required to update');
  }
  if (body.start_time != null && body.end_time != null) {
    if (new Date(body.start_time as string) >= new Date(body.end_time as string)) {
      throw badRequest('start_time must be before end_time');
    }
  }
  (req as Request & { updateBody: Record<string, unknown> }).updateBody = body;
  next();
}

/** GET /api/time-entries/:id, DELETE /api/time-entries/:id, POST /api/time-entries/:id/duplicate */
export function validateIdParam(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const id = req.params.id;
  if (!id) {
    throw badRequest('Route param id is required');
  }
  next();
}
