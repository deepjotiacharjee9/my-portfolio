-- ════════════════════════════════════════════════════════════════
--  Deepjoti Acharjee Portfolio — Supabase Setup
--  Paste this entire file into:
--    Supabase Dashboard → SQL Editor → New query → Run
-- ════════════════════════════════════════════════════════════════

-- ── Projects table ───────────────────────────────────────────────
create table if not exists projects (
  id          uuid        default gen_random_uuid() primary key,
  title       text        not null,
  client      text        not null default '',
  year        integer     not null default 2024,
  era         text        not null default 'recent'
                          check (era in ('recent', 'old')),
  format      text        not null default 'short-form'
                          check (format in ('short-form', 'long-form')),
  thumbnail   text        not null default '',
  video_type  text        not null default 'drive'
                          check (video_type in ('drive', 'youtube', 'direct')),
  video_id    text        not null default '',
  description text        not null default '',
  tags        text[]      not null default '{}',
  featured    boolean     not null default false,
  duration    text,
  sort_order  integer     not null default 0,
  visible     boolean     not null default true,
  created_at  timestamptz not null default now()
);

-- ── Testimonials table ───────────────────────────────────────────
create table if not exists testimonials (
  id          uuid        default gen_random_uuid() primary key,
  name        text        not null,
  role        text        not null default '',
  platform    text        not null default '',
  content     text        not null,
  avatar      text,
  sort_order  integer     not null default 0,
  created_at  timestamptz not null default now()
);

-- ── Frame Designs table ──────────────────────────────────────────
create table if not exists frame_designs (
  id          uuid        default gen_random_uuid() primary key,
  title       text        not null,
  description text,
  image_url   text        not null default '',
  category    text        not null default 'Design',
  visible     boolean     not null default true,
  sort_order  integer     not null default 0,
  created_at  timestamptz not null default now()
);

-- ── Site Settings table ──────────────────────────────────────────
create table if not exists site_settings (
  key        text primary key,
  value      text not null default ''
);

-- ── Row Level Security ───────────────────────────────────────────
alter table projects      enable row level security;
alter table testimonials  enable row level security;
alter table frame_designs enable row level security;
alter table site_settings enable row level security;

-- Anyone can read (portfolio visitors)
create policy "Public read projects"
  on projects for select using (true);

create policy "Public read testimonials"
  on testimonials for select using (true);

create policy "Public read frame_designs"
  on frame_designs for select using (true);

create policy "Public read site_settings"
  on site_settings for select using (true);

-- Only logged-in users (you) can write
create policy "Auth write projects"
  on projects for all using (auth.uid() is not null);

create policy "Auth write testimonials"
  on testimonials for all using (auth.uid() is not null);

create policy "Auth write frame_designs"
  on frame_designs for all using (auth.uid() is not null);

create policy "Auth write site_settings"
  on site_settings for all using (auth.uid() is not null);
