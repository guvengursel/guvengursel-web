// Vibe-lab packs per locale (ADR 0009): the lab index localizes fully.
// Entry titles and in-card proper nouns (card names, suit names) stay
// English in every locale — they are the artifact's own vocabulary.
// German ships as progressive draft, owner-reviewed (ADR 0006 clause 3).

export interface VibeLabEntryCopy {
  slug: string;
  navTitle: string;
  year: number;
  status: string;
  frontmatter: string;
  desc: string;
  p1: string;
  quote: string;
  p2: string;
  availabilityH: string;
  availabilityP: string;
  builtH: string;
  builtP: string;
}

export interface VibeLabPack {
  description: string;
  lede: string;
  sidebarLabel: string;
  entries: VibeLabEntryCopy[];
}

export const vibeLab: VibeLabPack = {
  description: 'Small things, shipped quietly. Mostly terminal, side of the desk.',
  lede: 'Small things, shipped quietly. Mostly terminal, side of the desk.',
  sidebarLabel: 'Experiments',
  entries: [
    {
      slug: 'dev-tarot',
      navTitle: 'Dev Tarot',
      year: 2026,
      status: 'prototype',
      frontmatter: 'private prototype',
      desc: 'An offline Android tarot experiment for developers.',
      p1: 'An offline Android prototype that turns software-work archetypes into short tarot readings. It is still under device and human-visible acceptance and is not distributed as a public package.',
      quote: 'The cards never lie. Unlike your commit messages.',
      p2: '22 Major Arcana (THE VIBE CODER, GIT MERGE CONFLICT, CLAUDE.md, PRODUCTION IS DOWN), 56 Minor Arcana across four developer suits (TERMINALS · APIS · BUGS · DEPLOYS), and a Legendary tier on top. Nine spread modes — from Daily Horoscope to AI Career Pivot.',
      availabilityH: 'Availability',
      availabilityP: 'Private prototype. No public package, source repository, or demo is available yet.',
      builtH: 'Built with',
      builtP: 'Claude (Opus 4.7, via Claude Code), reviewed by a human, gated by an audit.',
    },
  ],
};

/** Turkish vibe-lab pack (/tr/vibe-lab). */
export const vibeLabTr: VibeLabPack = {
  description: 'Küçük şeyler, sessizce yayınlanır. Çoğunlukla terminal, masanın bir kenarında.',
  lede: 'Küçük şeyler, sessizce yayınlanır. Çoğunlukla terminal, masanın bir kenarında.',
  sidebarLabel: 'Deneyler',
  entries: [
    {
      slug: 'dev-tarot',
      navTitle: 'Dev Tarot',
      year: 2026,
      status: 'prototip',
      frontmatter: 'özel prototip',
      desc: 'Geliştiriciler için çevrimdışı bir Android tarot deneyi.',
      p1: 'Yazılım işinin arketiplerini kısa tarot okumalarına çeviren çevrimdışı bir Android prototipi. Hâlâ cihaz ve gözle-görür kabul testlerinde; kamuya açık paket olarak dağıtılmıyor.',
      quote: 'Kartlar asla yalan söylemez. Commit mesajların gibi değil.',
      p2: '22 Büyük Arkana (THE VIBE CODER, GIT MERGE CONFLICT, CLAUDE.md, PRODUCTION IS DOWN), dört geliştirici grubunda (TERMINALS · APIS · BUGS · DEPLOYS) 56 Küçük Arkana ve en üstte Efsanevi kademe. Dokuz açılım modu — Günlük Burç’tan Yapay Zekâ Kariyer Dönüşümü’ne.',
      availabilityH: 'Erişilebilirlik',
      availabilityP: 'Özel prototip. Henüz kamuya açık paket, kaynak deposu veya demo yok.',
      builtH: 'Nasıl yapıldı',
      builtP: 'Claude (Opus 4.7, Claude Code üzerinden) ile yapıldı; insan incelemesi ve denetim kapısından geçti.',
    },
  ],
};

/** German vibe-lab pack (/de/vibe-lab) — progressive draft, owner-reviewed. */
export const vibeLabDe: VibeLabPack = {
  description: 'Kleine Dinge, still ausgeliefert. Meist Terminal, am Rand des Schreibtischs.',
  lede: 'Kleine Dinge, still ausgeliefert. Meist Terminal, am Rand des Schreibtischs.',
  sidebarLabel: 'Experimente',
  entries: [
    {
      slug: 'dev-tarot',
      navTitle: 'Dev Tarot',
      year: 2026,
      status: 'Prototyp',
      frontmatter: 'privater Prototyp',
      desc: 'Ein Offline-Android-Tarot-Experiment für Entwickler.',
      p1: 'Ein Offline-Android-Prototyp, der Archetypen der Softwarearbeit in kurze Tarot-Lesungen verwandelt. Befindet sich noch in Geräte- und Sichtprüfung; wird nicht als öffentliches Paket vertrieben.',
      quote: 'Die Karten lügen nie. Anders als deine Commit-Messages.',
      p2: '22 Große Arkana (THE VIBE CODER, GIT MERGE CONFLICT, CLAUDE.md, PRODUCTION IS DOWN), 56 Kleine Arkana in vier Entwickler-Farben (TERMINALS · APIS · BUGS · DEPLOYS) und darüber eine Legendäre Stufe. Neun Legemuster — vom Tageshoroskop bis zum KI-Karrierepivot.',
      availabilityH: 'Verfügbarkeit',
      availabilityP: 'Privater Prototyp. Noch kein öffentliches Paket, Quellrepo oder Demo verfügbar.',
      builtH: 'Gebaut mit',
      builtP: 'Claude (Opus 4.7, via Claude Code), menschlich geprüft, durch ein Audit gegated.',
    },
  ],
};
