# Tareas

Trabajo por hacer. Lo cerrado, descartado o pospuesto está en [sitio/DECISIONES.md](sitio/DECISIONES.md). Criterio editorial en [marca/01](marca/01-identidad-editorial.md)–[04](marca/04-flujo-de-colaboracion.md) y [conceptos-editoriales.md](marca/conceptos-editoriales.md).

Marca `[x]` y mueve a **Hecho**.

---

## Ahora — sistema de colaboraciones

### Bloque A · Preparación en paralelo

**Gemini — creación de la infraestructura de Sheets**

- [ ] Crear en Drive la carpeta operativa de colaboraciones y una única Google Sheet.
- [ ] Crear y ordenar las pestañas `Personas`, `Pares`, `Envíos`, `Actividad`, `Notas_inbox`, `Tally_raw`, `Catálogos` y `Log_automatización`.
- [ ] Importar una sola vez `personas_contacto_proyecto_calzado.md`, simplificar sus campos y conservar `Contacto previo = Sí`; no marcar como invitada a El Par salvo evidencia expresa.
- [ ] Crear el Apps Script con ejecución manual desde el menú `El Par → Procesar nuevos envíos`.
- [ ] Dejar preparadas, pero sin instalar ni activar, las funciones de automatización temporal.
- [ ] Verificar estructura, validaciones, permisos, idempotencia y registro de errores.

**Christian — preparación de la fuente**

- [x] Identificar qué contactos importados no deben permanecer en la Sheet.
- [ ] Confirmar que Tally recoge o permite relacionar de forma estable a la persona; preferencia: campo oculto `colaborador_id` en enlaces personalizados.
- [ ] Mantener restringidos la Sheet y los archivos de colaboradoras.

### Bloque B · Requiere la Sheet creada

**Christian**

- [ ] Conectar Tally con la pestaña `Tally_raw`.
- [ ] Autorizar el Apps Script y realizar un envío de prueba.

**Gemini**

- [ ] Ajustar el mapa de encabezados del Apps Script a las columnas reales creadas por Tally.
- [ ] Procesar manualmente el envío de prueba y corregir cualquier error.

**ChatGPT**

- [ ] Auditar la Sheet, el archivo creado en Drive y el log del primer procesamiento.
- [ ] Redactar la instrucción definitiva para procesar `Notas_inbox`.
- [ ] Configurar o guiar la tarea de ChatGPT con ejecución manual mediante `Run`; probar primero en Work o en la aplicación local según permita elegir modelo, proyecto y conversación.
- [ ] Archivar el Markdown anterior de contactos cuando la Sheet verificada pase a ser la fuente canónica.

### Bloque C · Después de validar el flujo manual y operativa de archivo

- [ ] Decidir si se activa el disparador temporal del Apps Script.
- [ ] Decidir si la tarea de notas continúa manual o pasa a una cadencia programada.
- [ ] Tabla de colaboraciones (Invitada → Guía enviada → Material recibido → Falta vista / En edición → Publicada / Retirada).
- [ ] Carpeta de archivo al descargar de Tally (un envío / `par-01`…`par-07` + plantilla por par).
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
