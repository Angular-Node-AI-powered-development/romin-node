-- Time Tracker Nexus (Stories 1–4): time entries + user preferences
-- Run once: psql -f db/migrations/001_time_tracker_nexus.sql (or via app bootstrap)

-- Time entries: required for calendar/list, week total, add/edit/delete/duplicate, move/resize
CREATE TABLE IF NOT EXISTS time_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  description TEXT NOT NULL,
  project_task TEXT NOT NULL,
  feature TEXT NOT NULL,
  billable BOOLEAN NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT time_entries_end_after_start CHECK (end_time > start_time)
);

CREATE INDEX IF NOT EXISTS idx_time_entries_start_time ON time_entries (start_time);
CREATE INDEX IF NOT EXISTS idx_time_entries_end_time ON time_entries (end_time);

-- User preferences: filter and date range (server-side persistence for reload — Story 1)
-- Single row per user key; no auth in scope — use 'default' or provide user_id later
CREATE TABLE IF NOT EXISTS user_preferences (
  user_key TEXT PRIMARY KEY DEFAULT 'default',
  filter JSONB,
  date_range_start DATE,
  date_range_end DATE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
