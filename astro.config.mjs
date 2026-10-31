// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Per-URL sitemap weighting: which pages change often, which never.
/** @type {Record<string, any>} */
const SITEMAP_OVERRIDES = {
  '/':          { changefreq: 'weekly',  priority: 1.0 },
  '/about':     { changefreq: 'monthly', priority: 0.9 },
  '/vibe-lab':  { changefreq: 'weekly',  priority: 0.8 },
  '/blog':      { changefreq: 'weekly',  priority: 0.9 },
  '/contact':   { changefreq: 'yearly',  priority: 0.6 },
  '/impressum': { changefreq: 'yearly',  priority: 0.3 },
  '/privacy':   { changefreq: 'yearly',  priority: 0.3 },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://guvengursel.com',
  // Trilingual routing (ADR 0005 intent, completed by ADR 0007):
  // English at the root, /tr/ and /de/ prefixes — mirrors src/pages 1:1.
  i18n: {
    locales: ['en', 'tr', 'de'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  // Preserve Astro 6 inline-element whitespace while upgrading the compiler.
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      serialize(item) {
        const path = new URL(item.url).pathname.replace(/\/$/, '') || '/';
        const override = SITEMAP_OVERRIDES[path];
        return override ? { ...item, ...override } : item;
      },
    }),
  ],
});