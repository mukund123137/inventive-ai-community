"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "./supabase/client";
import { QUESTION_DETAIL_SELECT, QUESTION_LIST_SELECT, toQuestion, type ResolvedQuestion } from "./data-types";
import { useAuth } from "./auth";
import { timeAgo } from "./time";
import type { AdminSearchRow, NotificationPreferencesRow, ProfileRow } from "./supabase/database.types";

const supabase = createClient();

// ───────────────────────── questions / answers ─────────────────────────

export function useQuestionsList() {
  return useQuery({
    queryKey: ["questions"],
    queryFn: async (): Promise<ResolvedQuestion[]> => {
      const { data, error } = await supabase
        .from("questions")
        .select(QUESTION_LIST_SELECT)
        .is("deleted_at", null)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data as never as Parameters<typeof toQuestion>[0][]).map(toQuestion);
    },
  });
}

export function useQuestion(slug: string) {
  return useQuery({
    queryKey: ["question", slug],
    queryFn: async (): Promise<ResolvedQuestion | null> => {
      const { data, error } = await supabase
        .from("questions")
        .select(QUESTION_DETAIL_SELECT)
        .eq("slug", slug)
        .is("deleted_at", null)
        // Exclude soft-deleted (admin-removed) answers from the embedded list
        // so a Delete / report-Remove disappears from the public question page.
        .is("answers.deleted_at", null)
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      const q = toQuestion(data as never as Parameters<typeof toQuestion>[0]);
      // accepted answer first, matching the mock's Detail-page ordering
      q.answers.sort((a, b) => Number(b.accepted) - Number(a.accepted));
      return q;
    },
    enabled: !!slug,
  });
}

/** Search page + homepage autocomplete. Only called with a non-blank query — a
 * blank query is "show everything", handled by useQuestionsList() instead
 * (matches the mock's `if (s.search && ...)` guard). */
export function useSearchQuestions(query: string) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: async (): Promise<ResolvedQuestion[]> => {
      const { data, error } = await supabase.rpc("search_questions", { p_query: query, p_limit: 20 });
      if (error) throw error;
      const rows = (data ?? []) as { id: string }[];
      if (rows.length === 0) return [];
      const ids = rows.map((r) => r.id);
      const { data: full, error: err2 } = await supabase.from("questions").select(QUESTION_LIST_SELECT).in("id", ids);
      if (err2) throw err2;
      const byId = new Map((full as never as Parameters<typeof toQuestion>[0][]).map((q) => [q.id, toQuestion(q)]));
      return ids.map((id) => byId.get(id)).filter((q): q is ResolvedQuestion => !!q);
    },
    enabled: query.trim().length > 0,
  });
}

// ───────────────────────── my votes (for optimistic "have I voted" state) ─────────────────────────

export function useMyVotes() {
  const { userId } = useAuth();
  return useQuery({
    queryKey: ["my-votes", userId],
    queryFn: async (): Promise<{ questions: Set<string>; answers: Set<string> }> => {
      const { data, error } = await supabase.from("votes").select("target_type,target_id");
      if (error) throw error;
      const questions = new Set<string>();
      const answers = new Set<string>();
      for (const v of data as { target_type: "question" | "answer"; target_id: string }[]) {
        (v.target_type === "question" ? questions : answers).add(v.target_id);
      }
      return { questions, answers };
    },
    enabled: !!userId,
    initialData: { questions: new Set(), answers: new Set() },
  });
}

// ───────────────────────── notifications ─────────────────────────

export function useNotifications() {
  const { userId } = useAuth();
  return useQuery({
    queryKey: ["notifications", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("id,type,question_id,answer_id,read_at,created_at,actor:profiles!actor_id(display_name),question:questions!notifications_question_id_fkey(slug,title)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as unknown as {
        id: string;
        type: "answer" | "verified" | "upvote";
        read_at: string | null;
        created_at: string;
        actor: { display_name: string } | null;
        question: { slug: string; title: string } | null;
      }[];
    },
    enabled: !!userId,
  });
}

export function useUnreadCount() {
  const { data } = useNotifications();
  return (data ?? []).filter((n) => !n.read_at).length;
}

// ───────────────────────── profile / settings ─────────────────────────

export function useProfileByUsername(username: string) {
  return useQuery({
    queryKey: ["profile", username],
    queryFn: async (): Promise<ProfileRow | null> => {
      const { data, error } = await supabase.from("profiles").select("*").eq("username", username).maybeSingle();
      if (error) throw error;
      return data as ProfileRow | null;
    },
    enabled: !!username,
  });
}

export function useProfileQuestions(profileId: string | undefined) {
  return useQuery({
    queryKey: ["profile-questions", profileId],
    queryFn: async (): Promise<ResolvedQuestion[]> => {
      const { data, error } = await supabase
        .from("questions")
        .select(QUESTION_LIST_SELECT)
        .eq("author_id", profileId)
        .is("deleted_at", null)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data as never as Parameters<typeof toQuestion>[0][]).map(toQuestion);
    },
    enabled: !!profileId,
  });
}

export function useProfileAnswered(profileId: string | undefined) {
  return useQuery({
    queryKey: ["profile-answered", profileId],
    queryFn: async (): Promise<ResolvedQuestion[]> => {
      const { data, error } = await supabase
        .from("answers")
        .select(`question:questions!answers_question_id_fkey(${QUESTION_LIST_SELECT})`)
        .eq("author_id", profileId)
        .is("deleted_at", null);
      if (error) throw error;
      const seen = new Set<string>();
      const out: ResolvedQuestion[] = [];
      for (const row of data as unknown as { question: Parameters<typeof toQuestion>[0] }[]) {
        if (!row.question || seen.has(row.question.id)) continue;
        seen.add(row.question.id);
        out.push(toQuestion(row.question));
      }
      return out;
    },
    enabled: !!profileId,
  });
}

export function useNotificationPrefs() {
  const { userId, profile } = useAuth();
  return useQuery({
    queryKey: ["notification-prefs", profile?.id],
    queryFn: async (): Promise<NotificationPreferencesRow | null> => {
      const { data, error } = await supabase
        .from("notification_preferences")
        .select("*")
        .eq("user_id", profile!.id)
        .maybeSingle();
      if (error) throw error;
      return data as NotificationPreferencesRow | null;
    },
    enabled: !!userId && !!profile,
  });
}

// ───────────────────────── reports / admin ─────────────────────────

export function useOpenReports() {
  return useQuery({
    queryKey: ["reports", "open"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reports")
        .select(
          "id,reason,status,created_at,detail,question_id,answer_id,reporter:profiles!reporter_id(display_name)," +
            "question:questions!reports_question_id_fkey(slug,title,body,author:profiles!questions_author_id_fkey(display_name))," +
            "answer:answers!reports_answer_id_fkey(id,body,question:questions!answers_question_id_fkey(slug),author:profiles!answers_author_id_fkey(display_name))"
        )
        .eq("status", "open")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as unknown as {
        id: string;
        reason: string;
        created_at: string;
        question_id: string | null;
        answer_id: string | null;
        reporter: { display_name: string } | null;
        question: { slug: string; title: string; body: string; author: { display_name: string } | null } | null;
        answer: { id: string; body: string; question: { slug: string } | null; author: { display_name: string } | null } | null;
      }[];
    },
  });
}

export interface AdminItem {
  key: string;
  kind: "Question" | "Answer";
  questionId: string;
  answerId: string | null;
  questionSlug: string;
  title: string;
  body: string;
  authorName: string;
  date: string;
  statusKey: string; // QuestionStatus for questions; 'accepted' | 'unaccepted' for answers
}

async function hydrateAdminRows(rows: AdminSearchRow[]): Promise<AdminItem[]> {
  if (rows.length === 0) return [];
  const authorIds = [...new Set(rows.map((r) => r.author_id))];
  const questionIds = [...new Set(rows.map((r) => r.question_id))];
  const [{ data: authors }, { data: questions }] = await Promise.all([
    supabase.from("profiles").select("id,display_name").in("id", authorIds),
    supabase.from("questions").select("id,slug").in("id", questionIds),
  ]);
  const authorById = new Map((authors ?? []).map((a: { id: string; display_name: string }) => [a.id, a.display_name]));
  const slugById = new Map((questions ?? []).map((q: { id: string; slug: string }) => [q.id, q.slug]));
  return rows.map((r) => ({
    key: r.kind === "question" ? `q:${r.question_id}` : `a:${r.answer_id}`,
    kind: r.kind === "question" ? "Question" : "Answer",
    questionId: r.question_id,
    answerId: r.answer_id,
    questionSlug: slugById.get(r.question_id) ?? "",
    title: r.title,
    body: r.body,
    authorName: authorById.get(r.author_id) ?? "?",
    date: timeAgo(r.created_at),
    statusKey: r.status_key,
  }));
}

/** Admin unified search bar — keyword/title/author branch. */
export function useAdminItems(query: string) {
  return useQuery({
    queryKey: ["admin-search", query],
    queryFn: async (): Promise<AdminItem[]> => {
      const { data, error } = await supabase.rpc("admin_search_content", { p_query: query });
      if (error) throw error;
      return hydrateAdminRows((data ?? []) as AdminSearchRow[]);
    },
    enabled: query.trim().length > 0,
  });
}

/** Admin unified search bar — "paste a URL" branch: parse the slug (and
 * optional #<answer-id> fragment) directly rather than free-text search. */
export function useAdminUrlLookup(raw: string) {
  const enabled = /https?:|\/|inventive\.ai/i.test(raw.trim());
  return useQuery({
    queryKey: ["admin-url-lookup", raw],
    queryFn: async (): Promise<AdminItem[]> => {
      // Stable answer anchors are "#answer-<uuid>"; also accept a bare
      // "#<uuid>" for backward compatibility with older shared links.
      const hashMatch = raw.match(/#(?:answer-)?([0-9a-f-]{8,})/i);
      if (hashMatch) {
        const { data } = await supabase
          .from("answers")
          .select("id,body,is_accepted,author_id,created_at,question:questions!answers_question_id_fkey(id,slug)")
          .eq("id", hashMatch[1])
          .is("deleted_at", null)
          .maybeSingle();
        if (!data) return [];
        const row = data as unknown as {
          id: string; body: string; is_accepted: boolean; author_id: string; created_at: string; question: { id: string; slug: string };
        };
        return hydrateAdminRows([
          { kind: "answer", question_id: row.question.id, answer_id: row.id, title: "", body: row.body, author_id: row.author_id, created_at: row.created_at, status_key: row.is_accepted ? "accepted" : "unaccepted" },
        ]).then(async (items) => {
          const { data: q } = await supabase.from("questions").select("title").eq("id", row.question.id).maybeSingle();
          return items.map((it) => ({ ...it, title: (q as { title: string } | null)?.title ?? "" }));
        });
      }
      const slug = raw.trim().split("/").filter(Boolean).pop()?.split("#")[0];
      if (!slug) return [];
      const { data } = await supabase
        .from("questions")
        .select("id,slug,title,body,status,author_id,created_at")
        .eq("slug", slug)
        .is("deleted_at", null)
        .maybeSingle();
      if (!data) return [];
      const row = data as { id: string; slug: string; title: string; body: string; status: string; author_id: string; created_at: string };
      return hydrateAdminRows([
        { kind: "question", question_id: row.id, answer_id: null, title: row.title, body: row.body, author_id: row.author_id, created_at: row.created_at, status_key: row.status },
      ]);
    },
    enabled,
  });
}
