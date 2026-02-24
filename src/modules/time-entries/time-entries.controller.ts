import type { Request, Response } from 'express';
import * as timeEntriesService from './time-entries.service.js';

type ReqWithDateRange = Request & { dateRange: { start: string; end: string } };
type ReqWithUpdateBody = Request & { updateBody: Record<string, unknown> };

export async function list(req: Request, res: Response): Promise<Response> {
  const { start, end } = (req as ReqWithDateRange).dateRange;
  const payload = await timeEntriesService.listByDateRange(start, end);
  return res.json(payload);
}

export async function getOne(req: Request, res: Response): Promise<Response> {
  const id = req.params.id as string;
  const payload = await timeEntriesService.getById(id);
  return res.json(payload);
}

export async function create(req: Request, res: Response): Promise<Response> {
  const payload = await timeEntriesService.create(req.body);
  return res.status(201).json(payload);
}

export async function update(req: Request, res: Response): Promise<Response> {
  const id = req.params.id as string;
  const body = (req as ReqWithUpdateBody).updateBody;
  const payload = await timeEntriesService.update(id, body as Parameters<typeof timeEntriesService.update>[1]);
  return res.json(payload);
}

export async function remove(req: Request, res: Response): Promise<Response> {
  const id = req.params.id as string;
  await timeEntriesService.remove(id);
  return res.status(204).send();
}

export async function duplicate(req: Request, res: Response): Promise<Response> {
  const id = req.params.id as string;
  const payload = await timeEntriesService.duplicate(id);
  return res.status(201).json(payload);
}
