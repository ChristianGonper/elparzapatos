# Registro de Decisiones

Libro de lo **ya resuelto** (aceptado, descartado o pospuesto) y de las preguntas que **bloquean ahora**. No es una lista de trabajo: eso es [TAREAS.md](../TAREAS.md).

---

## 1. Criterio de Registro

Este documento es el registro histórico y de gobernanza (ADR) del proyecto. Recoge el **porqué** de las decisiones de diseño y producto adoptadas, descartadas o pospuestas.

- La especificación técnica y de componentes vive de forma canónica en [ESPECIFICACION.md](ESPECIFICACION.md).
- El sistema de diseño visual vive en [DESIGN.md](DESIGN.md).
- El trabajo abierto por hacer está en [TAREAS.md](../TAREAS.md).

---

## 2. Decisiones de Diseño y Producto Consolidadas

### Identidad Visual, Portada y Silencio Editorial
- **Fotografía limpia sobre paspartú neutro:** Se eliminan etiquetas superpuestas (`par * 0001`, badges en esquinas) para mantener el tono de archivo de arte.
- **Pieza destacada (*Hero Piece*) depurada:** Se suprimen párrafos descriptivos secundarios redundantes. Solo conserva metadatos superiores, título en serif, subtítulo taxonómico en una línea y enlace sobrio `Ver estudio →` ([detalle en ESPECIFICACION.md#32-pieza-destacada-hero-piece](ESPECIFICACION.md#32-pieza-destacada-hero-piece)).
- **Cuadrícula interactiva sin ruido de botones:** Toda la tarjeta actúa como enlace natural. Se eliminan divisores de pie y llamadas repetitivas tipo `Leer análisis →` ([detalle en ESPECIFICACION.md#34-cuadrícula-de-fichas-del-archivo](ESPECIFICACION.md#34-cuadrícula-de-fichas-del-archivo)).
- **Tono no comercial:** Supresión de banners, reclamos de suscripción o botones de compra. La invitación a colaborar se aloja serena al pie bajo la fórmula de *«abrir las puertas del propio armario»* ([detalle en ESPECIFICACION.md#35-pie-y-cierre-de-portada](ESPECIFICACION.md#35-pie-y-cierre-de-portada)).
- **Navegación sobria:** Menú estructurado con *Archivo*, *Ver Armarios* y *Sobre El Par*, descartando *Manifiesto*.

### Entrada Monográfica y Estructura Editorial
- **Titulación nacida de la observación honesta:** El título revela un rasgo visual auténtico que la fotografía demuestra (ej. *«Dos extremos, una silueta»*), acompañado de subtítulo taxonómico riguroso y procedencia (*«Armario de: [Nombre]»*) ([detalle en ESPECIFICACION.md#21-bloque-de-apertura-y-cabecera](ESPECIFICACION.md#21-bloque-de-apertura-y-cabecera)).
- **Retícula fluida vs. ratio rígido 7:5:** Para no forzar texto de relleno artificial, se adoptan proporciones variables (7:5, 6:6, 5:7 y dípticos) según el volumen de la explicación y la orientación de la foto ([detalle en ESPECIFICACION.md#22-sistema-de-cuadrícula-flexible-y-paseo-visual](ESPECIFICACION.md#22-sistema-de-cuadrícula-flexible-y-paseo-visual)).
- **v1 y primeras publicaciones sin cotas:** Se descartan las láminas técnicas fijas con lupas o placas. El sistema de cotas conmutables queda diseñado pero fuera de v1; las primeras piezas van con fotografía limpia ([detalle en ESPECIFICACION.md#23-sistema-de-anotaciones-anatómicas-en-imagen-pedagogía-gráfica](ESPECIFICACION.md#23-sistema-de-anotaciones-anatómicas-en-imagen-pedagogía-gráfica)).
- **Ficha «Datos del par» tipográfica:** Se descarta la tabla rígida de formulario. Se adopta una composición continua fluida tipo catálogo de museo ([detalle en ESPECIFICACION.md#26-ficha-datos-del-par](ESPECIFICACION.md#26-ficha-datos-del-par)).
- **Popovers anatómicos contextuales:** Subrayado punteado cuero `#9E6B55` activo en *hover* y *tap*, sin oscurecer la pantalla ([detalle en ESPECIFICACION.md#24-glosario-anatómico-en-contexto-popovers-flotantes](ESPECIFICACION.md#24-glosario-anatómico-en-contexto-popovers-flotantes)).

### Secuenciación y Alcance
- **Sin piloto paralelo en Instagram:** La primera entrada real valida exclusivamente el formato web, la galería y el flujo de colaboración. El lanzamiento del perfil de Instagram está pospuesto y no va atado a esa primera pieza.
- **Stack definitivo diferido:** Gestor de contenidos (CMS), arquitectura multilingüe y base de datos se definirán tras validar la publicación de las primeras piezas.
- **Formulario Tally provisional:** Cubre la fase operativa inicial mientras no exista el formulario integrado en la web.
- **Revisión de la colaboradora:** Validación previa de crédito y citas textuales, no de la pieza completa.

---

## 3. Abierto (bloquea ahora)

Ninguna pregunta bloquea ahora.

---

## 4. Archivo de Ideas Descartadas o Pospuestas

| Idea | Estado | Motivo y Justificación |
| :--- | :---: | :--- |
| **Lámina técnica de detalle integrado (Variante B con placas/cajas sobre la imagen)** | **Descartada** | Genera sobrecarga visual y ruido estético; convierte el folio editorial en un plano industrial o manual de despiece mecánico con etiquetas fijas ("placa técnica", lupas flotantes) que manchan la imagen. Se consolida en su lugar la Variante A (cotas vectoriales conmutables discretas). |
| **Tarjeta biográfica independiente de la dueña** | **Descartada** | Desviaba el protagonismo del zapato hacia la persona, aproximando la publicación a un blog social o de estilo de vida. El calzado debe sostenerse como objeto de estudio; la aportación de la dueña funciona mejor como filtro de procedencia («Armario de...») y cita testimonial orgánica. |
| **Hover interactivo texto-imagen** | **Pospuesta** | Vincular palabras en el texto a encendidos lumínicos en la imagen añade complejidad técnica y puede entorpecer la lectura pausada. Se opta por una solución más robusta y limpia: botón de control de anotaciones anatómicas directas sobre la foto. |
| **Barra/botón de llamada en la cabecera («Aporta tu par»)** | **Descartada** | Percibido como un elemento comercial agresivo («muy de ventas»). Rompe la serenidad de una monografía editorial. El acceso a colaborar se mantiene discreto en el pie y en cierres de página. |
| **Cuadrícula 7:5 fija e inmutable** | **Descartada** | Generaba monotonía y obligaba a extender artificialmente párrafos explicativos para igualar la altura de las fotografías. Se sustituye por un sistema de retícula flexible (5:7, 6:6, 7:5 y dípticos). |
| **Numeración de catálogo visible (`par * 0001`, `Lámina 03`)** | **Descartada** | Ensucia la fotografía y evoca un manual de despiece industrial o inventario de almacén en lugar de una edición de arte y moda. Las referencias numéricas quedan exclusivamente en el sistema interno de gestión. |
| **Capitulares (Drop Caps) sistemáticas** | **Limitada** | Se descarta su uso automático en todos los bloques. Únicamente se valorará de forma puntual en entradillas de gran extensión para no competir con el título. |
| **Traducción completa al inglés** | **Pospuesta** | El archivo se publica en español; la correspondencia EN vive en el glosario. No bloquea prototipo ni primera pieza. |
| **Categorías exhaustivas y ritmo final de publicación** | **Pospuesta** | Se afinan con un archivo real, no a priori. |
| **Monetización, afiliados o colaboraciones comerciales** | **Pospuesta** | Fuera de alcance mientras se fija el archivo editorial. |
| **Formulario de recepción «definitivo»** | **Pospuesta** | Tally cubre el piloto. El formulario propio espera a la web. |
| **Lanzamiento de Instagram** | **Pospuesta** | Los formatos de pieza están en [03](../marca/03-sistema-editorial-y-contenidos.md). Falta decidir cuándo se abre el perfil, con qué (vacío, una pieza, varias) y en qué orden. No se ejecuta con la primera entrada web. |
| **Cotas / anotaciones sobre la imagen en publicación** | **Pospuesta (v1.5 / v2)** | v1 y primeras piezas: fotografía limpia. El interruptor de cotas (Variante A) se incorpora en una versión posterior de la web. |
