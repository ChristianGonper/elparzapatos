# Recepción en Tally — formulario de colaboración

Buzón temporal para recibir pares. **Formulario publicado y operativo:** [https://tally.so/r/Npj2bl](https://tally.so/r/Npj2bl). El prototipo visual de referencia sigue en [formulario-colaboracion.html](formulario-colaboracion.html). La fuente utilizada para importar fue [tally-formulario-colaboracion.md](tally-formulario-colaboracion.md). Cuando el sitio tenga su propio formulario, este canal se sustituye.

Fuentes de Tally: [importar](https://tally.so/help/import), [subida de archivos](https://tally.so/help/file-uploads), [uso razonable](https://tally.so/help/fair-use-policy), [GDPR](https://tally.so/help/gdpr), [precios](https://tally.so/pricing).

---

## Cómo importar (referencia)

1. En Tally: `+ New form` → `Import from` → Markdown.
2. Subir [tally-formulario-colaboracion.md](tally-formulario-colaboracion.md).
3. Se abre un **borrador** de las preguntas.
4. Aplicar el checklist de abajo, previsualizar y hacer un envío de prueba.
5. Publicar. URL generada: `https://tally.so/r/Npj2bl`.

---

## Checklist después del import

| Ajuste | Valor |
| --- | --- |
| Idioma del formulario | Español |
| Fotos (una por ficha, Par 01 a 07) | Varios archivos, solo imágenes|
| Lógica: fichas Par 02 a 07 | Ver [Varios pares](#varios-pares-en-un-envío) |
| Lógica: Instagram | Mostrar «Usuario de Instagram» solo si el crédito es Instagram |
| Consentimiento y edición | Casilla obligatoria (análisis editorial y edición respetuosa sin IA) |
| Novedades por correo | Casilla opcional (avisos de nuevas piezas / novedades) |
| Retirada y canal oficial | Bloque informativo con correo `elparzapatos@proton.me` y plazo 48h |
| Página de gracias | Copy del Markdown |
| Notificación | Correo propio al recibir un envío |
| Guía fotográfica | URL pública provisional en GitHub Pages: [https://christiangonper.github.io/elparzapatos/marca/activos/guia-fotografica-colaboradores.html](https://christiangonper.github.io/elparzapatos/marca/activos/guia-fotografica-colaboradores.html). Sustituir cuando el sitio propio exista |
| Cover | Subir [tally-cover.png](tally-cover.png): al título del formulario → `Add cover`. Fuente para volver a renderizar: [tally-cover.html](tally-cover.html) |
| Tema | Papel `#FAF8F5`, tinta `#1C1A18`, coñac `#9E6B55` |

La marca «Made with Tally» y el dominio `tally.so` quedan en el plan gratuito.

---

## Varios pares en un envío

El orden del prototipo [formulario-colaboracion.html](formulario-colaboracion.html) es el que hay que montar:

1. Intro (`Compartir un par`)
2. **01 · Contacto** (nombre + correo)
3. **Fichas Par 01 … Par 07** — cada una junta fotos + marca + anécdota
4. **Créditos · Acreditación**
5. **Política · Uso editorial y retirada**
6. Envío

Tally no tiene el botón «+ Añadir otro par» del HTML. En su lugar, al final de cada ficha (salvo la 07) va «¿Quieres añadir otro par a este envío?» (Sí / No, **opción única**) y [lógica condicional](https://tally.so/help/conditional-form-logic) enseña la ficha siguiente. El importador **no** crea esas reglas.

Los títulos de pregunta llevan «— Par 0n» para que las respuestas no se mezclen en Submissions.

### Cómo montarlo (`/conditional`)

1. Par 01 siempre visible, con la pregunta de añadir otro al final de la ficha.
2. Para Par 02 a 07: seleccionar la ficha entera. `::` → **Hide**.
3. Mostrar Par *n* si la pregunta «tras Par *n−1*» es **Sí**. Cadena: 02 ← 01, …, 07 ← 06.
4. Lo obligatorio de 02–07 solo aplica cuando la ficha es visible (Tally no valida lo oculto).
5. Probar un par, dos pares y siete pares. Comprobar que las fotos no se mezclan.

Si alguien tiene más de siete pares, vuelve a enviar el formulario con el mismo correo.

Al descargar: un envío puede traer hasta siete lotes. Carpetas `par-01` … `par-07` y una [plantilla-entrada-calzado.md](plantilla-entrada-calzado.md) por par.

---

## Límites (además de 10 MB por archivo)

Plan gratuito, suficiente para el piloto:

- Formularios y envíos ilimitados, con [uso razonable](https://tally.so/help/fair-use-policy).
- **10 MB por archivo**.
- Sin tope duro de número de archivos ni de almacenamiento total. 

**Riesgo práctico:** un HEIC/JPG de iPhone a máxima calidad puede pasar de 10 MB y el envío falla. En el formulario y en el mensaje de envío: JPG o PNG (o HEIC comprimido), cada toma por debajo de 10 MB. Si ocurre a menudo, Pro o un puente puntual (Drive / mensaje) solo para esas fotos.

Lo que Tally no copia del HTML: previsualizador de miniaturas, tipografía Newsreader/Jakarta, dropzone a medida. El bloque de archivos sí permite arrastrar varias imágenes.

---

## Fuera de este canal

- Formulario publicado y activo en [https://tally.so/r/Npj2bl](https://tally.so/r/Npj2bl). Para modificar campos o consultar respuestas recibidas se accede a la cuenta de Tally.
- El HTML local no envía nada (el botón solo simula el éxito).
- Canal oficial de retirada: correo `elparzapatos@proton.me` o mensaje de Instagram ([política en marca/04](../04-flujo-de-colaboracion.md#4-política-y-protocolo-de-retirada)).
