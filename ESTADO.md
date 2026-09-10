# Estado

Actualizado: 2026-09-10.

## Qué es

**El Par — Zapatos en detalle**: marca editorial y web. El archivo pedagógico de láminas vive fuera de este repositorio.

## Ahora

- **Marca.** Revisión integral cerrada ([01](marca/01-identidad-editorial.md) a [04](marca/04-flujo-de-colaboracion.md) y [activos/](marca/activos/)). Snapshot: este archivo. Decisiones de producto y web: [sitio/DECISIONES.md](sitio/DECISIONES.md). Fronteras al redactar: [marca/conceptos-editoriales.md](marca/conceptos-editoriales.md). Guía fotográfica en [guia-fotografica-colaboradores.html](marca/activos/guia-fotografica-colaboradores.html), publicada de momento en GitHub Pages: [https://christiangonper.github.io/elparzapatos/marca/activos/guia-fotografica-colaboradores.html](https://christiangonper.github.io/elparzapatos/marca/activos/guia-fotografica-colaboradores.html). Formulario Tally: [https://tally.so/r/Npj2bl](https://tally.so/r/Npj2bl).
- **Colaboraciones.** Ya existen en Drive la carpeta operativa, una Google Sheet con ocho pestañas y 100 contactos importados desde el Markdown previamente depurado. El Apps Script fue copiado a la Sheet y autorizado; se ejecutó sin datos y dejó log. La Sheet ya contiene un `token_enlace` aleatorio y único para cada uno de los 100 contactos. Tally contiene todavía el campo oculto provisional `colaborador_id`; antes de la prueba se sustituirá por `token_colaborador`, que recibirá ese token público estable y separado de los IDs internos secuenciales (`COL`, `ENV`, `PAR`). La integración con `Tally_raw` y el primer envío real siguen pendientes.
- **Sitio.** Portada y monografía locales; [DESIGN.md](sitio/DESIGN.md) como sistema visual. [DECISIONES.md](sitio/DECISIONES.md) y [ESPECIFICACION.md](sitio/ESPECIFICACION.md).
- **Avance.** Trabajo y reparto de responsables en [TAREAS.md](TAREAS.md).

## Cubierto

Identidad editorial (01 a 04, lemas, flujo de colaboración). Prototipos de portada, monografía y formulario local con [sitio/DESIGN.md](sitio/DESIGN.md). Tally operativo como formulario. Guía enviada a compañeras. Criterio de calidad fotográfica, umbral para pedir tomas y límites éticos de edición acordados en [marca/04](marca/04-flujo-de-colaboracion.md) y gestionados en Drive. La primera entrada real prueba formato web y flujo; no hay piloto separado. v1 y primeras publicaciones: foto limpia, sin cotas. El lanzamiento en Instagram está pospuesto.

Está implementada la estructura inicial del seguimiento por persona, envío y par. Todavía no debe considerarse operativo el archivo automático: falta añadir y resolver el token público sin atribuciones silenciosas, conectar Tally, verificar los encabezados reales, procesar un envío con archivos y repetir la ejecución para comprobar que no duplica datos.

## Abierto

Detalle en [TAREAS.md](TAREAS.md). Lo pospuesto (Instagram, cotas en v1.5/v2, stack): [sitio/DECISIONES.md](sitio/DECISIONES.md).

## Cómo se actualiza

Fecha nueva y las líneas que hayan cambiado.
