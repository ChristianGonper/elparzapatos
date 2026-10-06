# El Par · Zapatos en detalle

Vuelve a mirar tus zapatos.

Reconstrucción completa desde la rama `par-astro`. La marca y el contenido se consultan en Google Drive → Moda-Zapatos. Este repositorio contiene únicamente la web nueva y su documentación de desarrollo.

[Propuesta de la web](docs/PROPUESTA-WEB.md) · [Reglas de trabajo](AGENTS.md)

## Ejecutar

Node 22.12 o superior, npm y dependencias fijadas en el lockfile.

```sh
cd sitio
npm ci
npm run dev
```

## Comprobar y compilar

```sh
npm run verify
npm run format:check
npm run test:content
npx playwright install chromium
npm run test:e2e
npm run preview
```

La salida estática se genera en `sitio/dist/`. El sitio no necesita servidor ni acceso a Drive para funcionar. Las fuentes están alojadas localmente y las imágenes se incluyen en la compilación.

[Diseño](docs/DISENO.md) · [Lanzamiento](docs/LANZAMIENTO.md) · [Revisión visual y pruebas](docs/REVISION.md)

Los pares son entradas independientes validadas por Astro Content Collections. Los armarios se generan por colaboradora, sin listas manuales ni páginas personalizadas. [Cómo añadir contenido](docs/CONTENIDO.md#añadir-contenido).

## Dónde modificar cada cosa

| Responsabilidad | Ubicación |
| --- | --- |
| Contenido público e identidades autorizadas | `sitio/src/content/` |
| Validación del contenido | `sitio/src/content.config.ts` |
| Consultas de catálogo y agrupación de armarios | `sitio/src/data/` |
| Resolución de imágenes | `sitio/src/data/images.ts` |
| Páginas y rutas | `sitio/src/pages/` |
| Componentes compartidos y sus comportamientos | `sitio/src/components/` |
| CSS común, componentes y familias de página | `sitio/src/styles/` |
| Verificaciones de compilación y crecimiento | `sitio/scripts/` |
| Pruebas de navegador | `sitio/tests/` |

[La auditoría independiente](docs/AUDITORIA.md) contrasta las instrucciones, las fuentes de Drive y la versión anterior con esta implementación.

Las pruebas de navegador comprueban móvil, escritorio, teclado, accesibilidad, imágenes, enlaces y el acceso directo a Tally. En un entorno con Chromium instalado puede indicarse su ruta mediante `PLAYWRIGHT_CHROMIUM_EXECUTABLE`. GitHub Actions ejecuta las comprobaciones en cada cambio y conserva la compilación como artefacto; no despliega el sitio.

La implementación vive en `sitio/`. El trabajo anterior se conserva en el historial de Git, no en carpetas de prototipos ni en documentación que pueda confundirse con el producto vigente.
