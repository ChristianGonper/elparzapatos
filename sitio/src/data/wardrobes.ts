import { pairs, contributors, type Pair } from './pairs';

export interface Wardrobe {
  slug: string;
  name: string;
  contributorId: string;
  pairs: Pair[];
}

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
    contributorId: contributor.id,
    pairs: grouped.get(contributor.id)!,
  }))
  .sort((a, b) => a.name.localeCompare(b.name, 'es'));

export const wardrobePath = (wardrobe: Wardrobe) => `/armarios/${wardrobe.slug}/`;
export const wardrobeForPair = (pair: Pair) =>
  wardrobes.find((wardrobe) => wardrobe.contributorId === pair.collaborator.id);
