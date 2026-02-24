import { pool } from '../../../config/db.js';

export interface HealthPayload {
  status: 'ok';
  timestamp: string;
  db: 'connected' | 'disconnected' | 'unknown';
}

export async function getHealth(): Promise<HealthPayload> {
  const timestamp = new Date().toISOString();
  let db: HealthPayload['db'] = 'unknown';
  try {
    const client = await pool.connect();
    client.release();
    db = 'connected';
  } catch {
    db = 'disconnected';
  }
  return { status: 'ok', timestamp, db };
}
