// Bilingual about-page copy (EN root, TR variant) — ADR 0005 personal pages.

export const aboutEn = {
  title: 'About — Güven Gürsel',
  description: 'Two careers, one thread — six years in digital, a decade in hydropower operations. Now bridging both.',
  heading: 'About',
  sections: { background: 'Background', resume: 'Resume' },
  lead: 'Two careers, one thread.',
  body: [
    'First: six years in digital agencies, shipping web products and managing delivery for major brands. Then: a decade in the field — hydropower plant assembly, mechanical commissioning, turbine start-up, and eventually service operations across 30+ countries.',
    'Most people in industrial operations have never built a web product. Most people in tech have never stood inside a turbine housing. I\'ve done both.',
    'Now I\'m connecting the two — building digital tools for the kind of operations I know from the inside.',
  ],
  closer: 'Tools that actually work — for the people managing the work, not just reporting on it.',
  skills: [
    {
      label: 'Operations & Engineering',
      tags: ['Hydropower commissioning', 'O&M management', 'LTSA / SLA', 'Field coordination', 'EHS & ISO 9001', 'Warranty & claims', '30+ countries'],
    },
    {
      label: 'Digital & Creative',
      tags: ['HTML5 / CSS3 / JS', 'Astro', 'Photoshop', 'Illustrator', 'Premiere', 'After Effects', 'Project delivery'],
    },
    {
      label: 'AI & Tools',
      tags: ['Claude API', 'Claude Code', 'Claude Agent SDK', 'Ollama', 'Astro', 'Cloudflare Pages', 'Notion', 'Obsidian'],
    },
    {
      label: 'Languages',
      tags: ['Turkish — native', 'English — C1', 'German — improving'],
    },
  ],
};

export const aboutTr = {
  title: 'Hakkımda — Güven Gürsel',
  description: 'İki kariyer, tek çizgi — altı yıl dijital, on yıl hidroelektrik operasyonları. Şimdi ikisini birleştiren.',
  heading: 'Hakkımda',
  sections: { background: 'Geçmiş', resume: 'Özgeçmiş' },
  lead: 'İki kariyer, tek çizgi.',
  body: [
    'Önce: altı yıllık dijital ajans deneyimi — büyük markalar için web ürünleri geliştirme ve teslimat yönetimi. Sonra: sahada on yıl — 30+ ülkede hidroelektrik santral montajı, mekanik devreye alma, türbin işletmeye alma ve servis operasyonları.',
    'Endüstriyel operasyonlardaki çoğu insan hiç web ürünü geliştirmemiş. Teknoloji tarafındaki çoğu insan hiçbir zaman bir türbin gövdesinin içine girmemiş. İkisini de yaptım.',
    'Şimdi ikisini birbirine bağlıyorum — içini bildiğim operasyonlar için dijital araçlar kuruyorum.',
  ],
  closer: 'Gerçekten çalışan araçlar — işi sadece raporlayanlar için değil, işi yönetenler için.',
  skills: [
    {
      label: 'Operasyon & Mühendislik',
      tags: ['Hidroelektrik devreye alma', 'O&M yönetimi', 'LTSA / SLA', 'Saha koordinasyonu', 'EHS & ISO 9001', 'Garanti & talepler', '30+ ülke'],
    },
    {
      label: 'Dijital & Yaratıcı',
      tags: ['HTML5 / CSS3 / JS', 'Astro', 'Photoshop', 'Illustrator', 'Premiere', 'After Effects', 'Proje teslimatı'],
    },
    {
      label: 'Yapay Zekâ & Araçlar',
      tags: ['Claude API', 'Claude Code', 'Claude Agent SDK', 'Ollama', 'Astro', 'Cloudflare Pages', 'Notion', 'Obsidian'],
    },
    {
      label: 'Diller',
      tags: ['Türkçe — ana dil', 'İngilizce — C1', 'Almanca — gelişiyor'],
    },
  ],
};

/** German about-page copy (/de/) — progressive draft, owner-reviewed (ADR 0006). */
export const aboutDe = {
  title: 'Über mich — Güven Gürsel',
  description: 'Zwei Karrieren, ein roter Faden — sechs Jahre digital, ein Jahrzehnt Kraftwerksbetrieb. Heute verbinde ich beides.',
  heading: 'Über mich',
  sections: { background: 'Hintergrund', resume: 'Kontakt' },
  lead: 'Zwei Karrieren, ein roter Faden.',
  body: [
    'Zuerst: sechs Jahre in Digitalagenturen — Webprodukte, Delivery-Leitung für große Marken. Danach: ein Jahrzehnt im Feld — Montage, Inbetriebnahme und Service von Wasserkraftwerken in über 30 Ländern.',
    'Die meisten Menschen im Industrieanlagenbetrieb haben noch nie ein digitales Produkt gebaut. Die meisten in der Tech-Welt standen noch nie in einem Turbinengehäuse. Ich habe beides getan.',
    'Heute verbinde ich beide Welten — digitale Werkzeuge für die Art von Betrieb, die ich von innen kenne.',
  ],
  closer: 'Werkzeuge, die wirklich funktionieren — für die Menschen, die die Arbeit führen, nicht nur über sie berichten.',
};
