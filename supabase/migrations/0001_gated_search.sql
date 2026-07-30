-- Gated MLS search — profiles + saved searches
--
-- Run once per Supabase project (SQL Editor → New query → paste → Run), or via
-- `supabase db push` if you've linked the CLI. Safe to re-run.

-- ── profiles ─────────────────────────────────────────────────────────────────
-- One row per auth.users row. Holds the display data we don't want to read out
-- of the JWT on every request.

create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  email      text not null,
  full_name  text,
  created_at timestamptz not null default now(),
  -- Stamped the first time this signup is pushed to HubSpot/Resend. The
  -- "update ... where lead_synced_at is null returning id" claim is what keeps
  -- the CRM push exactly-once even though it's attempted on every sign-in.
  lead_synced_at timestamptz
);

alter table public.profiles add column if not exists lead_synced_at timestamptz;

alter table public.profiles enable row level security;

drop policy if exists "Profiles are readable by their owner" on public.profiles;
create policy "Profiles are readable by their owner"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Profiles are insertable by their owner" on public.profiles;
create policy "Profiles are insertable by their owner"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "Profiles are updatable by their owner" on public.profiles;
create policy "Profiles are updatable by their owner"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ── saved_searches ───────────────────────────────────────────────────────────
-- search_criteria is the same filter shape the search UI puts in the query
-- string (q, status, minprice, maxprice, minbeds, minbaths, type, minarea,
-- sort). Stored as jsonb so adding a filter needs no migration.
--
-- template scopes a saved search to the site it was created on, so porting the
-- gate to luxury-agent / local-expert doesn't cross-contaminate a user's list.
--
-- alert_frequency is inert for now — it's the hook for the future email-alert
-- feature. NULL means "no alerts".

create table if not exists public.saved_searches (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.profiles (id) on delete cascade,
  template        text not null default 'modern-team',
  search_criteria jsonb not null default '{}'::jsonb,
  alert_frequency text check (alert_frequency in ('instant', 'daily', 'weekly')),
  created_at      timestamptz not null default now()
);

create index if not exists saved_searches_user_id_created_at_idx
  on public.saved_searches (user_id, created_at desc);

alter table public.saved_searches enable row level security;

drop policy if exists "Saved searches are readable by their owner" on public.saved_searches;
create policy "Saved searches are readable by their owner"
  on public.saved_searches for select
  using (auth.uid() = user_id);

drop policy if exists "Saved searches are insertable by their owner" on public.saved_searches;
create policy "Saved searches are insertable by their owner"
  on public.saved_searches for insert
  with check (auth.uid() = user_id);

drop policy if exists "Saved searches are updatable by their owner" on public.saved_searches;
create policy "Saved searches are updatable by their owner"
  on public.saved_searches for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Saved searches are deletable by their owner" on public.saved_searches;
create policy "Saved searches are deletable by their owner"
  on public.saved_searches for delete
  using (auth.uid() = user_id);

-- ── profile bootstrap ────────────────────────────────────────────────────────
-- Creating the profile in a trigger (rather than from the app after sign-up)
-- means it exists no matter how the user arrived — email/password, Google
-- OAuth, or a manual insert from the Supabase dashboard.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    -- Google returns full_name; email/password sign-up sends full_name in the
    -- signUp options.data payload. Fall back to name, then to nothing.
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name'
    )
  )
  on conflict (id) do update
    set email     = excluded.email,
        full_name = coalesce(public.profiles.full_name, excluded.full_name);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Living in `public` also exposes this over PostgREST as
-- /rest/v1/rpc/handle_new_user. Postgres refuses to run a trigger function
-- called directly, so it isn't exploitable — but Supabase's security linter
-- flags definer-rights functions reachable by anon, and rightly so. The trigger
-- runs as the table owner and is unaffected by these revokes.
revoke execute on function public.handle_new_user() from public;
revoke execute on function public.handle_new_user() from anon;
revoke execute on function public.handle_new_user() from authenticated;
