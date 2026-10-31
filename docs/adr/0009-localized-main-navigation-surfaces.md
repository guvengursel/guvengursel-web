# ADR 0009 — Main-navigation surfaces localize; vibe-lab joins the variants

Date: 2026-09-27
Status: accepted
Amends: ADR 0006 (clause 4)

## Context

ADR 0006 kept funnel and legal surfaces English-only, linked from
non-EN pages with `lang="en"`. Owner testing (2026-09-27) showed the
UX cost: vibe-lab sits in the main nav of every TR/DE page, and one
click resets the whole chrome to English — perceived as a language
reset, not a deliberate fallback. The built links were correct (the
navigation contracts pass); the decision itself was the problem.

## Decision

1. vibe-lab localizes: it joins `variantPages` for tr and de, gaining
   `/tr/vibe-lab` and `/de/vibe-lab` with the full chrome in-locale.
2. Main-nav surfaces follow the visitor's locale from here on: a page
   linked from the header nav either exists in the visitor's locale or
   is data-gated (blog). No header-nav item may link cross-locale.
3. Footer legal surfaces (impressum, privacy) and 404 remain EN-only
   for now — a phase-2 decision, owner-gated; their links keep
   `lang="en"`.
4. German vibe-lab copy ships as a progressive draft per ADR 0006
   clause 3 (owner-reviewed).

## Consequences

- Contracts updated in the same commit: `routes.mjs` variantPages,
  verify-built-site (17-route inventory), i18n-navigation (EN-only
  target set, route inventory), rra-routing and language-contract
  (per-locale directory inventory), docs/i18n-route-matrix.md mirror.
- Adding a main-nav page now implies localizing it — the header-nav
  rule makes partial translation a footer-only pattern.
