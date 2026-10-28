create table if not exists public.user_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default timezone('utc', now()),
  constraint user_progress_payload_is_object
    check (jsonb_typeof(payload) = 'object')
);

alter table public.user_progress enable row level security;

drop policy if exists "Users can read their own progress"
  on public.user_progress;
create policy "Users can read their own progress"
  on public.user_progress
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert their own progress"
  on public.user_progress;
create policy "Users can insert their own progress"
  on public.user_progress
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own progress"
  on public.user_progress;
create policy "Users can update their own progress"
  on public.user_progress
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

grant select, insert, update on public.user_progress to authenticated;
