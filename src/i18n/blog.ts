// Blog route engine (ADR 0006 data-driven blog). The deep module behind
// the locale blog routes: it hides the content collection, the locale
// filter, the id-prefix strip, and the index+posts shaping, leaving the
// three [...slug] route files as thin adapters.
//
// blogStaticPaths(locale) feeds getStaticPaths — an empty array keeps
// the locale's /blog unbuilt while it has zero published posts.
// blogChrome(locale) derives the locale's labels and hrefs for the
// page shell; it is pure, so the adapter can call it during render
// without touching the collection a second time.

import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Locale } from './routes.mjs';
import { localizedPath } from './routes.mjs';
import { blogLabels } from './content/blog';

export async function blogStaticPaths(locale: Locale) {
  const posts = (await getCollection('blog')).filter((p) => p.data.locale === locale);
  if (posts.length === 0) return [];
  return [
    { params: { slug: undefined }, props: { posts } },
    ...posts.map((post) => ({
      params: { slug: post.id.replace(new RegExp(`^${locale}/`, 'u'), '') },
      props: { posts, post },
    })),
  ];
}

export function blogChrome(locale: Locale) {
  const labels = blogLabels[locale];
  const hrefBase = localizedPath(locale, '/blog');
  return {
    labels,
    hrefBase,
    backLabel: labels.back,
    pageTitle: (post?: CollectionEntry<'blog'>) =>
      `${post ? post.data.title : labels.title} — Güven Gürsel`,
    description: (post?: CollectionEntry<'blog'>) => (post ? post.data.description : labels.lede),
  };
}
