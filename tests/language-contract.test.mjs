import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const pagesRoot = fileURLToPath(new URL('../src/pages', import.meta.url));

// ADR 0005 language contract:
// - Root pages are English. The only Turkish on the root is proper nouns and
//   the /tr/ route inventory itself.
// - /tr/ carries the personal pages (index, about, now) and nothing else.
// - Detect mixed-language leakage with a Turkish-specific character/word scan.

const turkishWordPattern = /\b(ve|için|üzerine|çalışma|deneyim|şu an|kısaca|olarak|geliştiril|hazırlan|sunmuyor|aşamasında|danışmanlık|buluştur|yönü|keşfetmek|güvenli|işin|hedef)\b/gi;

/** Pages allowed to contain Turkish copy: the whole /tr/ section. */
const isTrAllowed = (rel) => rel.startsWith('tr/');

function listAstroFiles(dir, prefix = '') {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('_') || entry.name.startsWith('.')) continue;
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...listAstroFiles(join(dir, entry.name), rel));
    else if (entry.name.endsWith('.astro')) out.push(rel);
  }
  return out;
}

test('root pages carry no Turkish copy (English root per ADR 0005)', () => {
  for (const rel of listAstroFiles(pagesRoot)) {
    if (isTrAllowed(rel)) continue;
    const source = readFileSync(join(pagesRoot, rel), 'utf8');
    const matches = source.match(turkishWordPattern) ?? [];
    // The nav/footer dictionaries live in src/i18n and use key files, not pages.
    assert.equal(
      matches.length,
      0,
      `${rel} contains Turkish copy outside /tr/: ${[...new Set(matches)].slice(0, 5).join(', ')}`,
    );
  }
});

test('/tr/ and /de/ contain exactly the translated sections (ADR 0006 + 0007)', () => {
  for (const loc of ['tr', 'de']) {
    const dir = join(pagesRoot, loc);
    assert.ok(existsSync(dir), `/${loc}/ must exist`);
    const entries = readdirSync(dir).filter((n) => !n.startsWith('_'));
    assert.deepEqual(
      [...entries].sort(),
      ['about.astro', 'blog', 'contact.astro', 'impressum.astro', 'index.astro', 'privacy.astro', 'vibe-lab.astro'],
      `/${loc}/ must contain exactly index, about, contact, vibe-lab, impressum, privacy (+ blog wrapper)`,
    );
  }
});

test('/tr/ and /de/ pages declare their locale', () => {
  for (const loc of ['tr', 'de']) {
    for (const rel of listAstroFiles(pagesRoot).filter((r) => r.startsWith(`${loc}/`))) {
      const source = readFileSync(join(pagesRoot, rel), 'utf8');
      assert.match(source, new RegExp(`locale="${loc}"`, 'u'), `${rel} must pass locale="${loc}"`);
    }
  }
});
