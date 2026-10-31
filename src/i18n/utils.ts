// Locale helpers for the ADR 0006/0007 trilingual matrix.
//
// The route × locale truth lives in ./routes.mjs (plain JavaScript so
// the node:test contracts import the real functions, not a text parse);
// this module re-exports it with types and adds the UI-string
// translator. Callers keep importing from here — the surface is
// unchanged.

import type { Locale } from './routes.mjs';
import { defaultLocale, ui } from './ui';

export type { Locale } from './routes.mjs';
export {
  basePathFrom,
  isLocale,
  localizedPath,
  normalizeBasePath,
  pageLocales,
  variantPages,
} from './routes.mjs';

export type Translator = (key: string) => string;

export function useTranslations(locale: Locale): Translator {
  return function t(key: string): string {
    return ui[locale]?.[key] ?? ui[defaultLocale][key] ?? key;
  };
}
