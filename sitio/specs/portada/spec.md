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
