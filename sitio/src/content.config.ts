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
    pattern: '*.json',
    base: './src/content/pares',
    generateId: ({ entry }) => entry.replace(/\.json$/, ''),
  }),
  schema: z.object({
    id: z.string().regex(/^PAR-\d{4,}$/),
    slug,
    collaborator: reference('colaboradoras').optional(),
    order: z.number().int().nonnegative(),
    imageSet: slug,
    photoAlt: text,
    focus: text,
    title: text,
    teaser: text,
    intro: text,
    type: text,
    brand: text.optional(),
    hero: image,
    quote: text.optional(),
    sections: z
      .array(
        z.object({
          title: text,
          paragraphs: z.array(text).min(1),
          image,
          caption: text,
          detail: z.boolean().optional(),
        }),
      )
      .min(1),
  }),
});

export const collections = { pares, colaboradoras };
