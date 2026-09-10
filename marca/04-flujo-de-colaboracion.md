# Flujo de Colaboración

Manual operativo para la gestión de colaboraciones con dueñas de calzado.

---

## 1. Principio Fundamental

Invitar, nunca encargar. El proceso debe ser fluido, agradable y sencillo para la persona que aporta sus zapatos. No se piden fotos de estudio ni se abruma a la colaboradora con instrucciones técnicas en la primera toma de contacto. 

*Para ejemplos de conversación y fórmulas de mensaje adaptables, consultar [activos/Contactos-previos.md](activos/Contactos-previos.md).*

---

## 2. Las Cinco Fases del Proceso

```
[1. Selección] ➔ [2. Primer Contacto] ➔ [3. Guía y Envío] ➔ [4. Edición] ➔ [5. Publicación]
                                                                      │
                                                                      ▼
                                                                (Retirada si se solicita)
```

### Fase 1. Identificación y Selección
- **Criterio:** Elegir un par por un motivo visual concreto (silueta, puntera, tacón, cierre o textura).
- **Perfil inicial:** Priorizar personas cercanas o perfiles afines con interés por el diseño.

### Fase 2. Primer Contacto
- **Objetivo:** Despertar interés y validar disposición de forma natural.
- **Qué contar:** Presentar qué es *El Par — Zapatos en detalle* en una frase y plantear la invitación según el caso:
  - *Opción A (Par concreto visto):* Explicar qué detalle o silueta nos ha llamado la atención de ese modelo en particular.
  - *Opción B (Armario / Colección interesante):* Proponerle la idea sabiendo que le gusta el calzado o tiene pares con personalidad, invitándola a compartir fotos de varios para seleccionar juntas el primero.
- **Qué NO hacer:** No enviar la guía fotográfica ni enlaces de formularios todavía. No dar instrucciones técnicas en este primer mensaje.

### Fase 3. Envío de Guía y Recepción
- **Momento:** Solo cuando la colaboradora confirma su entusiasmo o interés.
- **Qué entregar:** la guía *Tus zapatos en cámara* ([https://christiangonper.github.io/elparzapatos/marca/activos/guia-fotografica-colaboradores.html](https://christiangonper.github.io/elparzapatos/marca/activos/guia-fotografica-colaboradores.html); fuente local en [activos/guia-fotografica-colaboradores.html](activos/guia-fotografica-colaboradores.html)) y el enlace al formulario de recepción en Tally: [https://tally.so/r/Npj2bl](https://tally.so/r/Npj2bl) (admite hasta siete pares por envío). Detalles operativos y de almacenamiento en [activos/tally-recepcion.md](activos/tally-recepcion.md); fuente de referencia en [activos/tally-formulario-colaboracion.md](activos/tally-formulario-colaboracion.md).
- **Mensaje clave:** Recordar que son fotos caseras con luz natural y fondo tranquilo, sin necesidad de equipo profesional ni salir ella.

### Fase 4. Curaduría, Chequeo y Redacción
- **Revisión visual y permisividad honesta:** Todo material doméstico tomado con buena luz natural se considera aprovechable por defecto. No se descartan fotos por grano leve o falta de equipo profesional. Si falta una vista secundaria (interior, suela), la monografía se adapta al material existente sin exigir tomas adicionales a la colaboradora.
- **Criterio para pedir una imagen adicional:**
  - *Cuándo pedir:* Solo si falta una perspectiva vertebral imprescindible (silueta general de perfil o tacón) y el texto no puede sostenerse con rigor sin ella.
  - *Cómo pedir:* Agradecer primero, plantear la petición desde la curiosidad genuina por un detalle concreto (sin tono de fallo técnico ni encargo profesional) y recordar que basta una toma rápida con el móvil.
- **Tratamiento y límites de edición de la imagen:**
  - *Proporciones fotográficas:* Las fotos se capturan habitualmente en ratio nativo de cámara 3:4 (vertical) o 4:3 (horizontal).
  - *Ajustes válidos:* Reencuadre sutil para equilibrar o cuadrar formato, nivelado leve del plano de apoyo y corrección tonal limpia (balance de blancos para neutralizar dominantes domésticas y levantamiento de sombras en cueros oscuros).
  - *Prohibición de IA generativa masiva:* Prohibido usar modelos generativos completos. Solo se admiten herramientas de edición puntual / redes neuronales pequeñas que no dejen huella ni inventen píxeles nuevos.
  - *Respeto al calzado:* No borrar arrugas, pliegues ni marcas de uso naturales.
  - *Fondos y sombras reales:* En la operación habitual no se extraen fondos ni se siluetea el calzado; el zapato conserva su apoyo y sombra natural (la extracción de fondos queda reservada solo a posibles experimentos futuros como collages o modelos 3D).
- **Redacción:** Análisis y redacción de la pieza según la plantilla de calzado.
- **Validación de crédito y citas:** Confirmar con ella antes de maquetar cómo desea figurar, y si aportó una anécdota, el texto que se citará.

### Fase 5. Publicación y Seguimiento
- **Aviso previo:** Notificar el día de publicación y facilitarle el enlace directo o etiquetado en Instagram.
- **Agradecimiento:** Reconocer formalmente su aportación a la comunidad.

---

## 3. Registro y Estados de Seguimiento

El registro operativo vive en una única Google Sheet de Drive. Separa tres entidades:

1. **Persona** (`COL-0001`): identidad, relación general, último contacto y próxima acción. Su carpeta se nombra de forma reconocible: `COL-0001 — Nombre (@usuario)`.
2. **Envío de Tally** (`ENV-0001`): una recepción técnica del formulario. Una persona puede hacer varios envíos y cada envío puede contener hasta siete pares. Su estado técnico es `Pendiente`, `Procesado` o `Error`.
3. **Par** (`PAR-0001`): unidad editorial con estado propio. Los estados de distintos pares de una misma persona no se mezclan.

Estados editoriales del par:

`Por valorar` ➔ `Invitada` ➔ `Interesada` ➔ `Guía enviada` ➔ `Material recibido` ➔ `Falta vista` / `En edición` ➔ `Pendiente de confirmación` ➔ `Publicada` (o `Retirada` / `Pausada`).

La Sheet conserva, como mínimo, pestañas separadas para `Personas`, `Pares`, `Envíos`, `Actividad`, `Notas_inbox`, `Tally_raw`, `Catálogos` y `Log_automatización`. La actividad y las notas originales se conservan como historial.

---

## 4. Política y Protocolo de Retirada

La colaboradora mantiene pleno control sobre la presencia de su par en el proyecto:

1. **Recepción de solicitud:** Si solicita retirar su par por cualquier motivo (canal directo o formulario), se acusa recibo inmediatamente.
2. **Eliminación:** Retirada de la pieza en la web y eliminación de publicaciones en redes sociales propias en un plazo máximo de 48 horas.
3. **Gestión de archivos:** Consulta con la colaboradora si desea el borrado permanente de las fotos originales del archivo interno (copia local y envío en Tally) o si autoriza conservarlas de modo confidencial como registro histórico.
4. **Confirmación:** Envío de confirmación por escrito una vez completada la eliminación.
