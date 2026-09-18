"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@/components/icons";
import { getTrending } from "@/lib/filters";
import { useQuestionsList, useSearchQuestions } from "@/lib/queries";

function splitMatch(title: string, query: string) {
  const idx = title.toLowerCase().indexOf(query.toLowerCase());
  if (idx < 0) return { pre: title, mid: "", post: "" };
  return { pre: title.slice(0, idx), mid: title.slice(idx, idx + query.length), post: title.slice(idx + query.length) };
}

function answerLabel(count: number) {
  return `${count} ${count === 1 ? "answer" : "answers"}`;
}

function useDebounced(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export function HomeSearch() {
  const router = useRouter();
  const { data: all } = useQuestionsList();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounced(query, 300);

  useEffect(() => {
    function onDocDown(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setFocused(false);
    }
    document.addEventListener("mousedown", onDocDown);
    return () => document.removeEventListener("mousedown", onDocDown);
  }, []);

  const trimmed = query.trim();
  const { data: matches, isFetching: searchFetching } = useSearchQuestions(debouncedQuery.trim());
  const loading = trimmed.length > 0 && (searchFetching || debouncedQuery.trim() !== trimmed);

  const showDrop = focused;
  const showTrending = showDrop && trimmed.length === 0;
  const showLoading = showDrop && trimmed.length > 0 && loading;
  const showResults = showDrop && trimmed.length > 0 && !loading && (matches?.length ?? 0) > 0;
  const showEmpty = showDrop && trimmed.length > 0 && !loading && (matches?.length ?? 0) === 0;
  const trending = getTrending(all ?? [], 5);

  function goToSearch() {
    setFocused(false);
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <div className="mx-auto flex max-w-[640px] gap-3">
      <div ref={wrapRef} data-behavior="homepage search component" className="relative min-w-0 flex-1 text-left">
        <SearchIcon style={{ fontSize: 17, color: "#7C8588", position: "absolute", left: 14, top: 16, zIndex: 2 }} />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setFocused(true);
          }}
          onFocus={() => setFocused(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") goToSearch();
          }}
          data-behavior="focus opens dropdown; type filters; Enter -> results"
          placeholder="Search questions… e.g. How do I connect Google Drive?"
          className="w-full border border-border-strong bg-white py-3.5 pr-3.5 pl-[42px] text-[15px] outline-none"
          style={{
            borderRadius: focused ? "14px 14px 0 0" : "14px",
            boxShadow: "0 2px 10px rgba(16,24,40,.08)",
          }}
        />
        {showDrop && (
          <div className="absolute top-full right-0 left-0 z-40 max-h-[62vh] overflow-hidden overflow-y-auto rounded-b-2xl border border-t-0 border-border-strong bg-white shadow-menu">
            {showTrending && (
              <>
                <div className="flex items-center gap-1.5 px-4 pt-3 pb-1.5 text-[11px] font-bold tracking-[.06em] text-muted-2 uppercase">
                  Trending questions
                </div>
                {trending.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => {
                      setFocused(false);
                      router.push(`/questions/${t.slug}`);
                    }}
                    data-behavior="-> question detail"
                    className="flex cursor-pointer items-center gap-[11px] px-4 py-2.5 hover:bg-lilac-tint"
                  >
                    <SearchIcon style={{ fontSize: 15, color: "#9CA3AF", flexShrink: 0 }} />
                    <span className="min-w-0 flex-1 truncate text-[13.5px] text-ink">{t.title}</span>
                    <span className="flex-none text-[11px] whitespace-nowrap text-muted-2">{answerLabel(t.answerCount)}</span>
                  </div>
                ))}
              </>
            )}
            {showLoading && (
              <div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-[11px] px-4 py-3.5">
                    <div className="skel h-[15px] w-[15px] flex-none rounded" />
                    <div className="skel h-[11px] flex-1" />
                  </div>
                ))}
              </div>
            )}
            {showResults && (
              <>
                <div className="px-4 pt-3 pb-1.5 text-[11px] font-bold tracking-[.06em] text-muted-2 uppercase">Suggestions</div>
                {(matches ?? []).map((m) => {
                  const { pre, mid, post } = splitMatch(m.title, trimmed);
                  return (
                    <div
                      key={m.id}
                      onClick={() => {
                        setFocused(false);
                        router.push(`/questions/${m.slug}`);
                      }}
                      data-behavior="-> question detail"
                      className="flex cursor-pointer items-center gap-[11px] border-b border-border-3 px-4 py-2.5 hover:bg-lilac-tint"
                    >
                      <SearchIcon style={{ fontSize: 15, color: "#9CA3AF", flexShrink: 0 }} />
                      <span className="min-w-0 flex-1 truncate text-[13.5px] text-muted">
                        {pre}
                        <span className="rounded-sm bg-mandarin-tint font-bold text-ink">{mid}</span>
                        {post}
                      </span>
                      <span className="flex-none text-[11px] whitespace-nowrap text-muted-2">{answerLabel(m.answerCount)}</span>
                    </div>
                  );
                })}
                <div
                  onClick={goToSearch}
                  data-behavior="-> search results"
                  className="flex cursor-pointer items-center gap-2 bg-[#FAFAFB] px-4 py-3 text-[13px] font-semibold text-lilac-dark hover:bg-lilac-tint"
                >
                  <SearchIcon style={{ fontSize: 15 }} />
                  See all results for &ldquo;{query}&rdquo;
                </div>
              </>
            )}
            {showEmpty && (
              <div className="p-6 text-center">
                <div className="mb-1 text-[14px] font-semibold text-ink">No questions found</div>
                <div className="mb-3.5 text-[12.5px] leading-[1.5] text-muted">
                  Nothing matches &ldquo;{query}&rdquo;. Start a new question and get help from the community.
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFocused(false);
                    router.push("/ask");
                  }}
                  data-behavior="-> Ask Question flow"
                  className="cursor-pointer rounded-md border border-peach bg-peach px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white"
                >
                  Ask a Question
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={() => router.push("/ask")}
        data-behavior="-> Ask Question flow"
        className="cursor-pointer rounded-lg border-none bg-peach px-5 text-[14px] font-semibold whitespace-nowrap text-ink shadow-hero-btn"
      >
        Ask a Question
      </button>
    </div>
  );
}
