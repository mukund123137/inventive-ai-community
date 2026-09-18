create table questions (
  id                 uuid primary key default gen_random_uuid(),
  slug               text not null unique,          -- <title-slug>-<shortid>, see 0009 for generation
  author_id          uuid not null references profiles (id),
  category_id        uuid references categories (id),
  title              text not null,
  body               text not null,
  status             question_status not null default 'unanswered',
  status_locked      boolean not null default false, -- set true by an admin Resolve/Reopen action;
                                                      -- once true, accept/unaccept no longer
                                                      -- auto-recomputes status (see 0009) — matches
                                                      -- the mock's qStatus-overrides-forever behavior
  accepted_answer_id uuid,                          -- FK added in 0005, after `answers` exists
  vote_count         integer not null default 0,     -- denormalized; maintained by triggers in 0009
  answer_count       integer not null default 0,     -- denormalized; maintained by triggers in 0009
  deleted_at         timestamptz,                    -- soft delete; admin-only (staff), never a hard DELETE
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),

  search_vector tsvector generated always as (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(body, '')), 'B')
  ) stored
);

comment on column questions.status is
  'Kept correct by recompute_question_status() (0009) on every accept/unaccept, EXCEPT when an admin Resolve/Reopen action just set it directly — that action is allowed to disagree with the derived value, matching the mock''s qStatus-overrides-derived-status behavior exactly.';
comment on column questions.accepted_answer_id is
  'Denormalized pointer, kept in sync by the same trigger that maintains status. Lets the feed/detail resolve "is this solved" in O(1).';

create index questions_author_id_idx on questions (author_id);
create index questions_category_id_idx on questions (category_id);
create index questions_not_deleted_idx on questions (id) where deleted_at is null;
create index questions_search_vector_idx on questions using gin (search_vector);
create index questions_trending_idx on questions ((vote_count + answer_count * 3) desc) where deleted_at is null;
create index questions_created_at_idx on questions (created_at desc) where deleted_at is null;

create trigger questions_set_updated_at
  before update on questions
  for each row execute function set_updated_at();

-- question_tags: the many-to-many join, created here (not in 0003) because
-- it needs `questions` to exist first. Read-only from the app's
-- perspective — see the comment on `tags` in 0003.
create table question_tags (
  question_id uuid not null references questions (id) on delete cascade,
  tag_id      uuid not null references tags (id) on delete cascade,
  primary key (question_id, tag_id)
);

create index question_tags_tag_id_idx on question_tags (tag_id);
