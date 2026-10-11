# Contenido y revisión

Drive → Moda-Zapatos es la fuente de marca y copy. Fuentes vigentes consultadas el 6 de octubre de 2026: README, principios, nombre-y-presentacion, como-escribimos, fotos-y-colaboradoras y tareas.
## Armarios

El índice y las páginas individuales se generan agrupando las entradas por su referencia a una colaboradora. Armario de María reúne ahora los tres retratos preparados y crece automáticamente al añadir otro. Muestra nombre, número de pares y tarjetas enlazadas a los retratos. Menos de dos pares no produce página de armario. Bajo el título va una línea con el número de pares en letra hasta diez («Tres pares de María. Míralos juntos y fíjate en lo que se repite.»), o el texto propio del campo opcional `wardrobeIntro` de la colaboradora, escrito a partir de sus fotos y revisado por ella como sus pares. Bajo las tarjetas, un botón con borde lleva a Pares mientras haya un solo armario; con más, dice «Ver pares de otras colaboradoras» y lleva a Armarios. El crédito, slug y autorización de armario se definen una sola vez en la identidad pública de la colaboradora; nunca se deducen de una hoja privada.

Las personas anónimas se acreditan como «Colaboradora» y un número estable, siempre el mismo, sin inventar identidades de muestra. El número se escribe con dos cifras, con un cero delante si hace falta («Colaboradora 07», «Colaboradora 12»); a partir de 100 lleva tres («Colaboradora 107»). El formato sale de `anonymousCredit` en `sitio/src/data/participation.ts`; el número, del campo `anonymous` de su identidad pública (de 1 a 999).

El número es el de la colaboradora en nuestra lista. Si allí tiene un identificador como `COL-0107`, se usan sus cifras como número entero, sin el prefijo ni los ceros de delante: `COL-0107` → `"anonymous": 107` → «Colaboradora 107»; `COL-0007` → `"anonymous": 7` → «Colaboradora 07». Se copia a mano al crear su archivo; la web no lee la lista.

## «Retrato», no «análisis» (bloque 7)

Desde el 11/10, lo que escribimos de cada par se llama «retrato» en todo texto visible. Las rutas no cambian (`/pares/[slug]/`) y en el código los componentes siguen llamándose `Analysis…`. `npm run verify` falla si «análisis» aparece en el texto de una página o en sus atributos legibles (alt, aria-label, title, descripciones). Cambios hechos:

| Dónde | Antes | Ahora |
| --- | --- | --- |
| Portada, «En qué nos fijamos» | Leer el análisis | Leer el retrato |
| Pares, descripción para buscadores | Todos los análisis de El Par, … | Todos los retratos de El Par, … |
| Qué es El Par, «Qué hacemos» | Un análisis por par. | Un retrato por par. |
| Qué es El Par, «Tu voz y tu armario» | … va en el análisis. | … va en el retrato. |
| Cómo colaborar, foto de María (aria-label) | Leer el análisis del par de María | Leer el retrato del par de María |
| Cómo colaborar, paso 4 | Te mandamos el análisis y tienes 48 horas… | Te mandamos el retrato y tienes 48 horas… |
| Cómo colaborar, «¿Qué se publica?» | El análisis con tus fotos, … | El retrato con tus fotos, … |
| Cómo colaborar, «¿Qué pasa después de enviarlo?» | Preparamos el análisis y te lo mandamos | Preparamos el retrato y te lo mandamos |
| Guía, «Último paso» | Antes de publicarlo te mandamos el análisis. | Antes de publicarlo te mandamos el retrato. |
| Glosario, entradilla | Las palabras de los análisis, … | Las palabras de los retratos, … |
| Tus fotos y tus datos, «Para qué usamos las fotos» | Para el análisis de tu par… | Para el retrato de tu par… |
| Tus fotos y tus datos, «Lo revisas antes de publicarlo» | Te mandamos el análisis y tienes 48 horas… | Te mandamos el retrato y tienes 48 horas… |

El glosario, sus definiciones, la página 404 y los textos de los tres pares no decían «análisis»: no cambian.

Al final de cada retrato, «Más retratos» enseña hasta tres pares (`src/data/related.ts`): primero los otros del mismo armario y, después, los más recientes del catálogo, sin repetir ni incluir el propio. Si no hay otros pares, no sale.

## Nombres y rutas

Las rutas se han decidido para la web nueva:

| Contenido | Ruta |
| --- | --- |
| Inicio | `/` |
| Pares y retratos | `/pares/` y `/pares/[slug]/` |
| Armarios | `/armarios/` y `/armarios/[slug]/` |
| Qué es El Par | `/el-par/` |
| Cómo colaborar | `/participa/` |
| Guía de fotos | `/guia-de-fotos/` |
| Glosario | `/glosario/` |
| Uso de fotos y datos | `/tus-fotos-y-tus-datos/` |

## Redactar y revisar en local

Los retratos viven en `sitio/src/content/pares/`, un archivo MDX por par. La cabecera (frontmatter) contiene los datos de catálogo y permisos; el cuerpo es Markdown con bloques editoriales. Las identidades públicas, mucho más pequeñas, siguen en JSON en `src/content/colaboradoras/`. Astro Content Collections valida los metadatos. `pairs.ts` carga y consulta; no contiene los textos ni decide el orden del artículo.

Ejecutar desde `sitio/`:

```sh
npm ci
npm run dev
```

Abrir la dirección local que muestra Astro. Al guardar el MDX se actualiza la página. No se publica ni se envía a Tally. Los borradores aparecen en el catálogo y armarios del servidor de desarrollo. Para revisar una compilación local con borradores, usar `npm run verify:review` y `npm run preview`. La compilación normal (`build` o `verify`) los excluye, independientemente de la indexación.

[PAR-0003](../sitio/src/content/pares/par-0003.mdx) es un ejemplo completo. Su cuerpo importa los bloques una vez; después se pueden escribir párrafos de Markdown y mover los bloques completos:

| Bloque | Qué permite |
| --- | --- |
| `<FotoPrincipal />` | Colocar la foto elegida en `hero` donde se quiera. |
| `<Detalle title="..." image={2} caption="...">` | Texto junto a una vista, con ampliación y pie. `imageSide="left"` cambia el lado en escritorio. |
| `<Cita>...</Cita>` | Cita literal atribuida automáticamente a la colaboradora. Puede ir antes de la foto, entre detalles o al final; se puede omitir. |
| `<Resumen />` | Los datos de «De un vistazo», sin copiar nombre, marca ni tipo. Puede moverse u omitirse. |
| `<Termino slug="rejilla" />` | Definición contextual del glosario; `label="..."` permite adaptar la palabra a la frase. |

Por ejemplo, mover la cita es cortar y pegar su bloque, sin tocar la plantilla:

```mdx
<Cita>

La cita exacta de la colaboradora.

</Cita>

<FotoPrincipal />
```

El orden de los bloques en el archivo es el orden de lectura. Título, entradilla opcional y crédito constituyen la cabecera común; el resto del retrato no tiene un orden impuesto. Los datos de cada persona se resuelven a través de su referencia, no se escriben en los componentes.

## Añadir contenido

1. Preparar su retrato e imágenes a partir de Drive y los permisos autorizados. Las seis vistas van en `src/assets/pares/<imageSet>/vista-01.webp` … `vista-06.webp`, una copia de 1600 píxeles por vista; Astro genera el resto de tamaños y formatos.
2. Crear un MDX independiente con identificador, slug, orden de catálogo, vistas y referencia `collaborator`. Escribir el cuerpo con los bloques que necesite ese par. El orden del catálogo es independiente del orden del texto.
3. Si es una nueva colaboradora, crear una vez su archivo en `src/content/colaboradoras/`: slug, autorización de armario y `name` (nombre público) o `anonymous` (número de colaboradora anónima, sin nombre). Con `"anonymous": 7` aparece como «Colaboradora 07» y sus pares se reúnen sin revelar su identidad. Todo par necesita su referencia `collaborator`; sin ella la compilación se detiene.
4. Mantener `status: draft` mientras se redacta y revisa. Cambiarlo a `status: published` cuando se autorice la publicación e indicar `publishedAt: 'AAAA-MM-DD'`, con la fecha real. El último publicado abre la portada; el catálogo ordena por fecha descendente y usa `order` para desempatar. En revisión, si todavía no hay ninguno publicado, se muestra el primer borrador por `order` como ejemplo.
5. Comprobar y compilar. Catálogo, página del par, contador, enlaces al armario, índice de armarios y sitemap se actualizan automáticamente. No se edita la página del armario.

Los identificadores de colección son los nombres de archivo. Una ruta o identificador de par duplicados y una referencia a una colaboradora inexistente detienen la compilación, evitando sobrescribir entradas. Los términos deben usar un slug literal del glosario para que también se generen sus enlaces de consulta.

Cada `type` pertenece a uno de los cuatro grupos de zapatos que contamos (Bailarinas, Tacones y tiras, Cuñas y alpargatas, Plataformas), definidos en `sitio/src/data/shoe-types.ts` con su género. Un tipo que no esté en ningún grupo detiene la compilación: se añade allí antes de publicar el par.

`invitation` es opcional: la invitación final propia del par, escrita al publicarlo. Lleva `title`, dos líneas (la segunda sale en cursiva), y `text`. Patrón: el título lleva el rasgo del retrato a los zapatos de quien lee, con una pregunta o dándole la vuelta, sin resumir el par; el texto hace eco de lo visto, pide que lo manden («Mándanos…») y deja claro que pueden ser varios. La etiqueta («¿Y las tuyas?» / «¿Y los tuyos?») y el botón («Manda las tuyas» / «Manda los tuyos») salen del género del tipo. Si falta, sale la invitación genérica.

```yaml
invitation:
  title: ['Por fuera, una bailarina sencilla.', '¿Y las tuyas, de cerca?']
  text: 'A veces lo mejor está en la superficie: una trama, un brillo, un borde. Mándanos las tuyas, una o todas, y te contamos lo que tienen.'
```

`traits` y `colors` son listas opcionales de etiquetas. Todavía no se muestran: sirven para filtrar Pares por rasgo o color y para montar colecciones («Pares con rejilla», «En burdeos») cuando haya catálogo. `traits` recoge los rasgos que el retrato señala, en minúscula y con la palabra del glosario cuando la hay («rejilla», «garganta recortada»); `colors`, los colores tal como los nombra el retrato («burdeos», «rosa»; «oscuro» o «claro» si el texto no dice más). Se normalizarán a una lista cerrada cuando se haga el filtro. No se deducen: solo lo que el retrato dice.

```yaml
traits: ['ribete de contraste', 'aspecto aterciopelado', 'garganta recortada', 'pala larga', 'suela con trama']
colors: ['burdeos', 'rosa']
```

`homeDetail` es opcional: el detalle del par que puede salir en «En qué nos fijamos», en la portada. Lleva `label` (el rasgo, como «El borde»), `title`, `text` (una frase) e `image` (el número de la vista que lo enseña). La portada elige tres, del par más reciente al más antiguo y sin contar el destacado: primero sin repetir grupo de zapato ni colaboradora; si faltan, de otros pares; y, mientras no lleguen a tres, completa con las fotos de ejemplo de Sonia, que salen sin enlace porque no son retratos.

## Qué enseña la portada

Todo sale del contenido; no hay que tocar la portada al publicar. Los umbrales están en `sitio/src/data/home.ts`:

- «Lo último que hemos mirado» aparece desde 5 pares (`latestFrom`), con los 4 más recientes después del destacado (`latestCount`) y «Seguir mirando».
- Con un armario, la sección Armarios lo enseña con dos fotos y su enlace. Con 2 o más, enseña hasta 3 (`homeWardrobeLimit`), cada uno en su abanico, y «Ver los armarios».
- El final cuenta los pares de cada grupo de `shoe-types.ts`: «1 par», «{n} pares» con la foto del último, o «Aún no hay ninguno. ¿Tienes unos?» con una foto de ejemplo.

`model` es opcional y aparece en «De un vistazo» solo si se conoce. No se completan datos por deducción. La decisión del 7/10 exige que quien envía un par cuente qué le gusta, pero no convierte una cita pública en obligatoria: solo se incorpora si está autorizada.

`npm run test:content` compila una copia temporal con 60 pares adicionales: comprueba agrupaciones, los umbrales de la portada (con muchos pares y dos armarios, y con tres pares y uno), los recuentos por grupo de zapato, el texto de cada armario, las invitaciones propias y la genérica, cambio de posición de la cita, anonimato, ausencia de marca/cita, exclusión de borradores al lanzar, catálogo vacío y rechazo de datos inválidos. Los ejemplos nunca se incorporan a la web real.
