import { pairs, contributors, type Pair } from './pairs';

export interface Wardrobe {
  slug: string;
  name: string;
  /** La colaboradora aparece como «Colaboradora NN»: su armario no lleva nombre en las frases. */
  anonymous: boolean;
  contributorId: string;
  pairs: Pair[];
  /** Línea bajo el título: el texto propio de la colaboradora o la frase común. */
  intro: string;
}

// El número de pares va en letra hasta diez: «Tres pares de María».
const numberWords = [
  '',
  'Un',
  'Dos',
  'Tres',
  'Cuatro',
  'Cinco',
  'Seis',
  'Siete',
  'Ocho',
  'Nueve',
  'Diez',
];
export const wardrobeLine = (count: number, name: string) =>
  `${numberWords[count] ?? count} pares de ${name}. Míralos juntos y fíjate en lo que se repite.`;

const grouped = new Map<string, Pair[]>();
for (const pair of pairs) {
  const id = pair.collaborator.id;
  const group = grouped.get(id) ?? [];
  group.push(pair);
  grouped.set(id, group);
}

export const wardrobes: Wardrobe[] = contributors
  .filter((contributor) => contributor.wardrobe && (grouped.get(contributor.id)?.length ?? 0) >= 2)
  .map((contributor) => ({
    slug: contributor.slug,
    name: contributor.name,
    anonymous: contributor.anonymous !== undefined,
    contributorId: contributor.id,
    pairs: grouped.get(contributor.id)!,
    intro:
      contributor.wardrobeIntro ??
      wardrobeLine(grouped.get(contributor.id)!.length, contributor.name),
  }))
  .sort((a, b) => a.name.localeCompare(b.name, 'es'));

export const wardrobePath = (wardrobe: Wardrobe) => `/armarios/${wardrobe.slug}/`;
export const wardrobeForPair = (pair: Pair) =>
  wardrobes.find((wardrobe) => wardrobe.contributorId === pair.collaborator.id);
