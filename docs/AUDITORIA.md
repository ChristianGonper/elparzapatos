# Revisión independiente de implementación

Revisión del 6 de octubre de 2026. Referencia inicial: commit `f4d25ac`, rama `reconstruccion/el-par-desde-par-astro`. Las referencias de línea corresponden a esa revisión; los cambios posteriores pueden desplazarlas.

La implementación cumple la dirección principal del encargo: una web centrada en mirar los zapatos y animarse a compartir fotos, con participación directa, análisis visuales y armarios generados a partir del contenido. La estructura del catálogo ya sirve para decenas de pares. Encontré casos de contenido y de impresión que deben corregirse, y una mejora de organización del CSS aconsejable para mantener el proyecto. No encontré motivo para sustituir Astro ni introducir un backend.

Este es el informe independiente sobre `f4d25ac`, no la especificación del código vigente. Las cinco correcciones se incorporaron en `82f0408`. Después se modularizó el CSS, se separó el visor de fotos de Base y se aisló la resolución de imágenes del catálogo. La comparación de 33 vistas no encontró diferencias de dimensiones ni estilos calculados; las 15 pruebas de navegador pasaron. [Diseño](DISENO.md) y [contenido](CONTENIDO.md) documentan la organización vigente.

## Qué se contrastó

- Instrucciones del usuario: reconstrucción completa, base par-astro, rutas nuevas, Tally intacto, acceso directo a participar, Armarios preparados, fotos autorizadas, contenido escalable, documentación nueva y revisión independiente.
- Documentos vigentes de Drive: principios, nombre y presentación, cómo escribimos, fotos y colaboradoras; skills el-par-docs, el-par-textos y el-par-analisis. Se consultaron las copias de trabajo ya leídas durante esta sesión, sin escribir en Drive ni incorporar respuestas privadas al informe.
- Antecedente: `origin/par-astro`, especialmente portada, colaboración, entrada individual y esquema de contenido. Se usó como comparación, sin convertir sus decisiones antiguas en requisitos.
- Código y páginas reales: inicio, Armario de María, análisis de PAR-0002 y guía, en Chromium; vistas de escritorio y móvil. Se verificó un PDF de la guía recién abierta, sin recorrer previamente sus imágenes.
- Pruebas existentes: revisión de la cobertura y del código de la prueba de crecimiento de 63 pares y de las 14 pruebas de navegador. No se afirma aquí haber repetido todas esas pruebas durante esta auditoría.

## Correcciones encontradas

### 1. La guía puede imprimirse con fotografías ausentes

Prioridad: corregir antes de entregar la guía como imprimible.

Archivo: `sitio/src/pages/guia-de-fotos.astro:166`, con carga diferida en `sitio/src/components/Photo.astro`.

El botón llama directamente a `window.print()`. En una página recién abierta, parte del set sigue sin descargarse. En la reproducción con Chromium, las primeras cuatro fotos estaban cargadas y las posteriores no; el PDF de la segunda página mostraba cajas vacías en las vistas 05 y 06. La prueba existente cambia el medio a impresión y comprueba visibilidad, pero no detecta imágenes pendientes.

Corrección: antes de imprimir desde el botón, activar la carga de las imágenes de la guía y esperar a `decode()`; atender un fallo de carga sin imprimir silenciosamente una guía incompleta. Verificar desde una visita nueva, sin precarga ni scroll. Puede optarse por cargar de inmediato el set de la guía si además se quiere garantizar el recorrido de impresión nativo del navegador.

### 2. El esquema exige datos que una colaboradora puede omitir

Prioridad: corregir para que la siguiente entrada no requiera inventar información.

Archivos: `sitio/src/content.config.ts:40` y `:42`; `sitio/src/pages/pares/[slug].astro`, bloques de cita y marca.

Drive admite no aportar una opinión y trata la marca/modelo como datos conocidos, no obligatorios. `brand` y `quote` eran campos de texto obligatorios; el artículo siempre producía esos bloques. La estructura sirve para los tres envíos actuales, pero no para todos los futuros.

Corrección: hacer opcionales marca y cita; omitir sus bloques cuando no existan. Probar un par sin ambos. Añadir modelo opcional solo si se desea mostrarlo cuando se conozca; no inventarlo para completar una ficha.

### 3. Retirar todos los pares rompe la portada

Prioridad: corregir como caso de mantenimiento y retirada.

Archivo: `sitio/src/pages/index.astro:19` y referencias posteriores a `featured`.

La portada usa `pairs[0]` sin comprobar que existe. Un catálogo temporalmente vacío puede aparecer al retirar los primeros pares o preparar contenido nuevo. Además, el verificador imponía un mínimo de diez documentos HTML, ligado al catálogo inaugural.

Corrección: conservar presentación y participación cuando no hay destacado, y verificar páginas fijas por su presencia, no por un mínimo arbitrario. Incluir el escenario vacío en la prueba de contenido.

### 4. El recorrido documentado para anónimas pierde su agrupación

Prioridad: corregir la documentación y comprobar el caso antes de incorporar una colaboración anónima.

Archivo: `docs/CONTENIDO.md:48`. Código aplicable: `sitio/src/data/wardrobes.ts:10`.

Drive pide crédito anónimo genérico y rastreable para reunir también su armario. La arquitectura ya admite una identidad pública como «Colaboradora 07», sin datos privados. Sin embargo, las instrucciones para añadir contenido hablaban de crear identidad solo para colaboradoras identificadas y de dejar las anónimas sin referencia, por lo que nunca se agruparían.

Corrección: indicar que las colaboraciones anónimas también tienen una referencia estable y un nombre público genérico cuando corresponda. Añadir una prueba de dos pares con esa identidad; no añadir personas ficticias al catálogo real.

### 5. Las imágenes de compartir deben corresponder al par

Prioridad: corregir antes de difundir los análisis.

Archivo: `sitio/src/layouts/Base.astro:18` y su uso desde la página de análisis.

La imagen Open Graph por defecto era PAR-0003 en todas las páginas, incluidos PAR-0002 y PAR-0004. Al compartir un análisis aparecía otro zapato.

Corrección: pasar la foto principal de cada par a Base y elegir una del armario para su página. La imagen de marca de las páginas generales puede seguir siendo común mientras sea una decisión explícita.

Estas observaciones se entregaron durante la revisión al agente principal, que está incorporando las correcciones. No describen necesariamente el estado del último commit posterior a `f4d25ac`.

## Modularidad y crecimiento

Los textos están en JSON independientes bajo `src/content/pares/`, validados por Content Collections. `pairs.ts` carga y ordena; no contiene una lista de textos escrita a mano. Las colaboradoras se definen una vez y los armarios agrupan las referencias automáticamente. La página dinámica de armario muestra nombre, contador y tarjetas, sin biografía ni copy que editar al llegar el cuarto par. Esto cumple la última instrucción del usuario.

La prueba de crecimiento usa una copia temporal, genera 60 entradas adicionales y comprueba páginas y agrupaciones. También rechaza referencias inexistentes y rutas duplicadas. Tiene sentido para esta arquitectura; no introduce ejemplos públicos. El trabajo editorial de escribir cada análisis sigue siendo manual y es compatible con escalar a decenas de zapatos. Un CMS o una integración con la hoja serían decisiones posteriores, no requisitos para esta reconstrucción.

Hay separación útil entre contenido, consultas, rutas y componentes compartidos. Header, Footer, PairCard, Photo, RichText, Term e Invitation evitan duplicar comportamientos importantes. No hace falta una capa adicional de servicios ni estado global en el navegador.

Mejoras pequeñas aconsejables: mover la función exclusiva del set de la guía fuera del módulo del catálogo; hacer que los estilos y los comportamientos de cada componente tengan un propietario claro. Base puede seguir alojando un gestor común de ampliación, pero conviene encapsularlo en un componente si empieza a crecer. Estas mejoras no justifican introducir una arquitectura más pesada.

## CSS propio frente a Tailwind

El archivo auditado tiene 2.012 líneas y 36,5 KB de fuente. El tamaño o el número de líneas, por sí solos, no hacen incorrecto el CSS. Se observan variables de diseño, clases comprensibles, poca especificidad, reglas de movimiento reducido y adaptaciones de móvil. No se encontró un fallo visual atribuible a haber elegido CSS propio.

El problema de mantenimiento es reunir en `global.css` las reglas de cabecera, portada, análisis, colaboración, guía, glosario y armarios; después vienen breakpoints generales, impresión y nuevos bloques de armarios. Para modificar una página hay que seguir reglas separadas por cientos de líneas. Base carga todas esas reglas en todas las páginas y una modificación puede afectar a otra superficie.

Para este proyecto mantendría CSS propio y cambiaría su organización:

- Global: variables, normalización, tipografía base y utilidades compartidas realmente usadas.
- Componentes: estilos de Header, Footer, PairCard, Photo/zoom, Term e Invitation junto a sus componentes, preferiblemente con el alcance de Astro.
- Páginas o familias: portada, análisis, colaboración/guía, armarios y páginas informativas, con sus breakpoints cerca de sus reglas.
- Impresión: mantenerla con la guía o en una hoja identificada, comprobando que el orden de cascada no altera el resultado.

Tailwind ofrecería una escala común, variantes responsive y menos necesidad de inventar nombres para reglas sencillas. También añade configuración y traslada muchas decisiones de estilo al marcado; las composiciones editoriales, recortes, popovers e impresión seguirían necesitando diseño y reglas específicas. No crea por sí solo límites de responsabilidad ni evita duplicar patrones. En una aplicación con muchas pantallas de formularios y componentes repetitivos su ventaja podría ser mayor; aquí hay pocas familias de página con dirección visual propia.

Por tanto, CSS propio es una decisión defendible. Pasar ahora a Tailwind generaría una reescritura y riesgo de regresión sin resolver un requisito pendiente del producto. Modularizar el CSS actual aporta el beneficio inmediato buscado, con comprobaciones visuales antes y después. No conviene fragmentarlo en decenas de archivos sin un propietario claro.

## Documentación y repositorio

La limpieza responde al encargo: los antiguos ESTADO, tareas técnicas, prototipos y skills de Stitch ya no se presentan como vigentes. Los antecedentes permanecen en Git. La base de la rama coincide con `origin/par-astro` y los cambios están separados en commits con propósito concreto.

README permite ejecutar y comprobar; CONTENIDO explica altas y agrupación; DISENO fija decisiones visuales; FOTOGRAFIAS identifica procedencia y tratamiento; LANZAMIENTO separa funcionamiento de publicación; IMAGENES-PENDIENTES conserva la decisión de almacenamiento abierta. Es una documentación razonablemente pequeña y útil, sin recrear un tablero paralelo.

Al incorporar las correcciones, actualizar las instrucciones de contenido y la cobertura descrita en REVISION. Añadir a DISENO dónde se encuentran los estilos globales, de componentes y de páginas si se modularizan. Mantener capturas alineadas con el código final. El informe y las capturas facilitan revisión, pero no prueban por sí solos que una colaboradora haya aprobado su texto.

El procesamiento de nuevas fotografías sigue descrito como procedimiento, no como un comando reproducible del repositorio. Es coherente que la arquitectura de imágenes esté pendiente; al decidirla, conviene añadir el comando o flujo que genere variantes y quite EXIF. No dar por definitivo WebP ni almacenamiento en Git mientras el usuario los tiene abiertos. Si se elige R2 u otro origen externo, además de mover los archivos hay que adaptar `pairImage` y la política `img-src` de `_headers`, actualmente limitada a self. Photo ya acepta una base de imagen como string, pero la resolución del catálogo aún construye rutas locales.

## Cumplimientos relevantes

- El Tally autorizado permanece como enlace directo; la guía y la explicación son opcionales, frente al recorrido previo que enviaba primero a la guía.
- Marca y lema coinciden con Drive. Los términos descartados del enfoque anterior no se usan como presentación pública.
- Las rutas se han rediseñado y no se conservan nombres antiguos como obligación.
- La guía usa las seis vistas de PAR-0003 y distingue el detalle ampliado; la ilustración de tacones se conserva y etiqueta por instrucción expresa del usuario.
- Los tres pares de María tienen análisis individuales y su armario es una página de tarjetas enlazadas que crece con el contenido.
- No se deduce composición, fabricación interior ni comodidad en el esquema y textos examinados; las opiniones aparecen atribuidas.
- Imágenes locales, fuentes locales, HTML estático y poca interacción permiten un despliegue sencillo en Cloudflare Pages.
- La indexación se mantiene desactivada hasta el lanzamiento; los análisis y condiciones legales siguen distinguidos como pendientes de revisión.
- Teclado, ampliación con devolución de foco, navegación móvil, reducción de movimiento y pruebas automatizadas aportan una base de accesibilidad útil. Las pruebas automatizadas no equivalen a certificación completa.

No hay un incumplimiento de dirección que exija rehacer de nuevo el producto. Antes de cerrar, corregir los casos encontrados, reorganizar el CSS y repetir únicamente las pruebas y vistas afectadas.
