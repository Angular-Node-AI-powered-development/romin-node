import type { Request, Response } from 'express';
import * as healthService from './health.service.js';

export async function getHealth(_req: Request, res: Response): Promise<Response> {
  const payload = await healthService.getHealth();
  return res.json(payload);
}
