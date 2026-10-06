import { getCollection, type CollectionEntry } from 'astro:content';
import { launchReady } from './site';

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

export const pairs: Pair[] = (await getCollection('pares'))
  .filter((entry) => !launchReady || entry.data.status === 'published')
  .map(({ id, data, body }) => {
    const contributor = data.collaborator && byContributor.get(data.collaborator.id);
    if (data.collaborator && !contributor)
      throw new Error(`${data.id}: colaboradora inexistente ${data.collaborator.id}`);
    const terms = [
      ...new Set([...(body ?? '').matchAll(/\bslug=["']([^"']+)["']/g)].map((match) => match[1])),
    ];
    return { ...data, entryId: id, credit: contributor?.name ?? 'Colaboración anónima', terms };
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
