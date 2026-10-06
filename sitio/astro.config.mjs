import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

const site = process.env.PUBLIC_SITE_URL;
if (site && !/^https:\/\/[^/]+\/?$/.test(site)) {
  throw new Error('PUBLIC_SITE_URL debe ser el origen HTTPS del dominio público.');
}
export default defineConfig({
  site,
  integrations: [mdx()],
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
