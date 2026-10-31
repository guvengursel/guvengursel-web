# G7 Production Candidate Verification Report

- Generated: 2026-08-09T23:28:10+02:00
- Repository: `/home/guven/projects/portfolio/guvengursel-dev`
- Branch: `phase1/foundation-replay`
- Verified source HEAD: `9187cbe1531cf2a33fd45af8f63b8e9f8a09be5c`
- Verified source tree: `3e760bf6e45ea32c9ab4e4c0dbf864fa7dd02a14`

## Verdict

**PASS — 10/10 acceptance criteria pass.**

The static candidate, local route set, build pipeline, dependency audit, deterministic output, external links, and brand assets pass. The River Runs Again endorsement remains visible while correctly disclosing that RRA is local-only and has no public address, matching Kaptan's approved deployment boundary.

No push, public-repository promotion, deployment, or package installation was performed.

## Candidate Metrics

- Astro check: 33 files; 0 errors, 0 warnings, 0 hints.
- Astro build: 11 pages; 0 build warnings.
- Full verification: `npm run verify` passed every gate, including 4/4 RRA routing tests.
- npm audit: 0 vulnerabilities.
- Canonical `dist/` SHA-256: `c82a3fc6c0239f7c64cce4c0ea4f01aa341b07fb179a38bc4bd31e5ac6b13bd8`.
- Determinism: two consecutive clean Astro builds produced the same canonical `dist/` SHA-256.
- Hash method: canonical tar stream with sorted names, epoch mtimes, numeric owner/group 0, then SHA-256.
- Route count: 11.
- Build output includes `robots.txt`, `sitemap-index.xml`, `og-image.png`, `favicon.svg`, and `apple-touch-icon.png`.

The report commit follows the verified source commit and changes documentation only; it does not alter the measured `dist/` output.

## Routes

1. `/` → `dist/index.html`
2. `/about` → `dist/about/index.html`
3. `/agenthub` → `dist/agenthub/index.html`
4. `/vibe-lab` → `dist/vibe-lab/index.html`
5. `/now` → `dist/now/index.html`
6. `/uses` → `dist/uses/index.html`
7. `/colophon` → `dist/colophon/index.html`
8. `/contact` → `dist/contact/index.html`
9. `/impressum` → `dist/impressum/index.html`
10. `/privacy` → `dist/privacy/index.html`
11. `/404` → `dist/404.html`

All route files are present, have non-empty main content, and passed local link/fragment validation. Astro preview returned HTTP 200 for all explicit routes; an unknown route returned HTTP 404.

## Acceptance Matrix

1. **PASS — Astro check.** 0 errors, 0 warnings, 0 hints.
2. **PASS — Astro build.** 11/11 pages, 0 warnings.
3. **PASS — Full verification.** Production source contract, 4/4 RRA tests, Astro check, deterministic tracked assets, build, built-site contract, and audit passed.
4. **PASS — npm audit.** 0 vulnerabilities.
5. **PASS — Deterministic output.** Both repeated-build hashes were `c82a3fc6c0239f7c64cce4c0ea4f01aa341b07fb179a38bc4bd31e5ac6b13bd8`.
6. **PASS — Route presence and content.** All 11 expected routes exist with titles and non-empty main content.
7. **PASS — RRA endorsement.** The homepage contains the River Runs Again endorsement, For Organizations, The Lab, preparation-status language, and explicit local-only/no-public-address disclosure.
8. **PASS — No dead links or placeholder content.** No rendered placeholder markers, unresolved local links/fragments, or unowned RRA domain links were found. All five rendered external web links returned HTTP 200.
9. **PASS — Brand assets.** Asset generation is byte-deterministic and tracked files remain unchanged.
10. **PASS — Candidate report.** This report records the commit, tree, distribution hash, routes, warnings, audit result, static readiness checks, accepted local-only boundary, and release gate.

## Link Evidence

External HTTP probes:

- `https://astro.build` — HTTP 200.
- `https://github.com/guvengursel` — HTTP 200.
- `https://nownownow.com` — HTTP 200.
- `https://www.cloudflare.com/privacypolicy/` — HTTP 200.
- `https://x.com/gurselguven` — HTTP 200.

Rendered-route checks found no `lorem ipsum`, TODO, TBD, FIXME, "coming soon", placeholder, pending asciinema URL, unresolved fragment target, or unowned RRA public address. The Vibe Lab `#dev-tarot` target is explicit and protected by the built-site regression check.

## Brand Asset Evidence

- `public/og-image.png`: 1200×630, SHA-256 `bbf965f84f6012d3051925659d0cd25c69c908d2c75478938787549dba93829e`.
- `public/apple-touch-icon.png`: 180×180, SHA-256 `ac6648fc9d8012b409a56ae9b40c1a6e074e14352d79a32c3ca121303b810c48`.
- `public/favicon.svg`: SHA-256 `fe160d861489c12fdf91f557c71f416b4d9d98bdc4199aca9e9de1f261310f0a`.

Two consecutive `npm run build:assets` executions produced identical PNG hashes, and `git diff --exit-code` confirmed that generated tracked PNGs did not change.

## Lighthouse-Ready Static Checklist

Static readiness passed for all 11 pages:

- Non-empty page title.
- Valid document language.
- Viewport metadata.
- Meta description.
- One canonical URL under `https://guvengursel.com/`.
- Exactly one primary `h1`.
- No image missing an `alt` attribute.
- No insecure HTTP resource URL.
- No analytics or tracking resource.
- `robots.txt` and sitemap output present.
- Social and icon assets present with expected dimensions.
- Preview route responses verified locally.

This is a Lighthouse-readiness checklist, not a measured Lighthouse score. No new Lighthouse package was installed, per the task stop conditions.

## Changes Made During G7

- Added generated-site validation for same-page fragment targets across all 11 routes.
- Added the missing `id="dev-tarot"` target to the Vibe Lab article.
- Added generated-site validation requiring exactly one `h1` per route.
- Corrected the About page's styled lead from a paragraph to its semantic primary heading without changing its class or visual styling.
- Removed the unowned public RRA URL while preserving the endorsement, both RRA paths, preparation status, and local-only disclosure.
- Expanded the RRA routing contract from 3 to 4 tests to enforce the accepted local-only/no-public-address boundary.

Focused failure evidence was observed before both fixes: the fragment mutation failed on unresolved `#dev-tarot`, and the heading test failed because `about/index.html` had zero `h1` elements. Both checks passed after their minimal fixes, followed by the full verification suite.

## Release Gate

The candidate is ready for Kaptan's separate release approval. This verification report does not authorize a push, promotion to `guvengursel-web`, Cloudflare deployment, domain purchase, or any other external action.
