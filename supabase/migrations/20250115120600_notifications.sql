-- notifications. notification_preferences already exists (created in 0002
-- alongside profiles, since both rows are created together on signup).

create table notifications (
  id           uuid primary key default gen_random_uuid(),
  recipient_id uuid not null references profiles (id),
  actor_id     uuid references profiles (id),   -- null for system notices
                                                  -- ("Inventive Team" marked an
                                                  -- answer Staff Verified)
  type         notification_type not null,
  question_id  uuid not null references questions (id),
  answer_id    uuid references answers (id),
  read_at      timestamptz,
  created_at   timestamptz not null default now()
);

create index notifications_recipient_unread_idx
  on notifications (recipient_id, created_at desc) where read_at is null;
create index notifications_recipient_idx on notifications (recipient_id, created_at desc);
create index notifications_question_id_idx on notifications (question_id);

comment on table notifications is
  'Only 3 types exist in the current UI (answer/verified/upvote) — see comment on notification_type in 0001. Never inserted directly by the client; only by the triggers in 0009.';
