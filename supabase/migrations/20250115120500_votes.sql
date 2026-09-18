-- votes: replaces the mock's two separate `voted`/`aVoted` Record<id,boolean>
-- overlays with one table, disambiguated by target_type.

create table votes (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references profiles (id),
  target_type vote_target_type not null,
  target_id   uuid not null,     -- points at questions.id or answers.id depending on
                                  -- target_type; deliberately NOT a FK (a column can't
                                  -- reference two different tables) — validated by the
                                  -- toggle_vote() RPC (0010), which is the only writer.
  created_at  timestamptz not null default now(),

  unique (user_id, target_type, target_id)
);

create index votes_target_idx on votes (target_type, target_id);

comment on column votes.target_id is
  'No FK by design (polymorphic). All writes go through toggle_vote() (0010) — never a raw client INSERT/DELETE — so this is validated in that function, not by a DB constraint.';
