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
- [x] Pegar y autorizar la versión inicial del Apps Script.
- [x] Confirmar que la Sheet y las carpetas están restringidas a la cuenta propietaria y a la cuenta de agente autorizada; no existe acceso público ni de dominio.
- [x] Conectar Tally con la pestaña `Tally_raw`.
- [x] Hacer dos envíos crudos con `COL-0101 — Prueba interna`: el primero se conserva como prueba incompleta y el segundo sirve como prueba válida.
- [x] Ejecutar `Validar configuración` sobre v2 con resultado correcto.
- [x] Sustituir el contenido del Apps Script por `El_Par_Apps_Script_v3.gs`, guardar, recargar la Sheet y ejecutar `Validar configuración`.
- [x] Después de validar v3, ejecutar una vez `El Par → Procesar nuevos envíos` y comunicar el resultado.
- [ ] Eliminar en el editor de Tally el campo oculto `token_colaborador`; después se retirará también su columna vacía de `Tally_raw`.

### Bloque B · Primera prueba real

**ChatGPT**

- [x] Auditar preliminarmente la estructura de Drive, la Sheet y el código entregado por Gemini.
- [x] Mantener IDs internos secuenciales y legibles (`COL`, `ENV`, `PAR`); ya no se exponen en enlaces.
- [x] Añadir `correo` a `Personas` e Instagram como dato opcional.
- [x] Adoptar un único enlace público de Tally para invitaciones, web y reenvíos entre personas.
- [x] Definir el correo normalizado como clave operativa principal: mismo correo → mismo `COL`; cada respuesta válida → nuevo `ENV`.
- [x] Definir altas directas: correo nuevo sin coincidencia → nuevo `COL` automático y ficha marcada para revisar.
- [x] Definir el control de posibles duplicados: en los contactos iniciales sin correo, una coincidencia exacta de Instagram identifica el `COL`, incorpora el correo y marca la ficha para revisar; si la ficha ya tiene otro correo o hay ambigüedad, no sobrescribir y dejar la respuesta en `Revisar`.
- [x] Retirar `token_enlace` de `Personas`, limpiar el token del envío válido y de su manifiesto, y dejar de usar tokens en el código.
- [x] Cambiar todos los valores de `enlace_tally` al enlace público único.
- [x] Eliminar de `Tally_raw` el primer envío incompleto y corregir la referencia de fila del envío válido.
- [x] Preparar y verificar sintácticamente `El_Par_Apps_Script_v3.gs` con identificación por correo, alta directa e Instagram opcional.
- [x] Auditar el primer procesamiento: se crearon `ENV-0001`, `PAR-0001`, actividad, log, manifiesto y cinco imágenes en la carpeta esperada.
- [ ] Ejecutar de nuevo `Procesar nuevos envíos` y verificar que no se duplica ninguna fila, carpeta ni imagen.
- [ ] Documentar y probar el procedimiento operativo mínimo para enviar el enlace público, registrar la invitación y revisar altas o conflictos.
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
