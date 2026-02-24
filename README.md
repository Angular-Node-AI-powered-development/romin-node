# romin-node

Modular monolithic Node.js backend with **TypeScript**, **ESM**, Express, and PostgreSQL. Each feature is implemented as an isolated module under `src/modules/<feature>` with clear separation of routes, controller, service, model, and validation.

## Stack

- **TypeScript** with strict mode
- **ESM** (`"type": "module"`); Node 18+
- Express, PostgreSQL (`pg`), Winston, Morgan, config

## Folder structure

```
/config          — DB, logger, and app default settings (.ts + default.json)
/src
  /modules       — Feature modules (e.g. health); one folder per feature
  /middleware    — Global middleware (e.g. error handler)
  /utils         — Shared helpers
  app.ts         — Express app bootstrap
  server.ts      — HTTP server and graceful shutdown
/logs            — Application log files
/tests           — Tests (run with tsx)
/public          — Static assets
/dist            — Compiled output (after npm run build)
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for design rationale and module layout.

## Run locally

1. Install dependencies: `npm install`
2. Copy env template: `cp .env.example .env` and set values (e.g. PostgreSQL).
3. **Development** (TypeScript via tsx, no build): `npm run dev`
4. **Production**: `npm run build` then `npm start`

## Scripts

- `npm run build` — Compile TypeScript to `dist/` (ESM)
- `npm start` — Run compiled server (`node dist/src/server.js`); run `npm run build` first
- `npm run dev` — Run TypeScript with watch (`tsx watch src/server.ts`)
- `npm test` — Run health integration test (requires server running; use `npm run dev` in another terminal first)

## API

- `GET /api/health` — Health check (status, timestamp, DB connectivity)

The project is ready for CI: run `npm ci && npm run build && npm start` (or your test command) in your pipeline.
