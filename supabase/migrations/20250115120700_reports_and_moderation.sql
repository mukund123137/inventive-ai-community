create table reports (
  id          uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references profiles (id),
  question_id uuid references questions (id),
  answer_id   uuid references answers (id),
  reason      report_reason not null,
  detail      text,                      -- the reporter's optional free-text; see note below
  status      report_status not null default 'open',
  created_at  timestamptz not null default now(),

  constraint reports_exactly_one_target check (num_nonnulls(question_id, answer_id) = 1)
);

comment on table reports is
  'Only question/answer targets, by decision — comments are not part of the current product and no comments table exists (docs/supabase-integration-plan.md, decision #4). If comments ship later, add a comment_id column and loosen the CHECK to = 1 across three columns.';
comment on column reports.detail is
  'NOTE: the mock ReportModal''s "Add any detail" textarea is not currently wired to state — submitReport() always sends the reported item''s own body as content, never free text from the reporter. Fix this when wiring the real submitReport action (see docs/supabase-integration-plan.md §9) so this column is actually populated.';

create index reports_status_idx on reports (status);
create index reports_question_id_idx on reports (question_id);
create index reports_answer_id_idx on reports (answer_id);

create table moderation_actions (
  id            uuid primary key default gen_random_uuid(),
  moderator_id  uuid not null references profiles (id),
  report_id     uuid references reports (id),   -- nullable: not every action
                                                  -- originates from a report
                                                  -- (e.g. a direct admin edit)
  question_id   uuid references questions (id),
  answer_id     uuid references answers (id),
  action        moderation_action not null,
  note          text,
  created_at    timestamptz not null default now()
);

comment on table moderation_actions is
  'Audit trail. Every Admin-page mutation (resolve/reopen, accept/unaccept from Admin, edit, delete, report resolution) writes one row here in the same transaction as its primary effect. No screen reads this back today — ready for a future Activity Log tab.';

create index moderation_actions_moderator_id_idx on moderation_actions (moderator_id);
create index moderation_actions_report_id_idx on moderation_actions (report_id);
