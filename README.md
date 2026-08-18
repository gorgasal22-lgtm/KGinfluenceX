# KGinfluenceX

> Influencer marketing platform — საქართველოს ბრენდების და ინფლუენსერების დასაკავშირებელი პლატფორმა.

[![CI](https://github.com/gorgasal22-lgtm/KGinfluenceX/actions/workflows/ci.yml/badge.svg)](https://github.com/gorgasal22-lgtm/KGinfluenceX/actions/workflows/ci.yml)

## Tech Stack (2026-08)

| Layer | Technology |
|-------|-----------|
| Frontend | Vite 7 · React 19 · Tailwind v4 · Radix UI |
| API | Express 5 · TypeScript 5.9 · Zod 3 (v4 schema) |
| Database | PostgreSQL + Drizzle ORM |
| Auth + Data | Supabase (Auth + Postgres + RLS) |
| API codegen | Orval (from OpenAPI 3.1 spec) |
| Package manager | pnpm workspaces (Node.js 24) |
| Validation | Zod v4 |
| Logging | pino + pino-http |

> **Note:** the live app `https://k-ginfluence-x.vercel.app` is the Vite/React SPA built from
> `artifacts/kginfluencex`. The root `lib/supabase.ts` predates the Vite rewrite and is kept for
> reference only — see *Migration notes* below.

## Quick Start

```bash
# Requires Node.js 24 and pnpm 9+
git clone https://github.com/gorgasal22-lgtm/KGinfluenceX.git
cd KGinfluenceX

# 1. install
npm i -g pnpm@9
pnpm install

# 2. env (copy & fill)
cp .env.example .env.local

# 3. run frontend (Vite, port 5173)
pnpm --filter @workspace/kginfluencex run dev

# 4. in another shell — run API (Express, port 5000)
DATABASE_URL=postgres://... pnpm --filter @workspace/api-server run dev
```

## Workspace Structure

```
KGinfluenceX/
├── lib/
│   ├── db/                    Drizzle schema + connection pool
│   ├── api-spec/              OpenAPI 3.1 yaml (single source of truth)
│   ├── api-zod/               Zod schemas generated from OpenAPI
│   └── api-client-react/      React Query hooks generated from OpenAPI (Orval)
├── artifacts/
│   ├── api-server/            Express 5 + TS API server (port 5000)
│   ├── kginfluencex/          Vite + React SPA (the actual product)
│   └── mockup-sandbox/        Design mockups / exploration
├── scripts/                   One-off scripts (Node + tsx)
├── supabase/
│   └── migrations/            SQL migrations (apply via supabase CLI)
├── lib/supabase.ts            Legacy Next.js env-loading shim (see note)
└── replit.md                  Project conventions & operating notes
```

## Common Commands

| Command | What it does |
|---------|-------------|
| `pnpm install` | Install workspace deps |
| `pnpm run typecheck` | `tsc --build` across all referenced libs |
| `pnpm run build` | Typecheck + per-package build (`vite build`, `esbuild`) |
| `pnpm --filter @workspace/api-server run dev` | Run API (port 5000) |
| `pnpm --filter @workspace/kginfluencex run dev` | Run SPA (port 5173) |
| `pnpm --filter @workspace/api-spec run codegen` | Regenerate Zod schemas + React Query hooks from OpenAPI |
| `pnpm --filter @workspace/db run push` | Push Drizzle schema to dev DB |

## Environment Variables

See [`.env.example`](./.env.example). Summary:

| Var | Required for | Where loaded |
|-----|-------------|-------------|
| `VITE_SUPABASE_URL` | Frontend | `import.meta.env` |
| `VITE_SUPABASE_ANON_KEY` | Frontend | `import.meta.env` |
| `DATABASE_URL` | API server | `process.env` |
| `ANTHROPIC_API_KEY` | AI features (optional) | server-side only |

## How the data flow works

```
OpenAPI YAML (lib/api-spec/openapi.yaml)        ← single source of truth
        │
        │  orval / codegen
        ▼
┌───────────────────────┐    ┌─────────────────────────┐
│ lib/api-zod          │    │ lib/api-client-react     │
│ (request/resp schemas)│    │ (typed React Query hooks)│
└─────────┬─────────────┘    └──────────┬──────────────┘
          ▼                              ▼
   artifacts/api-server              artifacts/kginfluencex
   (Express handlers use             (UI consumes typed hooks)
    Zod inside route)
```

When you change an endpoint:

1. Edit `lib/api-spec/openapi.yaml`
2. Run `pnpm --filter @workspace/api-spec run codegen`
3. Implement handler in `artifacts/api-server/src/routes/...`
4. UI auto-uses the regenerated hooks — no manual typing

## Security

- **Never** commit `.env.local` (already `.gitignore`d).
- Supabase **anon key** is a publishable JWT — its only protection is Supabase **RLS policies**.
  Treat RLS as the *real* security boundary. See [`supabase/migrations/`](./supabase/migrations/).
- **service_role** keys must never appear in source or in any `VITE_*`/`NEXT_PUBLIC_*` env var.
- See [`SECURITY_FIXES_DAY1.md`](./SECURITY_FIXES_DAY1.md) for Day‑1 fixes.

## Migration notes

- The top-level `lib/supabase.ts` reads `NEXT_PUBLIC_SUPABASE_*` — this was the original Next.js
  setup. The current `artifacts/kginfluencex` reads `VITE_SUPABASE_*`. Pick the correct entry
  per app, do not import from root in the Vite SPA.

## Project conventions

See [`replit.md`](./replit.md) for the project conventions / "gotchas" document.

## CI

GitHub Actions builds, typechecks and lints on every push & PR. See
[`.github/workflows/ci.yml`](./.github/workflows/ci.yml).
