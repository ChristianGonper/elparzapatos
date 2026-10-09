# Imágenes publicadas: decisión pendiente

La ubicación definitiva de las imágenes y su formato de publicación no están decididos. Las copias WebP del repositorio sirven para terminar y comprobar la web. No sustituyen los originales ni cierran la arquitectura de publicación.

## Lo que ya se conserva

Originales y permisos: en Drive, en sus carpetas actuales. Las versiones de trabajo de esta web no tienen EXIF ni datos de contacto.

## Opciones para alojar las versiones públicas

| Opción | Ventajas | Coste y límites |
| --- | --- | --- |
| Dentro de la compilación de la web | Simple para una colección pequeña; mismas URLs y despliegue; sin servicios adicionales. | Los binarios crecen en el historial de Git y cada actualización de imágenes acompaña al despliegue. |
| Cloudflare R2 con dominio de imágenes | Separa el almacenamiento público del código; permite ampliar la colección sin aumentar tanto Git. | Hay que configurar bucket público, dominio y política de acceso; tener una operación de subida y retirada. |
| Servicio de imágenes administrado | Puede producir tamaños y formatos según el navegador. | Añade coste y dependencia de sus URLs y reglas. Hay que revisar condiciones antes de elegir. |

Recomendación provisional: mantener el sitio preparado para recibir URLs de imágenes y decidir entre archivos del despliegue y R2 antes de publicar. No usar enlaces privados de Drive como URLs de la web.

Las fotos de origen están en `sitio/src/assets/` y `astro:assets` genera sus variantes en `/_astro/` durante la compilación; la política CSP solo permite imágenes del mismo origen. Elegir un servicio externo exige adaptar esa resolución y autorizar su origen en `_headers`; la migración todavía no está configurada.

## Formatos

WebP es una opción razonable para las copias públicas: sirve estas fotografías con menos peso que sus originales y tiene soporte amplio. Desde el bloque 4 la web sirve AVIF con WebP de reserva mediante `<picture>`, generado por Astro a partir de una sola copia de cada foto. Los originales se guardan tal como llegaron, incluidos JPEG y HEIC.

Antes de decidir, comparar peso y aspecto en varias fotos del proyecto, especialmente detalles de rejilla, brillo y pelo corto. No fijar una calidad universal sin ver esos resultados. Mantener proporciones y color; eliminar metadatos personales de las copias públicas.

## Qué cerrar antes del lanzamiento

- Dónde viven los archivos públicos y quién puede subirlos o retirarlos.
- Si se empieza con WebP o se añade AVIF con fallback.
- Tamaños necesarios para tarjetas, artículos y ampliación; calidad según los resultados visuales.
- Nombres estables y sustitución de una foto sin dejar cachés desactualizadas.
- Cómo se retiran todas las copias de un par cuando se pide su retirada.


Fuentes consultadas el 6/10/2026: [R2 y dominios públicos](https://developers.cloudflare.com/r2/buckets/public-buckets/), [transformaciones de Cloudflare Images](https://developers.cloudflare.com/images/optimization/features/) y [formatos de imagen en MDN](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types).
