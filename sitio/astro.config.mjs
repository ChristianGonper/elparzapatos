import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { cp, readFile } from 'node:fs/promises';
import { basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const site = process.env.PUBLIC_SITE_URL;
if (site && !/^https:\/\/[^/]+\/?$/.test(site)) {
  throw new Error('PUBLIC_SITE_URL debe ser el origen HTTPS del dominio público.');
}

// Laboratorio de diseño: solo en la vista de revisión (build:review y servidor de desarrollo).
// En la compilación normal, «@laboratorio» apunta a un componente vacío.
const laboratorio = process.env.PUBLIC_INCLUDE_DRAFTS === 'true' || process.argv.includes('dev');
const laboratorioDir = new URL('./src/laboratorio/', import.meta.url);
const publicoDir = new URL('./publico/', laboratorioDir);
// Copia los archivos fijos del laboratorio (script de cabecera y favicons) a /laboratorio/.
const archivosLaboratorio = {
  name: 'el-par-laboratorio',
  hooks: {
    'astro:server:setup': ({ server }) => {
      server.middlewares.use('/laboratorio/', async (request, response, next) => {
        const name = basename(request.url?.split('?')[0] ?? '');
        try {
          const body = await readFile(new URL(name, publicoDir));
          response.setHeader(
            'Content-Type',
            name.endsWith('.svg') ? 'image/svg+xml' : 'text/javascript; charset=utf-8',
          );
          response.end(body);
        } catch {
          next();
        }
      });
    },
    'astro:build:done': async ({ dir }) => {
      await cp(fileURLToPath(publicoDir), fileURLToPath(new URL('laboratorio/', dir)), {
        recursive: true,
      });
    },
  },
};

export default defineConfig({
  site,
  integrations: [mdx(), ...(laboratorio ? [archivosLaboratorio] : [])],
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  vite: {
    resolve: {
      alias: {
        '@laboratorio': fileURLToPath(
          new URL(laboratorio ? 'Laboratorio.astro' : 'Vacio.astro', laboratorioDir),
        ),
      },
    },
  },
});
