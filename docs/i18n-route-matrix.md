# i18n Route Matrix — the route × language map

Single reference for how every route behaves across the three locales
(EN root, `/tr/`, `/de/`). The machine-readable source of truth is
`pageLocales()` + `variantPages` in `src/i18n/routes.mjs` (re-exported
by `src/i18n/utils.ts`); this document is its human-readable mirror —
`tests/i18n-navigation.test.mjs` enforces the equality. Policy: ADR 0007.

## Policies in one glance

- **URL strategy** — English at the root, `/tr/` and `/de/` subdirectories
  (Astro `i18n` config, `prefixDefaultLocale: false`).
- **Switcher** — a compact `<details>` dropdown (`EN ▾`, codes only,
  full endonyms in `aria-label`s) at the far right of the header,
  separated from the main navigation by a thin divider. Always shows
  all three locales. Target = same page if translated, else that
  locale's home. Never hides, never 404s. Form per ADR 0008; the
  always-three fallback policy is ADR 0007's.
- **hreflang / og:locale:alternate / soft notice** — equivalent-only:
  emitted solely for locales the current page genuinely exists in,
  plus a self-reference and `x-default` → the English equivalent.
- **Blog** — data-driven: a locale's `/blog` (index and posts) builds
  only once that locale has a published post in `src/content/blog/<locale>/`.
- **EN-only surfaces by design** — 404 only (ADR 0010 localized the
  legal surfaces). 404 is never linked from non-EN pages; the language
  switcher carries it.

## Route × locale matrix (21 built routes)

| Base path | EN (root) | /tr/ | /de/ | Switch from EN → TR/DE | hreflang set |
|---|---|---|---|---|---|
| `/` | ✅ | ✅ | ✅ | `/tr/`, `/de/` (translated) | en, tr, de, x-default |
| `/about` | ✅ | ✅ | ✅ | `/tr/about`, `/de/about` | en, tr, de, x-default |
| `/contact` | ✅ | ✅ | ✅ | `/tr/contact`, `/de/contact` | en, tr, de, x-default |
| `/blog` | ✅ (1 post) | — (no posts) | — (no posts) | `/tr/`, `/de/` (home fallback) | en, x-default |
| `/blog/how-this-homepage-samples` | ✅ | — | — | `/tr/`, `/de/` (home fallback) | en, x-default |
| `/vibe-lab` | ✅ | ✅ | ✅ | `/tr/vibe-lab`, `/de/vibe-lab` (translated) | en, tr, de, x-default |
| `/impressum` | ✅ | ✅ | ✅ | `/tr/impressum`, `/de/impressum` (translated) | en, tr, de, x-default |
| `/privacy` | ✅ | ✅ | ✅ | `/tr/privacy`, `/de/privacy` (translated) | en, tr, de, x-default |
| 404 page | ✅ | — | — | switcher + explicit `/tr/`, `/de/` links | none (`alternates={false}`) |

Mirrors build from the same matrix: `/tr/`, `/tr/about`, `/tr/contact`,
`/tr/vibe-lab`, `/tr/impressum`, `/tr/privacy`, `/de/`, `/de/about`,
`/de/contact`, `/de/vibe-lab`, `/de/impressum`, `/de/privacy`. The `/tr/blog` and `/de/blog` route
wrappers exist in source but produce no pages while those locales have
zero posts — they appear automatically when a post lands in
`src/content/blog/tr/` or `src/content/blog/de/`.

## In-page navigation per locale

- **Header nav** — about / blog (only where posts exist) / vibe-lab /
  contact — all locale-local (vibe-lab joined the variants via ADR
  0009). Logo → locale home. Language dropdown → see above.
- **Footer** — impressum / privacy are locale-local (ADR 0010, owner-
  reviewed legal drafts); GitHub / X external.
- **Soft language notice** — offers a switch only when the current page
  exists in the browser's language; dismissed per-locale via
  `lang-notice-dismissed` (named in the privacy notice); never redirects.

## Recipe: adding a translated page

1. Add the base path to `variantPages` for each locale in
   `src/i18n/routes.mjs`.
2. Create `src/pages/<locale>/<page>.astro` (pass `locale="tr"|"de"` to
   `Layout`); put copy in `src/i18n/content/`.
3. Update the inventories that pin the matrix:
   `tests/language-contract.test.mjs` (directory inventory),
   `scripts/verify-built-site.mjs` (built-route inventory), and this
   document. `tests/i18n-navigation.test.mjs` enforces the rest.

## Known limitation

Blog-post equivalence is locale-wide, not per-slug: once a locale has
any post, its post pages advertise hreflang for every blog locale.
Per-post translation keys can refine this when a translated post
actually exists.
