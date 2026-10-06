# Contenido y revisión

Drive → Moda-Zapatos es la fuente de marca y copy. Fuentes vigentes consultadas el 6 de octubre de 2026: README, principios, nombre-y-presentacion, como-escribimos, fotos-y-colaboradoras y tareas. También se han revisado las cuatro skills de asistentes y el contexto de Instagram, colaboración y monetización. Archivo se inventaría como antecedente, pero no se usa como criterio vigente.

## Análisis preparados

No existían entradas redactadas de estos pares. Los tres textos se escriben desde las fotos y los envíos, como borradores de esta reconstrucción.

- PAR-0003: bailarinas de rejilla de María. Seis fotos del envío ENV-0003; marca Zara y frase del mismo envío.
- PAR-0002: slippers burdeos de Flabelus, con borde rosa. Seis fotos HEIC del envío ENV-0002, 16/09/2026. Crédito elegido: nombre. La cita es un extracto literal de sus palabras.
- PAR-0004: bailarinas de dibujo de leopardo de María. Seis fotos del mismo envío, marca y frase del segundo bloque.

Solo se publica en el código el contenido seleccionado para la web. Crédito elegido: María. Sin @, correos ni datos privados. Los tres análisis están preparados como borradores para revisión antes del lanzamiento; no se ha contactado con María ni se ha publicado el sitio.

Los rasgos se describen desde las fotos. No se infiere composición, fabricación interior, comodidad ni calidad. En PAR-0004 se describe el pelo corto visible sin atribuirle un material concreto. Cada sección tiene una imagen de apoyo y los títulos se adaptan al rasgo.

## Armarios

El índice y las páginas individuales se generan agrupando las entradas por su referencia a una colaboradora. Armario de María reúne ahora los tres análisis preparados y crece automáticamente al añadir otro. No contiene una biografía ni un texto personalizado que deba reescribirse: muestra nombre, número de pares y tarjetas enlazadas a los análisis. Menos de dos pares no produce página de armario. El crédito, slug y autorización de armario se definen una sola vez en la identidad pública de la colaboradora; nunca se deducen de una hoja privada.

No hay perfil social, foto personal ni dato de contacto. Las personas anónimas podrán tener una etiqueta pública genérica y estable cuando haya un caso autorizado, sin inventar identidades de muestra.

## Nombres y rutas

Las rutas se han decidido para la web nueva:

| Contenido | Ruta |
| --- | --- |
| Inicio | `/` |
| Pares y análisis | `/pares/` y `/pares/[slug]/` |
| Armarios | `/armarios/` y `/armarios/[slug]/` |
| Qué es El Par | `/el-par/` |
| Cómo colaborar | `/participa/` |
| Guía de fotos | `/guia-de-fotos/` |
| Glosario | `/glosario/` |
| Uso de fotos y datos | `/tus-fotos-y-tus-datos/` |

No hay aliases ni nombres de ruta heredados. El Tally sigue siendo `https://tally.so/r/Npj2bl`, sin cambios en su formulario ni en el Apps Script.

## Redactar y revisar en local

Los análisis viven en `sitio/src/content/pares/`, un archivo MDX por par. La cabecera (frontmatter) contiene los datos de catálogo y permisos; el cuerpo es Markdown con bloques editoriales. Las identidades públicas, mucho más pequeñas, siguen en JSON en `src/content/colaboradoras/`. Astro Content Collections valida los metadatos. `pairs.ts` carga y consulta; no contiene los textos ni decide el orden del artículo.

Ejecutar desde `sitio/`:

```sh
npm ci
npm run dev
```

Abrir la dirección local que muestra Astro. Al guardar el MDX se actualiza la página. No se publica ni se envía a Tally. Los borradores también aparecen en el catálogo y armarios locales para revisar el recorrido completo.

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

El orden de los bloques en el archivo es el orden de lectura. Título, entradilla opcional y crédito constituyen la cabecera común; el resto del análisis no tiene un orden impuesto. Los datos de cada persona se resuelven a través de su referencia, no se escriben en los componentes. Si no se conoce marca ni hay opinión, se omiten; no se inventan para completar la entrada.

## Añadir contenido

1. Preparar su análisis e imágenes a partir de Drive y los permisos autorizados.
2. Crear un MDX independiente con identificador, slug, orden de catálogo, vistas y referencia `collaborator`. Escribir el cuerpo con los bloques que necesite ese par. El orden del catálogo es independiente del orden del texto.
3. Si es una nueva colaboradora, crear una vez su archivo en `src/content/colaboradoras/`: nombre público, slug y autorización de armario. También puede ser una identidad anónima estable, por ejemplo «Colaboradora 07», que permite reunir sus pares sin revelar su identidad. La correspondencia privada se conserva fuera del repositorio. No hay listas de pares. Una entrada sin referencia muestra «Colaboración anónima» y no se agrupa con otras personas anónimas cuya relación se desconoce.
4. Mantener `status: draft` mientras se redacta y revisa. Cambiarlo a `status: published` cuando se autorice la publicación. En una compilación de lanzamiento (`PUBLIC_LAUNCH_READY=true`) se excluyen los borradores de páginas, catálogo, armarios y sitemap.
5. Comprobar y compilar. Catálogo, página del par, contador, enlaces al armario, índice de armarios y sitemap se actualizan automáticamente. No se edita la página del armario.

Los identificadores de colección son los nombres de archivo. Una ruta o identificador de par duplicados y una referencia a una colaboradora inexistente detienen la compilación, evitando sobrescribir entradas. Los términos deben usar un slug literal del glosario para que también se generen sus enlaces de consulta.

`npm run test:content` compila una copia temporal con 60 pares adicionales: comprueba agrupaciones, cambio de posición de la cita, anonimato, ausencia de marca/cita, exclusión de borradores al lanzar, catálogo vacío y rechazo de datos inválidos. Los ejemplos nunca se incorporan a la web real.

El paso automático de la hoja a la web permanece pendiente, como indica Drive. No se ha construido una importación ni un backend. El formato de redacción no cierra la arquitectura de imágenes, que sigue pendiente.
