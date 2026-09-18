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
- **Muted Linen Surface (`#F3EFEA`):** Warm tint elevation used for quiet inset panels, concise anatomical notes, and collaborative closing callout surfaces.
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
  - Fluid scale: responsive sizing governed by `clamp()` formulas to maintain literary authority across viewports without rigid pixel breaks.
- **Body Prose (`Plus Jakarta Sans` / `Inter`, Sans-Serif):**
  - Clean, spacious, highly legible humanistic grotesque sans-serif dedicated to long-form reading.
  - Line length strictly capped at `65ch` for effortless eye tracking.
  - Relaxed leading (`line-height: 1.75`). Fluid, responsive sizing via `clamp()` without rigid pixel locks.
- **Technical Annotations & Metrics (`JetBrains Mono`, Monospace):**
  - Monospaced precision reserved for taxonomic indicators, dimensions (e.g., `90 mm`), marginal folio numbering (`· 01`, `· 02`), provenance metadata (`Armario de [Nombre]`), and anatomical data tables.
  - Tracking & Leading: slightly tracked (`0.04em` to `0.08em`) uppercase for section and taxonomic tags; tabular numbers and regular tracking for measurements. Tight, controlled leading (`line-height: 1.4` to `1.5`).

---

## 4. Component Stylings & Transversal UI Patterns

### 4.1. Core Component Foundations
- **Geometry & Edge Stance:** Strictly sharp, squared-off edges (`rounded-none`) across all cards, containers, buttons, specimen frames, and inputs. Pill-shaped elements (`rounded-full`) and rounded corners (`rounded-lg`, `rounded-md`) are completely banned, enforcing architectural discipline and editorial folio rigor.
- **Buttons & Interactive Actions:**
  - *Shape & Border:* Sharp, squared-off edges (`rounded-none`).
  - *Color Assignment:* Primary text actions in lithographic Primary Ink Charcoal (`#1C1A18`) with directional arrow cue (`→`), or discrete bordered buttons on Paper Canvas (`#FAF8F5`) with crisp 1px Hairline Dust Border (`#E8E3DC`). Navigation and active selection states marked with a subtle baseline stroke or Cognac Leather (`#9E6B55`) tint.
  - *Behavior & Motion:* Serene hover transition (subtle opacity change or shift to `#9E6B55`); zero playful bouncing, scale zooms, or heavy 3D bevels. Minimum `44px` tap target area for touch accessibility.
- **Cards & Containers:**
  - *Shape & Border:* Sharp, squared-off edges (`rounded-none`) delimited by crisp 1px Hairline Dust Border (`#E8E3DC`).
  - *Background:* Specimen White (`#FFFFFF`) for specimen photography, Muted Linen Surface (`#F3EFEA`) for secondary panels, or Paper Canvas (`#FAF8F5`) for primary canvases.
  - *Depth:* Flat lithographic depth; zero heavy or fuzzy drop shadows.
- **Inputs & Form Controls:**
  - *Shape & Stroke:* Sharp, squared-off edges (`rounded-none`) with a crisp 1px Hairline Dust Border (`#E8E3DC`). On focus, transitions to a subtle 1px border in Cognac Leather (`#9E6B55`); zero glowing neon halos or harsh blue outlines.
  - *Background & Typography:* Neutral Paper Canvas (`#FAF8F5`) or Specimen White (`#FFFFFF`). Monospace or clean sans-serif typography in Primary Ink Charcoal (`#1C1A18`) with Graphite Note (`#6B6661`) placeholder text.

### 4.2. Framed Specimen Mat
- **Visual Pattern:** Narrow warm mat around the pure `#FFFFFF` photographic field, delimited by a crisp 1px hairline. The slight temperature contrast makes white-background photographs legible as framed specimens without exaggerating the picture-frame effect.
- **Image Stance:** Uncropped presentation using `object-contain` that preserves natural ground and shadow. Zero rounded corners (`rounded-none`).
- **Frame Proportion:** Internal mat spacing remains deliberately slimmer than in the first static prototypes. If a source image contains excessive white margin, the publication crop is corrected locally before release rather than compensated through CSS.
- **Inspection Cue (Magazine Inset Passepartout):** On desktop hover and keyboard focus, the frame reveals a generous inward-projecting mat with softly rounded interior corners, evoking the tactile die-cut passepartout of a luxury fashion magazine. The photograph itself never scales, shifts, or receives a color filter; its natural contact shadow on pure white remains pristine.
- **Surface Purity:** Zero overlaid corner badges, tags, or floating labels over the photography.

### 4.3. Contextual Popover Card
- **Trigger Element:** Subtle dotted underline in Cognac Leather (`#9E6B55`).
- **Floating Panel:** Detached surface on `#FAF8F5` with a crisp 1px `#E8E3DC` hairline border and soft lithographic shadow (`0 4px 12px rgba(28, 26, 24, 0.04)`).
- **Typography:** Monospace versalitas for term header; sans-serif for definition. No close icon: the panel closes by clicking or tapping outside it, or with `Esc`, without modalizing the background.

### 4.4. Inset Tinted Note Panel
- **Visual Pattern:** Quiet inset box rendered in soft Muted Linen Surface (`#F3EFEA`) with a 1px `#E8E3DC` border.
- **Typography:** Compact sans-serif or monospace typography for concise historical, technical, or comparative annotations.

### 4.5. Continuous Typographic Folio List
- **Visual Pattern:** Fluid, uninterrupted typographic credits layout replacing rigid tabular forms.
- **Styling:** Key-value pairs separated by subtle baseline dividers or discrete spacing, pairing monospace descriptors with literary serif or clean sans-serif values.

### 4.6. Minimalist Inspection Lightbox
- **Visual Pattern:** Full-viewport specimen inspection over clean neutral alabaster (`#FAF8F5`) or pure white.
- **Restraint:** Absence of heavy toolbars, zoom carousels, or icon clusters. Effortless dismiss via ambient click or `Esc`.

---

## 5. Layout Principles & Grid System

- **Container Constraints:** Main layout constrained to max-width (`1280px` or `1360px` centered) with sufficient horizontal page padding. The rhythm is editorial but moderately compact: section spacing must distinguish chapters without turning each block into a near-full-screen interval.
- **Multi-Column Column Distributions (12-Column Flexible Grid):**
  - **Key Distinction (Web Column Ratios vs. Photographic Native Aspect Ratios):**
    - The editorial ratios `7:5`, `5:7`, and `6:6` define **grid column distributions** across the 12-column web layout (relative width of prose container vs. image container).
    - Photography is captured and displayed in native camera aspect ratios: predominantly `3:4` (vertical) and `4:3` (horizontal).
  - **Column Distribution Behaviors:**
    - `7:5` (7 text columns, 5 image columns): Tailored for in-depth conceptual development and exposition alongside a supporting view.
    - `5:7` (5 text columns, 7 image columns): Grants commanding visual weight to vertical compositions paired with concise observations.
    - `6:6` (6 text columns, 6 image columns): Symmetrical equilibrium between prose analysis and specimen image.
    - `Diptychs` (Two paired images sharing a single unified text block): Enables side-by-side comparative observation under one cohesive analytical narrative.
  - **Whitespace Integrity:** If a description concludes in three lines, the container does not force artificial filler text; whitespace breathes naturally.
  - **Compactness Boundary:** The compact rhythm is the default. Reduce repeated vertical gaps before reducing image scale or body line height; mobile display headings step down earlier so they do not dominate the viewport. Compactness must shorten the journey without collapsing the folio-like hierarchy.
  - **Marginal Foliation:** Subtle typographic numerals in the outer margin (`· 01`, `· 02`, `· 03`) orient reader progression without cluttering the photograph.

---

## 6. Elevation & Depth

- **Lithographic Flat Depth:** Strictly flat, print-like elevation achieved through paper shade contrasts (`#FAF8F5` base vs. `#F3EFEA` insets vs. `#FFFFFF` image mats) and crisp 1px hairline boundaries (`#E8E3DC`).
- **Zero Fuzzy Drop Shadows:** Heavy blur drop shadows, dark glows, and floating card elevations are banned.
- **Popovers Elevation:** Floating cards use a crisp 1px stroke with a whisper-soft micro-shadow (`0 4px 12px rgba(28, 26, 24, 0.04)`) to subtly detach from underlying prose.

---

## 7. Responsive Architecture

- **Mobile-First Collapse (< 768px):**
  - All asymmetric multi-column layouts (7:5, 5:7, 6:6, diptychs) smoothly collapse to a single vertical column.
  - Split views stack image first, followed by text.
- **Touch Targets:** All interactive words (glossary terms), navigation links, and buttons uphold a minimum `44px` tap target area.
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
