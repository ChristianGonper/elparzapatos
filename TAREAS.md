# Tareas

Trabajo por hacer. Lo cerrado, descartado o pospuesto está en [sitio/DECISIONES.md](sitio/DECISIONES.md). Criterio editorial en [marca/01](marca/01-identidad-editorial.md)–[04](marca/04-flujo-de-colaboracion.md) y [conceptos-editoriales.md](marca/conceptos-editoriales.md).

Marca `[x]` y mueve a **Hecho**.

---

## Ahora — sistema de colaboraciones

### Bloque A · Infraestructura inicial

**Gemini — creación de la infraestructura de Sheets**

- [x] Crear en Drive la carpeta operativa de colaboraciones y una única Google Sheet.
- [x] Crear y ordenar las pestañas `Personas`, `Pares`, `Envíos`, `Actividad`, `Notas_inbox`, `Tally_raw`, `Catálogos` y `Log_automatización`.
- [x] Importar una sola vez `personas_contacto_proyecto_calzado.md`, simplificar sus campos y conservar `Contacto previo = Sí`; no marcar como invitada a El Par salvo evidencia expresa.
- [x] Crear el Apps Script con ejecución manual desde el menú `El Par → Procesar nuevos envíos`.
- [x] Dejar preparadas, pero sin instalar ni activar, las funciones de automatización temporal.
- [ ] Verificar con un envío real la idempotencia, descarga de archivos, carpetas, validaciones y registro de errores.

**Christian — preparación y conexión**

- [x] Retirar del Markdown los contactos que no debían importarse.
- [x] Añadir en Tally el campo oculto provisional `colaborador_id`.
- [ ] Sustituirlo antes de la prueba por `token_colaborador`, que recibirá un token público aleatorio y no el `persona_id` interno.
- [x] Pegar el código en el Apps Script asociado y autorizar sus permisos.
- [ ] Confirmar manualmente que la Sheet y los archivos de colaboradoras mantienen acceso restringido.
- [ ] Conectar Tally con la pestaña `Tally_raw`.
- [ ] Hacer un envío de prueba mediante una URL personalizada con `token_colaborador`.

### Bloque B · Primera prueba real

**ChatGPT**

- [x] Auditar preliminarmente la estructura de Drive, la Sheet y el código entregado por Gemini.
- [x] Mantener IDs internos secuenciales y legibles (`COL`, `ENV`, `PAR`) y separar de ellos el identificador público de los enlaces.
- [x] Añadir a `Personas` la columna `token_enlace` y asignar un token aleatorio único a los 100 contactos importados.
- [ ] Ajustar el script para que los contactos nuevos reciban un único `token_enlace` estable y una nueva solicitud de enlace recupere el existente, sin crear otro `COL`.
- [ ] Comprobar que la integración real añade el encabezado `token_colaborador` y conserva las columnas técnicas `EP_*`.
- [ ] Ajustar el Apps Script a los encabezados reales de Tally, implementar realmente la coincidencia alternativa por correo y confirmar el destino de las carpetas personales respecto de `01_Envíos Tally`.
- [ ] Resolver identidad con estas reglas: token e Instagram/correo coincidentes → mismo `COL`; discrepancia, identidad nueva o ambigua → `Revisar` sin atribuir ni crear persona automáticamente; varios envíos válidos → mismo `COL` y un `ENV` nuevo por respuesta.
- [ ] Auditar el primer procesamiento: fila, descarga, manifiesto, carpetas, IDs, estados, actividad, log e idempotencia.
- [ ] Registrar la Sheet como fuente canónica del seguimiento vivo después de superar la prueba.

### Bloque C · Notas de seguimiento

- [ ] Redactar la instrucción definitiva para procesar `Notas_inbox`.
- [ ] Configurar o guiar la tarea de ChatGPT con ejecución manual mediante `Run`; probar primero en Work o en la aplicación local según permita elegir modelo, proyecto y conversación.
- [ ] Decidir después de probarla si la tarea continúa manual o pasa a una cadencia programada.

### Bloque D · Después de validar el flujo manual

- [ ] Decidir si se activa el disparador temporal del Apps Script.
- [ ] Canal oficial de retirada (correo, formulario de baja, o ambos).
- [ ] Decidir originales al retirar: borrado siempre vs registro mínimo restringido.
- [ ] Reescribir consentimiento en Tally y pegarlo en el formulario publicado.
- [ ] Follow-up corto si no hay envío (sin tono de encargo).

## Cuando llegue material real

- [ ] Chequeo de las seis perspectivas (+ detalle libre); pedir solo la toma que falte.
- [ ] Elegir el primer par y redactar la pieza (plantilla).
- [ ] Confirmar con ella crédito y citas.

## Copys

- [ ] «Abrir mi armario».
- [ ] Pie institucional (web y cierre de pieza).
- [ ] Pies de foto de portada / monografía.
- [ ] Microcopy corto de consentimiento (Tally) y versión larga (política).

## Después de la primera pieza

- [ ] Página «Sobre El Par».
- [ ] Vista Armarios.
- [ ] Boca a boca (solo si el envío le resultó fácil).
- [ ] Ampliar P1 / P2 / P3.

## Hecho

- [x] Identidad visual mínima (tipo y paleta).
- [x] Prototipos locales de portada y monografía.
- [x] Formulario Tally de recepción (provisional).
- [x] Guía fotográfica enviada a compañeras.
- [x] Criterio de calidad fotográfica, umbral para pedir tomas y límites de edición ([marca/04](marca/04-flujo-de-colaboracion.md) y Drive).
- [x] Modelo de seguimiento definido por persona, envío y par.
