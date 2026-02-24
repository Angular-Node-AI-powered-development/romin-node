/**
 * Time entries DB access (contract: Stories 1–4).
 */
import { pool } from '../../../config/db.js';
import type { TimeEntryCreateBody, TimeEntryUpdateBody } from './time-entries.types.js';
import type { TimeEntryRow } from './time-entries.model.js';

export async function findByDateRange(start: Date, end: Date): Promise<TimeEntryRow[]> {
  const result = await pool.query<TimeEntryRow>(
    `SELECT id, description, project_task, feature, billable, start_time, end_time, created_at, updated_at
     FROM time_entries
     WHERE start_time < $2 AND end_time > $1
     ORDER BY start_time ASC`,
    [start, end]
  );
  return result.rows;
}

export async function getWeekTotalMinutes(start: Date, end: Date): Promise<number> {
  const result = await pool.query<{ total_minutes: string }>(
    `SELECT COALESCE(SUM(
       EXTRACT(EPOCH FROM (LEAST(end_time, $2) - GREATEST(start_time, $1))) / 60
     ), 0)::BIGINT AS total_minutes
     FROM time_entries
     WHERE start_time < $2 AND end_time > $1`,
    [start, end]
  );
  return parseInt(result.rows[0]?.total_minutes ?? '0', 10);
}

export async function findById(id: string): Promise<TimeEntryRow | null> {
  const result = await pool.query<TimeEntryRow>(
    `SELECT id, description, project_task, feature, billable, start_time, end_time, created_at, updated_at
     FROM time_entries WHERE id = $1`,
    [id]
  );
  return result.rows[0] ?? null;
}

export async function create(body: TimeEntryCreateBody): Promise<TimeEntryRow> {
  const result = await pool.query<TimeEntryRow>(
    `INSERT INTO time_entries (description, project_task, feature, billable, start_time, end_time, updated_at)
     VALUES ($1, $2, $3, $4, $5::timestamptz, $6::timestamptz, now())
     RETURNING id, description, project_task, feature, billable, start_time, end_time, created_at, updated_at`,
    [
      body.description,
      body.project_task,
      body.feature,
      body.billable,
      body.start_time,
      body.end_time,
    ]
  );
  return result.rows[0];
}

export async function update(id: string, body: TimeEntryUpdateBody): Promise<TimeEntryRow | null> {
  const row = await findById(id);
  if (!row) return null;

  const description = body.description ?? row.description;
  const project_task = body.project_task ?? row.project_task;
  const feature = body.feature ?? row.feature;
  const billable = body.billable ?? row.billable;
  const start_time = body.start_time != null ? new Date(body.start_time) : row.start_time;
  const end_time = body.end_time != null ? new Date(body.end_time) : row.end_time;

  const result = await pool.query<TimeEntryRow>(
    `UPDATE time_entries
     SET description = $2, project_task = $3, feature = $4, billable = $5, start_time = $6, end_time = $7, updated_at = now()
     WHERE id = $1
     RETURNING id, description, project_task, feature, billable, start_time, end_time, created_at, updated_at`,
    [id, description, project_task, feature, billable, start_time, end_time]
  );
  return result.rows[0] ?? null;
}

export async function remove(id: string): Promise<boolean> {
  const result = await pool.query('DELETE FROM time_entries WHERE id = $1', [id]);
  return (result.rowCount ?? 0) > 0;
}

/** Duplicate: insert new row with copied data (Story 4). */
export async function duplicate(id: string): Promise<TimeEntryRow | null> {
  const row = await findById(id);
  if (!row) return null;

  const result = await pool.query<TimeEntryRow>(
    `INSERT INTO time_entries (description, project_task, feature, billable, start_time, end_time, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, now())
     RETURNING id, description, project_task, feature, billable, start_time, end_time, created_at, updated_at`,
    [
      row.description,
      row.project_task,
      row.feature,
      row.billable,
      row.start_time,
      row.end_time,
    ]
  );
  return result.rows[0] ?? null;
}
