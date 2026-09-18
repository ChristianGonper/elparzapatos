---
name: sdd-spec
description: >-
  Guía el flujo de trabajo guiado por especificaciones (SDD): redacción de Specs
  (PRDs conceptuales de producto, marca o software), planes de implementación técnica
  y listas de tareas. Activar cuando el usuario pida crear o actualizar una especificación,
  definir un plan técnico, organizar tareas o cerrar un desarrollo.
---

# SDD Spec Workflow

Procedimiento operativo para ejecutar desarrollo y diseño guiado por especificaciones de forma modular, asegurando la separación entre intención para personas y arquitectura técnica para agentes.

---

## 1. Qué es una Spec y Clasificación de Encargos

Una especificación define siempre una **intención orientada a producir un resultado concreto** (una superficie web, un flujo, un módulo de software o un entregable editorial).

### Taxonomía de Encargos

* **Tipo A — Solo Spec (Conceptual, Identidad o Editorial):**
  - Aplica cuando el encargo busca definir el propósito, la narrativa, el índice o las decisiones de un entregable sin requerir desarrollo de software.
  - **Artefactos:** Se redacta únicamente la especificación usando [`plantillas/plantilla-spec.md`](plantillas/plantilla-spec.md).
  - **Ubicación:** Como archivo autónomo `specs/[nombre].md` o carpeta `specs/[nombre]/spec.md`.
  - **Cierre:** Tras la aprobación del usuario, rige directamente la redacción de contenido o el diseño final.

* **Tipo B — Spec con Desarrollo Técnico (Software, Web o Infraestructura):**
  - Aplica cuando el entregable requiere implementación de código, configuración de dependencias o refactorización técnica.
  - **Artefactos:** Requiere obligatoriamente la **tríada modular**:
    1. `spec.md`: Contrato conceptual, intención, comportamiento y ADR (para humanos).
    2. `plan.md`: Arquitectura, contratos de interfaz, dependencias y verificación (para agentes).
    3. `tasks.md`: Lista atómica de tareas secuenciales con criterios de aceptación.
  - **Ubicación:** En su subcarpeta dedicada (en este repositorio: `sitio/specs/[nombre]/`).

---

## 2. Catálogo de Plantillas Disponibles

Las plantillas canónicas residen dentro de la skill en `plantillas/`:

1. **Especificación de Intención:** [`plantillas/plantilla-spec.md`](plantillas/plantilla-spec.md)
   - Contiene: Propósito e Intención, Decisiones Clave (ADR integrado con contexto, decisión, alternativa descartada y criterio de revisión), Comportamiento Esperado (en positivo) y Alcance delimitado.
2. **Plan Técnico de Implementación:** [`plantillas/plantilla-plan.md`](plantillas/plantilla-plan.md)
   - Contiene: Módulos y Archivos Afectados, Modelo de Datos y Contratos, Decisiones Técnicas de Implementación, Estrategia de Verificación y protocolo de Cierre Consolidado.
3. **Lista de Tareas de Ejecución:** [`plantillas/plantilla-tasks.md`](plantillas/plantilla-tasks.md)
   - Contiene: Tareas atómicas (< 30 min) con criterio `Hecho cuando: ...` y protocolo de Resumen de Ejecución final.

---

## 3. Flujo Operativo Paso a Paso

### Paso 1. Clasificar y Redactar la Spec
* Selecciona la plantilla [`plantillas/plantilla-spec.md`](plantillas/plantilla-spec.md).
* **Voz Humana obligatoria:** Enfoque sereno, formulación positiva del valor de uso, decisiones contextualizadas y límites explícitos de versión.
* Si el encargo es **Tipo A**, el flujo culmina aquí tras la validación con el usuario.

### Paso 2. Generar Plan Técnico y Tareas (Tipo B, tras aprobar la Spec)
* Genera `plan.md` a partir de [`plantillas/plantilla-plan.md`](plantillas/plantilla-plan.md), definiendo modelos, contratos y verificación.
* Genera `tasks.md` a partir de [`plantillas/plantilla-tasks.md`](plantillas/plantilla-tasks.md) desglosando pasos verificables.

### Paso 3. Ejecución y Verificación Progresiva
* Implementa una tarea o bloque lógico a la vez.
* Ejecuta pruebas automáticas y comprobaciones manuales. Marca `[x]` únicamente tras confirmar el resultado positivo.

### Paso 4. Cierre Consolidado por Sobrescritura (Eliminar Deuda Técnica)
Cuando el usuario confirma que el desarrollo está aceptado y verificado:
1. **En `spec.md`:** Actualizar únicamente la fecha de última revisión en la cabecera.
2. **En `plan.md`:** **Borrar todo el contenido previo** y sobrescribir con el **Resumen Técnico de Entrega** (módulos modificados, arquitectura final y pruebas superadas).
3. **En `tasks.md`:** **Borrar todo el contenido previo** y sobrescribir con el **Resumen de Ejecución** (hitos entregados y confirmación de validación con la spec).

---

## 4. Tratamiento de Cambios Posteriores

* **Ajuste menor** (cambio tipográfico, retoque de estilo o copy puntual):
  * Modificar directamente la sección afectada en `spec.md` y aplicar el cambio en código.
* **Cambio sustancial** (nuevo flujo, alteración del esquema de datos o nuevas dependencias):
  * Actualizar la `spec.md` primero.
  * Añadir el bloque técnico en `plan.md` y las nuevas tareas en `tasks.md`.
  * Al completar, volver a aplicar el cierre por sobrescritura de resúmenes consolidados.
