# Relevo — migración mantenible y revisión visual

**Fecha de corte:** 17 de septiembre de 2026  
**Ámbito:** decisiones y trabajo realizados durante la preparación de la migración del sitio de El Par.  
**Estado del repositorio antes de este relevo:** `main` en `2db622b9830759c97d80cec5d3dfe27cb2905a1a`.

## 1. Objetivo del trabajo

Transformar los prototipos HTML y CSS actuales en un sitio mantenible para publicar decenas de monografías sin copiar páginas completas ni repetir cabecera, pie, estilos y comportamiento.

E proyecto se editará localmente. La web desplegada no tendrá un panel de administración: únicamente se publica lo que haya sido revisado, aceptado y enviado a `main`.

## 2. Arquitectura aceptada

- **Framework:** Astro con TypeScript.
- **Modelo:** generación estática, con JavaScript limitado a interacciones concretas como ampliación fotográfica, glosario y futuros filtros.
- **Contenido:** versionado en Git mediante colecciones de contenido y datos estructurados; no hay CMS en la primera versión.
- **Componentes:** cabecera, pie, marco fotográfico, navegación, pieza destacada, tarjeta de colección, módulos editoriales, glosario, lightbox, cédula técnica y cierre colaborativo deben ser reutilizables.
- **Edición:** siempre local. `main` representa el estado aprobado que puede desplegarse.
- **Formulario:** Tally continúa en la primera versión. Un formulario propio queda para una segunda etapa y no debe incorporarse ahora.

La decisión y su justificación están consolidadas en [ESPECIFICACION.md](ESPECIFICACION.md) §3 (ADR-GLO-03 a ADR-GLO-05).

## 3. Despliegue previsto

### Sitio real

- **Proveedor acordado:** Cloudflare Pages.
- **Origen:** repositorio privado `ChristianGonper/elparzapatos`, rama `main`.
- **Primera URL:** subdominio temporal `*.pages.dev` con nombre reconocible.
- **Dominio posterior:** se conectará un dominio propio sin cambiar la arquitectura.
- **Automatización:** cada cambio aprobado en `main` podrá activar el build y despliegue de Astro.

Cloudflare Pages todavía **no está configurado** para el sitio real. La infraestructura web continúa documentada, pero no operativa.

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
- En escritorio, al posar el cursor o enfocar con teclado, el marco despliega hacia adentro un paspartú generoso con filete nítido en tono cuero (`#9E6B55`) tipo revista de moda, sin mover ni escalar la fotografía.
- El mismo estado existe con foco de teclado y la apertura debe funcionar con `Enter` y espacio.


## 8. Portada inaugural aceptada

- No hay un gran texto introductorio antes de la pieza: la fotografía abre la experiencia.
- En escritorio se usa una composición izquierda–derecha: fotografía grande a la izquierda y bloque editorial a la derecha.
- En móvil se muestra primero la fotografía y después procedencia, título, descripción y enlace.
- Con una sola publicación no se repite la pieza en una tarjeta de colección.
- La portada pasa de la pieza destacada al cierre `Comparte un par`.
- La cuadrícula de colección aparece desde la segunda publicación y no duplica la pieza destacada.
- El copy introductorio que no aporta información al visitante debe eliminarse.

La decisión está registrada en [specs/portada/spec.md](specs/portada/spec.md) §4 (ADR-POR-01).

## 9. Estructura de la monografía aceptada

- **Propósito y tono:** Rigor técnico con cercanía pedagógica para que cualquier lectora entienda la anatomía del calzado. Fusión entre la fotografía natural y honesta de colaboradoras y una maquetación de revista de alta exigencia editorial.
- **Abstract de apertura:** Pliego editorial a **dos columnas** (estilo doble página de catálogo de arte).
- **Hero de espécimen:** Escala equilibrada y reposada en término medio, sin devorar la vertical de la pantalla.
- **Dípticos:** Las dos imágenes contiguas cuentan con un marco conector físico que las vincula visualmente y su texto explicativo va **centrado**.
- **Cédula técnica («Datos del par»):** Composición tipográfica **continua de museo** (5 campos canónicos en prosa corrida con separadores sutiles), descartando definitivamente el formato de tabla o lista rígida.
- **Voz de la colaboradora:** Cita testimonial con **posición libre** (en la apertura, junto a un detalle específico de calce o al cierre técnico, según lo que aporte el testimonio).
- **Flujo de trabajo editorial:** Christian elabora el borrador en Markdown; el agente de código ensambla los componentes en local; Christian revisa y valida visualmente en su navegador antes de consolidar.

La decisión está registrada en [specs/monografia/spec.md](specs/monografia/spec.md).

## 10. Qué se ha implementado

### Documentado y subido a GitHub

- Arquitectura Astro + TypeScript y edición local.
- Despliegue futuro en Cloudflare Pages.
- Límite entre Drive y activos públicos WebP.
- Analítica esencial de Cloudflare.
- Ritmo compacto, marco fotográfico, escala móvil y cabecera no persistente.
- Portada inaugural directa y adaptable al número de piezas.
- Comportamiento del glosario y señal de inspección fotográfica (marco interior tipo revista).
- Estructura editorial de la monografía (abstract a 2 columnas, hero equilibrado, díptico conectado, cédula continua y cita libre).

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

- Proyecto Astro en `sitio/` y estructura de carpetas definitiva.
- Colecciones y esquema de datos para cada par.
- Migración de los cuatro HTML existentes (archivados en `sitio/prototipos-html/`).
- Build de producción en Cloudflare Pages.
- Dominio temporal `pages.dev` y dominio propio.
- Web Analytics activa.
- Formulario propio.

## 11. Cómo continuar

1. Leer [AGENTS.md](../AGENTS.md), [ESTADO.md](../ESTADO.md) y este relevo.
2. Crear la estructura inicial del proyecto Astro en `sitio/` con sus dependencias limpias.
3. Trasladar los 4 prototipos HTML actuales a `sitio/archivo-prototipos/` como referencia inerte.
4. Construir la biblioteca base de componentes de maquetación Astro (`Header`, `Footer`, `SpecimenFrame`, `Abstract`, `ModuloEditorial`, `Diptico`, `CedulaMuseo`, `CitaColaboradora`, `GlossaryPopover`, `Lightbox`).
5. Migrar primero la Portada y la Monografía del salón clásico; validar localmente en móvil y escritorio.
6. Migrar `Sobre El Par` y `Cómo colaborar`.
7. Validar build estático antes de configurar Cloudflare Pages.

## 12. Regla fundamental para el relevo

No debe fijarse una decisión visual porque ya exista en el HTML. Presentarla primero a Christian, obtener su aceptación y después actualizar la spec, el laboratorio y la implementación. Las propuestas abiertas se mantienen como prototipo; las decisiones aceptadas se registran en su fuente canónica.
