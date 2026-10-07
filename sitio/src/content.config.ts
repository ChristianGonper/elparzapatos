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
  schema: z
    .object({
      id: z.string().regex(/^PAR-\d{4,}$/),
      slug,
      collaborator: reference('colaboradoras').optional(),
      status: z.enum(['draft', 'published']).default('draft'),
      publishedAt: z.preprocess(
        (value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}$/)
          .refine((value) => {
            const date = new Date(`${value}T00:00:00Z`);
            return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
          }, 'La fecha de publicación debe ser válida.')
          .optional(),
      ),
      order: z.number().int().nonnegative(),
      imageSet: slug,
      photoAlt: text,
      focus: text,
      title: text,
      teaser: text,
      intro: text.optional(),
      type: text,
      brand: text.optional(),
      model: text.optional(),
      hero: image,
    })
    .refine((pair) => pair.status !== 'published' || !!pair.publishedAt, {
      message: 'Un par publicado necesita publishedAt (AAAA-MM-DD).',
      path: ['publishedAt'],
    }),
});

export const collections = { pares, colaboradoras };
