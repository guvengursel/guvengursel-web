# ADR 0007 — Language navigation architecture

Date: 2026-08-28
Status: accepted (item 1 amended, footer scope amended, by ADR 0008)
Amends: ADR 0006 (items 2 and 4 — switcher fallback policy, contact scope)

## Context

The trilingual matrix from ADR 0006 shipped with the language switch
rendered as plain links inside the main navigation, and with
availability computed by an exact string match that ignored the
trailing slash directory builds add to `Astro.url.pathname`. Verified
in the built output: on every non-root page the cross-language links
failed to appear, hreflang alternate sets were incomplete, and the
soft language notice never fired. The switcher also shrank or vanished
on English-only pages, so the header chrome differed page to page.

UX research (NN/g, USWDS, Fastly, Smashing) converges on: the language
switcher is a top-corner control set apart from the main navigation,
labeled with language names in their own language, never flags; it
must not silently redirect by browser language; and a control that
changes size or disappears between pages is a recognized anti-pattern.

## Decision

1. **Placement.** A dedicated `LanguageSwitch.astro` component renders
   at the far right of the header, behind a thin divider from 800px
   up; below that it wraps onto its own row. The main navigation keeps
   only page links (about, blog, contact). The current locale renders
   as an emphasized non-link; alternatives are endonym links
   (`English · Türkçe · Deutsch`) carrying `lang` and `hreflang`.
2. **Always-three fallback.** The switcher offers every locale on
   every page. When the current page has no translation in the target
   locale, the switch lands on that locale's home. hreflang
   alternates, `og:locale:alternate`, and the soft notice remain
   equivalent-only — they never advertise the home fallback.
3. **Contact joins the matrix.** `/tr/contact` and `/de/contact` ship
   (owner-approved 2026-08-28); the main navigation is now fully
   locale-local on every translated page. Fifteen built routes total.
4. **Single source of truth.** `pageLocales()` + `variantPages` in
   `src/i18n/utils.ts` answer "does this page exist in locale X" for
   the switcher, hreflang, and the notice. `basePathFrom()` normalizes
   the trailing slash — the root cause of the broken cross-switching.
5. **Native Astro i18n config.** `astro.config.mjs` declares
   `locales: [en, tr, de]`, `defaultLocale: en`,
   `prefixDefaultLocale: false` — completing the intent ADR 0005
   stated but never configured. File-tree routing is unchanged.
6. **404.** Stays English (single Cloudflare `404.html`) with the
   always-three switcher (home fallbacks) plus explicit language
   links; `alternates={false}` suppresses hreflang for it.

## Rejected alternatives

- **Sitemap-level hreflang alternates** (`@astrojs/sitemap` `i18n`
  option): the integration derives alternates by swapping URL prefixes
  without checking that pages exist — it would advertise
  `/tr/vibe-lab` and `/de/privacy`. In-page hreflang stays the single
  SEO signal.
- **Browser-language auto-redirect**: Google guidance and this site's
  contract both reject it; the dismissible soft notice remains.
- **Hiding unavailable languages** (ADR 0006 "fallback by absence"
  applied to the switcher): with a partial matrix the control would
  vanish or shrink on most pages — exactly the inconsistent chrome
  this ADR removes. Equivalent-only truth survives where it belongs,
  in hreflang.

## Consequences

- Header layout: the single-row `nowrap` header moves from the 640px
  breakpoint to a new 800px breakpoint — three groups (logo,
  navigation, switcher) do not fit one row safely below that.
  The language notice re-binds on `astro:page-load` because the
  ClientRouter keeps the document alive across navigations.
- Contracts updated in the same change: verify-built-site (15-route
  inventory), language-contract (inventories + `locale="de"` parity),
  rra-routing (contact prohibition removed), and a new
  i18n-navigation test that walks the built output.
- The route × language map lives in `docs/i18n-route-matrix.md`;
  extend it and `variantPages` together when a page localizes.
