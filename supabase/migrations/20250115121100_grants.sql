-- Table-level privileges for the PostgREST roles.
--
-- The earlier migrations enable RLS and define per-table policies, but RLS
-- only ever *restricts* — Postgres still checks ordinary table GRANTs first,
-- and with no GRANT the request is rejected with "permission denied for
-- table ..." before any policy is even evaluated. A stock Supabase project
-- normally carries default privileges that grant `anon`/`authenticated`
-- access to everything in `public`; this project was missing them, so every
-- direct table read/write (and the non-SECURITY-DEFINER RPCs like
-- search_questions / get_trending_questions, which run as the caller) failed.
--
-- The security model is unchanged: these grants are deliberately broad and
-- the row-level policies in 20250115121000_rls_policies.sql do the real
-- gatekeeping. A grant with no matching policy still yields zero rows / a
-- rejected write (e.g. anon SELECT on notifications, or any INSERT on votes),
-- exactly as before.

grant usage on schema public to anon, authenticated;

-- Public content is world-readable; RLS narrows rows (e.g. hides soft-deleted
-- rows from non-staff, scopes notifications/votes/reports to their owner).
grant select on all tables in schema public to anon, authenticated;

-- All writes require a session; RLS restricts *which* rows (author-only
-- inserts, staff-only edits, and tables with no write policy stay read-only).
grant insert, update, delete on all tables in schema public to authenticated;

-- Harmless today (all PKs are uuid defaults, no serial sequences), but keeps
-- these roles working if a future migration adds an identity/serial column.
grant usage, select on all sequences in schema public to anon, authenticated;
