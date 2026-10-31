// Privacy packs per locale (ADR 0010). Section ids stay constant across
// locales so anchors deep-link identically. The local-storage section
// must name exactly the keys the site uses — literally, in every locale:
// the privacy contract asserts this against the built pages.
// TR and DE are owner-review drafts per ADR 0010 clause 3.

export interface PrivacySection {
  id: string;
  heading: string;
  html: string;
}

export interface PrivacyPack {
  description: string;
  kicker: string;
  heading: string;
  lede: string;
  tocLabel: string;
  sections: PrivacySection[];
}

export const privacy: PrivacyPack = {
  description: 'Data protection notice — what this site collects and what it doesn\u2019t.',
  kicker: 'document',
  heading: 'Privacy',
  lede: 'Data protection notice under Article 13 GDPR. Last updated: 30 July 2026.',
  tocLabel: 'Sections',
  sections: [
    {
      id: 'controller',
      heading: 'Data controller',
      html: `Güven Gürsel<br />
          <a href="mailto:contact@guvengursel.com">contact@guvengursel.com</a>`,
    },
    {
      id: 'collects',
      heading: 'What this site collects',
      html: `Nothing beyond what is strictly necessary to serve the
          page. No analytics, no tracking pixels, no advertising
          networks, no third-party scripts that observe your
          behaviour.`,
    },
    {
      id: 'server-logs',
      heading: 'Server logs',
      html: `This website is hosted on Cloudflare Pages. Cloudflare,
          as data processor, automatically records standard server
          access data (timestamp, IP address, user agent, requested
          URL, HTTP status) for operational, security, and
          abuse-prevention purposes. Cloudflare's retention and
          processing policies apply:
          <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener">cloudflare.com/privacypolicy</a>.`,
    },
    {
      id: 'local-storage',
      heading: 'Local storage',
      html: `The homepage sampling console stores its state — the keys
          <code>temp</code>, <code>topp</code>, and <code>auto</code> —
          when you adjust it, so the page returns to the settings you
          left. A dismissed language hint is remembered as
          <code>lang-notice-dismissed</code>. These values stay on your
          device and are never transmitted to a server. You can delete
          them at any time via your browser settings. They are strictly
          functional preferences and do not require consent.`,
    },
    {
      id: 'fonts',
      heading: 'Self-hosted fonts',
      html: `All fonts are delivered from this same domain. No
          requests are made to Google Fonts, Google CDN, or any
          third party for font delivery.`,
    },
    {
      id: 'cookies',
      heading: 'Cookies',
      html: `This website sets no cookies.`,
    },
    {
      id: 'email',
      heading: 'Contact by email',
      html: `When you email the address above, your message and
          sender address are processed solely to respond to
          your enquiry. Messages are retained only as long as necessary
          to handle the matter.`,
    },
    {
      id: 'rights',
      heading: 'Your rights under GDPR',
      html: `You have the right to access (Art 15), rectification
          (Art 16), erasure (Art 17), data portability (Art 20),
          and objection (Art 21). To exercise these rights toward
          this site, contact the data controller above. You may
          also lodge a complaint with your local data protection
          supervisory authority.`,
    },
  ],
};

/** Turkish privacy pack (/tr/privacy) — owner-review draft. */
export const privacyTr: PrivacyPack = {
  description: 'Veri koruma bildirimi — bu sitenin topladığı ve toplamadığı.',
  kicker: 'belge',
  heading: 'Gizlilik',
  lede: 'GDPR Madde 13 kapsamında veri koruma bildirimi. Son güncelleme: 30 Temmuz 2026.',
  tocLabel: 'Bölümler',
  sections: [
    {
      id: 'controller',
      heading: 'Veri sorumlusu',
      html: `Güven Gürsel<br />
          <a href="mailto:contact@guvengursel.com">contact@guvengursel.com</a>`,
    },
    {
      id: 'collects',
      heading: 'Bu sitenin topladığı veriler',
      html: `Sayfayı sunmak için kesinlikle gerekli olanın ötesinde
          hiçbir şey. Analitik yok, takip pikseli yok, reklam ağı yok,
          davranışınızı gözleyen üçüncü taraf betik yok.`,
    },
    {
      id: 'server-logs',
      heading: 'Sunucu kayıtları',
      html: `Bu web sitesi Cloudflare Pages üzerinde barındırılmaktadır.
          Cloudflare, veri işleyen olarak, operasyonel, güvenlik ve
          kötüye kullanımı önleme amaçlarıyla standart sunucu erişim
          verilerini (zaman damgası, IP adresi, kullanıcı aracısı,
          istenen URL, HTTP durumu) otomatik olarak kaydeder.
          Cloudflare'in saklama ve işleme politikaları geçerlidir:
          <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener">cloudflare.com/privacypolicy</a>.`,
    },
    {
      id: 'local-storage',
      heading: 'Yerel depolama',
      html: `Ana sayfadaki örnekleme konsolu, ayarladığınızda durumunu
          saklar — <code>temp</code>, <code>topp</code> ve
          <code>auto</code> anahtarları — böylece sayfa bıraktığınız
          ayarlara geri döner. Kapatılan dil ipucu
          <code>lang-notice-dismissed</code> olarak hatırlanır. Bu
          değerler cihazınızda kalır ve hiçbir zaman bir sunucuya
          iletilmez. Tarayıcı ayarlarınızdan istediğiniz zaman
          silebilirsiniz. Bunlar kesinlikle işlevsel tercihlerdir ve
          onam gerektirmez.`,
    },
    {
      id: 'fonts',
      heading: 'Kendi alanımızdan sunulan fontlar',
      html: `Tüm fontlar bu aynı alan adından sunulur. Font teslimi
          için Google Fonts'a, Google CDN'e veya herhangi bir üçüncü
          tarafa istek yapılmaz.`,
    },
    {
      id: 'cookies',
      heading: 'Çerezler',
      html: `Bu web sitesi çerez kullanmaz.`,
    },
    {
      id: 'email',
      heading: 'E-posta ile iletişim',
      html: `Yukarıdaki adrese e-posta gönderdiğinizde, iletiniz ve
          gönderen adresiniz yalnızca talebinizi yanıtlamak amacıyla
          işlenir. Mesajlar, konuyu çözmek için gerekli olduğu süre
          boyunca saklanır.`,
    },
    {
      id: 'rights',
      heading: 'GDPR kapsamındaki haklarınız',
      html: `Erişim (m. 15), düzeltme (m. 16), silme (m. 17), veri
          taşınabilirliği (m. 20) ve itiraz (m. 21) haklarına
          sahipsiniz. Bu haklarınızı bu siteye karşı kullanmak için
          yukarıdaki veri sorumlusuna başvurun. Ayrıca yerel veri
          koruma denetim otoritesine şikayette bulunabilirsiniz.`,
    },
  ],
};

/** German privacy pack (/de/privacy) — owner-review draft. */
export const privacyDe: PrivacyPack = {
  description: 'Datenschutz-Hinweis — was diese Website erhebt und was nicht.',
  kicker: 'Dokument',
  heading: 'Datenschutz',
  lede: 'Datenschutzhinweis nach Artikel 13 DSGVO. Letzte Aktualisierung: 30. Juli 2026.',
  tocLabel: 'Abschnitte',
  sections: [
    {
      id: 'controller',
      heading: 'Verantwortlicher',
      html: `Güven Gürsel<br />
          <a href="mailto:contact@guvengursel.com">contact@guvengursel.com</a>`,
    },
    {
      id: 'collects',
      heading: 'Was diese Website erhebt',
      html: `Nichts über das hinaus, was zur Auslieferung der Seite
          zwingend erforderlich ist. Keine Analyse, keine
          Tracking-Pixel, keine Werbenetzwerke, keine Skripte Dritter,
          die Ihr Verhalten beobachten.`,
    },
    {
      id: 'server-logs',
      heading: 'Serverprotokolle',
      html: `Diese Website wird auf Cloudflare Pages gehostet. Cloudflare
          zeichnet als Auftragsverarbeiter automatisch
          Standard-Zugriffsdaten auf (Zeitstempel, IP-Adresse,
          User-Agent, angefragte URL, HTTP-Status) — zu Betriebs-,
          Sicherheits- und Missbrauchsprävention. Cloudflares Speicher-
          und Verarbeitungsrichtlinien gelten:
          <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener">cloudflare.com/privacypolicy</a>.`,
    },
    {
      id: 'local-storage',
      heading: 'Lokaler Speicher',
      html: `Die Sampling-Konsole der Startseite speichert ihren Zustand
          beim Verstellen — die Schlüssel <code>temp</code>,
          <code>topp</code> und <code>auto</code> — sodass die Seite zu
          Ihren Einstellungen zurückkehrt. Ein ausgeblendeter
          Sprachhinweis wird als <code>lang-notice-dismissed</code>
          gemerkt. Diese Werte bleiben auf Ihrem Gerät und werden
          niemals an einen Server übertragen. Sie können sie jederzeit
          über Ihre Browsereinstellungen löschen. Es sind rein
          funktionale Einstellungen und bedürfen keiner Einwilligung.`,
    },
    {
      id: 'fonts',
      heading: 'Selbst gehostete Schriften',
      html: `Alle Schriften werden von derselben Domain ausgeliefert.
          Für die Schriftauslieferung werden keine Anfragen an Google
          Fonts, Google CDN oder Dritte gestellt.`,
    },
    {
      id: 'cookies',
      heading: 'Cookies',
      html: `Diese Website setzt keine Cookies.`,
    },
    {
      id: 'email',
      heading: 'Kontakt per E-Mail',
      html: `Wenn Sie an die oben genannte Adresse schreiben, werden
          Ihre Nachricht und Ihre Absenderadresse ausschließlich zur
          Beantwortung Ihrer Anfrage verarbeitet. Nachrichten werden
          nur so lange aufbewahrt, wie es zur Bearbeitung der Angelegenheit
          erforderlich ist.`,
    },
    {
      id: 'rights',
      heading: 'Ihre Rechte nach der DSGVO',
      html: `Sie haben das Recht auf Auskunft (Art. 15), Berichtigung
          (Art. 16), Löschung (Art. 17), Datenübertragbarkeit (Art. 20)
          und Widerspruch (Art. 21). Um diese Rechte gegenüber dieser
          Website auszuüben, wenden Sie sich an den oben genannten
          Verantwortlichen. Sie können sich außerdem bei Ihrer örtlichen
          Datenschutz-Aufsichtsbehörde beschweren.`,
    },
  ],
};
