// Privacy contract: every localStorage key the site touches must be
// named on every built privacy page (Art 13 GDPR trust surface), and
// each page's local-storage section must name only keys the site
// really uses — no silent additions, no phantom promises, in every
// locale (ADR 0010). Runs against built dist/ — place after `astro
// build` in the verify pipeline (CODING_STANDARDS: visitor-visible
// behaviour is asserted on built output).

import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const srcRoot = fileURLToPath(new URL('../src', import.meta.url));
const distRoot = fileURLToPath(new URL('../dist', import.meta.url));

const KEY_ACCESS = /\.((?:get|set|remove)Item)\(\s*(['"])([^'"]+?)\2/gu;
const DYNAMIC_ACCESS = /\.(?:get|set|remove)Item\(\s*(?!['"])/gu;

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(astro|ts|mjs)$/.test(entry.name)) out.push(full);
  }
  return out;
}

const used = new Map();
for (const file of walk(srcRoot)) {
  const source = readFileSync(file, 'utf8');
  for (const m of source.matchAll(KEY_ACCESS)) {
    if (!used.has(m[3])) used.set(m[3], []);
    used.get(m[3]).push(file.slice(srcRoot.length + 1));
  }
}

const PRIVACY_PAGES = [
  'privacy/index.html',
  'tr/privacy/index.html',
  'de/privacy/index.html',
];

function localStorageKeysOf(html) {
  const start = html.indexOf('<h2 id="local-storage"');
  const end = html.indexOf('<h2', start + 1);
  assert.ok(start >= 0 && end > start, 'local-storage section found');
  const section = html.slice(start, end);
  return [...section.matchAll(/<code>([^<]+)<\/code>/gu)].map((m) => m[1]).sort();
}

test('built privacy pages exist for every locale (ADR 0010)', () => {
  for (const rel of PRIVACY_PAGES) {
    assert.ok(
      readFileSync(join(distRoot, rel), 'utf8').length > 0,
      `dist/${rel} must be built`,
    );
  }
});

test('storage keys are string literals (this scanner stays total)', () => {
  for (const file of walk(srcRoot)) {
    const source = readFileSync(file, 'utf8');
    const dynamic = [...source.matchAll(DYNAMIC_ACCESS)];
    assert.equal(
      dynamic.length,
      0,
      `${file}: dynamic storage key — name it literally so the privacy contract can see it`,
    );
  }
});

test('every storage key in src/ is used, not just documented', () => {
  assert.ok(used.size > 0, 'scanner found storage usage (not silently broken)');
});

for (const rel of PRIVACY_PAGES) {
  test(`dist/${rel}: local-storage section names exactly the keys the site uses`, () => {
    const html = readFileSync(join(distRoot, rel), 'utf8');
    const documented = localStorageKeysOf(html);
    assert.deepEqual(
      documented,
      [...used.keys()].sort(),
      `documented keys must equal used keys (used: ${[...used.entries()]
        .map(([k, f]) => `${k} ← ${f.join(', ')}`)
        .join('; ')})`,
    );
  });
}
