# Spec: Página Puente «Cómo colaborar»

**Superficie que rige:** [src/pages/como-colaborar.astro](../../src/pages/como-colaborar.astro) (ruta `/como-colaborar`; prototipo previo archivado en [archivo-prototipos/como-colaborar.html](../../archivo-prototipos/como-colaborar.html))  
**Sistema visual:** [sitio/DESIGN.md](../../DESIGN.md)

---

## 1. Propósito y Función

Página de acogida pública integrada en la web real. Su objetivo es recibir a cualquier persona interesada en participar, disipar cualquier temor o duda sobre visibilidad o complejidad técnica, y conducirla de forma serena a través de la guía fotográfica antes de acceder al formulario de recepción.

---

## 2. Estructura y Conducta

### 2.1. Encabezado y Tono Editorial
- **Tono:** Cercano y en tuteo, con explicaciones prácticas adaptadas al momento de participar. Aplica [la identidad editorial](../../../marca/01-identidad-editorial.md) y la [skill de redacción](../../../.agents/skills/redaccion-editorial/SKILL.md).
- **Eyebrow:** `Colaborar en El Par`.
- **Mensaje central:** Invitar a compartir fotografías de tacones y bailarinas para dedicarles una publicación; presentar el interés por sus formas y detalles. El copy literal vive en el HTML.

### 2.2. Flujo en Tres Pasos
1. **Selección del calzado:** Invitación a proponer uno o varios pares por sus formas y detalles y a contribuir a la colección.
2. **Fotografía accesible con móvil:** Buena iluminación natural o artificial y fondo sencillo sin elementos que distraigan. La guía muestra ángulos de referencia.
3. **Envío y acreditación:** Subida mediante el formulario de recepción indicando la modalidad de crédito deseada (nombre, cuenta de Instagram o anonimato).

### 2.3. Compromisos Éticos y Resolución de Dudas (Temas Obligatorios)
- **Cero exigencia comercial:** No importa la marca, el precio ni el estatus; importa el diseño del calzado.
- **Privacidad:** Foco en el zapato. Nunca aparecen rostros ni cuerpos.
- **Edición respetuosa:** Corrección limpia de iluminación y encuadre; prohibida la manipulación artificial con IA generativa o alteración de la forma real.
- **Control y retirada garantizada:** Protocolo de [Marca](../../../marca/04-flujo-de-colaboracion.md#4-política-y-protocolo-de-retirada): eliminación de la web y redes propias en un máximo de 48 horas, por correo oficial o canal directo previo.
- **Esfuerzo de participación:** Explicar las seis vistas propuestas y los detalles opcionales.

### 2.4. Embudo Guiado hacia la Guía Fotográfica
Para asegurar que los envíos contengan las perspectivas necesarias y facilitar la curaduría:
- **Puerta de entrada interactiva:** Portada editorial de la [Guía fotográfica *Tus zapatos en cámara*](../../src/pages/guia-fotografica/index.astro) (ruta canónica `/guia-fotografica/`; activo fuente en [marca/activos/guia-fotografica-colaboradores.html](../../../marca/activos/guia-fotografica-colaboradores.html)). Toda la tarjeta funciona como medio interactivo sobre el que hacer clic para abrir la guía directamente, sin botones explícitos adicionales ni texto accesorio.
- **Vista previa de Tally en el flujo natural:** No se incluye un acceso directo a Tally en la página puente. Al final de la guía aparece una vista previa no interactiva de Tally; al pulsarla, el formulario externo se abre en una pestaña nueva. La guía añade un enlace visible junto a esa vista previa para abrir el formulario aunque el contenido incrustado no haya cargado.
- **Canal de dudas previo:** Acceso directo al correo oficial (`elparzapatos@proton.me`), manteniendo `@elparzapatos` visible como identificador reservado sin enlace activo hasta su lanzamiento.

---

## 3. Cobertura Temática Obligatoria y Canales

- **Garantías obligatorias de acogida:** Cobertura de los 4 compromisos éticos (propósito no comercial, sin rostros ni cuerpos, edición respetuosa sin IA y retirada garantizada en 48 horas).
- **Embudo guiado:** Paso imprescindible por la guía fotográfica interactiva, con una vista previa de Tally al final que conduce al formulario externo y sus modalidades de acreditación (nombre, Instagram o anonimato).
- **Canales oficiales:** [marca/02-nombre-y-presentacion.md](../../../marca/02-nombre-y-presentacion.md) y [marca/04-flujo-de-colaboracion.md](../../../marca/04-flujo-de-colaboracion.md).

## Adaptación móvil

Por debajo de 768 px, la marca y la navegación ocupan filas separadas. Los enlaces permanecen visibles, permiten salto de línea entre destinos y ofrecen al menos 44 px de altura táctil. El pie distribuye sus enlaces en varias líneas según el espacio disponible, sin desplazamiento horizontal.

Los párrafos de explicación mantienen un mínimo de 15 px en móvil; los canales de contacto pueden repartirse en varias líneas.

---

## 4. Decisiones y Alternativas Descartadas

- **ADR-COL-01: Formulario externo Tally provisional vs. formulario web propio:**
  - *Contexto:* Mecanismo de recepción de fotografías y datos de colaboradoras para la fase inicial.
  - *Decisión:* Emplear un formulario Tally conectado mediante Apps Script v3 a Google Sheets con clave unificada de correo, enlazado serenamente al final de la guía fotográfica.
  - *Descarte:* Desarrollar un backend o formulario propio integrado en la web antes de validar el volumen de participación.
  - *Consecuencias:* Permite operar de forma inmediata y segura sin añadir complejidad de servidor en v1. Rige conjuntamente con [marca/04-flujo-de-colaboracion.md](../../../marca/04-flujo-de-colaboracion.md).

---

## 5. Alcance y Delimitación

### Dentro de v1
- Página puente con resolución de dudas, compromisos éticos y presentación del proyecto.
- Embudo guiado hacia la guía fotográfica interactiva.
- Recepción provisional mediante formulario Tally enlazado y conectado a Google Sheets.

### Fuera de v1 (Pospuesto a Versiones Posteriores)
- Formulario web nativo con subida directa de archivos integrado en la página (ADR-COL-01).



