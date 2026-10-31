// Blog chrome copy per locale (Log blueprint). Kicker/lede/empty render
// on the index; `back` is the ← label on post pages. English is the
// root voice; TR/DE ship with the ADR 0006 trilingual matrix.

export interface BlogLabels {
  kicker: string;
  title: string;
  lede: string;
  empty: string;
  back: string;
}

import type { Locale } from '../routes.mjs';

export const blogLabels: Record<Locale, BlogLabels> = {
  en: {
    kicker: 'log',
    title: 'Writing',
    lede: 'Notes from building — systems, design, and the work in between.',
    empty: 'Nothing published yet.',
    back: '← writing',
  },
  tr: {
    kicker: 'log',
    title: 'Yazılar',
    lede: 'Kurarken öğrenilenler — sistemler, tasarım ve arasındaki iş.',
    empty: 'Henüz yayınlanmış yazı yok.',
    back: '← yazılar',
  },
  de: {
    kicker: 'log',
    title: 'Texte',
    lede: 'Beim Bauen gelernt — Systeme, Design und die Arbeit dazwischen.',
    empty: 'Noch nichts veröffentlicht.',
    back: '← texte',
  },
};
