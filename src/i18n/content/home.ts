// Homepage packs per locale: shell copy, the haiku set, and the network
// seeds travel as one per-locale bundle — the route adapters pass the
// whole pack to HomePage. The Turkish RRA endorsement lives on /tr/
// per ADR 0005 — the root homepage presents the English equivalent.

export interface HomeCopy {
  heroTag: string;
  heroBio: string[];
  stage: {
    temp: string;
    topp: string;
    next: string;
    reseed: string;
    auto: string;
  };
  expertise: { title: string; body: string }[];
  rra: {
    kicker: string;
    title: string;
    intro: string;
    paths: { title: string; body: string }[];
  };
  title?: string;
  description?: string;
}

/** A locale's full homepage data: copy plus the haiku set and seeds. */
export interface HomePack extends HomeCopy {
  haikus: string[][];
  seeds: [number, number, number];
}

export const home: HomePack = {
  heroTag: 'O&M & AI',
  heroBio: ['Operations background. Digital toolset.', 'One goal: make the work flow.'],
  stage: {
    temp: 'Sampling temperature — raise it to let the model wander',
    topp: 'Nucleus width — how much of the network participates',
    next: 'Sample the next haiku',
    reseed: 'Reseed the network topology',
    auto: 'Autopilot — let the sampler tune itself',
  },
  expertise: [
    {
      title: 'Operations & Engineering',
      body: 'A decade turning plans into running plants — hydropower assembly, commissioning, and service in 30+ countries.',
    },
    {
      title: 'Digital & Web',
      body: 'Six years shipping web products and managing delivery before I ever set foot on a construction site.',
    },
    {
      title: 'AI & Automation',
      body: 'Now bridging both — building tools that actually help the people doing the work, not just reporting on it.',
    },
  ],
  rra: {
    kicker: 'River Runs Again · by Güven Gürsel',
    title: 'River Runs Again',
    intro:
      'River Runs Again is being built to bring AI workflow consultancy for organizations and a creative lab under one roof. It is not offering services yet; research and preparation are underway.',
    paths: [
      {
        title: 'For Organizations',
        body: 'The consultancy path — discovering, developing, and safely adopting AI workflows.',
      },
      {
        title: 'The Lab',
        body: 'The creative lab for local AI systems, production experiments, and open learning notes that began in the Vibe Lab.',
      },
    ],
  },
  haikus: [
    ['Clear the path.', 'Let it flow.', 'Nothing more.'],
    ['Find the friction.', 'Remove the friction.', 'Move on.'],
    ['Cut the noise.', 'Keep the signal.', 'Hold the line.'],
    ['Listen first.', 'Move once.', 'Stay still.'],
    ['Read the logs.', 'Read the room.', 'Both matter.'],
    ['Honest defaults.', 'Few exceptions.', 'Clean exits.'],
    ['Show the work.', 'Trust the work.', 'Walk away.'],
    ['Quiet builds.', 'Loud commits.', 'Both honest.'],
    ['Tools serve work.', 'Work serves people.', 'Begin there.'],
    ['Measure twice.', 'Cut once.', 'Sleep well.'],
    ['Print the part.', 'Test the part.', 'Trust the part.'],
    ['Small steps work.', 'Big steps wait.', 'Wait pays.'],
    ['One thing today.', 'Done by dusk.', 'Enough.'],
  ],
  seeds: [7, 31, 97],
};

/** Turkish homepage pack (/tr/). */
export const homeTr: HomePack = {
  title: 'Güven Gürsel — operasyon × dijital × yapay zekâ',
  description: 'Operasyonel geçmiş, dijital araç seti, tek hedef: işin akmasını sağlamak.',
  heroTag: 'O&M & AI',
  heroBio: ['Operasyonel geçmiş. Dijital araç seti.', 'Tek hedef: işin akmasını sağlamak.'],
  stage: {
    temp: 'Örnekleme sıcaklığı — modelin gezinmesine izin vermek için yükseltin',
    topp: 'Çekirdek genişliği — ağın ne kadarı katılıyor',
    next: 'Sıradaki haikuyu örnekle',
    reseed: 'Ağ topolojisini yeniden tohumla',
    auto: 'Otopilot — örnekleyici kendi ayarlarını yapsın',
  },
  expertise: [
    {
      title: 'Operasyon & Mühendislik',
      body: 'Planları çalışan tesislere dönüştüren on yıl — 30+ ülkede hidroelektrik montaj, devreye alma ve servis.',
    },
    {
      title: 'Dijital & Web',
      body: 'Bir şantiyeye adım atmadan önce web ürünleri geliştirip teslimatı yönettiğim altı yıl.',
    },
    {
      title: 'Yapay Zekâ & Otomasyon',
      body: 'Şimdi ikisini birleştiren araçlar kuruyorum — işi yapan insanlara gerçekten yardım eden, sadece raporlayan değil.',
    },
  ],
  rra: {
    kicker: 'River Runs Again · Güven Gürsel tarafından',
    title: 'River Runs Again',
    intro:
      'Kurduğum River Runs Again, organizasyonlar için yapay zekâ iş akışı danışmanlığını yaratıcı laboratuvar çalışmalarıyla aynı çatı altında buluşturmak üzere hazırlanıyor. Henüz hizmet sunmuyor; araştırma ve hazırlık aşamasında. Şimdilik yalnızca yerel geliştirme ortamında; herkese açık bir web adresi bulunmuyor.',
    // Path titles stay English in both locales: they are River Runs Again
    // brand names, not copy (and tests/rra-routing.test.mjs binds them).
    paths: [
      {
        title: 'For Organizations',
        body: 'İş akışlarını keşfetmek, geliştirmek ve güvenli biçimde uygulamak için hazırlanan danışmanlık yönü.',
      },
      {
        title: 'The Lab',
        body: 'Vibe Lab’de başlayan yerel yapay zekâ sistemleri, üretim deneyleri ve açık öğrenme notları için yaratıcı laboratuvar.',
      },
    ],
  },
  haikus: [
    ['Yolu aç.', 'Akışına bırak.', 'Fazlası yok.'],
    ['Sürtünmeyi bul.', 'Sürtünmeyi kaldır.', 'Devam et.'],
    ['Gürültüyü kes.', 'Sinyali koru.', 'Çizgide kal.'],
    ['Önce dinle.', 'Bir kez hareket et.', 'Sabit kal.'],
    ['Kayıtları oku.', 'Ortamı oku.', 'İkisi de önemli.'],
    ['Dürüst varsayılanlar.', 'Az istisna.', 'Temiz çıkışlar.'],
    ['İşi göster.', 'İşe güven.', 'Uzaklaş.'],
    ['Sessiz inşa.', 'Gürültülü commit.', 'İkisi de dürüst.'],
    ['Araç işe hizmet eder.', 'İş insana hizmet eder.', 'Oradan başla.'],
    ['İki kez ölç.', 'Bir kez kes.', 'Rahat uyu.'],
    ['Parçayı bas.', 'Parçayı test et.', 'Parçaya güven.'],
    ['Küçük adımlar çalışır.', 'Büyük adımlar bekler.', 'Beklemek öder.'],
    ['Bugün tek iş.', 'Akşamadan biter.', 'Yeterli.'],
  ],
  seeds: [13, 41, 83],
};

/** German homepage pack (/de/) — progressive draft, owner-reviewed (ADR 0006). */
export const homeDe: HomePack = {
  title: 'Güven Gürsel — Operationen × Digital × KI',
  description: 'Operativer Hintergrund, digitales Werkzeug, ein Ziel: die Arbeit zum Fließen bringen.',
  heroTag: 'O&M & KI',
  heroBio: ['Operativer Hintergrund. Digitales Werkzeug.', 'Ein Ziel: die Arbeit zum Fließen bringen.'],
  stage: {
    temp: 'Sampling-Temperatur — erhöhen, damit das Modell wandern darf',
    topp: 'Kernbreite — wie viel vom Netzwerk mitwirkt',
    next: 'Nächstes Haiku ziehen',
    reseed: 'Netzwerk-Topologie neu würfeln',
    auto: 'Autopilot — der Sampler stellt sich selbst ein',
  },
  expertise: [
    {
      title: 'Operationen & Engineering',
      body: 'Ein Jahrzehnt, in dem aus Plänen laufende Kraftwerke wurden — Montage, Inbetriebnahme und Service in über 30 Ländern.',
    },
    {
      title: 'Digital & Web',
      body: 'Sechs Jahre Webprodukte und Delivery-Leitung, bevor ich je eine Baustelle von innen gesehen habe.',
    },
    {
      title: 'KI & Automatisierung',
      body: 'Heute verbinde ich beides — Werkzeuge, die den Menschen bei der Arbeit wirklich helfen, statt nur über sie zu berichten.',
    },
  ],
  rra: {
    kicker: 'River Runs Again · von Güven Gürsel',
    title: 'River Runs Again',
    intro:
      'River Runs Again entsteht, um KI-Workflow-Beratung für Organisationen und ein kreatives Labor unter einem Dach zu vereinen. Es gibt noch keine Leistungen; Forschung und Vorbereitung laufen.',
    paths: [
      {
        title: 'For Organizations',
        body: 'Der Beratungspfad — KI-Workflows entdecken, entwickeln und sicher einführen.',
      },
      {
        title: 'The Lab',
        body: 'Das kreative Labor für lokale KI-Systeme, Produktionsexperimente und offene Lernnotizen, das im Vibe Lab begann.',
      },
    ],
  },
  // Progressive German launch (ADR 0006): a curated subset of translated
  // haikus ships now; the full set arrives with reviewed translations.
  haikus: [
    ['Den Weg freimachen.', 'Es fließen lassen.', 'Nichts weiter.'],
    ['Hör zuerst zu.', 'Handle einmal.', 'Bleib ruhig.'],
    ['Weniger Rauschen.', 'Mehr Signal.', 'Die Linie halten.'],
    ['Ein Ding heute.', 'Bis zum Abend fertig.', 'Das reicht.'],
    ['Zweimal messen.', 'Einmal schneiden.', 'Gut schlafen.'],
  ],
  seeds: [17, 53, 89],
};
