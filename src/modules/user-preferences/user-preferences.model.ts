import type { UserPreferencesResponse } from './user-preferences.types.js';
import type { UserPreferencesRow } from './user-preferences.repository.js';

export function rowToResponse(row: UserPreferencesRow): UserPreferencesResponse {
  return {
    user_key: row.user_key,
    filter: row.filter,
    date_range_start: row.date_range_start?.toISOString().slice(0, 10) ?? null,
    date_range_end: row.date_range_end?.toISOString().slice(0, 10) ?? null,
    updated_at: new Date(row.updated_at).toISOString(),
  };
}
