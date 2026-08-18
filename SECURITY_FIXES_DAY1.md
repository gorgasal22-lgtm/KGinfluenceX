# KGinfluenceX — Day 1 Security & Build Fixes (2026-08-17)

## What was fixed in this commit

### 1. Removed hardcoded Supabase credentials
- **Before:** `lib/supabase.ts` and `artifacts/kginfluencex/src/lib/supabase.ts`
  contained hardcoded `supabaseUrl` and `supabaseKey` strings.
- **After:** Both files read from environment variables
  (`NEXT_PUBLIC_SUPABASE_*` for Next.js, `VITE_SUPABASE_*` for Vite) and
  throw fast at startup if either var is missing.
- The old hardcoded publishable key `sb_publishable_xSOabLIFSUVOMvN5PExyrw_DRd5XmwJ`
  has been removed from source.

### 2. Created `.env.example` (placeholders only)
- Documented all required env vars: `NEXT_PUBLIC_SUPABASE_URL`,
  `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `VITE_SUPABASE_URL`,
  `VITE_SUPABASE_ANON_KEY`, `DATABASE_URL`, `ANTHROPIC_API_KEY`.
- Includes a security reminder block (DO commit, rotation guidance).

### 3. Verified `.gitignore` coverage
- `.env`, `.env.local`, `.env.development.local`, `.env.production.local`
  are already ignored. Confirmed locally.

### 4. Verified `tsconfig.json` references
- All 3 referenced paths (`./lib/db`, `./lib/api-client-react`, `./lib/api-zod`)
  exist on disk with proper `tsconfig.json` and `package.json` files.
- Tested `tsc --build` for the referenced projects — see "Build verification".

## ROTATION STEPS (ACTION REQUIRED — owner only)

The previously committed `sb_publishable_xSOabLIFSUVOMvN5PExyrw_DRd5XmwJ` was
publicly visible. Even publishable keys should be rotated when leaked:

1. Open Supabase dashboard → Project `rzrkwrjmeiukvfgxiizv`.
2. Project Settings → API → "Reset" the anon / publishable key.
3. Update `.env.local` locally and on Vercel with the new value.
4. Check Auth → Users and Logs for any unexpected activity between when
   the key was first committed and the rotation date.
5. If a `service_role` key was ever leaked anywhere — that's a hard
   security incident. Rotate it AND audit the database for unfamiliar rows.

## Build verification

```bash
# TypeScript only (no app server needed)
npx -y typescript@~5.9 tsc -p lib/db/tsconfig.json --noEmit
npx -y typescript@~5.9 tsc -p lib/api-client-react/tsconfig.json --noEmit
npx -y typescript@~5.9 tsc -p lib/api-zod/tsconfig.json --noEmit
```

Sandbox does not have pnpm installed, so the full `pnpm run build`
workspace build could not be executed here. Run it locally:

```bash
npm i -g pnpm@latest
pnpm install
pnpm run typecheck
pnpm run build
```
