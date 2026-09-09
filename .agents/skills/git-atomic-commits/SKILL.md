---
name: git-atomic-commits
description: >
  Organiza y ejecuta commits pequeños, atómicos y ordenados adaptados a cada caso.
  Use when the user asks to commit, guardar cambios en git, o pide commits pequeños/atómicos.
---

# Git Atomic Commits — El Par

Esta skill define el procedimiento para estructurar, empaquetar y redactar commits en el repositorio, garantizando un historial limpio, atómico y legible.

## 1. Principios fundamentales

1. **Atomicidad contextual**: Cada commit debe resolver una única unidad de sentido o responsabilidad técnica o editorial. Si un cambio abarca varias áreas, se divide en commits específicos adaptados al caso concreto.
2. **Estilo de mensajes**:
   - **Idioma:** Siempre en español.
   - **Tono y tiempo verbal:** Tercera persona del presente de indicativo (por ejemplo: *«Actualiza»*, *«Añade»*, *«Conecta»*, *«Refina»*, *«Depura»*, *«Consolida»*, *«Corrige»*, *«Retira»*).
   - **Sin prefijos artificiales:** No usar `feat:`, `fix:`, `chore:`, ni emojis.
   - **Claridad y concisión:** Línea principal de menos de 72 caracteres, sin punto final, específica y descriptiva del propósito del cambio.
3. **Exclusiones estrictas del entorno**:
   - Evitar siempre comandos indiscriminados como `git add .` o `git add -A`. Especificar siempre las rutas exactas.

## 2. Protocolo de ejecución paso a paso

### Paso 1: Auditoría del árbol de trabajo
Ejecutar `git status -u` e identificar:
- Archivos modificados.
- Archivos sin rastrear.
- Rutas que deben quedar deliberadamente fuera del commit.

### Paso 2: Análisis de diferencias y agrupación adaptativa
Inspeccionar las diferencias con `git diff` para delimitar fronteras de responsabilidad adaptadas a cada caso concreto.

*Regla de oro:* Si un commit puede explicarse con una sola frase clara y coherente sin recurrir a enlaces artificiales (*«y además también...»*), está bien delimitado.

### Paso 3: Staging explícito (`git add`)
Realizar staging exclusivamente de las rutas del paquete temático:
Verificar con `git status` que solo lo previsto esté preparado.

### Paso 4: Creación del commit
Redactar el mensaje siguiendo el estilo en presente de indicativo y ejecutar:
Repetir para cada bloque temático identificado.

### Paso 5: Verificación final
Comprobar con `git status` y `git log -n 5 --oneline` para confirmar atomicidad, limpieza y ausencia de rutas excluidas.
