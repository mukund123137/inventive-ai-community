import type { ResolvedQuestion } from "./data-types";

export type SortKey = "trending" | "new" | "unanswered" | "top";

function trendingScore(q: ResolvedQuestion): number {
  return q.votes + q.answerCount * 3;
}

/**
 * Client-side sort/filter over an already-fetched question list — same
 * shape as the mock's filterAndSort(). Deliberately not pushed into a
 * paginated server-side query: this app fetches the whole (small) question
 * list once per feed load, same scale assumption the original mock made.
 */
export function sortQuestions(all: ResolvedQuestion[], sort: SortKey): ResolvedQuestion[] {
  let list = [...all];
  if (sort === "unanswered") list = list.filter((q) => q.status === "unanswered");
  if (sort === "new") list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  else if (sort === "top") list.sort((a, b) => b.votes - a.votes);
  else list.sort((a, b) => trendingScore(b) - trendingScore(a));
  return list;
}

export function getTrending(all: ResolvedQuestion[], limit = 5): ResolvedQuestion[] {
  return [...all].sort((a, b) => trendingScore(b) - trendingScore(a)).slice(0, limit);
}
