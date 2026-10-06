import type { APIRoute } from 'astro';
import { siteUrl, launchReady } from '../data/site';
export const GET: APIRoute = () =>
  new Response(
    siteUrl && launchReady
      ? `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`
      : 'User-agent: *\nDisallow: /\n',
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
