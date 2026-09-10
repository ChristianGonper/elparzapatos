# Estado

Actualizado: 2026-09-10.

## Qué es

**El Par — Zapatos en detalle**: marca editorial y web. El archivo pedagógico de láminas vive fuera de este repositorio.

## Ahora

- **Marca.** Revisión integral cerrada ([01](marca/01-identidad-editorial.md) a [04](marca/04-flujo-de-colaboracion.md) y [activos/](marca/activos/)). Snapshot: este archivo. Decisiones de producto y web: [sitio/DECISIONES.md](sitio/DECISIONES.md). Fronteras al redactar: [marca/conceptos-editoriales.md](marca/conceptos-editoriales.md). Guía fotográfica en [guia-fotografica-colaboradores.html](marca/activos/guia-fotografica-colaboradores.html), publicada de momento en GitHub Pages: [https://christiangonper.github.io/elparzapatos/marca/activos/guia-fotografica-colaboradores.html](https://christiangonper.github.io/elparzapatos/marca/activos/guia-fotografica-colaboradores.html). Formulario público de Tally: [https://tally.so/r/Npj2bl](https://tally.so/r/Npj2bl).
- **Colaboraciones.** Fase inicial cerrada y sistema operativo en modo manual. Hay un único enlace público de Tally, con correo obligatorio como clave e Instagram opcional. La versión 3 del Apps Script está instalada y validada. La primera ejecución creó correctamente `ENV-0001`, `PAR-0001`, su actividad, manifiesto y cinco imágenes; la segunda devolvió 0/0/0 y confirmó la idempotencia. La Google Sheet es la fuente canónica del seguimiento vivo. No hay disparadores activos.
- **Sitio.** Portada y monografía locales; [DESIGN.md](sitio/DESIGN.md) como sistema visual. [DECISIONES.md](sitio/DECISIONES.md) y [ESPECIFICACION.md](sitio/ESPECIFICACION.md).
- **Avance.** Trabajo y reparto de responsables en [TAREAS.md](TAREAS.md).

## Cubierto

Identidad editorial (01 a 04, lemas, flujo de colaboración). Prototipos de portada, monografía y formulario local con [sitio/DESIGN.md](sitio/DESIGN.md). Tally operativo como formulario. Criterio de calidad fotográfica, umbral para pedir tomas y límites éticos de edición acordados en [marca/04](marca/04-flujo-de-colaboracion.md) y gestionados en Drive. La primera entrada real prueba formato web y flujo. v1 y primeras publicaciones: foto limpia, sin cotas. El lanzamiento en Instagram está pospuesto.

Está implementada y verificada la primera fase del seguimiento por persona, envío y par. Se retiraron los tokens personales del flujo operativo, la Sheet y el manifiesto de prueba; también se eliminó la respuesta incompleta. La descarga, las carpetas, los registros y la ejecución idempotente quedaron comprobados. Los contactos iniciales sin correo pueden enlazarse por coincidencia exacta de Instagram; las altas nuevas se resuelven por correo y los conflictos quedan para revisión.

## Abierto

La siguiente fase es el procesamiento de `Notas_inbox` mediante una tarea de ChatGPT lanzada manualmente con `Run`; después se decidirá si conviene programarla. Detalle en [TAREAS.md](TAREAS.md). Lo pospuesto: [sitio/DECISIONES.md](sitio/DECISIONES.md).

## Cómo se actualiza

Fecha nueva y las líneas que hayan cambiado.
