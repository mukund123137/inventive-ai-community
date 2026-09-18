# Inventive AI — Design System

Brand + UI design system for **Inventive AI**, an AI-powered RFP and security-questionnaire response platform. Inventive helps sales and proposal teams generate accurate, context-aware proposal drafts ~10× faster using specialized AI agents and a unified knowledge hub. The brand is modern, enterprise-grade B2B SaaS: clean, professional, and trustworthy (SOC 2 Type II compliant).

This system is the source of truth for color, type, spacing, components, and full-screen recreations of both the marketing site and the product app.

## Sources

- **Webflow site export** (read-only, mounted): `inventiveai-staging.webflow/` — the live marketing site. Tokens, fonts, copy, and imagery are extracted verbatim from `css/inventiveai-staging.webflow.css` and the page HTML.
- **Product app**: reverse-built from the in-app UI screenshot (`assets/imagery/Inventive-AI-UIUX.jpeg`) — the RFP response document editor. No app codebase was provided, so the app UI kit is a high-fidelity visual recreation, not a code port (see Caveats).

> Never invent new hex codes. Extend the palette by adding tokens to `tokens/colors.css`.

---

## Product context

Inventive is one product with two surfaces:

1. **Marketing website** (`inventiveai.com`) — Webflow. Hero "Win More with AI Agents for RFP & SecQ.", feature sections, ROI stats, testimonials, trust logos, FAQ, demo capture.
2. **Product app** — the RFP/SecQ workspace. Core view is a **document editor**: left icon rail + file/question tree, a main response document with collapsible sections, per-question AI generation ("Auto-Generate"), confidence/sources, and export.

Product pillars (from the site): **AI RFP Responses** (10× faster, 95% context-aware accuracy), **Unified Knowledge Hub**, **AI Content Manager** (stale/duplicate detection), **AI Agents Hub** (research, refine, brainstorm).

Headline metrics: **50%+ higher win rates · 90% faster responses · 70% more efficiency · 95% accuracy.**

---

## CONTENT FUNDAMENTALS

How Inventive writes.

- **Voice:** confident, benefit-led, enterprise-credible. Outcome-first ("Win More", "90% Faster RFPs. 50% More Wins."). Never hypey or jokey.
- **Person:** addresses the customer as **"you / your team"**; refers to itself as **"Inventive"** or **"Inventive AI"** (e.g. "Inventive's AI RFP software offers…"). First-person plural ("we", "our top priority") appears in trust/security copy.
- **Casing:** Headlines use **Title Case** ("Simplify RFP Workflows With AI RFP Software", "Single Hub for All Your Knowledge Sources"). Eyebrows are **UPPERCASE** short labels ("AI RFP SOFTWARE"). Body is sentence case.
- **Numbers as proof:** lead with hard metrics — `10X`, `90%`, `50%+`, `95%`. Numerals, not words. Stat numbers render in the brand gradient.
- **Buttons:** action-oriented and short — **"Book a Demo"** (the dominant CTA), "Start Generating", "Get a Demo", "Learn more", "Export", "Auto-Generate". Sentence/title case, verb-first.
- **Vocabulary:** RFP, SecQ / security questionnaire, RFx, proposal, knowledge hub, AI agents, win rate, context-aware, compliance, SOC 2. Acronym "SecQ" is used in hero copy.
- **Tone of proof points:** specific and operational ("80 RFP questions in 3 hours — work that used to take nearly a week").
- **Emoji:** none. The brand does not use emoji in product or marketing. Do not introduce them.
- **Punctuation:** em-dashes and ampersands ("RFP & SecQ") are common; sentences are short and scannable.

---

## VISUAL FOUNDATIONS

- **Color vibe:** warm + optimistic over an enterprise-neutral base. A single **peach** (`#F4BF96`) primary anchors CTAs; the logo's multi-color pinwheel (red/orange/peach/green/blue/purple/teal) supplies accents. Deep teal-navy (`#04252F`) is the universal heading ink. Purple/lilac is the secondary accent family (eyebrows, icon two-tone, gradient).
- **Type:** **Red Hat Display** for every heading (geometric, friendly-serious; h2 is semibold with tight `-.03em` tracking). **Figtree** for all body and UI (humanist, legible). Generous body line-height (~1.7).
- **Backgrounds:** mostly clean **white** and a soft **`#F6F6F6`** page gray. Feature sections sit on white; "results"/CTA bands use a soft **peach→lilac gradient wash** (`linear-gradient(118deg,#FCECDF,#EBDFED)`). No dark mode, no heavy textures, no photographic hero backdrops — a subtle light gradient sits behind the hero.
- **Gradients:** used sparingly and tastefully — (1) **text gradient** on stat numbers (`#FFA49C → #906FE0`, coral→purple); (2) soft **section wash** bands. Avoid bluish-purple "AI slop" gradient fills on buttons or cards.
- **Cards / surfaces:** white fill, **large radius (20px)**, **soft low-spread shadow** (e.g. `0 4px 25px rgba(13,10,44,.06)`), optional hairline border `rgba(0,0,0,.08)`. Calm and floating, never harsh.
- **Borders:** hairline, low-opacity black (`rgba(0,0,0,.1)`). Eyebrow chips and pills use full `1px` solid borders with pill radius. Inputs: 1px hairline → lilac on focus.
- **Corner radii:** buttons/inputs **6px**, chips **12px**, cards **20px**, pills/tags fully rounded.
- **Shadows:** two systems — (a) ambient soft card shadows (low alpha, large blur); (b) stronger pop shadows for popovers/menus (`0 10px 20px rgba(0,0,0,.1)`). No inner shadows. No neon glows.
- **Buttons:** peach fill, black label, 6px radius. **Hover flips to near-black with white text** (the live-site behavior) via `transition: color .3s, background-color .3s`. Secondary = transparent w/ 1px black border that fills black on hover. In-app, generate/AI actions use a **near-black** button (often with a sparkle icon).
- **Hover states:** CTAs flip fill (peach→black); cards lift `translateY(-3px)` + deepen shadow; nav/icon controls get a subtle gray fill. Links don't underline.
- **Press states:** subtle — rely on the color flip; no aggressive scale-down.
- **Motion:** restrained. `0.2–0.3s` ease transitions on color/background/transform; marquee for trust logos; slider for testimonials. No bounces, no infinite decorative loops on content.
- **Transparency / blur:** the fixed navbar uses `backdrop-filter: blur(5px)` over `#FFFFFFcc`. Otherwise opacity is reserved for tints (`33` alpha semantic tints) and hairline borders.
- **Layout:** centered **80rem (1280px)** max-width container, 20px gutters. Standard section `padding-block: 80px` (large/hero up to 150px). Fixed top navbar (80px tall). Two-column feature rows (text ↔ image), numbered.
- **Imagery:** product screenshots in soft-shadowed frames; warm, bright, no heavy grain; brand two-tone illustrative icons. Testimonial author photos are small circles.

---

## ICONOGRAPHY

Inventive uses a **custom, two-tone line-icon set** plus a few gradient glyphs — not a single off-the-shelf icon font.

- **Feature / nav icons** (`assets/icons/ic-*.svg`): outline icons, **black stroke + light-lilac (`#E6DBF1`) accent stroke**, rounded line-caps, ~65px artboard. Two-tone is the signature (one shape black, the paired shape lilac). Examples: `ic-power`, `ic-smart`, `ic-intuitive`, `ic-collaborate`, `ic-insight`.
- **Stat / glyph icons** (`assets/icons/fi_*.svg`): filled glyphs painted with the brand **peach→purple gradient** (`#F8CAA5 → #C29DC8`). Used beside ROI stats.
- **UI chrome arrows** (`ic-arrow.svg`, `ic-arrow-white.svg`, `Icon-Arrow-Right.svg`): the brand chevron-arrow used inside CTAs. The `Button` component inlines this exact arrow via `withArrow`.
- **Emoji:** never used. Do not substitute emoji for icons.
- **Unicode glyphs:** a literal `+` is used inside eyebrow chips; `"` (curly quote) as an oversized quotation mark in testimonials.
- **For new UI** that needs generic icons not in the brand set (settings, search, chevrons, etc.), use **Lucide** (`https://unpkg.com/lucide-static`) at ~1.8px stroke — it matches the brand's rounded-cap outline style. Flagged as a substitution; swap for brand icons where they exist.

Copied into `assets/icons/`: `ic-power`, `ic-smart`, `ic-intuitive`, `ic-collaborate`, `ic-insight`, `ic-arrow`, `ic-arrow-white`, `ic-plus`, `ic-mail`, `Icon-Arrow-Right`, `fi_126425`, `fi_3564796`, `fi_8992436`. Logos in `assets/logos/`, imagery in `assets/imagery/`.

---

## INDEX / manifest

**Root**
- `styles.css` — global entry point (consumers link this). `@import`-only.
- `readme.md` — this guide.
- `SKILL.md` — Agent Skill wrapper.

**`tokens/`** (all reachable from `styles.css`)
- `colors.css` · `typography.css` · `spacing.css` (+ radius, elevation, motion) · `fonts.css` (`@font-face`) · `base.css` (element resets + helpers).

**`components/`** (React primitives — `window.InventiveAIDesignSystem_d9fddb.*`)
- `buttons/` — **Button**, **IconButton**
- `surfaces/` — **Card**, **StatCard**, **FeatureCard**
- `data-display/` — **Badge**, **Avatar**, **Eyebrow**
- `forms/` — **Input**, **Textarea**

**`guidelines/`** — foundation specimen cards (Colors, Type, Spacing, Brand) shown in the Design System tab.

**`ui_kits/`**
- `website/` — marketing site recreation (hero, features, stats, testimonials, CTA, footer).
- `app/` — product RFP/SecQ document-editor recreation.

**`assets/`** — `fonts/`, `logos/`, `icons/`, `imagery/`.
