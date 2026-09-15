---
name: git-atomic-commits
description: >
  Organiza y ejecuta commits pequeños, atómicos y ordenados adaptados a cada caso.
  Use when the user asks to commit, guardar cambios en git, o pide commits pequeños/atómicos.
---

# Git Atomic Commits — El Par

Esta skill define el procedimiento para estructurar, empaquetar y redactar commits en el repositorio, garantizando un historial limpio, atómico y legible.

## 1. Principios fundamentales

1. **Unidad lógica de sentido (atomicidad real)**:
   - Un commit atómico representa la **unidad lógica mínima completa** que tiene sentido por sí misma y deja el repositorio en un estado íntegro, coherente y funcional.
   - La atomicidad la define el **propósito del cambio**, no el número de archivos.
   - Si un cambio requiere conjuntamente su implementación (HTML, estilos, scripts), sus activos asociados y la actualización de su especificación viva, todo ese bloque conforma una sola unidad lógica y se empaqueta en el mismo commit.
   - Si una misma intervención coherente se despliega de forma transversal sobre varios archivos vinculados a un único objetivo, se agrupan en un único commit que describa esa intención común.

2. **Gobernanza y trazabilidad integradas**:
   - La documentación que acompaña o refleja el trabajo (`spec.md`, `plan.md`, `tasks.md`, o el apunte correspondiente en `TAREAS.md` / `ESTADO.md`) se integra dentro del propio commit del cambio que resuelve.
   - Mantener la gobernanza unida a su implementación garantiza correspondencia directa en el historial y evita dispersar el registro en commits aislados de mero seguimiento.

3. **Delimitación de responsabilidades**:
   - Se dividen en commits independientes aquellos cambios que obedecen a motivos o áreas de trabajo desacopladas.

4. **Estilo de mensajes**:
   - **Idioma:** Siempre en español.
   - **Tono y tiempo verbal:** Tercera persona del presente de indicativo (por ejemplo: *«Actualiza»*, *«Añade»*, *«Conecta»*, *«Refina»*, *«Depura»*, *«Consolida»*, *«Corrige»*, *«Retira»*).
   - **Sin prefijos artificiales:** No usar `feat:`, `fix:`, `chore:`, ni emojis.
   - **Claridad y concisión:** Línea principal de menos de 72 caracteres, sin punto final, específica y descriptiva del propósito del cambio.

5. **Staging explícito**:
   - Preparar deliberadamente las rutas exactas de cada paquete temático mediante `git add <ruta1> <ruta2> ...` para garantizar que solo entre lo que forma parte de la unidad lógica prevista.

## 2. Protocolo de ejecución paso a paso

### Paso 1: Auditoría del árbol de trabajo
Ejecutar `git status -u` para revisar:
- Archivos modificados y nuevos en el espacio de trabajo.
- Archivos o notas temporales que deban permanecer fuera del commit.

### Paso 2: Identificación de unidades lógicas
Inspeccionar las diferencias con `git diff` y agrupar los cambios por propósito:
- Reunir en un mismo paquete la implementación, sus recursos y la gobernanza directamente vinculada.
- Distinguir si conviven intenciones de trabajo independientes que deban confirmarse en pasos separados.

### Paso 3: Staging explícito (`git add`)
Añadir las rutas que componen la unidad lógica:
```bash
git add <ruta/archivo-1> <ruta/archivo-2> ...
```
Confirmar con `git status` que el área de preparación refleja exactamente el alcance buscado.

### Paso 4: Creación del commit
Redactar el mensaje en presente de indicativo expresando la intención completa:
```bash
git commit -m "Describe la unidad lógica resuelta"
```
Repetir para las demás unidades identificadas, si las hubiera.

### Paso 5: Verificación final
Revisar con `git status` y `git log -n 5 --oneline` para comprobar que el árbol queda limpio y el historial refleja hitos de trabajo coherentes y legibles.
