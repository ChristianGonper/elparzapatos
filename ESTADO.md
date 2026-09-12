# Estado

Actualizado: 2026-09-12.

## Qué es

**El Par — Zapatos en detalle**: marca editorial y web. El archivo pedagógico de láminas vive fuera de este repositorio.

## Ahora

- **Marca.** Documentación saneada bajo el principio de fuente única de verdad ([01](marca/01-identidad-editorial.md) a [04](marca/04-flujo-de-colaboracion.md) y [activos/](marca/activos/)). Claims y canales centralizados en [02](marca/02-nombre-y-presentacion.md#2-aplicaciones-en-canales). Perspectivas canónicas en [03](marca/03-sistema-editorial-y-contenidos.md#perspectivas-base). Correo oficial en `elparzapatos@proton.me`. Protocolo oficial de retirada en [04](marca/04-flujo-de-colaboracion.md#4-política-y-protocolo-de-retirada). Snapshot: este archivo. Decisiones de producto y web: [sitio/DECISIONES.md](sitio/DECISIONES.md).
- **Colaboraciones.** Fase inicial cerrada y sistema operativo en modo manual. Hay un único enlace público de Tally, con correo obligatorio como clave e Instagram opcional. La versión 3 del Apps Script está instalada y validada. La primera ejecución creó correctamente `ENV-0001`, `PAR-0001`, su actividad, manifiesto y cinco imágenes; la segunda devolvió 0/0/0 y confirmó la idempotencia. La Google Sheet es la fuente canónica del seguimiento vivo. No hay disparadores activos.
- **Sitio.** Especificación web refinada y orientada a la web de producción real ([sitio/ESPECIFICACION.md](sitio/ESPECIFICACION.md) y [sitio/DECISIONES.md](sitio/DECISIONES.md)): portada adaptativa al volumen (hero dominante, sin rejillas vacías iniciales, filtros latentes), monografía modular con mínimo 6 fotos reales e inspección en lightbox minimalista, encuadre íntegro `object-contain` respetando suelo y sombra natural, popovers contextuales ligeros con diccionario canónico inicial, navegación secuencial al pie (`← Anterior` / `Siguiente →`) e inclusión de la página puente `como-colaborar.html` en el paquete de lanzamiento. [DESIGN.md](sitio/DESIGN.md) en inglés.
- **Avance.** Cerrado el refinamiento de la especificación para la web real en [TAREAS.md](TAREAS.md). Foco inmediato en la captación (Kit para compañeras y refinamiento de primer contacto) y la preparación para maquetar la página puente y las primeras publicaciones reales.

## Cubierto

Identidad editorial saneada y desacoplada (01 a 04, lemas, flujo de colaboración). Prototipos de portada, monografía y formulario local con [sitio/DESIGN.md](sitio/DESIGN.md). Tally operativo como formulario. Criterio de calidad fotográfica, umbral para pedir tomas y límites éticos de edición acordados en [marca/04](marca/04-flujo-de-colaboracion.md) y gestionados en Drive. La primera entrada real prueba formato web y flujo. v1 y primeras publicaciones: foto limpia, sin cotas. El lanzamiento en Instagram está pospuesto. Canal oficial de contacto establecido (`elparzapatos@proton.me`) y fórmula de follow-up incorporada en [Contactos-previos.md](marca/activos/Contactos-previos.md).

Está implementada y verificada la primera fase del seguimiento por persona, envío y par. Se retiraron los tokens personales del flujo operativo, la Sheet y el manifiesto de prueba; también se eliminó la respuesta incompleta. La descarga, las carpetas, los registros y la ejecución idempotente quedaron comprobados. Los contactos iniciales sin correo pueden enlazarse por coincidencia exacta de Instagram; las altas nuevas se resuelven por correo y los conflictos quedan para revisión.

## Abierto

El foco actual es la captación de material real mediante el **Kit de recomendación para compañeras/embajadoras** (mensajes directos, mini-argumentario y flyer digital) y la preparación para maquetar la primera pieza web. La automatización de `Notas_inbox` queda diferida para cuando exista volumen recurrente. Detalle en [TAREAS.md](TAREAS.md). Lo pospuesto: [sitio/DECISIONES.md](sitio/DECISIONES.md).

## Cómo se actualiza

Fecha nueva y las líneas que hayan cambiado.
