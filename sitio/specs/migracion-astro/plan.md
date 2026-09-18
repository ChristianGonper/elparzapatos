# Plan Técnico: Migración Integral de la Plataforma Web a Astro
> **Última actualización:** 2026-09-19 · **Estado:** En desarrollo  
> **Especificación que gobierna:** [sitio/specs/migracion-astro/spec.md](spec.md)  
> **Sistema visual de referencia:** [sitio/DESIGN.md](../../DESIGN.md)  
> **Marco global gobernante:** [sitio/ESPECIFICACION.md](../../ESPECIFICACION.md)  
> **Lista de ejecución:** [sitio/specs/migracion-astro/tasks.md](tasks.md)

<!--
INSTRUCCIÓN PARA LA IA:
- Fase de desarrollo: Escribe de agente para agente, conciso, definiendo módulos, modelos y verificación.
- AL CERRAR (Tras confirmación del usuario):
  SE BORRA TODO EL CONTENIDO PREVIO DE ESTE ARCHIVO y se sobrescribe dejando ÚNICAMENTE
  el siguiente bloque de resumen técnico consolidado:

# Plan Consolidado: Migración Integral de la Plataforma Web a Astro
> **Estado:** Verificado y cerrado el AAAA-MM-DD

## Resumen Técnico de Entrega
- **Módulos y archivos modificados:**
  - `[ruta/archivo-1]`: [Breve resumen de lo implementado]
  - `[ruta/archivo-2]`: [Breve resumen de lo implementado]
- **Arquitectura final:** [Descripción concisa de cómo quedó resuelto]
- **Pruebas superadas:** [Tests automáticos y comprobaciones manuales en verde]
-->

---

## 1. Módulos y Archivos Afectados

### 1.1. Configuración, Entorno y Herramientas

- [sitio/package.json](../../package.json): Crear — Configuración del proyecto con `pnpm`, scripts de ciclo de vida y dependencias fijadas:
  ```json
  {
    "name": "el-par-sitio",
    "type": "module",
    "version": "1.0.0",
    "scripts": {
      "dev": "astro dev",
      "start": "astro dev",
      "build": "astro check && astro build",
      "preview": "astro preview",
      "check": "astro check"
    },
    "dependencies": {
      "astro": "^7.3.3"
    },
    "devDependencies": {
      "@astrojs/check": "^0.9.10",
      "typescript": "^5.5.0"
    }
  }
  ```
- [sitio/astro.config.mjs](../../astro.config.mjs): Crear — Configuración de Astro con `output: 'static'` para generación estática pura (SSG):
  ```javascript
  import { defineConfig } from 'astro/config';

  export default defineConfig({
    output: 'static',
  });
  ```
- [sitio/tsconfig.json](../../tsconfig.json): Crear — Configuración de TypeScript en modo estricto extendiendo `astro/tsconfigs/strict`:
  ```json
  {
    "extends": "astro/tsconfigs/strict",
    "compilerOptions": {
      "baseUrl": "."
    }
  }
  ```
- [sitio/.gitignore](../../.gitignore): Crear / Modificar — Ignorar `node_modules/`, `dist/`, `.astro/` y archivos temporales del sistema operativo.

### 1.2. Archivo Histórico de Prototipos HTML
- [sitio/archivo-prototipos/](../../archivo-prototipos/): Crear — Directorio de archivo inerte. Traslado de los prototipos previos:
  - [sitio/archivo-prototipos/index.html](../../archivo-prototipos/index.html)
  - [sitio/archivo-prototipos/sobre-el-par.html](../../archivo-prototipos/sobre-el-par.html)
  - [sitio/archivo-prototipos/como-colaborar.html](../../archivo-prototipos/como-colaborar.html)
  - [sitio/archivo-prototipos/mock-comparativas-visuales.html](../../archivo-prototipos/mock-comparativas-visuales.html)
  - [sitio/archivo-prototipos/entradas/salon-aguja.html](../../archivo-prototipos/entradas/salon-aguja.html)

### 1.3. Estilos Globales y Tokens Semánticos
- [sitio/src/styles/tokens.css](../../src/styles/tokens.css): Crear — Tokens extraídos de [sitio/DESIGN.md](../../DESIGN.md): paleta (*Paper Warm*, *Paper Muted*, *Ink*, *Graphite*, *Cognac Leather*, *Hairline*, *Specimen White*), tipografías (Newsreader, Plus Jakarta Sans, JetBrains Mono) y variables de espaciado.
- [sitio/src/styles/reset.css](../../src/styles/reset.css): Crear — Reseteo tipográfico limpio, márgenes, proporciones y box-sizing sin frameworks externos pesados.

### 1.4. Activos Estáticos y Fotografía
- [sitio/public/](../../public/): Crear — Favicons, archivo `robots.txt` y recursos descargables no procesados.
- [sitio/src/assets/pares/salon-aguja/](../../src/assets/pares/salon-aguja/): Crear — Fotografías en formato WebP optimizadas por `astro:assets` (tomas canónicas: perfil, tres cuartos, frontal, talón y planta).
- [sitio/src/assets/marca/](../../src/assets/marca/): Crear — Recursos visuales comparativos y tomas domésticas para la página «Sobre El Par».

### 1.5. Capas de Plantilla (Layouts)
- [sitio/src/layouts/LayoutBase.astro](../../src/layouts/LayoutBase.astro): Crear — Armazón HTML5 común, inyección de metadatos SEO, preconexión tipográfica, CSS global (`tokens.css`, `reset.css`) y script ligero de Cloudflare Web Analytics (respeto estricto a la privacidad, sin cookies).
- [sitio/src/layouts/LayoutMonografia.astro](../../src/layouts/LayoutMonografia.astro): Crear — Envolvente de pliego monográfico que incorpora cabecera con botón de retorno `← Volver a la Colección` (`/#coleccion`), navegación secuencial y cierre editorial.

### 1.6. Biblioteca Modular de Componentes (`src/components/`)
- [sitio/src/components/Header.astro](../../src/components/Header.astro): Crear — Cabecera en el flujo normal (sale con el scroll), logotipo `El Par` en tinta carbón (`text-ink`) con descriptor `/ Zapatos en detalle` en JetBrains Mono versalitas color cuero cognac (`text-cognac` `#9E6B55`), navegación horizontal en recto y regla de enlace activo (`aria-current="page"`, `pointer-events-none`).
- [sitio/src/components/Footer.astro](../../src/components/Footer.astro): Crear — Pie con logotipo idéntico (descriptor en `text-cognac`), navegación vertical estructurada, canales oficiales (`elparzapatos@proton.me`, `@elparzapatos`) y regla anti-duplicidad contextual (omite enlace a `Cómo colaborar` si la página ya cuenta con bloque previo).
- [sitio/src/components/CedulaMuseo.astro](../../src/components/CedulaMuseo.astro): Crear — Ficha técnica según Variante 3A (cédula literaria continua con los 5 campos canónicos, supratítulo versalitas, separador `— • —` y envolvente con filetes finos).
- [sitio/src/components/SpecimenFrame.astro](../../src/components/SpecimenFrame.astro): Crear — Marco fotográfico editorial en 3:4 o 4:3, `object-contain`, fondo blanco `#FFFFFF`, sombra de suelo natural, paspartú interior en hover/focus accesible con filete color cuero (`#9E6B55`) y apertura de lightbox.
- [sitio/src/components/Abstract.astro](../../src/components/Abstract.astro): Crear — Apertura editorial a dos columnas (estilo catálogo de arte).
- [sitio/src/components/ModuloEditorial.astro](../../src/components/ModuloEditorial.astro): Crear — Contenedor analítico para retículas de pliego alternas (`7:5`, `5:7`, `6:6`), supratítulo mono versalitas y titular H2 en serif.
- [sitio/src/components/Diptico.astro](../../src/components/Diptico.astro): Crear — Marco contenedor de dos fotografías contiguas con línea de separación milimétrica y pie centrado.
- [sitio/src/components/CitaColaboradora.astro](../../src/components/CitaColaboradora.astro): Crear — Testimonio en Newsreader cursiva con filete fino en color cuero a la izquierda y posición libre.
- [sitio/src/components/GlossaryPopover.astro](../../src/components/GlossaryPopover.astro): Crear — Término técnico con subrayado punteado cuero, tarjeta flotante contextual sin bloquear la lectura y cierre accesible (`Esc` y clic exterior).
- [sitio/src/components/Lightbox.astro](../../src/components/Lightbox.astro): Crear — Visor fotográfico a pantalla completa minimalista sobre fondo neutro cálido, accionable por ratón o teclado (`Enter`, espacio, `Esc`).

### 1.7. Colecciones de Contenido Tipadas
- [sitio/src/content/config.ts](../../src/content/config.ts): Crear — Definición de colecciones Zod para la colección `pares`, tipando los 5 campos de la cédula, el activo fotográfico principal (`image()`) y el testimonio.
- [sitio/src/content/pares/salon-aguja.md](../../src/content/pares/salon-aguja.md): Crear — Ficha de contenido en Markdown con el frontmatter tipado y el cuerpo del estudio monográfico del salón aguja clásico.

### 1.8. Rutas y Vistas Públicas (`src/pages/`)
- [sitio/src/pages/index.astro](../../src/pages/index.astro): Crear — Portada inaugural con hero dividido izquierda–derecha, regla de inauguración (sin tarjeta duplicada con un único par) y cierre `Comparte un par`.
- [sitio/src/pages/entradas/[slug].astro](../../src/pages/entradas/[slug].astro): Crear — Plantilla dinámica estática (`getStaticPaths()`) que renderiza cada entrega monográfica desde la colección `pares`.
- [sitio/src/pages/sobre-el-par.astro](../../src/pages/sobre-el-par.astro): Crear — Página institucional unificada con manifiesto, criterios de selección, método comunitario de fotografía cotidiana y muestras visuales.
- [sitio/src/pages/como-colaborar.astro](../../src/pages/como-colaborar.astro): Crear — Página puente con mensaje de acogida, 3 pasos, 4 garantías éticas, tarjeta interactiva a la guía y apertura de Tally.

---

## 2. Modelo de Datos y Contratos de Interfaz

### 2.1. Esquema Zod de la Colección `pares` (`src/content/config.ts`)

```typescript
import { defineCollection, z } from 'astro:content';

export const paresCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      subtitulo: z.string(),
      fechaPublicacion: z.date(),
      destacadoEnPortada: z.boolean().default(false),

      // Fotografía principal optimizada por el pipeline de Astro
      heroImagen: image(),
      heroAlt: z.string(),

      // Cédula técnica canónica de 5 campos (Variante 3A: Cédula de Museo)
      cedula: z.object({
        siluetaTipo: z.string(),           // Campo 1: ej. "Salón clásico"
        marca: z.string(),                 // Campo 2: ej. "Christian Louboutin"
        modelo: z.string(),                // Campo 2: ej. "So Kate"
        materialAcabado: z.string(),       // Campo 3: ej. "Piel vacuna natural · Charol brillante · Negro profundo"
        geometriaTacon: z.string(),        // Campo 4: ej. "Tacón aguja 90 mm · Pecho recto"
        procedenciaArmario: z.string(),    // Campo 5: ej. "Armario de Carmen"
        procedenciaInstagram: z.string().optional(), // Campo 5 opcional: ej. "carmen.armario"
      }),

      // Cita testimonial opcional de colaboradora
      testimonio: z
        .object({
          texto: z.string(),
          autora: z.string(),
          posicion: z.enum(['apertura', 'detalle', 'cierre']).default('cierre'),
        })
        .optional(),
    }),
});

export const collections = {
  pares: paresCollection,
};
```

### 2.2. Contratos de Interfaz de Componentes (Props)

```typescript
// Header.astro
export interface HeaderProps {
  currentPath: string; // Para aplicar aria-current="page", estilo activo y pointer-events-none
}

// Footer.astro
export interface FooterProps {
  currentPath: string;
  hideColaborarLink?: boolean; // Regla anti-duplicidad: true si la página ya cuenta con bloque previo "Comparte un par"
}

// CedulaMuseo.astro (Variante 3A)
export interface CedulaMuseoProps {
  cedula: {
    siluetaTipo: string;
    marca: string;
    modelo: string;
    materialAcabado: string;
    geometriaTacon: string;
    procedenciaArmario: string;
    procedenciaInstagram?: string;
  };
}

// SpecimenFrame.astro
export interface SpecimenFrameProps {
  image: ImageMetadata;
  alt: string;
  aspectRatio?: '3:4' | '4:3';
  caption?: string;
  triggerLightbox?: boolean;
}

// ModuloEditorial.astro
export interface ModuloEditorialProps {
  grid: '7:5' | '5:7' | '6:6';
  supratitulo: string; // ej. "[ La pala y el escote ]" en mono versalitas
  titulo: string;      // Titular en Newsreader serif
  invertir?: boolean;  // Alterna imagen izquierda / texto derecha
}

// Diptico.astro
export interface DipticoProps {
  imagenes: [
    { image: ImageMetadata; alt: string },
    { image: ImageMetadata; alt: string }
  ];
  pieCentrado?: string;
}

// CitaColaboradora.astro
export interface CitaColaboradoraProps {
  texto: string;
  autora: string;
}

// GlossaryPopover.astro
export interface GlossaryPopoverProps {
  termino: string;
  traduccionEn?: string;
  definicion: string;
  funcionBiomecanica?: string;
}
```

## 3. Decisiones Técnicas de Implementación

### 3.1. Arquitectura de Estilos Encapsulados (Scoped CSS)
- Cada componente `.astro` encapsula sus reglas de estilo en un bloque `<style>` nativo, compilado por Astro con identificadores de ámbito únicos (`data-astro-cid-*`), impidiendo fugas de estilos entre componentes.
- Los tokens semánticos residen en `src/styles/tokens.css` y se importan globalmente en `LayoutBase.astro`, exponiendo variables CSS puras (`--color-paper`, `--color-ink`, `--color-cognac`, `--color-hairline`, `--font-serif`, etc.). Los componentes consumen directamente estas variables sin dependencias de librerías CSS de utilidades externas.

### 3.2. Pipeline de Optimización de Imágenes (`astro:assets`)
- Las fotografías de los especímenes y recursos de marca se almacenan en formato WebP dentro de `src/assets/`.
- Se procesan mediante el componente nativo `<Image />` de `astro:assets`. Esto garantiza la inyección de atributos `width` y `height` intrínsecos en el marcado HTML, asegurando una puntuación de Cumulative Layout Shift (CLS) igual a 0.
- El build estático genera los derivados responsivos optimizados en `dist/_astro/` preservando la nitidez de las tomas y reduciendo la carga de red.

### 3.3. Lógica Técnica de Navegación, Enlace Activo y Anti-duplicidad
- **Detección de ruta activa:** `LayoutBase.astro` y las páginas inyectan `Astro.url.pathname` en las props `currentPath` de `Header.astro` y `Footer.astro`.
- **Comportamiento inerte:** Cuando `currentPath === destino`, el componente reemplaza el elemento interactivo `<a>` por un contenedor inerte (`<span>`) marcado semánticamente con `aria-current="page"`, clase de estilo activo y `pointer-events: none`.
- **Identidad de marca unificada:** El logotipo presenta el nombre `El Par` en Newsreader serif (`text-ink`) y el descriptor `/ Zapatos en detalle` en JetBrains Mono versalitas en color cuero cognac (`text-cognac` `#9E6B55`).
- **Anti-duplicidad en pie:** `Footer.astro` evalúa la prop booleana `hideColaborarLink` (suministrada como `true` por Portada y Monografías). Cuando está activa, el nodo correspondiente a `/como-colaborar` se omite de la lista vertical del DOM.

### 3.4. Micro-interacciones Accesibles en Cliente (Vanilla JS sin Frameworks)
- **Lightbox (`Lightbox.astro`):**
  - Implementado con JavaScript vanilla sin librerías externas.
  - Estructurado como capa modal accesible (`role="dialog"`, `aria-modal="true"`).
  - Al activarse mediante clic o pulsación de `Enter`/espacio sobre `SpecimenFrame.astro`, almacena la referencia del elemento que disparó la acción, traslada el foco al diálogo y atrapa la navegación por teclado.
  - Escucha el evento global `keydown` para cerrar inmediatamente con `Escape`, o al pulsar en el fondo neutro cálido exterior, restituyendo el foco accesible al elemento disparador.
- **Glosario contextual (`GlossaryPopover.astro`):**
  - Los términos anatómicos o biomecánicos se marcan con subrayado punteado en color cuero cognac (`border-b border-dotted border-cognac`).
  - Dispone de un panel flotante contextual posicionado mediante CSS relativo, activable por ratón o teclado (`focus`), sin oscurecer la página y con cierre al desenfocar o pulsar `Escape`.

### 3.5. Pipeline de Compilación y Variables de Entorno
- La compilación estática pura (`astro build`) emite todo el sitio plano hacia `dist/`.
- La inyección de la etiqueta ligera de Cloudflare Web Analytics se realiza en `LayoutBase.astro` mediante lectura segura de `import.meta.env.PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN`. Si la variable no está configurada, el script no se inyecta, manteniendo el código limpio en desarrollo local.

---

## 4. Estrategia de Verificación

### 4.1. Pruebas Automáticas

- **Validación de tipos y esquema Astro:**
  ```bash
  pnpm run check
  ```
  Comprueba que todos los componentes `.astro`, scripts de TypeScript y el esquema Zod de `src/content/config.ts` no tienen errores de tipos.

- **Compilación estática completa:**
  ```bash
  pnpm run build
  ```
  Verifica que todas las páginas estáticas (`/`, `/sobre-el-par`, `/como-colaborar`, `/entradas/salon-aguja`) se generan con éxito en `dist/`, sin enlaces rotos ni activos no resueltos.

- **Previsualización local:**
  ```bash
  pnpm run preview
  ```
  Permite servir el build estático final para comprobar el comportamiento real idéntico al de Cloudflare Pages.

### 4.2. Verificación Manual y Criterios de Aceptación

1. **Jerarquía Visual y Fidelidad Editorial:**
   - Comprobar que la paleta cromática reproduce exactamente *Paper Warm* (`#FAF8F5`), *Paper Muted* (`#F3EFEA`), *Ink* (`#1C1A18`), *Cognac Leather* (`#9E6B55`) y filetes de 1 px (`#E8E3DC`) sin sombras comerciales.
   - Verificar que en el logotipo tanto de cabecera como de pie, el nombre `El Par` se renderiza en Newsreader serif carbón (`text-ink`) y el descriptor `/ Zapatos en detalle` en color cuero cognac (`#9E6B55` / `text-cognac`).
   - Verificar la Cédula de Museo (Variante 3A) en [sitio/src/pages/entradas/[slug].astro](../../src/pages/entradas/[slug].astro) con los 5 campos canónicos, separador `— • —` y envolvente `border-y`.
2. **Navegación y Estados:**
   - En la portada (`/`), el logotipo y la opción `Colección` son inertes y no clickeables.
   - En `/sobre-el-par` y `/como-colaborar`, sus enlaces respectivos están marcados con `aria-current="page"` y son inertes.
   - En la portada y en la monografía, el pie **no contiene** el enlace `Cómo colaborar` porque ya existe el bloque previo `Comparte un par`.
   - En `/como-colaborar`, el pie **no contiene** el enlace a sí misma.
3. **Responsividad Móvil:**
   - Inspeccionar en anchos de 320, 360, 390, 430 y 768 px.
   - Comprobar que no existe desbordamiento horizontal.
   - Verificar que todos los destinos de navegación tienen al menos 44 px de altura táctil.
4. **Interacciones Fotográficas y Glosario:**
   - Probar el marco interior de revista al posar el cursor o enfocar con teclado en `SpecimenFrame.astro`.
   - Pulsar la imagen o presionar `Enter` para comprobar la apertura limpia del lightbox a pantalla completa y su cierre con `Esc` o clic exterior.
   - Probar la tarjeta flotante del glosario en términos técnicos.
5. **Embudo de Colaboración:**
   - En `/como-colaborar`, verificar que la tarjeta de la guía fotográfica conduce a Tally y que los canales oficiales (`elparzapatos@proton.me` y `@elparzapatos`) resuelven correctamente.
