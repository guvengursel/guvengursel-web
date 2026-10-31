// Types for ./routes.mjs (the Node-importable route × locale truth).
// Keep this declaration in lockstep with the runtime module; it is the
// contract every TypeScript importer sees.

export type Locale = 'en' | 'tr' | 'de';

export const locales: readonly Locale[];
export const defaultLocale: 'en';

/** Base paths that carry a translation in each non-default locale. */
export const variantPages: Readonly<Record<Exclude<Locale, 'en'>, readonly string[]>>;

export function isLocale(maybe: string): maybe is Locale;
export function normalizeBasePath(path: string): string;
export function localizedPath(locale: Locale, path: string): string;
export function basePathFrom(pathname: string): string;
export function pageLocales(basePath: string, blogLocales?: ReadonlySet<string>): Locale[];
