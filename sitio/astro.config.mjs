import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { fileURLToPath } from 'node:url';

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
  vite: {
    // La ayuda para medir puntos solo entra en la vista de revisión (build:review y desarrollo);
    // en la compilación normal, «@medir» es un componente vacío y no deja ni estilos ni script.
    resolve: {
      alias: {
        '@medir': fileURLToPath(
          new URL(
            process.env.PUBLIC_INCLUDE_DRAFTS === 'true' || process.argv.includes('dev')
              ? './src/components/MeasurePoints.astro'
              : './src/components/Empty.astro',
            import.meta.url,
          ),
        ),
      },
      // verify-growth compila una copia con node_modules enlazado: sin esto, Vite sigue el enlace y
      // pierde la pista de los estilos de ClientRouter.astro.
      preserveSymlinks: true,
    },
  },
});
