-- Seed data mirroring web/src/lib/mock-data.ts (AUTHORS, CATEGORIES, SEED,
-- NOTIFICATIONS, REPORT_QUEUE). Applied automatically by `supabase db
-- reset` / `supabase db seed`, or manually via `psql -f supabase/seed.sql`.
--
-- All content here is demo/display data. Per the approved plan, none of
-- the 9 mock authors get a real auth.users row (user_id stays NULL) —
-- real users are created through Supabase Auth + the handle_new_user()
-- trigger, not through this file.
--
-- Two small, deliberate departures from a literal 1:1 transcription of the
-- mock, both because a relational schema needs every report to point at a
-- real row (the mock's REPORT_QUEUE never actually linked its 3 entries to
-- real SEED questions/answers):
--   1. Two extra "spam account" profiles (promo_deals, anon_user) and one
--      extra question + one extra answer authored by them, so the two
--      representable reports (Question, Answer) have something real to
--      point at. Flavor text is taken verbatim from the mock's report
--      content.
--   2. REPORT_QUEUE's third entry (`kind: 'Comment'`) is NOT seeded. Per
--      the approved plan (decision #4), there is no comments table — that
--      report can't be represented without one. See docs/supabase-integration-plan.md §9.

begin;

-- Recompute triggers on `answers` would otherwise fire once per seeded row
-- and generate a flood of "answered your question" / "verified" notices
-- that don't match the mock's curated 3-row NOTIFICATIONS list. Disabled
-- for the duration of the seed only; the notifications this seed wants
-- are inserted explicitly, below.
alter table answers disable trigger answers_notify_new;
alter table answers disable trigger answers_notify_verified;

-- ───────────────────────── profiles ─────────────────────────

insert into profiles (id, username, display_name, avatar_tone, role, company, bio) values
  ('10000000-0000-0000-0000-000000000001', 'priya-nair',   'Priya Nair',   '#FF8800', 'user', 'Northwind Security', 'RFP lead. Mostly living in security questionnaires.'),
  ('10000000-0000-0000-0000-000000000002', 'marcus-web',   'Marcus Web',   '#31A2DA', 'user', null, null),
  ('10000000-0000-0000-0000-000000000003', 'jon-lin',      'Jon Lin',      '#419C4D', 'user', null, null),
  ('10000000-0000-0000-0000-000000000004', 'elena-ruiz',   'Elena Ruiz',   '#FF6969', 'user', null, null),
  ('10000000-0000-0000-0000-000000000005', 'tom-fields',   'Tom Fields',   '#4A3D6E', 'user', null, null),
  ('10000000-0000-0000-0000-000000000006', 'sara-okafor',  'Sara Okafor',  '#A084E8', 'user', null, null),
  ('10000000-0000-0000-0000-000000000007', 'nate-park',    'Nate Park',    '#C08A57', 'user', null, null),
  ('10000000-0000-0000-0000-000000000008', 'amara-sy',     'Amara Sy',     '#2E7D39', 'user', null, null),
  ('10000000-0000-0000-0000-000000000009', 'dana-ruiz',    'Dana Ruiz',    '#61508C', 'admin', null, null),
  -- spam-flavored accounts, purely so the seeded reports have a real target (see file header)
  ('10000000-0000-0000-0000-000000000010', 'promo-deals',  'promo_deals',  '#9CA3AF', 'user', null, null),
  ('10000000-0000-0000-0000-000000000011', 'anon-user',    'anon_user',    '#9CA3AF', 'user', null, null);

insert into notification_preferences (user_id)
  select id from profiles where id in (
    '10000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000004',
    '10000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000006',
    '10000000-0000-0000-0000-000000000007', '10000000-0000-0000-0000-000000000008',
    '10000000-0000-0000-0000-000000000009'
  );

-- ───────────────────────── categories ─────────────────────────

insert into categories (slug, name) values
  ('getting-started', 'Getting Started'),
  ('rfp',              'RFP & Proposals'),
  ('security',         'Security Questionnaires'),
  ('knowledge',        'Knowledge Hub'),
  ('copilot',          'AI Agents & Copilot'),
  ('integrations',     'Integrations'),
  ('account',          'Account & Billing');

-- ───────────────────────── tags ─────────────────────────

insert into tags (name) values
  ('draft'), ('performance'), ('export'), ('excel'), ('indexing'),
  ('knowledge-hub'), ('copilot'), ('citations'), ('sso'), ('okta'),
  ('onboarding'), ('best-practices'), ('salesforce'), ('sync');

-- ───────────────────────── questions ─────────────────────────
-- slug = slugify(title) || '-' || first 6 hex chars of md5(id), computed
-- here rather than hand-typed so it's guaranteed to match the real
-- generation strategy (see web/src/lib/slug.ts once §15 lands).

insert into questions (id, slug, author_id, category_id, title, body, vote_count, created_at)
select
  v.id,
  lower(trim(both '-' from regexp_replace(regexp_replace(v.title, '[^a-zA-Z0-9]+', '-', 'g'), '-{2,}', '-', 'g')))
    || '-' || substr(md5(v.id::text), 1, 6),
  v.author_id,
  (select id from categories where slug = v.cat),
  v.title, v.body, v.vote_count, now() - v.age
from (values
  ('30000000-0000-0000-0000-000000000001'::uuid, '10000000-0000-0000-0000-000000000001'::uuid, 'rfp',
   'Draft generation stuck at "Analyzing knowledge base" for large RFPs',
   'When I kick off a draft for a 120-question RFP the progress bar sits at the analyzing step for 10+ minutes and then times out. Smaller projects generate fine within a minute. Is there a project-size limit, or something I can do to keep it moving?',
   24, interval '2 hours'),
  ('30000000-0000-0000-0000-000000000002'::uuid, '10000000-0000-0000-0000-000000000002'::uuid, 'security',
   'Excel export drops cell formatting on multi-sheet questionnaires',
   'After exporting a completed CAIQ the merged header cells lose their fill color and borders. Single-sheet exports look fine. Is there a setting I''m missing, or a recommended export format?',
   12, interval '5 hours'),
  ('30000000-0000-0000-0000-000000000003'::uuid, '10000000-0000-0000-0000-000000000003'::uuid, 'knowledge',
   'How do I re-index a single document after updating it in Knowledge Hub?',
   'I replaced a datasheet with a newer version but Copilot keeps citing the old numbers. Do I have to re-upload everything, or can I refresh just that one file?',
   9, interval '6 hours'),
  ('30000000-0000-0000-0000-000000000004'::uuid, '10000000-0000-0000-0000-000000000004'::uuid, 'copilot',
   'Copilot not citing sources from a specific Knowledge Hub folder',
   'Answers pull from most of our library but never from the "Compliance" folder, even when I ask directly about its contents. The folder is indexed and visible. Anyone seen this?',
   6, interval '26 hours'),
  ('30000000-0000-0000-0000-000000000005'::uuid, '10000000-0000-0000-0000-000000000005'::uuid, 'account',
   'SSO login redirect loop after changing our Okta configuration',
   'After our IT team rotated the Okta app, everyone gets bounced between Okta and Inventive in a loop and can''t sign in. What needs to be updated on the Inventive side?',
   18, interval '50 hours'),
  ('30000000-0000-0000-0000-000000000006'::uuid, '10000000-0000-0000-0000-000000000006'::uuid, 'getting-started',
   'Best way to structure Knowledge Hub folders for a brand-new team',
   'We''re onboarding and about to load ~300 reference docs. Is it better to organize by product line, by document type, or by customer? Curious what''s worked for larger teams.',
   15, interval '74 hours'),
  ('30000000-0000-0000-0000-000000000007'::uuid, '10000000-0000-0000-0000-000000000007'::uuid, 'integrations',
   'Salesforce widget not syncing opportunity fields into the project',
   'The Inventive widget shows on the opportunity but the account name and deal stage don''t carry into the new project. Field mapping looks correct. Where should I look?',
   7, interval '98 hours'),
  ('30000000-0000-0000-0000-000000000008'::uuid, '10000000-0000-0000-0000-000000000006'::uuid, 'knowledge',
   'How do I connect Google Drive as a knowledge source?',
   'We keep a lot of past proposals in a shared Google Drive. What is the cleanest way to connect it so Inventive can pull from those docs without me re-uploading everything?',
   11, interval '8 hours'),
  ('30000000-0000-0000-0000-000000000009'::uuid, '10000000-0000-0000-0000-000000000007'::uuid, 'rfp',
   'How do I create an RFP from a blank project?',
   'I have the questions in a Word doc but no template. What is the fastest path to a first draft from a blank project?',
   16, interval '10 hours'),
  ('30000000-0000-0000-0000-000000000010'::uuid, '10000000-0000-0000-0000-000000000004'::uuid, 'knowledge',
   'How do I add a website as a knowledge source?',
   'Our product docs live on a public help site. Can Inventive crawl a URL and use it as reference, and how often does it refresh?',
   8, interval '12 hours'),
  ('30000000-0000-0000-0000-000000000011'::uuid, '10000000-0000-0000-0000-000000000002'::uuid, 'getting-started',
   'How do I invite my teammates to our workspace?',
   'I set up the workspace but my colleagues cannot see our projects yet. Where do I send invites and what roles are available?',
   10, interval '28 hours')
) as v(id, author_id, cat, title, body, vote_count, age);

insert into question_tags (question_id, tag_id)
select q.id, t.id from (values
  ('30000000-0000-0000-0000-000000000001', 'draft'), ('30000000-0000-0000-0000-000000000001', 'performance'),
  ('30000000-0000-0000-0000-000000000002', 'export'), ('30000000-0000-0000-0000-000000000002', 'excel'),
  ('30000000-0000-0000-0000-000000000003', 'indexing'), ('30000000-0000-0000-0000-000000000003', 'knowledge-hub'),
  ('30000000-0000-0000-0000-000000000004', 'copilot'), ('30000000-0000-0000-0000-000000000004', 'citations'),
  ('30000000-0000-0000-0000-000000000005', 'sso'), ('30000000-0000-0000-0000-000000000005', 'okta'),
  ('30000000-0000-0000-0000-000000000006', 'onboarding'), ('30000000-0000-0000-0000-000000000006', 'best-practices'),
  ('30000000-0000-0000-0000-000000000007', 'salesforce'), ('30000000-0000-0000-0000-000000000007', 'sync'),
  ('30000000-0000-0000-0000-000000000008', 'knowledge-hub'), ('30000000-0000-0000-0000-000000000008', 'sync'),
  ('30000000-0000-0000-0000-000000000009', 'draft'), ('30000000-0000-0000-0000-000000000009', 'onboarding'),
  ('30000000-0000-0000-0000-000000000010', 'knowledge-hub'), ('30000000-0000-0000-0000-000000000010', 'indexing'),
  ('30000000-0000-0000-0000-000000000011', 'onboarding'), ('30000000-0000-0000-0000-000000000011', 'best-practices')
) as v(qid, tname)
join questions q on q.id = v.qid::uuid
join tags t on t.name = v.tname;

-- ───────────────────────── answers ─────────────────────────
-- Inserting these fires on_answers_change (0009), which increments each
-- parent question's answer_count and recomputes its status from scratch —
-- deliberately NOT set explicitly above, so a correct result here is also
-- a live check that the trigger logic matches the mock's derived-status
-- rules (unanswered / open / community / verified).

insert into answers (id, question_id, author_id, body, is_accepted, vote_count, created_at) values
  ('40000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000009',
   'This happens when a large batch is re-indexing mid-draft. Pause the sync under Knowledge Hub → Indexing, then restart the draft — it resumes in under a minute. We are also rolling out incremental indexing this month so the pause won''t be needed.',
   true, 31, now() - interval '1 hour'),
  ('40000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000003',
   'Worth checking your reference set too — I had one 900-page PDF that alone stalled the analyze step. Splitting it into sections fixed it for me.',
   false, 4, now() - interval '40 minutes'),
  ('40000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000006',
   'I hit this too. Exporting as .xlsx instead of the legacy .xls format kept my merged headers and fills intact — give that a try.',
   false, 6, now() - interval '3 hours'),
  ('40000000-0000-0000-0000-000000000004', '30000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000008',
   'Open the document in Knowledge Hub, click the ⋯ menu on its row and choose Re-index. It reprocesses just that file — no need to touch the rest. Takes about a minute for a datasheet.',
   true, 12, now() - interval '5 hours'),
  ('40000000-0000-0000-0000-000000000005', '30000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000009',
   'Okta rotation changes your ACS URL and signing cert. Update the SSO metadata under Settings → Security and re-upload the new IdP certificate — the loop clears immediately once the cert matches.',
   true, 22, now() - interval '48 hours'),
  ('40000000-0000-0000-0000-000000000006', '30000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000001',
   'By document type first (datasheets, policies, past responses), then tag by product line. Copilot retrieves on content, not folders, so the tags matter more than deep nesting. Keep it two levels max.',
   true, 19, now() - interval '48 hours'),
  ('40000000-0000-0000-0000-000000000007', '30000000-0000-0000-0000-000000000007', '10000000-0000-0000-0000-000000000001',
   'Check that the connected Salesforce user has read access to those fields — the sync silently skips fields the integration user can''t see. That was my issue.',
   false, 3, now() - interval '72 hours'),
  ('40000000-0000-0000-0000-000000000008', '30000000-0000-0000-0000-000000000008', '10000000-0000-0000-0000-000000000008',
   'Go to Knowledge Hub → Add source → Google Drive, authorize the workspace account, then pick the folders to sync. New and updated files re-index automatically after the first sync.',
   true, 9, now() - interval '6 hours'),
  ('40000000-0000-0000-0000-000000000009', '30000000-0000-0000-0000-000000000009', '10000000-0000-0000-0000-000000000009',
   'Create a project, upload the Word doc under Questions — Inventive parses each row automatically — then hit Auto-Generate. You can review and refine per answer before exporting.',
   true, 20, now() - interval '8 hours'),
  ('40000000-0000-0000-0000-000000000010', '30000000-0000-0000-0000-000000000010', '10000000-0000-0000-0000-000000000001',
   'Add source → Website, paste the root URL, and set a crawl depth. It re-crawls on the schedule you pick (daily or weekly) so cited pages stay current.',
   true, 7, now() - interval '9 hours'),
  ('40000000-0000-0000-0000-000000000011', '30000000-0000-0000-0000-000000000011', '10000000-0000-0000-0000-000000000006',
   'Settings → Members → Invite, enter work emails and choose a role (Admin, Editor, or Viewer). They get access to shared projects as soon as they accept.',
   true, 6, now() - interval '24 hours');

-- ───────────────────────── notifications ─────────────────────────
-- Matches NOTIFICATIONS in the mock exactly (see file header for why this
-- is inserted explicitly rather than left to the triggers).

insert into notifications (id, recipient_id, actor_id, type, question_id, answer_id, read_at, created_at) values
  ('50000000-0000-0000-0000-000000000001',
   '10000000-0000-0000-0000-000000000001', -- Priya Nair (q1's author)
   '10000000-0000-0000-0000-000000000009', -- Dana Ruiz
   'answer', '30000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001',
   null, now() - interval '1 hour'),
  ('50000000-0000-0000-0000-000000000002',
   '10000000-0000-0000-0000-000000000005', -- Tom Fields (q5's author)
   null,                                    -- "Inventive Team" system notice
   'verified', '30000000-0000-0000-0000-000000000005', '40000000-0000-0000-0000-000000000005',
   null, now() - interval '3 hours'),
  ('50000000-0000-0000-0000-000000000003',
   '10000000-0000-0000-0000-000000000001', -- Priya Nair (a6's author)
   '10000000-0000-0000-0000-000000000006', -- Sara Okafor
   'upvote', '30000000-0000-0000-0000-000000000006', '40000000-0000-0000-0000-000000000006',
   now() - interval '20 hours', now() - interval '1 day');

-- ───────────────────────── reports ─────────────────────────
-- Real target rows for the two representable report kinds (see file
-- header). The spam content/author names are taken verbatim from the mock.

insert into questions (id, slug, author_id, category_id, title, body, vote_count, created_at)
values (
  '30000000-0000-0000-0000-000000000099',
  'get-50-off-premium-rfp-templates-spam01',
  '10000000-0000-0000-0000-000000000010', -- promo_deals
  (select id from categories where slug = 'rfp'),
  'Get 50% off premium RFP templates',
  'Get 50% off premium RFP templates — visit my site to download hundreds of ready-made answers!',
  0, now() - interval '20 minutes'
);

insert into answers (id, question_id, author_id, body, is_accepted, vote_count, created_at) values
  ('40000000-0000-0000-0000-000000000099',
   '30000000-0000-0000-0000-000000000005', -- posted on the real SSO question
   '10000000-0000-0000-0000-000000000011', -- anon_user
   'Just turn off SSO entirely and share one login across the team, way less hassle.',
   false, 0, now() - interval '2 hours');

insert into reports (id, reporter_id, question_id, answer_id, reason, status, created_at) values
  ('60000000-0000-0000-0000-000000000001',
   '10000000-0000-0000-0000-000000000007', -- Nate Park
   '30000000-0000-0000-0000-000000000099', null,
   'Spam or advertising', 'open', now() - interval '20 minutes'),
  ('60000000-0000-0000-0000-000000000002',
   '10000000-0000-0000-0000-000000000004', -- Elena Ruiz
   null, '40000000-0000-0000-0000-000000000099',
   'Incorrect or harmful information', 'open', now() - interval '2 hours');

-- REPORT_QUEUE's third mock entry (kind: 'Comment', reporter Sara Okafor,
-- "Harassment") is intentionally NOT seeded — there is no comments table
-- per decision #4, so it has nothing to reference. Re-add once/if comments ship.

alter table answers enable trigger answers_notify_new;
alter table answers enable trigger answers_notify_verified;

commit;
