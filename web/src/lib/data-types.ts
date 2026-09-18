import { initialsOf, timeAgo } from "./time";
import type { ProfileRow, QuestionStatus } from "./supabase/database.types";

export interface Author {
  id: string;
  username: string;
  name: string;
  initials: string;
  tone: string;
  avatarUrl: string | null;
  isStaff: boolean;
  role: "Member" | "Inventive Staff";
}

export interface ResolvedAnswer {
  id: string;
  author: Author;
  time: string;
  votes: number;
  accepted: boolean;
  body: string;
}

export interface ResolvedQuestion {
  id: string;
  slug: string;
  catName: string;
  title: string;
  body: string;
  author: Author;
  time: string;
  votes: number;
  status: QuestionStatus;
  answerCount: number;
  createdAt: string;
  answers: ResolvedAnswer[]; // [] on list/card queries that don't embed answers
}

export function toAuthor(p: Pick<ProfileRow, "id" | "username" | "display_name" | "avatar_tone" | "avatar_url" | "role">): Author {
  return {
    id: p.id,
    username: p.username,
    name: p.display_name,
    initials: initialsOf(p.display_name),
    tone: p.avatar_tone,
    avatarUrl: p.avatar_url ?? null,
    isStaff: p.role === "admin",
    role: p.role === "admin" ? "Inventive Staff" : "Member",
  };
}

interface RawAnswer {
  id: string;
  body: string;
  is_accepted: boolean;
  vote_count: number;
  created_at: string;
  author: Pick<ProfileRow, "id" | "username" | "display_name" | "avatar_tone" | "avatar_url" | "role">;
}

export function toAnswer(a: RawAnswer): ResolvedAnswer {
  return {
    id: a.id,
    author: toAuthor(a.author),
    time: timeAgo(a.created_at),
    votes: a.vote_count,
    accepted: a.is_accepted,
    body: a.body,
  };
}

interface RawQuestion {
  id: string;
  slug: string;
  title: string;
  body: string;
  status: QuestionStatus;
  vote_count: number;
  answer_count: number;
  created_at: string;
  author: Pick<ProfileRow, "id" | "username" | "display_name" | "avatar_tone" | "avatar_url" | "role">;
  category: { name: string } | null;
  answers?: RawAnswer[];
}

export function toQuestion(q: RawQuestion): ResolvedQuestion {
  return {
    id: q.id,
    slug: q.slug,
    catName: q.category?.name ?? "",
    title: q.title,
    body: q.body,
    author: toAuthor(q.author),
    time: timeAgo(q.created_at),
    votes: q.vote_count,
    status: q.status,
    answerCount: q.answer_count,
    createdAt: q.created_at,
    answers: (q.answers ?? []).map(toAnswer),
  };
}

/** select= string for list/card views — no nested answers. */
export const QUESTION_LIST_SELECT =
  "id,slug,title,body,status,vote_count,answer_count,created_at,author:profiles!questions_author_id_fkey(id,username,display_name,avatar_tone,avatar_url,role),category:categories(name)";

/** select= string for the Detail page — includes nested answers + their authors. */
export const QUESTION_DETAIL_SELECT =
  "id,slug,title,body,status,vote_count,answer_count,created_at,author:profiles!questions_author_id_fkey(id,username,display_name,avatar_tone,avatar_url,role),category:categories(name)," +
  "answers:answers!answers_question_id_fkey(id,body,is_accepted,vote_count,created_at,author:profiles!answers_author_id_fkey(id,username,display_name,avatar_tone,avatar_url,role))";
