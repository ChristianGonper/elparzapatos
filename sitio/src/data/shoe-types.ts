import type { ImageMetadata } from 'astro';
import { exampleImage, guideImage } from './images';

// Grupos de zapatos que contamos (portada y Cómo colaborar). Cada `type` de un par pertenece a un
// grupo; un tipo nuevo se añade aquí con su género, que decide «¿Y las tuyas?» o «¿Y los tuyos?».
export interface ShoeKind {
  name: string;
  /** Tipos de par de este grupo, tal como se escriben en `type`, y si son femeninos. */
  types: Record<string, 'f' | 'm'>;
  /** Foto de ejemplo mientras el grupo no tenga ningún par. */
  example: ImageMetadata;
  /** Qué miramos en este grupo (Cómo colaborar). */
  text: string;
}

export const shoeKinds: ShoeKind[] = [
  {
    name: 'Bailarinas',
    types: { Bailarinas: 'f', Slippers: 'f', Manoletinas: 'f', Merceditas: 'f' },
    example: guideImage(5),
    text: 'La forma de la puntera, la abertura o un pequeño adorno.',
  },
  {
    name: 'Tacones y tiras',
    types: {
      Salones: 'm',
      Tacones: 'm',
      Destalonados: 'm',
      'Sandalias de tacón': 'f',
      Mules: 'f',
    },
    example: exampleImage('marrones_2'),
    text: 'La forma del tacón y el recorrido de las tiras.',
  },
  {
    name: 'Cuñas y alpargatas',
    types: { Cuñas: 'f', Alpargatas: 'f' },
    example: exampleImage('alpargata_tacon_1'),
    text: 'La base cambia toda la silueta.',
  },
  {
    name: 'Plataformas',
    types: { Plataformas: 'f' },
    example: exampleImage('dorados_1'),
    text: 'Una suela que gana altura y cambia las proporciones.',
  },
];

const byType = new Map(
  shoeKinds.flatMap((kind) =>
    Object.entries(kind.types).map(([type, gender]) => [type, { kind, gender }] as const),
  ),
);

export const shoeKindOf = (pair: { id: string; type: string }) => {
  const found = byType.get(pair.type);
  if (!found)
    throw new Error(
      `${pair.id}: el tipo «${pair.type}» no está en ningún grupo de src/data/shoe-types.ts.`,
    );
  return found;
};
