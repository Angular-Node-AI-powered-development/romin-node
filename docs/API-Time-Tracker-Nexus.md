# Time Tracker Nexus — Backend API

Implemented per technical contracts (Stories 1–4). Base URL: `/api`.

## Time entries

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/time-entries?start=&end= | List entries in date range; returns `entries` and `total_minutes` (week total). Query: `start`, `end` (ISO 8601). |
| GET | /api/time-entries/:id | Get one entry by id. |
| POST | /api/time-entries | Create entry. Body: `description`, `project_task`, `feature`, `billable`, `start_time`, `end_time` (all required, ISO 8601). |
| PATCH | /api/time-entries/:id | Update entry (partial). Body: any of description, project_task, feature, billable, start_time, end_time. |
| DELETE | /api/time-entries/:id | Delete entry. |
| POST | /api/time-entries/:id/duplicate | Create a copy of the entry (no body). |

Validation: required fields and ISO dates; 400 on error, 404 when resource not found.

## User preferences (filter and date range)

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/user-preferences | Get stored filter and date range. Optional header: `X-User-Id` (default key: `default`). |
| PUT | /api/user-preferences | Store filter and/or date range. Body: `filter` (object or null), `date_range_start`, `date_range_end` (ISO date or null). |

## Database

Run the migration once (PostgreSQL):

```bash
psql -U postgres -d romin_db -f db/migrations/001_time_tracker_nexus.sql
```

Or set `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, `PGPASSWORD` and run the same file.

Tables: `time_entries`, `user_preferences`.
