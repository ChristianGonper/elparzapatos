import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

export const paresCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/pares' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      subtitulo: z.string(),
      fechaPublicacion: z.coerce.date(),
      destacadoEnPortada: z.boolean().default(false),

      // Fotografía principal procesada y optimizada por astro:assets
      heroImagen: image(),
      heroAlt: z.string(),

      // Cédula técnica canónica de 5 campos (Variante 3A: Cédula de Museo)
      cedula: z.object({
        siluetaTipo: z.string(), // Campo 1: ej. "Salón clásico"
        marca: z.string(), // Campo 2: ej. "Christian Louboutin"
        modelo: z.string(), // Campo 2: ej. "So Kate"
        materialAcabado: z.string(), // Campo 3: ej. "Piel vacuna natural · Charol brillante · Negro profundo"
        geometriaTacon: z.string(), // Campo 4: ej. "Tacón aguja 90 mm · Pecho recto"
        procedenciaArmario: z.string(), // Campo 5: ej. "Armario de Carmen"
        procedenciaInstagram: z.string().optional(), // Campo 5 opcional: ej. "carmen.armario"
      }),

      // Cita testimonial opcional de colaboradora
      testimonio: z
        .object({
          texto: z.string(),
          autora: z.string(),
          posicion: z.enum(['apertura', 'detalle', 'cierre']).default('cierre'),
        })
        .optional(),
    }),
});

export const collections = {
  pares: paresCollection,
};
