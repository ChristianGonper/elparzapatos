# Spec: Portada de la Colección

**Superficie que rige:** [sitio/index.html](../../index.html)
**Sistema visual:** [sitio/DESIGN.md](../../DESIGN.md)

---

## 1. Propósito y Función

La portada es la antesala y el índice vivo de la colección monográfica de **El Par**. Recibe al lector con una pieza destacada dominante y organiza el catálogo de calzado sin recursos comerciales ni reclamos agresivos.

---

## 2. Estructura y Conducta

### 2.1. Cabecera y Tríada de Navegación Activa
- **Identidad:** Logotipo **El Par** en Newsreader serif y descriptor **Zapatos en detalle** en mono tenue.
- **Tríada de navegación activa:**
  - `Colección`: Enlace o ancla directa a la cuadrícula de la colección (`#coleccion`).
  - `Sobre El Par`: Acceso a la página institucional [sitio/sobre-el-par.html](../../sobre-el-par.html).
  - `Cómo colaborar`: Acceso a la página puente [sitio/como-colaborar.html](../../como-colaborar.html).
  - Canal oficial de Instagram `@elparzapatos` accesible en pantallas medianas y grandes.
- **Límites de navegación:** Se reserva el directorio de `Armarios` para una versión posterior del sitio cuando exista volumen representativo de colaboradoras recurrentes.
- **Comportamiento al desplazarse:** La cabecera forma parte del flujo normal del documento. No permanece fija ni reaparece de forma automática; el pie repite las rutas esenciales al final de la lectura.

### 2.2. Arquitectura Adaptativa al Volumen
La interfaz se adapta a la cantidad real de entregas catalogadas:
- **Arranque inicial (1 sola entrega):** La portada otorga todo el protagonismo a la pieza inaugural y enlaza directamente al cierre colaborativo, sin mostrar rejillas vacías ni avisos artificiales de catálogo incompleto.
- **Con múltiples entregas (2 o más):**
  - **Pieza destacada (*Hero Piece*):** La entrega más reciente asume el protagonismo superior a ancho completo.
  - **Cuadrícula inferior:** Muestra las demás entregas sin duplicar la pieza destacada.
- **Filtros por tipología (*Salones*, *Merceditas*, *Bailarinas*, etc.):** Permanecen latentes e invisibles hasta que existan al menos dos tipologías distintas catalogadas con volumen representativo.

### 2.3. Pieza Destacada (*Hero Piece*)
- **Marco fotográfico:** Contenedor con paspartú amplio y limpio sobre Specimen White, aplicando `object-contain` íntegro.
- **Metadatos y tipografía:**
  - Metadatos superiores: `Pieza Destacada` y `Armario de [Nombre]` en mono tenue.
  - Título observacional en Newsreader serif (ej. *«Dos extremos, una silueta»*).
  - Subtítulo descriptivo en una sola línea en sans-serif neutra.
  - Enlace sobrio: fórmula fija `Ver estudio →`.
- **Silencio editorial:** Se eliminan párrafos descriptivos secundarios para priorizar la presencia visual del objeto y el espacio negativo.
- **Composición aprobada:** En escritorio, fotografía a la izquierda y bloque editorial a la derecha. En móvil, la fotografía aparece primero para que título, procedencia y descripción se lean inmediatamente asociados a ella.
- **Inspección:** La fotografía abre la ampliación. En dispositivos con puntero, el marco cambia sutilmente de color y brillo al pasar el ratón; no se amplía ni desplaza la imagen. El mismo estado se ofrece mediante foco de teclado.

### 2.4. Cuadrícula de la Colección
- **Tarjetas:** Delimitadas por filete sutil `Hairline Dust Border` y fondo `Specimen White` en el marco de la imagen.
- **Fotografía:** Presentación con `object-contain` íntegro, preservando la silueta completa y el suelo con su sombra natural de apoyo. Prohibido el silueteado artificial.
- **Metadatos bajo la imagen:**
  - Procedencia: `Armario de [Nombre]` en mono tenue.
  - Título: Observación editorial en serif.
  - Subtítulo: Identificación taxonómica en sans-serif neutra.
- **Interacción:** La tarjeta completa actúa como enlace orgánico a su respectiva monografía en `entradas/[slug].html`. Se suprimen botones repetitivos tipo `Leer análisis →`.

### 2.5. Pie y Cierre Colaborativo
- **Cierre colaborativo:** Bloque en superficie `Muted Linen Surface` invitando a participar:
  - Fórmula nombrada: `Comparte un par`.
  - Botón de acción: `Cómo colaborar →` hacia [sitio/como-colaborar.html](../../como-colaborar.html).
- **Pie institucional:** Descriptor del proyecto y créditos de cortesía serenos, sin banners ni llamadas comerciales.

---

## 3. Fórmulas Canónicas y Canales

- **Fórmulas fijas de interfaz:** `Colección`, `Pieza Destacada`, `Armario de [Nombre]`, `Ver estudio →`, `Comparte un par`, `Cómo colaborar →`.
- **Canales oficiales:** [marca/02-nombre-y-presentacion.md](../../../marca/02-nombre-y-presentacion.md).

---

## 4. Decisiones y Alternativas Descartadas

- **ADR-POR-01: Portada inaugural directa vs. introducción y catálogo repetido:**
  - *Contexto:* En el lanzamiento habrá una sola publicación. Un texto introductorio general y una tarjeta de colección con la misma pieza duplicarían información y alargarían innecesariamente la portada.
  - *Decisión:* Abrir directamente con una composición en dos columnas —fotografía a la izquierda y texto a la derecha— y pasar de la pieza destacada al cierre colaborativo. En móvil se muestra primero la imagen. La cuadrícula de colección aparece únicamente desde la segunda publicación.
  - *Descarte:* Hero tipográfico previo, fotografía apilada sobre el texto en escritorio y repetición de la única pieza como tarjeta de colección.
- **Barra o botón comercial en la cabecera («Aporta tu par»):** Descartado definitivamente por percibirse como un reclamo agresivo de captación. Rompe la serenidad editorial; el acceso a colaborar se mantiene sereno al pie de página y en la navegación esencial.

---

## 5. Alcance y Delimitación

### Dentro de v1
- Portada con pieza destacada dominante adaptada al volumen del catálogo (apertura directa con la primera monografía, cuadrícula completa a partir de múltiples entregas).
- Enlace en tarjeta completa hacia cada monografía.
- Cierre colaborativo inferior con llamada sobria a la participación.

### Fuera de v1 (Pospuesto a Versiones Posteriores)
- Directorio de armarios particulares (`armarios.html`).
- Filtros taxonómicos por tipología de calzado (salones, bailarinas, merceditas; requieren volumen suficiente).



