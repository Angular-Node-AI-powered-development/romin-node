# Architecture

This project follows a **modular monolith** design: a single deployable application with feature-based modules and shared configuration, middleware, and utilities. The codebase uses **TypeScript** and **ESM** (ECMAScript modules). The approach is inspired by practices from *"Mastering Node.js: The Ultimate Guide to a Clean and Scalable Monolithic Architecture"* (Bilal Khursheed).

## Design rationale

- **Single deployable unit** — One codebase, one process; no microservices. Simplifies deployment and operations while keeping the codebase organized.
- **Feature-based modules** — Each feature lives under `src/modules/<feature>/` with its own controller, service, model, routes, and validation. New features are added as new modules without scattering code.
- **Shared cross-cutting concerns** — Config (DB, logger, defaults), middleware (e.g. error handling), and utils live outside modules and are reused. Modules do not depend on each other; shared logic stays in `utils/` or `middleware/`.
- **Clear layering** — Request flow: routes → validation → controller → service → model. Controllers handle HTTP; services hold business logic; models/schemas and DB access are encapsulated.

## Module layout

Every feature module contains:

| File | Responsibility |
|------|-----------------|
| `<feature>.routes.ts` | Express router; mounts endpoints and wires validation + controller |
| `<feature>.controller.ts` | Request/response handling; calls service; returns JSON |
| `<feature>.service.ts` | Business logic |
| `<feature>.model.ts` | Data schema / queries (or placeholder if no DB) |
| `<feature>.validation.ts` | Request validation (params, body, query) |

Modules are registered explicitly in `src/app.ts` (e.g. `app.use('/api/health', healthRoutes)`). There is no cross-module require of controllers or services; orchestration across features, if needed later, can live in a dedicated module or thin orchestration layer that depends on services.

## Configuration

- **config/default.json** — Application defaults (ports, DB settings, logger level). Secrets are overridden via environment variables (see `.env.example`).
- **config/db.ts** — PostgreSQL pool (using `pg`); exports `pool`, `connect`, and `close` for startup/shutdown.
- **config/logger.ts** — Winston logger (console + file in `logs/`).

## Scaling

The codebase scales by adding new modules under `src/modules/` and mounting their routes in `app.ts`. Existing modules remain isolated. Optional future steps include a repository layer per module (e.g. `<feature>.repository.ts`) for DB access.
