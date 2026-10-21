# Diseño de la nueva web

La fotografía abre cada tema; el texto enseña qué mirar. La paleta es papel y tinta: casi monocroma, como una revista impresa, para que el color lo pongan las fotos. Los diseños responden al contenido de cada página, sin una proporción de columnas heredada.

| Variable | Color | Uso |
| --- | --- | --- |
| `--paper` | #F6F5F1 | Fondo principal |
| `--surface` | #EAE8E3 | Superficies de apoyo y avisos |
| `--ink` | #121212 | Texto |
| `--muted` | #5A5955 | Texto secundario |
| `--accent` | #121212 | Botones, enlaces destacados, foco y bloque destacado |
| `--accent-hover` | #3A3A38 | Botones al pasar el ratón |
| `--tint` | #E4E2DC | Invitación a participar y selección |
| `--line` | #D3D0C9 | Separadores |
| `--white` | #FFFFFF | Paneles y definiciones |

El texto normal y el secundario cumplen contraste AA sobre todos los fondos (el secundario, como mínimo 5,4:1 sobre `--tint`). El visor de fotos usa un fondo casi negro neutro.

Instrument Serif para titulares y citas; Instrument Sans (variable) para cuerpo, navegación y etiquetas. Instrument Serif solo tiene peso normal y su cursiva, así que los títulos no usan negrita; es estrecha, y su tamaño se compensa con las variables de escala. Ambas se distribuyen con sus paquetes Fontsource, con licencia abierta y sin petición a Google Fonts desde el navegador.

La marca es tipográfica: «El Par» en versalitas espaciadas de Instrument Serif, con «Zapatos en detalle» debajo, en la cabecera y en el pie. El favicon (`public/favicon.svg`) y el icono de inicio de iOS (`public/apple-touch-icon.png`, 180 px) son una «P» de Instrument Serif en papel sobre tinta, trazada como forma para no depender de fuentes. Los botones principales («Manda tu par») llevan a Cómo colaborar; de ahí, «Qué fotos hacer» lleva a la guía, y solo su final abre el Tally existente con «Enviar mis fotos». Una sola escala de espaciado, texto base de 18 px (el resto de tamaños en rem crece con él), títulos en una escala media regulada por `--hs1`, `--hs2` y `--hs3` en `global.css`, tamaños fluidos, lectura de unas 45–60 letras por línea y fotos ampliables. Las transiciones son breves y se desactivan con la preferencia de reducir movimiento.

Menú móvil nativo; desplegables de dudas y guía con details; definiciones con popover (en escritorio se abren al pasar el ratón o al llegar con el teclado, junto a la palabra; en el móvil, con un toque, y se cierran con otro toque, tocando fuera o con Esc; sin JavaScript, con el popover nativo); ampliación con PhotoSwipe y devolución de foco al cerrar. No hay carruseles automáticos ni contenido que necesite JavaScript para leerse.

## Experimento del 7 de octubre

La portada abre con el último par publicado; el lema se presenta después, al mismo tamaño y nivel que «Hay mucho que mirar». El destacado ya no lleva «Fotos de…» (el crédito está en el par) y «Ver todos los pares», en botón, cierra la sección «En qué nos fijamos». En revisión sin publicaciones se usa el primer borrador como muestra. Los detalles de los artículos tienen fotos a la izquierda en escritorio por defecto, con `imageSide="right"` disponible. En móvil se ordenan como título, foto y texto.

El visor es PhotoSwipe 5. Cada foto ampliable es un enlace a su versión grande (WebP de hasta 1600 px): se abre pulsando en cualquier punto de la foto, sin botón aparte, y sin JavaScript el enlace abre la imagen. Arranca con la foto entera sobre fondo oscuro, sin marco, y con su pie; se acerca con un clic o la rueda en escritorio y con los dedos en el móvil, sin superar la resolución del archivo. Se cierra con el gesto, Esc o el botón, y devuelve el foco a la foto. Las fotos de la entrada conservan una anchura legible; no se reducen artificialmente para simular una ampliación.

En Armarios, cada tarjeta enseña dos pares. Si la colaboradora tiene más, hasta dos de ellos asoman en abanico detrás del segundo, girados y con una sombra suave; el segundo se reduce al 76 % para dejarles sitio, y el abanico cabe entero en su hueco, también en el móvil. No hay etiqueta «+N»: el número total ya se lee en «N pares», dentro del enlace.

Pares y armarios ofrecen solo «Copiar enlace», igual en el móvil y en el ordenador: copia la dirección y avisa «Enlace copiado» unos segundos; si el portapapeles falla, enseña el enlace seleccionado para copiarlo a mano. Ya no se usa el menú de compartir del dispositivo. La guía muestra las siete vistas en una sola cuadrícula: tres por fila en escritorio, con el detalle en una fila propia, y en el móvil una columna en la que cada vista enseña la foto y después su texto; cada vista conserva su ancla (`#vista-01` … `#vista-07`) para enlazarla directamente, por ejemplo al pedir una foto que falta. En Cómo colaborar, bajo la entrada, una lista de tres ideas («Con el móvil», «Tantos pares como quieras», «Lo lees antes que nadie») se lee en la letra de los títulos, en tres columnas separadas por un filete; en el móvil, una debajo de otra. Cómo colaborar y la guía tienen un único llamado principal, al final de la página, y no muestran «Manda tu par» en la cabecera. Arriba, junto a la entradilla, ofrecen un acceso secundario a Tally para quien ya tiene las fotos (`QuickSend`). La guía ya no lleva la ilustración de tacones ni el aviso «¿Son tacones?»: la guía de tacones vuelve cuando haya fotos de un par de tacón de una colaboradora; mientras, la vista de frente tiene una línea para los tacones.

## Textos y estructura (bloque 6)

Cada página tiene un trabajo y cada final habla de lo que se acaba de ver. La invitación es un solo componente (`Invitation`) con su contenido en `src/data/invitations.ts`: la común («El siguiente puede ser el tuyo») queda solo en Qué es El Par; cada par lleva la suya («¿Y las tuyas?», del campo `invitation` o la genérica); Armarios y cada armario, «¿Empezamos el tuyo?»; Cómo colaborar, «Siguiente paso», con la foto de perfil de las bailarinas de María a la izquierda y el título y el texto a su lado (en el móvil, la foto entre el título y el texto); la guía, «Último paso» hacia Tally. Pares ya no lleva invitación: su aside ya invita.

La portada se ordena así: destacado; lema; «En qué nos fijamos», tres detalles (foto, rasgo como etiqueta, título y frase) con «Leer el análisis» si salen de un par, sin enlace si son fotos de ejemplo; «Lo último que hemos mirado», las tarjetas de Pares, desde 5 pares, con «Seguir mirando»; Armarios, con un armario como antes (dos fotos y su enlace) y con más, hasta tres abanicos (`WardrobeFan`, el mismo abanico de Armarios con el primer par delante) y «Ver los armarios»; y el final propio, «¿Nos enseñas tus zapatos?», sobre el fondo de la invitación, con los cuatro grupos de zapatos: la foto de su último par y «N pares», o una foto de ejemplo y «Aún no hay ninguno. ¿Tienes unos?». Los umbrales están en `src/data/home.ts` y se explican en CONTENIDO.

Qué es El Par abre con la marca tal como va en la cabecera, en grande (versalitas espaciadas y «Zapatos en detalle» debajo), y dos bloques con la misma composición, título a la izquierda y texto a la derecha: «Qué hacemos» y «Qué nos hace distintos», con cuatro puntos y, debajo, la nota sobre cómo tratamos las fotos. Cada armario lleva una línea bajo el título y, centrado bajo las tarjetas, un botón con borde.

## Interacción y movimiento (bloque 7)

Elegido en el laboratorio del bloque 7 (combinación N3 · E2 · R4 · D3 · V2 · F3 · L3) y ya sin variantes:

- **Entre páginas**: navegación sin recarga con el enrutador de Astro. La foto de la tarjeta pulsada crece hasta ser la foto grande del retrato, y vuelve al volver; el resto cambia con un fundido corto y la cabecera no se mueve. El visor, el glosario, compartir y el menú se preparan otra vez tras cada navegación (`src/scripts/cada-pagina.ts`).
- **Al aparecer**: fotos y tarjetas que están por debajo de la pantalla llegan con un fundido y una subida corta (`src/scripts/movimiento.ts`).
- **Al pasar el ratón**: los enlaces de texto tienen una línea tenue y la línea entera se dibuja de izquierda a derecha; en las tarjetas, también bajo «Leer a fondo».
- **Marcas sobre la foto**: círculo, flecha o recuadro al leer cada detalle (ver CONTENIDO.md).
- **Visor**: la foto crece desde su miniatura y vuelve a ella al cerrar. Las definiciones del glosario aparecen con un fundido, sin botón de cerrar: con el ratón se cierran al quitarlo; tocadas, al tocar fuera; con el teclado, al salir de la palabra o con Esc.
- **Frase de la colaboradora**: al margen del primer detalle, en Instrument Serif grande (de 2,1 a 2,6 rem, unos 38 px en el móvil y 47 px en ordenador).
- **Lectura**: en los retratos, una línea fina arriba con un tramo por detalle que se llena al leer.

Con «reducir movimiento» no hay animación ninguna. Todo vive en `src/styles/components/motion.css`, `src/scripts/movimiento.ts`, `Term.astro` y `PhotoViewer.astro`.

## Direcciones visuales (bloque 9)

Cuatro maneras de vestir la misma web, para comparar con la actual. Solo existen en la vista de revisión (`npm run build:review` y `npm run dev`): en la compilación normal, `@direcciones` es `components/Empty.astro` y no llegan ni el selector, ni los estilos, ni las fuentes, ni el script. Los textos, el marcado y las páginas son los mismos; cada dirección es una hoja en `src/direcciones/estilos/` con todas sus reglas bajo `html[data-dir='…']`, que cambia variables (papel, líneas, familias, escala de títulos `--hs1/2/3`) y la composición de cada componente.

- **Revista** (`revista`): revista impresa. Cabecera de periódico con la marca centrada y la navegación entre filetes, rejilla con filetes de tinta entre columnas y secciones, titulares en Fraunces, capitular en cada detalle, «De un vistazo» como tabla entre filetes.
- **Archivo** (`archivo`): archivo de museo. Cada par es una ficha blanca con su referencia (PAR-0002) sobre papel gris de archivo, fotos sobre paspartú, detalles numerados, «De un vistazo» como ficha técnica en casillas; IBM Plex Sans y, para todo lo que es dato, IBM Plex Mono.
- **Galería** (`galeria`): galería mínima. Fotos a sangre (el destacado de la portada, la foto principal del retrato, las rejillas de pares), texto pequeño de cartela, botones en cápsula y casi ninguna línea; una sola familia, Inter Tight.
- **Cuaderno** (`cuaderno`): cuaderno de diseñadora. Papel punteado, fotos pegadas con cinta y algo torcidas, notas a mano en Caveat, subrayado de rotulador bajo la cursiva de los títulos, la frase de la colaboradora escrita a mano y «De un vistazo» como nota adhesiva.

Cómo se cambia: `?dir=revista` (o `archivo`, `galeria`, `cuaderno`) en cualquier dirección de la vista de revisión; se guarda en el navegador (`localStorage`, clave `elpar-direccion`) y sigue al navegar. `?dir=actual` vuelve a la web actual. También con el botón «Dirección», abajo a la izquierda, que deja la elegida en la barra de direcciones para copiarla.

Cómo funciona: `src/direcciones/publico/aplicar.js` se copia a `/direcciones/aplicar.js` (archivo propio, sin script en línea, por la CSP) y se carga en `<head>` antes de pintar; pone `data-dir` en `<html>` y lo vuelve a poner en cada página nueva antes del cambio de las transiciones (`astro:before-swap`). La referencia de las fichas de «Archivo» sale de `data-ref` en `PairCard.astro`, que solo se escribe en la vista de revisión.

Componentes de terceros: los bordes «a mano» y la sombra de los botones de «Cuaderno» vienen de PaperCSS (https://github.com/papercss/papercss, licencia ISC), copiados y adaptados de Sass a variables CSS en `src/direcciones/estilos/terceros/papercss-bordes.css`, con su aviso de licencia. Las fuentes nuevas (Fraunces, IBM Plex Sans, IBM Plex Mono, Inter Tight y Caveat, todas con licencia SIL Open Font License) se sirven desde el propio sitio con Fontsource, como Instrument Serif e Instrument Sans.

## CSS y responsabilidades

Se mantiene CSS propio. Esta interfaz tiene composiciones editoriales, recortes de fotografía, popovers e impresión que necesitan reglas específicas. Tailwind aportaría utilidades y una escala común, pero exigiría reescribir el marcado sin resolver por sí mismo la propiedad de cada estilo. La escala ya está definida mediante variables compartidas; modularizar aporta aquí más que cambiar de framework.

`src/styles/index.css` declara el orden de las hojas. `global.css` contiene variables, normalización, tipografía y utilidades comunes; `components/` contiene cabecera, pie, invitación, tarjetas y ayudas/ampliación; `pages/` contiene las familias de portada, catálogo/armarios, análisis, colaboración, guía e información. Cada familia conserva sus reglas responsive junto a sus reglas base. `print.css` reúne las excepciones de impresión y se importa al final.

Las clases de componentes y páginas usan nombres propios. El alcance permanece explícito por nombres, para que los contenedores editoriales puedan componer Photo y otros componentes sin depender de atributos internos de Astro. No se añaden resets ni estilos genéricos en hojas de página. Las reglas compartidas se cambian en su propietario, no copiándolas en otra página.

Las hojas se agregan en una entrada común para mantener una cascada controlada. No se afirma que se estén cargando solo los estilos de cada ruta. Se comparan estilos calculados y vistas de móvil/escritorio al cambiar esta organización.

## Menos ruido (bloque 5)

Se quitaron filetes y etiquetas que repetían lo que ya separaba el espacio: la línea bajo cada tarjeta de par, las dos líneas alrededor de la cita de la colaboradora, las dos que encerraban «Antes de empezar» en la guía y la que abría el bloque de armarios en la portada. La etiqueta «El Par · Zapatos en detalle» de la guía repetía la cabecera; ahora solo sale al imprimir, donde la cabecera no aparece (clase `print-only`). Los filetes que ordenan listas (pasos, dudas, glosario) se mantienen.

## Aire en ordenador

Desde 1000 px el espacio entre bloques es menor que la proporción del móvil, para que no sobre pantalla vacía en 1280 y 1440; las fotos mantienen su tamaño. `--space` pasa a `clamp(2.8rem, 5.6vw, 5.6rem)` (unos 72 px en 1280 y 81 px en 1440, antes 102 y 115). La cabecera mide 86 px; las entradas de página, la presentación de la portada, la separación entre las fotos de ejemplo y las filas de la guía se acortan; en los análisis, cada detalle queda a `clamp(3.5rem, 5.6vw, 5.6rem)` del siguiente y el título y el comienzo del cuerpo se acercan.
