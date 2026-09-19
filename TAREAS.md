# Tareas

Trabajo por hacer, catálogo de intenciones futuras y operativa interna.
- Marco general y decisiones arquitectónicas: [sitio/ESPECIFICACION.md](sitio/ESPECIFICACION.md).
- Criterio editorial: [marca/01](marca/01-identidad-editorial.md) a [04](marca/04-flujo-de-colaboracion.md).
- Especificaciones web de superficie: [sitio/specs/](sitio/specs/).

---

## 1. Ahora — Trabajo prioritario del usuario

### Migración del sitio a Astro
- [x] Validar y cerrar las decisiones de diseño y estructura de la monografía en mock comparativo ([sitio/mock-comparativas-visuales.html](sitio/mock-comparativas-visuales.html)).
- [x] Redactar la tríada completa de migración a Astro: especificación viva ([sitio/specs/migracion-astro/spec.md](sitio/specs/migracion-astro/spec.md)), plan técnico ([sitio/specs/migracion-astro/plan.md](sitio/specs/migracion-astro/plan.md)) y tareas ([sitio/specs/migracion-astro/tasks.md](sitio/specs/migracion-astro/tasks.md)).
- [x] Crear la estructura inicial del proyecto Astro en [sitio/](sitio/) y configurar la biblioteca base de componentes.
- [x] Migrar las cuatro superficies v1 (Portada, Monografía, Sobre El Par, Cómo colaborar) y validar compilación y auditoría estática.

### Primera Pieza Monográfica Real
- [ ] Recibir y seleccionar el material fotográfico de colaboradoras para maquetar la primera monografía real.

---

## 2. Intenciones — Catálogo conceptual a futuro

Deseos conceptuales y partes del sistema proyectadas para versiones posteriores. No cuentan con spec viva ni build abierto hasta que se activen.

### 2.1. Vista «Armarios» (Directorio por colaboradora)
- **Qué:** Índice público que agrupa y exhibe todas las piezas aportadas por una misma persona (`armarios.html` y vistas individuales).
- **Para qué:** Reconocer la generosidad de las colaboradoras recurrentes y permitir al lector explorar el estilo de un armario particular.
- **Por qué te interesa:** *[A completar por Christian según criterio personal]*.
- **Qué no es:** No es un perfil de red social, ni un muro personal, ni un escaparate de venta de segunda mano.
- **Spec:** Ninguna (fuera de v1).

### 2.2. Sistema de Cotas conmutables sobre la imagen
- **Qué:** Capa vectorial interactiva superpuesta sobre la fotografía con líneas de cota milimétricas y etiquetas anatómicas, conmutable mediante botón.
- **Para qué:** Proporcionar lectura técnica rigurosa de proporciones sin ensuciar la imagen por defecto.
- **Por qué te interesa:** *[A completar por Christian según criterio personal]*.
- **Qué no es:** No contiene placas fijas.
- **Spec:** Ninguna (diseño preliminar en archivo; fuera de v1).

### 2.3. Formulario propio integrado en la web
- **Qué:** Formulario nativo alojado directamente en `como-colaborar.html` sustituyendo el iframe o enlace externo a Tally.
- **Para qué:** Ofrecer una experiencia de subida completamente fluida e integrada en la estética del sitio.
- **Por qué te interesa:** *[A completar por Christian según criterio personal]*.
- **Qué no es:** No sustituye el almacenamiento seguro en Drive ni el registro en Google Sheets.
- **Spec:** Ninguna (Tally cubre la primera versión; el formulario propio se estudiará en una segunda etapa).

### 2.4. Fichas ampliadas del glosario
- **Qué:** Páginas independientes dedicadas a cada concepto técnico o constructivo del calzado (`/glosario/[termino].html`).
- **Para qué:** Desarrollar en profundidad la evolución histórica, variantes biomecánicas y ejemplos cruzados de cada parte.
- **Por qué te interesa:** *[A completar por Christian según criterio personal]*.
- **Qué no es:** No sustituye los popovers flotantes rápidos de la monografía (que siguen siendo la vía inmediata).
- **Spec:** Ninguna (en v1 rige el diccionario canónico en [sitio/specs/monografia/spec.md](sitio/specs/monografia/spec.md)).

### 2.5. Lanzamiento público del canal de Instagram
- **Qué:** Apertura y publicación activa del perfil de Instagram de El Par.
- **Para qué:** Canal de descubrimiento visual, captación de colaboradoras y difusión.
- **Por qué te interesa:** *[A completar por Christian según criterio personal]*.
- **Qué no es:** No condiciona el lanzamiento de la primera entrega monográfica en la web (se desacoplan).
- **Spec:** [marca/03-sistema-editorial-y-contenidos.md](marca/03-sistema-editorial-y-contenidos.md) §3 (criterio definido; activación pospuesta).

### 2.6. Método para opiniones y testimonios
- **Qué:** Mecanismo discreto para recoger y compartir impresiones de las colaboradoras sobre la experiencia de ver sus zapatos analizados.
- **Para qué:** Transmitir tranquilidad y hospitalidad a futuras participantes indecisas.
- **Por qué te interesa:** *[A completar por Christian según criterio personal]*.
- **Qué no es:** No son reseñas de producto ni puntuaciones con estrellas.
- **Spec:** Ninguna.

### 2.7. Protocolo de recomendación boca a boca
- **Qué:** Mensaje de cortesía post-publicación invitando a la colaboradora satisfecha a sugerir el proyecto a una amiga con zapatos singulares.
- **Para qué:** Crecimiento orgánico selectivo entre personas amantes del calzado.
- **Por qué te interesa:** *[A completar por Christian según criterio personal]*.
- **Qué no es:** No es un programa de referidos comercial ni una campaña masiva.
- **Spec:** Ninguna.

### 2.8. Mecanismos de monetización y afiliados (evaluación futura)
- **Qué:** Estudio de vías sostenibles de financiación editorial (enlaces a firmas artesanales, edición en papel o mecenazgo).
- **Para qué:** Garantizar la sostenibilidad a largo plazo sin comprometer la independencia curatorial.
- **Por qué te interesa:** *[A completar por Christian según criterio personal]*.
- **Qué no es:** No incluye banners programáticos, cookies invasivas ni reseñas pagadas.
- **Spec:** Ninguna.

---

## 3. Diferido — Operativa interna (cuando haya volumen)

- [ ] Definir el procedimiento de volcado desde `Notas_inbox` hacia la ficha o formulario.
- [ ] Configurar la tarea de ChatGPT con ejecución manual mediante `Run` para procesar `Notas_inbox`.
- [ ] Decidir activación de disparadores temporales del Apps Script (actualmente manual con `Procesar nuevos envíos`).
- [ ] Refinar en [marca/04-flujo-de-colaboracion.md](marca/04-flujo-de-colaboracion.md) la sección «Registro y Estados de Seguimiento».
- [ ] Refinar «Formatos Tácticos para Instagram» en [marca/03-sistema-editorial-y-contenidos.md](marca/03-sistema-editorial-y-contenidos.md).

---

## 4. Hecho

<!-- Regla para agentes: mantener únicamente los 2-3 hitos más recientes y condensados. Podar los anteriores para no acumular historial redundante con las especificaciones vivas. -->

- [x] **Página unificada «Sobre El Par» y navegación:** Creada y validada en [sitio/sobre-el-par.html](sitio/sobre-el-par.html) unificando manifiesto y método. Espec viva en [sitio/specs/sobre-el-par/spec.md](sitio/specs/sobre-el-par/spec.md) con tríada de navegación actualizada.
- [x] **Flujo móvil y copy de colaboración:** Optimizadas áreas táctiles y copy en [Sobre El Par](sitio/sobre-el-par.html), [Cómo colaborar](sitio/como-colaborar.html) y la [guía fotográfica](marca/activos/guia-fotografica-colaboradores.html).

