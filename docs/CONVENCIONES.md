# Convenciones del código

Recogen lo que ya hace la mayor parte del código, para que siga igual. `npm run verify` y `npm run verify:review` comprueban las que se pueden comprobar sin herramientas nuevas (`sitio/scripts/check-conventions.mjs`); el formato lo fija Prettier (`npm run format:check`: comillas simples, 100 columnas).

## Idioma

- En español: todo texto visible, comentarios, mensajes de error, documentación y commits.
- En inglés: los identificadores del código (variables, funciones, tipos, clases y variables CSS, atributos `data-` internos, nombres de transición y nombres de archivo de código).
- Se quedan en español porque se ven fuera del código o los escribe la redacción: rutas y anclas (`/pares/`, `#contenido`, `#enviar`), las colecciones y sus carpetas (`pares`, `colaboradoras`), los bloques del MDX (`Detalle`, `FotoPrincipal`, `Cita`, `Resumen`, `Termino`) con sus props `marca` y `desde` y sus valores, que llegan tal cual a `data-marca` y `data-desde`, y la ayuda para medir puntos (`?medir`, alias `@medir`).

## CSS

- CSS propio y global, sin `@layer` ni estilos con alcance de Astro. `src/styles/index.css` fija el orden de la cascada: `global.css`, hojas de componentes y de páginas, `motion.css` y `print.css`. Única excepción: `MeasurePoints.astro` lleva su `<style is:global>` porque solo existe en la vista de revisión.
- Una hoja por componente (`styles/components/`) o familia de páginas (`styles/pages/`), con nombre en kebab-case.
- Clases en kebab-case con el nombre del bloque delante (`.article-section`, `.article-section-heading`). Variantes como clase añadida (`.button.light`, `.invitation.compact`, `.with-image`); estados con `is-` (`.is-visible`, `.is-marked`, `.is-anchored`). Sin BEM; solo las clases de PhotoSwipe llevan `__` o `--`.
- Variables de diseño en `:root` de `global.css` (`--paper`, `--ink`, `--space`, `--hs1`…); las propias de un componente se declaran en su regla (`--x`, `--angle`, `--term-top`). Los colores salen de las variables; un color fuera de la paleta (visor, sombras, ayuda para medir) se escribe en hex en minúscula de 6 u 8 cifras.
- Unidades: `rem` para letra y espacios; `px` para bordes, sombras, zonas táctiles (44 px) y anchos máximos; `clamp()` con `vw` para tamaños fluidos; `ch` para la medida de lectura; duraciones en `s`. Los títulos multiplican su tamaño por `var(--hs1, 1)`, `--hs2` o `--hs3`.
- Orden: cada bloque con sus reglas base y, justo después, sus `@media` de mayor a menor (`max-width` 1050, 800 y 540 px). Los ajustes de escritorio amplio (`min-width: 1000px`; 999 px si hace falta su complemento) van detrás de los `max-width`. `:before` y `:after` con un solo «:».
- Movimiento en `motion.css` o junto a su regla, y siempre se apaga con «reducir movimiento».

## JavaScript y TypeScript

- Módulos ES con exports con nombre, sin `export default`. Las funciones se exportan como `export const nombre = (…) => …`; `export function` solo donde lo pide el marco (`getStaticPaths` de Astro y `onRequest` de Pages Functions).
- `camelCase` para variables y funciones, `PascalCase` para tipos, interfaces y componentes. `interface` para las formas de objeto exportadas; `type` para uniones, intersecciones y tipos locales.
- Archivos en kebab-case en `src/data/` y `src/scripts/` (`shoe-types.ts`, `every-page.ts`); componentes en PascalCase.
- `src/data/` no toca el DOM. El comportamiento del navegador va en el `<script>` del componente al que pertenece o en `src/scripts/`, y se prepara con `onEveryPage` y `firstTime` para seguir funcionando tras la navegación sin recarga. Nada en línea: la CSP solo admite scripts propios.

## Componentes Astro

- Frontmatter en este orden: imports, `interface Props`, `const { … } = Astro.props` con sus valores por defecto y después los cálculos.
- Clases condicionales con `class:list`. Cada componente tiene su hoja en `src/styles/`, importada desde `index.css`.

## Comentarios

- Explican cómo funciona un módulo o el porqué de algo que no se ve en el código; no repiten lo que dice la línea.
- Cabecera breve (`//`) en los módulos con comportamiento; `/** … */` para exports y props cuyo sentido no es obvio.
- Sin referencias a bloques de trabajo, ramas o fechas: eso queda en git y en `docs/`. Si remiten a la documentación, con su ruta entre paréntesis: `(docs/CONTENIDO.md)`.
- Al cambiar el código se corrige o se borra su comentario.
