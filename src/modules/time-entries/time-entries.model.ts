/**
 * Time entry row and mapping (DB ↔ API).
 */
import type { TimeEntryResponse } from './time-entries.types.js';

export interface TimeEntryRow {
  id: string;
  description: string;
  project_task: string;
  feature: string;
  billable: boolean;
  start_time: Date;
  end_time: Date;
  created_at: Date;
  updated_at: Date;
}

export function rowToResponse(row: TimeEntryRow): TimeEntryResponse {
  const start = new Date(row.start_time);
  const end = new Date(row.end_time);
  const duration_minutes = Math.round((end.getTime() - start.getTime()) / 60_000);
  return {
    id: row.id,
    description: row.description,
    project_task: row.project_task,
    feature: row.feature,
    billable: row.billable,
    start_time: start.toISOString(),
    end_time: end.toISOString(),
    duration_minutes,
    created_at: new Date(row.created_at).toISOString(),
    updated_at: new Date(row.updated_at).toISOString(),
  };
}
