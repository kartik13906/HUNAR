-- ========================================================
-- HUNAR / ComprehendAI - Supabase Database Schema
-- Run this script in your Supabase Project -> SQL Editor
-- ========================================================

-- 1. Create Profiles Table (linked to auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  name text,
  field_of_study text not null default 'General Studies',
  institution text default 'Independent Scholar',
  academic_year text default 'Self-Paced',
  avatar_url text,
  joined_date timestamptz default now(),
  target_daily_practice integer default 1
);

-- 2. Enable RLS on Profiles
alter table public.profiles enable row level security;

-- Drop existing policies if any to avoid errors on re-run
drop policy if exists "Users can view own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Users can insert own profile" on public.profiles;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- 3. Automatic Trigger to create Profile on User Sign-up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, field_of_study)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'field_of_study', 'General Studies')
  )
  on conflict (id) do update set
    field_of_study = coalesce(excluded.field_of_study, profiles.field_of_study),
    email = excluded.email;
  return new;
end;
$$ language plpgsql security definer;

-- Drop existing trigger if any
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 4. Create Evaluations Table
create table if not exists public.evaluations (
  id text primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  article_id text not null,
  article_title text not null,
  article_category text not null,
  completed_at timestamptz default now(),
  user_answer text not null,
  word_count integer not null default 0,
  time_spent_seconds integer not null default 0,
  score numeric(4, 1) not null default 0,
  performance_label text not null,
  strengths text[] not null default '{}',
  missed text[] not null default '{}',
  feedback text not null default '',
  breakdown jsonb not null default '{}'::jsonb
);

-- 5. Enable RLS on Evaluations
alter table public.evaluations enable row level security;

drop policy if exists "Users can view own evaluations" on public.evaluations;
drop policy if exists "Users can insert own evaluations" on public.evaluations;
drop policy if exists "Users can delete own evaluations" on public.evaluations;

create policy "Users can view own evaluations"
  on public.evaluations for select
  using (auth.uid() = user_id);

create policy "Users can insert own evaluations"
  on public.evaluations for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own evaluations"
  on public.evaluations for delete
  using (auth.uid() = user_id);
