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
- **Tratamiento fotográfico íntegro (`object-contain`):** Encuadre completo sin recortes en marcos normalizados sobre fondo neutro, preservando la silueta completa (puntera, tacón) y el suelo con su sombra natural de apoyo. Se prohíbe el silueteado artificial en Photoshop ([detalle en ESPECIFICACION.md#22-sistema-modular-y-paseo-visual-ritmo-flexible](ESPECIFICACION.md#22-sistema-modular-y-paseo-visual-ritmo-flexible)).
- **Portada adaptativa al volumen:** La entrega más reciente asume el protagonismo superior (Hero Piece); la cuadrícula inferior muestra las demás entregas sin duplicar la destacada; en el arranque con 1 sola pieza inicial, la portada se concentra en la destacada y el cierre colaborativo, sin rejillas vacías ni avisos artificiales de catálogo incompleto. Los filtros por tipología permanecen latentes hasta contar con variedad y volumen representativo ([detalle en ESPECIFICACION.md#32-arquitectura-adaptativa-al-volumen](ESPECIFICACION.md#32-arquitectura-adaptativa-al-volumen)).
- **Navegación esencial activa:** La cabecera pública muestra únicamente accesos reales y operativos (`Archivo` y `Cómo colaborar`). Las secciones pospuestas (`Armarios`, `Sobre El Par`) y el canal de Instagram inactivo se mantienen fuera de la navegación pública hasta su publicación ([detalle en ESPECIFICACION.md#31-cabecera-y-navegación-esencial-activa](ESPECIFICACION.md#31-cabecera-y-navegación-esencial-activa)).
- **Pieza destacada (*Hero Piece*) depurada:** Se suprimen párrafos descriptivos secundarios redundantes. Solo conserva metadatos superiores, título en serif, subtítulo descriptivo en una línea y enlace sobrio `Ver estudio →` ([detalle en ESPECIFICACION.md#33-pieza-destacada-hero-piece](ESPECIFICACION.md#33-pieza-destacada-hero-piece)).
- **Cuadrícula interactiva sin ruido de botones:** Toda la tarjeta actúa como enlace natural. Se eliminan divisores de pie y llamadas repetitivas tipo `Leer análisis →` ([detalle en ESPECIFICACION.md#34-cuadrícula-de-fichas-del-archivo](ESPECIFICACION.md#34-cuadrícula-de-fichas-del-archivo)).
- **Tono no comercial:** Supresión de banners, reclamos de suscripción o botones de compra. La invitación a colaborar se aloja serena al pie con una llamada a proponer y compartir un par propio ([detalle en ESPECIFICACION.md#35-pie-y-cierre-de-portada](ESPECIFICACION.md#35-pie-y-cierre-de-portada)).

### Entrada Monográfica y Estructura Editorial
- **Titulación nacida de la observación honesta:** El título revela un rasgo visual auténtico que la fotografía demuestra (ej. *«Dos extremos, una silueta»*), acompañado de subtítulo descriptivo riguroso y procedencia (*«Armario de: [Nombre]»*) ([detalle en ESPECIFICACION.md#21-bloque-de-apertura-y-cabecera](ESPECIFICACION.md#21-bloque-de-apertura-y-cabecera)).
- **Paseo visual modular con mínimo 6 fotografías reales:** Cada monografía cuenta con al menos las 6 tomas canónicas de la guía colaborativa y se articula en una secuencia flexible de módulos adaptados a los rasgos de cada par ([detalle en ESPECIFICACION.md#22-sistema-modular-y-paseo-visual-ritmo-flexible](ESPECIFICACION.md#22-sistema-modular-y-paseo-visual-ritmo-flexible)).
- **Ampliación fotográfica (Lightbox minimalista):** Clic en cualquier fotografía despliega una vista limpia a pantalla completa sobre fondo neutro (cierre por clic o `Esc`), permitiendo inspeccionar texturas, costuras y grano sin elementos de interfaz invasivos ([detalle en ESPECIFICACION.md#23-ampliación-fotográfica-lightbox-minimalista](ESPECIFICACION.md#23-ampliación-fotográfica-lightbox-minimalista)).
- **Retícula fluida vs. ratio rígido 7:5:** Proporciones variables (7:5, 6:6, 5:7 y dípticos) según el volumen de la explicación y la orientación de la foto ([detalle en ESPECIFICACION.md#22-sistema-modular-y-paseo-visual-ritmo-flexible](ESPECIFICACION.md#22-sistema-modular-y-paseo-visual-ritmo-flexible)).
- **v1 y primeras publicaciones sin cotas:** Las primeras piezas van con fotografía limpia; el sistema de cotas conmutables queda diseñado pero fuera de v1 ([detalle en ESPECIFICACION.md#24-sistema-de-anotaciones-sobre-la-imagen-cotas](ESPECIFICACION.md#24-sistema-de-anotaciones-sobre-la-imagen-cotas)).
- **Popovers contextuales y diccionario canónico:** Subrayado punteado cuero `#9E6B55` activo en *hover* y *tap* (término ES/EN y 1-2 frases concisas). El diccionario canónico de términos iniciales se fija en la especificación como fuente única de verdad ([detalle en ESPECIFICACION.md#25-glosario-en-contexto-popovers-flotantes-y-diccionario-canónico](ESPECIFICACION.md#25-glosario-en-contexto-popovers-flotantes-y-diccionario-canónico)).
- **Ficha «Datos del par» tipográfica:** Composición continua fluida tipo catálogo de museo con 5 campos objetivos ([detalle en ESPECIFICACION.md#27-ficha-datos-del-par-cédula-de-museo](ESPECIFICACION.md#27-ficha-datos-del-par-cédula-de-museo)).
- **Navegación secuencial al pie:** Enlaces discretos `← Entrega anterior: [Título]` y `Entrega siguiente: [Título] →` tras la cédula de museo. El módulo de sugeridos/relacionados queda pospuesto para cuando haya mayor volumen ([detalle en ESPECIFICACION.md#28-navegación-secuencial-al-pie](ESPECIFICACION.md#28-navegación-secuencial-al-pie)).
- **Atribución respetuosa con crédito acordado:** `Armario de [Nombre/Alias]` con mención/@enlace a Instagram condicional según autorización. Enlace a vista de armario dedicada pospuesto ([detalle en ESPECIFICACION.md#21-bloque-de-apertura-y-cabecera](ESPECIFICACION.md#21-bloque-de-apertura-y-cabecera)).
- **Slugs descriptivos enriquecidos:** Formato `/entradas/[silueta]-[rasgo]-[material-o-detalle].html` con desempate natural por procedencia (`[slug]-[nombre]`) si existieran piezas idénticas ([detalle en ESPECIFICACION.md#210-nomenclatura-de-urls-slugs](ESPECIFICACION.md#210-nomenclatura-de-urls-slugs)).

### Secuenciación y Alcance
- **Página puente «Cómo colaborar» activa en lanzamiento:** `como-colaborar.html` se incluye en el paquete inicial de la web real junto al índice y la primera pieza para dar acogida y destino natural al botón `Comparte un par → Cómo colaborar` ([detalle en ESPECIFICACION.md#4-especificación-de-la-página-puente-cómo-colaborar-como-colaborarhtml](ESPECIFICACION.md#4-especificación-de-la-página-puente-cómo-colaborar-como-colaborarhtml)).
- **Sin piloto paralelo en Instagram:** La primera entrada real valida exclusivamente el formato web, la galería y el flujo de colaboración. El lanzamiento del perfil de Instagram está pospuesto y no va atado a esa primera pieza.
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
| **Módulo de piezas recomendadas/sugeridas al pie** | **Pospuesta** | Requiere un catálogo con volumen; en la fase inicial se implementa navegación secuencial editorial (`← Anterior` / `Siguiente →`). |
| **Ficha o página dedicada e independiente para cada término del glosario** | **Pospuesta** | En v1 los términos se resuelven mediante popovers flotantes con el diccionario canónico integrado en la especificación. |
