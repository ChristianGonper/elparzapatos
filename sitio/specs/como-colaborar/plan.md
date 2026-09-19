# Plan de Arquitectura: Página Puente «Cómo colaborar»

**Superficie:** [src/pages/como-colaborar.astro](../../src/pages/como-colaborar.astro) (ruta `/como-colaborar`)
**Estado:** Reposo (página puente v1 migrada a Astro y validada).

---

## 1. Enfoque Aplicado

- **Estructura editorial de aterrizaje:** Página HTML5 estática con encabezado hospitalario, pasos secuenciados y módulo de dudas y garantías éticas.
- **Jerarquía tipográfica y estética:** Aplicación estricta de tokens de [sitio/DESIGN.md](../../DESIGN.md) (paleta `paper`, `specimen`, `ink`, `cognac`, tipografías Newsreader, Plus Jakarta Sans y JetBrains Mono).
- **Embudo guiado:** Portada interactiva de la guía fotográfica *Tus zapatos en cámara* que conduce al documento completo. Al final, una vista previa no interactiva de Tally abre el formulario externo en una pestaña nueva.

---

## 2. Validación Realizada

- Verificada la legibilidad de los bloques, el trato en tuteo natural, el contrato de copy alineado con Marca y el uso consistente de «Colección» y «El Par» sin términos burocráticos.
- Comprobada la adaptabilidad responsive en escritorio (1280 px) y emulación táctil móvil en múltiples resoluciones (320, 360, 390, 430, 640 y 768 px) sin desbordamiento horizontal.
- Verificada la usabilidad móvil con cabecera en dos filas, pie con salto de línea flexible y enlaces con altura táctil mínima de 44 px.
- Comprobada la tarjeta interactiva de la portada de la guía (*Tus zapatos en cámara*) con ruta relativa válida en local y GitHub Pages, conservando la proporción de sus láminas y sus cuatro hojas sin recortes en pantalla ni impresión.
- Verificado el recorrido completo por pulsación hasta la vista previa no interactiva de Tally y apertura del formulario externo, así como la resolución del correo oficial y perfil de Instagram (`@elparzapatos`).

---

## 3. Deuda Técnica y Pendientes Menores

- Sustituir el enlace externo de Tally por el formulario propio integrado en la web cuando se desarrolle dicha funcionalidad (registrada como Intención en [TAREAS.md](../../../TAREAS.md)).
- Evaluar la respuesta de las primeras colaboradoras para detectar si alguna duda habitual requiere ampliación en las preguntas frecuentes.
