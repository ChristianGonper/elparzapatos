import type { APIRoute } from 'astro';
import { siteUrl, launchReady } from '../data/site';
import { pairs, pairPath } from '../data/pairs';
import { wardrobes, wardrobePath } from '../data/wardrobes';
export const GET: APIRoute = () => {
  const routes = [
    '/',
    '/pares/',
    '/armarios/',
    '/participa/',
    '/guia-de-fotos/',
    '/el-par/',
    '/glosario/',
    '/tus-fotos-y-tus-datos/',
    ...pairs.map(pairPath),
    ...wardrobes.map(wardrobePath),
  ];
  const urls =
    siteUrl && launchReady
      ? routes.map((path) => `<url><loc>${siteUrl}${path}</loc></url>`).join('')
      : '';
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
