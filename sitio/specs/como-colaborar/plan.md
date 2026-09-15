# Plan de Arquitectura: Página Puente «Cómo colaborar»

**Superficie:** [sitio/como-colaborar.html](../../como-colaborar.html)
**Estado:** Reposo (prototipo v1 maquetado y verificado).

---

## 1. Enfoque Aplicado

- **Estructura editorial de aterrizaje:** Página HTML5 estática con encabezado hospitalario, pasos secuenciados y módulo de dudas y garantías éticas.
- **Jerarquía tipográfica y estética:** Aplicación estricta de tokens de [sitio/DESIGN.md](../../DESIGN.md) (paleta `paper`, `specimen`, `ink`, `cognac`, tipografías Newsreader, Plus Jakarta Sans y JetBrains Mono).
- **Embudo guiado:** Portada interactiva de la guía fotográfica *Tus zapatos en cámara* que conduce al documento completo. Al final, una vista previa no interactiva de Tally abre el formulario externo en una pestaña nueva.

---

## 2. Validación Realizada

- Verificada la legibilidad de los bloques, el trato en tuteo natural y el uso consistente de «Colección» y «El Par» sin términos institucionales ni burocráticos.
- Comprobada la tarjeta interactiva de la portada de la guía con una ruta relativa válida tanto en local como en GitHub Pages, y soporte visual en móvil y escritorio.
- Verificada la correcta resolución del correo oficial y el canal de Instagram (`@elparzapatos`).

---

## 3. Deuda Técnica y Pendientes Menores

- Sustituir el enlace externo de Tally por el formulario propio integrado en la web cuando se desarrolle dicha funcionalidad (registrada como Intención en [TAREAS.md](../../../TAREAS.md)).

## Revisión de copy · 2026-09-15

Aplicados los ajustes editoriales y sincronizado el contrato de copy con Marca. Conservadas la navegación, las imágenes y la estructura existente; ampliadas las preguntas frecuentes de colaboración con el tratamiento de las fotos. Validación de contenido, diferencias y enlaces locales.

Comprobación en Edge a 390 y 1280 px sin desbordamiento horizontal. La guía enlazada conserva sus cuatro hojas sin recorte de contenido en pantalla e impresión.

Cabecera móvil en dos filas, contacto flexible, enlaces de 44 px y párrafos de al menos 15 px. La guía incluye acceso visible al formulario externo y conserva la proporción original de sus láminas en móvil.

Validación móvil en Edge con emulación táctil a 320, 360, 390, 430, 640 y 768 px, y control de escritorio a 1280 px: sin desbordamiento horizontal; enlaces visibles de al menos 44 px por debajo de 768 px. Revisadas capturas y recorrido por pulsación desde la página institucional hasta Tally, sin enviar datos. La guía mantiene cuatro hojas sin recortes en impresión.
