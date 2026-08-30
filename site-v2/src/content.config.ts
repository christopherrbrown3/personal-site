import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const accent = z.enum(['coral', 'teal', 'yellow', 'blue']).default('teal');

const writing = defineCollection({
  loader: glob({ base: './src/content/writing', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        updated: z.coerce.date().optional(),
        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(false),
        example: z.boolean().default(false),
        hero: image().optional(),
        heroAlt: z.string().optional(),
        note: z.string().optional(),
        accent,
      })
      .superRefine((entry, context) => {
        if (entry.hero && !entry.heroAlt) {
          context.addIssue({
            code: 'custom',
            message: 'heroAlt is required when hero is present',
            path: ['heroAlt'],
          });
        }
      }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      status: z.string().default('Ongoing'),
      order: z.number().default(99),
      featured: z.boolean().default(false),
      image: image().optional(),
      imageAlt: z.string().optional(),
      liveUrl: z.url().optional(),
      sourceUrl: z.url().optional(),
      tags: z.array(z.string()).default([]),
      accent,
    }),
});

export const collections = { writing, projects };
