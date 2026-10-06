import { getCollection, type CollectionEntry } from 'astro:content';

export type Contributor = CollectionEntry<'colaboradoras'>['data'] & { id: string };
export type Pair = CollectionEntry<'pares'>['data'] & { credit: string };
export type PairSection = Pair['sections'][number];

export const contributors: Contributor[] = (await getCollection('colaboradoras')).map((entry) => ({
  ...entry.data,
  id: entry.id,
}));
const byContributor = new Map(contributors.map((contributor) => [contributor.id, contributor]));

export const pairs: Pair[] = (await getCollection('pares'))
  .map(({ data }) => {
    const contributor = data.collaborator && byContributor.get(data.collaborator.id);
    if (data.collaborator && !contributor)
      throw new Error(`${data.id}: colaboradora inexistente ${data.collaborator.id}`);
    return { ...data, credit: contributor?.name ?? 'Colaboración anónima' };
  })
  .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));

for (const [label, values] of [
  ['identificador de par', pairs.map((pair) => pair.id)],
  ['ruta de par', pairs.map((pair) => pair.slug)],
  ['ruta de colaboradora', contributors.map((contributor) => contributor.slug)],
] as const) {
  if (new Set(values).size !== values.length) throw new Error(`Duplicado: ${label}.`);
}

export const pairPath = (pair: Pair) => `/pares/${pair.slug}/`;
