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

La portada abre con el último par publicado; el lema se presenta después, al mismo tamaño y nivel que «Hay mucho que mirar». Bajo el destacado, «Ver todos los pares» es un botón. En revisión sin publicaciones se usa el primer borrador como muestra. Los detalles de los artículos tienen fotos a la izquierda en escritorio por defecto, con `imageSide="right"` disponible. En móvil se ordenan como título, foto y texto.

El visor es PhotoSwipe 5. Cada foto ampliable es un enlace a su versión grande (WebP de hasta 1600 px): se abre pulsando en cualquier punto de la foto, sin botón aparte, y sin JavaScript el enlace abre la imagen. Arranca con la foto entera sobre fondo oscuro, sin marco, y con su pie; se acerca con un clic o la rueda en escritorio y con los dedos en el móvil, sin superar la resolución del archivo. Se cierra con el gesto, Esc o el botón, y devuelve el foco a la foto. Las fotos de la entrada conservan una anchura legible; no se reducen artificialmente para simular una ampliación.

En Armarios, cada tarjeta enseña dos pares. Si la colaboradora tiene más, hasta dos de ellos asoman en abanico detrás del segundo, girados y con una sombra suave; el segundo se reduce al 76 % para dejarles sitio, y el abanico cabe entero en su hueco, también en el móvil. No hay etiqueta «+N»: el número total ya se lee en «N pares», dentro del enlace.

Pares y armarios permiten compartir con el menú del dispositivo cuando está disponible y copiar el enlace, con alternativa manual si el portapapeles falla. La guía muestra las siete vistas en una sola cuadrícula: tres por fila en escritorio, con el detalle en una fila propia, y en el móvil una columna en la que cada vista enseña la foto y después su texto; cada vista conserva su ancla (`#vista-01` … `#vista-07`) para enlazarla directamente, por ejemplo al pedir una foto que falta. En Cómo colaborar, bajo la entrada, una lista de tres ideas («Con el móvil, en casa», «Tú eliges cómo apareces», «Lo lees antes de publicarlo») se lee en la letra de los títulos, en tres columnas separadas por un filete; en el móvil, una debajo de otra. Cómo colaborar y la guía tienen un único llamado principal, al final de la página, y no muestran «Manda tu par» en la cabecera. Arriba, junto a la entradilla, ofrecen un acceso secundario a Tally para quien ya tiene las fotos (`QuickSend`). La ilustración de tacones se conserva como excepción temporal acordada, hasta tener un set adecuado.

## CSS y responsabilidades

Se mantiene CSS propio. Esta interfaz tiene composiciones editoriales, recortes de fotografía, popovers e impresión que necesitan reglas específicas. Tailwind aportaría utilidades y una escala común, pero exigiría reescribir el marcado sin resolver por sí mismo la propiedad de cada estilo. La escala ya está definida mediante variables compartidas; modularizar aporta aquí más que cambiar de framework.

`src/styles/index.css` declara el orden de las hojas. `global.css` contiene variables, normalización, tipografía y utilidades comunes; `components/` contiene cabecera, pie, invitación, tarjetas y ayudas/ampliación; `pages/` contiene las familias de portada, catálogo/armarios, análisis, colaboración, guía e información. Cada familia conserva sus reglas responsive junto a sus reglas base. `print.css` reúne las excepciones de impresión y se importa al final.

Las clases de componentes y páginas usan nombres propios. El alcance permanece explícito por nombres, para que los contenedores editoriales puedan componer Photo y otros componentes sin depender de atributos internos de Astro. No se añaden resets ni estilos genéricos en hojas de página. Las reglas compartidas se cambian en su propietario, no copiándolas en otra página.

Las hojas se agregan en una entrada común para mantener una cascada controlada. No se afirma que se estén cargando solo los estilos de cada ruta. Se comparan estilos calculados y vistas de móvil/escritorio al cambiar esta organización.

## Menos ruido (bloque 5)

Se quitaron filetes y etiquetas que repetían lo que ya separaba el espacio: la línea bajo cada tarjeta de par, las dos líneas alrededor de la cita de la colaboradora, las dos que encerraban «Antes de empezar» en la guía y la que abría el bloque de armarios en la portada. La etiqueta «El Par · Zapatos en detalle» de la guía repetía la cabecera; ahora solo sale al imprimir, donde la cabecera no aparece (clase `print-only`). Los filetes que ordenan listas (pasos, dudas, glosario) se mantienen.
