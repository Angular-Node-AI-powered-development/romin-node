import type { Request, Response } from 'express';
import * as userPreferencesService from './user-preferences.service.js';

type ReqWithBody = Request & { preferencesBody: Record<string, unknown> };

function getUserKey(req: Request): string {
  return (req.headers['x-user-id'] as string) ?? 'default';
}

export async function get(req: Request, res: Response): Promise<Response> {
  const userKey = getUserKey(req);
  const payload = await userPreferencesService.get(userKey);
  if (!payload) return res.status(200).json({ user_key: userKey, filter: null, date_range_start: null, date_range_end: null, updated_at: new Date().toISOString() });
  return res.json(payload);
}

export async function upsert(req: Request, res: Response): Promise<Response> {
  const userKey = getUserKey(req);
  const body = (req as ReqWithBody).preferencesBody;
  const payload = await userPreferencesService.upsert(body as Parameters<typeof userPreferencesService.upsert>[0], userKey);
  return res.json(payload);
}
