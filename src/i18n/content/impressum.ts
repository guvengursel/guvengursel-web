// Impressum packs per locale (ADR 0010). Section ids stay constant
// across locales so anchors deep-link identically; headings and prose
// localize. TR and DE are owner-review drafts per ADR 0010 clause 3.

export interface ImpressumSection {
  id: string;
  heading: string;
  html: string;
}

export interface ImpressumPack {
  description: string;
  kicker: string;
  heading: string;
  lede: string;
  tocLabel: string;
  sections: ImpressumSection[];
}

export const impressum: ImpressumPack = {
  description: 'Legal notice and disclosure for this professional website.',
  kicker: 'document',
  heading: 'Impressum',
  lede: 'Legal notice and disclosure.',
  tocLabel: 'Sections',
  sections: [
    {
      id: 'operator',
      heading: 'Website operator',
      html: `Güven Gürsel<br />
          <a href="mailto:contact@guvengursel.com">contact@guvengursel.com</a>`,
    },
    {
      id: 'subject',
      heading: 'Subject of the website',
      html: `This website presents professional work, writing, and
          experiments. Advisory collaboration may be discussed on
          request. No payment is processed through this site. Sending
          an email does not by itself create a contract or engagement.`,
    },
    {
      id: 'content-liability',
      heading: 'Liability for content',
      html: `The content of this website is compiled with due care.
          No guarantee is given for accuracy, completeness, or
          timeliness.`,
    },
    {
      id: 'link-liability',
      heading: 'Liability for links',
      html: `This website may contain links to external websites.
          Their content is not under the operator's control, and
          no liability is accepted for it.`,
    },
    {
      id: 'copyright',
      heading: 'Copyright',
      html: `All content on this website is protected by international
          copyright law unless otherwise stated.`,
    },
  ],
};

/** Turkish impressum pack (/tr/impressum) — owner-review draft. */
export const impressumTr: ImpressumPack = {
  description: 'Bu profesyonel web sitesi için yasal bildirim ve açıklama.',
  kicker: 'belge',
  heading: 'Impressum',
  lede: 'Yasal bildirim ve açıklama.',
  tocLabel: 'Bölümler',
  sections: [
    {
      id: 'operator',
      heading: 'Site işletmecisi',
      html: `Güven Gürsel<br />
          <a href="mailto:contact@guvengursel.com">contact@guvengursel.com</a>`,
    },
    {
      id: 'subject',
      heading: 'Sitenin konusu',
      html: `Bu web sitesi profesyonel işleri, yazıları ve deneyleri sunar.
          Danışmanlık iş birliği talep üzerine görüşülebilir. Bu site
          üzerinden ödeme işlenmez. E-posta göndermek tek başına bir
          sözleşme veya görevlendirme oluşturmaz.`,
    },
    {
      id: 'content-liability',
      heading: 'İçerik sorumluluğu',
      html: `Bu web sitesinin içeriği özenle derlenmiştir. Doğruluk,
          eksiksizlik veya güncellik konusunda garanti verilmemektedir.`,
    },
    {
      id: 'link-liability',
      heading: 'Bağlantı sorumluluğu',
      html: `Bu web sitesi dış web sitelerine bağlantılar içerebilir.
          İçerikleri işletmecinin kontrolünde değildir ve bunlar için
          hiçbir sorumluluk kabul edilmez.`,
    },
    {
      id: 'copyright',
      heading: 'Telif hakkı',
      html: `Aksi belirtilmedikçe bu web sitesindeki tüm içerik
          uluslararası telif hakkı hukuku kapsamında korunmaktadır.`,
    },
  ],
};

/** German impressum pack (/de/impressum) — owner-review draft. */
export const impressumDe: ImpressumPack = {
  description: 'Rechtlicher Hinweis und Impressum für diese professionelle Website.',
  kicker: 'Dokument',
  heading: 'Impressum',
  lede: 'Rechtlicher Hinweis und Impressum.',
  tocLabel: 'Abschnitte',
  sections: [
    {
      id: 'operator',
      heading: 'Websitebetreiber',
      html: `Güven Gürsel<br />
          <a href="mailto:contact@guvengursel.com">contact@guvengursel.com</a>`,
    },
    {
      id: 'subject',
      heading: 'Gegenstand der Website',
      html: `Diese Website stellt berufliche Arbeiten, Texte und Experimente
          vor. Beratungszusammenarbeit kann auf Anfrage besprochen werden.
          Es werden keine Zahlungen über diese Website verarbeitet. Das
          Senden einer E-Mail begründet für sich allein keinen Vertrag oder
          Auftrag.`,
    },
    {
      id: 'content-liability',
      heading: 'Haftung für Inhalte',
      html: `Die Inhalte dieser Website werden mit gebotener Sorgfalt
          zusammengestellt. Für Richtigkeit, Vollständigkeit und
          Aktualität wird keine Gewähr übernommen.`,
    },
    {
      id: 'link-liability',
      heading: 'Haftung für Links',
      html: `Diese Website kann Links zu externen Websites enthalten. Auf
          deren Inhalte hat der Betreiber keinen Einfluss; hierfür wird
          keine Haftung übernommen.`,
    },
    {
      id: 'copyright',
      heading: 'Urheberrecht',
      html: `Alle Inhalte dieser Website sind, soweit nicht anders
          angegeben, durch internationales Urheberrecht geschützt.`,
    },
  ],
};
