"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { HomeSearch } from "@/components/HomeSearch";
import { QuestionCard } from "@/components/QuestionCard";
import { EmptyState, ErrorState, FeedSkeleton } from "@/components/ui/States";
import { sortQuestions, type SortKey } from "@/lib/filters";
import { useQuestionsList } from "@/lib/queries";

const SORT_TABS: { key: SortKey; label: string }[] = [
  { key: "trending", label: "Trending" },
  { key: "new", label: "New" },
  { key: "unanswered", label: "Unanswered" },
  { key: "top", label: "Top" },
];

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <HomePageInner />
    </Suspense>
  );
}

function HomePageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const debugState = searchParams.get("state"); // QA-only override: ?state=loading|error
  const [sort, setSort] = useState<SortKey>("trending");
  const { data: all, isLoading: queryLoading, isError: queryError, refetch } = useQuestionsList();

  const list = useMemo(() => sortQuestions(all ?? [], sort), [all, sort]);

  const isLoading = debugState === "loading" || queryLoading;
  const isError = debugState === "error" || queryError;
  const isEmpty = !isLoading && !isError && list.length === 0;
  const isReady = !isLoading && !isError && !isEmpty;

  return (
    <div>
      <div className="relative border-b border-border-2" style={{ background: "linear-gradient(118deg,#FCECDF 0%,#F5E7EC 48%,#EBDFED 100%)" }}>
        <div className="relative mx-auto max-w-[1180px] p-[26px_18px_24px] text-center md:p-[40px_24px_36px]">
          <h1 className="font-display mb-2.5 font-bold tracking-[-.5px] text-ink" style={{ fontSize: "clamp(26px,3.6vw,44px)" }}>
            Ask &amp; Answer
          </h1>
          <p className="mx-auto mb-5 max-w-[540px] text-[15px] leading-[1.55]" style={{ color: "#5A5568" }}>
            Search answered questions from the Inventive AI community, or ask your own and get help from other teams and staff.
          </p>
          <HomeSearch />
        </div>
      </div>

      <div className="mx-auto max-w-[820px] p-[22px_24px_40px]">
        <div className="mb-3 flex items-baseline gap-2.5">
          <span className="text-[13px] font-semibold text-muted">{list.length} questions</span>
        </div>
        <div className="mb-3.5 flex flex-wrap gap-1.5">
          {SORT_TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setSort(t.key)}
              data-behavior="re-sort listing"
              className="cursor-pointer rounded-full px-3.5 py-1.5 text-[12px] font-semibold"
              style={{
                background: sort === t.key ? "var(--color-lilac)" : "var(--color-neutral-bg)",
                color: sort === t.key ? "#fff" : "#4A5154",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {isLoading && <FeedSkeleton />}
        {isError && (
          <ErrorState
            onRetry={() => {
              const params = new URLSearchParams(searchParams.toString());
              params.delete("state");
              router.replace(params.size ? `/?${params.toString()}` : "/");
              refetch();
            }}
          />
        )}
        {isEmpty && (
          <EmptyState
            title="No questions here yet"
            body="Nothing matches this view. Be the first to start the conversation."
            ctaLabel="Ask a Question"
            onCta={() => router.push("/ask")}
          />
        )}
        {isReady && (
          <div className="flex flex-col gap-3">
            {list.map((q) => (
              <QuestionCard key={q.id} q={q} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
