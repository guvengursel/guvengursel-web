// QA: every internal link in the built site must resolve to a file,
// and every sitemap URL must exist in dist. Run after `astro build`.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist', import.meta.url).pathname;

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const pages = walk(dist);
const problems = [];

for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/gu)].map((m) => m[1]));
  for (const [, href] of html.matchAll(/href="([^"]+)"/gu)) {
    if (/^(https?:|mailto:|#)/u.test(href)) continue;
    const [path, frag] = href.split('#');
    if (path === '') {
      if (frag && !ids.has(frag)) problems.push(`${file}: dead fragment #${frag}`);
      continue;
    }
    const target = join(dist, path.replace(/\/$/u, ''));
    const ok = existsSync(target) || existsSync(`${target}.html`) || existsSync(join(target, 'index.html'));
    if (!ok) problems.push(`${file}: broken link ${href}`);
    if (frag && !frag.startsWith('http') && path !== '') {
      const t = existsSync(target) ? join(target, 'index.html') : `${target}.html`;
      const tIds = new Set([...readFileSync(t, 'utf8').matchAll(/\sid="([^"]+)"/gu)].map((m) => m[1]));
      if (!tIds.has(frag)) problems.push(`${file}: fragment #${frag} missing in ${path}`);
    }
  }
}

const sitemap = readFileSync(join(dist, 'sitemap-0.xml'), 'utf8');
for (const [, url] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/gu)) {
  const path = new URL(url).pathname;
  const target = join(dist, path.replace(/\/$/u, ''));
  if (!(existsSync(target) || existsSync(`${target}.html`) || existsSync(join(target, 'index.html')) || existsSync(`${target}/404.html`))) {
    problems.push(`sitemap: ${url} has no built page`);
  }
}

if (problems.length) {
  console.error(`FAIL: ${problems.length} link problem(s)`);
  for (const p of problems) console.error('  ' + p);
  process.exit(1);
}
console.log(`PASS: ${pages.length} pages, all internal links and sitemap URLs resolve`);
