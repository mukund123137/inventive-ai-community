-- Extensions & enums shared by every other migration.

create extension if not exists pgcrypto;   -- gen_random_uuid()
create extension if not exists pg_trgm;    -- trigram index, used as a fallback for
                                            -- admin's "type a keyword" search over title/body

-- Member vs. staff. Drives the "Inventive Staff" pill, the verified/community
-- status split on accepted answers, and every staff-only RLS policy below.
create type user_role as enum ('member', 'staff');

-- Mirrors the mock's STATUS map exactly (verified/community/open/unanswered).
-- Not purely derived: an admin Resolve/Reopen action is allowed to set this
-- directly, overriding what the accepted-answer state would otherwise imply
-- (see the recompute_question_status() trigger in 0009).
create type question_status as enum ('unanswered', 'open', 'community', 'verified');

-- What a vote target points at (questions.id or answers.id — see votes.target_id,
-- which intentionally has no FK since it's polymorphic).
create type vote_target_type as enum ('question', 'answer');

-- The 3 notification kinds that exist in the current UI. No 'mention' value:
-- the Settings toggle for it exists, but nothing generates that event yet
-- (see docs/supabase-integration-plan.md §8) — adding the enum value with
-- nothing that ever writes it would be exactly the "fake backend behavior"
-- the brief says not to add.
create type notification_type as enum ('answer', 'verified', 'upvote');

-- The 5 fixed reasons in REPORT_REASONS. UI copy, not user data — an enum,
-- not a lookup table.
create type report_reason as enum (
  'Spam or advertising',
  'Off-topic or low quality',
  'Incorrect or harmful information',
  'Harassment or abuse',
  'Something else'
);

create type report_status as enum ('open', 'kept', 'removed', 'dismissed');

create type moderation_action as enum (
  'resolve_question', 'reopen_question',
  'accept_answer', 'unaccept_answer',
  'edit_question', 'edit_answer',
  'delete_question', 'delete_answer',
  'keep_report', 'remove_report', 'dismiss_report'
);
