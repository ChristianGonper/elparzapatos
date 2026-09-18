---
name: sdd-spec
description: >-
  Guía el flujo de trabajo guiado por especificaciones (SDD): redacción de Specs
  (PRDs conceptuales de producto, marca o software), planes de implementación técnica
  y listas de tareas. Activar cuando el usuario pida crear o actualizar una especificación,
  definir un plan técnico, organizar tareas o cerrar un desarrollo.
---

# SDD Spec Workflow

Procedimiento operativo para ejecutar desarrollo y diseño guiado por especificaciones de forma modular.

---

## 1. Qué es una Spec y Cómo se Organiza

* **Definición de Spec:** Una especificación define siempre una **intención orientada a producir un output concreto** (una página web, un flujo, un entregable de texto o un módulo).
* **Estructura en `specs/`:**
  * **Solo Spec (sin plan ni tareas):** Vive directamente como archivo en la raíz de specs: `specs/[nombre].md`.
  * **Spec con Desarrollo (requiere plan y tareas):** Vive en su propia subcarpeta: `specs/[nombre]/` conteniendo la tríada de archivos hermanos:
    * `spec.md` (La intención y el qué para humanos).
    * `plan.md` (La arquitectura y el cómo técnico para agentes).
    * `tasks.md` (El checklist de ejecución).

---

## 2. Flujo de Trabajo

### Paso 1. Clasificar y Redactar la Spec
* Usa [`docs/specs/plantillas/plantilla-spec.md`](../../../docs/specs/plantillas/plantilla-spec.md).
* **Voz Humana obligatoria:** Propósito e intención, Decisiones y alternativas descartadas (ADR integrado), Comportamiento esperado (en positivo) y Alcance delimitado.
* Si el encargo es de Tipo A, el flujo termina aquí y rige directamente el contenido final.

### Paso 2. Generar Plan y Tareas (Solo Tipo B, tras aprobar la Spec)
* Genera `plan.md` usando [`docs/specs/plantillas/plantilla-plan.md`](../../../docs/specs/plantillas/plantilla-plan.md).
* Genera `tasks.md` usando [`docs/specs/plantillas/plantilla-tasks.md`](../../../docs/specs/plantillas/plantilla-tasks.md) con tareas atómicas y criterios `Hecho cuando: ...`.

### Paso 3. Ejecución y Verificación Progresiva
* Implementa una tarea o bloque lógico a la vez.
* Ejecuta pruebas o verificaciones. Marca `[x]` solo tras comprobar el resultado.

### Paso 4. Cierre Consolidado por Sobrescritura (Eliminar texto previo)
Cuando el usuario confirma que el desarrollo está aceptado y verificado:
1. **En `spec.md`:** Se actualiza únicamente la fecha de última revisión en la cabecera.
2. **En `plan.md`:** 
   - **Se borra todo el contenido anterior** del archivo.
   - Se sobrescribe dejando **únicamente el Resumen Técnico Consolidado**: módulos/archivos tocados, arquitectura final y pruebas superadas.
3. **En `tasks.md`:** 
   - **Se borra todo el contenido anterior** del archivo.
   - Se sobrescribe dejando **únicamente el Resumen de Ejecución**: hitos completados y confirmación de validación con la spec.

---

## 3. Tratamiento de Cambios Posteriores

* **Ajuste menor** (cambio de un botón, estilo o texto puntual):
  * Modifica directamente la sección correspondiente en `spec.md` y aplica el cambio en código.
* **Cambio sustancial** (nuevo flujo, dependencias o impacto estructural):
  * Actualiza la `spec.md` primero.
  * Añade el nuevo bloque técnico en `plan.md` y las nuevas tareas en `tasks.md`.
  * Al completar, se vuelve a aplicar el cierre por sobrescritura de resúmenes.
