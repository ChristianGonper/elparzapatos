import { pairs, type Pair } from './pairs';
import { wardrobeForPair } from './wardrobes';

/** Retratos que salen al final de cada par. */
export const morePortraitsLimit = 3;

/**
 * Primero, los otros pares del mismo armario; después, los más recientes del catálogo. Nunca el
 * propio par ni uno repetido. Si no hay otros pares, la lista queda vacía y el bloque no sale.
 */
export const morePortraits = (pair: Pair, catalog: Pair[] = pairs): Pair[] => {
  const wardrobe = wardrobeForPair(pair);
  const sameWardrobe = wardrobe ? wardrobe.pairs.filter((other) => other !== pair) : [];
  const recent = catalog.filter((other) => other !== pair && !sameWardrobe.includes(other));
  return [...sameWardrobe, ...recent].slice(0, morePortraitsLimit);
};
