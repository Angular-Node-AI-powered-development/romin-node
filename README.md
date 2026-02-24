# romin-node

Modular monolithic Node.js backend with Express and PostgreSQL. Each feature is implemented as an isolated module under `src/modules/<feature>` with clear separation of routes, controller, service, model, and validation.

## Folder structure

```
/config          — DB, logger, and app default settings
/src
  /modules       — Feature modules (e.g. health); one folder per feature
  /middleware    — Global middleware (e.g. error handler)
  /utils         — Shared helpers
  app.js         — Express app bootstrap
  server.js      — HTTP server and graceful shutdown
/logs            — Application log files
/tests           — Tests
/public          — Static assets
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for design rationale and module layout.

## Run locally

1. Install dependencies: `npm install`
2. Copy env template: `cp .env.example .env` and set values (e.g. PostgreSQL).
3. Start: `npm run dev` (watch) or `npm start`

## Scripts

- `npm start` — Run server (`node src/server.js`)
- `npm run dev` — Run with watch (`node --watch src/server.js`)

## API

- `GET /api/health` — Health check (status, timestamp, DB connectivity)

- `npm test` — Run health integration test (requires server running: start with `npm run dev` in another terminal first).

The project is ready for CI: run `npm ci && npm start` (or your test command) in your pipeline.
