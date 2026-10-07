# Experimento tras la revisión transversal

7 de octubre de 2026. Implementado en este worktree para probarlo entre nosotros. Público: mujeres a las que les gustan los zapatos, aunque no sepan de moda. Se contemplan entradas desde portada, Instagram y enlaces compartidos.

## Cambios

- El destacado abre la portada y corresponde al último publicado por `publishedAt`. El lema aparece después y es más pequeño. El primer bloque invita a leer; el envío sigue accesible desde la navegación y la invitación final.
- Los detalles se presentan como título, foto y cuerpo en móvil; foto a la izquierda en escritorio como primer experimento. El texto y las citas de los MDX no se han editado.
- El visor añade «Acercar» y «Ver completa», desplazamiento táctil, teclado y arrastre con ratón.
- Pares y armarios tienen compartir y copiar enlace. En local se copia el enlace local; con dominio configurado se usa la URL pública.
- Colaboración muestra un resumen de las siete vistas, enlace al ejemplo de María cuando su entrada existe, opinión obligatoria, crédito anónimo estable y retirada en un máximo de 48 horas.
- Se mantiene el armario desde dos pares publicados: con uno, la página del par ya da un destino que compartir. Se explica expresamente que se puede participar con uno.
- Modelo opcional en «De un vistazo». No se han inventado modelos ni fechas de publicación para los borradores actuales.
- La compilación normal excluye borradores. `npm run verify:review` prepara una vista local que los incluye y no activa indexación.
- Las pruebas de crecimiento aceptan CRLF y funcionan en Windows. El formato admite los finales de línea del checkout sin reformatear el contenido de las entradas.

## Decisiones que se conservan

La ilustración de tacones con IA es una excepción temporal hasta disponer de fotos adecuadas. La gestión de usos de las fotos de María se atenderá si surge una retirada. No se añade presentación personal de Christian ni analítica. El formulario externo y los documentos de Drive no se han cambiado.

Las etiquetas de Tally aún describen el armario sin el umbral de dos pares y el anonimato con un texto genérico común. La web ya explica el criterio de este experimento; esas dos etiquetas del formulario requieren una actualización aparte. Su campo de opinión ya es obligatorio.

## Cómo revisarlo

Desde `sitio`, ejecutar `npm run verify:review` y `npm run preview`. En móvil, comprobar que la foto y el acceso al análisis abren la portada, que se puede encontrar un detalle en su foto, y que «Acercar» permite recorrerlo. Probar compartir/copia y pasar de una vista del resumen a su ejemplo en la guía.

El [informe HTML](REVIEW-TRANSVERSAL-2026-10-07.html) conserva el diagnóstico previo y los anclajes de los comentarios. No describe el estado posterior a este experimento.
