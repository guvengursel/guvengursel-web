# ADR 0005: Multilingual Language Matrix for guvengursel.com and River Runs Again

- Status: Accepted
- Date: 2026-08-15
- Decision owner: Güven Gürsel (Kaptan)
- Supersedes: the language policy in ADR 0002 ("guvengursel.com is Turkish-led editorially")
- Does not supersede: ADR 0004 brand-role allocation, release authority, or external-action gates

## Context

ADR 0002 allocated Turkish-led editorial voice to guvengursel.com. The rebuilt site (phase1/foundation-replay) was implemented English-first across all 11 routes, with a single Turkish RRA endorsement block on the homepage. A full audit (2026-08-15) found no systematic language mix — the site is English with one Turkish block — but the recorded strategy and the implementation contradicted each other.

Kaptan reviewed the matrix options and accepted the asymmetric matrix below.

## Decision

Both sites are English-root. Language variants are path-prefixed (`/de/`, `/tr/`), built statically with Astro i18n (View Component Pattern), with `prefixDefaultLocale: false`.

### guvengursel.com (founder trust surface)

- Root: English (default).
- `/tr/`: personal/authentic pages only — about, now, and future writing. Funnel pages stay English-only.
- No German: commercial traffic is routed to River Runs Again (per ADR 0004).

### River Runs Again (consultancy + creator lab)

- Root: English (default).
- `/de/`: conversion pages only — services, workshops, contact, method. The Lab and legal pages stay English until separately decided.
- No Turkish: Turkish visitors do not buy Upper-Austrian enterprise consultancy; founder authenticity lives on guvengursel.com.

### Shared mechanics (both sites)

- hreflang alternates plus `x-default` to the English root.
- Multilingual sitemap (`@astrojs/sitemap` with i18n).
- Context-preserving language switcher (`getRelativeLocaleUrlList`); switching never drops the visitor to the homepage.
- Soft, dismissible browser-language notice (DE/TR visitors on EN pages), remembered in localStorage. No forced redirects — deep links and indexing must not break.
- Per-locale title/description/Open Graph metadata.
- Locale-aware number/date formatting (`Intl`).
- Localized 404 pages.
- Fallback: untranslated pages fall back to English via rewrite, never 404.

### Translation quality gate

German and Turkish page content is human-approved by Kaptan before build; raw machine translation must not ship on conversion or trust pages. Untranslated routes stay English (fallback) rather than shipping unreviewed copy.

## Consequences

- Positive: zero rework of existing English pages; consistent architecture across both sites; SEO-correct; scalable language coverage.
- Negative: translation scope grows over time; the language lint (per-page language contract) must be maintained in `npm run verify`.
- The homepage Turkish RRA endorsement block is governed by this ADR: it becomes the `/tr/` homepage variant content; the English root gets the English equivalent.

## Activation boundary

This ADR authorizes implementation inside the development repositories and tailnet-only previews. It does not authorize public deployment, domain purchase, or external publication.
