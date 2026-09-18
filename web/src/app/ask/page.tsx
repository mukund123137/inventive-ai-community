"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GrayButton, PeachButton } from "@/components/ui/PeachButton";
import { BackIcon } from "@/components/icons";
import { useSubmitQuestion } from "@/lib/mutations";
import { useAuth } from "@/lib/auth";

export default function AskPage() {
  const router = useRouter();
  const { profile, loading } = useAuth();
  const submitQuestion = useSubmitQuestion();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  function submit() {
    if (!title.trim() || submitQuestion.isPending) return;
    if (!profile) {
      router.push("/login");
      return;
    }
    submitQuestion.mutate(
      { title, body },
      { onSuccess: (data) => router.push(`/questions/${data.slug}`) }
    );
  }

  return (
    <div className="mx-auto max-w-[1000px] p-[22px_24px_48px]">
      <div className="min-w-[300px] flex-1">
        <div
          onClick={() => router.push("/")}
          data-behavior="discards draft -> back to listing"
          className="mb-3.5 inline-flex cursor-pointer items-center gap-1.5 text-[13px] text-muted hover:text-lilac"
        >
          <BackIcon style={{ fontSize: 15 }} />
          Cancel
        </div>
        <h1 className="font-display mb-5 text-2xl font-bold tracking-[-.3px]">Ask a Question</h1>
        <div className="max-w-[640px] rounded-[10px] border border-border bg-surface p-[22px] shadow-card">
          <label className="mb-1.5 block text-[13px] font-semibold">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            data-behavior="required; live similar-question suggestions fire on blur"
            placeholder="Summarize your issue in one line"
            className="mb-1.5 w-full rounded-lg border border-border bg-surface-alt p-[10px_12px] text-[14px] outline-none"
          />
          <div className="mb-4.5 text-[11px] text-muted-2">Be specific. Imagine you&apos;re asking another Inventive AI admin.</div>
          <label className="mb-1.5 block text-[13px] font-semibold">Details</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            data-behavior="rich text in production (markdown/TipTap)"
            placeholder="Describe what you expected, what happened, and any steps to reproduce. Mention your project type if relevant."
            className="mb-4.5 min-h-[150px] w-full resize-y rounded-lg border border-border bg-surface-alt p-3 text-[13px] leading-[1.6] outline-none"
          />
          {!loading && !profile && (
            <div className="mb-3 rounded-lg bg-magenta-bg p-[10px_12px] text-[12.5px] text-magenta-dark">
              You need to be logged in to post. Posting will take you to the login page.
            </div>
          )}
          {submitQuestion.isError && (
            <div className="mb-3 rounded-lg bg-magenta-bg p-[10px_12px] text-[12.5px] text-magenta-dark">
              Couldn&apos;t post your question: {(submitQuestion.error as Error).message}
            </div>
          )}
          <div className="flex justify-end gap-2.5">
            <GrayButton onClick={() => router.push("/")} data-behavior="discard">
              Cancel
            </GrayButton>
            <PeachButton onClick={submit} disabled={submitQuestion.isPending} data-behavior="validate -> POST question -> redirect to its detail">
              {submitQuestion.isPending ? "Posting…" : "Post Question"}
            </PeachButton>
          </div>
        </div>
      </div>
    </div>
  );
}
