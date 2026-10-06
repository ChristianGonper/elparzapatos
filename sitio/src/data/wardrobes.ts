import { pairs, type Pair } from './pairs';

interface WardrobeSource {
  slug: string;
  name: string;
  pairIds: string[];
}
export interface Wardrobe {
  slug: string;
  name: string;
  pairs: Pair[];
}
// Solo identidad pública elegida y pares preparados. Sin correo, @ privado ni importación de hojas.
const sources: WardrobeSource[] = [
  { slug: 'maria', name: 'María', pairIds: ['PAR-0003', 'PAR-0004'] },
];
export const wardrobes: Wardrobe[] = sources
  .map((source) => ({
    slug: source.slug,
    name: source.name,
    pairs: pairs.filter((pair) => source.pairIds.includes(pair.id)),
  }))
  .filter((wardrobe) => wardrobe.pairs.length >= 2);
export const wardrobePath = (wardrobe: Wardrobe) => `/armarios/${wardrobe.slug}/`;
export const wardrobeForPair = (pair: Pair) =>
  wardrobes.find((wardrobe) => wardrobe.pairs.some((item) => item.id === pair.id));
