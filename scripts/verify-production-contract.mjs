import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';

const resolve = (path) => new URL(`../${path}`, import.meta.url);
const read = (path) => readFileSync(resolve(path), 'utf8');
const exists = (path) => existsSync(resolve(path));

const vibeLabPage = read('src/components/VibeLabPage.astro');
const vibeLabCopy = read('src/i18n/content/vibeLab.ts');
assert.doesNotMatch(vibeLabPage, /href=["']#["']/u, 'Vibe Lab must not ship dead fragment links');
assert.doesNotMatch(vibeLabCopy, /pip install dev-tarot|github\.com\/guvengursel\/dev-tarot|asciinema URL pending/u, 'Private prototypes must not claim public package, source, or demo availability');
assert.doesNotMatch(vibeLabCopy, /status:\s*["']shipped["']/u, 'Dev Tarot is not a publicly shipped artifact');
assert.match(vibeLabCopy, /private prototype/u, 'Vibe Lab EN must disclose private prototype availability');
assert.match(vibeLabCopy, /özel prototip/u, 'Vibe Lab TR must disclose private prototype availability');
assert.match(vibeLabCopy, /privater Prototyp/u, 'Vibe Lab DE must disclose private prototype availability');

const layout = read('src/layouts/Layout.astro');
assert.match(layout, /try\s*\{[\s\S]*localStorage\.getItem/u, 'Language-notice persistence must tolerate restricted storage');
assert.match(layout, /try\s*\{[\s\S]*localStorage\.setItem/u, 'Language-notice dismissal must tolerate restricted storage');

const STYLES_DIR = new URL('../src/styles/', import.meta.url);
const stylesheets = readdirSync(STYLES_DIR)
  .filter((name) => name.endsWith('.css'))
  .map((name) => readFileSync(new URL(name, STYLES_DIR), 'utf8'));
const combinedCss = stylesheets.join('\n');

assert.match(combinedCss, /\.site-nav\s*\{[^}]*width:\s*100%;[^}]*flex-wrap:\s*wrap;/u, 'Mobile navigation must use the available width and wrap safely');
assert.match(combinedCss, /\.site-footer\s*\{[^}]*width:\s*100%;[^}]*min-width:\s*0;/u, 'The footer must remain shrinkable inside the mobile viewport');
assert.match(combinedCss, /\.footer-nav\s*\{[^}]*flex-wrap:\s*wrap;/u, 'Footer navigation must wrap safely on narrow screens');
assert.match(combinedCss, /\.lang-options\s*\{[^}]*list-style:\s*none;/u, 'Language menu options must suppress list markers — Firefox renders li markers inside flex lists and they overflow the panel edge');

assert.doesNotMatch(layout, /theme-toggle/u, 'The dark-only identity ships no theme toggle');
assert.doesNotMatch(combinedCss, /data-theme="light"/u, 'No light-theme tokens may remain');

const impressumCopy = read('src/i18n/content/impressum.ts');
assert.doesNotMatch(impressumCopy, /non-commercial portfolio/iu, 'Impressum must not make a blanket non-commercial claim');
assert.match(impressumCopy, /Advisory collaboration may be discussed\s+on\s+request/u, 'Impressum EN must describe advisory availability provisionally');
assert.match(impressumCopy, /No payment is processed through this site/u, 'Impressum EN must state the payment boundary');
assert.match(impressumCopy, /Sending\s+an email does not by itself create a contract or engagement/u, 'Impressum EN must state the non-contractual email boundary');
assert.match(impressumCopy, /Danışmanlık iş birliği talep\s+üzerine görüşülebilir/u, 'Impressum TR must describe advisory availability provisionally');
assert.match(impressumCopy, /Bu site\s+üzerinden ödeme işlenmez/u, 'Impressum TR must state the payment boundary');
assert.match(impressumCopy, /E-posta göndermek tek başına bir\s+sözleşme veya görevlendirme oluşturmaz/u, 'Impressum TR must state the non-contractual email boundary');
assert.match(impressumCopy, /Beratungszusammenarbeit kann auf Anfrage besprochen werden/u, 'Impressum DE must describe advisory availability provisionally');
assert.match(impressumCopy, /Es werden keine Zahlungen über diese Website verarbeitet/u, 'Impressum DE must state the payment boundary');
assert.match(impressumCopy, /Das\s+Senden einer E-Mail begründet für sich allein keinen Vertrag oder\s+Auftrag/u, 'Impressum DE must state the non-contractual email boundary');

const privacyCopy = read('src/i18n/content/privacy.ts');
assert.match(privacyCopy, /Last updated: 30 July 2026/u, 'Privacy notice EN must carry the current review date');
assert.match(privacyCopy, /Son güncelleme: 30 Temmuz 2026/u, 'Privacy notice TR must carry the current review date');
assert.match(privacyCopy, /Letzte Aktualisierung: 30\. Juli 2026/u, 'Privacy notice DE must carry the current review date');

const astroConfig = read('astro.config.mjs');
assert.match(astroConfig, /compressHTML:\s*true/u, 'Astro 7 migration must preserve Astro 6 HTML whitespace semantics');

assert.ok(exists('docs/plans/2026-07-30-phase-1-foundation.md'), 'Phase 1 implementation plan must be durable');
assert.ok(exists('docs/release-authority.md'), 'Release authority contract must be durable');
assert.ok(exists('scripts/verify-built-site.mjs'), 'Built-site contract must be present');
const releaseAuthority = read('docs/release-authority.md');
assert.match(releaseAuthority, /`guvengursel-dev` is the private canonical development source/u, 'Release contract must identify private development authority');
assert.match(releaseAuthority, /`guvengursel-web` is the public release repository/u, 'Release contract must identify public release authority');
assert.match(releaseAuthority, /does not authorize a release/iu, 'Release contract must remain non-authorizing');
assert.match(releaseAuthority, /legal-completeness review/iu, 'Release contract must preserve the legal completeness gate');

console.log('PASS: production source contract');
