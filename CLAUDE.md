# CLAUDE.md — guvengursel.com

Operating contract for Claude Code on this repo. Read this end-to-end
at session start. Keep it short; update it when reality drifts.

---

## Project

Personal portfolio + writing site for Güven Gürsel. Astro v6.1.7 on
Cloudflare Pages (auto-deploy from `main`). Vanilla CSS only. No
Tailwind, no UI kits, no vendor lock-in. The site is time-boxed:
ship the shell tonight; content fills in over the coming weeks.

## Stack

- Astro v6.1.7
- Vanilla CSS with custom properties for theming
- Self-hosted web fonts (WOFF2, latin subset) under `public/fonts/`:
  Cormorant Garamond 300 regular + 300 italic, DM Mono 300 + 400.
  No third-party CDN calls.
- Cloudflare Pages (production branch: `main`)

No additional runtime dependencies without an explicit green light.

## Design philosophy — Sumi G3, "Nothing more"

Japanese minimalism. Every design decision runs through one filter:
**does this element earn its place, or is it noise?** If it's noise,
cut it. The tagline "Nothing more" is literal operating guidance.

Concrete consequences:

- Type, space, and a single accent color do the work. Hierarchy is
  built from size, spacing, and weight — never from categorical
  colors to distinguish sections, groups, or skill areas.
- One weight per role (display vs. body). Do not ladder through six
  weights to signal hierarchy when size and space already do.
- No icons purely for decoration. Icons only where they replace a
  word (e.g. theme toggle).
- Motion is rare. A calm theme toggle transition is fine; scroll-tied
  animations, entrance effects, and parallax are not.
- When in doubt between adding and removing: remove. Then test again.

## Layout container — `.sumi`

Every page lives inside a single gradient container. `body` uses the
flat `--bg` with outer padding; `.sumi` uses `--bg-gradient` (3-stop
radial), max-width 1100px, centered, 12px border-radius, 2.5rem /
3rem interior padding. Header, content, and footer all sit inside
the container. The container is the visual signature of the site
and stays consistent across every route.

## Design tokens

### Color — core

Dark (default, `:root`):

- `--bg`      : `#181816`
- `--heading` : `#f8f5ec`
- `--body`    : `#a5a59e`
- `--accent`  : `#d8ad76`

Light (`:root[data-theme="light"]`):

- `--bg`      : `#ebe5d7`
- `--heading` : `#1a1a18`
- `--body`    : `#5a5850`
- `--accent`  : `#8b5a2b`

### Color — semantic (additions)

Derived tokens that map to `--accent` where possible, so the accent
change in light mode propagates automatically.

Dark:

- `--bg-gradient` : `radial-gradient(ellipse at center, #2a2a28 0%, #1e1e1c 70%, #181816 100%)`
- `--border`      : `#353533`
- `--logo`        : `#f2efe6`
- `--nav-link`    : `#858580`
- `--pitch`       : `#656560`
- `--toggle-bg`   : `rgba(255, 255, 255, 0.05)`
- `--toggle-border`: `rgba(255, 255, 255, 0.1)`

Light:

- `--bg-gradient` : `radial-gradient(ellipse at center, #fafaf6 0%, #f2ede3 70%, #ebe5d7 100%)`
- `--border`      : `#d5cfc0`
- `--logo`        : `#2a2a28`
- `--nav-link`    : `#8a857a`
- `--pitch`       : `#a8a598`
- `--toggle-bg`   : `rgba(0, 0, 0, 0.04)`
- `--toggle-border`: `rgba(0, 0, 0, 0.08)`

Mapped (both themes):

- `--tag`             : `var(--accent)`
- `--nav-link-hover`  : `var(--accent)`
- `--toggle-icon`     : `var(--accent)`

### Typography

- Cormorant Garamond 300 regular — display headings (h1, h2, hero)
- Cormorant Garamond 300 italic — pitch quotes on `/` and lead lines
- DM Mono 300 regular — body prose (bio paragraphs)
- DM Mono 400 regular — nav, meta, tags, logo

Fonts are self-hosted. No requests to fonts.googleapis.com or
fonts.gstatic.com. `@font-face` rules live in global.css and
reference `/fonts/*.woff2`.

## Information Architecture

Five primary routes plus two legal pages:

- `/`          — hero + expertise cards
- `/about`     — bio + skills
- `/projects`  — portfolio entries (shell now, content Phase 2)
- `/blog`      — writing index
- `/contact`   — contact block
- `/impressum` — legal notice (Austrian ECG §5 + MedienG §25)
- `/privacy`   — data protection notice (GDPR Art 13)

Header nav exposes `about · projects · blog · contact` plus the
theme toggle. Footer exposes copyright, `/impressum`, `/privacy`,
and socials. `/` is reached via the site-name / logo element.

## Discipline

1. **Step by step.** One page, one component, one section at a time.
   No bulk generation, no "here is the whole site."
2. **Plan → confirm → build.** Before any new section or file, state
   the plan in plain text — what file, which tokens, what markup.
   Wait for the Captain's explicit "go". Only then edit.
3. **Vanilla CSS only.** Custom properties, raw selectors, BEM-ish
   naming where it helps. No Tailwind, no CSS-in-JS, no component
   library. Vendor lock-in is a permanent reflex: if a solution
   requires handing the design system to a third party, refuse it
   and ask.
4. **Delete Astro defaults first.** `Welcome.astro` and the default
   `Layout.astro` go before any new code lands. (Done in Step 1.)
5. **Tokens before markup.** Global CSS (variables, reset, font
   declarations, theme switch) ships first. Verify on a dummy page
   that both themes flip cleanly. (Done in Step 2.)
6. **Mobile-first.** Base styles for narrow viewport; layer desktop
   via `min-width` media queries.
7. **Deploy on green only.** No push to `main` without a local
   `astro build` clean pass.

## Build order

1. ✅ Clear defaults.
2. ✅ Global CSS: core tokens, reset, theme resolver, initial
   @font-face (Cormorant 300, DM Mono 400).
3. Global CSS expansion + Layout shell. Add the 10 semantic tokens
   and the two missing font variants (Cormorant 300 italic, DM Mono
   300). Layout.astro grows the `.sumi` container, a `<header>` with
   site-name + horizontal nav + theme toggle, and a `<footer>` with
   copyright + legal links + socials. `index.astro` stays empty.
4. `/` — hero (tag, H1 haiku, bio line, italic pitch column on the
   right) plus three expertise cards: Operations & Engineering,
   Digital & Web, AI & Automation. Content from the brand spec in
   Project Knowledge.
5. `/about` — single-column bio (Cormorant 300 italic for the lead
   lines, DM Mono 300 for body prose) plus a skills section with
   category labels and tag chips. No categorical colors.
6. `/projects` — list shell. Entry schema solid; real entries in
   Phase 2 (after Jun 15, 2026).
7. `/blog` — index shell. Same treatment as `/projects`.
8. `/contact` — minimal viable: mailto link + socials. Form optional.
8.1. `/impressum` — static page with legal notice. Linked from footer.
8.2. `/privacy` — static page with data protection notice. Linked
     from footer.
9. Final pass: `astro build`, verify no `googleapis`/`gstatic` in
   `dist/`, Lighthouse check, commit, push.

## Permission posture

Claude Code runs with `acceptEdits` and Sonnet 4.6 at medium effort.
File edits proceed without per-edit confirmation. Shell commands
still prompt. Hard halts:

- Any `npm install` of a UI framework or CSS library — stop, ask.
- Any file touched outside `D:\repos\guvengursel-web\` — stop, ask.
- Any `git push` — stop, confirm with the Captain first.

## Out of scope tonight

- Writing real blog posts (site ships empty on `/blog`).
- Real project entries on `/projects` (Phase 2).
- Analytics, SEO meta beyond basic OG tags.
- i18n, CMS integration, search.
- Cookie consent banner (not needed: no analytics, no third-party
  scripts, theme localStorage is strictly necessary).
- Photography page (Phase 2).

Ship the shell. Content is a later problem.