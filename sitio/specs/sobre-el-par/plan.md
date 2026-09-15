# Plan de Arquitectura: Página Institucional «Sobre El Par»

**Superficie:** [sitio/sobre-el-par.html](../../sobre-el-par.html)
**Estado:** Reposo (prototipo v1 maquetado y verificado).

---

## 1. Enfoque Técnico y Estructura

- **Plantilla HTML5 estática:** Documento semántico y fluido maquetado con Tailwind CSS CDN y configuración idéntica a [sitio/como-colaborar.html](../../como-colaborar.html).
- **Tipografía y Paleta:** Newsreader para titulares y citas reflexivas; Plus Jakarta Sans para el cuerpo de texto fluido; JetBrains Mono para los kickers temáticos. Paleta basada en `paper` (`#FAF8F5`), `paper-muted` (`#F3EFEA`), `ink` (`#1C1A18`), `graphite` (`#6B6661`), `cognac` (`#9E6B55`), `hairline` (`#E8E3DC`) y `specimen` (`#FFFFFF`).
- **Ritmo editorial:** Bloques con generoso espaciado vertical (`space-y-16 sm:space-y-24`), límites de ancho de lectura óptima (`max-w-3xl` / `max-w-4xl`), titulares expresivos y citas destacadas sin numeración ordinal artificial.
- **Acompañamiento visual:** Módulo fotográfico sobrio con encuadre íntegro en proporción nativa y fondo blanco neutro, comparando las líneas de un tacón y una bailarina.
- **Canales de contacto e interacción:** Enlaces directos a `mailto:elparzapatos@proton.me`, perfil de Instagram `@elparzapatos` y botón destacado hacia `como-colaborar.html`.

---

## 2. Validación Prevista

- Verificación de jerarquía visual y lectura reposada en viewport móvil (390px) y escritorio (1280px).
- Comprobación de que no existen números mecánicos de sección ni el comodín «reales».
- Navegación cruzada funcional en cabecera y pie con las demás vistas del sitio.

## Revisión de copy · 2026-09-15

Simplificadas la presentación, el criterio de selección, la explicación de las tipologías y la invitación final. Conservadas las imágenes y la navegación. Validación de contenido, diferencias y enlaces locales.

Corregido el desbordamiento del pie mediante enlaces flexibles con salto de línea. Cabecera móvil en dos filas y enlaces con altura táctil mínima de 44 px.

Validación móvil en Edge con emulación táctil a 320, 360, 390, 430, 640 y 768 px, y control de escritorio a 1280 px: sin desbordamiento horizontal; enlaces visibles de al menos 44 px por debajo de 768 px. Revisadas capturas y recorrido por pulsación desde la página institucional hasta Tally, sin enviar datos. La guía mantiene cuatro hojas sin recortes en impresión.
