/**
 * Time entries business logic (contract: Stories 1–4).
 */
import type { TimeEntryCreateBody, TimeEntryUpdateBody, TimeEntryListResponse, TimeEntryResponse } from './time-entries.types.js';
import { rowToResponse } from './time-entries.model.js';
import * as repo from './time-entries.repository.js';
import { notFound } from '../../utils/httpError.js';

export async function listByDateRange(start: string, end: string): Promise<TimeEntryListResponse> {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const [rows, totalMinutes] = await Promise.all([
    repo.findByDateRange(startDate, endDate),
    repo.getWeekTotalMinutes(startDate, endDate),
  ]);
  return {
    entries: rows.map(rowToResponse),
    total_minutes: totalMinutes,
  };
}

export async function getById(id: string): Promise<TimeEntryResponse> {
  const row = await repo.findById(id);
  if (!row) throw notFound('Time entry not found');
  return rowToResponse(row);
}

export async function create(body: TimeEntryCreateBody): Promise<TimeEntryResponse> {
  const row = await repo.create(body);
  return rowToResponse(row);
}

export async function update(id: string, body: TimeEntryUpdateBody): Promise<TimeEntryResponse> {
  const row = await repo.update(id, body);
  if (!row) throw notFound('Time entry not found');
  return rowToResponse(row);
}

export async function remove(id: string): Promise<void> {
  const deleted = await repo.remove(id);
  if (!deleted) throw notFound('Time entry not found');
}

export async function duplicate(id: string): Promise<TimeEntryResponse> {
  const row = await repo.duplicate(id);
  if (!row) throw notFound('Time entry not found');
  return rowToResponse(row);
}
