import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync, existsSync } from 'node:fs';

const indexPage = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const trIndexPage = readFileSync(new URL('../src/pages/tr/index.astro', import.meta.url), 'utf8');
const homeShell = readFileSync(new URL('../src/components/HomePage.astro', import.meta.url), 'utf8');
const enHomeContent = readFileSync(new URL('../src/i18n/content/home.ts', import.meta.url), 'utf8');
const trHomeContent = readFileSync(new URL('../src/i18n/content/home.ts', import.meta.url), 'utf8');

test('home page visibly endorses River Runs Again without linking to an unowned domain', () => {
  // The endorsement markup lives in the shared homepage shell; the pages
  // bind their locale pack through it.
  assert.match(homeShell, /<section class="rra-endorsement"/u);
  assert.match(indexPage, /pack=\{home\}/u);
  assert.match(trIndexPage, /pack=\{homeTr\}/u);
  assert.doesNotMatch(indexPage, /riverrunsagain\.com/iu);
  assert.doesNotMatch(trIndexPage, /riverrunsagain\.com/iu);
  assert.doesNotMatch(enHomeContent, /riverrunsagain\.com/iu);
});

test('root homepage endorsement is English; Turkish copy lives on /tr/', () => {
  // Root content: English endorsement.
  assert.match(enHomeContent, /not offering services yet/u);
  assert.match(enHomeContent, /research and preparation are underway/u);
  // Root markup renders the English block only.
  assert.doesNotMatch(indexPage, /Kurduğum/u);
  assert.doesNotMatch(indexPage, /henüz hizmet sunmuyor/iu);
  // Turkish variant keeps the original Turkish disclosure.
  assert.match(trHomeContent, /Kurduğum/u);
  assert.match(trHomeContent, /henüz hizmet sunmuyor/iu);
  assert.match(trHomeContent, /herkese açık bir web adresi bulunmuyor/iu);
});

test('endorsement presents both RRA paths', () => {
  assert.match(enHomeContent, /For Organizations/u);
  assert.match(enHomeContent, /The Lab/u);
  assert.match(trHomeContent, /For Organizations/u);
  assert.match(trHomeContent, /The Lab/u);
});

test('locale sections carry the translated surfaces (ADR 0006, contact 0007, vibe-lab 0009, legal 0010)', () => {
  for (const loc of ['tr', 'de']) {
    assert.ok(existsSync(new URL(`../src/pages/${loc}/index.astro`, import.meta.url)), `/${loc}/ home exists`);
    assert.ok(existsSync(new URL(`../src/pages/${loc}/about.astro`, import.meta.url)), `/${loc}/ about exists`);
    assert.ok(!existsSync(new URL(`../src/pages/${loc}/now.astro`, import.meta.url)), `/${loc}/ now is retired`);
    assert.ok(!existsSync(new URL(`../src/pages/${loc}/uses.astro`, import.meta.url)), `/${loc}/ uses must not exist`);
    assert.ok(existsSync(new URL(`../src/pages/${loc}/vibe-lab.astro`, import.meta.url)), `/${loc}/ vibe-lab must exist (ADR 0009)`);
    assert.ok(existsSync(new URL(`../src/pages/${loc}/impressum.astro`, import.meta.url)), `/${loc}/ impressum must exist (ADR 0010)`);
    assert.ok(existsSync(new URL(`../src/pages/${loc}/privacy.astro`, import.meta.url)), `/${loc}/ privacy must exist (ADR 0010)`);
  }
});
