# Login Task Manager

A pnpm + Turborepo monorepo containing:

- **`apps/web`** — Angular 19 frontend (main page, login popup, dashboard).
- **`apps/web-e2e`** — Playwright UI end-to-end tests for the frontend.
- **`apps/api`** — NestJS Task Manager REST API (in-memory store), with a Playwright API test
  suite in `apps/api/e2e`.

## Prerequisites

- Node.js `22.11+`
- [pnpm](https://pnpm.io/) `10.x` (`corepack enable` or `npm install -g pnpm`)
- Google Chrome installed (used headless by the Angular unit tests)

## Setup

```bash
# install all workspace dependencies
pnpm install

# one-time: download browsers used by Playwright
pnpm --filter web-e2e exec playwright install chromium

# one-time: web-e2e reads its demo login credentials from a .env file (git-ignored)
cp apps/web-e2e/.env.example apps/web-e2e/.env
```

## Running the apps

```bash
# start everything (Angular dev server on :4200, API on :3000)
pnpm dev

# or start a single app
pnpm --filter web dev
pnpm --filter api dev
```

Frontend: http://localhost:4200
API: http://localhost:3000

Demo login credentials: `admin` / `password123`. Logging in calls the API's `/auth/login` and
stores the returned JWT in `localStorage` — it survives a page reload and is attached to every
`/tasks` request automatically (see [Authentication](#authentication) below).

## Building

```bash
# build all apps (Turborepo caches per-package output)
pnpm build

# or build a single app
pnpm --filter web build
pnpm --filter api build
```

## Testing

```bash
# unit tests (Angular/Karma) for all apps
pnpm test

# UI + API end-to-end tests (Playwright) for all apps
pnpm test:e2e
```

Run a single suite directly:

```bash
# Angular UI e2e tests
pnpm --filter web-e2e test:e2e
pnpm --filter web-e2e test:e2e:ui      # interactive Playwright UI mode

# Task Manager API e2e tests
pnpm --filter api test:e2e
pnpm --filter api test:e2e:ui          # interactive Playwright UI mode
```

Both e2e suites boot their own server automatically (Angular dev server / API server) and
shut it down when the run finishes. `apps/api`'s own e2e suite runs its API instance on `:3001`
(not the usual `:3000`) — `apps/web-e2e`'s suite boots a *second*, real API instance on `:3000` to
exercise the login flow end to end, and `pnpm test:e2e` at the root runs both suites concurrently
via Turborepo; sharing one port would mean whichever suite finishes first tears down the server
the other is still using.

## Linting & formatting

Formatting and linting are handled by [Biome](https://biomejs.dev/) for the whole monorepo.

```bash
pnpm lint          # check for lint issues
pnpm lint:fix       # check and auto-fix lint issues
pnpm format         # check formatting
pnpm format:fix     # auto-format all files
pnpm check          # lint + format check in one pass
pnpm check:fix       # lint + format, auto-fixing everything safe to fix
```

## Task Manager API

Base URL: `http://localhost:3000`

Interactive API docs (Swagger UI): http://localhost:3000/api-docs
Raw OpenAPI document: http://localhost:3000/api-docs.json

| Method | Path          | Auth required | Description        |
| ------ | ------------- | -------------- | ------------------ |
| POST   | `/auth/login` | No             | Log in, returns a JWT |
| GET    | `/tasks`      | Yes            | List all tasks      |
| POST   | `/tasks`      | Yes            | Create a new task   |
| GET    | `/tasks/{id}` | Yes            | Get a task by id     |
| PUT    | `/tasks/{id}` | Yes            | Update a task        |
| DELETE | `/tasks/{id}` | Yes            | Delete a task        |

The Angular dashboard (`apps/web/src/app/dashboard`) consumes this API directly via
`TaskApiService` (`apps/web/src/app/services/task-api.service.ts`) — listing, creating, inline
editing, and deleting tasks. Since it calls `http://localhost:3000` directly, the API must be
running for the dashboard's task table to load (`pnpm dev` starts both).

