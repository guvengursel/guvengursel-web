// i18n navigation contract (ADR 0007) — runs against the built dist/.
// Route × locale truth: src/i18n/routes.mjs is the machine source; this
// contract imports the real functions (no text parsing, no shadow
// copies) and enforces that docs/i18n-route-matrix.md — the human
// mirror — stays equal to it.

import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import {
  defaultLocale as DEFAULT_LOCALE,
  locales as LOCALES,
  localizedPath,
  pageLocales,
} from '../src/i18n/routes.mjs';

const distRoot = fileURLToPath(new URL('../dist', import.meta.url));

// English-only surfaces non-EN pages may link to, always with lang="en".
// No cross-locale internal links remain (ADR 0010): every surface a page
// links to exists in the visitor's locale, and 404 is never linked.
const EN_ONLY_TARGETS = new Set([]);

function listHtmlFiles(dir, prefix = '') {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...listHtmlFiles(join(dir, entry.name), rel));
    else if (entry.name.endsWith('.html')) out.push(rel);
  }
  return out;
}

const pages = listHtmlFiles(distRoot);
assert.ok(pages.length > 0, 'dist/ must contain built pages — run `npm run build` first');

// Blog locales are data-driven: a locale's blog exists once it has a post.
const blogLocales = new Set(
  LOCALES.filter((l) => existsSync(join(distRoot, l === DEFAULT_LOCALE ? 'blog/index.html' : `${l}/blog/index.html`))),
);

// The human mirror must stay equal to the machine truth — extend both
// in the same change; this enforces it instead of trusting it.
const matrixDoc = readFileSync(fileURLToPath(new URL('../docs/i18n-route-matrix.md', import.meta.url)), 'utf8');
const docRows = [...matrixDoc.matchAll(/^\| `([^`]+)` \| (✅|—) \| (✅|—) \| (✅|—) \|/gmu)];
test('docs/i18n-route-matrix.md mirrors the machine truth', () => {
  assert.ok(docRows.length >= 6, 'route matrix table parsed from the doc');
  for (const [, base, en, tr, de] of docRows) {
    const truth = pageLocales(base, blogLocales);
    assert.equal(en === '✅', truth.includes('en'), `${base}: EN column matches the matrix`);
    assert.equal(tr === '✅', truth.includes('tr'), `${base}: TR column matches the matrix`);
    assert.equal(de === '✅', truth.includes('de'), `${base}: DE column matches the matrix`);
  }
});

function pageOf(rel) {
  if (rel === '404.html') return { locale: DEFAULT_LOCALE, base: '/404', is404: true };
  const prefixed = rel.match(/^(tr|de)\/(.+)$/);
  const locale = prefixed ? prefixed[1] : DEFAULT_LOCALE;
  const rest = prefixed ? prefixed[2] : rel;
  const base = `/${rest.replace(/index\.html$/, '').replace(/\/+$/, '')}` || '/';
  return { locale, base: base === '' ? '/' : base, is404: false };
}

function resolvesInDist(href) {
  let pathname = href;
  try {
    pathname = new URL(href, 'https://guvengursel.com').pathname;
  } catch {
    // relative href — treat as-is
  }
  const clean = pathname.replace(/\/+$/, '').replace(/^\//, '');
  const candidates = clean === '' ? ['index.html'] : [`${clean}/index.html`, `${clean}.html`];
  return candidates.some((c) => existsSync(join(distRoot, c)));
}

const switcherLinks = (html) =>
  [...html.matchAll(/<a\b[^>]*class="[^"]*lang-link[^"]*"[^>]*>/gu)].map((m) => m[0]);
const attr = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`, 'u'))?.[1] ?? null;

for (const rel of pages) {
  const html = readFileSync(join(distRoot, rel), 'utf8');
  const { locale, base, is404 } = pageOf(rel);
  const available = new Set(pageLocales(base, blogLocales));

  test(`${rel}: language menu offers every locale with correct fallback`, () => {
    assert.match(html, /<nav class="lang-menu"/u, 'every page carries the language menu');
    assert.match(
      html,
      new RegExp(`<span class="lang-code">${locale.toUpperCase()}</span>`, 'u'),
      'closed control shows the current locale code',
    );

    const links = switcherLinks(html);
    assert.equal(links.length, 3, 'menu lists all three locales');

    for (const link of links) {
      const target = attr(link, 'hreflang');
      assert.ok(LOCALES.includes(target), `unexpected menu locale: ${target}`);
      const translated = available.has(target);
      const expectedHref = translated ? localizedPath(target, base) : localizedPath(target, '/');
      assert.equal(attr(link, 'href'), expectedHref, `${target} link target`);
      assert.equal(attr(link, 'data-translated'), String(translated), `${target} translated flag`);
      assert.equal(attr(link, 'lang'), target, `${target} link carries its own lang`);
      assert.ok(attr(link, 'aria-label'), `${target} link carries its full language name`);
      assert.ok(resolvesInDist(attr(link, 'href')), `${target} link resolves in dist/`);
    }

    const currentLink = links.find((l) => /aria-current="true"/u.test(l));
    assert.ok(currentLink, 'menu marks the current locale');
    assert.equal(attr(currentLink, 'hreflang'), locale, 'marked locale is the page locale');
  });

  test(`${rel}: hreflang set is equivalent-only and complete`, () => {
    const alternates = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"\/?>/gu)];

    if (is404) {
      assert.equal(alternates.length, 0, '404 emits no hreflang');
      return;
    }

    const emitted = alternates.map((m) => m[1]).sort();
    const expected = [...available, 'x-default'].sort();
    assert.deepEqual(emitted, expected, 'hreflang locales match the matrix');

    for (const [, hreflang, href] of alternates) {
      assert.ok(resolvesInDist(href), `hreflang ${hreflang} URL resolves in dist/: ${href}`);
      const targetLocale = hreflang === 'x-default' ? DEFAULT_LOCALE : hreflang;
      const matrixPath = localizedPath(targetLocale, base);
      const canonicalPath = matrixPath === '/' ? '/' : `${matrixPath}/`;
      assert.equal(
        new URL(href, 'https://guvengursel.com').pathname,
        canonicalPath,
        `hreflang ${hreflang} points at the canonical (trailing-slash) equivalent page`,
      );
    }
  });

  if (locale !== DEFAULT_LOCALE) {
    test(`${rel}: internal links stay in locale or are marked lang="en"`, () => {
      const anchors = [...html.matchAll(/<a\b[^>]*>/gu)].map((m) => m[0]);
      for (const tag of anchors) {
        const href = attr(tag, 'href');
        if (!href || !href.startsWith('/')) continue; // external, mailto, fragment
        if (/class="[^"]*lang-link/.test(tag)) continue; // switcher cross-locale links — covered by the switcher test
        if (href === `/${locale}` || href.startsWith(`/${locale}/`)) continue;
        assert.ok(
          EN_ONLY_TARGETS.has(href),
          `${rel}: unexpected cross-locale href ${href}`,
        );
        assert.match(tag, /lang="en"/u, `${rel}: link to ${href} must carry lang="en"`);
      }
    });
  }
}

test('expected trilingual route inventory is built', () => {
  const expected = [
    'index.html',
    'about/index.html',
    'blog/index.html',
    'blog/how-this-homepage-samples/index.html',
    'vibe-lab/index.html',
    'contact/index.html',
    'impressum/index.html',
    'privacy/index.html',
    'tr/index.html',
    'tr/about/index.html',
    'tr/contact/index.html',
    'tr/vibe-lab/index.html',
    'tr/impressum/index.html',
    'tr/privacy/index.html',
    'de/index.html',
    'de/about/index.html',
    'de/contact/index.html',
    'de/vibe-lab/index.html',
    'de/impressum/index.html',
    'de/privacy/index.html',
    '404.html',
  ];
  for (const route of expected) {
    assert.ok(existsSync(join(distRoot, route)), `dist/${route} must exist`);
  }
});
