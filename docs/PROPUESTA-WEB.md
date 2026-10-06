# La nueva web de El Par

6 de octubre de 2026 · Propuesta de trabajo e implementación

## Qué tiene que conseguir

Que alguien llegue por una foto, descubra algo que no había visto en un zapato y piense en un par suyo. La web debe dar ganas de leer, de volver y de participar. Quien colabora debe poder compartir la página de sus zapatos con orgullo.

La prioridad es tu encargo, después los documentos vigentes de Moda-Zapatos y después el repositorio. Se parte de una hoja en blanco también en el repositorio: se retiran prototipos, skills de Stitch, especificaciones y documentos de seguimiento antiguos. El historial de Git conserva el trabajo anterior. Las decisiones de septiembre sobre columnas, fichas técnicas, logo y recorrido dejan de condicionar la nueva web. El formulario y la automatización de Tally se conservan.

## Cómo se verá

Una web editorial con fotos grandes y espacio para mirarlas. Fondo crema, texto oscuro, burdeos para acciones y bloques destacados, y rosa suave para invitar a participar. El color no teñirá las fotos. Newsreader para titulares y DM Sans para lectura y navegación, alojadas en la propia web. Una marca tipográfica «El Par» sustituye al logo provisional sin cerrar el diseño de un futuro símbolo.

Habrá ritmo entre fotos, texto y detalles. Las secciones se adaptarán al contenido; no habrá una distribución fija de 7/5 columnas. En móvil, la foto y su explicación se leerán seguidas. La interfaz responderá con transiciones discretas, respetando la preferencia de reducir movimiento.

Referencias revisadas el 6/10, como orientación y sin copiar diseños ni imágenes:

- [Aeyde](https://www.aeyde.com/): protagonismo de la fotografía y separación entre contenido y navegación.
- [Dear Frances](https://dearfrances.com/): imágenes amplias y cabecera sobria que deja respirar al contenido.
- [The Gentlewoman](https://thegentlewoman.co.uk/library): relación clara entre foto, título y lectura; biblioteca fácil de recorrer.

## Las páginas

| Página | Para qué sirve |
| --- | --- |
| Inicio | Presentar la idea con el lema aprobado, destacar un par y dar acceso inmediato al envío de fotos. |
| Pares | Reunir los análisis disponibles. Sin tarjetas inventadas para llenar el diseño. |
| Armarios | Reunir los pares de cada colaboradora, a partir de dos análisis, con una página que pueda compartir. |
| Cada par | Contar todo lo relevante, con cada explicación junto a la foto que la demuestra. |
| Cómo colaborar | Invitar, mostrar ejemplos, explicar las fotos y las condiciones, y abrir Tally directamente. |
| Guía de fotos | Una guía visual que se puede guardar y consultar mientras se fotografía. También se podrá imprimir. |
| Qué es El Par | La presentación aprobada, cómo se mira un par y contacto. |
| Glosario | Definiciones breves que apoyan los análisis; un único contenido compartido con las ayudas contextuales. |
| Tus fotos y tus datos | Explicar con claridad los usos autorizados, el crédito, la revisión y la retirada. No simula una política legal definitiva. |
| Página no encontrada | Recuperar el camino hacia los pares o el inicio. |

No añado una newsletter, tienda, perfiles vacíos ni testimonios inventados. Armarios tendrá su índice y páginas por colaboradora. Se mostrarán únicamente cuando haya al menos dos análisis preparados de una misma persona. No se diseñará la automatización de datos que Drive mantiene pendiente.

## Participar sin dar vueltas

La cabecera y la portada tendrán «Enviar mis fotos», que abre el mismo Tally actual. Junto al botón se dirá lo esencial: haces las fotos con el móvil; no envías los zapatos. Quien quiera orientarse tendrá «Cómo colaborar». Las instrucciones no serán pantallas obligatorias antes del formulario.

La página de colaboración reunirá lo que ahora está disperso. Primero explica qué se envía y qué se prepara con ello. Después muestra ejemplos, una guía corta y respuestas a las dudas: crédito a elección, solo zapatos, revisión de 48 horas y posibilidad de retirada. El acceso al formulario estará también al principio y al final.

## Fotografías y primer análisis

PAR-0003 será el primer análisis de muestra: las bailarinas de rejilla de María, marca Zara según su envío. Su crédito autorizado es «María», sin Instagram. Se utilizarán las seis fotos, sin edición generativa ni eliminación de marcas de uso. Las conversiones para la web solo reducirán tamaño y eliminarán metadatos personales.

La guía de bailarinas usará ese set completo. El séptimo ejemplo, el detalle, será una ampliación claramente indicada de una de esas fotos, no una toma inexistente. Las ilustraciones de tacones que ya hay se conservarán en la guía, identificadas como generadas con IA. Las fotos de Sonia mostrarán la variedad de zapatos que pueden encajar, sin presentarlas como análisis ya publicados ni dar por aprobados sus créditos.

El primer análisis tendrá una entradilla breve, secciones por rasgos visibles, la frase exacta de María atribuida y «De un vistazo» al final. No habrá medidas, inferencias de fabricación o afirmaciones sobre comodidad. El orden de secciones es una propuesta aplicada a este par, no una plantilla obligatoria.

El análisis se prepara como borrador para revisión de María antes del lanzamiento. La web se termina y se comprueba en local; esto no envía mensajes ni publica nada en internet.

## Definiciones

Primero se explica la palabra en su frase. Además, los términos relevantes tendrán una ayuda que se puede abrir con ratón, teclado o dedo. El glosario será corto, organizado alfabéticamente y enlazable por término. Así se puede consultar sin convertir cada análisis en una clase ni crear páginas vacías para conceptos todavía no usados.

## Cómo se construye

Astro generará HTML estático. Componentes comunes para cabecera, pie, imágenes, invitación a colaborar y ayudas de vocabulario. CSS propio con variables de color, tamaño y separación. TypeScript para los datos y las interacciones pequeñas. El contenido público estará separado de las fuentes privadas de trabajo.

Para la vista de trabajo se preparan WebP de varios tamaños, con dimensiones declaradas y carga diferida salvo la foto principal. El alojamiento y los formatos definitivos siguen pendientes; las opciones están en [Imágenes publicadas](IMAGENES-PENDIENTES.md). Fuentes locales, sin Tailwind por CDN ni servicios de analítica. No habrá una conexión del navegador a Drive ni datos privados en el repositorio.

Los commits seguirán git-atomic-commits: español, presente, menos de 72 caracteres, sin prefijos, una unidad lógica completa por commit y documentación junto a cada cambio. Rama: `reconstruccion/el-par-desde-par-astro`, creada desde `origin/par-astro` en el commit `67b5951`.

## Despliegue

[Cloudflare Pages sigue admitiendo Astro estático](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/). Para esta web, sin backend propio y con Tally externo, sigue siendo adecuado. Prepararé `npm run build`, salida `dist`, rutas nuevas y cabeceras de seguridad. No necesita un adaptador de servidor.

Cloudflare recomienda Workers para aplicaciones nuevas con funciones de servidor. Eso no obliga a incorporar un servidor aquí; el resultado estático también permite migrar a Workers Static Assets en el futuro. La decisión final de dominio y cuenta puede esperar sin rehacer la web.

## Qué se comprobará

Compilación y tipos; todos los enlaces internos y las imágenes; recorrido directo a Tally; menú móvil; ayudas de términos; ampliación de fotos; guía imprimible; lectura con teclado; contraste; vistas de 360, 390, 768 y 1440 píxeles; ausencia de desbordamientos y de datos privados. Se revisarán capturas de las páginas, no solo el código.

## Decisiones para el lanzamiento, acumuladas

Se puede completar la web sin resolverlas ahora:

- Dominio y acceso a la cuenta de Cloudflare para publicar.
- Revisión del análisis de PAR-0003 por María antes de hacerlo público.
- Confirmar el cambio a @elparzapatos antes de activar ese enlace como canal disponible.
- Completar los datos del responsable y revisar los textos legales antes del lanzamiento. El sitio no inventará esos datos.
- Elegir dónde se guardan las imágenes publicadas y su formato definitivo.
- Valorar un símbolo de marca definitivo después de ver la web; la marca tipográfica funciona desde el primer día.
