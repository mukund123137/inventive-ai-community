"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "./supabase/client";
import { generateQuestionSlug } from "./slug";
import { useAuth } from "./auth";
import type { ReportReason } from "./supabase/database.types";

const supabase = createClient();

function useInvalidate() {
  const qc = useQueryClient();
  return (keys: string[][]) => keys.forEach((k) => qc.invalidateQueries({ queryKey: k }));
}

// ───────────────────────── votes ─────────────────────────

export function useToggleVote() {
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: async (args: { targetType: "question" | "answer"; targetId: string }) => {
      const { data, error } = await supabase.rpc("toggle_vote", {
        p_target_type: args.targetType,
        p_target_id: args.targetId,
      });
      if (error) throw error;
      return data as { voted: boolean; vote_count: number }[];
    },
    onSuccess: () => invalidate([["questions"], ["question"], ["search"], ["my-votes"], ["profile-questions"], ["profile-answered"]]),
  });
}

// ───────────────────────── answers ─────────────────────────

export function useSubmitAnswer() {
  const invalidate = useInvalidate();
  const { profile } = useAuth();
  return useMutation({
    mutationFn: async (args: { questionId: string; body: string }) => {
      if (!profile) throw new Error("not authenticated");
      const body = args.body.trim();
      if (!body) return;
      const { error } = await supabase.from("answers").insert({ question_id: args.questionId, author_id: profile.id, body });
      if (error) throw error;
    },
    onSuccess: () => invalidate([["question"], ["questions"], ["notifications"]]),
  });
}

export function useAcceptAnswer() {
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: async (args: { questionId: string; answerId: string }) => {
      const { error } = await supabase.rpc("accept_answer", { p_question_id: args.questionId, p_answer_id: args.answerId });
      if (error) throw error;
    },
    onSuccess: () => invalidate([["question"], ["questions"], ["notifications"], ["admin-search"], ["admin-url-lookup"]]),
  });
}

// ───────────────────────── questions ─────────────────────────

export function useSubmitQuestion() {
  const invalidate = useInvalidate();
  const { profile } = useAuth();
  return useMutation({
    mutationFn: async (args: { title: string; body: string }) => {
      if (!profile) throw new Error("not authenticated");
      const title = args.title.trim();
      if (!title) throw new Error("title required");
      const slug = generateQuestionSlug(title);
      const { data, error } = await supabase
        .from("questions")
        .insert({ author_id: profile.id, title, body: args.body.trim(), slug })
        .select("slug")
        .single();
      if (error) throw error;
      return data as { slug: string };
    },
    onSuccess: () => invalidate([["questions"]]),
  });
}

/** Staff-only (RLS-enforced) edit — see decision #1: regular users can't
 * edit their own content in this version. */
export function useEditQuestion() {
  const invalidate = useInvalidate();
  const { profile } = useAuth();
  return useMutation({
    mutationFn: async (args: { questionId: string; title: string; body: string }) => {
      const { error } = await supabase.from("questions").update({ title: args.title, body: args.body }).eq("id", args.questionId);
      if (error) throw error;
      await supabase
        .from("moderation_actions")
        .insert({ moderator_id: profile!.id, question_id: args.questionId, action: "edit_question" });
    },
    onSuccess: () => invalidate([["question"], ["questions"], ["admin-search"], ["admin-url-lookup"]]),
  });
}

export function useEditAnswer() {
  const invalidate = useInvalidate();
  const { profile } = useAuth();
  return useMutation({
    mutationFn: async (args: { answerId: string; questionId: string; body: string }) => {
      const { error } = await supabase.from("answers").update({ body: args.body }).eq("id", args.answerId);
      if (error) throw error;
      await supabase
        .from("moderation_actions")
        .insert({ moderator_id: profile!.id, question_id: args.questionId, answer_id: args.answerId, action: "edit_answer" });
    },
    onSuccess: () => invalidate([["question"], ["questions"], ["admin-search"], ["admin-url-lookup"]]),
  });
}

export function useDeleteItem() {
  const invalidate = useInvalidate();
  const { profile } = useAuth();
  return useMutation({
    mutationFn: async (args: { kind: "Question" | "Answer"; id: string; questionId: string }) => {
      const table = args.kind === "Question" ? "questions" : "answers";
      const { error } = await supabase.from(table).update({ deleted_at: new Date().toISOString() }).eq("id", args.id);
      if (error) throw error;
      await supabase.from("moderation_actions").insert({
        moderator_id: profile!.id,
        question_id: args.questionId,
        answer_id: args.kind === "Answer" ? args.id : null,
        action: args.kind === "Question" ? "delete_question" : "delete_answer",
      });
    },
    onSuccess: () => invalidate([["question"], ["questions"], ["admin-search"], ["admin-url-lookup"]]),
  });
}

export function useSetQuestionStatus() {
  const invalidate = useInvalidate();
  const { profile } = useAuth();
  return useMutation({
    mutationFn: async (args: { questionId: string; resolved: boolean }) => {
      const { error } = await supabase
        .from("questions")
        .update({ status: args.resolved ? "community" : "open", status_locked: true })
        .eq("id", args.questionId);
      if (error) throw error;
      await supabase.from("moderation_actions").insert({
        moderator_id: profile!.id,
        question_id: args.questionId,
        action: args.resolved ? "resolve_question" : "reopen_question",
      });
    },
    onSuccess: () => invalidate([["question"], ["questions"], ["admin-search"], ["admin-url-lookup"]]),
  });
}

// ───────────────────────── reports ─────────────────────────

export function useSubmitReport() {
  const { profile } = useAuth();
  return useMutation({
    mutationFn: async (args: { questionId?: string; answerId?: string; reason: ReportReason; detail: string }) => {
      if (!profile) throw new Error("not authenticated");
      const { error } = await supabase.from("reports").insert({
        reporter_id: profile.id,
        question_id: args.questionId ?? null,
        answer_id: args.answerId ?? null,
        reason: args.reason,
        detail: args.detail || null,
      });
      if (error) throw error;
    },
  });
}

export function useResolveReport() {
  const invalidate = useInvalidate();
  const { profile } = useAuth();
  return useMutation({
    mutationFn: async (args: { reportId: string; status: "kept" | "removed" | "dismissed"; questionId: string | null; answerId: string | null }) => {
      const { error } = await supabase.from("reports").update({ status: args.status }).eq("id", args.reportId);
      if (error) throw error;
      // "Remove" also soft-deletes the reported content (never a hard delete),
      // matching the direct Delete action's behavior.
      if (args.status === "removed") {
        const now = new Date().toISOString();
        if (args.answerId) {
          const { error: delErr } = await supabase.from("answers").update({ deleted_at: now }).eq("id", args.answerId);
          if (delErr) throw delErr;
        } else if (args.questionId) {
          const { error: delErr } = await supabase.from("questions").update({ deleted_at: now }).eq("id", args.questionId);
          if (delErr) throw delErr;
        }
      }
      await supabase.from("moderation_actions").insert({
        moderator_id: profile!.id,
        report_id: args.reportId,
        question_id: args.questionId,
        answer_id: args.answerId,
        action: args.status === "kept" ? "keep_report" : args.status === "removed" ? "remove_report" : "dismiss_report",
      });
    },
    onSuccess: () => invalidate([["reports"], ["questions"], ["question"], ["admin-search"], ["admin-url-lookup"]]),
  });
}

// ───────────────────────── notifications ─────────────────────────

export function useMarkNotifRead() {
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("notifications").update({ read_at: new Date().toISOString() }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => invalidate([["notifications"]]),
  });
}

export function useMarkAllNotifsRead() {
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("notifications").update({ read_at: new Date().toISOString() }).is("read_at", null);
      if (error) throw error;
    },
    onSuccess: () => invalidate([["notifications"]]),
  });
}

// ───────────────────────── settings / profile ─────────────────────────

export function useTogglePref() {
  const invalidate = useInvalidate();
  const { profile } = useAuth();
  return useMutation({
    mutationFn: async (args: { key: "answers" | "mentions" | "verified" | "upvotes" | "digest"; value: boolean }) => {
      const { error } = await supabase.from("notification_preferences").update({ [args.key]: args.value }).eq("user_id", profile!.id);
      if (error) throw error;
    },
    onSuccess: () => invalidate([["notification-prefs"]]),
  });
}

export function useUpdateProfile() {
  const invalidate = useInvalidate();
  const { profile } = useAuth();
  return useMutation({
    mutationFn: async (fields: { display_name?: string; username?: string; company?: string; bio?: string; avatar_url?: string | null }) => {
      const { error } = await supabase.from("profiles").update(fields).eq("id", profile!.id);
      if (error) throw error;
    },
    onSuccess: () => invalidate([["profile"], ["questions"], ["question"]]),
  });
}
