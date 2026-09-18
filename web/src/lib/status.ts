import type { QuestionStatus } from "./supabase/database.types";

export interface StatusDef {
  spine: string;
  label: string;
  bg: string;
  fg: string;
  check: boolean;
}

/**
 * Pure presentation lookup — label/color per status. Not data, so it isn't
 * a database table (see docs/supabase-integration-plan.md §12 — STATUS
 * "stays as-is").
 */
export const STATUS: Record<QuestionStatus, StatusDef> = {
  verified: { spine: "#61508C", label: "Staff Verified", bg: "#F1EDFB", fg: "#4A3D6E", check: true },
  community: { spine: "#4CAF59", label: "Community Solved", bg: "#E8F5E9", fg: "#2E7D39", check: true },
  open: { spine: "#9CA3AF", label: "In Discussion", bg: "#F3F5F6", fg: "#636B6E", check: false },
  unanswered: { spine: "#FFC107", label: "Awaiting Answer", bg: "#FFF8E1", fg: "#B37800", check: false },
};

/** The 5 fixed reasons backing the report_reason enum — UI copy, not data. */
export const REPORT_REASONS = [
  "Spam or advertising",
  "Off-topic or low quality",
  "Incorrect or harmful information",
  "Harassment or abuse",
  "Something else",
] as const;
