# Handoff: Inventive AI Community — Q&A / "Ask & Answer"

## Overview
A community Q&A forum for **Inventive AI customers** — where users report issues they hit in the product (RFP drafting, security questionnaires, Knowledge Hub, Copilot, integrations, SSO/billing), ask questions, and get answers from other customers and from Inventive staff. Modeled on the structure of a community "Ask & Answer" forum, styled entirely with the **Inventive AI Design System**.

Target stack: **Next.js (App Router) + Supabase** (Postgres, Auth, Row Level Security, Realtime, Storage).

## About the Design Files
The files in this bundle are **design references created in HTML** — a live, clickable prototype showing intended look, layout, and behavior. **They are not production code to copy.** The task is to **recreate these designs in the target Next.js + Supabase codebase** using its established patterns, component library, and data layer. Where this bundle shows a hardcoded array, the production app reads from Supabase.

`Community Prototype.dc.html` is authored as a "Design Component" (a streaming HTML format). Treat its React-ish logic class purely as a **behavior/state reference**, not as shippable React.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, radii, shadows, and interactions are intended as shown. Recreate the UI pixel-close using the codebase's existing components (the app already uses HeroUI + Tailwind + Fluent UI icons — see Design Tokens). All values below are exact.

## No backend behavior is faked
Every interactive element is annotated with its **intended** behavior via a `data-behavior="…"` attribute in the prototype source, and mapped in the *Interactions & Behavior* table below. In the prototype these are stubs (local state only). In production, wire each to Supabase. Do not ship the local stubs.

---

## Screens / Views
All authed screens share a **persistent 60px top header** (mobile: 54px). A fixed dark **"Prototype nav"** bar at the bottom is a review aid only — **remove it in production** (it is the last `<div>` in the template, driven by `devScreens` / `devStates` / `devDevice`).

### 1 & 2. Community Homepage / Question Listing  (`view: 'home'` and `view: 'feed'` — same layout)
- **Purpose:** The landing surface **is** the question listing — the main browse/triage screen. (Logo/"Home" and the "Ask & Answer" nav both resolve to this; there is no separate trending/contributors homepage.)
- **Layout:** Full-bleed hero (teal gradient) with centered title + search + "Ask a Question", then a max-1180px body with three columns via flex + `flex-wrap`: left **Spaces sidebar** (206px), center **feed** (flex:1, min-width 280px), right **rail** (214px, Top Contributors + Popular Tags). Right rail is a tweakable toggle and hides on mobile.
- **Hero copy:** H1 "Ask & Answer"; sub "Search answered questions from the Inventive AI community, or ask your own and get help from other teams and staff."
- **Sort tabs:** pill row — Trending / New / Unanswered / Top. Active pill `#047A9F`/white; inactive `#F3F5F6`/`#4A5154`.
- **Question card** (the signature component):
  - Row flex; left **status spine** 7px wide, colored by status (see Status model). Toggleable via `cardStyle` prop.
  - Header row: 32px round author avatar (solid tone) · name 13/600 + "{time} in {Category}" (category name in its accent color) · **status chip** (pill, tinted bg/fg, optional check) · overflow `⋯` (opens menu → Report).
  - Title: 16/600, hover `#047A9F`.
  - Snippet: 13px `#6B7280`, truncated ~150 chars.
  - **Accepted-answer preview** (only when solved): inset panel `#F5FAFB` / border `#DCEBEF`, radius 8 — 20px answerer avatar, name, "Inventive Staff" gradient pill if staff, then answer text truncated ~170 chars.
  - Footer: tag chips (`#F3F4F6`/`#6B7280`, radius 6) + right-aligned metrics — upvote button (▲ + count, teal when voted), replies (chat icon), views (eye icon).
- **States:** Loading (5 shimmer skeleton cards, `@keyframes skq`), Error (pink panel + Retry), Empty (`not-found.svg` + "Ask a Question"). See Interactions.

### 3. Question Detail  (`view: 'detail'`)
- **Purpose:** Read the full question, its answers, add an answer/comment, vote, follow, report.
- **Layout:** max-900px. Back link → listing. Question card (status spine, chip, category, `⋯`→report). Author block + **Follow** toggle button + vote/views. Body 14/1.65. Tags. **Comments** under a dashed divider with an inline "Add a comment…" input. Then "{n} Answers" heading, answers sorted **accepted first**. Accepted answer gets a tinted background (teal `#F5FAFB` for staff / green `#F4FBF5` for community) + "Verified Answer" / "Accepted Answer" pill. Each answer: avatar, name, staff pill, time, body, upvote button, Comment, Report. Bottom: "Your Answer" composer + "Post Answer".

### 4. Ask a Question  (`view: 'ask'`)
- **Purpose:** Create a question.
- **Layout:** max-1000px, form (flex:1) + 250px "Writing a good question" tip card (subtle perrywinkle gradient). Fields: **Title** (required, helper text), **Category** (required — selectable accent chips), **Details** (textarea; rich text/markdown in prod), **Tags** (up to 5, autocomplete). Cancel (discard → listing) + Post Question (validate → POST → redirect to new detail).

### 5. Search  (`view: 'search'`)
- **Purpose:** Full search results.
- **Layout:** max-900px. Large search input (live). "{n} results for '{query}'". "Matching tags" chip row when tags match. Result rows (compact question cards). Empty state when nothing matches.
- **Trigger:** Enter in the header/hero/home search boxes → search view (`onSearchKey`).

### 6. Tags Index  (`view: 'tags'`)
- **Purpose:** Browse topics.
- **Layout:** max-1180px. Responsive grid of tag cards: `#tag` chip (`#E0EDF1`/`#035E7B`), description, "{n} questions". Click → listing filtered by that tag.

### 7. Category / Space Landing  (`view: 'category'`)
- **Purpose:** One space's questions.
- **Layout:** White banner (back to spaces, 46px tinted icon tile, name + description, "Ask in {short}" button), then sort tabs + a compact question list (max-760px).

### 8. User Profile  (`view: 'profile'`)
- **Purpose:** A member's activity.
- **Layout:** Gradient hero (66px avatar, name, staff pill, role · joined, "Edit Profile" if it's you). Three stat cards (Questions asked / Answers given / Upvotes received). Tabs: Questions / Answers → list of that member's items. Reached by clicking any avatar/name, the header avatar (your own), or a top-contributor.

### 9. Notifications  (`view: 'notifications'`)
- **Purpose:** Activity feed.
- **Layout:** max-720px. "Mark all as read". List rows: 34px type-icon disc (tinted), "**{actor}** {text} {target link}", time, unread teal dot + `#F5FAFB` bg. Row click → related question detail + marks that one read. Header bell shows an unread count badge (`#E91E63`). Empty state when none.

### 10. Login / Signup  (`view: 'auth'`)
- **Purpose:** Authentication. Rendered without the app chrome in production (standalone route).
- **Layout:** Centered 380px card on a perrywinkle gradient. Segmented Log In / Sign Up toggle. Login: work email, password, "Forgot password?", Log In. Signup: full name, work email (work-domain validated), password (≥8). Divider + **"Continue with Okta SSO"** (SSO is a first-class path — the product is enterprise). Guidelines footnote.

### 11. Admin / Moderation  (`view: 'admin'`)  — **staff only**
- **Purpose:** Review reported content.
- **Layout:** max-1180px. "Moderation" + "Staff only" pill + queue count. Three stat cards (Open reports / Awaiting first answer / Resolved <24h). Tabs: Report Queue / Flagged Users / Activity Log. Queue rows: content-kind chip (Question/Answer/Comment) + reason pill (`#FCE4EC`/`#C2185B`) + "Reported by … · time"; quoted content panel; actions **Keep** (green) / **Remove** (magenta) / **Dismiss** (outline) + "View in context →". Empty = "Queue clear".

### 12. Report Flow  (modal, `reportOpen`)
- **Purpose:** Report a question/answer/comment. Opened from any `⋯` / "Report".
- **Layout:** Centered 420px modal over a `rgba(16,24,40,.5)` scrim (click scrim or × to close). Title "Report this {kind}". Radio reasons: Spam or advertising / Off-topic or low quality / Incorrect or harmful information / Harassment or abuse / Something else. Optional detail textarea. Cancel / **Submit Report** (magenta). On submit → success confirmation state (green check, "Report submitted"). In prod: writes a `reports` row → moderation queue.

### 13. Reset Password  (`view: 'reset'`)
- **Purpose:** Request a password reset link. Standalone route (no app chrome).
- **Layout:** Same 380px centered card as auth. "Reset your password" + helper, work-email input, "Send reset link" (→ Supabase `resetPasswordForEmail` → confirmation), "← Back to log in" (→ auth). Reached from Login "Forgot password?" and Settings → Password → Change.

### 14. Edit Profile  (`view: 'editProfile'`)  — **self only**
- **Purpose:** Update your public profile.
- **Layout:** max-640px form card. 60px avatar + "Change photo" (→ avatar upload to Supabase Storage). Fields: Display name, Username (prefixed `community.inventive.ai/u/`, uniqueness-validated on blur), Company, Bio. Cancel (discard → profile) / Save Changes (→ update `profiles` row → profile). Reached from Profile "Edit Profile" (only shown on your own profile).

### 15. Settings  (`view: 'settings'`)
- **Purpose:** Account + notification preferences.
- **Layout:** max-640px. **Account** card: Email (→ change-email flow) and Password (→ reset), each with a "Change" link. **Notifications** card: five toggle rows ("Email me when…") — New answers to your questions / Mentions of you / An answer gets Staff Verified / Upvotes on your posts / Weekly community digest. Toggle = 38×22 pill switch, teal `#047A9F` when on / `#D1D5DB` off (state `prefs.*`; maps to a `notification_preferences` row). **Danger zone**: pink card with "Log Out" (→ Supabase `signOut` → login). Reached from Profile "Settings".

### Responsive / Mobile  (`device: 'mobile'`, ~440px frame)
- Desktop sidebars and right rail are **hidden**; content becomes single-column; containers go to 100% width; hero padding + H1 shrink; space/tag grids collapse to 1–2 cols.
- **Mobile header** (54px): hamburger, logo, search icon, avatar.
- **Fixed bottom tab bar:** Home · Search · Ask (center FAB, teal) · Alerts (unread dot) · You. Active item tinted teal.
- Production breakpoint: switch to the mobile treatment at **≤760px** (the prototype uses a `device` flag to demo it; implement as CSS/media-query + a drawer for the hamburger).

---

## Interactions & Behavior
Each maps a UI action → intended production behavior. Source of truth is the `data-behavior` attribute on each element.

| Element | Behavior |
| --- | --- |
| Logo | → Community homepage |
| Header "Ask & Answer" | → Question listing |
| Header "Tags" | → Tags index |
| Header/hero/home search | Type = query state; **Enter** → Search results page |
| "Ask a Question" (header, hero, empty states, mobile FAB) | → Ask Question flow |
| Bell icon (+ unread badge) | → Notifications |
| Header avatar / "You" | → your own profile |
| Sidebar space | "All Questions" filters listing to all; a category → Category landing |
| Sort pill (Trending/New/Unanswered/Top) | Re-query + re-sort the listing |
| Tag chip (anywhere) | → listing filtered by that tag (`?tag=`) |
| "clear ×" on tag banner | Remove tag filter |
| Question card / title | → Question detail |
| Author avatar / name | → that user's profile |
| Upvote ▲ (question / answer) | Toggle your vote; optimistic count; persist to Supabase (`votes`) |
| Follow button (detail) | Toggle follow on the question (`follows`); label Follow ⇄ Following |
| "Comment" / "Add a comment…" | Adds a comment (POST) to question or answer |
| "Post Answer" | Validate → insert `answers` row → appears in list |
| `⋯` overflow / "Report" | Opens overflow menu → **Report flow** modal |
| Report → Submit | Insert `reports` row → success state → item enters moderation queue |
| Notification row | → related question detail; marks that notification read |
| "Mark all as read" | Set all notifications read |
| Ask → category chip | Select category (required for submit) |
| Ask → Post Question | Validate → insert `questions` row → redirect to its detail |
| Login → Log In | Supabase `signInWithPassword` → home |
| "Continue with Okta SSO" | Supabase SSO (SAML/Okta) |
| Signup → Create Account | Supabase `signUp` → email verification |
| "Forgot password?" (login) / Settings → Password | → Reset Password screen → Supabase `resetPasswordForEmail` |
| Profile "Edit Profile" | → Edit Profile → update `profiles` row |
| Edit Profile "Change photo" | Avatar upload → Supabase Storage |
| Profile "Settings" | → Settings |
| Settings notification toggle | Toggle an email preference (`notification_preferences`) |
| Settings "Log Out" | Supabase `signOut` → login |
| Moderation Keep / Remove / Dismiss | Resolve the report: Keep (approve content), Remove (hide content + notify author), Dismiss (no action) — all set `reports.status` + write `moderation_actions` |
| Retry (error state) | Re-fetch the listing query |

**Transitions/animation:** view changes scroll to top (150–250ms feel). Skeleton shimmer = `skq` 1.2s ease-in-out infinite. Card hover raises shadow (`--shadow-card` → a slightly deeper shadow). Modal enter = fade/scale (250ms). No bounce/overshoot (per design system motion rules).

**Form validation:** Ask requires Title + Category; Tags ≤ 5. Signup email must be a work domain; password ≥ 8. Errors use magenta-pink `#E91E63` (product's error color, not red).

---

## State Management
Prototype-local state that maps to production data/routes:

| State | Production equivalent |
| --- | --- |
| `view` | Route (`/`, `/questions`, `/questions/[id]`, `/ask`, `/search`, `/tags`, `/spaces/[slug]`, `/u/[handle]`, `/notifications`, `/login`, `/admin`) |
| `sort`, `cat`, `tag`, `search` | Query params driving the questions query |
| `cur` | Current question id (route param) |
| `voted` / `aVoted` | `votes` rows for the current user (optimistic UI) |
| `follows` | `follows` rows for the current user |
| `notifsRead` | `notifications.read_at` |
| `dataState` (ready/loading/empty/error) | React Query / server-component fetch status |
| `reportOpen` / `reportKind` / `reportDone` | Report modal + `reports` insert |
| `authTab` | Login/Signup tab |
| `device` | Viewport breakpoint (demo flag only) |

Data fetching: use Supabase queries (server components / React Query). Realtime channels for new answers, notifications, and the moderation queue. Votes/follows optimistic with rollback on error.

---

## Suggested Supabase Data Model
Postgres tables (snake_case), all with `id uuid default gen_random_uuid()`, `created_at timestamptz default now()`. Enforce access with **RLS**.

- **profiles** — `id` (→ `auth.users`), `handle`, `display_name`, `avatar_tone`, `role` (`member` | `staff`), `company`, `joined_at`. *Public read; self-update.*
- **categories** — `id`, `slug`, `name`, `short_name`, `color`, `tint`, `description`. *Public read; staff write.* (Seed with the 7 categories below.)
- **questions** — `id`, `author_id`→profiles, `category_id`→categories, `title`, `body`, `status` (`unanswered`|`open`|`community`|`verified`), `view_count`, `is_hidden`. *Public read (non-hidden); author insert/update; staff moderate.*
- **question_tags** — `question_id`, `tag_id` (join). **tags** — `id`, `name` (unique), `description`.
- **answers** — `id`, `question_id`, `author_id`, `body`, `is_accepted`, `accepted_kind` (`community`|`verified`), `is_hidden`. Accepting an answer updates the parent `questions.status`.
- **comments** — `id`, `parent_type` (`question`|`answer`), `parent_id`, `author_id`, `body`.
- **votes** — `id`, `user_id`, `target_type` (`question`|`answer`), `target_id`, unique(`user_id`,`target_type`,`target_id`). Count via view/trigger.
- **follows** — `user_id`, `question_id`, unique pair.
- **notifications** — `id`, `user_id` (recipient), `actor_id`, `type` (`answer`|`verified`|`vote`|`mention`|`comment`), `question_id`, `read_at`.
- **reports** — `id`, `reporter_id`, `target_type` (`question`|`answer`|`comment`), `target_id`, `reason` (enum), `detail`, `status` (`open`|`kept`|`removed`|`dismissed`). *Reporter insert; staff read/update.*
- **moderation_actions** — `id`, `report_id`, `moderator_id`, `action`, `note`.
- **notification_preferences** — `user_id` (→ profiles, unique), plus a boolean per channel: `answers`, `mentions`, `verified`, `upvotes`, `digest`. *Self read/write.* Defaults: all true except `digest`.

**Status is derived, not free-typed:** `unanswered` = 0 answers; `open` = has answers, none accepted; `community`/`verified` = accepted answer by a member/staff. Recompute on answer insert/accept.

---

## Design Tokens
From the Inventive AI Design System (`_ds/…/colors_and_type.css`). Use these exact values.

**Type**
- Display / headings: **Red Hat Display** 600–700, letter-spacing −0.3 to −0.5px.
- Body & UI: **Figtree** 400/500/600. Base 14px. Scale: caption 10 / subbody 12 / body 14 / 16 / 18 / 20 / 24 / 30.
- (Codebase also has Vela Sans as `--font-mono` for spec/marketing; not used here.)

**Color**
- Primary teal: `--primary-500 #047A9F`, hover/press `#035E7B`, tint `#E0EDF1`, light `#E5F2F5`.
- Neutrals: fg `#111827`/`#191D1F`, body `#4B5563`, muted `#6B7280`/`#9CA3AF`; borders `#E5E7EB` / `#E6E9EA` / `#F0F2F3`; surfaces `#FFFFFF`, `#F9FBFB`, `#EEF0F1` (page bg).
- Accent palette (category hints, solid): pompelmo `#FF6969`, perrywinkle `#A084E8`, peach `#F4BF96`, sky `#31A2DA`, mandarin `#FF8800`, forest `#419C4D`, ink `#035E7B`.
- Semantic: success `#4CAF59` (+`#2E7D39` text / `#E8F5E9` bg), warning `#FFC107` (+`#B37800`/`#FFF8E1`), error/magenta `#E91E63` (+`#C2185B`/`#FCE4EC`), info `#4699FF`.
- Copilot/AI gradient (AI surfaces only): `#A084E8 → #FFB764`. Staff pill uses `linear-gradient(90deg,#F1EDFB,#FFEEE7)` / text `#61508C`.
- Hero (this design): teal `linear-gradient(135deg,#04252F 0%,#035E7B 55%,#047A9F 100%)`; light alt `linear-gradient(139deg,#E1DAF7 -30%,#FFF 62%)`.

**Status → spine / chip**
- Staff Verified: spine `#047A9F`, chip `#E0EDF1`/`#035E7B`, check.
- Community Solved: spine `#4CAF59`, chip `#E8F5E9`/`#2E7D39`, check.
- In Discussion: spine `#9CA3AF`, chip `#F3F5F6`/`#636B6E`.
- Awaiting Answer: spine `#FFC107`, chip `#FFF8E1`/`#B37800`.

**Radius:** 4 (buttons/inputs/cards), 6–8 (chips/cards/modals), pill `9999px` (status chips, avatars). **Shadows:** card = `0 0 1px rgba(29,33,45,.2), 0 0 2px rgba(29,33,45,.08), 0 2px 4px rgba(29,33,45,.08)`; menu/modal = deeper. **Spacing:** 4/8/12/16/20/24/32. **Motion:** fast 150ms, base 250ms, slow 400ms, `cubic-bezier(.2,0,0,1)`.

**Buttons:** primary = `linear-gradient(180deg,#047A9F,#035E7B)` + border `#035E7B` white text; default = `linear-gradient(180deg,#fff -75%,#f3f4f6)` + border `#E5E7EB`; danger = `#C2185B`.

## Iconography
The prototype uses hand-drawn outline SVGs as **stand-ins**. Production uses **Fluent UI React Icons** (`@fluentui/react-icons`, 16/20/24px, Regular outline / Filled for active), with **Lucide** as secondary. Replace the inline SVGs with the equivalent Fluent icons (search, bell, chat, eye, chevron, plus, ellipsis, check, home, user, hamburger).

## Assets
In `assets/` (copied from the design system):
- `inventive-mark.svg` — colorful "I" mark (header lockup + hero watermark).
- `inventive-logo.svg` — larger mark variant.
- `not-found.svg`, `empty-project.svg` — empty/error-state illustrations.
Full design system (tokens, logos, illustrations) lives in the bound project `_ds/inventive-ai-design-system-…/`.

## Files
- `Community Prototype.dc.html` — **the interactive prototype**: all 15 screens + loading/empty/error + mobile, with `data-behavior` annotations. Behavior/state reference lives in its logic class (`renderVals`).
- `Community Ask & Answer.dc.html` — the three explored feed directions (1a helpdesk list, 1b community cards, 1c solved-forward). Chosen direction = **1b layout + 1c color grading & question treatment**, which is what the prototype implements. Kept for context.
- `assets/` — images used above.
- `support.js` — runtime for the `.dc.html` format; **not needed** for the production rebuild.

> Reminder: strip the bottom **"Prototype nav"** bar and the `device` demo toggle before shipping — they exist only to review every screen/state quickly.
