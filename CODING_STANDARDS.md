# Coding Standards

Judgement-call conventions for reviewers. Mechanical rules are not here:
`astro check`, the `node:test` contracts, and CI (`npm run verify`) enforce
those — a check that can exist should exist instead of a line below.

## Architecture shape

- Per-locale content (copy, haiku sets, seeds, blog labels) lives in
  `src/i18n/content/*`. Page routes are thin adapters that bind a locale
  pack to a shared component — new copy inside a route file is a finding.
- The route × locale truth is `src/i18n/routes.mjs` alone. Never restate
  the matrix elsewhere; `docs/i18n-route-matrix.md` mirrors it and the
  navigation contract enforces the equality.
- `routes.mjs` stays zero-import plain JS (node:test imports it directly);
  its types live in `routes.d.mts` — change both in one commit.
- Hide the content collection and its shaping inside modules
  (`src/i18n/blog.ts`), never inside route files.

## Tests

- Plain `node --test`; suites may import `.mjs`/`.json` from `src/`, not
  `.ts`. Parsing `.ts` source as text is a last resort, kept only where
  the intent is genuinely source-level (language segregation).
- Anything a visitor sees is asserted against built `dist/` output, not
  against source.

## CSS

- One stylesheet per concern; `global.css` composes them in cascade order
  (tokens → base → chrome → pages → forward-pass → print). New rules join
  their matching section file; never reorder the imports.
- Hierarchy comes from type size, spacing, and weight — never categorical
  colors. Dark-only; `.sumi` is the shared visual shell.
