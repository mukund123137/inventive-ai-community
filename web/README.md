# Inventive AI Community — Ask & Answer

Next.js (App Router) + TypeScript + Tailwind CSS + Supabase implementation
of the `Community Prototype.dc.html` design handoff (see `../README.md`,
`../chats/`, and `../project/design_handoff_community_qa/README.md` for the
original design intent and interaction map, and `docs/supabase-integration-plan.md`
for the approved backend design this app is built against).

This build follows the **current** prototype file exactly where the design
handoff bundle's own README had drifted out of date (categories sidebar,
tags page, right rail, comments, and follow were removed from the design
during later iteration — see `chats/chat2.md` — so none of those exist
here either).

## Stack

- Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- **Supabase** (Postgres + Auth + RLS) as the backend — see `../supabase/`
  for migrations/seed, and `src/lib/` for the client-side data layer
  (`queries.ts`, `mutations.ts`, `auth.tsx`).
- [TanStack Query](https://tanstack.com/query) for data fetching/caching.
- [HeroUI](https://heroui.com) is installed and wired into `globals.css`
  (`@import "@heroui/react/styles"`) for future use as the app grows
  (tables, comboboxes, date pickers, etc.). The screens shipped here are
  small, pixel-exact custom components built directly against the design
  tokens below, since that was faster and more reliable than bending a
  compound component kit to match the prototype's exact spacing/colors —
  HeroUI is ready to reach for on the next screen that needs it.
- [Fluent UI React Icons](https://www.npmjs.com/package/@fluentui/react-icons)
  replace the prototype's hand-drawn stand-in SVGs (see `src/components/icons.tsx`,
  the one place icons are imported from).

## Setup — connecting to a real Supabase project

There is no live Supabase project wired up by default. To run this for real:

1. Create a Supabase project.
2. Apply the schema: run every file in `../supabase/migrations/` against
   your project, in filename order (via `supabase db push` after
   `supabase link`, or by pasting each file into the SQL Editor in order).
3. Seed demo content (optional but recommended for a non-empty app):
   run `../supabase/seed.sql` the same way, once, after the migrations.
4. Copy `.env.example` to `.env.local` and fill in your project's URL and
   anon key (Project Settings → API).
5. `npm install && npm run dev`.

Without step 4, `npm run build`/`npm run dev` still runs (there's a
placeholder `.env.local` checked in locally for that reason) but every
screen will fail its Supabase calls at runtime — auth, questions,
everything — since there's nothing real to talk to.

## Data layer

Nothing outside `src/lib` talks to Supabase directly — every
component/page reads and writes through:

- `src/lib/supabase/client.ts` / `server.ts` — the Supabase client
  factories (`@supabase/ssr`).
- `src/lib/auth.tsx` — `AuthProvider`/`useAuth()`: the real signed-in
  user + their `profiles` row (replaces the old mock's hardcoded `ME`).
- `src/lib/queries.ts` — read hooks (`useQuestionsList`, `useQuestion`,
  `useSearchQuestions`, `useNotifications`, `useProfileByUsername`,
  `useAdminItems`, …), each a thin TanStack Query wrapper over a
  Supabase `select`/RPC call.
- `src/lib/mutations.ts` — write hooks (`useToggleVote`,
  `useAcceptAnswer`, `useSubmitQuestion`, `useEditQuestion`,
  `useDeleteItem`, `useSubmitReport`, `useResolveReport`,
  `useTogglePref`, `useUpdateProfile`, …), each a TanStack Query
  mutation that calls Supabase and invalidates the affected queries.
- `src/lib/data-types.ts` — the `Author`/`ResolvedQuestion`/`ResolvedAnswer`
  shapes components render, plus the mappers/`select=` strings that
  produce them from raw Supabase rows.
- `src/lib/filters.ts` — client-side sort ("Trending"/"New"/"Top"/"Unanswered")
  over an already-fetched question list; see "Implementation notes" below
  for why this stayed client-side.
- `src/lib/status.ts` — the `STATUS`/`REPORT_REASONS` label+color lookups.
  Presentation only, not data — there's no `status_labels` table.
- `src/lib/slug.ts`, `src/lib/time.ts` — slug generation and relative-time
  formatting (`"2h ago"`), both pure client-side helpers.
- `src/proxy.ts` — Next 16's renamed `middleware.ts`: refreshes the
  Supabase session cookie and redirects signed-out visitors to `/login`.

## Screens

Every screen from the prototype's `data-behavior` map is implemented:
home/listing (`/`), question detail (`/questions/[slug]`), ask (`/ask`),
search (`/search`), notifications (`/notifications`), profile
(`/profile` redirects to `/u/[username]`), edit profile (`/profile/edit`),
settings (`/settings`), login/signup (`/login`), reset password
(`/reset-password`), and admin/moderation (`/admin`).

The "Admin" nav link (header + mobile menu) is now genuinely gated behind
`profile.role === "staff"` — real roles exist now, so this is no longer
the demo-only compromise noted in earlier revisions of this README.

Loading / empty / error states are real now: `useQuestionsList()` /
`useQuestion()` / etc. surface TanStack Query's real `isLoading`/`isError`.
The home feed's `?state=loading`/`?state=error` query-param override still
works as a QA hook layered on top of the real states (useful for
previewing those UIs on demand), not as a replacement for them.

## Implementation notes — where the build refined the approved plan

`docs/supabase-integration-plan.md` is the approved design; a few details
were sharpened while implementing it (all consistent with, not contrary
to, the approved decisions):

- **`profiles.id` is its own uuid, not `auth.users.id`.** Decision #2
  (seed authors are display-only, never loginable) meant `profiles` can't
  have a strict FK to `auth.users` on every row. Real users get a
  `profiles.user_id` pointing at `auth.users.id`; seed/demo profiles leave
  it `null`. A `current_profile_id()` SQL helper and `useAuth()`'s
  `profile` (not `userId`) are how the app gets "my profile row" either way.
- **`questions.status_locked`** (new column, not in the original plan
  draft): sets when Admin resolves/reopens a question directly, and once
  set, the accept/unaccept-driven status recompute trigger skips that
  question — matching the mock's exact behavior where an admin override
  wins forever over derived status, not just until the next accept/unaccept.
- **Sort/trending stays client-side**, per §11 of the plan: the app
  fetches the full (small) question list once and sorts/filters in the
  browser, the same scale assumption the original mock made. Full-text
  search (`search_questions` RPC) is the one place real server-side
  ranking is used, since substring-matching a growing corpus client-side
  doesn't hold up the way a small trending sort does.
- **Two small seed-data reconciliations**, both because a relational
  schema needs every `reports` row to point at a real question/answer,
  which the mock's `REPORT_QUEUE` never did: two "spam account" profiles
  and one extra question/answer exist purely so the seeded Spam/Incorrect
  reports have something real to reference (see comments in
  `supabase/seed.sql`). The mock's third report (`kind: 'Comment'`) isn't
  seeded at all — no comments table exists, per decision #4.
- **Fixed a real mock bug while wiring the report flow**: the Report
  modal's "Add any detail" textarea was previously uncontrolled and never
  sent; `useSubmitReport` now actually captures and sends it as `detail`.

## Deliberate omissions (matching the current prototype, not the stale README)

The design handoff's README describes an earlier, richer iteration. The
prototype was later stripped down (see `chats/chat2.md`) and no longer
has: a categories sidebar, a tags browse page, a "Top Contributors"
right rail, comments/replies, a Follow button, view counts, or visible
tag chips on cards — all of that markup is dead/empty in the source
`.dc.html`. This build matches the prototype as it stands, not the
README. Tags/categories still exist as backend data (search matching,
the `catName` text on Search/Profile rows) — see decisions #6/#7 in
`docs/supabase-integration-plan.md` — just with no browsing/management UI.

## Run it

```bash
npm install
npm run dev
```
