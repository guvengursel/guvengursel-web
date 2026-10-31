# ADR 0010 — Legal surfaces localize (phase 2 of ADR 0009)

Date: 2026-09-27
Status: accepted
Executes: ADR 0009 clause 3 (phase-2, owner-gated — the gate opened)

## Context

ADR 0009 localized the main-nav surfaces and left impressum/privacy
EN-only as an owner-gated phase 2. The owner opened the gate the same
day: a trilingual trust surface should carry its legal notices in the
visitor's language, and the footer links were the last cross-locale
navigation left.

## Decision

1. Impressum and privacy localize for tr and de: both join
   `variantPages`, gaining locale variants with full chrome.
2. 404 remains the only EN-only surface (not linked from non-EN pages;
   the switcher carries it).
3. Legal copy quality gates stay with the owner: TR and DE drafts ship
   to this repository for review; publication rides the normal release
   promotion, never a bare push.
4. The privacy contract now asserts against the built pages in every
   locale: the local-storage section must name exactly the keys the
   site uses — in English, Turkish, and German alike.

## Consequences

- Contracts updated in the same commit: routes.mjs variantPages,
  verify-built-site (21-route inventory), i18n-navigation (EN-only
  target set empties; route inventory), rra-routing and
  language-contract inventories, privacy-contract (moves post-build,
  scans dist/ per locale), matrix doc mirror, AGENTS.md route count,
  CONTEXT.md variant-page list.
- No footer link goes cross-locale anymore; the internal-links
  contract enforces an empty EN-only allowlist.
