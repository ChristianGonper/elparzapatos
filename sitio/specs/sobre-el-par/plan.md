# Plan de Arquitectura: Página Institucional «Sobre El Par»

**Superficie:** [src/pages/sobre-el-par.astro](../../src/pages/sobre-el-par.astro) (ruta `/sobre-el-par`)
**Estado:** Reposo (página institucional v1 migrada a Astro y validada).

---

## 1. Enfoque Aplicado

- **Estructura estática en Astro:** Documento semántico y fluido maquetado con componentes modulares y Scoped CSS coherente con el sistema de tokens de [sitio/DESIGN.md](../../DESIGN.md).
- **Tipografía y Paleta:** Newsreader para titulares y citas reflexivas; Plus Jakarta Sans para el cuerpo de texto fluido; JetBrains Mono para los kickers temáticos. Paleta basada en `paper` (`#FAF8F5`), `paper-muted` (`#F3EFEA`), `ink` (`#1C1A18`), `graphite` (`#6B6661`), `cognac` (`#9E6B55`), `hairline` (`#E8E3DC`) y `specimen` (`#FFFFFF`).
- **Ritmo editorial:** Bloques con generoso espaciado vertical (`space-y-16 sm:space-y-24`), límites de ancho de lectura óptima (`max-w-3xl` / `max-w-4xl`), titulares expresivos y citas destacadas sin numeración ordinal artificial.
- **Acompañamiento visual:** Módulo fotográfico sobrio con encuadre íntegro en proporción nativa y fondo blanco neutro, comparando las líneas de un tacón y una bailarina.
- **Canales de contacto e interacción:** Enlaces directos a `mailto:elparzapatos@proton.me`, perfil de Instagram `@elparzapatos` y botón destacado hacia `/como-colaborar`.

---

## 2. Validación Realizada

- Comprobada la jerarquía visual y lectura fluida en escritorio (1280 px) y emulación táctil móvil en múltiples anchos (320, 360, 390, 430, 640 y 768 px) sin desbordamiento horizontal.
- Verificada la ergonomía móvil con cabecera en dos filas, pie flexible con salto de línea y áreas de pulsación de al menos 44 px.
- Comprobada la navegación cruzada en cabecera y pie con las demás vistas del sitio (`/`, `/como-colaborar` y `/entradas/salon-aguja/`), canales de contacto y flujo hacia Tally.
- Verificada la fidelidad editorial con los criterios de Marca: ausencia de números mecánicos de sección, redacción sobria y eliminación del comodín «reales».

---

## 3. Deuda Técnica y Pendientes Menores

- Incorporar fotografías de una monografía publicada en el marco visual cuando esté disponible el primer par de una colaboradora.
- Monitorear la legibilidad de las citas destacadas ante posibles cambios de escala tipográfica en navegadores con zoom accesible elevado.
