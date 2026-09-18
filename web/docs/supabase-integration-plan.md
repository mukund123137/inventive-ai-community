# Supabase Integration Plan

Status: **implemented** (approved with decisions, then built — see
`supabase/migrations/`, `supabase/seed.sql`, and `web/src/lib/`). This
document is kept as the design record; where implementation deviated in
small, necessary ways from the original proposal (all flowing from the
approved decisions), see `web/README.md`'s "Implementation notes" section
for the delta. A few schema/RLS details below (e.g. `profiles.id` vs.
`auth.users.id`, the `status_locked` column) were refined during
implementation and are documented as-built in the migration files
themselves, which are the source of truth over this narrative doc.

Scope discipline for this doc, matching what was asked:
- No Supabase code, no schema migrations, no UI changes are included here.
- Every current mock/local behavior is accounted for — nothing is silently
  dropped, and nothing is silently added beyond what the current UI does.
  Where the current UI does *less* than a "real" Q&A app would (no tags on
  the Ask form, no comments, no self-service question editing, an unwired
  report-detail textarea), that gap is called out explicitly rather than
  quietly designed around.

---

## 0. Codebase inventory — what depends on the mock data layer today

### The mock/local data files

| File | Role |
|---|---|
| `src/lib/mock-data.ts` | Static seed data: `ME`, `AUTHORS`, `CATEGORIES`, `STATUS`, `SEED` (questions+answers), `NOTIFICATIONS`, `REPORT_QUEUE`, `REPORT_REASONS`, plus `resolveAuthor()`/`resolveCategory()` lookups. |
| `src/lib/store.ts` | Zustand store. Holds only *overlays* on top of the seed (votes, accepts, edits, deletes, new questions/answers, report state, notification-read state, prefs, profile edits) and exports the derived-view selectors every screen reads (`getAllQuestions`, `filterAndSort`, `getAdminItems`, etc.). This is the file a Supabase migration replaces. |
| `src/lib/types.ts` | Shared TS types (`SeedQuestion`, `ResolvedQuestion`, `Author`, `StatusDef`, …). Mostly reusable as-is; a few (`SeedQuestion.id`, `.ageH`) are mock-specific and are called out below. |

Nothing outside these three files reads seed data directly — every
component goes through `store.ts`. That's the property this migration
plan relies on.

### Every component/route that imports the mock layer

| File | Imports from `mock-data.ts` | Imports from `store.ts` | Imports from `types.ts` |
|---|---|---|---|
| `src/app/page.tsx` (Home/feed) | — | `filterAndSort`, `getAllQuestions`, `useCommunityStore` | `SortKey` |
| `src/app/ask/page.tsx` | — | `useCommunityStore` (`submitQuestion`) | — |
| `src/app/search/page.tsx` | `STATUS` | `filterAndSort`, `getAllQuestions`, `useCommunityStore` | — |
| `src/app/notifications/page.tsx` | — | `getNotifications`, `useCommunityStore` | — |
| `src/app/profile/page.tsx` | `ME` | — | — |
| `src/app/profile/edit/page.tsx` | `AUTHORS`, `ME` | `useCommunityStore` (`updateProfile`) | — |
| `src/app/settings/page.tsx` | — | `useCommunityStore` (`prefs`, `togglePref`), type `NotificationPrefs` | — |
| `src/app/admin/page.tsx` | — | `adminSearch`, `adminStatusView`, `adminUrl`, `getAdminItems`, `getOpenReports`, `useCommunityStore`, type `AdminItem` | — |
| `src/app/questions/[id]/page.tsx` | — | (delegates to `QuestionDetail`) | — |
| `src/app/u/[handle]/page.tsx` | — | (delegates to `ProfileView`) | — |
| `src/app/login/page.tsx` | — | — | — *(not wired to auth at all today — see §1)* |
| `src/app/reset-password/page.tsx` | — | — | — *(not wired — see §1)* |
| `src/components/pages/QuestionDetail.tsx` | `ME`, `STATUS` | `getQuestion`, `useCommunityStore` (`aVoted`, `voteAnswer`, `acceptAnswer`, `submitAnswer`) | `ReportKind`, `ResolvedAnswer` |
| `src/components/pages/ProfileView.tsx` | `ME`, `STATUS`, `resolveAuthor` | `getAllQuestions`, `getProfileAnswered`, `getProfileQuestions`, `useCommunityStore` (`profile`) | — |
| `src/components/QuestionCard.tsx` | `STATUS` | `useCommunityStore` (`voted`, `vote`) | `ResolvedQuestion` |
| `src/components/HomeSearch.tsx` | — | `getAllQuestions`, `getTrending`, `searchSuggestions`, `useCommunityStore` | — |
| `src/components/ReportModal.tsx` | `REPORT_REASONS` | `useCommunityStore` (`submitReport`) | `ReportKind` |
| `src/components/DeleteConfirmModal.tsx` | — | — *(fully prop-controlled by `admin/page.tsx`, no direct store access)* |
| `src/components/layout/Header.tsx` | `AUTHORS`, `ME` | `getUnreadCount`, `useCommunityStore` | — |
| `src/components/layout/MobileHeader.tsx` | `AUTHORS`, `ME` | — | — |
| `src/components/layout/MobileBottomNav.tsx` | — | `getUnreadCount`, `useCommunityStore` | — |
| `src/components/layout/AppChrome.tsx` | — | — *(route-based chrome switch only, no data)* |
| `src/components/ui/Avatar.tsx` | — | — | `Author` |
| `src/components/ui/StatusChip.tsx` | — | — | `StatusDef` |
| `src/components/ui/VoteButton.tsx`, `PeachButton.tsx`, `States.tsx`, `ToggleSwitch.tsx` | — | — | — *(pure presentational, no data dependency)* |

**Pre-existing gaps this plan does not silently "fix" into the schema:**
- `ME` is a hardcoded constant (`"Priya Nair"`), not a real session. Auth
  doesn't exist yet — Login/Signup/Reset Password pages render forms but
  don't call anything.
- The Ask form has no category or tag picker — new questions are always
  created with `cat: "getting-started"` and `tags: []`. Tags only ever
  come from seed data.
- There's no "edit my own question" UI — only Admin can edit (`qEdit`/`aEdit`
  overlays), so question/answer body edits are staff-only in practice.
- The Report modal's optional "Add any detail" textarea is **not wired**
  to `submitReport` — the `detail`/`content` captured today is always the
  reported item's own body/title, not free-text from the reporter. Flagged
  as a bug to fix during the Supabase cut-over (§5).
- `REPORT_QUEUE` seeds a `kind: "Comment"` report even though there is no
  comment feature anywhere in the app (no composer, no rendering). That
  report kind can only ever come from seed/demo data until comments ship.
- `mentions` is a real toggle in Settings → Notifications, but nothing in
  the app generates an "@mention" event. Same category of gap as above.

---

## 1. Authentication

**Today:** none. `ME` is a hardcoded string. Login/Signup forms exist
visually (segmented Log In / Sign Up card) but their buttons either
navigate to `/` unconditionally (Log In) or do nothing (Create Account,
Send reset link).

**Plan:** Supabase Auth, email/password only (no SSO/Okta — that was
explored in the design chats but the shipped prototype has no SSO button,
so it's out of scope unless requested later).

- `auth.users` is the source of truth for identity. A `handle_new_user()`
  trigger on `auth.users` insert creates the matching `public.profiles`
  row (see §2) so the two are never out of sync.
- Session handling via `@supabase/ssr`: a browser client for Client
  Components, a server client for Server Components/Route Handlers, and
  `middleware.ts` to refresh the session cookie on every request.
- A `useUser()`/`useSession()` hook (new, thin wrapper over
  `supabase.auth.getUser()` + `onAuthStateChange`) replaces the `ME`
  constant everywhere it's imported today (`Header`, `MobileHeader`,
  `QuestionDetail`, `ProfileView`, `profile/page.tsx`,
  `profile/edit/page.tsx`) — see the call-site list in §5.
- Route protection: `AppChrome` (or `middleware.ts`) redirects
  unauthenticated visitors to `/login` for every route except `/login`
  and `/reset-password`, which already render chromeless.

| UI action | Supabase call |
|---|---|
| Login "Log In" | `supabase.auth.signInWithPassword({ email, password })` → on success, `router.push("/")` |
| Signup "Create Account" *(currently unwired)* | `supabase.auth.signUp({ email, password, options: { data: { display_name } } })` |
| "Forgot password?" / Reset Password "Send reset link" *(currently unwired)* | `supabase.auth.resetPasswordForEmail(email, { redirectTo: ".../reset-password/confirm" })` |
| Settings "Log Out" | `supabase.auth.signOut()` → redirect to `/login` |

---

## 2. Profiles and user roles

`AUTHORS` (9 hardcoded people, one flagged `isStaff: true`) becomes a
real `profiles` table, 1:1 with `auth.users`.

```
profiles
  id            uuid PK REFERENCES auth.users(id) ON DELETE CASCADE
  username      text UNIQUE NOT NULL
  display_name  text NOT NULL
  avatar_tone   text NOT NULL DEFAULT '#9CA3AF'   -- hex, matches current solid-color avatar design
  role          user_role NOT NULL DEFAULT 'member'  -- enum: 'member' | 'staff'
  company       text
  bio           text
  created_at    timestamptz NOT NULL DEFAULT now()  -- "Joined {date}"
  updated_at    timestamptz NOT NULL DEFAULT now()
```

- `initials` are **not** stored — they're derived at render time from
  `display_name` (already how `Avatar`/`ProfileView` would need to work
  once names are user-entered instead of a fixed lookup table).
- `role` is the staff/member flag that currently lives in the `AUTHORS`
  map's `staff: true` field. It drives: the "Inventive Staff" pill, the
  accepted-answer status split (staff accept → `verified`, member accept
  → `community`), and — new, since it doesn't really exist yet — gating
  the "Admin" nav link that today is unconditionally visible (flagged as
  a known demo-only gap in `web/README.md`).
- `username` backs the `/u/[handle]` route. Today that route is keyed by
  URL-encoded **display name** (`/u/Dana%20Ruiz`), which is exactly the
  kind of thing that breaks once names aren't unique/stable — see §6.
- Row is created by the `handle_new_user()` trigger from §1, not by
  direct client insert.

---

## 3. Questions

`SEED[n]` (11 hardcoded questions) becomes `questions`:

```
questions
  id                 uuid PK DEFAULT gen_random_uuid()
  slug               text UNIQUE NOT NULL          -- see §6
  author_id          uuid NOT NULL REFERENCES profiles(id)
  category_id        uuid REFERENCES categories(id) -- nullable; see note below
  title              text NOT NULL
  body               text NOT NULL
  status             question_status NOT NULL DEFAULT 'unanswered'
                       -- enum: 'unanswered' | 'open' | 'community' | 'verified'
  accepted_answer_id uuid REFERENCES answers(id)     -- denormalized, nullable
  vote_count         integer NOT NULL DEFAULT 0      -- denormalized, trigger-maintained
  answer_count       integer NOT NULL DEFAULT 0      -- denormalized, trigger-maintained
  deleted_at         timestamptz                     -- soft delete
  created_at         timestamptz NOT NULL DEFAULT now()
  updated_at         timestamptz NOT NULL DEFAULT now()
```

Notes tying this back to the mock model exactly:

- **`status` is not purely derived.** In the mock, `qStatus[id]` is an
  admin override that wins over the derived value; absent an override,
  status comes from whether there's an accepted answer and who accepted
  it. Real schema keeps `status` as a normal column, kept correct by:
  1. a trigger on `answers.is_accepted` changes → recompute
     `unanswered`/`open`/`community`/`verified` from scratch, *unless*
  2. the admin "Resolve/Reopen" action just set it directly (that action
     writes `status` directly and is the one path that's allowed to
     disagree with the accepted-answer-derived value — matching
     `setQuestionStatus` in the mock exactly).
- **`category_id` is nullable / low-stakes.** Categories exist in the data
  (`cat: 'rfp'`, etc.) and are shown as plain text (`catName`) in Search
  results and Profile lists, but there is no category browsing UI, no
  sidebar, no filter — that was deliberately removed from the design (see
  `chats/chat2.md`). Keep the column for parity with the seed data and the
  `catName` display, but don't build any category-management UI/RLS
  beyond "staff can maintain the lookup table."
- **No `view_count` column.** The original design-handoff README suggested
  one; the shipped prototype never renders a view count anywhere. Omitted
  rather than added speculatively — add it later if a real feature needs
  it.
- **Soft delete, not hard delete.** The mock's `deleted['q:'+id] = true`
  tombstone maps directly to `deleted_at`. Admin "Delete" sets
  `deleted_at = now()`; every read query filters `WHERE deleted_at IS NULL`.

---

## 4. Answers

`SeedQuestion.answers[]` becomes `answers`:

```
answers
  id           uuid PK DEFAULT gen_random_uuid()
  question_id  uuid NOT NULL REFERENCES questions(id) ON DELETE CASCADE
  author_id    uuid NOT NULL REFERENCES profiles(id)
  body         text NOT NULL
  is_accepted  boolean NOT NULL DEFAULT false
  vote_count   integer NOT NULL DEFAULT 0     -- denormalized, trigger-maintained
  deleted_at   timestamptz
  created_at   timestamptz NOT NULL DEFAULT now()
  updated_at   timestamptz NOT NULL DEFAULT now()
```

- **At most one accepted answer per question** is a hard DB invariant
  today (`acceptAnswer` manually flips every sibling to `false` before
  setting the new one) — enforce it for real with a partial unique index
  (see §3 indexes) instead of trusting application code.
- Accepting/unaccepting an answer is the trigger that recomputes the
  parent question's `status` and `accepted_answer_id` (§3).
- Soft delete via `deleted_at`, same as questions.

---

## 5. Votes

`voted`/`aVoted` (two `Record<id, boolean>` overlays, one per target type)
become a single polymorphic-by-column table:

```
votes
  id           uuid PK DEFAULT gen_random_uuid()
  user_id      uuid NOT NULL REFERENCES profiles(id)
  target_type  vote_target NOT NULL          -- enum: 'question' | 'answer'
  target_id    uuid NOT NULL                 -- references questions.id or answers.id depending on target_type
  created_at   timestamptz NOT NULL DEFAULT now()

  UNIQUE (user_id, target_type, target_id)
```

- `target_id` intentionally has **no FK** (it points at one of two
  different tables depending on `target_type`) — validated at the RPC
  layer, not by a DB constraint. This is the one place in the schema that
  isn't fully FK-enforced; documented here rather than hidden.
- A `toggle_vote(p_target_type, p_target_id)` RPC does the
  insert-or-delete atomically (mirrors the mock's `!voted[id]` toggle) and
  is the only way votes change — no direct table INSERT/DELETE from the
  client for anything except the RPC's own use.
- `questions.vote_count` / `answers.vote_count` are triggers off this
  table, so the feed/detail views never need to `COUNT(*)` votes at read
  time — same shape as the mock's `votesOf()` but computed server-side
  instead of `base + optimistic-local-flag`.
- The client still does an optimistic UI update immediately on click (as
  today), then reconciles with the RPC's returned count — same perceived
  behavior as the current `useCommunityStore` version.

---

## 6. Tags

`SeedQuestion.tags: string[]` becomes a normal many-to-many:

```
tags
  id    uuid PK DEFAULT gen_random_uuid()
  name  text UNIQUE NOT NULL

question_tags
  question_id  uuid NOT NULL REFERENCES questions(id) ON DELETE CASCADE
  tag_id       uuid NOT NULL REFERENCES tags(id) ON DELETE CASCADE
  PRIMARY KEY (question_id, tag_id)
```

**Important scope note:** tags are read-only from the app's perspective
today. The Ask form has no tag input, and Admin's inline editor doesn't
expose tags either — `tags` only ever gets set by the original seed. This
schema exists so seeded content keeps its tags (used in search matching,
per §11) and so a future "add tags to a question" UI has somewhere to
write to, but no such UI is being built as part of this migration.

---

## 7. Question/answer relationships

Already covered above; summarized as an ER sketch:

```
auth.users 1───1 profiles
profiles 1───* questions        (author_id)
profiles 1───1 notification_preferences
categories 1───* questions      (category_id, nullable)
questions 1───* answers         (question_id)
questions 1───* question_tags *───1 tags
questions 0..1───1 answers      (questions.accepted_answer_id, the accepted one — denormalized pointer into the same set as question_id above)
profiles 1───* answers          (author_id)
profiles 1───* votes            (user_id)
{questions|answers} 1───* votes (target_type/target_id, unenforced FK)
profiles 1───* notifications    (recipient_id)
profiles 1───* notifications    (actor_id, nullable)
questions 1───* notifications   (question_id)
profiles 1───* reports          (reporter_id)
{questions|answers|(future)comments} 1───* reports (question_id/answer_id/comment_id, exactly one set)
profiles 1───* moderation_actions (moderator_id)
reports 0..1───* moderation_actions (report_id, nullable — an action isn't always tied to a report, e.g. a direct admin edit)
```

---

## 8. Notifications

`NOTIFICATIONS` (3 hardcoded rows) becomes:

```
notifications
  id            uuid PK DEFAULT gen_random_uuid()
  recipient_id  uuid NOT NULL REFERENCES profiles(id)
  actor_id      uuid REFERENCES profiles(id)     -- nullable: "Inventive Team" system notices have no single actor
  type          notification_type NOT NULL        -- enum: 'answer' | 'verified' | 'upvote'
  question_id   uuid NOT NULL REFERENCES questions(id)
  answer_id     uuid REFERENCES answers(id)
  read_at       timestamptz
  created_at    timestamptz NOT NULL DEFAULT now()
```

Only 3 notification types exist in the current UI (`answered your
question`, `marked an answer Staff Verified`, `upvoted your answer`) —
matches the "mostly strict" brief's trimmed-down notification list from
`chats/chat2.md`. No `mention` type is included even though the Settings
toggle for it exists (see the gap note in §0) — adding a `mention` enum
value with nothing that ever writes it would be exactly the kind of
"fake backend behavior" the brief says not to add.

Generation is trigger-based, never client-inserted (no client INSERT
policy — see §10):
- New answer on a question → notify `questions.author_id`, type `answer`.
- Answer accepted **and** the answer's author is staff → notify
  `questions.author_id`, type `verified`, `actor_id = NULL` (rendered as
  "Inventive Team", matching the mock's seed data exactly).
- New vote on a question/answer whose author ≠ voter → notify that
  author, type `upvote`.

`notification_preferences` (from Settings' 5 toggles):

```
notification_preferences
  user_id    uuid PK REFERENCES profiles(id)
  answers    boolean NOT NULL DEFAULT true
  mentions   boolean NOT NULL DEFAULT true
  verified   boolean NOT NULL DEFAULT true
  upvotes    boolean NOT NULL DEFAULT true
  digest     boolean NOT NULL DEFAULT false
```

Row created by the same `handle_new_user()` trigger as `profiles`.
Preferences gate **email/digest delivery** (a future concern, no email
sending exists today), not the in-app notification row itself — the row
is still written so the bell/notifications page stays complete and
consistent with "mark as read" behavior either way.

---

## 9. Reports

`REPORT_QUEUE` (3 hardcoded rows) becomes:

```
reports
  id           uuid PK DEFAULT gen_random_uuid()
  reporter_id  uuid NOT NULL REFERENCES profiles(id)
  question_id  uuid REFERENCES questions(id)
  answer_id    uuid REFERENCES answers(id)
  -- comment_id uuid REFERENCES comments(id)   -- reserved; no comments table exists yet, see gap note
  reason       report_reason NOT NULL   -- enum, the 5 fixed strings from REPORT_REASONS
  detail       text                     -- the reporter's optional free-text (see gap note below)
  status       report_status NOT NULL DEFAULT 'open'  -- enum: 'open' | 'kept' | 'removed' | 'dismissed'
  created_at   timestamptz NOT NULL DEFAULT now()

  CHECK (num_nonnulls(question_id, answer_id) = 1)  -- exactly one target, until comments exist
```

- `reason` is a fixed enum of the 5 strings in `REPORT_REASONS` — those
  are UI copy, not user data, so they stay as literal enum labels rather
  than a separate lookup table.
- **Fixing a real bug during cut-over:** today `ReportModal`'s optional
  "Add any detail" `<textarea>` isn't wired to any state — `submitReport`
  is always called with the reported item's own body as `content`, and
  the free-text field is silently discarded. The real `submitReport`
  mutation should read that textarea into `detail`. Flagged here so it
  isn't missed; not fixed now (no UI/behavior changes yet per the brief).
- The mock's `QUEUE` includes a `kind: 'Comment'` report with no comment
  feature behind it. The commented-out `comment_id` column + the CHECK
  constraint reflect that honestly: this schema cannot represent that
  report today, and it doesn't try to fake a `comments` table just to
  satisfy one seed row. If comments ship, add the column and loosen the
  CHECK to `= 1` over three columns.

---

## 10. Admin actions / activity

No table for this exists in the mock (there's no activity log UI), but
every admin mutation should be audited for real:

```
moderation_actions
  id            uuid PK DEFAULT gen_random_uuid()
  moderator_id  uuid NOT NULL REFERENCES profiles(id)
  report_id     uuid REFERENCES reports(id)        -- nullable: not every action originates from a report
  question_id   uuid REFERENCES questions(id)
  answer_id     uuid REFERENCES answers(id)
  action        moderation_action NOT NULL
                  -- enum: 'resolve_question' | 'reopen_question' | 'accept_answer' | 'unaccept_answer'
                  --     | 'edit_question' | 'edit_answer' | 'delete_question' | 'delete_answer'
                  --     | 'keep_report' | 'remove_report' | 'dismiss_report'
  note          text
  created_at    timestamptz NOT NULL DEFAULT now()
```

Every Admin-page mutation writes one row here in the same transaction as
its primary effect (mapped 1:1 in §12). No screen reads this table back
today — it's pure audit trail, ready for a future "Activity Log" tab (the
stale design README mentions one that was never built).

---

## 11. Search / autocomplete

Today: `getAllQuestions()` loads every question into memory, and
`filterAndSort`/`searchSuggestions` do plain JS substring matching over
`title + body + tags.join(' ')`. Fine for 11 rows, not for a real corpus.

- Add a generated `tsvector` column on `questions`:
  ```
  search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english', title), 'A') ||
    setweight(to_tsvector('english', body), 'B')
  ) STORED
  ```
  (Tag names aren't part of a generated column since they're in a join
  table; folded in via the search RPC instead — see below.)
- A GIN index on `search_vector`.
- `search_questions(query text, limit_n int)` RPC: `websearch_to_tsquery`
  against `search_vector`, `UNION` or `OR`'d with a tag-name match via
  `question_tags`/`tags`, ranked with `ts_rank`, `LIMIT limit_n`. This
  replaces `filterAndSort(..., { searchScope: true })` on the Search page
  and `searchSuggestions()` in the homepage dropdown.
- **Trending** ("Trending questions" shown before typing) replaces
  `getTrending()`'s client-side `vote_count + answer_count*3` sort with
  the same expression computed in SQL (`ORDER BY vote_count +
  answer_count * 3 DESC LIMIT n`) — trivial now that both counts are
  denormalized columns (§3, §4).
- The **typing → highlight matched substring** behavior (pre/mid/post
  split) stays 100% client-side — it's a rendering concern over whatever
  list comes back, not a query concern. Only the candidate list's source
  changes from `getAllQuestions()` to the RPC above.
- The artificial 350ms "loading" shimmer in the mock is replaced by
  actually debouncing the real network call (e.g. 250ms) and showing the
  same skeleton rows while the request is in flight.

---

## 12. Mapping — Zustand store → Supabase operations

### Mutations

| Store action | Supabase operation |
|---|---|
| `vote(questionId)` | `supabase.rpc('toggle_vote', { target_type: 'question', target_id })` |
| `voteAnswer(answerId)` | `supabase.rpc('toggle_vote', { target_type: 'answer', target_id })` |
| `acceptAnswer(questionId, answerId)` | `supabase.rpc('accept_answer', { question_id, answer_id })` — server-side: un-accepts any sibling, sets `is_accepted`, recomputes `questions.status`/`accepted_answer_id`, fires the `verified` notification if applicable. If called from Admin, also insert `moderation_actions` (`accept_answer`/`unaccept_answer`). |
| `submitQuestion(title, body)` | `supabase.from('questions').insert({ author_id, title, body, category_id: default, slug: <generated> }).select().single()` → returned row's `slug` used for the redirect (was: returned mock `id`) |
| `submitAnswer(questionId, body)` | `supabase.from('answers').insert({ question_id, author_id, body })` — trigger fires the `answer` notification + bumps `questions.answer_count`/`status` |
| `editQuestion(id, title, body)` | `supabase.from('questions').update({ title, body }).eq('id', id)` (staff-only per current UI) + `moderation_actions` insert (`edit_question`) |
| `editAnswer(id, body)` | `supabase.from('answers').update({ body }).eq('id', id)` + `moderation_actions` insert (`edit_answer`) |
| `deleteItem(key)` | `supabase.from('questions'|'answers').update({ deleted_at: now() }).eq('id', ...)` (soft delete) + `moderation_actions` insert (`delete_question`/`delete_answer`) |
| `setQuestionStatus(id, status)` | `supabase.from('questions').update({ status }).eq('id', id)` + `moderation_actions` insert (`resolve_question`/`reopen_question`) |
| `submitReport(kind, content, author, reason)` | `supabase.from('reports').insert({ reporter_id, question_id/answer_id, reason, detail })` — **note:** should also pass the (currently-unwired) free-text detail, see §9 |
| `resolveReport(id, status)` | `supabase.from('reports').update({ status }).eq('id', id)` + `moderation_actions` insert (`keep_report`/`remove_report`/`dismiss_report`) |
| `markNotifRead(id)` | `supabase.from('notifications').update({ read_at: now() }).eq('id', id)` |
| `markAllNotifsRead()` | `supabase.from('notifications').update({ read_at: now() }).eq('recipient_id', auth.uid()).is('read_at', null)` |
| `togglePref(key)` | `supabase.from('notification_preferences').update({ [key]: !current }).eq('user_id', auth.uid())` |
| `updateProfile(fields)` | `supabase.from('profiles').update(fields).eq('id', auth.uid())` |

### Selectors / reads

| Store selector | Supabase operation |
|---|---|
| `getAllQuestions(state)` | Paginated `supabase.from('questions').select('*, author:profiles(*), answers(*, author:profiles(*))').is('deleted_at', null)` — likely split into a list query (no answers) for feed/search and a detail query (with answers) for the question page, rather than one function doing both as today |
| `getQuestion(state, id)` | `supabase.from('questions').select(...).eq('slug', slug).single()` — keyed by `slug`, not `id` (§6) |
| `filterAndSort(all, opts)` | Query params on the same `questions` select: `.order(...)` for sort, `.contains('tags', ...)` → replaced by a `question_tags` join filter if tag filtering is ever re-added (currently unreachable in the UI — see `web/README.md`'s note that tag filtering is dead code today) |
| `getTrending(all, limit)` | `ORDER BY vote_count + answer_count*3 DESC LIMIT n`, per §11 |
| `searchSuggestions(all, query, limit)` | `search_questions()` RPC, per §11 |
| `getNotifications(state)` | `supabase.from('notifications').select('*, actor:profiles(*)').eq('recipient_id', auth.uid()).order('created_at', { ascending: false })` |
| `getUnreadCount(state)` | `supabase.from('notifications').select('id', { count: 'exact', head: true }).eq('recipient_id', auth.uid()).is('read_at', null)` |
| `getOpenReports(state)` | `supabase.from('reports').select(...).eq('status', 'open').order('created_at')` (staff-only, per RLS §13) |
| `getAdminItems(state)` | Two queries (questions + answers, staff-only), or one `UNION`-shaped RPC — no longer "load everything and flatten in JS" |
| `adminSearch(items, raw)` | If the input looks like a URL: parse the slug/answer-id out and `.eq('slug', ...)` / `.eq('id', ...)` directly (§6) instead of regexing mock ids like `q9`. Otherwise: reuse `search_questions()` extended to also match answers, or a small `search_admin_content()` RPC. |
| `adminStatusView(it)` | Stays a pure client-side presentation function — `STATUS`/label-color mapping is UI copy, not data, and doesn't need a DB round-trip. |
| `adminUrl(it)` | `https://community.inventive.ai/questions/${slug}${answerId ? '#' + answerId : ''}` — same shape, just slug-based (§6). |
| `getProfileQuestions(all, name)` / `getProfileAnswered(all, name)` | `supabase.from('questions').select(...).eq('author_id', profileId)` / a query (or view) joining through `answers.author_id = profileId` — keyed by `profile.id`, not display name (§2, §6) |

### Constants

| Mock constant | Supabase equivalent |
|---|---|
| `ME` | Real session user (`useUser()`), not a constant |
| `AUTHORS` | `profiles` table, fetched per-need (joined into question/answer queries) rather than a single in-memory map |
| `CATEGORIES` | `categories` table (seeded once via migration, effectively static) |
| `STATUS` | **Stays as-is** — a static, client-side label/color lookup keyed by the `question_status` enum. This is UI presentation, not data. |
| `REPORT_REASONS` | Stays as UI copy backing the `report_reason` enum (§9) |

---

## 13. RLS / permission model

RLS enabled on every table below. `is_staff()` is a small helper:

```sql
create function is_staff() returns boolean
language sql stable security definer as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'staff'
  );
$$;
```

(Alternative for high-traffic tables: sync `role` into the JWT's
`app_metadata` via an `auth.users` trigger and read `auth.jwt() ->
'app_metadata' ->> 'role'` in policies instead of a subquery per row —
worth doing once `profiles` lookups show up in `EXPLAIN ANALYZE` as a
hot path, not needed on day one.)

| Table | SELECT | INSERT | UPDATE | DELETE |
|---|---|---|---|---|
| `profiles` | public | via trigger only (no client policy) | self only (`id = auth.uid()`) | none |
| `categories` | public | staff only | staff only | staff only |
| `tags` | public | staff only *(no UI writes these yet — §6)* | staff only | staff only |
| `questions` | public, `deleted_at is null` (staff can also see deleted) | authenticated, `author_id = auth.uid()` | staff: any column. Author: optional, not exercised by current UI — see note | none (soft delete via UPDATE) |
| `question_tags` | public | staff only | — | staff only |
| `answers` | public, `deleted_at is null` (staff also see deleted) | authenticated, `author_id = auth.uid()` | **accept/unaccept**: question author (`exists (select 1 from questions where id=question_id and author_id=auth.uid())`) or staff. **Body edit**: staff only today. | none (soft delete) |
| `votes` | self only (`user_id = auth.uid()`) | via `toggle_vote()` RPC only (no direct client policy) | — | via `toggle_vote()` RPC only |
| `notifications` | self only (`recipient_id = auth.uid()`) | none (triggers only, `security definer`) | self only, and only `read_at` | none |
| `notification_preferences` | self only | via trigger on signup only | self only | none |
| `reports` | staff only (reporters don't need to see the queue — no "my reports" UI exists) | authenticated, `reporter_id = auth.uid()` | staff only | none |
| `moderation_actions` | staff only | staff only (or `security definer` functions only) | none | none |

Note on `questions`/`answers` author UPDATE: the current UI **never**
lets a regular user edit their own question/answer body — only Admin can.
The one exception is **accepting an answer**, which the *question's*
author does from the public Detail page today. Recommendation: grant
authors UPDATE on their own rows restricted to a small column set (e.g.
via a `security definer` RPC rather than a blanket policy) so a future
"edit your own question" feature doesn't require a schema change — but
this is explicitly optional/forward-looking, not something the current
UI needs on day one. Flagging it as a decision point rather than baking
it in silently.

---

## 14. Indexes & constraints (consolidated)

- `profiles.username` — UNIQUE (already declared)
- `questions.slug` — UNIQUE (already declared)
- `questions.author_id`, `questions.category_id`, `questions.deleted_at` — btree, for feed filtering
- `questions.search_vector` — GIN, for full-text search (§11)
- `questions (vote_count, answer_count)` or a computed expression index — supports the trending sort without a full table scan as data grows
- `answers.question_id` — btree (answers-per-question lookups)
- **Partial unique index**: `answers (question_id) WHERE is_accepted` — at most one accepted answer per question, enforced by Postgres, not application code
- `votes (user_id, target_type, target_id)` — UNIQUE (already declared); also supports "did I vote" lookups
- `notifications (recipient_id, read_at)` — btree, for the unread-count query
- `notifications.question_id` — btree
- `reports (status)` — btree, for the open-queue view
- `reports` CHECK — `num_nonnulls(question_id, answer_id) = 1`
- `question_tags` — composite PK doubles as the index for both join directions; add a standalone index on `tag_id` if tag→questions lookups become common

---

## 15. URL / slug strategy

**Today:** `/questions/[id]` where `id` is the mock's `q1`…`q11`, or
`q_<Date.now()>` for questions created at runtime. Every call site pushes
the raw id:

`QuestionCard` (card title), `HomeSearch` (trending rows, suggestion
rows), `search/page.tsx` (result rows), `ProfileView` (question rows),
`notifications/page.tsx` (row click, via `n.qid`), `admin/page.tsx`
("View" button, `adminUrl()`), `QuestionDetail` (back-link target is `/`,
not self — no change needed there).

**Plan:**
- `questions.id` is a uuid (internal PK, FK target). `questions.slug` is
  the public identifier: `slugify(title)` + a short disambiguator (e.g.
  the first 6 chars of the uuid) generated at insert time, e.g.
  `how-do-i-connect-google-drive-4f2a1c`. Unique constraint enforces
  collision safety even though the suffix makes collisions astronomically
  unlikely.
- Route becomes `/questions/[slug]`. This **is** a route-folder rename
  (`app/questions/[id]/` → `app/questions/[slug]/`) plus updating every
  call site above to push `q.slug` instead of `q.id` — a small, mechanical
  change, called out here but deliberately **not done now** per "don't
  modify the UI yet."
- Answers keep uuid `id`s and are **not** given their own route — they're
  addressed as a same-page anchor, `#`+uuid, exactly like today's
  `adminUrl()` (`community.inventive.ai/questions/q9#a1` becomes
  `.../questions/<slug>#<answer-uuid>`). The Admin "paste a URL" parser
  needs its regex (`/(q\d+)/`, `/#(a\d+)/`) replaced with "extract the
  path segment after `/questions/` as the slug, and the fragment after
  `#` as a literal answer uuid" — a same-shape, larger-alphabet version
  of the exact same logic.
- Profile route: `/u/[handle]` is keyed by URL-encoded **display name**
  today (fragile: not unique, breaks on rename, breaks on special
  characters). Moves to `/u/[username]`, keyed by `profiles.username`
  (§2). Every `router.push('/u/' + encodeURIComponent(name))` call site
  (`QuestionCard` author avatar, `QuestionDetail` author avatars,
  `Header`/`MobileHeader` own-avatar, `MobileBottomNav` "You", `Notifications`
  — indirectly, via question link not profile link) becomes
  `router.push('/u/' + username)` using the profile object's `username`
  instead of its `name`.

---

## 16. Migration plan (sequencing)

1. **Schema.** Apply the tables/enums/indexes/triggers/RLS above as a set
   of ordered SQL migrations (enums → `profiles` → `categories` → `tags`
   → `questions` → `question_tags` → `answers` → `votes` →
   `notifications`/`notification_preferences` → `reports` →
   `moderation_actions` → helper functions/RPCs → RLS policies). No app
   code changes yet.
2. **Seed migration.** A one-off script converts `mock-data.ts`'s
   `AUTHORS`/`CATEGORIES`/`SEED`/`NOTIFICATIONS`/`REPORT_QUEUE` into SQL
   inserts, translating relative time strings (`"2h ago"`) into concrete
   `timestamptz` values so `ORDER BY created_at` ("New" sort) still makes
   sense. Also generates `auth.users` rows for the 9 seed authors (or
   marks them as non-loginable seed profiles, TBD) and slugs for all 11
   seed questions.
3. **Supabase client plumbing.** Add `lib/supabase/client.ts`,
   `lib/supabase/server.ts`, `middleware.ts`. No screens touched yet.
4. **Auth.** Wire Login/Signup/Reset Password (§1) and add the
   `useUser()` hook + route protection. This unblocks everything else
   because `author_id = auth.uid()` policies need a real session to test
   against.
5. **Cut over reads and writes one screen at a time**, in this order
   (lowest-risk / most-exercised first, admin last since it's staff-only
   and highest blast-radius):
   1. Home feed + Question Detail (read path: `getAllQuestions`/`getQuestion`
      → real queries; write path: `vote`/`voteAnswer`/`acceptAnswer`/`submitAnswer`)
   2. Ask (`submitQuestion`)
   3. Search + homepage autocomplete (§11)
   4. Profile + Edit Profile + Settings (`getProfileQuestions`/`getProfileAnswered`,
      `updateProfile`, `togglePref`)
   5. Notifications (`getNotifications`, `getUnreadCount`, `markNotifRead`,
      `markAllNotifsRead`) — plus turning on the notification-generating
      triggers from §8
   6. Report flow (`submitReport`, including the detail-textarea fix from §9)
   7. Admin (`getAdminItems`, `adminSearch`, `setQuestionStatus`,
      `editQuestion`/`editAnswer`, `deleteItem`, `resolveReport`, plus
      `moderation_actions` writes on every one of those)
   During this phase, keep `store.ts`'s function names and return shapes
   stable (or introduce a parallel `store.supabase.ts` selected via a
   `NEXT_PUBLIC_DATA_SOURCE=mock|supabase` env flag) so each screen can be
   flipped and rolled back independently without touching component code.
6. **Slug/URL rename** (§15) lands alongside step 5.1 (Question Detail),
   since that's the first screen whose route actually needs it.
7. **Remove the mock layer.** Once every screen in step 5 is confirmed
   against Supabase, delete `mock-data.ts`'s seed constants and the
   Zustand overlay state in `store.ts`, keeping only the (now
   Supabase-backed) selector/action function signatures.
8. **Realtime (optional, phase 2).** Supabase Realtime channels for new
   answers on the currently-open question, live unread-notification
   count, and the moderation queue — replacing manual refetch-on-navigate.
9. **Testing.** RLS policy tests (pgTAP or the Supabase CLI's test
   runner) for every table in §13, especially the accept-answer /
   question-author check and the staff-only admin/report policies;
   integration tests per migrated screen.

---

## Open questions for you before implementation starts

1. Should regular users ever be able to edit their own question/answer
   (§13's optional author-UPDATE policy), or should that stay staff-only
   forever, matching the current UI exactly?
2. Are the 9 seed authors expected to be real, loginable demo accounts
   post-migration, or just display data attached to seeded content with
   no `auth.users` row?
3. Confirm the slug format (`title-slug-<shortid>`) is acceptable, or if
   a pure random slug / numeric-looking-but-real id is preferred instead.
4. Should `reports.comment_id` + the loosened CHECK constraint be added
   now (dead column, future-proofing) or only when comments actually
   ship?
