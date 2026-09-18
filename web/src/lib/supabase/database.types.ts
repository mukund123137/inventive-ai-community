/**
 * Hand-written to match supabase/migrations/*.sql exactly (the Supabase
 * CLI's `gen types` needs Docker to introspect a project, unavailable in
 * this environment — see docs/supabase-integration-plan.md). Regenerate
 * with `supabase gen types typescript --linked` once linked to a real
 * project, and this file becomes redundant.
 */

export type UserRole = "user" | "admin";
export type QuestionStatus = "unanswered" | "open" | "community" | "verified";
export type VoteTargetType = "question" | "answer";
export type NotificationType = "answer" | "verified" | "upvote";
export type ReportReason =
  | "Spam or advertising"
  | "Off-topic or low quality"
  | "Incorrect or harmful information"
  | "Harassment or abuse"
  | "Something else";
export type ReportStatus = "open" | "kept" | "removed" | "dismissed";
export type ModerationActionType =
  | "resolve_question" | "reopen_question"
  | "accept_answer" | "unaccept_answer"
  | "edit_question" | "edit_answer"
  | "delete_question" | "delete_answer"
  | "keep_report" | "remove_report" | "dismiss_report";
export type AdminContentKind = "question" | "answer";

export interface ProfileRow {
  id: string;
  user_id: string | null;
  username: string;
  display_name: string;
  avatar_tone: string;
  avatar_url: string | null;
  role: UserRole;
  company: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface CategoryRow {
  id: string;
  slug: string;
  name: string;
}

export interface TagRow {
  id: string;
  name: string;
}

export interface QuestionRow {
  id: string;
  slug: string;
  author_id: string;
  category_id: string | null;
  title: string;
  body: string;
  status: QuestionStatus;
  status_locked: boolean;
  accepted_answer_id: string | null;
  vote_count: number;
  answer_count: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AnswerRow {
  id: string;
  question_id: string;
  author_id: string;
  body: string;
  is_accepted: boolean;
  vote_count: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface VoteRow {
  id: string;
  user_id: string;
  target_type: VoteTargetType;
  target_id: string;
  created_at: string;
}

export interface NotificationRow {
  id: string;
  recipient_id: string;
  actor_id: string | null;
  type: NotificationType;
  question_id: string;
  answer_id: string | null;
  read_at: string | null;
  created_at: string;
}

export interface NotificationPreferencesRow {
  user_id: string;
  answers: boolean;
  mentions: boolean;
  verified: boolean;
  upvotes: boolean;
  digest: boolean;
}

export interface ReportRow {
  id: string;
  reporter_id: string;
  question_id: string | null;
  answer_id: string | null;
  reason: ReportReason;
  detail: string | null;
  status: ReportStatus;
  created_at: string;
}

export interface ModerationActionRow {
  id: string;
  moderator_id: string;
  report_id: string | null;
  question_id: string | null;
  answer_id: string | null;
  action: ModerationActionType;
  note: string | null;
  created_at: string;
}

/** Row shape returned by the admin_search_content() RPC. */
export interface AdminSearchRow {
  kind: AdminContentKind;
  question_id: string;
  answer_id: string | null;
  title: string;
  body: string;
  author_id: string;
  created_at: string;
  status_key: string;
}

/** Row shape returned by toggle_vote(). */
export interface ToggleVoteResult {
  voted: boolean;
  vote_count: number;
}
