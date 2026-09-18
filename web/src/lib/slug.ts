/**
 * <title-slug>-<shortid>, e.g. "how-do-i-create-an-rfp-in-inventive-ai-8f32a1"
 * (the approved URL format — docs/supabase-integration-plan.md §15).
 * Generated client-side at insert time; the DB just enforces uniqueness
 * (questions.slug UNIQUE) — on the astronomically unlikely collision, the
 * insert fails and the caller can retry with a fresh id.
 */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function generateQuestionSlug(title: string): string {
  const shortId = crypto.randomUUID().replace(/-/g, "").slice(0, 6);
  const base = slugify(title) || "question";
  return `${base}-${shortId}`;
}
