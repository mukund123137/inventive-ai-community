create table answers (
  id          uuid primary key default gen_random_uuid(),
  question_id uuid not null references questions (id) on delete cascade,
  author_id   uuid not null references profiles (id),
  body        text not null,
  is_accepted boolean not null default false,
  vote_count  integer not null default 0,   -- denormalized; maintained by triggers in 0009
  deleted_at  timestamptz,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Now that `answers` exists, wire up the forward reference from `questions`.
alter table questions
  add constraint questions_accepted_answer_id_fkey
  foreign key (accepted_answer_id) references answers (id);

-- Hard DB invariant: at most one accepted answer per question. The mock
-- enforced this by manually flipping every sibling to false before setting
-- the new one (see acceptAnswer() in src/lib/store.ts) — this makes it a
-- guarantee instead of an application-code convention.
create unique index answers_one_accepted_per_question
  on answers (question_id) where is_accepted;

create index answers_question_id_idx on answers (question_id);
create index answers_author_id_idx on answers (author_id);
create index answers_not_deleted_idx on answers (id) where deleted_at is null;

create trigger answers_set_updated_at
  before update on answers
  for each row execute function set_updated_at();
