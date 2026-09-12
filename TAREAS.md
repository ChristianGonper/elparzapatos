# Tareas

Trabajo por hacer. Lo cerrado, descartado o pospuesto está en [sitio/DECISIONES.md](sitio/DECISIONES.md). Criterio editorial en [marca/01](marca/01-identidad-editorial.md)–[04](marca/04-flujo-de-colaboracion.md).

Marca `[x]` y mueve a **Hecho**.

---

## Ahora — Trabajo prioritario

### 1. Captación de Calzado y Contacto con Colaboradoras

- [ ] **Refinar inicio de contacto con persona:** Pulir la primera toma de contacto y fórmulas de saludo en [marca/activos/Contactos-previos.md](marca/activos/Contactos-previos.md).
- [ ] **Kit de recomendación para compañeras (embajadoras — modelo de ejemplo anotado):**
  - Redactar mensajes de WhatsApp / DM listos para copiar y reenviar entre amigas (tono cálido, de confianza y sin tecnicismos).
  - Preparar el mini-argumentario de dudas rápidas para ella («¿Tienen que ser caros?», «¿Salgo yo?», «¿Cuánto se tarda?»).
  - Diseñar el flyer digital / tarjeta visual compartible (formato Story / tarjeta con estética editorial, claim y enlace a la guía).

### 2. Preparación Web y Criterio Editorial (Primera Pieza)

- [ ] Maquetar y publicar la primera monografía real en cuanto entre el material de una colaboradora.

---

## Diferido — Operativa interna (cuando haya volumen)

- [ ] Definir el procedimiento de volcado desde `Notas_inbox` hacia la ficha o formulario.
- [ ] Configurar la tarea de ChatGPT con ejecución manual mediante `Run` para procesar `Notas_inbox`.
- [ ] Decidir activación de disparadores temporales del Apps Script (actualmente se ejecuta manual con `Procesar nuevos envíos`).
- [ ] Refinar en [marca/04-flujo-de-colaboracion.md](marca/04-flujo-de-colaboracion.md) la sección «Registro y Estados de Seguimiento».
- [ ] Refinar «Formatos Tácticos para Instagram» en [marca/03-sistema-editorial-y-contenidos.md](marca/03-sistema-editorial-y-contenidos.md).
- [ ] Diseñar skill/directriz para redacción documental ágil.
- [ ] Revisar en [sitio/DECISIONES.md](sitio/DECISIONES.md) la decisión pospuesta sobre «Categorías exhaustivas y ritmo final de publicación».

---

## Pospuesto / Tras la primera pieza

- [ ] Maquetar la página puente «Cómo colaborar» (`como-colaborar.html`) según [sitio/ESPECIFICACION.md#4-especificación-de-la-página-puente-cómo-colaborar-como-colaborarhtml](sitio/ESPECIFICACION.md#4-especificación-de-la-página-puente-cómo-colaborar-como-colaborarhtml).
- [ ] Implementación de las cartas del glosario: comportamiento interactivo del popover contextual y ficha/página con detalle ampliado del concepto.
- [ ] Método para opiniones / testimonios (versiones posteriores de la web).
- [ ] Página «Sobre El Par».
- [ ] Vista «Armarios».
- [ ] Boca a boca (solo si el envío le resultó fácil a la colaboradora).
- [ ] Ampliar P1 / P2 / P3.
- [ ] Formulario propio integrado en la web (sustituyendo el enlace de Tally provisional).

---

## Hecho

- [x] **Infraestructura de colaboraciones (Drive, Sheets y Apps Script v3):** Pestañas canónicas creadas, importación depurada, clave por correo normalizado con Instagram opcional, IDs correlativos legibles (`COL`, `ENV`, `PAR`), enlace público único de Tally, y Apps Script v3 verificado e idempotente sin duplicados.
- [x] **Identidad visual y prototipos locales:** Tipografía, paleta y sistema semántico consolidados en [sitio/DESIGN.md](sitio/DESIGN.md). Prototipos de portada y monografía.
- [x] **Guía y criterios fotográficos:** Guía colaborativa *Tus zapatos en cámara* publicada. Criterio de calidad fotográfica, umbral para tomas adicionales y límites éticos de edición acordados en [marca/04-flujo-de-colaboracion.md](marca/04-flujo-de-colaboracion.md).
- [x] **Canal oficial de contacto:** Correo del proyecto establecido como `elparzapatos@proton.me` y registrado en [marca/02-nombre-y-presentacion.md](marca/02-nombre-y-presentacion.md) y [marca/04-flujo-de-colaboracion.md](marca/04-flujo-de-colaboracion.md).
- [x] **Saneamiento documental y Single Source of Truth:** Desacopladas las duplicidades entre [marca/01](marca/01-identidad-editorial.md), [marca/02](marca/02-nombre-y-presentacion.md), [marca/03](marca/03-sistema-editorial-y-contenidos.md), [marca/04](marca/04-flujo-de-colaboracion.md), [Contactos-previos.md](marca/activos/Contactos-previos.md) y [sitio/DECISIONES.md](sitio/DECISIONES.md); retiradas las instrucciones de Stitch; añadida fórmula de follow-up D; enlaces navegables con headings hacia cada documento canónico.
- [x] **Formulario de colaboración y política de consentimiento:** Tally publicado, [tally-formulario-colaboracion.md](marca/activos/tally-formulario-colaboracion.md) y [formulario-colaboracion.html](marca/activos/formulario-colaboracion.html) sincronizados con el estado real: Instagram condicionado y obligatorio según acreditación, autorización con edición ligera sin IA, casilla opcional de actualizaciones por correo y procedimiento de retirada claro con `elparzapatos@proton.me` e Instagram.
- [x] **Criterio editorial de monografía y especificación web:** Definida la jerarquía en [sitio/ESPECIFICACION.md](sitio/ESPECIFICACION.md): fotos limpias sin pies forzados, supratítulos de zona anatómica, títulos H2 descriptivos directos, términos universales para popovers (ES/EN) vs notas intercaladas en flujo, ficha técnica de 5 campos y cierre `Comparte un par` con flujo hacia la página puente `como-colaborar.html`.
- [x] **Revisión de frases y prototipos web:** Actualizados [sitio/entradas/salon-aguja.html](sitio/entradas/salon-aguja.html) e [sitio/index.html](sitio/index.html) suprimiendo pies de foto redundantes, aplicando supratítulos anatómicos, título H2 descriptivo, nota editorial intercalada, cédula de 5 campos y cierre contextual `Comparte un par` con enlace a `como-colaborar.html`.
