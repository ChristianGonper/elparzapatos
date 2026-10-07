# Diseño de la nueva web

La fotografía abre cada tema; el texto enseña qué mirar. Se combinan superficies crema, burdeos y rosa suave sin alterar el color de las fotos. Los diseños responden al contenido de cada página, sin una proporción de columnas heredada.

| Color | Uso |
| --- | --- |
| #FAF7F2 | Fondo principal |
| #F0E9E0 | Superficies de apoyo |
| #292521 | Texto |
| #6B625C | Texto secundario |
| #5C2635 | Botones, detalles y bloque destacado |
| #EEDFda | Invitación a participar |
| #D8CDC1 | Separadores |

Newsreader para titulares; DM Sans para cuerpo, navegación y etiquetas. Ambas se distribuyen con sus paquetes Fontsource, con licencia abierta y sin petición a Google Fonts desde el navegador.

La marca tipográfica funciona sin esperar a un símbolo definitivo. Los botones principales abren el Tally existente. Una sola escala de espaciado, tamaños fluidos, lectura de unas 45–60 letras por línea y fotos ampliables. Las transiciones son breves y se desactivan con la preferencia de reducir movimiento.

Menú móvil nativo; desplegables de dudas y guía con details; definiciones con popover; ampliación con dialog y devolución de foco al cerrar. No hay carruseles automáticos ni contenido que necesite JavaScript para leerse.

## Experimento del 7 de octubre

La portada abre con el último par publicado; el lema tiene menor tamaño y se presenta después. En revisión sin publicaciones se usa el primer borrador como muestra. Los detalles de los artículos tienen fotos a la izquierda en escritorio por defecto, con `imageSide="right"` disponible. En móvil se ordenan como título, foto y texto.

El visor permite ver la foto completa o acercarla hasta 2,5 veces, sin superar la resolución del archivo. Admite desplazamiento táctil nativo, arrastre con ratón, teclado, cierre y recuperación del foco. Las fotos de la entrada conservan una anchura legible; no se reducen artificialmente para simular una ampliación.

Pares y armarios permiten compartir con el menú del dispositivo cuando está disponible y copiar el enlace, con alternativa manual si el portapapeles falla. El resumen de siete vistas enlaza a cada ejemplo de la guía y aparece también al principio de colaboración. La ilustración de tacones se conserva como excepción temporal acordada, hasta tener un set adecuado.

## CSS y responsabilidades

Se mantiene CSS propio. Esta interfaz tiene composiciones editoriales, recortes de fotografía, popovers e impresión que necesitan reglas específicas. Tailwind aportaría utilidades y una escala común, pero exigiría reescribir el marcado sin resolver por sí mismo la propiedad de cada estilo. La escala ya está definida mediante variables compartidas; modularizar aporta aquí más que cambiar de framework.

`src/styles/index.css` declara el orden de las hojas. `global.css` contiene variables, normalización, tipografía y utilidades comunes; `components/` contiene cabecera, pie, invitación, tarjetas y ayudas/ampliación; `pages/` contiene las familias de portada, catálogo/armarios, análisis, colaboración, guía e información. Cada familia conserva sus reglas responsive junto a sus reglas base. `print.css` reúne las excepciones de impresión y se importa al final.

Las clases de componentes y páginas usan nombres propios. El alcance permanece explícito por nombres, para que los contenedores editoriales puedan componer Photo y otros componentes sin depender de atributos internos de Astro. No se añaden resets ni estilos genéricos en hojas de página. Las reglas compartidas se cambian en su propietario, no copiándolas en otra página.

Las hojas se agregan en una entrada común para mantener una cascada controlada. No se afirma que se estén cargando solo los estilos de cada ruta. Se comparan estilos calculados y vistas de móvil/escritorio al cambiar esta organización.
