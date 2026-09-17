# Relevo — migración mantenible y revisión visual

**Fecha de corte:** 17 de septiembre de 2026  
**Ámbito:** decisiones y trabajo realizados durante la preparación de la migración del sitio de El Par.  
**Estado del repositorio antes de este relevo:** `main` en `2db622b9830759c97d80cec5d3dfe27cb2905a1a`.

> Este archivo es una síntesis de continuidad, no una quinta fuente de verdad. Si discrepa con una fuente gobernante, prevalecen [AGENTS.md](../AGENTS.md), [DECISIONES.md](DECISIONES.md), [DESIGN.md](DESIGN.md), [ESPECIFICACION.md](ESPECIFICACION.md), las specs de superficie y [TAREAS.md](../TAREAS.md).

## 1. Objetivo del trabajo

Transformar los prototipos HTML y CSS actuales en un sitio mantenible para publicar decenas de monografías sin copiar páginas completas ni repetir cabecera, pie, estilos y comportamiento.

Christian editará el proyecto localmente. La web desplegada no tendrá un panel de administración: únicamente se publica lo que haya sido revisado, aceptado y enviado a `main`.

## 2. Arquitectura aceptada

- **Framework:** Astro con TypeScript.
- **Modelo:** generación estática, con JavaScript limitado a interacciones concretas como ampliación fotográfica, glosario y futuros filtros.
- **Contenido:** versionado en Git mediante colecciones de contenido y datos estructurados; no hay CMS en la primera versión.
- **Componentes:** cabecera, pie, marco fotográfico, navegación, pieza destacada, tarjeta de colección, módulos editoriales, glosario, lightbox, cédula técnica y cierre colaborativo deben ser reutilizables.
- **Edición:** siempre local. `main` representa el estado aprobado que puede desplegarse.
- **Formulario:** Tally continúa en la primera versión. Un formulario propio queda para una segunda etapa y no debe incorporarse ahora.

La decisión y su justificación están consolidadas en [DECISIONES.md](DECISIONES.md), ADR-07 a ADR-09.

## 3. Despliegue previsto

### Sitio real

- **Proveedor acordado:** Cloudflare Pages.
- **Origen:** repositorio privado `ChristianGonper/elparzapatos`, rama `main`.
- **Primera URL:** subdominio temporal `*.pages.dev` con nombre reconocible.
- **Dominio posterior:** se conectará un dominio propio sin cambiar la arquitectura.
- **Automatización:** cada cambio aprobado en `main` podrá activar el build y despliegue de Astro.

Cloudflare Pages todavía **no está configurado** para el sitio real. La infraestructura web continúa documentada, pero no operativa.

### Laboratorio visual temporal

Se creó un Site privado separado para revisar decisiones visuales sin confundirlo con la futura producción:

- URL: <https://elpar-laboratorio-visual.christian-reprice.chatgpt.site>
- Estado: **publicado de forma privada** y accesible para Christian.
- Función: comparar portada y monografía, ritmo vertical, retícula, marcos, lightbox y glosario.
- No es el sitio real, no sustituye Astro y no debe convertirse en la fuente del producto.

## 4. Fotografías y almacenamiento

- Drive conserva el material recibido, privado y de trabajo.
- Git recibe únicamente fotografías aprobadas para publicación, saneadas y convertidas a WebP.
- En Astro se guardarán preferentemente bajo `src/assets/pares/[slug]/` para que el sistema pueda generar tamaños responsivos y optimizados.
- No se publican RAW, HEIC ni archivos con metadatos personales.
- En la primera etapa las imágenes públicas viajan junto al sitio en Cloudflare Pages.
- Cloudflare R2 se reserva para cuando el volumen haga conveniente separar los activos del repositorio; no debe introducirse todavía.
- Si una imagen contiene demasiado margen blanco, Christian corrige el recorte localmente antes de publicarla. El CSS no debe compensar un encuadre deficiente.

## 5. Analítica aceptada

- Activar **Cloudflare Web Analytics** al configurar el despliegue real.
- Medir visitas, páginas vistas, procedencia, dispositivos y rendimiento/Core Web Vitals.
- No incorporar en v1 Google Analytics, grabación de sesiones ni seguimiento exhaustivo de clics.
- La analítica todavía no está operativa porque Cloudflare Pages aún no se ha configurado.

## 6. Dirección visual aceptada

Se conserva la dirección editorial existente:

- fondo cálido, tinta carbón, acento cuero y filetes finos;
- Newsreader para títulos, Plus Jakarta Sans o Inter para lectura y JetBrains Mono para metadatos;
- tratamiento plano, sin sombras difusas, esquinas redondeadas ni recursos comerciales;
- ritmo **más compacto** que en los HTML originales, evitando desplazamiento vertical innecesario;
- títulos de menor escala en móvil;
- cabecera en el flujo normal: aparece arriba y desaparece al desplazarse; no es fija ni pegajosa;
- pie con las rutas esenciales al final de la lectura;
- fotografías completas, sin recorte CSS, dentro de un paspartú estrecho y ligeramente cálido que permite distinguir una fotografía de fondo blanco;
- el marco es editorial y discreto, no decorativo.

## 7. Interacciones visuales

### Glosario

- Los términos se distinguen mediante subrayado punteado color cuero.
- El panel no muestra un botón `×`.
- Se cierra al pulsar o tocar fuera, o mediante `Esc`.

### Ampliación fotográfica

- Las imágenes abren un lightbox limpio a pantalla completa.
- No se escala ni desplaza la fotografía al pasar el ratón.
- En escritorio, el paspartú, el filete y un halo muy ligero cambian hacia el color cuero para comunicar que la imagen es interactiva.
- El mismo estado debe existir con foco de teclado y la apertura debe funcionar con `Enter` y espacio.

El efecto de marco está implementado en la versión actual del laboratorio. Debe revisarse visualmente durante el relevo antes de trasladarlo literalmente al sitio Astro; el principio de no escalar la imagen sí está confirmado.

## 8. Portada inaugural aceptada

- No hay un gran texto introductorio antes de la pieza: la fotografía abre la experiencia.
- En escritorio se usa una composición izquierda–derecha: fotografía grande a la izquierda y bloque editorial a la derecha.
- En móvil se muestra primero la fotografía y después procedencia, título, descripción y enlace.
- Con una sola publicación no se repite la pieza en una tarjeta de colección.
- La portada pasa de la pieza destacada al cierre `Comparte un par`.
- La cuadrícula de colección aparece desde la segunda publicación y no duplica la pieza destacada.
- El copy introductorio que no aporta información al visitante debe eliminarse.

La decisión está registrada en [DECISIONES.md](DECISIONES.md), ADR-11, y en [specs/portada/spec.md](specs/portada/spec.md).

## 9. Qué se ha implementado

### Documentado y subido a GitHub

- Arquitectura Astro + TypeScript y edición local.
- Despliegue futuro en Cloudflare Pages.
- Límite entre Drive y activos públicos WebP.
- Analítica esencial de Cloudflare.
- Ritmo compacto, marco fotográfico, escala móvil y cabecera no persistente.
- Portada inaugural directa y adaptable al número de piezas.
- Comportamiento del glosario y señal de inspección fotográfica.

Commits de esta fase:

| Commit | Contenido |
| --- | --- |
| `27e59a8` | Arquitectura, despliegue, analítica y ritmo visual |
| `b58ce7c` | Marco fotográfico y lectura móvil |
| `2db622b` | Portada inaugural y señal de inspección |

### Prototipado y publicado en el laboratorio

- Cambio entre vista de portada y monografía.
- Tres densidades comparables; la aceptada queda seleccionada por defecto como `Más compacto`.
- Retícula de doce columnas visible bajo demanda.
- Portada inaugural sin tarjeta duplicada.
- Apertura de fotografías mediante ratón y teclado.
- Glosario contextual con cierre exterior.
- Adaptación móvil con imagen primero y títulos reducidos.

### Todavía no implementado en el producto real

- Proyecto Astro y estructura de carpetas definitiva.
- Colecciones y esquema de datos para cada par.
- Migración de los cuatro HTML existentes.
- Build de producción en Cloudflare Pages.
- Dominio temporal `pages.dev` y dominio propio.
- Web Analytics activa.
- Formulario propio.

## 10. Autorización de trabajo confirmada

Christian autorizó que, al terminar cada fase que él haya aceptado:

1. se actualicen los documentos canónicos pertinentes;
2. se creen commits pequeños conforme a las reglas del repositorio;
3. se haga `push` a `main`.

Esta autorización no permite convertir propuestas abiertas en decisiones, introducir funciones no solicitadas ni omitir su aprobación para criterios visuales nuevos.

## 11. Cómo continuar

1. Leer [AGENTS.md](../AGENTS.md), [ESTADO.md](../ESTADO.md) y este relevo.
2. Verificar el `HEAD` de `main`; no asumir que el SHA de este documento sigue siendo el último.
3. Abrir el laboratorio y comprobar el efecto de inspección fotográfica actual.
4. Continuar la revisión visual por bloques, planteando a Christian las decisiones antes de consolidarlas, incluso cuando ya aparezcan en los HTML antiguos.
5. Próximo bloque recomendado: estructura de la monografía —apertura, abstract, alternancia 7:5/5:7/6:6, orden móvil, dípticos, glosario, cédula y navegación final—.
6. Cuando la estructura de componentes esté aprobada, crear el proyecto Astro y la primera colección de contenido.
7. Migrar primero portada y una monografía completa; después `Sobre El Par` y `Cómo colaborar`.
8. Validar móvil, teclado, lightbox, popovers, metadatos y construcción estática antes de configurar Cloudflare Pages.

## 12. Regla fundamental para el relevo

No debe fijarse una decisión visual porque ya exista en el HTML. Presentarla primero a Christian, obtener su aceptación y después actualizar la spec, el laboratorio y la implementación. Las propuestas abiertas se mantienen como prototipo; las decisiones aceptadas se registran en su fuente canónica.
