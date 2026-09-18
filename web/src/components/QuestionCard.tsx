"use client";

import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar";
import { StatusChip } from "@/components/ui/StatusChip";
import { VoteButton } from "@/components/ui/VoteButton";
import type { ResolvedQuestion } from "@/lib/data-types";
import { useToggleVote } from "@/lib/mutations";
import { useMyVotes } from "@/lib/queries";
import { useAuth } from "@/lib/auth";
import { STATUS } from "@/lib/status";
import { truncate } from "@/lib/utils";

export function QuestionCard({ q, spine = true }: { q: ResolvedQuestion; spine?: boolean }) {
  const router = useRouter();
  const { profile } = useAuth();
  const { data: myVotes } = useMyVotes();
  const toggleVote = useToggleVote();
  const voted = myVotes?.questions.has(q.id) ?? false;
  const status = STATUS[q.status];

  return (
    <div className="flex overflow-hidden rounded-lg border border-border bg-surface shadow-card transition-shadow hover:shadow-card-hover">
      {spine && <div className="w-[7px] flex-none" style={{ background: status.spine }} />}
      <div className="min-w-0 flex-1 p-[15px_17px]">
        <div className="mb-[9px] flex items-center gap-2.5">
          <Avatar author={q.author} onClick={() => router.push(`/u/${q.author.username}`)} />
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-semibold">{q.author.name}</div>
            <div className="text-[11px] text-muted-2">{q.time}</div>
          </div>
          <StatusChip status={status} />
        </div>
        <a
          onClick={() => router.push(`/questions/${q.slug}`)}
          className="mb-1.5 block cursor-pointer text-[16px] leading-[1.35] font-semibold text-ink hover:text-lilac"
        >
          {q.title}
        </a>
        <p className="m-0 text-[13px] leading-[1.5] text-muted">{truncate(q.body, 150)}</p>
        <div className="mt-[11px] flex items-center gap-2 flex-wrap">
          <div className="ml-auto flex items-center gap-3 text-[12px] text-muted">
            <VoteButton
              votes={q.votes}
              active={voted}
              onToggle={() => (profile ? toggleVote.mutate({ targetType: "question", targetId: q.id }) : router.push("/login"))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
