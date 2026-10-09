# Fotografías del sitio

Las fuentes originales se conservan en Drive. El sitio incluye únicamente las copias necesarias para sus páginas.

| Grupo | Uso | Fuente y autorización |
| --- | --- | --- |
| María · PAR-0003 | Primer análisis y guía de bailarinas, seis vistas | Envío ENV-0003, 20/09/2026. Crédito elegido: nombre. Marca y cita del propio envío. |
| María · PAR-0002 | Tercer análisis y Armario de María, seis vistas | Envío ENV-0002, 16/09/2026. Fotos HEIC; crédito con nombre y uso en la web confirmado en el encargo. |
| María · PAR-0004 | Segundo análisis y preparación de Armario de María, seis vistas | Mismo envío y condiciones de PAR-0003. Los análisis se revisan antes del lanzamiento. |
| Ejemplos de Sonia | Variedad en inicio y participación | Uso expresamente autorizado en el encargo de esta reconstrucción. No se presentan como análisis publicados. |
| Tacones ilustrados | Apoyo desplegable de la guía | Imagen generada con IA del material anterior, conservada por instrucción del usuario y etiquetada como ilustración. |

Las copias son de trabajo para terminar y revisar el sitio. [El alojamiento y los formatos definitivos siguen pendientes](IMAGENES-PENDIENTES.md).

## Conversión

Cada foto se guarda una sola vez en `sitio/src/assets/` (pares en `pares/<set>/vista-0N.webp`, ejemplos en `ejemplos/`), con orientación correcta y sin metadatos EXIF: 1600 píxeles de ancho para los pares y 960 para los ejemplos. Al compilar, Astro (`astro:assets`) genera las variantes de 480, 960 y 1600 píxeles en AVIF y WebP, la imagen grande del visor y la de compartir. No se aplican retoques generativos, cambios de forma, eliminación de marcas ni sustitución de fondos. El color se mantiene.

La vista de detalle de la guía amplía una foto del set con el encuadre de la interfaz y se indica como ampliación. Al abrirla se puede ver la foto completa.
