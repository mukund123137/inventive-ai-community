"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "@/components/icons";
import { StatusChip } from "@/components/ui/StatusChip";
import { EmptyState } from "@/components/ui/States";
import { useAuthModal } from "@/lib/auth-modal";
import { useQuestionsList, useSearchQuestions } from "@/lib/queries";
import { STATUS } from "@/lib/status";

function useDebounced(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

function SearchPageInner() {
  const router = useRouter();
  const { requireAuth } = useAuthModal();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const debouncedQuery = useDebounced(query, 300);
  const trimmed = debouncedQuery.trim();

  const { data: all } = useQuestionsList();
  const { data: searchResults } = useSearchQuestions(trimmed);

  const results = trimmed.length > 0 ? (searchResults ?? []) : (all ?? []);
  const isEmpty = query.trim().length > 0 && results.length === 0;

  return (
    <div className="mx-auto max-w-[900px] p-[22px_24px_48px]">
      <div className="relative mb-4.5">
        <SearchIcon style={{ fontSize: 17, color: "#7C8588", position: "absolute", left: 13, top: 13 }} />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            router.replace(`/search?q=${encodeURIComponent(e.target.value)}`, { scroll: false });
          }}
          data-behavior="live search; Enter re-queries"
          placeholder="Search the community…"
          className="w-full rounded-[9px] border border-border-strong bg-white p-[12px_12px_12px_38px] text-[15px] outline-none"
        />
      </div>
      <div className="mb-4 text-[13px] text-muted">
        {results.length} results for &ldquo;<b className="text-ink">{query}</b>&rdquo;
      </div>
      {isEmpty && (
        <EmptyState
          title="No results for that search"
          body="Try different keywords, or ask the community."
          ctaLabel="Ask a Question"
          onCta={() => requireAuth(() => router.push("/ask"))}
        />
      )}
      <div className="flex flex-col gap-2.5">
        {results.map((q) => {
          const status = STATUS[q.status];
          return (
            <div
              key={q.id}
              onClick={() => router.push(`/questions/${q.slug}`)}
              data-behavior="-> question detail"
              className="flex cursor-pointer overflow-hidden rounded-lg border border-border bg-surface hover:shadow-card-hover"
            >
              <div className="w-1.5 flex-none" style={{ background: status.spine }} />
              <div className="min-w-0 flex-1 p-[13px_15px]">
                <div className="mb-1.5 flex items-center gap-2">
                  <StatusChip status={status} size="sm" />
                  <span className="text-[11px] text-muted-2">
                    {q.catName} · {q.time}
                  </span>
                </div>
                <div className="text-[15px] leading-[1.35] font-semibold">{q.title}</div>
                <div className="mt-1.5 flex gap-3.5 text-[12px] text-muted">
                  <span>▲ {q.votes}</span>
                  <span>{q.answerCount} answers</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchPageInner />
    </Suspense>
  );
}
