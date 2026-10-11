import type { ImageMetadata } from 'astro';
import { featuredPair, pairs, type Pair } from './pairs';
import { wardrobes } from './wardrobes';
import { shoeKinds } from './shoe-types';
import { exampleImage, pairImage } from './images';

// Qué enseña la portada según el contenido que haya. Todo sale de los datos: al publicar pares o
// abrir armarios, las secciones aparecen o crecen solas.

/** «Lo último que hemos mirado» aparece desde este número de pares visibles. */
export const latestFrom = 5;
/** Tarjetas de esa sección, sin contar el destacado. */
export const latestCount = 4;
/** Armarios que caben a la vez en la portada cuando hay más de uno. */
export const homeWardrobeLimit = 3;
/** Detalles de «En qué nos fijamos». */
export const detailCount = 3;

export interface HomeDetail {
  label: string;
  title: string;
  text: string;
  image: ImageMetadata;
  /** El retrato del que sale. Las fotos de ejemplo de Sonia no lo tienen: no son retratos. */
  pair?: Pair;
}

// Fotos de Sonia, autorizadas solo como ejemplo: completan la sección mientras falten detalles.
const exampleDetails: HomeDetail[] = [
  {
    label: 'La forma',
    title: 'Un tacón que cambia la silueta',
    text: 'De frente mandan las tiras. De lado, la forma del tacón.',
    image: exampleImage('marrones_2'),
  },
  {
    label: 'El detalle',
    title: 'El detalle que se lleva la mirada',
    text: 'Tres círculos sobre las tiras, con relieves que se ven al acercarse.',
    image: exampleImage('negras_1'),
  },
  {
    label: 'El conjunto',
    title: 'Más que una puntera cerrada',
    text: 'La base, el talón abierto y una tira alrededor del tobillo.',
    image: exampleImage('alpargata_tacon_1'),
  },
];

/**
 * Detalles marcados con `homeDetail` en pares distintos del destacado, del más reciente al más
 * antiguo. Primero, sin repetir grupo de zapato ni colaboradora; si faltan, se completan con otros
 * pares y, al final, con las fotos de ejemplo.
 */
export const selectDetails = (candidates: Pair[], featured?: Pair): HomeDetail[] => {
  const withDetail = candidates.filter((pair) => pair !== featured && pair.homeDetail);
  const chosen: Pair[] = [];
  const seen = new Set<string>();
  for (const pair of withDetail) {
    const keys = [`grupo:${pair.kind.name}`, `colaboradora:${pair.collaborator.id}`];
    if (chosen.length < detailCount && keys.every((key) => !seen.has(key))) {
      chosen.push(pair);
      keys.forEach((key) => seen.add(key));
    }
  }
  for (const pair of withDetail)
    if (chosen.length < detailCount && !chosen.includes(pair)) chosen.push(pair);
  const fromPairs: HomeDetail[] = chosen.map((pair) => ({
    ...pair.homeDetail!,
    image: pairImage(pair, pair.homeDetail!.image),
    pair,
  }));
  return [...fromPairs, ...exampleDetails].slice(0, detailCount);
};

export const homeDetails = selectDetails(pairs, featuredPair);

export const latestPairs =
  pairs.length >= latestFrom
    ? pairs.filter((pair) => pair !== featuredPair).slice(0, latestCount)
    : [];

export const homeWardrobes = wardrobes.slice(0, homeWardrobeLimit);

/** Cuántos pares hay de cada grupo y la foto que lo representa: la de su último par o un ejemplo. */
export const kindSummaries = shoeKinds.map((kind) => {
  const ofKind = pairs.filter((pair) => pair.kind === kind);
  const latest = ofKind[0];
  return {
    kind,
    count: ofKind.length,
    image: latest ? pairImage(latest, latest.hero) : kind.example,
    alt: latest ? latest.photoAlt : `${kind.name}: foto de ejemplo`,
  };
});

export const countLabel = (count: number) =>
  count === 0 ? 'Aún no hay ninguno. ¿Tienes unos?' : count === 1 ? '1 par' : `${count} pares`;
