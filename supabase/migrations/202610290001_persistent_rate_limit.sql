create table if not exists public.judge_rate_limit_windows (
  rate_key text not null,
  window_start timestamptz not null,
  count integer not null default 0 check (count >= 0),
  last_seen timestamptz not null default now(),
  primary key (rate_key, window_start)
);

alter table public.judge_rate_limit_windows enable row level security;
revoke all on public.judge_rate_limit_windows from anon, authenticated;

create or replace function public.reserve_judge_execution(
  p_key text,
  p_limit integer
)
returns table (
  allowed boolean,
  remaining integer,
  retry_after_seconds integer
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_now timestamptz := now();
  v_window_start timestamptz;
  v_window_end timestamptz;
  v_count integer;
begin
  if p_key is null or length(p_key) < 32 or length(p_key) > 128 then
    raise exception 'Invalid rate-limit key';
  end if;

  if p_limit < 1 or p_limit > 1000 then
    raise exception 'Invalid rate-limit value';
  end if;

  v_window_start :=
    date_trunc('day', v_now at time zone 'Asia/Hong_Kong')
    at time zone 'Asia/Hong_Kong';
  v_window_end := v_window_start + interval '1 day';

  insert into public.judge_rate_limit_windows (
    rate_key,
    window_start,
    count,
    last_seen
  )
  values (p_key, v_window_start, 1, v_now)
  on conflict (rate_key, window_start)
  do update set
    count = public.judge_rate_limit_windows.count + 1,
    last_seen = excluded.last_seen
  returning count into v_count;

  delete from public.judge_rate_limit_windows
  where window_start < v_now - interval '7 days';

  return query
  select
    v_count <= p_limit,
    greatest(p_limit - v_count, 0),
    greatest(
      1,
      ceil(extract(epoch from (v_window_end - v_now)))::integer
    );
end;
$$;

revoke all on function public.reserve_judge_execution(text, integer)
  from public;
grant execute on function public.reserve_judge_execution(text, integer)
  to anon, authenticated;
