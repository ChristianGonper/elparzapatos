# Tareas: Migración Integral de la Plataforma Web a Astro
> **Estado:** En curso  
> **Especificación que gobierna:** [sitio/specs/migracion-astro/spec.md](spec.md)  
> **Plan técnico de referencia:** [sitio/specs/migracion-astro/plan.md](plan.md)  
> **Marco global gobernante:** [sitio/ESPECIFICACION.md](../../ESPECIFICACION.md)

<!--
INSTRUCCIÓN PARA LA IA:
- Fase de desarrollo: Tareas atómicas (< 30 min) con criterio "Hecho cuando: ...".
- AL CERRAR (Tras confirmación del usuario):
  SE BORRA TODO EL CONTENIDO PREVIO DE ESTE ARCHIVO por completo.
  Se sobrescribe dejando ÚNICAMENTE el siguiente bloque de resumen de ejecución:

# Tareas Consolidadas: Migración Integral de la Plataforma Web a Astro
> **Estado:** Verificado y cerrado el AAAA-MM-DD

## Resumen de Ejecución
- **Hitos entregados:**
  - [Hito o bloque 1 completado]
  - [Hito o bloque 2 completado]
- **Validación con la Spec:** Todos los criterios funcionales de la spec han quedado verificados y en verde.
- **Notas de cierre:** [Cualquier aspecto relevante para el futuro o pospuesto]
-->

## Lista de Tareas

### Fase 1: Inicialización del Entorno y Archivo Histórico

- [x] **T01. Configuración de dependencias y scripts en `sitio/`**
  - Acción: Crear [sitio/package.json](../../package.json), [sitio/astro.config.mjs](../../astro.config.mjs) y [sitio/tsconfig.json](../../tsconfig.json) configurados con `pnpm`, Astro `^7.3.3`, TypeScript estricto y scripts (`dev`, `build`, `preview`, `check`).
  - *Hecho cuando:* La ejecución de `pnpm install` en [sitio/](../../) descarga las dependencias limpias y `pnpm run check` corre sin errores de configuración.

- [x] **T02. Archivo inerte de los prototipos HTML existentes**
  - Acción: Crear el directorio [sitio/archivo-prototipos/](../../archivo-prototipos/) y trasladar en él los archivos [sitio/index.html](../../index.html), [sitio/sobre-el-par.html](../../sobre-el-par.html), [sitio/como-colaborar.html](../../como-colaborar.html), [sitio/mock-comparativas-visuales.html](../../mock-comparativas-visuales.html) y [sitio/entradas/salon-aguja.html](../../entradas/salon-aguja.html), dejando la raíz de [sitio/](../../) despejada para la estructura de Astro.
  - *Hecho cuando:* Los prototipos residen inertes en [sitio/archivo-prototipos/](../../archivo-prototipos/) como referencia histórica y no interfieren con el enrutamiento de Astro.

- [x] **T03. Estructuración del árbol de directorios y activos fotográficos**
  - Acción: Crear las carpetas de `src/` (`assets/pares/salon-aguja/`, `assets/marca/`, `components/`, `content/pares/`, `layouts/`, `pages/entradas/`, `styles/`) y la carpeta [sitio/public/](../../public/) con `robots.txt` y favicon. Trasladar las imágenes WebP del salón aguja y recursos visuales de marca a `src/assets/`.
  - *Hecho cuando:* Las imágenes del salón clásico y de «Sobre El Par» están ubicadas en sus rutas canónicas dentro de `src/assets/`.

---

### Fase 2: Sistema de Estilos y Capas Base (Layouts)

- [ ] **T04. Hoja de tokens semánticos y reseteo CSS**
  - Acción: Crear [sitio/src/styles/tokens.css](../../src/styles/tokens.css) con todas las variables de color, tipografía y espaciado de [sitio/DESIGN.md](../../DESIGN.md), y [sitio/src/styles/reset.css](../../src/styles/reset.css) con la normalización tipográfica y de caja.
  - *Hecho cuando:* Las variables CSS (`--color-paper`, `--color-ink`, `--color-cognac`, etc.) y las reglas tipográficas base están disponibles para importación global.

- [ ] **T05. Layout base y shell HTML5 (`LayoutBase.astro`)**
  - Acción: Crear [sitio/src/layouts/LayoutBase.astro](../../src/layouts/LayoutBase.astro) incluyendo armazón HTML5, carga de fuentes (Newsreader, Plus Jakarta Sans, JetBrains Mono), metaetiquetas OpenGraph/Twitter, importación de estilos globales y script condicional para Cloudflare Web Analytics.
  - *Hecho cuando:* Una página de prueba envuelta en `LayoutBase` renderiza con las fuentes y colores del sistema visual sin fallos en consola.

- [ ] **T06. Layout de monografía editorial (`LayoutMonografia.astro`)**
  - Acción: Crear [sitio/src/layouts/LayoutMonografia.astro](../../src/layouts/LayoutMonografia.astro) estructurando la cabecera con botón de retorno `← Volver a la Colección` (`/#coleccion`), contenedor de pliego editorial y cierre.
  - *Hecho cuando:* El layout envuelve adecuadamente el contenido monográfico y sitúa el retorno y cierre editorial de forma consistente.

---

### Fase 3: Componentes Nucleares y Navegación

- [ ] **T07. Componente `Header.astro` con regla de página activa y descriptor cognac**
  - Acción: Implementar [sitio/src/components/Header.astro](../../src/components/Header.astro) en el flujo normal (no fija), logotipo `El Par` en Newsreader carbón (`text-ink`) con descriptor `/ Zapatos en detalle` en JetBrains Mono versalitas color cuero cognac (`text-cognac` `#9E6B55`), navegación horizontal en recto y lógica de página activa (`aria-current="page"`, `pointer-events-none`). Asegurar áreas táctiles mínimas de 44 px en móvil.
  - *Hecho cuando:* La cabecera se visualiza fiel a la maqueta con el descriptor en color cognac, resalta la página actual sin permitir clic y adapta su diseño a pantallas de 320 px a 1280 px.

- [ ] **T08. Componente `Footer.astro` con navegación vertical y anti-duplicidad**
  - Acción: Implementar [sitio/src/components/Footer.astro](../../src/components/Footer.astro) con logotipo unificado idéntico al de cabecera (descriptor `/ Zapatos en detalle` en `text-cognac` `#9E6B55`), menú en lista vertical estructurada, canales institucionales (`elparzapatos@proton.me`, `@elparzapatos`) y regla anti-duplicidad contextual (omisión del enlace a `Cómo colaborar` cuando la página ya contiene un módulo de llamada previo).
  - *Hecho cuando:* El pie renderiza la presencia gráfica de marca con el descriptor en color cognac, omite el enlace de colaborar en las páginas que reciben `hideColaborarLink` y marca la página activa como inerte.

---

### Fase 4: Colecciones de Contenido y Componentes Editoriales

- [ ] **T09. Configuración de colección tipada `pares` y entrada inaugural**
  - Acción: Crear [sitio/src/content/config.ts](../../src/content/config.ts) definiendo el esquema Zod estricto (incluyendo los 5 campos canónicos de la cédula y `heroImagen: image()`). Crear [sitio/src/content/pares/salon-aguja.md](../../src/content/pares/salon-aguja.md) con la monografía inaugural del salón aguja.
  - *Hecho cuando:* `pnpm run check` valida el esquema de contenido y `getCollection('pares')` carga la entrada sin advertencias de tipos.

- [ ] **T10. Componente `CedulaMuseo.astro` (Variante 3A: Cédula de Museo)**
  - Acción: Implementar [sitio/src/components/CedulaMuseo.astro](../../src/components/CedulaMuseo.astro) según la Variante 3A continua literaria: supratítulo en mono versalitas, Línea 1 (silueta y marca/modelo en Newsreader serif), Línea 2 (material y acabado en sans versalitas), separador `— • —`, Línea 3 (geometría de tacón y procedencia de armario en mono), y envolvente `border-y border-hairline`.
  - *Hecho cuando:* La cédula renderiza exactamente la composición tipográfica de sala de exposición aprobada en el mock comparativo visual.

- [ ] **T11. Componentes fotográficos `SpecimenFrame.astro`, `Lightbox.astro` y `Diptico.astro`**
  - Acción: Implementar [sitio/src/components/SpecimenFrame.astro](../../src/components/SpecimenFrame.astro) (proporción 3:4/4:3, fondo `#FFFFFF`, `object-contain`, paspartú interior hover/focus con filete cuero `#9E6B55` y apertura accesible). Implementar [sitio/src/components/Lightbox.astro](../../src/components/Lightbox.astro) (modal minimalista con soporte de teclado `Esc`). Implementar [sitio/src/components/Diptico.astro](../../src/components/Diptico.astro) (dos imágenes con conector y pie centrado).
  - *Hecho cuando:* Las imágenes se muestran sin recortes, la señal de inspección reacciona al cursor y teclado, y el lightbox amplía y cierra fluidamente.

- [ ] **T12. Componentes de texto y lectura (`Abstract.astro`, `ModuloEditorial.astro`, `CitaColaboradora.astro`, `GlossaryPopover.astro`)**
  - Acción: Implementar [sitio/src/components/Abstract.astro](../../src/components/Abstract.astro) (2 columnas estilo catálogo), [sitio/src/components/ModuloEditorial.astro](../../src/components/ModuloEditorial.astro) (retículas 7:5, 5:7, 6:6), [sitio/src/components/CitaColaboradora.astro](../../src/components/CitaColaboradora.astro) (cursiva con filete fino de cuero) y [sitio/src/components/GlossaryPopover.astro](../../src/components/GlossaryPopover.astro) (subrayado punteado cuero y popover accesible).
  - *Hecho cuando:* Los cuatro componentes modulares reproducen el ritmo y espaciado de pliego editorial definido en [sitio/DESIGN.md](../../DESIGN.md).

---

### Fase 5: Migración de las 4 Superficies v1

- [ ] **T13. Migración de la Portada (`src/pages/index.astro`)**
  - Acción: Construir [sitio/src/pages/index.astro](../../src/pages/index.astro) según [sitio/specs/portada/spec.md](../portada/spec.md): hero dividido izquierda–derecha en escritorio y vertical en móvil, regla de inauguración con un único par publicado (sin duplicidad en cuadrícula), y módulo de cierre `Comparte un par` (con pie sin enlace duplicado).
  - *Hecho cuando:* La portada funciona en local, respeta la regla de un solo par y enlaza a la monografía y a la página de colaborar.

- [ ] **T14. Migración de la Monografía Dinámica (`src/pages/entradas/[slug].astro`)**
  - Acción: Crear [sitio/src/pages/entradas/[slug].astro](../../src/pages/entradas/[slug].astro) con `getStaticPaths()`, ensamblando el pliego completo: retorno, hero de espécimen, abstract a 2 columnas, módulos de observación, díptico, cita testimonial, cédula de museo (Variante 3A) y bloque de cierre `Comparte un par`.
  - *Hecho cuando:* `/entradas/salon-aguja` compila estáticamente y presenta la monografía completa sin diferencias con el prototipo visual aprobado.

- [ ] **T15. Migración de la página institucional «Sobre El Par» (`src/pages/sobre-el-par.astro`)**
  - Acción: Construir [sitio/src/pages/sobre-el-par.astro](../../src/pages/sobre-el-par.astro) según [sitio/specs/sobre-el-par/spec.md](../sobre-el-par/spec.md), integrando el manifiesto editorial unificado, los criterios formales de selección, el método comunitario cotidiano y las comparativas visuales.
  - *Hecho cuando:* La página compila con sus imágenes optimizadas, su navegación vertical en pie marca `Sobre El Par` como activo inerte y conserva las rutas a Colección y Colaborar.

- [ ] **T16. Migración de la página puente «Cómo colaborar» (`src/pages/como-colaborar.astro`)**
  - Acción: Construir [sitio/src/pages/como-colaborar.astro](../../src/pages/como-colaborar.astro) según [sitio/specs/como-colaborar/spec.md](../como-colaborar/spec.md): tono de acogida en tuteo, 3 pasos de participación, 4 garantías éticas, tarjeta interactiva de portada de la guía fotográfica y enlaces a Tally y canales institucionales.
  - *Hecho cuando:* La página renderiza el flujo de acogida, abre Tally externamente y su pie vertical omite el enlace hacia sí misma.

---

### Fase 6: Verificación Integral y Preparación de Despliegue

- [ ] **T17. Validación estricta de compilación y enlaces estáticos**
  - Acción: Ejecutar `pnpm run check` y `pnpm run build` en [sitio/](../../). Verificar la carpeta de salida `dist/` asegurando que todos los archivos estáticos se han generado correctamente y no existen rutas rotas ni recursos pendientes.
  - *Hecho cuando:* `astro check` y `astro build` finalizan con código de salida 0 y cero advertencias.

- [ ] **T18. Auditoría visual responsiva y de accesibilidad**
  - Acción: Inspeccionar en navegador las cuatro superficies en resoluciones móvil (320, 360, 390, 430, 768 px) y escritorio (1280 px). Validar contrastes cromáticos, descriptor de marca en color cuero cognac (`#9E6B55`), áreas táctiles mínimas (44 px) y navegación completa por teclado (apertura y cierre de lightbox con `Enter`/`Esc`).
  - *Hecho cuando:* Las 4 páginas ofrecen una experiencia fluida, sin desbordamiento horizontal y en estricta conformidad con [sitio/DESIGN.md](../../DESIGN.md), la identidad de marca unificada y sus respectivas especificaciones de superficie.
