"use client";

import { useRouter } from "next/navigation";
import { EmptyState } from "@/components/ui/States";
import { useMarkAllNotifsRead, useMarkNotifRead } from "@/lib/mutations";
import { useNotifications } from "@/lib/queries";
import { timeAgo } from "@/lib/time";

const TYPE_META: Record<string, { text: string; icon: string; iconBg: string }> = {
  answer: { text: "answered your question", icon: "💬", iconBg: "#F1EDFB" },
  verified: { text: "marked an answer Staff Verified on", icon: "✓", iconBg: "#F1EDFB" },
  upvote: { text: "upvoted your answer on", icon: "▲", iconBg: "#E8F5E9" },
};

export default function NotificationsPage() {
  const router = useRouter();
  const { data: notifs } = useNotifications();
  const markNotifRead = useMarkNotifRead();
  const markAllNotifsRead = useMarkAllNotifsRead();

  const list = notifs ?? [];

  return (
    <div className="mx-auto max-w-[720px] p-[22px_24px_48px]">
      <div className="mb-4 flex items-center gap-2.5">
        <h1 className="font-display m-0 text-[22px] font-bold">Notifications</h1>
        <span
          onClick={() => markAllNotifsRead.mutate()}
          data-behavior="marks all read"
          className="ml-auto cursor-pointer text-[12px] text-lilac"
        >
          Mark all as read
        </span>
      </div>

      {list.length === 0 ? (
        <EmptyState title="You're all caught up" body="New answers, mentions, and verified fixes will show up here." dashed />
      ) : (
        <div className="flex flex-col gap-px overflow-hidden rounded-[10px] border border-border bg-surface">
          {list.map((n) => {
            const meta = TYPE_META[n.type];
            const unread = !n.read_at;
            return (
              <div
                key={n.id}
                onClick={() => {
                  markNotifRead.mutate(n.id);
                  if (n.question) router.push(`/questions/${n.question.slug}`);
                }}
                data-behavior="-> related question detail; marks read"
                className="flex cursor-pointer items-start gap-3 border-b border-border-3 p-[14px_16px] hover:bg-surface-alt"
                style={{ background: unread ? "#F7F4FD" : "#fff" }}
              >
                <div className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-full" style={{ background: meta.iconBg }}>
                  <span className="text-[15px]">{meta.icon}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] leading-[1.45]">
                    <b>{n.actor?.display_name ?? "Inventive Team"}</b> {meta.text}{" "}
                    <span className="text-lilac">{n.question?.title}</span>
                  </div>
                  <div className="mt-0.5 text-[11px] text-muted-2">{timeAgo(n.created_at)}</div>
                </div>
                {unread && <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-lilac" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
