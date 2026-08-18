# Supabase migrations

## Files

| File | Purpose |
|------|---------|
| `migrations/0001_init_rls_policies.sql` | Replaces the overly-permissive `FOR ALL USING (auth.role()='authenticated')` policies with per-table, per-operation policies keyed off `auth.uid()`. |

## Why this exists

The Day-1 audit found that all four core tables (`profiles`, `brands`,
`influencers`, `campaigns`) had a single policy:

```sql
create policy "Enable all for authenticated users"
  on <table> for all
  using (auth.role() = 'authenticated');
```

This means **any logged-in user** could SELECT/INSERT/UPDATE/DELETE any row —
including rows belonging to other users. The migration replaces that with
explicit per-operation policies.

## Apply

### Option A — Supabase CLI (recommended)

```bash
# one-time: link to the project
supabase link --project-ref rzrkwrjmeiukvfgxiizv

# apply pending migrations
supabase db push

# verify
psql "$DATABASE_URL" -c "select tablename, policyname, cmd from pg_policies where schemaname='public' order by tablename, cmd;"
```

### Option B — Supabase Dashboard SQL editor

1. Open https://supabase.com/dashboard/project/rzrkwrjmeiukvfgxiizv/sql
2. Paste the contents of `migrations/0001_init_rls_policies.sql`
3. Run

## Prerequisites (column requirements)

The policies assume these columns exist:

| Table | Required column | Notes |
|-------|-----------------|-------|
| `profiles` | `user_id` | equals `auth.uid()` |
| `brands` | `owner_id` | equals `auth.uid()` |
| `influencers` | `user_id` | equals `auth.uid()`; optional `is_public bool`, optional `brand_id uuid` |
| `campaigns` | `brand_id` | equals `auth.uid()`; optional `invited_influencer_ids uuid[]` |
| `ai_conversations` | `user_id` | equals `auth.uid()` |

If your schema uses different column names, edit the migration before
applying it. You can list current columns with:

```sql
select table_name, column_name, data_type
from information_schema.columns
where table_schema='public'
order by table_name, ordinal_position;
```

## Rollback

```sql
-- emergency: drop all policies on public.campaigns and re-grant the old one
drop policy if exists "campaigns_select_owner_or_invited" on public.campaigns;
drop policy if exists "campaigns_insert_brand"          on public.campaigns;
drop policy if exists "campaigns_update_brand"          on public.campaigns;
drop policy if exists "campaigns_delete_brand"          on public.campaigns;
create policy "Enable all for authenticated users"
  on public.campaigns for all
  using (auth.role()='authenticated');
```

Repeat for each table if you need a full rollback.

## Verification checklist after applying

- [ ] `select * from pg_policies where schemaname='public';` shows 4 policies per table × 4 tables + `ai_conversations` = **20 rows**.
- [ ] Log in as user A in Supabase → SQL editor: `select * from brands;` returns only A's brands.
- [ ] `insert into brands (..., owner_id) values (..., 'user-B-uuid')` rejected with `new row violates row-level security policy`.
- [ ] `service_role` JWT (server only) can still SELECT all rows for admin scripts.
