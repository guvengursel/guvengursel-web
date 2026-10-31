# guvengursel-dev — Project Rules

## Stack
- Framework: Astro 7 (SSG mode; package version is canonical in `package.json` and the lockfile)
- Language: TypeScript (with `// @ts-check`)
- CSS: Vanilla CSS with custom properties (NO Tailwind, NO UI kits)
- Fonts: Self-hosted WOFF2 (DM Mono, Archivo, Cormorant Garamond italic)
- Deploy boundary: this repository does not deploy; approved releases are promoted to `guvengursel-web`, whose `main` branch deploys to Cloudflare Pages
- Design: Forward Pass — neural sampler identity, neon duo-tone, dark-only (light theme retired 2026-08-28)

## Project Context
- Personal portfolio + writing site for Güven Gürsel
- 21 built routes: index, about, blog (+1 post), vibe-lab, contact, impressum, privacy, 404, plus /tr/ and /de/ home, about, contact, vibe-lab, impressum, privacy (language navigation architecture per ADRs 0007/0009/0010; now/uses/colophon/agenthub retired 2026-08-28 per ADR 0006)
- Production URL: https://guvengursel.com
- Lighthouse target: >95 all categories

## Portfolio Transition
- `guvengursel.com` remains the founder and trust surface, and the tracked `src/` remains the current Forward Pass source.
- River Runs Again owns `For Organizations` and `The Lab`, visibly endorsed by Güven Gürsel.
- `/home/guven/projects/portfolio/riverrunsagain-dev/` and the Legion project registry own current RRA phase and lifecycle authority.
- R0–R7 is the sole active roadmap; B0–B9 and C0–C6 are preserved non-executable lineage and do not authorize work.
- Untracked planning, presentation, sketch, spike, and research files in this source root are preserved evidence and do not self-promote into authority.
- Source and release authority remains separate from external, paid, product, deployment, and publication gates; this transition grants none of those permissions.

## Commands
- Dev: `npx astro dev`
- Check: `npx astro check`
- Build: `npx astro build`
- Preview: `npx astro preview`

## Design Contract
- Forward Pass: every element must earn its place; when in doubt, remove and test.
- Build hierarchy with type size, spacing, and weight — never categorical colors.
- Use one font weight per role; do not add decorative icons.
- Motion: moderate, purposeful motion is allowed site-wide — state feedback, entrance settles, view transitions, and interactive choreography (e.g. the flow gate). No scroll-tied or parallax effects. `prefers-reduced-motion` is always honored (2026-08-28 amendment, owner-approved).
- Build mobile-first and add wider layouts with `min-width` media queries.
- Keep the `.sumi` container as the shared visual shell for header, content, and footer.

## Canonical Sources
- Design tokens, font declarations, and typography roles: `src/styles/` — `global.css` composes the section stylesheets (tokens, base, chrome, pages, forward-pass, print) in cascade order.
- Shared page shell and `.sumi` structure: `src/layouts/Layout.astro`.
- Active routes: `src/pages/` confirmed by `npm run build`; underscore-prefixed page files are disabled routes.
- Brand asset rationale and rejected alternatives: `docs/adr/0001-deterministic-brand-assets.md`.
- Private-development/public-release promotion boundary: `docs/release-authority.md`.
- Domain glossary (project vocabulary and avoid-lists): `CONTEXT.md` — read it before naming domain concepts; update it when terms resolve.
- Issue tracker contract for agent skills: `docs/agents/issue-tracker.md`; domain-doc consumption rules: `docs/agents/domain.md`.
- Per-locale content (copy, haikus, seeds, labels) lives in `src/i18n/content/`; page routes are thin adapters. Route × locale machine truth: `src/i18n/routes.mjs` (zero-import plain JS — the only `src/` module node:test suites may import); `docs/i18n-route-matrix.md` is its enforced human mirror.
- Do not duplicate literal token values or route inventories here when the source code can answer directly.

## Verified Backlog (2026-10-31)
1. First Forward Pass promotion in progress / pending Cloudflare read-back: until `guvengursel-web` `main` builds successfully and `https://guvengursel.com/tr/` serves Turkish Forward Pass content, treat live soft-404 English shells as the pre-promotion Sumi deploy (canonical CF deploy was still `566e7b4`, 2026-05-15).
2. Post-live creative iteration: see `docs/release/UPDATE-RHYTHM.md` and `docs/release/SHIP-LIST-2026-10-31.md` (DE/TR legal drafts, content depth).

The dated `docs/AUDIT-2026-06-10.md` is historical evidence, not a live backlog. Re-verify any remaining audit item against current source before acting.

## Brand Asset Contract
- `public/og-image.svg` and `public/favicon.svg` are path-only development sources promoted with an approved release to `guvengursel-web`.
- Do not add SVG `<text>` nodes; librsvg font fallback is host-dependent.
- Regenerate with `npm run build:assets` and validate with `npm run verify`.
- Rationale and rejected alternatives: `docs/adr/0001-deterministic-brand-assets.md`.

## Constraints
- Do NOT install new packages without approval.
- Do NOT change the Forward Pass design philosophy.
- Do NOT add Tailwind, CSS frameworks, third-party font CDNs, or tracking scripts.
- Do NOT write outside `/home/guven/projects/portfolio/guvengursel-dev/` without approval.
- Do NOT write or promote changes to `guvengursel-web` without explicit release approval.
- Do NOT run `git push` without explicit approval.
- Run `npm run verify` before any commit proposed for promotion.
- Vanilla CSS only.

## Pi Integration
- Pi is a supported coding worker for this repo. Model, provider, and thinking level are runtime session choices — never pinned here.
- Node-level harness config (providers, extensions, skills) lives in ~/.pi/agent/ and is fleet-managed identically on evo-x2 and Legion.

## Agent skills

### Issue tracker

Issues live as markdown under `.scratch/<feature>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: root `CONTEXT.md` + `docs/adr/`. See `docs/agents/domain.md`.
