import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { cp, readFile } from 'node:fs/promises';
import { basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const site = process.env.PUBLIC_SITE_URL;
if (site && !/^https:\/\/[^/]+\/?$/.test(site)) {
  throw new Error('PUBLIC_SITE_URL debe ser el origen HTTPS del dominio público.');
}
// Vista de revisión: build:review y servidor de desarrollo. Solo ahí entran la ayuda para medir
// puntos y las direcciones visuales del bloque 9; en la compilación normal, «@medir» y
// «@direcciones» son un componente vacío y no dejan ni estilos ni script ni fuentes.
const revision = process.env.PUBLIC_INCLUDE_DRAFTS === 'true' || process.argv.includes('dev');
const componente = (ruta) =>
  fileURLToPath(new URL(revision ? ruta : './src/components/Empty.astro', import.meta.url));
// El script de cabecera de las direcciones es un archivo propio (la CSP no admite scripts en
// línea): se sirve en desarrollo y se copia a /direcciones/ al compilar la vista de revisión.
const publicoDirecciones = new URL('./src/direcciones/publico/', import.meta.url);
const archivosDirecciones = {
  name: 'el-par-direcciones',
  hooks: {
    'astro:server:setup': ({ server }) => {
      server.middlewares.use('/direcciones/', async (request, response, next) => {
        const name = basename(request.url?.split('?')[0] ?? '');
        try {
          const body = await readFile(new URL(name, publicoDirecciones));
          response.setHeader('Content-Type', 'text/javascript; charset=utf-8');
          response.end(body);
        } catch {
          next();
        }
      });
    },
    'astro:build:done': async ({ dir }) => {
      await cp(fileURLToPath(publicoDirecciones), fileURLToPath(new URL('direcciones/', dir)), {
        recursive: true,
      });
    },
  },
};

export default defineConfig({
  site,
  integrations: [mdx(), ...(revision ? [archivosDirecciones] : [])],
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  vite: {
    // Nada en línea: la CSP (public/_headers) solo admite scripts e imágenes propios, y Vite
    // pondría dentro del HTML los scripts pequeños (el del menú) como <script> en línea.
    build: { assetsInlineLimit: 0 },
    resolve: {
      alias: {
        '@medir': componente('./src/components/MeasurePoints.astro'),
        '@direcciones': componente('./src/direcciones/Direcciones.astro'),
      },
      // verify-growth compila una copia con node_modules enlazado: sin esto, Vite sigue el enlace y
      // pierde la pista de los estilos de ClientRouter.astro.
      preserveSymlinks: true,
    },
  },
});
