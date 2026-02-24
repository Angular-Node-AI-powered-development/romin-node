/**
 * User preferences API types (contract: Story 1 — filter and date range persistence).
 */
export interface UserPreferencesResponse {
  user_key: string;
  filter: Record<string, unknown> | null;
  date_range_start: string | null; // ISO date
  date_range_end: string | null;
  updated_at: string;
}

export interface UserPreferencesUpdateBody {
  filter?: Record<string, unknown> | null;
  date_range_start?: string | null; // ISO date
  date_range_end?: string | null;
}
