---
name: grilla
description: >-
  Entrevista socrática de alineación de intención. Activar ÚNICAMENTE
  cuando el usuario lo solicite explícitamente (usando el comando /grilla, o pidiendo
  'hazme una grilla', 'entrevístame para alinear' o 'alinear intención').
---

# Entrevista Socrática de Alineación

Procedimiento estructurado para pausar, interrogar socráticamente y alinear la intención oculta del usuario antes de producir, culminando obligatoriamente en un escrito de texto.

---

## 1. Ámbito de Aplicación Universal

Esta herramienta opera sobre **cualquier tipo de archivo y cometido** (software y no software):
* Ensayos, artículos, propuestas y documentos de texto.
* Memorias técnicas, informes científicos e ingeniería.
* Identidad de marca, guías de estilo, manifiestos y contenidos editoriales.
* Código fuente, páginas web, APIs y arquitecturas de software.

Mdula su foco según la naturaleza del encargo.

---

## 2. Fase 0: Inspección Previa (Evidencia Primero)

Antes de formular la primera pregunta:
1. Inspecciona los archivos y documentos existentes en el repositorio relacionados con el encargo.
2. Identifica qué decisiones, restricciones o criterios ya están documentados.
3. **Regla estricta:** Prohibido preguntar aspectos que ya estén resueltos o explícitos en el proyecto. Solo se interroga sobre lo ambiguo, lo implícito o lo no verbalizado.

---

## 3. Dinámica del Interrogatorio

Aplica estrictamente estas 4 reglas durante toda la sesión:

### Regla 1. Micro-Lotes (Máximo 1 a 3 preguntas por turno)
* No envíes cuestionarios extensos ni abrumadores.
* Ordena las preguntas por árbol de dependencias: resuelve primero las decisiones estructurales (propósito, público, alcance) antes de entrar en detalles secundarios.

### Regla 2. Recomendación por Defecto Siempre Incluida
* Cada pregunta debe incluir la propuesta o recomendación explícita del agente con su justificación breve:
  > *«¿Qué enfoque prefieres para X? [Opción A / Opción B].*  
  > ***Recomendación:*** *Sugiero la Opción A porque simplifica el despliegue inicial y evita dependencias externas.»*
* Esto permite al usuario validar rápidamente respondiendo: *«De acuerdo con tu recomendación»*.

### Regla 3. Formato Adaptado al Tipo de Decisión
* **Propósito o prioridades:** Preguntas concretas de opción múltiple o dilemas clave.
* **Documentos, informes o memorias:** Proponer 2 índices alternativos y contrastar sus diferencias estructurales.
* **Aspectos visuales, tono o marca:** Muestras cortas comparativas de redacción o estilo.
* **Detalles menores o reversibles:** Adopta directamente la opción más sensata, documéntala brevemente y no frenes la conversación.

### Regla 4. Cero Burocracia y Foco en Positivo
* Formula en positivo (qué se busca conseguir) en lugar de listas exhaustivas de prohibiciones.
* Enfócate en el valor de uso y la experiencia final.

---

## 4. Criterio de Parada

La entrevista debe ser ágil y resolutiva. Finaliza de inmediato cuando:
1. Se cuenta con claridad suficiente sobre la intención, el propósito y los descartes para dar el siguiente paso útil.
2. Los supuestos críticos están alineados.
3. El usuario indica: *«Listo»*, *«Suficiente»*, *«Procede a redactar»* o equivalente.

Cualquier duda residual menor se resuelve directamente durante la redacción del primer borrador.

---

## 5. Entregable Tangible: Culminación Obligatoria en un Escrito

La entrevista nunca concluye como un intercambio efímero en el chat ni preguntando *«¿y ahora qué hacemos?»*. **Desemboca obligatoriamente en la creación o actualización de un escrito de texto**:

1. **Flujo SDD (Desarrollo guiado por especificaciones):**
   * Redacta o actualiza la especificación viva (`spec.md` / PRD).
   * Incorpora el propósito humano, los límites de alcance y las decisiones acordadas con sus alternativas descartadas (ADR integrado).
2. **Encargos Directos (Ensayos, memorias, informes, marca, textos editoriales):**
   * Vuelca los acuerdos directamente en el archivo de texto final o en su primer borrador estructurado listo para revisión.
3. **Estándar de Redacción (Dual-Tone):**
   * En documentos y especificaciones para personas: redacción fluida, serena y sin metainstrucciones (no escribir frases como *«según lo acordado en la entrevista grill-me»* ni notas de proceso).
   * En partes técnicas o de ingeniería: precisión conceptual y rigor matemático explicados con elegancia pedagógica.
