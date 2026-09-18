import Image from "next/image";
import { ErrorIcon } from "@/components/icons";
import { PeachButton } from "./PeachButton";

export function SkeletonCard() {
  return (
    <div className="rounded-lg border border-border bg-surface p-[15px_17px]">
      <div className="mb-2.5 flex gap-2.5">
        <div className="skel h-8 w-8 rounded-full" />
        <div className="flex-1">
          <div className="skel mb-1.5 h-[11px] w-[120px]" />
          <div className="skel h-[9px] w-[80px]" />
        </div>
      </div>
      <div className="skel mb-2 h-[15px] w-3/4" />
      <div className="skel mb-1 h-[11px] w-full" />
      <div className="skel h-[11px] w-3/5" />
    </div>
  );
}

export function FeedSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="rounded-[10px] border border-[#F5D6E1] bg-[#FDF2F6] p-12 text-center">
      <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#FCE4EC]">
        <ErrorIcon style={{ fontSize: 22, color: "var(--color-magenta-dark)" }} />
      </div>
      <div className="mb-1 text-[15px] font-semibold">Couldn&apos;t load questions</div>
      <p className="mb-4 text-[13px] text-muted">Something went wrong on our end. Check your connection and try again.</p>
      <button
        type="button"
        onClick={onRetry}
        data-behavior="re-fetch listing"
        className="cursor-pointer rounded-md border border-peach-border bg-peach px-4.5 py-2 text-[13px] font-semibold text-ink"
      >
        Retry
      </button>
    </div>
  );
}

export function EmptyState({
  title,
  body,
  ctaLabel,
  onCta,
  dashed = true,
}: {
  title: string;
  body: string;
  ctaLabel?: string;
  onCta?: () => void;
  dashed?: boolean;
}) {
  return (
    <div className={`rounded-[10px] ${dashed ? "border border-dashed border-border-strong" : "border border-border"} bg-surface p-11 text-center`}>
      <Image src="/assets/not-found.svg" width={120} height={90} alt="" className="mx-auto opacity-90" />
      <div className="mt-3.5 mb-1 text-[15px] font-semibold">{title}</div>
      <p className="mx-auto mb-4 max-w-[340px] text-[13px] text-muted">{body}</p>
      {ctaLabel && onCta && <PeachButton onClick={onCta}>{ctaLabel}</PeachButton>}
    </div>
  );
}
