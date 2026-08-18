-- ============================================================================
-- KGinfluenceX — Supabase RLS policy baseline
-- File: supabase/migrations/0001_init_rls_policies.sql
-- Target: project ref "rzrkwrjmeiukvfgxiizv" (Supabase)
-- Date: 2026-08-17
--
-- Replace the existing "Enable all for authenticated users" FOR ALL policies
-- with explicit per-operation policies that key row access off auth.uid().
--
-- BEFORE: every authenticated user could SELECT/INSERT/UPDATE/DELETE any row
-- in profiles / brands / influencers / campaigns.
--
-- AFTER: each table has the 4 standard row-level policies (select, insert,
-- update, delete) that compare owner_id = auth.uid().
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Helper: ensure pgcrypto is available for auth.uid() and gen_random_uuid()
-- (Supabase already exposes auth.uid(); this block only documents intent.)
-- ---------------------------------------------------------------------------
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Helper view to inspect active policies after migration:
--   select * from pg_policies where schemaname='public';
-- ---------------------------------------------------------------------------

-- ---------------------------------------------------------------------------
-- profiles
--   - One row per Supabase auth user.
--   - Own user can read/write themselves; admins (via service_role) bypass.
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;

drop policy if exists "Enable all for authenticated users" on public.profiles;

create policy "profiles_select_self"
  on public.profiles for select
  to authenticated
  using (auth.uid() = user_id);

create policy "profiles_insert_self"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "profiles_update_self"
  on public.profiles for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "profiles_delete_self"
  on public.profiles for delete
  to authenticated
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- brands
--   - Brands registered by a brand user; visible to the owner + matching
--     influencers (opt-in via campaign_participants — added later).
-- ---------------------------------------------------------------------------
alter table public.brands enable row level security;

drop policy if exists "Enable all for authenticated users" on public.brands;

create policy "brands_select_own"
  on public.brands for select
  to authenticated
  using (auth.uid() = owner_id);

create policy "brands_insert_own"
  on public.brands for insert
  to authenticated
  with check (auth.uid() = owner_id);

create policy "brands_update_own"
  on public.brands for update
  to authenticated
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

create policy "brands_delete_own"
  on public.brands for delete
  to authenticated
  using (auth.uid() = owner_id);

-- ---------------------------------------------------------------------------
-- influencers
--   - One profile per influencer. Public read opt-in via is_public flag.
--   - Owner can CRUD own profile.
-- ---------------------------------------------------------------------------
alter table public.influencers enable row level security;

drop policy if exists "Enable all for authenticated users" on public.influencers;

create policy "influencers_select_public_or_self"
  on public.influencers for select
  to authenticated
  using (
    (coalesce(is_public, false) = true)
    or auth.uid() = user_id
    or auth.uid() = brand_id  -- brands can see influencers they invited
  );

create policy "influencers_insert_self"
  on public.influencers for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "influencers_update_self"
  on public.influencers for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "influencers_delete_self"
  on public.influencers for delete
  to authenticated
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- campaigns
--   - Owned by a brand; visible to brand owner + invited influencers.
-- ---------------------------------------------------------------------------
alter table public.campaigns enable row level security;

drop policy if exists "Enable all for authenticated users" on public.campaigns;

create policy "campaigns_select_owner_or_invited"
  on public.campaigns for select
  to authenticated
  using (
    auth.uid() = brand_id
    or auth.uid() = any (invited_influencer_ids)
  );

create policy "campaigns_insert_brand"
  on public.campaigns for insert
  to authenticated
  with check (auth.uid() = brand_id);

create policy "campaigns_update_brand"
  on public.campaigns for update
  to authenticated
  using (auth.uid() = brand_id)
  with check (auth.uid() = brand_id);

create policy "campaigns_delete_brand"
  on public.campaigns for delete
  to authenticated
  using (auth.uid() = brand_id);

-- ---------------------------------------------------------------------------
-- ai_conversations (used by AiChatWidget)
--   - Users see only their own chat threads.
-- ---------------------------------------------------------------------------
alter table public.ai_conversations enable row level security;

drop policy if exists "Enable all for authenticated users" on public.ai_conversations;

create policy "ai_conversations_select_self"
  on public.ai_conversations for select
  to authenticated
  using (auth.uid() = user_id);

create policy "ai_conversations_insert_self"
  on public.ai_conversations for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "ai_conversations_update_self"
  on public.ai_conversations for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "ai_conversations_delete_self"
  on public.ai_conversations for delete
  to authenticated
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Service role bypasses all RLS automatically. Do NOT expose service_role
-- keys in any VITE_* / NEXT_PUBLIC_* env var; keep them server-only.
-- ---------------------------------------------------------------------------

-- ---------------------------------------------------------------------------
-- Verifying the migration:
--   select tablename, policyname, cmd, qual
--   from pg_policies
--   where schemaname = 'public'
--   order by tablename, cmd;
-- ---------------------------------------------------------------------------
