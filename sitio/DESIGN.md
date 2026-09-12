# Design System: El Par — Zapatos en detalle
**Project ID:** 8645313318093331337  
**Design System Asset ID:** 3592a1acabaa418dad4b8488ee9c3bcd (Archival Monograph)

---

## 1. Visual Theme & Atmosphere

- **Atmosphere:** Independent fashion publication, museum catalog folio, and archival monograph. Quiet, warm, intellectual, and unhurried.
- **Object Philosophy:** The shoe is treated as an autonomous sculptural and architectural object, completely divorced from commercial e-commerce styling or influencer outfit curation.
- **Space & Tone:** Generous and intentional negative space inspired by fine book design, art catalog folios, and natural daylight. Zero marketing pressure, zero screaming callouts, zero badge pollution over photography, and zero generic cards with heavy drop shadows.
- **Density Spectrum:** Art Gallery Airy (Density 3/10) with sharp, precise typography and breathing room.
- **Motion & Interaction:** Restrained and serene (Motion 3/10). Discrete tactile micro-interactions on hover/tap, smooth popovers, no aggressive bouncing animations or flashy transitions.

---

## 2. Color Palette & Roles

Every color conveys physical printing and bookmaking materiality:

- **Paper Canvas (`#FAF8F5`):** Warm alabaster parchment base applied across the viewport canvas. Sets the calm, paper-like foundation.
- **Muted Linen Surface (`#F3EFEA`):** Warm tint elevation used for quiet inset panels, concise anatomical notes, and the closing collaboration block.
- **Specimen White (`#FFFFFF`):** Pure archival mat white reserved exclusively for photography mats and specimen frame containers.
- **Primary Ink Charcoal (`#1C1A18`):** Deep lithographic charcoal ink replacing harsh pure black (`#000000`). Used for display headlines, body narrative, and structural boundary lines.
- **Graphite Note (`#6B6661`):** Warm neutral graphite for secondary metadata, taxonomic labels, and quiet captions.
- **Cognac Leather Accent (`#9E6B55`):** Vegetable-tanned warm leather accent. Reserved strictly for subtle dotted underlines on technical terms and active selection states.
- **Hairline Dust Border (`#E8E3DC`):** Crisp, 1px architectural dividers, frame outlines, and quiet baseline strokes.

**Color Constraints:**
- Pure black (`#000000`) is strictly forbidden.
- AI gradients, neon glows, and saturated purple/blue palettes are completely banned.
- Single accent rule: Only Cognac Leather (`#9E6B55`) is permitted as a functional warm accent.

---

## 3. Typographic Architecture

Hierarchical balance pairing a commanding literary serif with a pristine modern sans-serif and an exacting monospace:

- **Display & Headlines (`Newsreader` / `Playfair Display`, Serif):**
  - High-contrast, editorial serif conveying historical provenance and design authority.
  - Used for specimen titles, editorial observations (`«Dos extremos, una silueta»`), and section mastheads.
  - Subtle italics used selectively for emotional cadence and literary quotes.
  - Tracking: slightly tight (`-0.01em` to `-0.02em`) to maintain headline cohesion.
- **Body Prose (`Plus Jakarta Sans` / `Inter`, Sans-Serif):**
  - Clean, spacious, highly legible humanistic grotesque sans-serif dedicated to long-form reading.
  - Line length strictly capped at `65ch` for effortless eye tracking.
  - Relaxed leading (`line-height: 1.75`). Fluid, responsive sizing via `clamp()` without rigid pixel locks.
- **Technical Annotations & Metrics (`JetBrains Mono`, Monospace):**
  - Monospaced precision reserved for taxonomic indicators, dimensions (e.g., `90 mm`), marginal folio numbering (`· 01`, `· 02`), provenance metadata (`Armario de [Nombre]`), and anatomical data tables.

---

## 4. Component Stylings

### 4.1. Editorial Navigation Masthead
- Austere, serene header featuring the wordmark **El Par** in commanding serif and the descriptor **Zapatos en detalle**.
- Primary navigation: *Archivo*, *Ver Armarios*, *Sobre El Par* (or *Nuestra Mirada*).
- Complete absence of commercial artifacts: no cart icons, no "Submit Your Shoe" buttons in the header, and no promotional banners.

### 4.2. Hero Specimen (Archive Portada)
- Prominent full-width split container showcasing a focal specimen.
- Left column: Specimen photograph framed within a generous square mat on a subtle neutral ground.
- Right column: Minimalist header metadata (`Pieza Destacada` and `Armario de [Nombre]`), observation headline in serif, concise 1-line taxonomic identification in sans-serif, and a quiet text link `Ver estudio →`.
- Redundant descriptive body text is eliminated to prioritize photographic presence and breathing room.

### 4.3. Specimen Grid Cards (Cuadrícula del Archivo)
- Crisp rectangular geometry (`rounded-none`), bounded by a subtle 1px `#E8E3DC` frame with a `#FFFFFF` mat behind the photograph.
- Clean photograph presentation: zero overlaid badges, zero family stickers, and zero drop shadows.
- Metadata block beneath the image:
  - Provenance: `Armario de [Nombre]` in subtle monospace.
  - Title: Observation headline in serif.
  - Subtitle: Taxonomic classification in muted sans-serif.
- Natural interaction: The entire card (or image and title) functions as an organic interactive link. Repetitive action phrases (e.g., `Leer análisis →`) and button dividers are banned.

### 4.4. Collection Filters & Counters
- Understated filter bar:
  - Typological families: *Todos*, *Salones*, *Merceditas*, *Bailarinas*, *Tacón bajo*.
  - Curatorial inventory counter: *6 especímenes catalogados*.
  - Direct collection route: *«Ver Armarios →»* to explore grouped donations by contributor.

### 4.5. Contextual Anatomical Popovers
- Subtly differentiated terms (`pala`, `garganta`, `collarín`, `enfranque`, `cambrillón`) marked with a refined dotted underline in Cognac Leather (`#9E6B55`).
- Activated via both **hover** (desktop pointer) and **click / tap** (mobile devices and mouse).
- Floating card positioned adjacently on `#FAF8F5` surface with a crisp 1px `#E8E3DC` border. Displays concise term definition and biomechanical/craft function in 1–2 sentences.
- Closes gracefully upon clicking outside or cursor exit without dimming or modalizing the background.

### 4.6. Concise Contextual Notes
- Inline secondary cards styled with a soft paper tint (`#F3EFEA`), smaller typography, and a 1px `#E8E3DC` hairline border.
- Dedicated to:
  - Singular terminology not covered in the standard glossary.
  - Quick morphological comparisons with other archive specimens.
  - Etymological or historical notes specific to the piece.

### 4.7. Datos del Par (Continuous Editorial Specimen Folio)
- Fluid, continuous typographic credits block replacing rigid tabular forms.
- Structured with subtle hairline dividers:
  - *Type / Silhouette:* Classic pump, slingback, ballet flat, architectural heel...
  - *Brand & Model:* (Secondary attribution when known; never prioritized over anatomy).
  - *Exterior Material & Finish:* Calfskin, satin, patent, brushed suede...
  - *Color:* Dominant hue and secondary accent notes.
  - *Heel & Base:* Morphological family and measured elevation.
  - *Provenance:* Contributor name linking to their personal wardrobe view.

### 4.8. Contextual Collaboration Cierre («Comparte un par»)
- Understated closing panel rendered on `#F3EFEA` paper with a hairline border.
- Warm, conversational acknowledgement:
  *«Este estudio ha sido posible gracias a [Nombre]. Si tienes algún par con detalles especiales, una silueta particular o un diseño que merezca verse de cerca, puedes proponérnoslo para formar parte del proyecto.»*
- Quiet action link: `Cómo colaborar →` linking to the collaboration intake flow (`como-colaborar.html`).

### 4.9. Image Annotations & Calipers (Post-v1 Roadmap)
- **v1 Status: Strictly Clean Photography.** First editions publish clean, unblemished imagery without calipers, badges, or toggle controls.
- **Future v1.5 / v2 Specification:** Vector annotation overlay toggled via micro-control `[ + Cotas anatómicas ]` / `[ − Ocultar cotas ]`:
  - Hairline caliper vectors (0.75px) in `#1C1A18` or `#9E6B55`.
  - Micro-labels in `JetBrains Mono` (10-11px).
  - Clean photography default state (`toggle off`).

---

## 5. Layout Principles & Grid System

- **Container Constraints:** Main layout constrained to max-width (e.g., `1280px` or `1360px` centered) with generous horizontal page padding.
- **Home Grid:** Responsive 3-column / 2-column gallery on desktop, single-column fluid flow on mobile.
- **Monograph Visual Promenade (12-Column Flexible Grid):**
  - **Key Distinction (Web Column Ratios vs. Photographic Native Aspect Ratios):**
    - The editorial ratios `7:5`, `5:7`, and `6:6` define **grid column distributions** across the 12-column web layout (relative width of prose container vs. image container).
    - Photography is captured and displayed in native camera aspect ratios: predominantly `3:4` (vertical) and `4:3` (horizontal).
  - **Column Distribution Behaviors:**
    - `7:5` (7 text columns, 5 image columns): Tailored for in-depth conceptual development and comprehensive anatomical exposition alongside a supporting view.
    - `5:7` (5 text columns, 7 image columns): Grants commanding visual weight to vertical compositions (rear heel profile, collar aperture) paired with concise, 2–3 sentence observations.
    - `6:6` (6 text columns, 6 image columns): Symmetrical equilibrium between prose analysis and morphological image.
    - `Diptychs` (Two paired images sharing a single unified text block): Enables side-by-side comparative observation (e.g., frontal throat + dorsal sole view) under one cohesive analytical narrative.
  - **Whitespace Integrity:** If an anatomical description concludes in three lines, the container does not force artificial filler text; whitespace breathes naturally.
  - **Marginal Foliation:** Subtle typographic numerals in the outer margin (`· 01`, `· 02`, `· 03`) orient reader progression without cluttering the photograph.

---

## 6. Elevation & Depth

- **Lithographic Flat Depth:** Strictly flat, print-like elevation achieved through paper shade contrasts (`#FAF8F5` base vs. `#F3EFEA` insets vs. `#FFFFFF` image mats) and crisp 1px hairline boundaries (`#E8E3DC`).
- **Zero Fuzzy Drop Shadows:** Heavy blur drop shadows, dark glows, and floating card elevations are banned.
- **Popovers Elevation:** Floating glossaries use a crisp 1px stroke with a whisper-soft micro-shadow (`0 4px 12px rgba(28, 26, 24, 0.04)`) to subtly detach from underlying prose.

---

## 7. Responsive Architecture

- **Mobile-First Collapse (< 768px):**
  - All asymmetric multi-column layouts (7:5, 5:7, 6:6, diptychs) smoothly collapse to a single vertical column.
  - Hero split view stacks image first, followed by headline and taxonomy.
- **Touch Targets:** All interactive words (glossary terms), navigation links, and filters uphold a minimum `44px` tap target area.
- **Horizontal Overflow Prevention:** Zero horizontal scrolling across any viewport.
- **Fluid Typography:** Display headings and body copy scale smoothly via `clamp()` formulas, maintaining legible hierarchy across mobile, tablet, and wide desktop screens.

---

## 8. Anti-Patterns & Banned AI Clichés

1. **No Overlaid Image Badges:** Banned floating corner tags (`par * 0001`, `Familia: Salón`, `Lámina 03`) on top of photographs.
2. **No E-Commerce Artifacts:** Banned "Buy Now", "Add to Cart", discount chips, price tags, or star ratings.
3. **No Commercial Header CTAs:** Banned "Submit Your Shoes" buttons or subscription popups in the header.
4. **No Generic Feature Card Grids:** Banned cookie-cutter 3-card rows with centered icons and identical filler paragraphs.
5. **No Synthetic AI Gradients:** Banned neon purples, blues, or multi-stop radial glows.
6. **No Pure Black (`#000000`):** Use lithographic Primary Ink Charcoal (`#1C1A18`).
7. **No Forced Text Padding:** Never write filler prose solely to equalize column heights.
