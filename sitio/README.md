# Sitio Web — El Par

Plataforma web modular y estática de **El Par — Zapatos en detalle**, desarrollada con **Astro**, **TypeScript** y **pnpm**.

---

## 1. Comandos de Trabajo

El entorno se gestiona exclusivamente con `pnpm`:

```bash
pnpm install     # Instalar dependencias
pnpm dev         # Iniciar servidor local de desarrollo
pnpm check       # Validación estricta de tipos y contratos (astro check)
pnpm build       # Compilación de producción (SSG estático puro en dist/)
pnpm preview     # Previsualización local del build de producción
```

---

## 2. Sistema de Gobierno Web

- [ESPECIFICACION.md](ESPECIFICACION.md): especificación global, marco general de arquitectura, alcance v1, reglas transversales y decisiones arquitectónicas globales (ADRs).
- [DESIGN.md](DESIGN.md): sistema visual semántico agnóstico de pantallas (atmósfera litográfica, paleta, tipografía y patrones UI transversales).

---

## 3. Especificaciones de Superficie (`specs/`)

Cada parte del sitio cuenta con su propia especificación viva, su plan de arquitectura y su archivo de tareas de trabajo:

| Superficie | Qué rige | Documentación gobernante |
| --- | --- | --- |
| **Plataforma Astro** | Arquitectura global del sitio | [specs/migracion-astro/spec.md](specs/migracion-astro/spec.md) · [Plan](specs/migracion-astro/plan.md) · [Tareas](specs/migracion-astro/tasks.md) |
| **Portada** | Portada e índice de colección | [specs/portada/spec.md](specs/portada/spec.md) · [Plan](specs/portada/plan.md) · [Tareas](specs/portada/tasks.md) |
| **Monografía** | Entregas y análisis del calzado | [specs/monografia/spec.md](specs/monografia/spec.md) · [Plan](specs/monografia/plan.md) · [Tareas](specs/monografia/tasks.md) |
| **Sobre El Par** | Manifiesto y método fotográfico | [specs/sobre-el-par/spec.md](specs/sobre-el-par/spec.md) · [Plan](specs/sobre-el-par/plan.md) · [Tareas](specs/sobre-el-par/tasks.md) |
| **Cómo colaborar** | Acogida ética y guía de tomas | [specs/como-colaborar/spec.md](specs/como-colaborar/spec.md) · [Plan](specs/como-colaborar/plan.md) · [Tareas](specs/como-colaborar/tasks.md) |

---

## 4. Cartografía del Código Fuente (`src/`)

- `src/pages/`: rutas estáticas del sitio (`index.astro`, `sobre-el-par.astro`, `como-colaborar.astro`, `guia-fotografica/index.astro` y dinámica `entradas/[slug].astro`).
- `src/components/`: biblioteca modular de componentes editoriales (`Header`, `Footer`, `SpecimenFrame`, `Abstract`, `ModuloEditorial`, `Diptico`, `CedulaMuseo`, `CitaColaboradora`, `GlossaryPopover`, `Lightbox`).
- `src/content/`: colecciones de contenido tipadas con Zod (`content.config.ts` y entradas en `content/pares/`).
- `src/layouts/`: plantillas envolventes (`LayoutBase.astro`, `LayoutMonografia.astro`).
- `src/styles/`: variables semánticas (`tokens.css`) y reseteo tipográfico (`reset.css`).
- `src/assets/`: fotografías de pares y recursos visuales.

---

## 5. Archivo Histórico

Los prototipos HTML previos a la migración a Astro se conservan inertes como referencia histórica en [archivo-prototipos/](archivo-prototipos/).
