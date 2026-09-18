-- Row Level Security. Enabled on every table; every policy below is one of
-- "public read", "self only", or "staff only" — see docs/supabase-integration-plan.md §13.
--
-- Working assumption made explicit here since it isn't spelled out in the
-- approved plan: public *content* (questions/answers/categories/tags) is
-- readable by anon (logged-out) visitors, matching an ordinary public
-- community forum — but every write requires authentication. If the
-- product actually wants a hard login wall before any browsing, drop the
-- `anon` grants below and require `authenticated` for SELECT too.

-- ───────────────────────── profiles ─────────────────────────
alter table profiles enable row level security;

create policy profiles_select_all on profiles
  for select using (true);

create policy profiles_update_self on profiles
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());

-- No INSERT/DELETE policy: profiles are created only by handle_new_user()
-- (runs as the migration owner, which bypasses RLS) or by the seed script.

-- ───────────────────────── notification_preferences ─────────────────────────
alter table notification_preferences enable row level security;

create policy notification_prefs_select_self on notification_preferences
  for select using (user_id = current_profile_id());

create policy notification_prefs_update_self on notification_preferences
  for update using (user_id = current_profile_id()) with check (user_id = current_profile_id());

-- ───────────────────────── categories ─────────────────────────
alter table categories enable row level security;

create policy categories_select_all on categories
  for select using (true);

create policy categories_write_staff on categories
  for all using (is_staff()) with check (is_staff());

-- ───────────────────────── tags / question_tags ─────────────────────────
-- Read-only from the app's perspective (no tag-management UI exists — see
-- comment in 0003) but RLS still defines who *could* write, for when/if a
-- management UI is ever built.
alter table tags enable row level security;

create policy tags_select_all on tags
  for select using (true);

create policy tags_write_staff on tags
  for all using (is_staff()) with check (is_staff());

alter table question_tags enable row level security;

create policy question_tags_select_all on question_tags
  for select using (true);

create policy question_tags_write_staff on question_tags
  for all using (is_staff()) with check (is_staff());

-- ───────────────────────── questions ─────────────────────────
alter table questions enable row level security;

create policy questions_select on questions
  for select using (deleted_at is null or is_staff());

create policy questions_insert_own on questions
  for insert with check (author_id = current_profile_id());

-- Staff-only UPDATE (edit, resolve/reopen, soft-delete). Per decision #1,
-- regular users cannot edit their own questions in this version — that
-- stays exactly as strict as the current UI, which only exposes editing
-- through the Admin screen. Note that accepting an answer does NOT go
-- through a direct UPDATE on this table at all — it's the accept_answer()
-- RPC (security definer), so the question's own author doesn't need an
-- UPDATE policy here just to accept answers on their question.
create policy questions_update_staff on questions
  for update using (is_staff()) with check (is_staff());

-- No DELETE policy: deletion is a soft delete (UPDATE deleted_at), staff-only, above.

-- ───────────────────────── answers ─────────────────────────
alter table answers enable row level security;

create policy answers_select on answers
  for select using (deleted_at is null or is_staff());

create policy answers_insert_own on answers
  for insert with check (author_id = current_profile_id());

-- Staff-only UPDATE (edit body, soft-delete). Accepting/unaccepting an
-- answer — including by the question's own author — goes through
-- accept_answer() (security definer), not a direct UPDATE, so no
-- "question author" branch is needed here either.
create policy answers_update_staff on answers
  for update using (is_staff()) with check (is_staff());

-- ───────────────────────── votes ─────────────────────────
alter table votes enable row level security;

create policy votes_select_self on votes
  for select using (user_id = current_profile_id());

-- No INSERT/UPDATE/DELETE policy at all: every vote change goes through
-- toggle_vote() (security definer). A direct client insert/delete against
-- this table is rejected by RLS with no matching policy.

-- ───────────────────────── notifications ─────────────────────────
alter table notifications enable row level security;

create policy notifications_select_self on notifications
  for select using (recipient_id = current_profile_id());

create policy notifications_update_self on notifications
  for update using (recipient_id = current_profile_id()) with check (recipient_id = current_profile_id());

-- No INSERT policy: only the triggers in 0009 write notifications.

-- ───────────────────────── reports ─────────────────────────
alter table reports enable row level security;

create policy reports_select_staff on reports
  for select using (is_staff());

create policy reports_insert_own on reports
  for insert with check (reporter_id = current_profile_id());

create policy reports_update_staff on reports
  for update using (is_staff()) with check (is_staff());

-- ───────────────────────── moderation_actions ─────────────────────────
alter table moderation_actions enable row level security;

create policy moderation_actions_select_staff on moderation_actions
  for select using (is_staff());

create policy moderation_actions_insert_staff on moderation_actions
  for insert with check (is_staff() and moderator_id = current_profile_id());

-- No UPDATE/DELETE policy anywhere: immutable audit log.
