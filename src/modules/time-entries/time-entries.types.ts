/**
 * Time entry API types (contract: Stories 1–4).
 * Do not add fields not in the contract.
 */
export interface TimeEntryCreateBody {
  description: string;
  project_task: string;
  feature: string;
  billable: boolean;
  start_time: string; // ISO 8601
  end_time: string;   // ISO 8601
}

export interface TimeEntryUpdateBody {
  description?: string;
  project_task?: string;
  feature?: string;
  billable?: boolean;
  start_time?: string;
  end_time?: string;
}

export interface TimeEntryResponse {
  id: string;
  description: string;
  project_task: string;
  feature: string;
  billable: boolean;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  created_at: string;
  updated_at: string;
}

export interface WeekTotalResponse {
  total_minutes: number;
  start: string;
  end: string;
}

export interface DateRangeQuery {
  start: string; // ISO date or datetime
  end: string;
}

/** List response for GET /api/time-entries?start=&end= */
export interface TimeEntryListResponse {
  entries: TimeEntryResponse[];
  total_minutes: number;
}
