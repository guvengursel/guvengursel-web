// Route × locale truth (ADR 0006/0007 trilingual matrix).
//
// This module is deliberately plain JavaScript with zero imports so the
// node:test contracts can import the real functions instead of parsing
// source text or re-implementing the logic. It is the machine-readable
// source of truth; docs/i18n-route-matrix.md is the human-readable
// mirror, and tests/i18n-navigation.test.mjs enforces the two stay
// equal. Types for importers live in routes.d.mts.
//
// English lives at the root; /tr/ and /de/ carry the translated pages
// (home, about, contact). The blog is data-driven — a locale's /blog
// exists once that locale has a published post. Everything that needs
// to know "does this page exist in locale X" goes through pageLocales.

export const locales = ['en', 'tr', 'de'];
export const defaultLocale = 'en';

/** Pages that carry a translation in each non-default locale
 * (ADR 0006; contact joined via ADR 0007). */
export const variantPages = {
  tr: ['/', '/about', '/contact', '/vibe-lab', '/impressum', '/privacy'],
  de: ['/', '/about', '/contact', '/vibe-lab', '/impressum', '/privacy'],
};

/** True when `maybe` names a locale this site builds. */
export function isLocale(maybe) {
  return locales.includes(maybe);
}

/** Canonical base path: no trailing slash, '/' for the root. Directory
 * builds render Astro.url.pathname with a trailing slash; every matrix
 * lookup normalizes through here first. */
export function normalizeBasePath(path) {
  return path.replace(/\/+$/, '') || '/';
}

/** Localized href for a path in a locale. Root paths for the default
 * locale, /tr- or /de-prefixed paths otherwise. */
export function localizedPath(locale, path) {
  const clean = normalizeBasePath(path);
  if (locale === defaultLocale) return clean;
  return `/${locale}${clean === '/' ? '' : clean}`;
}

/** Base path of a full pathname with any non-default locale prefix
 * stripped, normalized. */
export function basePathFrom(pathname) {
  for (const l of locales) {
    if (l === defaultLocale) continue;
    if (pathname === `/${l}` || pathname.startsWith(`/${l}/`)) {
      return normalizeBasePath(pathname.slice(`/${l}`.length));
    }
  }
  return normalizeBasePath(pathname);
}

/** Locales the given base path genuinely exists in. Single source of
 * truth for hreflang alternates, language-notice offers, and the
 * switcher's translated-vs-home-fallback distinction (ADR 0007).
 * `blogLocales` carries the locales that have at least one post — the
 * blog route is data-driven, so its existence rides on content. */
export function pageLocales(basePath, blogLocales = new Set()) {
  const path = normalizeBasePath(basePath);
  const isBlog = path === '/blog' || path.startsWith('/blog/');
  return locales.filter((l) => {
    if (isBlog) return blogLocales.has(l);
    if (l === defaultLocale) return true;
    return variantPages[l]?.includes(path) ?? false;
  });
}
