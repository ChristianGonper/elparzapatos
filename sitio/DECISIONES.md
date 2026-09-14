# Registro de Decisiones (ADR)

Libro de decisiones arquitectónicas adoptadas, descartadas definitivamente y bloqueos activos. El trabajo pendiente y las intenciones conceptuales residen en [TAREAS.md](../TAREAS.md).

---

## 1. Criterio de Registro

Este documento recoge el **porqué** de las elecciones técnicas y de producto relevantes de **El Par**.
- Toda decisión adoptada vincula a la spec viva que rige esa superficie.
- Los deseos conceptuales para versiones posteriores viven como **Intenciones** en [TAREAS.md](../TAREAS.md).
- Este registro explica la disyuntiva y los descartes.

---

## 2. Decisiones Arquitectónicas y de Producto Consolidadas

### ADR-01: Tratamiento fotográfico íntegro vs. silueteado artificial
- **Contexto:** Presentación visual de calzado en una colección monográfica de arte y diseño.
- **Decisión:** Encuadre íntegro sin recortes dentro de marcos con fondo blanco neutro, preservando la silueta completa y el suelo con su sombra natural de apoyo.
- **Alternativas descartadas:** Silueteado artificial en software de retoque o recorte por IA.
- **Consecuencias:** Exige disciplina de luz y fondo neutro en las fotos originales; asegura autenticidad estética y serenidad litográfica.
- **Spec que rige:** [sitio/ESPECIFICACION.md](ESPECIFICACION.md) §3.

### ADR-02: Publicación v1 con fotografía limpia vs. cotas conmutables iniciales
- **Contexto:** Demostración de rigor técnico en el lanzamiento y las primeras publicaciones.
- **Decisión:** Publicar v1 exclusivamente con fotografía limpia. El sistema de cotas conmutables queda diseñado pero pospuesto para futuras versiones.
- **Alternativas descartadas:** Lanzar la primera pieza con la capa de cotas vectoriales activa obligatoria.
- **Consecuencias:** Desbloquea la salida inmediata de la primera entrega monográfica sin introducir complejidad de marcado SVG en el primer hito.
- **Spec que rige:** [sitio/specs/monografia/spec.md](specs/monografia/spec.md) §2.4.

### ADR-03: Navegación esencial activa vs. enlaces a secciones vacías
- **Contexto:** Elementos de menú en cabecera para la apertura pública de la web.
- **Decisión:** Limitar la navegación pública exclusivamente a páginas terminadas y operativas (tríada activa: `Colección`, `Sobre El Par` y `Cómo colaborar`, según amplía ADR-06).
- **Alternativas descartadas:** Incluir accesos con carteles de «En construcción» (`Armarios`) o enlaces a perfiles sociales aún no inaugurados.
- **Consecuencias:** Garantiza un sitio sobrio, navegable al 100% y sin sensación de abandono o promesa incumplida.
- **Spec que rige:** [sitio/specs/portada/spec.md](specs/portada/spec.md) §2.1 y [sitio/DECISIONES.md](DECISIONES.md) ADR-06.

### ADR-04: Formulario externo Tally provisional vs. formulario web propio
- **Contexto:** Mecanismo de recepción de material de colaboradoras para la fase piloto.
- **Decisión:** Emplear un formulario Tally conectado mediante Apps Script v3 a Google Sheets con clave unificada de correo.
- **Alternativas descartadas:** Desarrollar un backend complejo con base de datos propia antes de validar la captación.
- **Consecuencias:** Permite operar de forma inmediata y segura; el desarrollo de un formulario web nativo se abordará cuando exista tracción suficiente.
- **Spec que rige:** [marca/04-flujo-de-colaboracion.md](../marca/04-flujo-de-colaboracion.md) y [sitio/specs/como-colaborar/spec.md](specs/como-colaborar/spec.md) §2.4.

### ADR-05: Retícula fluida modular vs. ratio fijo
- **Contexto:** Maquetación de los bloques analíticos de la monografía.
- **Decisión:** Alternar ratios de columnas (7:5, 5:7, 6:6 y dípticos) según el tipo de fotografía y la densidad del apunte.
- **Alternativas descartadas:** Imponer un ratio rígido 7:5 en toda la monografía.
- **Consecuencias:** Elimina la necesidad de escribir párrafos de relleno para igualar alturas y otorga protagonismo visual a tomas verticales o detalles.
- **Spec que rige:** [sitio/specs/monografia/spec.md](specs/monografia/spec.md) §2.2.

### ADR-06: Página unificada «Sobre El Par» vs. dos páginas independientes
- **Contexto:** Comunicación institucional del manifiesto editorial, criterios formales de selección y explicación de cómo se construye la colección a partir de fotos domésticas.
- **Decisión:** Unificar en una única página ([sitio/sobre-el-par.html](sobre-el-par.html)) la mirada al calzado y el método fotográfico de la comunidad, incorporándola como el tercer pilar visible en la navegación de cabecera y pie (`Colección`, `Sobre El Par` y `Cómo colaborar`).
- **Alternativas descartadas:** Mantener dos páginas separadas (`sobre-el-par.html` y `como-se-construye.html`), lo cual fragmentaba el relato y generaba páginas excesivamente breves en v1.
- **Consecuencias:** Ofrece a cualquier visitante o colaboradora una explicación clara, completa y serena de un solo vistazo, evitando duplicar introducciones de principios.
- **Spec que rige:** [sitio/specs/sobre-el-par/spec.md](specs/sobre-el-par/spec.md) y [sitio/ESPECIFICACION.md](ESPECIFICACION.md) §1.

---

## 3. Abierto (bloquea ahora)

Ninguna pregunta bloquea ahora.

---

## 4. Archivo de Ideas Descartadas Definitivamente

Esta tabla contiene exclusivamente alternativas técnicas o conceptuales analizadas y **rechazadas de forma definitiva**:

| Idea | Motivo y Justificación |
| :--- | :--- |
| **Lámina técnica de detalle integrado** | Genera sobrecarga visual y ruido estético; convierte el folio editorial en un plano industrial o manual de despiece mecánico con etiquetas fijas ("placa técnica", lupas flotantes) que manchan la imagen. Se consolidó en su lugar la fotografía limpia y la Variante A a futuro. |
| **Tarjeta biográfica independiente de la dueña** | Desviaba el protagonismo del zapato hacia la persona, aproximando la publicación a un blog social o de estilo de vida. El calzado se sostiene como objeto de estudio; la aportación de la dueña se reconoce mediante la procedencia («Armario de...») y citas textuales orgánicas. |
| **Barra o botón comercial en la cabecera («Aporta tu par»)** | Percibido como un reclamo comercial agresivo de captación. Rompe la serenidad de una monografía editorial. El acceso a colaborar se mantiene sereno al pie de página y en la navegación esencial. |
| **Cuadrícula 7:5 fija e inmutable** | Generaba monotonía y forzaba texto artificial de relleno para igualar la altura de las fotografías. Sustituida por retícula modular fluida. |
| **Numeración de catálogo visible (`par * 0001`, `Lámina 03`)** | Ensucia la fotografía y evoca un inventario de almacén o despiece de fábrica en lugar de una edición de arte y moda. Las referencias numéricas se conservan solo en la gestión interna de Sheets/Drive. |
| **Capitulares (Drop Caps) sistemáticas** | Recargan la lectura y compiten visualmente con los títulos observacionales en Newsreader serif. Descartadas como patrón sistemático. |
