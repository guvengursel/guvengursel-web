import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Trilingual writing (ADR 0006): markdown under src/content/blog/<locale>/.
// A locale's /blog index exists only once it has at least one post.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    locale: z.enum(['en', 'tr', 'de']),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
