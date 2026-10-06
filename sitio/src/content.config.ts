import { defineCollection, reference } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const text = z.string().min(1);
const image = z.number().int().positive();

const colaboradoras = defineCollection({
  loader: glob({
    pattern: '*.json',
    base: './src/content/colaboradoras',
    generateId: ({ entry }) => entry.replace(/\.json$/, ''),
  }),
  schema: z.object({
    slug,
    name: text,
    wardrobe: z.boolean().default(false),
  }),
});

const pares = defineCollection({
  loader: glob({
    pattern: '*.mdx',
    base: './src/content/pares',
    generateId: ({ entry }) => entry.replace(/\.mdx$/, ''),
  }),
  schema: z.object({
    id: z.string().regex(/^PAR-\d{4,}$/),
    slug,
    collaborator: reference('colaboradoras').optional(),
    status: z.enum(['draft', 'published']).default('draft'),
    order: z.number().int().nonnegative(),
    imageSet: slug,
    photoAlt: text,
    focus: text,
    title: text,
    teaser: text,
    intro: text.optional(),
    type: text,
    brand: text.optional(),
    hero: image,
  }),
});

export const collections = { pares, colaboradoras };
