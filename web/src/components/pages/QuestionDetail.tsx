"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ReportModal } from "@/components/ReportModal";
import { Avatar } from "@/components/ui/Avatar";
import { EmptyState } from "@/components/ui/States";
import { PeachButton } from "@/components/ui/PeachButton";
import { BackIcon } from "@/components/icons";
import { useAuth } from "@/lib/auth";
import { STATUS } from "@/lib/status";
import { useAcceptAnswer, useSubmitAnswer, useToggleVote } from "@/lib/mutations";
import { useMyVotes, useQuestion } from "@/lib/queries";
import type { ResolvedAnswer } from "@/lib/data-types";

export function QuestionDetail({ slug }: { slug: string }) {
  const router = useRouter();
  const { profile } = useAuth();
  const { data: q, isLoading } = useQuestion(slug);
  const { data: myVotes } = useMyVotes();
  const toggleVote = useToggleVote();
  const acceptAnswer = useAcceptAnswer();
  const submitAnswer = useSubmitAnswer();
  const [answerDraft, setAnswerDraft] = useState("");
  const [reportTarget, setReportTarget] = useState<{ questionId?: string; answerId?: string; kind: "Question" | "Answer" } | null>(null);
  const [highlightId, setHighlightId] = useState<string | null>(null);

  const answers = useMemo(() => q?.answers ?? [], [q]);

  // Stable answer deep-links: /questions/<slug>#answer-<answerId>. When the
  // page opens on such a URL (direct load or in-app navigation), scroll the
  // targeted answer into view and highlight it briefly.
  useEffect(() => {
    if (!q) return;
    function focusFromHash() {
      const m = window.location.hash.match(/^#answer-(.+)$/);
      if (!m) return;
      const answerId = m[1];
      const el = document.getElementById(`answer-${answerId}`);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setHighlightId(answerId);
      setTimeout(() => setHighlightId((cur) => (cur === answerId ? null : cur)), 2200);
    }
    focusFromHash();
    window.addEventListener("hashchange", focusFromHash);
    return () => window.removeEventListener("hashchange", focusFromHash);
  }, [q]);

  function requireLogin() {
    if (!profile) {
      router.push("/login");
      return false;
    }
    return true;
  }

  if (isLoading) return null;

  if (!q) {
    return (
      <div className="mx-auto max-w-[900px] p-[22px_24px_48px]">
        <EmptyState title="Question not found" body="It may have been removed." ctaLabel="Back to Ask & Answer" onCta={() => router.push("/")} />
      </div>
    );
  }

  const status = STATUS[q.status];
  const canAccept = profile?.id === q.author.id;

  return (
    <div className="mx-auto max-w-[900px] p-[22px_24px_48px]">
      <div
        onClick={() => router.push("/")}
        data-behavior="-> back to listing"
        className="mb-4 inline-flex cursor-pointer items-center gap-1.5 text-[13px] text-muted hover:text-lilac"
      >
        <BackIcon style={{ fontSize: 15 }} />
        Back to Ask &amp; Answer
      </div>

      <div className="flex overflow-hidden rounded-[10px] border border-border bg-surface shadow-card">
        <div className="w-[7px] flex-none" style={{ background: status.spine }} />
        <div className="min-w-0 flex-1 p-[24px_26px]">
          <h1 className="font-display mb-3.5 text-2xl leading-[1.25] font-bold tracking-[-.3px]">{q.title}</h1>
          <div className="flex flex-wrap items-center gap-4 border-b border-border-3 pb-4">
            <div className="flex items-center gap-2.5">
              <Avatar author={q.author} size="lg" onClick={() => router.push(`/u/${q.author.username}`)} />
              <div>
                <div className="text-[13px] font-semibold">{q.author.name}</div>
                <div className="text-[11px] text-muted-2">Asked {q.time}</div>
              </div>
            </div>
          </div>
          <div className="p-[16px_0_4px] text-[14px] leading-[1.65] text-body">{q.body}</div>
        </div>
      </div>

      <div className="mt-6.5 mb-3.5 flex items-center gap-2">
        <h2 className="font-display m-0 text-[16px] font-bold">{q.answerCount} Answers</h2>
      </div>
      <div className="flex flex-col gap-3.5">
        {answers.map((a) => (
          <AnswerRow
            key={a.id}
            answer={a}
            questionSlug={q.slug}
            highlighted={highlightId === a.id}
            voted={myVotes?.answers.has(a.id) ?? false}
            onVote={() => requireLogin() && toggleVote.mutate({ targetType: "answer", targetId: a.id })}
            canAccept={canAccept}
            onAccept={() => acceptAnswer.mutate({ questionId: q.id, answerId: a.id })}
            onReport={() => requireLogin() && setReportTarget({ answerId: a.id, kind: "Answer" })}
          />
        ))}
        {answers.length === 0 && (
          <div className="rounded-[10px] border border-dashed border-border-strong p-[30px_20px] text-center text-[13px] text-muted-2">
            No answers yet. Be the first to help.
          </div>
        )}
      </div>

      <div className="mt-5.5 rounded-[10px] border border-border bg-surface p-[18px_20px]">
        <div className="mb-2.5 text-[14px] font-semibold">Your Answer</div>
        <textarea
          value={answerDraft}
          onChange={(e) => setAnswerDraft(e.target.value)}
          placeholder="Share how you solved this, or add detail that helps others…"
          className="min-h-[96px] w-full resize-y rounded-lg border border-border bg-surface-alt p-3 text-[13px] leading-[1.5] outline-none"
        />
        {submitAnswer.isError && (
          <div className="mt-2.5 rounded-lg bg-magenta-bg p-[10px_12px] text-[12.5px] text-magenta-dark">
            Couldn&apos;t post your answer: {(submitAnswer.error as Error).message}
          </div>
        )}
        <div className="mt-2.5 flex justify-end">
          <PeachButton
            disabled={submitAnswer.isPending}
            onClick={() => {
              if (!answerDraft.trim() || submitAnswer.isPending) return;
              if (!requireLogin()) return;
              submitAnswer.mutate(
                { questionId: q.id, body: answerDraft },
                { onSuccess: () => setAnswerDraft("") }
              );
            }}
            data-behavior="submit -> adds an answer (POST), appears in list"
          >
            {submitAnswer.isPending ? "Posting…" : "Post Answer"}
          </PeachButton>
        </div>
      </div>

      {reportTarget && (
        <ReportModal
          open
          kind={reportTarget.kind}
          questionId={reportTarget.questionId}
          answerId={reportTarget.answerId}
          onClose={() => setReportTarget(null)}
        />
      )}
    </div>
  );
}

function AnswerRow({
  answer,
  questionSlug,
  highlighted,
  voted,
  onVote,
  canAccept,
  onAccept,
  onReport,
}: {
  answer: ResolvedAnswer;
  questionSlug: string;
  highlighted: boolean;
  voted: boolean;
  onVote: () => void;
  canAccept: boolean;
  onAccept: () => void;
  onReport: () => void;
}) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  function copyLink() {
    const url = `${window.location.origin}/questions/${questionSlug}#answer-${answer.id}`;
    navigator.clipboard
      ?.writeText(url)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(() => {});
  }
  const isStaff = answer.author.isStaff;
  const acceptLabel = isStaff ? "Verified Answer" : "Accepted Answer";
  const acceptBg = isStaff ? "#F1EDFB" : "#E8F5E9";
  const acceptFg = isStaff ? "#4A3D6E" : "#2E7D39";
  const bg = answer.accepted ? (isStaff ? "#F7F4FD" : "#F4FBF5") : "#fff";
  const borderColor = answer.accepted ? (isStaff ? "#E4DBF5" : "#D4EBD6") : "var(--color-border)";

  return (
    <div
      id={`answer-${answer.id}`}
      className="scroll-mt-24 rounded-[10px] border p-[18px_20px] transition-shadow duration-500"
      style={{
        background: bg,
        borderColor: highlighted ? "var(--color-lilac)" : borderColor,
        boxShadow: highlighted ? "0 0 0 3px var(--color-lilac-tint)" : undefined,
      }}
    >
      <div className="mb-2.5 flex items-center gap-2.5">
        <Avatar author={answer.author} onClick={() => router.push(`/u/${answer.author.username}`)} />
        <div className="min-w-0 flex-1">
          <span className="text-[13px] font-semibold">{answer.author.name}</span>
          <div className="text-[11px] text-muted-2">{answer.time}</div>
        </div>
        {answer.accepted && (
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-[3px] text-[11px] font-semibold"
            style={{ background: acceptBg, color: acceptFg }}
          >
            {acceptLabel}
          </span>
        )}
      </div>
      <p className="mb-3 text-[13.5px] leading-[1.6] text-body">{answer.body}</p>
      <div className="flex items-center gap-3.5">
        <button
          type="button"
          onClick={onVote}
          data-behavior="toggles your upvote on this answer"
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-border bg-transparent px-2.5 py-1.5 text-[12px] font-semibold"
          style={{ color: voted ? "var(--color-lilac)" : "var(--color-muted)" }}
        >
          ▲ {answer.votes}
        </button>
        {canAccept && (
          <button
            type="button"
            onClick={onAccept}
            data-behavior="question author accepts/unaccepts -> resolves question"
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-success-border px-2.5 py-1.5 text-[12px] font-semibold text-success-fg"
          >
            {answer.accepted ? "Unaccept" : "Accept answer"}
          </button>
        )}
        <span
          onClick={copyLink}
          data-behavior="copy this answer's stable link"
          className="ml-auto cursor-pointer text-[12px] text-muted-2 hover:text-lilac"
        >
          {copied ? "Link copied" : "Copy link"}
        </span>
        <span onClick={onReport} data-behavior="-> Report flow" className="cursor-pointer text-[12px] text-muted-2 hover:text-magenta-dark">
          Report
        </span>
      </div>
    </div>
  );
}
