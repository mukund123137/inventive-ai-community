# Supabase backend

Schema + seed data for the Inventive AI Community app (`../web/`). See
`../web/docs/supabase-integration-plan.md` for the design/decisions behind
this schema, and `../web/README.md` for how to point the app at a real
project.

## Layout

- `migrations/` — applied in filename order (numerically prefixed
  timestamps). Each file is a self-contained concern: extensions/enums,
  profiles, categories/tags, questions, answers, votes, notifications,
  reports/moderation, business-logic triggers, RPCs, then RLS policies —
  in that order, since later files depend on earlier ones (e.g. RLS is
  applied last, after every table and helper function exists).
- `seed.sql` — demo content mirroring the original design prototype's
  mock data (11 questions/answers, 3 notifications, 2 of the 3 original
  demo reports — see the file's header comment for why one is skipped).
  Safe to re-run; it truncates its own tables first.

## Applying this to a real project

```bash
supabase link --project-ref <your-project-ref>
supabase db push          # applies every file in migrations/
psql "$(supabase db url --linked)" -f seed.sql   # or paste into the SQL Editor
```

(Or apply each `.sql` file's contents through the Dashboard's SQL Editor,
in order, if you'd rather not use the CLI.)

## Verifying without a real project

This schema was verified during development against a local PostgreSQL
instance with a minimal `auth` schema stand-in (recreating just
`auth.users` + `auth.uid()`/`auth.role()`, which every real Supabase
project already provisions) and a local PostgREST instance for real
HTTP-level testing — not shipped here, since it's a one-off harness, not
part of the app. If you want to reproduce that locally: stand up Postgres,
create the `auth` schema/functions Supabase provides, apply the
migrations + seed above, then run PostgREST against it
(`db-anon-role = anon`, matching JWT secret). Auth's actual HTTP surface
(GoTrue — signup/login/password-reset) isn't something PostgREST provides,
so that part still needs a real Supabase project (or the full local
Supabase CLI stack, which needs Docker) to test end-to-end.
