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
npx playwright install chromium
npm run test:e2e
npm run preview
```

La salida estática se genera en `sitio/dist/`. El sitio no necesita servidor ni acceso a Drive para funcionar. Las fuentes están alojadas localmente y las imágenes se incluyen en la compilación.

[Diseño](docs/DISENO.md) · [Lanzamiento](docs/LANZAMIENTO.md) · [Revisión visual y pruebas](docs/REVISION.md)

Las pruebas de navegador comprueban móvil, escritorio, teclado, accesibilidad, imágenes, enlaces y el acceso directo a Tally. En un entorno con Chromium instalado puede indicarse su ruta mediante `PLAYWRIGHT_CHROMIUM_EXECUTABLE`. GitHub Actions ejecuta las comprobaciones en cada cambio y conserva la compilación como artefacto; no despliega el sitio.

La implementación vive en `sitio/`. El trabajo anterior se conserva en el historial de Git, no en carpetas de prototipos ni en documentación que pueda confundirse con el producto vigente.
