import { getCollection, type CollectionEntry } from 'astro:content';
import { includeDrafts } from './site';

export type Contributor = CollectionEntry<'colaboradoras'>['data'] & { id: string };
export type Pair = CollectionEntry<'pares'>['data'] & {
  credit: string;
  entryId: string;
  terms: string[];
};

export const contributors: Contributor[] = (await getCollection('colaboradoras')).map((entry) => ({
  ...entry.data,
  id: entry.id,
}));
const byContributor = new Map(contributors.map((contributor) => [contributor.id, contributor]));

const allPairs: Pair[] = (await getCollection('pares'))
  .map(({ id, data, body }) => {
    const contributor = byContributor.get(data.collaborator.id);
    if (!contributor)
      throw new Error(`${data.id}: colaboradora inexistente ${data.collaborator.id}`);
    const terms = [
      ...new Set([...(body ?? '').matchAll(/\bslug=["']([^"']+)["']/g)].map((match) => match[1])),
    ];
    return { ...data, entryId: id, credit: contributor.name, terms };
  })
  .sort(
    (a, b) =>
      (b.publishedAt ?? '').localeCompare(a.publishedAt ?? '') ||
      a.order - b.order ||
      a.id.localeCompare(b.id),
  );

for (const [label, values] of [
  ['identificador de par', allPairs.map((pair) => pair.id)],
  ['ruta de par', allPairs.map((pair) => pair.slug)],
  ['ruta de colaboradora', contributors.map((contributor) => contributor.slug)],
] as const) {
  if (new Set(values).size !== values.length) throw new Error(`Duplicado: ${label}.`);
}

export const pairs = allPairs.filter((pair) => includeDrafts || pair.status === 'published');
export const featuredPair = pairs.find((pair) => pair.status === 'published') ?? pairs[0];

export const pairPath = (pair: Pair) => `/pares/${pair.slug}/`;
