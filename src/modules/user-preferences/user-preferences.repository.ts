/**
 * User preferences DB access (contract: Story 1 — filter and date range persistence).
 */
import { pool } from '../../../config/db.js';
import type { UserPreferencesUpdateBody } from './user-preferences.types.js';

const DEFAULT_USER_KEY = 'default';

export interface UserPreferencesRow {
  user_key: string;
  filter: Record<string, unknown> | null;
  date_range_start: Date | null;
  date_range_end: Date | null;
  updated_at: Date;
}

export async function get(userKey: string = DEFAULT_USER_KEY): Promise<UserPreferencesRow | null> {
  const result = await pool.query<UserPreferencesRow>(
    `SELECT user_key, filter, date_range_start, date_range_end, updated_at
     FROM user_preferences WHERE user_key = $1`,
    [userKey]
  );
  return result.rows[0] ?? null;
}

export async function upsert(
  body: UserPreferencesUpdateBody,
  userKey: string = DEFAULT_USER_KEY
): Promise<UserPreferencesRow> {
  const existing = await get(userKey);
  const filter = body.filter !== undefined ? body.filter : existing?.filter ?? null;
  const date_range_start =
    body.date_range_start !== undefined
      ? (body.date_range_start == null ? null : new Date(body.date_range_start))
      : existing?.date_range_start ?? null;
  const date_range_end =
    body.date_range_end !== undefined
      ? (body.date_range_end == null ? null : new Date(body.date_range_end))
      : existing?.date_range_end ?? null;

  await pool.query(
    `INSERT INTO user_preferences (user_key, filter, date_range_start, date_range_end, updated_at)
     VALUES ($1, $2::jsonb, $3, $4, now())
     ON CONFLICT (user_key) DO UPDATE SET
       filter = COALESCE(EXCLUDED.filter, user_preferences.filter),
       date_range_start = COALESCE(EXCLUDED.date_range_start, user_preferences.date_range_start),
       date_range_end = COALESCE(EXCLUDED.date_range_end, user_preferences.date_range_end),
       updated_at = now()`,
    [userKey, filter == null ? null : JSON.stringify(filter), date_range_start, date_range_end]
  );
  const row = await get(userKey);
  if (!row) throw new Error('Upsert failed');
  return row;
}
