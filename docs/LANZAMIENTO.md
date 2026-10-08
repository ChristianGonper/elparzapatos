# Preparar el lanzamiento

El sitio genera HTML estático. Cloudflare Pages admite este resultado sin adaptador de servidor.

## Configuración

Proyecto de Cloudflare Pages `elparzapatos`, conectado por Git a este repositorio.

- Directorio raíz: `sitio`.
- Instalación: `npm ci`.
- Compilación: `if [ "$CF_PAGES_BRANCH" = "main" ]; then npm run build; else npm run build:review; fi`. Hoy todas las ramas publican la vista de revisión, con borradores.
- Directorio de salida: `dist`.
- Node: variable `NODE_VERSION=22.12.0`.
- Rama de producción: `web-nueva` (https://elparzapatos.pages.dev). Las demás ramas tienen vista previa automática en `<rama>.elparzapatos.pages.dev` (las barras pasan a guiones; por ejemplo `bloque-4-fotos-y-visor.elparzapatos.pages.dev`).

## Acceso con contraseña (hasta publicar)

Mientras la web no esté abierta, producción y vistas previas piden usuario y contraseña (HTTP Basic). Se hace con un middleware de Pages Functions, `sitio/functions/_middleware.js`, que Cloudflare ejecuta antes de servir cualquier ruta, incluidas imágenes, CSS y la página 404. No necesita Cloudflare Access ni tarjeta.

- Usuario: `elpar`. Contraseña: la variable `SITE_PASSWORD`.
- Dónde se pone: en el proyecto `elparzapatos` de Cloudflare, Settings → Variables and Secrets, como secreto (cifrado) llamado `SITE_PASSWORD`, en los dos entornos: Production y Preview. Al cambiarla hay que volver a desplegar (Deployments → Retry deployment, o un push) para que se aplique.
- Falla cerrado: si `SITE_PASSWORD` no existe o está vacía, todas las rutas responden 503 sin servir nada.
- Sin credenciales o con credenciales incorrectas: 401 con `WWW-Authenticate: Basic realm="El Par (privado)", charset="UTF-8"`, `Cache-Control: no-store` y `X-Robots-Tag: noindex`. Las respuestas autorizadas llevan también `X-Robots-Tag: noindex`. La contraseña se compara en tiempo constante.
- La contraseña no se guarda en el repositorio ni en el código; se comparte con quien tenga que revisar por un canal privado.
- En local no interviene: `astro dev`, `astro build`, `astro preview` y Playwright no usan Pages Functions.
- **Bloque 6, al publicar:** borrar `sitio/functions/_middleware.js` (y la carpeta `functions` si queda vacía) y quitar `functions` de los scripts `format` y `format:check`. Después se puede eliminar el secreto `SITE_PASSWORD`. Si se quieren mantener protegidas las vistas previas, hay que decidirlo antes, porque el middleware se aplica a todas las ramas por igual.

## Variables públicas

El servidor de desarrollo muestra los borradores sin configurar variables. La compilación normal los excluye; para una vista de revisión local, usar `npm run build:review` o `verify:review`.

- `PUBLIC_SITE_URL`: origen HTTPS del dominio definitivo, sin ruta. Activa URLs canónicas e imágenes para compartir.
- `PUBLIC_LAUNCH_READY=true`: solo después de revisar los análisis con las colaboradoras y completar los textos legales. Activa indexación y sitemap junto a un dominio configurado. Cada análisis autorizado debe indicar `status: published` y `publishedAt: 'AAAA-MM-DD'`.
- `PUBLIC_INCLUDE_DRAFTS=true`: solo para revisión local. Incluye borradores e identifica la vista. No puede combinarse con `PUBLIC_LAUNCH_READY=true`; la compilación falla. `build:review` establece las variables necesarias sin modificar archivos `.env`.
- `PUBLIC_INSTAGRAM_READY=true`: solo cuando la cuenta ya se haya renombrado a @elparzapatos. Activa el enlace en el pie.

La vista de trabajo incluye noindex y robots de exclusión. Eso evita indexación; no sustituye un control de acceso. No publicar borradores sensibles en una URL accesible por internet.

El orden del catálogo y el destacado se resuelven por fecha de publicación descendente, con `order` para empates. La fecha no representa una aprobación: se añade cuando se publica de verdad.

## Antes de publicar

1. Revisar los análisis de María y enviarle el borrador siguiendo el plazo de 48 horas de Drive. El agente no envía mensajes.
2. Confirmar dominio y cuenta de Cloudflare, y activar su medición de visitas sin cookies: «Tus fotos y tus datos» ya la anuncia.
3. Completar los datos del responsable y los textos legales. La página «Tus fotos y tus datos» explica la colaboración; no sustituye por sí sola todos los documentos legales.
4. Comprobar Tally sin modificarlo: enlace y condiciones. No presentar un envío de prueba en nombre de una colaboradora.
5. Ejecutar la verificación y revisar móvil y escritorio.
6. Configurar las variables, compilar y desplegar ese resultado.

Las URLs se diseñan desde cero. No se mantienen aliases ni redirecciones heredadas. Si se decide una migración pública, se podrá acordar un mapa de redirecciones como trabajo separado.

La captura y publicación de nuevos pares es manual. No hay integración automática con la hoja ni API de Drive en el sitio.

Fuentes consultadas el 6/10/2026: [Astro en Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/), [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/).
