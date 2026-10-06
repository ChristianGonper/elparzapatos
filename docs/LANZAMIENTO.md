# Preparar el lanzamiento

El sitio genera HTML estático. Cloudflare Pages admite este resultado sin adaptador de servidor.

## Configuración

- Directorio raíz: `sitio`.
- Instalación: `npm ci`.
- Compilación: `npm run build`.
- Directorio de salida: `dist`.
- Node: 24 LTS, o una versión que cumpla los requisitos del package.json.
- Rama de desarrollo: `reconstruccion/el-par-desde-par-astro`, basada en par-astro.

No conectar automáticamente esta rama a un despliegue público antes de revisar el contenido. Se puede usar una rama de producción al preparar el lanzamiento.

## Variables públicas

En local o en la vista de trabajo no hace falta configurar ninguna.

- `PUBLIC_SITE_URL`: origen HTTPS del dominio definitivo, sin ruta. Activa URLs canónicas e imágenes para compartir.
- `PUBLIC_LAUNCH_READY=true`: solo después de revisar los análisis con las colaboradoras y completar los textos legales. Activa indexación y sitemap.
- `PUBLIC_INSTAGRAM_READY=true`: solo cuando la cuenta ya se haya renombrado a @elparzapatos. Activa el enlace en el pie.

La vista de trabajo incluye noindex y robots de exclusión. Eso evita indexación; no sustituye un control de acceso. No publicar borradores sensibles en una URL accesible por internet.

## Antes de publicar

1. Revisar los análisis de María y enviarle el borrador siguiendo el plazo de 48 horas de Drive. El agente no envía mensajes.
2. Confirmar dominio y cuenta de Cloudflare.
3. Completar los datos del responsable y los textos legales. La página «Tus fotos y tus datos» explica la colaboración; no sustituye por sí sola todos los documentos legales.
4. Comprobar Tally sin modificarlo: enlace y condiciones. No presentar un envío de prueba en nombre de una colaboradora.
5. Ejecutar la verificación y revisar móvil y escritorio.
6. Configurar las variables, compilar y desplegar ese resultado.

Las URLs se diseñan desde cero. No se mantienen aliases ni redirecciones heredadas. Si se decide una migración pública, se podrá acordar un mapa de redirecciones como trabajo separado.

La captura y publicación de nuevos pares es manual. No hay integración automática con la hoja ni API de Drive en el sitio.

Fuentes consultadas el 6/10/2026: [Astro en Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/), [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/).
