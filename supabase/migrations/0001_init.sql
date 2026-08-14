-- CAFE CHIRO — production schema (Supabase / Postgres)
-- The running demo uses a browser localStorage store; this migration is the
-- production backend referenced by §23/§24. Apply with the Supabase SQL editor
-- or `supabase db push`.

-- ─────────────────────────────────────────────────────────────
-- Extensions
-- ─────────────────────────────────────────────────────────────
create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────────────────────
-- news
-- ─────────────────────────────────────────────────────────────
create table if not exists public.news (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title_ja      text not null,
  title_en      text not null default '',
  title_ko      text not null default '',
  content_ja    text not null,
  content_en    text not null default '',
  content_ko    text not null default '',
  category      text not null default 'NEWS'
                  check (category in ('NEWS','EVENT','MENU','CATS')),
  thumbnail_url text,
  status        text not null default 'draft'
                  check (status in ('draft','published')),
  published_at  timestamptz not null default now(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists news_status_published_at_idx
  on public.news (status, published_at desc);

-- ─────────────────────────────────────────────────────────────
-- reservations
-- ─────────────────────────────────────────────────────────────
create table if not exists public.reservations (
  id               uuid primary key default gen_random_uuid(),
  reservation_code text not null unique,
  date             date not null,
  start_time       text not null,          -- 'HH:MM'
  duration         int  not null check (duration in (60, 90, 120)),
  party_size       int  not null check (party_size between 1 and 20),
  name             text not null,
  email            text not null,
  phone            text not null,
  note             text,
  created_at       timestamptz not null default now()
);

create index if not exists reservations_date_idx on public.reservations (date);

-- ─────────────────────────────────────────────────────────────
-- updated_at trigger for news
-- ─────────────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists news_set_updated_at on public.news;
create trigger news_set_updated_at
  before update on public.news
  for each row execute function public.set_updated_at();

-- ─────────────────────────────────────────────────────────────
-- Row Level Security
-- ─────────────────────────────────────────────────────────────
alter table public.news enable row level security;
alter table public.reservations enable row level security;

-- news: anyone may read PUBLISHED articles; staff (authenticated) read all.
drop policy if exists news_read_published on public.news;
create policy news_read_published on public.news
  for select
  using (status = 'published' or auth.role() = 'authenticated');

-- news: only authenticated staff may write.
drop policy if exists news_write_staff on public.news;
create policy news_write_staff on public.news
  for all
  to authenticated
  using (true)
  with check (true);

-- reservations: the public may CREATE a booking...
drop policy if exists reservations_insert_public on public.reservations;
create policy reservations_insert_public on public.reservations
  for insert
  to anon, authenticated
  with check (true);

-- ...but only staff may read / modify them (no guest can read another's data).
drop policy if exists reservations_read_staff on public.reservations;
create policy reservations_read_staff on public.reservations
  for select
  to authenticated
  using (true);

drop policy if exists reservations_modify_staff on public.reservations;
create policy reservations_modify_staff on public.reservations
  for update using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists reservations_delete_staff on public.reservations;
create policy reservations_delete_staff on public.reservations
  for delete to authenticated using (true);

-- ─────────────────────────────────────────────────────────────
-- Seed (optional) — the four launch articles
-- ─────────────────────────────────────────────────────────────
insert into public.news (slug, title_ja, title_en, title_ko, content_ja, content_en, content_ko, category, status, published_at)
values
  ('grand-open',
   'カフェ チロ、オープンしました。', 'CAFE CHIRO has opened.', '카페 치로, 오픈했습니다.',
   '大阪・箕面の船場西に、猫と過ごせるカフェ「カフェ チロ」をオープンしました。',
   'CAFE CHIRO has opened in Funaba-nishi, Minoh, Osaka — a café where you can spend time with cats.',
   '오사카 미노오시 후나바니시에 고양이와 함께 지낼 수 있는 카페 ‘카페 치로’를 오픈했습니다.',
   'NEWS', 'published', '2026-07-01T10:00:00+09:00')
on conflict (slug) do nothing;
