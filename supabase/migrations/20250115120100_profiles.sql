-- profiles: the app's notion of a "person" — either a real signed-up user
-- (user_id set, pointing at auth.users) or a demo/seed author with no login
-- (user_id null). Decision: the 9 mock AUTHORS are display-only demo data,
-- not loginable accounts, so profiles.id is deliberately NOT the same column
-- as auth.users.id — it's its own PK, with an optional link to auth.users.

create table profiles (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid unique references auth.users (id) on delete cascade,
  username     text not null,
  display_name text not null,
  avatar_tone  text not null default '#9CA3AF',
  role         user_role not null default 'member',
  company      text,
  bio          text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),

  constraint profiles_username_format check (username ~ '^[a-z0-9_-]{3,32}$')
);

create unique index profiles_username_key on profiles (lower(username));

comment on table profiles is
  'One row per person: real users have user_id -> auth.users; the 9 demo/seed authors do not (display-only, not loginable).';
comment on column profiles.user_id is
  'Null for demo/seed authors. Set for real accounts, created by handle_new_user() on signup (see 0009).';

-- Every FK elsewhere in the schema points at profiles.id, never at
-- auth.users.id directly, so seeded demo content never needs a matching
-- auth.users row.

create table notification_preferences (
  user_id  uuid primary key references profiles (id) on delete cascade,
  answers  boolean not null default true,
  mentions boolean not null default true,   -- kept for Settings-screen parity; nothing
                                             -- generates a 'mention' notification yet (§8)
  verified boolean not null default true,
  upvotes  boolean not null default true,
  digest   boolean not null default false
);

comment on table notification_preferences is
  'One row per profile, created alongside it by handle_new_user() (see 0009). Gates email/digest delivery, not the in-app notification row itself.';
