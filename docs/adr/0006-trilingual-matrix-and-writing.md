# ADR 0006 — Trilingual matrix and writing-first structure

Date: 2026-08-28
Status: accepted
Supersedes: ADR 0005 (multilingual language matrix)

## Context

The Forward Pass redesign settled the visual identity. The owner then
restructured the site's purpose: writing replaces the status/tools/colophon
surfaces, the about page focuses on story, and the audience is explicitly
trilingual — Turkish, English, German. ADR 0005's "No German" clause no
longer reflects the owner's intent, and its personal-page set (about, now)
is obsolete now that /now is retired.

## Decision

1. **Locales.** English remains the root default. `/tr/` and `/de/` carry
   the personal sections: home, about, and blog. Writing is a personal
   page; it localizes.
2. **Progressive localization.** A locale's blog index and posts render
   only when that locale has published content. Language switches and
   hreflang alternates appear only for locales the current page exists in.
   Missing content falls back to English by absence, never by redirect.
3. **German is allowed.** German copy ships as owner-reviewed drafts;
   quality gates live with the owner, not the build.
4. **Funnel and legal surfaces stay English-only** (contact, vibe-lab,
   impressum, privacy, 404). Links to them from non-EN pages carry
   `lang="en"`.
5. **Retired routes** (2026-08-28): `/now`, `/uses`, `/colophon`, and the
   earlier-retired `/agenthub`. The about page drops its capabilities
   matrix (story + resume contact only).
6. **Dark-only.** The light theme and the theme toggle are removed; the
   terminal identity is the single face. `theme-color` is fixed at
   `#0b0e13`.
7. **Blog mechanics.** One content collection (`src/content/blog/<locale>/*.md`,
   zod schema: title, description, pubDate, locale, tags). Route wrappers
   per locale (`blog/[...slug].astro` and its `/tr/`, `/de/` mirrors) share
   BlogIndex/BlogPost components. The homepage console script lives in one
   shared component (`StageScript.astro`) used by all locale homes.

## Consequences

- Contracts updated in the same commit: verify-production-contract
  (theme/now/uses/colophon assertions), verify-built-site (13-route
  inventory), rra-routing and language-contract tests (per-locale sections,
  `tr/` prefix allowlist).
- The privacy notice names the real storage keys (`temp`, `topp`, `auto`,
  `lang-notice-dismissed`).
- Adding a language means: extend `locales`, add a dictionary, add
  `variantPages` entries, create the section directory — contracts enforce
  the rest.
