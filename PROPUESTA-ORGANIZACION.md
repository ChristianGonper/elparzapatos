# Propuesta: organización documental (SDD adaptado)

**Estado:** modelo aplicado y consolidado en el repositorio (2026-09-14).
**Origen:** conversación 2026-09-12 / revisión y auditoría 2026-09-14 sobre estructura del repositorio, desarrollo guiado por especificaciones (referencia: `hello-sdd`), precedencia de marca y separación neta entre sistema visual, especificaciones vivas, intenciones y código HTML.
**Alcance:** cómo se organiza la información *actual* y cómo se gobierna el trabajo a partir de aquí. No altera la esencia del producto ni la estética editorial acordada.

Redacción: universo interno. La skill local de redacción se activa por la descripción de su frontmatter; no se enlaza ni se invoca desde [AGENTS.md](AGENTS.md).

---

## 1. Problema

Cuatro archivos pretenden ser la fuente de verdad a la vez:

| Archivo | Rol declarado | Problema |
| --- | --- | --- |
| [ESTADO.md](ESTADO.md) | Snapshot del día | Crónica narrativa que reescribe specs, tareas y lo cubierto; cada sesión lo infla. |
| [TAREAS.md](TAREAS.md) | Trabajo abierto | Mezcla deseos conceptuales, tareas de maquetación, aplazados ya presentes en Decisiones y un changelog infinito en **Hecho**. |
| [sitio/ESPECIFICACION.md](sitio/ESPECIFICACION.md) | Spec de la web | Documento monolítico que mezcla arquitectura general, portada, monografía, página puente, glosario, SEO, cotas futuras y tokens visuales que ya están en [DESIGN.md](sitio/DESIGN.md). |
| [sitio/DECISIONES.md](sitio/DECISIONES.md) | ADR | La sección §2 duplica íntegramente la spec de producto. La sección §4 duplica lo pospuesto de Tareas. |

[marca/01](marca/01-identidad-editorial.md)–[04](marca/04-flujo-de-colaboracion.md) y [activos/](marca/activos/) ya funcionan de forma limpia como specs vivas de dominio. No se atomizan.

Efectos que se cortan con este modelo:
- Criterios acordados en el chat que se diluyen o no aterrizan en un único sitio canónico.
- La misma regla repetida (y a veces desincronizada) en tres documentos a la vez.
- Microajustes de copy o diseño que obligan a reescribir especificaciones de producto.

---

## 2. Principios acordados

1. **Spec viva por parte grande del sistema**, no por componente ni por encargo efímero. Un botón nuevo en la portada se especifica en la spec de la portada. Armarios, cuando existan, tendrán su propia spec. Instagram es un aspecto editorial y de canal que ya cuenta con definición en marca.
2. **Vocabulario editorial canónico:** las partes del sitio adoptan los términos naturales del proyecto (`portada`, `monografia`, `como-colaborar`), erradicando anglicismos innecesarios (`home`) o términos ambiguos (`ficha`, que en este proyecto refiere estrictamente a la cédula técnica de 5 campos).
3. **La spec define el sistema**, no solo cómo codificar la pantalla. Recoge estructura, conducta, fórmulas nombradas y contrato de copy. No existe una spec «editorial» y otra «técnica» separadas para la misma superficie.
4. **Marca es spec y prevalece:** [marca/01](marca/01-identidad-editorial.md)–[04](marca/04-flujo-de-colaboracion.md) tienen el mismo rango de verdad canónica y rige la jerarquía canónica: `marca → spec de superficie → implementación`. **Cuando una spec web desarrolla o amplía un criterio de Marca, Marca prevalece. La spec de superficie puede concretarlo, pero no rebajarlo ni contradecirlo.** Marca no requiere plan de software ni `tasks.md`.
5. **Software, al construirse:** la spec de superficie cuenta con archivos de trabajo permanentes (`plan.md` y `tasks.md`). Durante el build activo contienen el plan técnico y la lista detallada de tareas (`Hecho cuando`). En reposo se simplifican a un cierre sobrio con el enfoque aplicado, la validación y la deuda técnica pendiente.
6. **Ciclo para cambios posteriores:**
   - *Cambio menor:* (ej. retocar un botón o añadir un estado que encaja en el diseño): se actualiza la spec viva directamente, sin expandir innecesariamente `plan.md` y `tasks.md`.
   - *Cambio amplio:* (ej. refactor estructural o nueva funcionalidad transversal): se vuelve a desarrollar el plan y las tareas en esos mismos archivos de trabajo permanentes.
   - *Al terminar:* vuelven a simplificarse al cierre técnico y deuda pendiente, reutilizándolos permanentemente sin acumular un historial infinito de tickets obsoletos.
7. **Hello-sdd adaptado, no copiado:** se adopta el flujo fundamental: constitución → spec viva → (clarificar dudas) → plan y tareas de build → desarrollo → validación observable → la spec viva se actualiza ante cualquier cambio de contrato. Se descarta la creación de subcarpetas históricas que envejecen (`specs/001-feature/`).
8. **Criterios observables sobre formalismos rígidos:** se priorizan requisitos numerados y criterios de aceptación observables frente a historias de usuario forzadas (EARS opcional solo si clarifica una interacción compleja).
9. **Copy sin espejo con excepciones canónicas reguladas:** el texto específico y literal de una superficie ya construida vive exclusivamente en su archivo HTML. La spec viva solo conserva el **contrato de copy** (función, tono, fórmulas fijas, destino de enlaces y temas obligatorios). El texto literal en la spec es andamiaje provisional durante el build y se elimina al cerrar. **Excepción canónica compartida:** los lemas, nombres de canales oficiales y el protocolo de retirada centralizados en Marca son la única fuente de verdad compartida y regulada, y prevalecen sobre el HTML.
10. **Frontera precisa entre Decisiones e Intenciones:** una misma materia puede originar una intención, un ADR adoptado y un descarte definitivo diferentes sin duplicar el mismo hecho:
    - *Intención futura:* el deseo de construir una funcionalidad a futuro (ej. cotas conmutables sobre la foto) vive en [TAREAS.md](TAREAS.md) § Intenciones con plantilla estructurada (Qué / Para qué / Por qué te interesa / Qué no es).
    - *ADR adoptado:* la decisión arquitectónica o de alcance tomada para la versión actual (ej. publicar la v1 con fotografía limpia sin cotas, usar Tally provisional, o mantener la navegación pública sin secciones vacías) vive en [sitio/DECISIONES.md](sitio/DECISIONES.md) §2.
    - *Descarte definitivo:* una alternativa técnica o de diseño rechazada definitivamente tras evaluación (ej. Variante B con placas y cajas fijas sobre la imagen, tarjeta biográfica de la dueña, botón comercial en cabecera) vive en [sitio/DECISIONES.md](sitio/DECISIONES.md) §4.
11. **Sistema visual agnóstico en [DESIGN.md](sitio/DESIGN.md):** recoge estrictamente la atmósfera, tokens semánticos (color, tipografía, espaciado) y patrones visuales transversales (paspartú sobre blanco puro, lightbox neutro, popovers). Se limpia de composiciones de pantallas específicas, jerarquías de navegación y alcances de producto, delegando esa lógica a cada spec de superficie. Si un nuevo componente funcional introduce además un patrón visual reutilizable, se actualizan la spec de superficie y DESIGN.
12. **Tablero [ESTADO.md](ESTADO.md) sobrio:** snapshot ejecutivo de 10–12 líneas con foco actual, enlaces y bloqueos, erradicando la sección narrativa «Cubierto».

---

## 3. Cuatro funciones documentales de gobierno

Todo criterio gobernante cumple estrictamente una de estas cuatro funciones. Pueden existir activos, manuales, skills, prototipos, índices y código; todos ellos declaran qué fuente los rige y no se convierten en una quinta verdad gobernante:

| Función | Qué es | Dónde reside |
| --- | --- | --- |
| **Constitución / Mapa** | Cómo se trabaja, jerarquía de fuentes y reglas de actualización | [AGENTS.md](AGENTS.md) |
| **Spec viva** | Qué es verdad hoy en una parte del sistema; qué archivos rige | `marca/01`–`04`; `sitio/specs/<parte>/spec.md`; índice en [sitio/ESPECIFICACION.md](sitio/ESPECIFICACION.md) |
| **Decisión (ADR)** | Por qué se eligió algo frente a alternativas reales y qué se descartó definitivamente | [sitio/DECISIONES.md](sitio/DECISIONES.md), agrupado por spec |
| **Trabajo** | Intenciones conceptuales (futuro) y tareas activas de build | [TAREAS.md](TAREAS.md) (índice global) + `tasks.md` de cada spec |

**Nota sobre [ESTADO.md](ESTADO.md):** no es una función de criterio ni una crónica histórica; es un **tablero de 10–12 líneas** para situarse de un vistazo al arrancar la sesión.

---

## 4. Grano y estructura de carpetas: una spec = una parte grande

Se separa en spec propia si cambia con otro ritmo, otro propósito o ante otros requerimientos. Se mantiene unido si siempre se concibe y actualiza a la vez. No se hace una spec por cada archivo HTML (`salon-aguja.html` es una instancia maquetada de la spec de monografía).

### 4.1. Marca (se conserva en su estructura actual)

Jerarquía: `marca → spec de superficie → implementación`.

| Documento | Ámbito del sistema | Archivos que rige |
| --- | --- | --- |
| [marca/01-identidad-editorial.md](marca/01-identidad-editorial.md) | Voz, ética, propósito y límites editoriales | Criterio de cualquier texto del proyecto |
| [marca/02-nombre-y-presentacion.md](marca/02-nombre-y-presentacion.md) | Denominación, lemas, canales públicos, correo | Biografías, claims, URLs y comunicaciones oficiales |
| [marca/03-sistema-editorial-y-contenidos.md](marca/03-sistema-editorial-y-contenidos.md) | Ecosistema general, formatos de Instagram y perspectivas fotográficas base | Formatos para redes sociales y estándar visual de tomas |
| [marca/04-flujo-de-colaboracion.md](marca/04-flujo-de-colaboracion.md) | Fases de trabajo interno, curaduría, Drive/Sheets y protocolo de retirada | Operativa interna de relación con colaboradoras |
| [marca/activos/](marca/activos/) | Piezas enviables y de soporte | Guía colaborativa, formularios Tally/HTML, flyer y contactos |

*Nota:* los formatos de Instagram A/B/C ya son spec viva dentro de [marca/03](marca/03-sistema-editorial-y-contenidos.md). No se extraen a un archivo independiente hasta que el canal esté activo y justifique su propio espacio.

### 4.2. Sitio web: partición modular de la especificación

Estructura de la carpeta `sitio/`:

```
sitio/
  DESIGN.md                 ← Sistema visual agnóstico (tokens, tipografía, atmósfera, patrones UI)
  DECISIONES.md             ← ADR agrupado por spec + bloqueos actuales + tabla de Descartadas
  ESPECIFICACION.md         ← Índice general: mapa de vistas, alcance v1 y reglas compartidas de sitio
  specs/
    portada/
      spec.md               ← Rige index.html (hero adaptable, cuadrícula, nav esencial, cierre)
      plan.md               ← Archivo de trabajo permanente (expandido en build; sobrio en reposo)
      tasks.md              ← Archivo de trabajo permanente (T1-Tn en build activo; cierre/deuda en reposo)
    monografia/
      spec.md               ← Rige entradas/*.html (módulos, fotos, lightbox, cédula técnica, glosario)
      plan.md               ← Archivo de trabajo permanente
      tasks.md              ← Archivo de trabajo permanente
    como-colaborar/
      spec.md               ← Rige como-colaborar.html (contrato de copy, embudo guía → Tally)
      plan.md               ← Archivo de trabajo permanente
      tasks.md              ← Archivo de trabajo permanente
  index.html
  como-colaborar.html
  entradas/
```

#### Contenido de cada parte web:

1. **Índice ([sitio/ESPECIFICACION.md](sitio/ESPECIFICACION.md) adelgazado):**
   - Mapa de vistas y árbol de navegación pública.
   - Definición de alcance v1 y lo que queda formalmente fuera de la versión inicial.
   - Reglas transversales del sitio (ej. encuadre fotográfico íntegro `object-contain` sobre paspartú neutro, prohibición de silueteados artificiales).
   - Punteros directos a las tres specs de superficie.

2. **Portada (`sitio/specs/portada/spec.md`):**
   - Rige [sitio/index.html](sitio/index.html).
   - Cabecera y navegación esencial activa (`Archivo` y `Cómo colaborar`).
   - Comportamiento adaptativo al volumen (foco en pieza destacada con 1 par; cuadrícula sin duplicar la destacada con más pares).
   - Filtros latentes (inactivos hasta contar con catálogo representativo).
   - Pie sereno y cierre colaborativo (`Comparte un par`).

3. **Monografía (`sitio/specs/monografia/spec.md`):**
   - Rige todas las entregas en [sitio/entradas/](sitio/entradas/) (la plantilla y estructura, no el texto descriptivo de cada par específico).
   - Bloque de apertura, título de observación rigurosa y procedencia del armario.
   - Paseo modular fotográfico con mínimo 6 fotos reales y lightbox minimalista de inspección.
   - Popovers contextuales de terminología técnica con el **diccionario canónico inicial** integrado.
   - Notas contextuales intercaladas en papel tintado.
   - Cédula técnica de 5 campos («Datos del par») en composición continua tipo museo.
   - Navegación secuencial al pie (`← Entrega anterior` / `Entrega siguiente →`).
   - Cierre colaborativo contextual hacia la página puente.
   - Criterio formal de slugs y metadatos SEO de plantilla.
   - Delimitación explícita: el sistema de cotas queda fuera de v1.

4. **Cómo colaborar (`sitio/specs/como-colaborar/spec.md`):**
   - Rige [sitio/como-colaborar.html](sitio/como-colaborar.html).
   - Propósito y contrato de acogida pública: despejar dudas de visibilidad (no venta, no pasarela, no rostro ni cuerpo), compromiso ético (edición respetuosa, retirada en 48 h) y reconocimiento (`Armario de...`).
   - Embudo en tres pasos claros hacia la guía de tomas y el formulario Tally provisional.
   - Punteros a los canales de contacto oficial (`elparzapatos@proton.me` y mensaje directo).

### 4.3. Contrato de [sitio/DESIGN.md](sitio/DESIGN.md) (Sistema visual agnóstico)

[sitio/DESIGN.md](sitio/DESIGN.md) sigue el estándar de la skill local `design-md`. Es el lenguaje visual compartido entre humanos, agentes y herramientas de maquetación (como Google Stitch):

- **Manda en:** atmósfera general, filosofía de presentación del objeto, tokens de color (paleta, roles, prohibición de negro puro y degradados artificiales), arquitectura tipográfica (fuentes, proporciones, leading, tracking, longitudes máximas de línea), elevación, espaciado y patrones visuales transversales (lightbox neutro, paspartú blanco, popover flotante).
- **No contiene:** composición de pantallas específicas (split del hero, cabecera con secciones, filtros de catálogo, estructura de bloques de monografía), lógicas de negocio, flujos de navegación ni alcance de producto.
- **Relación con cambios:**
  - Un microajuste estético que ya encaja dentro de los tokens de DESIGN (ej. espaciado o alineación secundaria) se resuelve en HTML sin tocar spec ni abrir ADR.
  - Una modificación en la estructura, jerarquía o conducta de una pantalla actualiza primero la spec de esa superficie.
  - DESIGN solo se actualiza si se modifica o expande el lenguaje visual compartido (nuevo token, cambio en paleta o nueva regla tipográfica transversal).
  - **Caso combinado:** si un nuevo componente funcional introduce además un patrón visual reutilizable, se actualizan tanto la spec de superficie como [sitio/DESIGN.md](sitio/DESIGN.md).

---

## 5. Ciclo de vida de `plan.md` y `tasks.md` en cada spec

Cada carpeta de spec (`portada`, `monografia`, `como-colaborar`) mantiene de forma fija sus archivos de trabajo permanentes:

```
sitio/specs/<parte>/
  ├── spec.md        ← Verdad canónica permanente del sistema
  ├── plan.md        ← Archivo de trabajo permanente (enfoque y arquitectura)
  └── tasks.md       ← Archivo de trabajo permanente (tareas operativas)
```

### Comportamiento según el estado de desarrollo:

1. **Durante un build activo (construcción o refactor amplio):**
   - `plan.md` detalla la arquitectura de implementación, dependencias técnicas y decisiones de maquetación.
   - `tasks.md` contiene el listado exhaustivo de tareas secuenciadas (T1–Tn) con formato de checkbox y criterio observable `Hecho cuando`.
   - [TAREAS.md](TAREAS.md) en la raíz actúa como índice general apuntando al ticket activo (ej. `Monografía: T2 Maquetación del lightbox`).

2. **En reposo (al concluir y verificar el build):**
   - El detalle paso a paso de T1–Tn se limpia para no convertir el repositorio en un cementerio de tickets obsoletos.
   - `plan.md` y `tasks.md` se reducen a un **cierre técnico permanente y sobrio**:
     - *Enfoque aplicado:* resumen de cómo quedó resuelta la arquitectura.
     - *Validación realizada:* pruebas y comprobaciones visuales efectuadas.
     - *Deuda técnica:* aspectos técnicos menores pendientes de optimización que no bloquean la publicación.
   - La verdad operativa consolidada sobre el comportamiento y diseño reside en `spec.md`.

3. **Ciclo ante cambios posteriores:**
   - *Cambio menor:* (ej. añadir un botón, retocar un estilo que ya encaja en DESIGN o ajustar un enlace): se actualiza directamente la spec viva de esa superficie, sin expandir innecesariamente `plan.md` y `tasks.md`.
   - *Cambio amplio:* (ej. reestructuración de la monografía, nueva vista o funcionalidad transversal compleja): se vuelve a desarrollar el plan técnico y el desglose de tareas (T1–Tn) en esos mismos archivos de trabajo permanentes.
   - *Al terminar:* vuelven a simplificarse al cierre técnico y deuda pendiente. Se reutilizan permanentemente sin acumular un historial infinito de tickets viejos.

---

## 6. Copy: spec viva vs código HTML

Se establece una estricta separación de voces:
- **Spec viva = Universo interno** (criterio, reglas, límites y funciones).
- **HTML = Universo público** (palabras exactas de cara a la comunidad).

| Elemento | Reside en la spec viva | Andamiaje temporal (solo durante build) | Canónico exclusivo en HTML |
| --- | :---: | :---: | :---: |
| Función y propósito del bloque | **Sí** | — | — |
| Tono y límites éticos | **Sí** | — | — |
| Destino de enlaces y CTAs | **Sí** | — | — |
| Temas obligatorios que deben cubrirse | **Sí** | — | — |
| Fórmulas canónicas nombradas (`Comparte un par`, `Ver estudio →`) | **Sí** | — | — |
| Diccionario del glosario (términos + definiciones) | **Sí** | — | — |
| Lemas, canales oficiales y protocolo de retirada | **Marca (excepción compartida)** | — | Reflejo obligado |
| Párrafos redactados, entradillas y respuestas literales de FAQ | No | Se redactan provisionalmente en la spec | **Sí, en el archivo HTML** |
| Retoques y pulidos de palabras individuales en textos públicos | No | — | **Sí, en el archivo HTML** |

### Reglas de actualización:
- Modificar o pulir una frase en una página ya publicada sin cambiar la función ni las fórmulas nombradas se hace directamente en el HTML. No se modifica la spec.
- Modificar la función de un bloque, el tono editorial, el destino de una llamada a la acción o una fórmula fija exige actualizar primero la spec.
- Modificar un lema, canal de contacto o protocolo de retirada exige actualizar [marca/02](marca/02-nombre-y-presentacion.md) o [marca/04](marca/04-flujo-de-colaboracion.md), propagándolo a los HTML correspondientes.
- La monografía de un par específico (`salon-aguja.html`) tiene su copy descriptivo en su propio archivo HTML; la spec de monografía solo estipula *cómo* se titula, qué módulos fotográficos lo componen y cómo se estructura la cédula.

---

## 7. Trabajo: Intenciones vs Decisiones

Se establece una separación neta para erradicar duplicidades:

```
¿Qué es esa idea futura o descarte?
 ├── ¿Se evaluó y se decidió NO HACER definitivamente? ──► [sitio/DECISIONES.md] §4 (Descartada + ADR)
 ├── ¿Es una elección de alcance / arquitectura de v1? ──► [sitio/DECISIONES.md] §2 (ADR adoptado)
 └── ¿Es un deseo conceptual para versiones posteriores? ──► [TAREAS.md] § Intenciones (Qué / Para qué / Por qué)
```

Una misma materia puede originar una intención, un ADR adoptado y un descarte definitivo diferentes sin duplicar el mismo hecho:
- **La intención:** el deseo de construir una funcionalidad a futuro (ej. cotas conmutables sobre la foto en v1.5 o v2) vive en [TAREAS.md](TAREAS.md) § Intenciones.
- **El ADR adoptado:** la decisión de alcance para la entrega actual (ej. publicar la v1 con fotografía limpia sin cotas) vive en [sitio/DECISIONES.md](sitio/DECISIONES.md) §2.
- **El descarte definitivo:** una alternativa técnica o conceptual rechazada tras análisis (ej. Variante B con cajas fijas sobre la imagen) vive en [sitio/DECISIONES.md](sitio/DECISIONES.md) §4.

### 7.1. Intenciones en [TAREAS.md](TAREAS.md)

Las intenciones son partes o funcionalidades que se desea incorporar al sistema a futuro pero que **aún no tienen spec viva** ni build abierto.

Cada intención se registra con una plantilla personal estructurada:
- **Qué:** descripción del concepto.
- **Para qué:** función que cumplirá en el ecosistema de El Par.
- **Por qué te interesa:** motivación de diseño o editorial (redactada con criterio del creador).
- **Qué no es:** delimitación de bordes para evitar desvíos.
- **Spec:** ninguna (hasta que se active).

*Catálogo inicial de intenciones a trasladar a [TAREAS.md](TAREAS.md):*
1. Vista Armarios (directorio por colaboradora).
2. Página «Sobre El Par» / «Nuestra mirada».
3. Sistema de Cotas conmutables sobre la imagen (Variante A).
4. Formulario propio integrado en la web (sustituyendo a Tally).
5. Fichas ampliadas del glosario (páginas individuales por concepto anatómico).
6. Lanzamiento público del canal de Instagram.
7. Método de opiniones / testimonios.
8. Protocolo de recomendación boca a boca.
9. Manifiesto técnico `como-se-construye.html`.
10. Mecanismos de monetización y afiliados (evaluación futura pospuesta).

### 7.2. Decisiones en [sitio/DECISIONES.md](sitio/DECISIONES.md)

Se depura para ser un registro estricto de ADRs reales:
- **Se elimina:** la sección §2 duplicada que volvía a narrar la spec completa.
- **Se mantiene:** fichas de decisión (Contexto, Decisión adoptada, Alternativas descartadas, Consecuencias, Spec que rige) para elecciones arquitectónicas de impacto (ej. `object-contain` vs silueteado, fotografía limpia vs cotas en v1, navegación sin secciones vacías, Tally provisional).
- **Sección § Abierto:** reservada únicamente a preguntas que bloquean el trabajo en el turno actual.
- **Sección §4 (Archivo de ideas descartadas):** contiene exclusivamente ideas **descartadas definitivamente**, con su motivo y justificación técnica (ej. Variante B de placas técnicas sobre la imagen, tarjeta biográfica de la dueña, botón comercial en cabecera, numeración de almacén visible, cuadrícula rígida 7:5).

---

## 8. Tablero [ESTADO.md](ESTADO.md)

[ESTADO.md](ESTADO.md) deja de ser una crónica acumulativa y pasa a ser un tablero de **10–12 líneas** con la siguiente estructura canónica:

```markdown
# Estado

Actualizado: YYYY-MM-DD.

## Qué es
**El Par — Zapatos en detalle**: publicación editorial independiente y archivo monográfico digital de calzado.

## Foco actual
- [Trabajo prioritario en 1–2 líneas con enlace a TAREAS.md].

## Bloqueos
- Ninguno [o descripción de la duda bloqueante con enlace a DECISIONES.md § Abierto].

## Último hito
- [2–3 líneas rotativas con el hito o cambio clave más reciente].
```

La sección «Cubierto» desaparece de este archivo: el trabajo concluido vive en el historial de commits de git y en las últimas viñetas de la sección **Hecho** de [TAREAS.md](TAREAS.md).

---

## 9. Procedimiento de actualización rápida (Anti-invisibilidad)

Ante cualquier cambio acordado en una conversación, la modificación aterriza de forma inmediata en su único contenedor gobernante:

| Qué cambia | Primera acción | Segunda acción | Prohibido |
| --- | --- | --- | --- |
| Estructura o conducta de Portada | `sitio/specs/portada/spec.md` | [sitio/index.html](sitio/index.html) | Inflar ESTADO con prosa; duplicar en Decisiones |
| Plantilla de monografía | `sitio/specs/monografia/spec.md` | [sitio/entradas/*.html](sitio/entradas/) | Crear una spec por cada par |
| Término o definición de popover | Diccionario en `sitio/specs/monografia/spec.md` | HTML que lo emplee | Redefinir términos en marca |
| Copy de Cómo colaborar | `sitio/specs/como-colaborar/spec.md` (si cambia contrato) o [sitio/como-colaborar.html](sitio/como-colaborar.html) (si es texto fino) | — | Modificar [marca/04](marca/04-flujo-de-colaboracion.md) si no cambió la operativa |
| Protocolo de captación o formulario | [marca/04](marca/04-flujo-de-colaboracion.md) o [tally-formulario](marca/activos/tally-formulario-colaboracion.md) | Formulario HTML local | Duplicar en specs de sitio |
| Sistema visual (colores, fuentes, espaciados) | [sitio/DESIGN.md](sitio/DESIGN.md) | CSS / HTML | Copiar valores hex en las specs de superficie |
| Microajuste estético compatible con DESIGN | Directamente en el HTML | — | Abrir spec o redactar ADR |
| Nuevo componente con patrón visual reutilizable | Spec de superficie (conducta) y [sitio/DESIGN.md](sitio/DESIGN.md) (patrón) | HTML | Crearlo solo en HTML o meter la lógica de pantalla en DESIGN |
| Descarte de una alternativa técnica | [sitio/DECISIONES.md](sitio/DECISIONES.md) | — | Reescribir la spec como un ensayo |
| Idea para una nueva parte o sección futura | [TAREAS.md](TAREAS.md) § Intenciones | — | Crear specs vacías «por si acaso» |

---

## 10. Mapa de migración de contenidos existentes

Ningún criterio consolidado se pierde en la transición.

### 10.1. Resumen por áreas gobernantes

- **[AGENTS.md](AGENTS.md):** incorpora las 4 funciones documentales, el mapa del repositorio, la jerarquía de precedencia (`marca → spec de superficie → implementación`), el ciclo de cambios en `plan.md`/`tasks.md` y la separación entre DESIGN y specs. Mantiene la activación por frontmatter de la skill de redacción.
- **[ESTADO.md](ESTADO.md):** se reduce al tablero de 10–12 líneas sin sección Cubierto.
- **[TAREAS.md](TAREAS.md):** se reorganiza en:
  1. *Ahora (Prioritario):* maquetación de la primera pieza real y seguimiento.
  2. *Intenciones (Plantilla Qué/Para qué/Por qué):* Armarios, Sobre El Par, Cotas, Formulario propio, Fichas de glosario, etc.
  3. *Operativa diferida:* Notas_inbox, Apps Script triggers, etc.
  4. *Hecho:* últimas 3 entradas recientes (el resto queda en git).
- **[README.md](README.md):** se actualiza con el mapa limpio hacia marca, sitio, specs y tablero.
- **Marca (`marca/`):** se conservan todos los archivos [01](marca/01-identidad-editorial.md) a [04](marca/04-flujo-de-colaboracion.md) y [activos/](marca/activos/) exactamente en sus rutas actuales como specs vivas de dominio. Los formatos de Instagram permanecen en [marca/03 §3](marca/03-sistema-editorial-y-contenidos.md).
- **Sitio (`sitio/`):**
  - [sitio/ESPECIFICACION.md](sitio/ESPECIFICACION.md) adelgaza a índice maestro, mapa de arquitectura, límites de v1 y reglas generales de sitio (`object-contain`).
  - `sitio/specs/portada/`: absorbe §3 de la especificación antigua (cabecera, hero, cuadrícula, filtros latentes, pie). Inicializa `plan.md` y `tasks.md` en reposo.
  - `sitio/specs/monografia/`: absorbe §2 de la especificación antigua (apertura, módulos, fotos, lightbox, diccionario canónico de términos, notas, cédula técnica, navegación al pie y SEO). Inicializa `plan.md` y `tasks.md` en reposo.
  - `sitio/specs/como-colaborar/`: absorbe §4 de la especificación antigua (contrato editorial, embudo, puntos de seguridad). Inicializa `plan.md` y `tasks.md` en reposo.
  - [sitio/DESIGN.md](sitio/DESIGN.md): se depura eliminando la descripción de pantallas y la navegación con secciones pospuestas; conserva atmósfera, tokens y patrones UI transversales.
  - [sitio/DECISIONES.md](sitio/DECISIONES.md): se limpia §2 eliminando duplicaciones de specs; conserva ADRs con disyuntivas reales; §4 conserva exclusivamente las ideas Descartadas.

### 10.2. Apéndice detallado de correspondencia (sección por sección)

Esta tabla exhaustiva asegura que ninguna excepción o fuente se pierda durante la ejecución:

| Sección actual | Contenido específico | Destino canónico exacto | Tratamiento del contenido |
| --- | --- | --- | --- |
| **ESPECIFICACION.md §1** | Arquitectura y árbol de vistas | [sitio/ESPECIFICACION.md](sitio/ESPECIFICACION.md) (Índice) | Mapa de vistas v1; vistas futuras (`armarios.html`, `como-se-construye.html`) quedan como Intenciones fuera de v1. |
| **ESPECIFICACION.md §2.1** | Apertura de monografía y procedencia | `sitio/specs/monografia/spec.md` | Contrato de apertura, títulos H2 de rasgo observado y crédito `Armario de...`. |
| **ESPECIFICACION.md §2.2–2.3** | Módulos fotográficos y lightbox | `sitio/specs/monografia/spec.md` | Requisitos de mínimo 6 tomas, ritmo modular y conducta accesible del lightbox. |
| **ESPECIFICACION.md §2.4** | Sistema de cotas | `sitio/specs/monografia/spec.md` + [TAREAS.md](TAREAS.md) + [sitio/DECISIONES.md](sitio/DECISIONES.md) | Queda explícitamente fuera de v1 en spec; deseo futuro como Intención en Tareas; ADR v1 sin cotas en Decisiones. |
| **ESPECIFICACION.md §2.5** | Diccionario canónico de términos | `sitio/specs/monografia/spec.md` | Tabla canónica completa de términos (ES/EN + función) integrada en la spec de monografía. |
| **ESPECIFICACION.md §2.6** | Notas contextuales en papel tintado | `sitio/specs/monografia/spec.md` | Requisitos y función de notas intercaladas; estilo visual desde [sitio/DESIGN.md](sitio/DESIGN.md). |
| **ESPECIFICACION.md §2.7** | Ficha «Datos del par» (cédula) | `sitio/specs/monografia/spec.md` | Estructura continua fluida y 5 campos objetivos obligatorios. |
| **ESPECIFICACION.md §2.8** | Navegación secuencial al pie | `sitio/specs/monografia/spec.md` | Enlaces relativos `← Anterior` / `Siguiente →`. Módulo de recomendados queda como Intención fuera de v1. |
| **ESPECIFICACION.md §2.9** | Cierre colaborativo «Comparte un par» | `sitio/specs/monografia/spec.md` (y portada) + HTML | La spec guarda el contrato y la fórmula nombrada; la prosa descriptiva literal vive en el HTML. |
| **ESPECIFICACION.md §2.10–2.11** | Slugs de entrega y SEO de plantilla | `sitio/specs/monografia/spec.md` | Reglas de nombrado `/entradas/[slug].html`, metadatos OpenGraph y semántica HTML. |
| **ESPECIFICACION.md §3.1–3.5** | Portada (cabecera, hero, rejilla, pie) | `sitio/specs/portada/spec.md` | Adaptabilidad al volumen, filtros latentes y nav esencial. Valores hex se sustituyen por nombres de tokens de DESIGN. |
| **ESPECIFICACION.md §4.1–4.3** | Propósito y FAQs de página puente | `sitio/specs/como-colaborar/spec.md` + [sitio/como-colaborar.html](sitio/como-colaborar.html) | Spec define contrato de acogida y temas obligatorios (privacidad, no rostro/cuerpo, retirada 48 h). Prosa y FAQs literales en HTML. |
| **ESPECIFICACION.md §4.4** | Embudo guía + formulario Tally | `sitio/specs/como-colaborar/spec.md` | Enlaces canónicos a guía y Tally; las URLs oficiales maestras provienen de [marca/02](marca/02-nombre-y-presentacion.md) y [marca/04](marca/04-flujo-de-colaboracion.md). |
| **DECISIONES.md §1** | Criterio de registro | [sitio/DECISIONES.md](sitio/DECISIONES.md) | Redefinido como libro de ADRs reales ligados a specs y registro de ideas descartadas. |
| **DECISIONES.md §2** | Decisiones consolidadas | [sitio/DECISIONES.md](sitio/DECISIONES.md) | Se purgan los duplicados que narran la spec; se conservan como ADR las elecciones con alternativa (ej. `object-contain`, nav activa, Tally provisional). |
| **DECISIONES.md §3** | Preguntas abiertas que bloquean | [sitio/DECISIONES.md](sitio/DECISIONES.md) | Se conserva la sección (actualmente vacía). |
| **DECISIONES.md §4** | Tabla descartadas / pospuestas | [sitio/DECISIONES.md](sitio/DECISIONES.md) + [TAREAS.md](TAREAS.md) | **Separación:** las descartadas definitivas se quedan en §4; las ideas pospuestas se mudan a [TAREAS.md](TAREAS.md) § Intenciones. |
| **TAREAS.md (Ahora)** | Trabajo prioritario | [TAREAS.md](TAREAS.md) | Foco inmediato: maquetar la primera pieza monográfica real. |
| **TAREAS.md (Diferido)** | Operativa interna (volumen) | [TAREAS.md](TAREAS.md) | Procedimiento de `Notas_inbox`, ChatGPT Run y triggers de Apps Script. |
| **TAREAS.md (Pospuesto)** | Ideas conceptuales futuras | [TAREAS.md](TAREAS.md) § Intenciones | Se transforman en fichas de Intenciones (Armarios, Sobre El Par, Cotas, Formulario propio, etc.). |
| **TAREAS.md (Hecho)** | Historial acumulado de tareas | [TAREAS.md](TAREAS.md) | Se reducen a las últimas 3 entradas recientes. El historial detallado descansa en git. |
| **DESIGN.md §1–3** | Atmósfera, paleta y tipografía | [sitio/DESIGN.md](sitio/DESIGN.md) | Se conservan íntegros como sistema visual semántico. |
| **DESIGN.md §4** | Secciones de pantallas específicas | Specs de superficie | Split de hero y cuadrícula pasan a `portada/spec.md`; cédula y popovers pasan a `monografia/spec.md`; nav pospuesta se elimina. |

---

## 11. Qué no se hace

- No se crean carpetas temporales por encargo tipo `specs/001-feature/`.
- No se crea una spec para cada botón, microcomponente o archivo HTML individual.
- No se trasladan los documentos de `marca/` dentro de `sitio/`.
- No se crean specs vacías para partes que aún no se construyen (se registran como Intenciones).
- No se mantiene un espejo textual palabra por palabra entre specs y HTML.
- No se acumula un historial infinito de tickets en `plan.md` y `tasks.md`: al cerrar un build se simplifican a su cierre técnico y deuda.
- No se duplican las ideas pospuestas en Decisiones y en Tareas a la vez.
- No se copian valores hexadecimales ni reglas CSS en las specs de superficie (se referencian desde DESIGN).

---

## 12. Pasos de aplicación (en la siguiente sesión de ejecución)

La migración se realizará de forma limpia y ordenada sin alterar el producto:

1. **Constitución:** actualizar [AGENTS.md](AGENTS.md) con el mapa de gobernanza, jerarquía de precedencia (`marca → spec de superficie → implementación`), ciclo de cambios en `plan.md`/`tasks.md` y reglas de actualización.
2. **Tablero:** transformar [ESTADO.md](ESTADO.md) en el tablero sobrio de 10–12 líneas.
3. **Specs de superficie:** crear `sitio/specs/portada/`, `sitio/specs/monografia/` y `sitio/specs/como-colaborar/`, poblando sus `spec.md`, `plan.md` y `tasks.md` a partir del contenido actual de [sitio/ESPECIFICACION.md](sitio/ESPECIFICACION.md), y reduciendo este último a su rol de índice y reglas transversales.
4. **Decisiones (ADR):** depurar [sitio/DECISIONES.md](sitio/DECISIONES.md), eliminando la duplicación de especificaciones de §2 y dejando en §4 únicamente las ideas descartadas definitivas.
5. **Tareas e Intenciones:** reorganizar [TAREAS.md](TAREAS.md) trasladando las partes futuras pospuestas a la sección **Intenciones** con su plantilla, dejando **Ahora** enfocado y podando el historial antiguo de **Hecho**.
6. **Sistema visual:** depurar [sitio/DESIGN.md](sitio/DESIGN.md) dejándolo estrictamente como sistema visual agnóstico de pantallas.
7. **Control de versiones:** preparar y consolidar los commits atómicos correspondientes.
8. **Revisión personal:** Christian completa el campo *«por qué te interesa»* en las intenciones registradas.

---

## 13. Lista de comprobación para auditoría

El modelo resultante debe respetar estos invariantes:

- [ ] **Marca prevalece:** rige la jerarquía canónica `marca → spec de superficie → implementación`. Cuando una spec web amplía un criterio de Marca, Marca prevalece y la spec no puede rebajarlo ni contradecirlo.
- [ ] **Una sola fuente por criterio:** sin quintas fuentes; activos, manuales, skills, prototipos e índices declaran qué fuente los rige y no se convierten en verdades paralelas.
- [ ] **Copy específico sin espejo:** el texto literal vive exclusivamente en el HTML; la spec viva conserva el contrato de copy. Lemas, canales y protocolo de retirada en Marca son la excepción canónica compartida.
- [ ] **DESIGN sin alcance de producto:** sistema visual agnóstico sin navegación concreta, ratios de módulo ni lógicas de vista.
- [ ] **Microajuste vs. cambio de contrato:** microajustes en HTML; cambios de contrato en spec viva; caso combinado (componente con nuevo patrón reutilizable) actualiza spec y DESIGN.
- [ ] **`plan.md` y `tasks.md` reutilizados:** archivos de trabajo permanentes por spec, expandidos durante build activo y simplificados a cierre técnico y deuda en reposo, reutilizándose en cambios amplios sin acumular historial obsoleto.
- [ ] **Intenciones fuera de Decisiones:** frontera neta entre ADR adoptado ([sitio/DECISIONES.md](sitio/DECISIONES.md) §2), descarte definitivo ([sitio/DECISIONES.md](sitio/DECISIONES.md) §4) e intención conceptual futura ([TAREAS.md](TAREAS.md) § Intenciones).
- [ ] **Ninguna pérdida en la migración:** todo el contenido de la especificación anterior tiene asignado un destino exacto en el apéndice de correspondencia.
