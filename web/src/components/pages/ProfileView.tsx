"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar";
import { EmptyState } from "@/components/ui/States";
import { StatusChip } from "@/components/ui/StatusChip";
import { useAuth } from "@/lib/auth";
import { toAuthor } from "@/lib/data-types";
import { useProfileAnswered, useProfileByUsername, useProfileQuestions } from "@/lib/queries";
import { STATUS } from "@/lib/status";

function joinedLabel(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function ProfileView({ username }: { username: string }) {
  const router = useRouter();
  const { profile: me } = useAuth();
  const { data: profile, isLoading } = useProfileByUsername(username);
  const isMe = !!me && !!profile && me.id === profile.id;

  const [tab, setTab] = useState<"questions" | "answers">("questions");
  const { data: questions } = useProfileQuestions(profile?.id);
  const { data: answered } = useProfileAnswered(profile?.id);
  const list = tab === "questions" ? (questions ?? []) : (answered ?? []);

  if (isLoading) return null;
  if (!profile) {
    return (
      <div className="mx-auto max-w-[900px] p-[22px_24px_48px]">
        <EmptyState title="Member not found" body="This profile doesn't exist." ctaLabel="Back to Ask & Answer" onCta={() => router.push("/")} />
      </div>
    );
  }

  const author = toAuthor(profile);

  return (
    <div>
      <div
        className="relative overflow-hidden border-b border-border-2"
        style={{ background: "linear-gradient(118deg,#FCECDF 0%,#F5E7EC 48%,#EBDFED 100%)" }}
      >
        <Image
          src="/assets/inventive-mark.svg"
          width={300}
          height={300}
          alt=""
          className="pointer-events-none absolute top-[-90px] right-[-60px] opacity-[.09]"
        />
        <div className="relative mx-auto flex max-w-[900px] flex-wrap items-center gap-4.5 p-[30px_24px]">
          <Avatar author={author} size="xl" ring />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2.5">
              <h1 className="font-display m-0 text-2xl font-bold text-ink">{author.name}</h1>
              {author.isStaff && (
                <span
                  className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-lilac-dark"
                  style={{ background: "linear-gradient(90deg,#F1EDFB,#FFEEE7)" }}
                >
                  Inventive Staff
                </span>
              )}
            </div>
            <p className="mt-1 text-[13px]" style={{ color: "#5A5568" }}>
              {author.role} · Joined {joinedLabel(profile.created_at)}
            </p>
          </div>
          {isMe && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => router.push("/profile/edit")}
                data-behavior="-> edit profile"
                className="cursor-pointer rounded-lg border-none bg-peach px-3.5 py-2 text-[13px] font-semibold text-ink"
              >
                Edit Profile
              </button>
              <button
                type="button"
                onClick={() => router.push("/settings")}
                data-behavior="-> settings"
                className="cursor-pointer rounded-lg border border-white/35 bg-white/16 px-3 py-2 text-[13px] font-semibold text-ink"
              >
                Settings
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-[900px] p-[22px_24px_40px]">
        <div className="mb-5.5 flex flex-wrap gap-3">
          <div className="min-w-[120px] flex-1 rounded-lg border border-border bg-surface p-[14px_16px]">
            <div className="font-display text-[22px] font-bold">{questions?.length ?? 0}</div>
            <div className="text-[12px] text-muted">Questions asked</div>
          </div>
          <div className="min-w-[120px] flex-1 rounded-lg border border-border bg-surface p-[14px_16px]">
            <div className="font-display text-[22px] font-bold">{answered?.length ?? 0}</div>
            <div className="text-[12px] text-muted">Answers given</div>
          </div>
        </div>

        <div className="mb-3.5 flex gap-5.5 border-b border-border-2">
          <span
            onClick={() => setTab("questions")}
            data-behavior="show questions tab"
            className="cursor-pointer py-2.5 text-[13px] font-semibold"
            style={{
              color: tab === "questions" ? "var(--color-lilac)" : "var(--color-muted)",
              borderBottom: `2px solid ${tab === "questions" ? "var(--color-lilac)" : "transparent"}`,
            }}
          >
            Questions
          </span>
          <span
            onClick={() => setTab("answers")}
            data-behavior="show answers tab"
            className="cursor-pointer py-2.5 text-[13px] font-semibold"
            style={{
              color: tab === "answers" ? "var(--color-lilac)" : "var(--color-muted)",
              borderBottom: `2px solid ${tab === "answers" ? "var(--color-lilac)" : "transparent"}`,
            }}
          >
            Answers
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {list.map((q) => {
            const status = STATUS[q.status];
            return (
              <div
                key={q.id}
                onClick={() => router.push(`/questions/${q.slug}`)}
                data-behavior="-> question detail"
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-surface p-[13px_16px] hover:shadow-card-hover"
              >
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-semibold">{q.title}</div>
                  <div className="mt-0.5 text-[11px] text-muted-2">
                    {q.catName} · {q.time}
                  </div>
                </div>
                <StatusChip status={status} size="sm" />
                <span className="flex-none text-[12px] text-muted">▲ {q.votes}</span>
              </div>
            );
          })}
          {list.length === 0 && <div className="p-7.5 text-center text-[13px] text-muted-2">Nothing here yet.</div>}
        </div>
      </div>
    </div>
  );
}
