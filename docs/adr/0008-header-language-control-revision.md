# ADR 0008 — Header language control and navigation revision

Date: 2026-08-28
Status: accepted
Amends: ADR 0007 (item 1 — switcher placement form; item on footer scope)

## Context

ADR 0007 shipped the language switch as an inline row of endonym links
(English · Türkçe · Deutsch) separated from the main navigation. In
review the owner found the inline form too heavy for the header and
asked for a simpler, more compact control — a dropdown with locale
abbreviations — with the navigation pushed right and the language
control at the far right. vibe-lab, previously a footer link, moves
into the main navigation.

## Decision

1. **Dropdown control.** The switcher is a native `<details>` dropdown
   (`nav.lang-menu` in `LanguageSwitch.astro`). The closed control
   shows the current locale's uppercase code plus a CSS-drawn caret
   (`EN ▾`); the panel lists EN / TR / DE. No JavaScript is required —
   a tiny inline listener only closes the menu on outside clicks
   (Escape and option navigation close it natively).
2. **Codes with full names in reach.** Visible labels are uppercase
   locale codes per the owner's preference; every option keeps its
   full endonym in `aria-label` (reusing the `switch.*` dictionary
   keys) and its own `lang` attribute, preserving the accessibility
   intent behind the endonym rule it replaces.
3. **Layout.** Mobile (<720px): the dropdown sits at the right end of
   the logo row (top corner, above the fold); the navigation wraps on
   its own row below. From 720px: one row — logo left, navigation
   right (`margin-left: auto`), language menu at the far right behind
   the thin divider. The 720px value is browser-measured against the
   widest nav labels (Turkish/German, four links).
4. **vibe-lab joins the header navigation** (about · blog · vibe-lab ·
   contact). It stays an English-only surface: links from non-EN
   pages carry `lang="en"` exactly as they did from the footer. The
   footer keeps impressum · privacy · GitHub · X.
5. **Unchanged from ADR 0007:** the always-three fallback policy
   (untranslated page → target locale's home, `data-translated`
   contract), equivalent-only hreflang, the trilingual route matrix,
   and `pageLocales()` as the single source of truth.

## Consequences

- The i18n-navigation contract now asserts the dropdown shape: closed
  control code, three menu options, `aria-current` on the current
  locale, fallback targets, and resolving hrefs.
- The current locale appears in the menu as an `aria-current="true"`
  link rather than a non-link span — it shows where you are while
  keeping the markup uniform.
- The caret is CSS-drawn (border triangle), not a font glyph, so
  rendering stays deterministic across font stacks; `[open]` rotates
  it. Print styles hide the whole control.
