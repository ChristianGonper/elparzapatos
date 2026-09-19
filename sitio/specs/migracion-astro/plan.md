# Plan Consolidado: Migración Integral de la Plataforma Web a Astro
> **Estado:** Verificado y cerrado el 2026-09-19  
> **Especificación que gobierna:** [sitio/specs/migracion-astro/spec.md](spec.md)  
> **Sistema visual:** [sitio/DESIGN.md](../../DESIGN.md)  
> **Marco global:** [sitio/ESPECIFICACION.md](../../ESPECIFICACION.md)

## Resumen Técnico de Entrega

- **Módulos y componentes implementados:**
  - `sitio/astro.config.mjs`, `sitio/package.json`, `sitio/tsconfig.json`: Configuración base de Astro 7.3.3, TypeScript estricto y scripts de build estático (SSG).
  - `sitio/src/styles/tokens.css` y `reset.css`: Tokens de color, tipografía fluida con `clamp()`, radios semánticos (`--radius-sm`, `--radius-md`, `--radius-lg`) y normalización CSS sin desbordamiento.
  - `sitio/src/layouts/LayoutBase.astro` y `LayoutMonografia.astro`: Armazón HTML5, carga tipográfica unificada (Newsreader, Plus Jakarta Sans, JetBrains Mono), metaetiquetas OpenGraph/Twitter e infraestructura para analítica privada sin cookies.
  - `sitio/src/components/Header.astro` y `Footer.astro`: Identidad litográfica con descriptor de marca en color cuero cognac (`#9E6B55`), navegación contextual con estados activos inertes (`aria-current="page"`), áreas táctiles >= 44 px y regla anti-duplicidad en pie para colaborar.
  - `sitio/src/content.config.ts` y `sitio/src/content/pares/`: Colección tipada estricta con Content Layer API de Astro 7 y monografía técnica inaugural del salón clásico.
  - Componentes modulares de lectura y catálogo: `CedulaMuseo.astro` (Variante 3A continua literaria), `SpecimenFrame.astro`, `Lightbox.astro` (modal accesible nativo con `<dialog>` y control por teclado `Esc`), `Diptico.astro`, `Abstract.astro`, `ModuloEditorial.astro`, `CitaColaboradora.astro` y `GlossaryPopover.astro`.
  - Superficies migradas en `sitio/src/pages/`:
    - `index.astro`: Portada editorial con Hero de espécimen interactivo, cuadrícula condicional (regla inaugural de un único par) y bloque de cierre «Comparte un par».
    - `entradas/[slug].astro`: Monografía estática dinámica con retorno de navegación, pliego editorial completo, díptico y cédula.
    - `sobre-el-par.astro`: Página institucional unificada con los 5 bloques temáticos, módulo comparativo y composición doméstica en retícula con imágenes optimizadas nativamente.
    - `como-colaborar.astro`: Página puente con flujo en 3 pasos, 4 compromisos éticos, canales institucionales y embudo guiado.
    - `guia-fotografica/index.astro`: Guía fotográfica interactiva integrada como ruta canónica nativa autónoma con sus activos en `sitio/public/guia-fotografica-assets/`.
  - Archivo inerte de prototipos en `sitio/archivo-prototipos/`.

- **Arquitectura final:**
  - Generación estática pura (SSG) de alto rendimiento, modular y autónoma en `sitio/dist/`.
  - Eliminación de dependencias pesadas de runtime y cero tracking intrusivo.
  - Gestión optimizada de activos WebP mediante el pipeline de imágenes nativo de Astro (`astro:assets`).

- **Pruebas y validaciones superadas:**
  - `pnpm run check`: 0 errores, 0 advertencias, 0 hints en todo el proyecto.
  - `pnpm run build`: 5 páginas estáticas compiladas y 11 activos WebP optimizados con 100% de éxito.
  - Auditoría visual y responsiva (T18): verificación de no desbordamiento en resoluciones de 320 px a 1280 px, zonas táctiles >= 44 px, contrastes cromáticos y accesibilidad por teclado en visor modal.
