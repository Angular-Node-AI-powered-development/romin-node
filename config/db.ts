import { Pool } from 'pg';
import config from 'config';

let dbConfig: Record<string, unknown> = {};
try {
  dbConfig = config.has('db') ? (config.get('db') as Record<string, unknown>) : {};
} catch {
  // config not available, use env only
}

const pool = new Pool({
  host: (process.env.PGHOST ?? dbConfig.host ?? 'localhost') as string,
  port: parseInt(String(process.env.PGPORT ?? dbConfig.port ?? '5432'), 10),
  database: (process.env.PGDATABASE ?? dbConfig.database ?? 'romin_db') as string,
  user: (process.env.PGUSER ?? dbConfig.user ?? 'postgres') as string,
  password: (process.env.PGPASSWORD ?? dbConfig.password ?? '') as string,
  max: (dbConfig.max as number) ?? 20,
  idleTimeoutMillis: (dbConfig.idleTimeoutMillis as number) ?? 30000,
  connectionTimeoutMillis: (dbConfig.connectionTimeoutMillis as number) ?? 2000,
});

export async function connect(): Promise<Pool> {
  const client = await pool.connect();
  client.release();
  return pool;
}

export async function close(): Promise<void> {
  await pool.end();
}

export { pool };
