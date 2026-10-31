// UI string dictionaries per locale (ADR 0006 trilingual matrix).
// Keys stay English; values are the visible copy. Only strings that
// appear in the shared shell (nav, footer, switch, notice) live here.
// Page copy lives in the page views and content collections.

export { defaultLocale, locales } from './routes.mjs';

export const ui: Record<string, Record<string, string>> = {
  en: {
    'nav.about': 'about',
    'nav.blog': 'blog',
    'nav.contact': 'contact',
    'nav.vibeLab': 'vibe-lab',
    'nav.languages': 'Language',
    'footer.impressum': 'impressum',
    'footer.privacy': 'privacy',
    'switch.en': 'English',
    'switch.tr': 'Türkçe',
    'switch.de': 'Deutsch',
    'notice.message': 'This page is also available in Turkish.',
    'notice.link': 'Türkçe',
    'notice.dismiss': 'Dismiss',
  },
  tr: {
    'nav.about': 'hakkımda',
    'nav.blog': 'blog',
    'nav.contact': 'iletişim',
    'nav.vibeLab': 'vibe-lab',
    'nav.languages': 'Dil',
    'footer.impressum': 'impressum',
    'footer.privacy': 'gizlilik',
    'switch.en': 'English',
    'switch.tr': 'Türkçe',
    'switch.de': 'Deutsch',
    'notice.message': 'Bu sayfanın Türkçe sürümü mevcut.',
    'notice.link': 'Türkçe',
    'notice.dismiss': 'Kapat',
  },
  de: {
    'nav.about': 'über mich',
    'nav.blog': 'blog',
    'nav.contact': 'kontakt',
    'nav.vibeLab': 'vibe-lab',
    'nav.languages': 'Sprache',
    'footer.impressum': 'impressum',
    'footer.privacy': 'datenschutz',
    'switch.en': 'English',
    'switch.tr': 'Türkçe',
    'switch.de': 'Deutsch',
    'notice.message': 'Diese Seite ist auch auf Deutsch verfügbar.',
    'notice.link': 'Deutsch',
    'notice.dismiss': 'Schließen',
  },
};
