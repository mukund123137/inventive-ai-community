-- Make the invariant-maintaining triggers run as SECURITY DEFINER.
--
-- The trigger functions in 20250115120800_business_logic_triggers.sql were
-- created as plain (SECURITY INVOKER) functions, so they execute as whoever
-- fired the trigger — normally the `authenticated` end user. That collides
-- with RLS in two ways:
--
--   * notify_new_answer / notify_answer_verified / notify_new_vote INSERT into
--     `notifications`, which has RLS enabled and *no* INSERT policy (by design
--     — "only the triggers write notifications"). As the end user the insert
--     is rejected outright: "new row violates row-level security policy for
--     table notifications", which rolls back the whole answer/vote.
--
--   * maintain_vote_counts / on_answers_change / recompute_question_status
--     UPDATE `questions`/`answers`, which are staff-only under RLS. As a
--     non-staff user those updates silently match zero rows, so answer_count,
--     vote_count and derived status quietly stop tracking reality.
--
-- These functions are trusted invariant-maintainers that must run regardless
-- of who touched the data, so they should bypass RLS — exactly what
-- SECURITY DEFINER (owner = the migration role, which owns the tables and is
-- not subject to RLS) provides. search_path is pinned per SECURITY DEFINER
-- best practice and because the bodies reference unqualified table names.

alter function maintain_vote_counts() security definer;
alter function maintain_vote_counts() set search_path = public;

alter function on_answers_change() security definer;
alter function on_answers_change() set search_path = public;

alter function recompute_question_status(uuid) security definer;
alter function recompute_question_status(uuid) set search_path = public;

alter function notify_new_answer() security definer;
alter function notify_new_answer() set search_path = public;

alter function notify_answer_verified() security definer;
alter function notify_answer_verified() set search_path = public;

alter function notify_new_vote() security definer;
alter function notify_new_vote() set search_path = public;
