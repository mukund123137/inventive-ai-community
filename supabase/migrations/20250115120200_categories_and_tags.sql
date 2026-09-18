-- categories: kept (per review) because it IS required by a real, current
-- UI operation — Search results and Profile question rows render
-- `catName` (e.g. "RFP & Proposals · 2h ago"). There is no category
-- browsing/filtering UI (that was removed from the design), so this table
-- is intentionally minimal: just enough to resolve a question's category
-- name for display. No color/tint/description columns — the current UI
-- doesn't render any of that.

create table categories (
  id   uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null
);

comment on table categories is
  'Minimal lookup for the catName text shown on Search/Profile rows. No browsing/filtering UI reads this beyond that — see docs/supabase-integration-plan.md §3.';

-- tags: backend data only. Existing seeded questions carry tags (used by
-- search matching), but there is no tag-management UI — the Ask form has
-- no tag field and Admin's editor doesn't expose tags either. Kept per the
-- approved plan for search compatibility with existing content; not a
-- feature surface.

create table tags (
  id   uuid primary key default gen_random_uuid(),
  name text not null unique
);

-- question_tags (the join table) is created in 0004, after `questions`
-- exists — see the note there.
