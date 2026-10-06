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

## Añadir contenido

Cada análisis vive en un archivo independiente de `sitio/src/content/pares/`. Astro Content Collections valida su esquema en `src/content.config.ts`. `pairs.ts` carga la colección y ofrece funciones de consulta; no contiene los textos de los pares. Los términos remiten al glosario compartido.

Para incorporar un nuevo par:

1. Preparar su análisis e imágenes a partir de Drive y los permisos autorizados.
2. Crear su JSON independiente, con identificador, slug, orden editorial, textos, imágenes y referencia `collaborator` a la identidad pública correspondiente. No añadir nombres ni correos a una plantilla.
3. Si es una nueva colaboradora identificada, crear una vez su archivo en `src/content/colaboradoras/`: nombre público, slug y autorización de armario. Sin listas de pares. Si no lleva referencia de colaboradora se muestra «Colaboración anónima» y no se agrupa con otras personas anónimas.
4. Comprobar y compilar. Catálogo, página del par, contador, enlaces al armario, índice de armarios y sitemap se actualizan automáticamente. No se edita la página del armario.

Los identificadores de colección son los nombres de archivo. Una ruta o identificador de par duplicados y una referencia a una colaboradora inexistente detienen la compilación, evitando sobrescribir entradas. `npm run test:content` compila una copia temporal con 60 pares adicionales, comprueba las agrupaciones y rechaza datos inválidos. Los ejemplos nunca se incorporan a la web real.

El paso automático de la hoja a la web permanece pendiente, como indica Drive. No se ha construido una importación ni un backend.
