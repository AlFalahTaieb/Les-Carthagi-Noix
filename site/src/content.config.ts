import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const actualites = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/actualites' }),
  schema: z.object({
    titre: z.string(),
    date: z.coerce.date(),
    resume: z.string(),
    image: z.string().optional(),
  }),
});

const evenements = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/evenements' }),
  schema: z.object({
    titre: z.string(),
    // Format : 2026-11-13T19:00:00+01:00 (heure de Grenoble)
    date: z.coerce.date(),
    lieu: z.string().optional(),
    lien: z.string().optional(),
    lienTexte: z.string().optional(),
  }),
});

export const collections = { actualites, evenements };
