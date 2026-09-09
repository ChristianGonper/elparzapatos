# Design System: El Par — Zapatos en detalle
**Project ID:** 8645313318093331337

## 1. Visual Theme & Atmosphere
Atmosphere of an independent fashion publication and archival monograph. Quiet, warm, intellectual, and unhurried. The shoe is treated as an autonomous sculptural and architectural object. Negative space is generous and intentional, inspired by fine book design, art catalog folios, and natural daylight. Zero marketing clutter, zero screaming CTAs, zero badge pollution over images, zero generic cards with heavy drop shadows.

## 2. Color Palette & Roles
- **Paper Canvas (`#FAF8F5`):** Warm alabaster/parchment base across all viewports.
- **Surface Elevation / Muted Linen (`#F3EFEA`):** Used for abstract callouts, quiet inset panels, and the collaboration invitation block.
- **Specimen Card White (`#FFFFFF`):** Archival crisp white reserved for image mats and clean specimen frames.
- **Primary Ink Charcoal (`#1C1A18`):** Deep lithographic charcoal ink replacing harsh pure black. Used for display titles, narrative prose, and structural boundaries.
- **Graphite Note (`#6B6661`):** Neutral warm graphite for secondary metadata, captions, and taxonomy labels.
- **Cognac Leather Accent (`#9E6B55`):** Natural vegetable-tanned leather warmth for subtle dotted term underlines and active indicators.
- **Hairline Dust Border (`#E8E3DC`):** Crisp, 1px architectural divider and frame lines.

## 3. Typography Rules
- **Display & Headlines (`Newsreader` / `Playfair Display`, Serif):** Elegant, high-contrast, editorial serif conveying historical provenance and design authority. Title cases and subtle italics for monographs.
- **Body Prose (`Plus Jakarta Sans` / `Inter`, Sans):** Clean, spacious, highly legible humanistic grotesque sans-serif dedicated to long-form reading (max 65ch width, line-height 1.75).
- **Technical Annotations & Metrics (`JetBrains Mono`, Monospace):** Monospaced precision reserved for taxonomy labels, dates, and technical data.

## 4. Component Stylings
- **Shoe Specimen Cards:** Sharp rectangular layout (`rounded-none`), crisp 1px `#E8E3DC` border, `#FFFFFF` image container with warm neutral backing, clean photograph with no badges or text overlay, title in serif, and 2-line abstract excerpt in sans.
- **Contextual Anatomical Popover:** Subtle dotted underline in `#9E6B55` beneath anatomical terms (`pala`, `garganta`, `fuste`, `enfranque`); clicking triggers an understated floating popover card positioned directly next to the word with its definition, without dimming or blocking the page background.
- **Datos del Par:** Minimalist border-collapse data list with 1px `#E8E3DC` hairlines, mono labels, and clean values—free of catalog codes or reference numbers.
- **Editorial Navigation Bar:** Austere, quiet header with the wordmark **El Par** in commanding serif and descriptor **Zapatos en detalle**. No aggressive buttons.

## 5. Layout Principles
- **Home Grid:** Rhythmic 2-column or 3-column gallery on desktop, single column fluid flow on mobile.
- **Monograph Entry Layout (Paseo Visual Alterno):**
  - *Hero Specimen:* La primera imagen de la entrada (perspectiva principal tres cuartos) se presenta en gran formato a ancho completo de la caja de lectura, acompañada del título en serif y el abstract enmarcado.
  - *Walkthrough en 2 columnas alternas (Desktop):* Los bloques anatómicos siguientes se estructuran en dos columnas en escritorio, alternando de forma rítmica la posición de la imagen y el texto:
    - Bloque 1: Texto explicativo a la izquierda, fotografía de perfil a la derecha.
    - Bloque 2: Fotografía frontal a la izquierda, texto explicativo a la derecha.
    - Bloque 3: Texto explicativo a la izquierda, fotografía de talón a la derecha.
    - Bloque 4: Fotografía de planta/enfranque a la izquierda, texto explicativo a la derecha.
  - *Adaptación Mobile:* En pantallas móviles, las dos columnas colapsan de manera natural en un flujo vertical continuo (encabezado del bloque, texto explicativo y fotografía debajo).
- **Purity:** Images are left unadorned without floating badges or redundant caption text; all descriptive information lives in the accompanying narrative.
- **Elevation:** Flat, lithographic depth established strictly through hairlines and paper tier contrast—no fuzzy modern drop shadows.
