# Revisión de la web

Reconstrucción desde `par-astro`, comprobada el 6 de octubre de 2026. Las capturas corresponden a la compilación con los tres pares de María, sin dominio ni indexación activada.

## Resultado

La portada permite enviar fotos directamente a Tally. La explicación de cómo colaborar y la guía son ayudas opcionales. Hay un catálogo de pares, tres análisis, índice de armarios y Armario de María, presentación de El Par, glosario y condiciones de colaboración. Las definiciones también aparecen dentro del análisis y las fotografías pueden ampliarse con teclado.

Se usa la presentación aprobada de Drive, las fotografías autorizadas y citas de las colaboraciones. Los análisis son borradores nuevos basados en las fotos; no se presentan como textos previamente aprobados. El formulario de Tally permanece intacto.

## Inicio en escritorio

![Inicio en escritorio](vistas/inicio-escritorio.webp)

## Inicio en móvil

![Inicio en móvil](vistas/inicio-movil.webp)

## Cómo colaborar

![Página de participación](vistas/participa.webp)

## Armario de María

![Los tres pares de María](vistas/armario-maria.webp)

## Guía de fotos

![Guía con las seis vistas de PAR-0003 y su detalle ampliado](vistas/guia-de-fotos.webp)

## Verificaciones

- Tipos y compilación de Astro: 0 errores, advertencias o sugerencias.
- 13 documentos HTML: enlaces locales, anclas, identificadores, estructura, imágenes y anchos reales de cada srcset verificados.
- 14 pruebas de navegador: todas las rutas en cinco anchos de 360 a 1440 px, acceso directo a Tally, menú por teclado, definiciones, ampliación, guía e impresión, armarios, recuperación del 404 y lectura sin JavaScript.
- Auditoría automática axe con reglas WCAG 2 A/AA y 2.1 AA en todas las páginas públicas. Superar la auditoría automática no certifica accesibilidad completa; se revisaron además teclado y vistas de móvil y escritorio.
- Formato de código comprobado y dependencias de producción sin vulnerabilidades en la auditoría de npm.
- Variables de lanzamiento comprobadas con un dominio de prueba: canónicas, sitemap de 12 rutas, robots e Instagram. Después se restauró la compilación de trabajo sin indexación ni enlace a la cuenta.

GitHub Actions repite formato, compilación, verificación y pruebas en cada cambio. Conserva el resultado como artefacto de revisión, sin desplegarlo.

## Antes de hacerla pública

Revisar los tres borradores con María; cerrar el alojamiento y formato definitivo de las imágenes; completar los datos legales y elegir dominio/cuenta de despliegue. [Lanzamiento](LANZAMIENTO.md) contiene los pasos y [decisiones de imágenes](IMAGENES-PENDIENTES.md) compara las opciones. Cloudflare Pages sigue siendo adecuado para esta web estática.
