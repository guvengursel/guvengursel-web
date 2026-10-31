import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';

const resolve = (path) => new URL(`../dist/${path}`, import.meta.url);
const read = (path) => readFileSync(resolve(path), 'utf8');
const digest = (value) => createHash('sha256').update(value).digest('hex');

assert.ok(existsSync(resolve('404.html')), 'Static output must include a top-level 404.html');

const home = read('index.html');
const notFound = read('404.html');

const routePaths = [
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

for (const path of routePaths) {
  const html = read(path);
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/gu)].map((match) => match[1]));
  const fragmentLinks = [...html.matchAll(/href="#([^"]+)"/gu)];
  const primaryHeadings = [...html.matchAll(/<h1(?:\s|>)/gu)];

  assert.equal(primaryHeadings.length, 1, `${path} must contain exactly one h1`);

  for (const [, fragment] of fragmentLinks) {
    assert.ok(ids.has(fragment), `${path} must resolve fragment #${fragment}`);
  }
}

assert.match(notFound, /<link rel="canonical" href="https:\/\/guvengursel\.com\/404\/?">/u, 'Built 404 must use its own canonical URL');
assert.notEqual(digest(notFound), digest(home), 'Built 404 must not be the homepage body');

console.log('PASS: built site contract');
