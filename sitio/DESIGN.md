# Design System: El Par — Zapatos en detalle
**Project ID:** 8645313318093331337  
**Design System Asset ID:** 3592a1acabaa418dad4b8488ee9c3bcd (Archival Monograph)

---

## 1. Visual Theme & Atmosphere

Atmosphere of an independent fashion publication, art catalog folio, and archival monograph. Quiet, warm, intellectual, and unhurried. The shoe is treated as an autonomous sculptural and architectural object. Negative space is generous and intentional, inspired by fine book design, art catalog folios, and natural daylight. Zero marketing clutter, zero screaming CTAs, zero badge pollution over images, zero generic cards with heavy drop shadows.

---

## 2. Color Palette & Roles

- **Paper Canvas (`#FAF8F5`):** Warm alabaster/parchment base across all viewports.
- **Surface Elevation / Muted Linen (`#F3EFEA`):** Used for abstract callouts, quiet inset panels, and the collaboration invitation block.
- **Specimen Card White (`#FFFFFF`):** Archival crisp white reserved for image mats and clean specimen frames.
- **Primary Ink Charcoal (`#1C1A18`):** Deep lithographic charcoal ink replacing harsh pure black. Used for display titles, narrative prose, and structural boundaries.
- **Graphite Note (`#6B6661`):** Neutral warm graphite for secondary metadata, captions, and taxonomy labels.
- **Cognac Leather Accent (`#9E6B55`):** Natural vegetable-tanned leather warmth for subtle dotted term underlines and active indicators.
- **Hairline Dust Border (`#E8E3DC`):** Crisp, 1px architectural divider and frame lines.

---

## 3. Typography Rules

- **Display & Headlines (`Newsreader`, Serif):** Elegant, high-contrast, editorial serif conveying historical provenance and design authority. Title cases and subtle italics for monographs (`«Dos extremos, una silueta»`, `«A ras de suelo, la curva justa»`).
- **Body Prose (`Plus Jakarta Sans` / `Inter`, Sans):** Clean, spacious, highly legible humanistic grotesque sans-serif dedicated to long-form reading (max 65ch width, line-height 1.75). Fluid, responsive font sizes without locking pixels in stone.
- **Technical Annotations & Metrics (`JetBrains Mono`, Monospace):** Monospaced precision reserved for taxonomy labels, dimensions, foliage numbers (`· 01`), and data metadata.

---

## 4. Component Stylings

### 4.1. Editorial Navigation Bar
- Austere, quiet header with the wordmark **El Par** in commanding serif and descriptor **Zapatos en detalle**.
- Navigation links: *Archivo*, *Ver Armarios*, *Sobre El Par* (o *Nuestra Mirada*).
- Complete absence of commercial buttons, carts, or aggressive calls to action.

### 4.2. Hero Piece (Portada)
- Prominent full-width split card highlighting a key specimen.
- Left column: Specimen photograph in generous square mat over subtle muted backing.
- Right column: Minimal metadata header (`Pieza Destacada` / `Armario de [Nombre]`), headline in serif, concise 1-line taxonomic identification, and quiet link `Ver estudio →`. Redundant descriptive prose is suppressed to let the photography and whitespace lead.

### 4.3. Shoe Specimen Cards (Cuadrícula de Archivo)
- Sharp rectangular layout (`rounded-none`), crisp 1px `#E8E3DC` border, `#FFFFFF` image container with warm neutral backing.
- Clean photograph with zero badges, labels, or overlays.
- Content block: Attentive, non-invasive metadata:
  - Provenance: `Armario de [Nombre]` in subtle mono.
  - Title: Editorial observation headline in serif.
  - Subtitle: Clear 1-line taxonomic identification in muted sans.
- Natural interactivity: The entire card / title serves as the natural link; no repetitive `Leer análisis anatómico` action lines or dividers.

### 4.4. Contextual Anatomical Popover
- Subtle dotted underline in `#9E6B55` beneath anatomical terms (`pala`, `garganta`, `fuste`, `enfranque`, `cambrillón`).
- Triggered by both **hover** (desktop) and **click / tap** (mobile and pointer).
- Understated floating popover card positioned directly next to the word with its definition and craft role, closing gracefully upon clicking outside or mouse leave without dimming or blocking the page background.

### 4.5. Pedagogical Image Dimension Overlay (Cotas Vectoriales Conmutables)
- **Not in v1 publications.** Clean photograph only until a later web version (1.5 / 2). Spec below is for that phase; the local prototype may keep the toggle as a preview.
- Subtle conmutator button `[ + Cotas anatómicas ]` / `[ − Ocultar cotas ]` placed in the corner of technical photographs.
- When toggled active: overlays hairline SVG dimension lines (0.75px–1.2px) in `#9E6B55` and `#1C1A18` with micro-labels in `JetBrains Mono` pointing to exact anatomical transition nodes (*Quiebre del fuste*, *Garganta rebajada*, *Curvatura de enfranque*).
- By default (off): preserves pure photographic contemplation without visual pollution.

### 4.6. Datos del Par (Bloque de Créditos Tipográficos Continuos)
- Fluid, continuous editorial folio bordered by subtle top and bottom hairlines (no rigid multi-row forms or icons).
- Refined typography grouping:
  - Category and Model: *Salón clásico · Christian Louboutin So Kate* (in serif/italic).
  - Material and Finish: *Piel vacuno en acabado charol mate · Negro profundo* (in uppercase sans).
  - Base and Contributor: *Tacón aguja 90 mm · Armario de Carmen* (in mono accent).

### 4.7. Collaboration Block («Abrir mi armario»)
- Quiet card at the close of archive and monographs on `#F3EFEA` paper with a hairline border.
- Tone of complicity and intimacy: inviting readers to open the doors of their own wardrobes for pieces with distinct architectural lines.
- Quiet action link: `Abrir mi armario →`.

---

## 5. Layout Principles

- **Home Grid:** Responsive 3-column / 2-column gallery on desktop, single-column fluid flow on mobile.
- **Monograph Entry Layout (Paseo Visual Flexible):**
  - *Hero Specimen:* La toma de apertura (perspectiva tres cuartos exterior) a gran formato en paspartú limpio, con título y entradilla a dos columnas.
  - *Ratios de Retícula Flexible (Columnas Web vs. Formato de Imagen):*
    - **Distinción clave:** Las proporciones `7:5`, `5:7` y `6:6` definen exclusivamente el reparto de columnas de la retícula web (ancho relativo de la columna de texto frente a la de imagen sobre 12 columnas). No imponen una relación de aspecto a la fotografía.
    - **Formato fotográfico:** Las imágenes se capturan y muestran en proporciones fotográficas estándar de cámara, normalmente `3:4` (vertical) o `4:3` (horizontal).
    - Comportamiento de las columnas:
      - `7:5`: 7 columnas de texto y 5 de imagen. Para desarrollo conceptual amplio con texto explicativo extenso.
      - `5:7`: 5 columnas de texto y 7 de imagen. Da máxima presencia visual a tomas marcadamente verticales (talón, caña) con texto conciso de 2-3 líneas, **sin forzar párrafos de relleno**.
      - `6:6`: Equilibrio simétrico entre el bloque de texto y el análisis morfológico.
      - `Dípticos`: Dos fotografías contiguas (ej. frontal + planta) analizadas bajo un bloque de texto común de contacto y convergencia.
  - *Foliación Editorial:* Indicadores marginales discretos con punto tipográfico (`· 01`, `· 02`, `· 03`...) que orientan la lectura sin ensuciar la fotografía.
- **Purity:** Images are left unadorned without floating badges, category tags, or catalogue codes; all descriptive knowledge lives in the accompanying prose.
- **Elevation:** Strictly flat, lithographic depth established through hairlines (`#E8E3DC`) and paper canvas contrasts (`#FAF8F5` vs. `#F3EFEA` vs. `#FFFFFF`)—zero fuzzy modern drop shadows.
