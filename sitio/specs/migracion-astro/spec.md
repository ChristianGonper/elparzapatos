# Spec: Migración Integral de la Plataforma Web a Astro

> **Última actualización:** 2026-09-19 · **Estado:** Activa  
> **Superficie que gobierna:** Todo el entorno web bajo [sitio/](../../)  
> **Sistema visual de referencia:** [sitio/DESIGN.md](../../DESIGN.md)  
> **Marco global gobernante:** [sitio/ESPECIFICACION.md](../../ESPECIFICACION.md)  
> **Relevo técnico de continuidad:** [sitio/RELEVO-MIGRACION-ASTRO.md](../../RELEVO-MIGRACION-ASTRO.md)  
> **Especificaciones vivas de superficie:** [Portada](../portada/spec.md) · [Monografía](../monografia/spec.md) · [Sobre El Par](../sobre-el-par/spec.md) · [Cómo colaborar](../como-colaborar/spec.md)

---

## 1. Propósito e Intención

Transformar la arquitectura del sitio web de **El Par — Zapatos en detalle** desde un conjunto de prototipos estáticos HTML/CSS hacia una plataforma unificada, modular y de alto rendimiento basada en **Astro, TypeScript y pnpm**.

La plataforma resuelve la necesidad de publicar decenas de monografías de calzado de forma ágil y sostenible:
- Centraliza la cabecera, el pie, la tipografía y los componentes editoriales en una **única fuente de verdad**, erradicando la duplicación manual de plantillas.
- Preserva milimétricamente la atmósfera de pliego de arte y catálogo de museo definida en [sitio/DESIGN.md](../../DESIGN.md) (paleta *Paper Warm*, *Charcoal*, *Cognac Leather*, filetes de 1px sin sombras ni redondeos comerciales).
- Abarca la migración integral de las cuatro superficies de versión 1 (`Portada`, `Monografía`, `Sobre El Par` y `Cómo colaborar`), asegurando la continuidad del flujo editorial y preparando el pipeline para despliegue automatizado en Cloudflare Pages con analítica privada.

---

## 2. Decisiones Clave y Racionalidad (ADR)

### ADR-MIG-01: Framework Astro + TypeScript con Generación Estática Pura (SSG)
- **Contexto:** Mantener prototipos HTML independientes obligaba a copiar cabecera, pie y scripts en cada página, impidiendo escalar la colección.
- **Decisión adoptada:** Adoptar Astro como generador de sitios estáticos (SSG) con TypeScript en modo estricto. La edición es exclusivamente local y versionada en Git; la compilación produce archivos HTML/CSS planos listos para producción sin servidores activos.
- **Alternativa descartada:** Aplicaciones SPA pesadas (React/Next.js) por sobrecargar el navegador con JavaScript innecesario para lectura reposada; y gestores de contenido con panel en servidor (WordPress/Strapi) por costes, dependencias y vulnerabilidades.
- **Criterio de revisión:** Evaluar renderizado en el borde (SSR) únicamente si en versiones futuras se introdujera búsqueda facetada dinámica o membresías con estado de sesión.

### ADR-MIG-02: Gestor de Paquetes Canónico: `pnpm`
- **Contexto:** Se requiere un gestor de dependencias rápido, determinista y eficiente en espacio en disco para el entorno de desarrollo y la integración continua.
- **Decisión adoptada:** Fijar **`pnpm`** (versión `>= 9.x` con Node.js `>= 18.17.1` / `20.x`) como el gestor oficial del proyecto.
- **Alternativa descartada:** `npm` por mayor lentitud y redundancia en `node_modules`; `yarn` por inconsistencia de versiones globales.
- **Criterio de revisión:** Mantener `pnpm` como estándar salvo incompatibilidad directa con Cloudflare Pages (que soporta `pnpm` de forma nativa).

### ADR-MIG-03: Colecciones Tipadas con Zod y Cédula Canónica de 5 Campos
- **Contexto:** Las monografías combinan datos descriptivos estructurados con un análisis fotográfico y anatómico modular.
- **Decisión adoptada:** Implementar Astro Content Collections (`src/content/config.ts`) con tipado estricto Zod para la colección `pares`. La ficha técnica implementa obligatoriamente la **Variante 3A (Composición continua literaria / Cédula de museo)** validada en [sitio/mock-comparativas-visuales.html](../../mock-comparativas-visuales.html), conteniendo los 5 campos canónicos: *1. Silueta / Tipo*, *2. Marca y Modelo*, *3. Material y Acabado*, *4. Geometría del tacón* y *5. Procedencia*.
- **Alternativa descartada:** Fichas en formato de tabla o lista rígida de archivo (Variante 3B descartada por fragmentar clínicamente la lectura); y bases de datos relacionales externas.
- **Criterio de revisión:** Mantener el esquema salvo que el crecimiento de la colección requiera nuevos campos anatómicos normalizados.

### ADR-MIG-04: Sistema de Navegación, Identidad de Marca y Regla de Enlace Activo
- **Contexto:** La experiencia de navegación debe ser coherente entre cabecera y pie, evitando la desorientación y las recargas innecesarias.
- **Decisión adoptada:**
  1. **Logo unificado con descriptor en color cognac:** Presencia gráfica de marca idéntica en cabecera y pie: nombre `El Par` en Newsreader serif (Primary Ink Charcoal `#1C1A18`) acompañado del descriptor `/ Zapatos en detalle` en JetBrains Mono versalitas tenues en color cuero cognac (`#9E6B55` / `text-cognac`). Enlaza a la portada (`/`) salvo cuando ya se está en ella.
  2. **Header en flujo:** Cabecera en el flujo normal (sale con el scroll, no es fija) con navegación horizontal "en grande y en recto".
  3. **Footer vertical:** Menú de pie en formato de lista vertical, facilitando la recuperación de rutas al finalizar la lectura.
  4. **Página activa no interactiva:** El enlace a la página actual **nunca es clickeable** (no recarga la página); se marca semánticamente con `aria-current="page"`, estilo activo y `pointer-events-none`.
  5. **Anti-duplicidad contextual:** Si una página ya cuenta con un cierre editorial previo hacia un destino (ej. el bloque `Comparte un par` en Portada y Monografías que conduce a `Cómo colaborar`), el footer omite ese enlace para no duplicar la llamada.
- **Alternativa descartada:** Cabeceras fijas (*sticky*) que devoran espacio visual; descriptor en gris genérico que diluye la calidez de marca; enlaces activos que recargan la página en curso; y footers con botones redundantes pegados a bloques de llamada previa.
- **Criterio de revisión:** Reevaluar si el árbol de vistas se amplía con vistas secundarias (ej. `armarios.astro`).

### ADR-MIG-05: Estilos con CSS Scoped y Tokens Nativos de `DESIGN.md`
- **Contexto:** El sistema editorial exige apego estricto a los tokens cromáticos, tipográficos y de espaciado sin interferencias de frameworks comerciales.
- **Decisión adoptada:** Estilos encapsulados (*Scoped CSS*) en cada componente Astro combinados con una hoja transversal de variables semánticas (`src/styles/tokens.css` y `reset.css`) extraída directamente de [sitio/DESIGN.md](../../DESIGN.md).
- **Alternativa descartada:** Tailwind CSS o librerías de componentes prefabricadas por añadir capas innecesarias y diluir la precisión tipográfica del diseño litográfico.
- **Criterio de revisión:** Mantener CSS puro nativo mientras la biblioteca de componentes conserve su coherencia modular.

### ADR-MIG-06: Migración Integral de las 4 Superficies y Archivo Histórico
- **Contexto:** El sitio cuenta con cuatro superficies maquetadas en prototipos HTML: Portada, Monografía clásica, Sobre El Par y Cómo colaborar.
- **Decisión adoptada:** Migrar las 4 superficies en este ciclo de entrega. Los archivos HTML existentes se trasladan intactos a `sitio/archivo-prototipos/` como respaldo inerte.
- **Alternativa descartada:** Migración escalonada dejando prototipos activos en la raíz, lo que generaría rutas rotas e inconsistencias de diseño.
- **Criterio de revisión:** Los archivos archivados permanecen exclusivamente como referencia histórica.

### ADR-MIG-07: Despliegue en Cloudflare Pages y Analítica Privada
- **Contexto:** Publicación web de coste cero, alta disponibilidad mundial y respeto estricto a la privacidad de colaboradoras y lectoras.
- **Decisión adoptada:** Compilar para despliegue automático en Cloudflare Pages desde `main`. Se inyecta Cloudflare Web Analytics (métricas agregadas esenciales sin cookies ni almacenamiento de datos personales).
- **Alternativa descartada:** Google Analytics con banners de consentimiento invasivos; y servidores dinámicos propios.
- **Criterio de revisión:** Si se requiriera un almacén de objetos desacoplado (Cloudflare R2) cuando el peso de imágenes supere 1 GB.

---

## 3. Comportamiento y Estructura del Sistema

### 3.1. Entorno de Ejecución y Ciclo de Vida

- **Generación Estática Pura (SSG):** Compilación anticipada de todas las rutas a archivos HTML y CSS planos e independientes. Cero dependencia de runtime o servidores en producción.
- **Tipado Estricto de Plataforma:** TypeScript configurado en modo estricto en todos los módulos, componentes y colecciones, garantizando la detección temprana de inconsistencias anatómicas o de maquetación antes de compilar.
- **Gestor Canónico Determinista:** **`pnpm`** (versión `>= 9.x` con Node.js `>= 18.17.1` / `20.x`) como único gestor de dependencias para el proyecto.
- **Contratos de Ciclo de Vida:** El entorno define formalmente tres operaciones canónicas:
  1. *Desarrollo:* Servidor local de inspección con recarga reactiva.
  2. *Verificación de Integridad:* Comprobación estricta de esquemas de datos, tipos y enlaces sin emitir artefactos.
  3. *Compilación:* Generación del árbol estático de distribución para producción.
*(La definición técnica exacta de `package.json`, `astro.config.mjs` y `tsconfig.json` reside en [sitio/specs/migracion-astro/plan.md](plan.md) §1.1).*

---

### 3.2. Arquitectura de Directorios en `sitio/`

```text
sitio/
├── archivo-prototipos/              # Prototipos HTML previos (inerte, histórico)
│   ├── index.html
│   ├── sobre-el-par.html
│   ├── como-colaborar.html
│   ├── mock-comparativas-visuales.html
│   └── entradas/
│       └── salon-aguja.html
├── public/                          # Favicons, robots.txt
├── src/
│   ├── assets/                      # Fotografías optimizadas por Astro (WebP)
│   │   ├── marca/                   # Recursos transversales y muestras domésticas
│   │   └── pares/                   # Fotos de calzado estructuradas por slug
│   │       └── salon-aguja/
│   │           ├── 01-perfil.webp
│   │           ├── 02-tres-cuartos.webp
│   │           ├── 03-frente.webp
│   │           ├── 04-talon.webp
│   │           └── 05-planta.webp
│   ├── components/                  # Biblioteca modular de componentes
│   │   ├── Abstract.astro
│   │   ├── CedulaMuseo.astro
│   │   ├── CitaColaboradora.astro
│   │   ├── Diptico.astro
│   │   ├── Footer.astro
│   │   ├── GlossaryPopover.astro
│   │   ├── Header.astro
│   │   ├── Lightbox.astro
│   │   ├── ModuloEditorial.astro
│   │   └── SpecimenFrame.astro
│   ├── content/
│   │   ├── config.ts                # Esquema de colecciones Zod
│   │   └── pares/                   # Entradas monográficas en Markdown
│   │       └── salon-aguja.md
│   ├── layouts/
│   │   ├── LayoutBase.astro         # HTML base, meta tags, fuentes, analítica
│   │   └── LayoutMonografia.astro   # Estructura de pliego monográfico
│   ├── pages/
│   │   ├── index.astro              # Portada inaugural
│   │   ├── sobre-el-par.astro       # Manifiesto y método
│   │   ├── como-colaborar.astro     # Acogida, guía fotográfica y Tally
│   │   └── entradas/
│   │       └── [slug].astro         # Rutas dinámicas para cada par
│   └── styles/
│       ├── reset.css                # Normalización y base tipográfica
│       └── tokens.css               # Variables semánticas de DESIGN.md
├── astro.config.mjs                 # Configuración de Astro (output: 'static')
├── package.json                     # Scripts y dependencias gestionadas con pnpm
└── tsconfig.json                    # TypeScript estricto
```

---

### 3.3. Catálogo Canónico de Componentes y Contratos de Interfaz

#### 1. `Header.astro`
- **Ubicación y conducta:** En el flujo normal superior; aparece al inicio y sale con el desplazamiento hacia abajo (no es fija).
- **Logotipo:** Enlace de retorno con nombre `El Par` en Newsreader serif (`text-2xl sm:text-3xl font-normal tracking-tight text-ink`) y descriptor `/ Zapatos en detalle` en JetBrains Mono versalitas tenues en color cuero cognac (`text-xs uppercase tracking-widest text-cognac font-medium` / `#9E6B55`). En la portada (`/`), el logo se marca con `aria-current="page"` y es inerte (no recarga).
- **Navegación horizontal ("en grande y en recto"):** Muestra en línea `Colección` (`/#coleccion`), `Sobre El Par` (`/sobre-el-par`) y `Cómo colaborar` (`/como-colaborar`), más el canal reservado `@elparzapatos` en texto inerte.
- **Página activa:** La página en la que se encuentra el usuario recibe `aria-current="page"`, se muestra con subrayado sólido (`border-b border-ink font-medium text-ink`) y es inerte (clic desactivado con `pointer-events-none`).
- **Móvil (`< 768px`):** Las opciones ocupan fila independiente con al menos 44 px de altura táctil por destino.

#### 2. `Footer.astro`
- **Ubicación y conducta:** Al pie de cada página, permitiendo recuperar la navegación tras la lectura.
- **Logotipo:** Idéntica presencia gráfica que en la cabecera: nombre `El Par` en Newsreader serif (`text-ink`) y descriptor `/ Zapatos en detalle` en JetBrains Mono versalitas en color cuero cognac (`text-cognac` `#9E6B55`), enlazando a la portada (`/`) salvo cuando ya se está en ella.
- **Navegación vertical:** Distribución en lista vertical estructurada (`flex flex-col space-y-2.5`), tipográfica y serena.
- **Regla de página activa:** El enlace a la página actual en la lista vertical aparece como texto tenue inerte no clickeable.
- **Regla anti-duplicidad contextual:**
  - En páginas con cierre editorial previo hacia un destino (ej. el bloque `Comparte un par` en Portada y Monografía que enlaza prominentemente a `Cómo colaborar`), el enlace `Cómo colaborar` **se omite de la lista vertical del pie**.
  - En la página `/como-colaborar`, el enlace a sí misma no aparece en la navegación del pie.
- **Canales oficiales:** Correo institucional `elparzapatos@proton.me` e identificador inerte `@elparzapatos`.

#### 3. `CedulaMuseo.astro` (Variante 3A Aprobada)
- **Propósito:** Cierre técnico formal del estudio monográfico, configurado como cartela continua de sala de exposición.
- **Estructura y 5 campos canónicos:**
  1. **Supratítulo:** Rótulo `Cédula del espécimen` en mono versalitas (`font-mono text-[10px] uppercase tracking-[0.25em] text-cognac font-medium`).
  2. **Línea Principal (Campos 1 & 2):** Titular en Newsreader serif (`text-2xl sm:text-3xl text-ink font-normal leading-tight`): `[Silueta / Tipo] · [Marca] *[Modelo]*`.
  3. **Línea Secundaria (Campo 3):** Material y Acabado en Plus Jakarta Sans versalitas espaciadas (`font-sans text-xs sm:text-sm uppercase tracking-widest text-graphite font-medium`): `[Material] · [Acabado] · [Tono]`.
  4. **Separador tipográfico:** Guión fino, punto cuero central (`#9E6B55`) y guión fino (`— • —`).
  5. **Línea Terciaria (Campos 4 & 5):** En JetBrains Mono (`font-mono text-xs tracking-wider leading-relaxed`): Geometría del tacón destacada en color cuero (`text-cognac uppercase font-medium`) separada por pleca sutil `|` de la Procedencia del armario (`Armario de [Nombre] (@[cuenta])` en `text-graphite`).
- **Envolvente:** Caja centrada de lectura reposada con filetes superior e inferior `border-y border-hairline` sobre fondo de lienzo cálido `bg-paper-muted/30`.

#### 4. `SpecimenFrame.astro`
- **Propósito:** Marco editorial para fotografías técnicas y de espécimen.
- **Presentación íntegra:** Proporción de cámara (3:4 vertical o 4:3 horizontal) con la imagen completa en `object-contain` sobre fondo blanco de espécimen (`#FFFFFF`) y sombra natural de suelo conservada.
- **Señal de inspección interactiva:** Al posar el cursor (*hover*) o enfocar con teclado en escritorio, despliega hacia adentro un paspartú de papel tintado con filete nítido en tono cuero (`#9E6B55`) tipo revista de moda, manteniendo la fotografía inmóvil (sin escalado, desplazamiento ni filtros).
- **Apertura de Lightbox:** Al pulsar o presionar `Enter` / Espacio sobre el marco, se activa la vista ampliada.

#### 5. `Abstract.astro`
- **Apertura editorial:** Maquetada a dos columnas (estilo catálogo de arte), situando la pieza y agrupando sus rasgos de diseño dominantes antes del recorrido fotográfico. Rige según [sitio/specs/monografia/spec.md](../monografia/spec.md) §2.1.

#### 6. `ModuloEditorial.astro`
- **Contenedor analítico flexible:** Soporta las retículas de pliego alternas (`7:5`, `5:7`, `6:6`), supratítulo en mono versalitas (`[ La pala y el escote ]`) y título H2 en Newsreader serif. Sin alturas forzadas: el texto respira con espacio en blanco si el apunte concluye en pocas líneas.

#### 7. `Diptico.astro`
- **Unidad morfológica indisoluble:** Agrupa dos fotografías contiguas (ej. frontal + cenital, o lateral exterior + lateral interior) bajo un marco conector físico común, con filete de separación sutil y texto explicativo centrado al pie.

#### 8. `CitaColaboradora.astro`
- **Testimonio personal:** Cita destacada en Newsreader cursiva con filete fino en color cuero (`#9E6B55`) a la izquierda. Su posición es flexible según el contenido (tras el abstract, junto a un detalle de calce o previa a la cédula técnica).

#### 9. `GlossaryPopover.astro`
- **Glosario contextual accesible:** Los términos técnicos presentes en el texto llevan un subrayado de puntos sutil en color cuero (`#9E6B55`).
- **Comportamiento:** Al pulsar o posar el cursor, despliega una tarjeta flotante adyacente con el término en español/inglés y su función biomecánica. Se cierra al mover el cursor, hacer clic fuera o pulsar la tecla `Esc`, sin oscurecer la pantalla.

#### 10. `Lightbox.astro`
- **Visor modal minimalista:** Ampliación fotográfica a pantalla completa sobre fondo neutro cálido sin barras de herramientas invasivas. Cierre mediante clic exterior o tecla `Esc`.

---

### 3.4. Modelo Conceptual de Contenido y Datos (Colección `pares`)

Cada entrega monográfica de calzado se define editorialmente como un documento estructurado dentro de la colección canónica `pares`:

1. **Metadatos Editoriales y Clasificación:**
   - `titulo`: Titular observacional y evocador de la pieza (ej. *«Dos extremos, una silueta»*).
   - `subtitulo`: Identificación taxonómica sintética (ej. *«Salón clásico de puntera afilada y tacón aguja»*).
   - `fechaPublicacion`: Fecha formal de publicación para ordenar la cronología del archivo.
   - `destacadoEnPortada`: Booleano que determina si la entrega asume la posición de pieza destacada (*Hero Piece*) en la portada.
2. **Activo Fotográfico Principal (*Hero Image*):**
   - Fotografía de apertura del espécimen procesada por el pipeline editorial de imagen.
   - Texto descriptivo alternativo accesible (`heroAlt`) detallando silueta, ángulo y luz para lectoras de pantalla.
3. **Cédula de Museo Canónica (Variante 3A Aprobada):**
   Ficha técnica estructurada en 5 campos canónicos normalizados:
   - **Campo 1 (Silueta / Tipo):** Denominación anatómica formal del zapato (ej. *«Salón clásico»*).
   - **Campo 2 (Marca y Modelo):** Autoría artesanal o de firma y nombre del modelo (ej. *«Christian Louboutin · So Kate»*).
   - **Campo 3 (Material y Acabado):** Composición del corte, tratamiento de superficie y tono exacto (ej. *«Piel vacuna natural · Charol brillante · Negro profundo»*).
   - **Campo 4 (Geometría del Tacón):** Altura en milímetros, tipología y remate de apoyo (ej. *«Tacón aguja 90 mm · Pecho recto»*).
   - **Campo 5 (Procedencia del Armario):** Identificación de la persona colaboradora (ej. *«Armario de Carmen»*) y canal voluntario de contacto (ej. *`carmen.armario`*).
4. **Testimonio de Colaboradora (Opcional):**
   - `texto`: Cita textual honesta sobre el uso o la vivencia del par.
   - `autora`: Nombre de la colaboradora.
   - `posicion`: Ubicación compositiva libre dentro del pliego (`apertura`, `detalle` o `cierre`).

*(El esquema de validación formal en código TypeScript y Zod reside en [sitio/specs/migracion-astro/plan.md](plan.md) §2.1).*

---

### 3.5. Superficies Migradas y Conducta de Vistas

#### 1. Portada (`pages/index.astro`)
- **Gobierno:** Rige según [sitio/specs/portada/spec.md](../portada/spec.md).
- **Hero de pieza destacada:** Composición izquierda–derecha en escritorio (fotografía grande a la izquierda, bloque de observación a la derecha); apilado vertical en móvil.
- **Cuadrícula de la colección:** Muestra las publicaciones disponibles. **Regla de inauguración:** Si solo existe un par publicado, la cuadrícula no duplica la pieza destacada.
- **Cierre editorial:** Módulo `Comparte un par` invitando a participar con enlace a `/como-colaborar`. En consecuencia, el footer de esta página **omite** el enlace de colaborar.

#### 2. Monografía Dinámica (`pages/entradas/[slug].astro`)
- **Gobierno:** Rige según [sitio/specs/monografia/spec.md](../monografia/spec.md).
- **Ruta estática:** Generada mediante enrutamiento estático dinámico desde la colección `pares`.
- **Secuencia:** Retorno superior `← Volver a la Colección` (`/#coleccion`), Héroe equilibrado en 3:4, Abstract a dos columnas, Paseo visual modular con dípticos y retículas `7:5`/`5:7`/`6:6`, Cita opcional, Cédula de museo (Variante 3A) y bloque de cierre `Comparte un par`.

#### 3. Página Institucional «Sobre El Par» (`pages/sobre-el-par.astro`)
- **Gobierno:** Rige según [sitio/specs/sobre-el-par/spec.md](../sobre-el-par/spec.md).
- **Contenido:** Manifiesto editorial unificado («La mirada»), criterio formal de selección, punto de partida en tacones y bailarinas, método fotográfico cotidiano y muestras visuales comparativas y domésticas.
- **Footer:** Muestra la lista vertical con `Colección` y `Cómo colaborar`, marcando `Sobre El Par` como activo no clickeable.

#### 4. Página Puente «Cómo colaborar» (`pages/como-colaborar.astro`)
- **Gobierno:** Rige según [sitio/specs/como-colaborar/spec.md](../como-colaborar/spec.md).
- **Contenido:** Tono de acogida en tuteo, 3 pasos de participación, los 4 compromisos éticos (no comercial, privacidad, respeto a la imagen sin IA, retirada en 48 h), tarjeta interactiva de portada de la Guía Fotográfica que conduce a Tally y canal oficial de contacto.
- **Footer:** Muestra la lista vertical con `Colección` y `Sobre El Par`, omitiendo `Cómo colaborar` por encontrarse en dicha superficie.

---

### 3.6. Infraestructura de Despliegue y Analítica Privada

- **Alojamiento en Cloudflare Pages:** Despliegue continuo activado por confirmaciones en la rama `main`, sirviendo archivos estáticos inmutables desde la red global de Cloudflare.
- **Analítica Web Privada y Ética:** Integración de Cloudflare Web Analytics (métricas esenciales de tráfico, procedencia geográfica agregada y Core Web Vitals). Se prohíbe el uso de cookies, rastreo publicitario entre sitios o paneles de consentimiento que degraden la lectura.
*(La configuración técnica de variables de entorno y comandos de compilación reside en [sitio/specs/migracion-astro/plan.md](plan.md) §3 y §4).*

---

## 4. Alcance y Límites de Versión

### Dentro de esta versión (v1)
- Configuración de Astro con TypeScript estricto y `pnpm` en `sitio/`.
- Archivo histórico de los prototipos HTML previos en `sitio/archivo-prototipos/`.
- Colección tipada `pares` con la monografía inaugural del salón clásico.
- Implementación de la Cédula de Museo en Variante 3A continua literaria con los 5 campos canónicos.
- Biblioteca completa de componentes (`Header`, `Footer`, `SpecimenFrame`, `Abstract`, `ModuloEditorial`, `Diptico`, `CedulaMuseo`, `CitaColaboradora`, `GlossaryPopover`, `Lightbox`).
- Implementación de las reglas de navegación: logo con enlace a inicio, enlaces activos no clickeables, footer en lista vertical y anti-duplicidad contextual.
- Migración integral y validación responsive de las 4 páginas v1 (`index.astro`, `[slug].astro`, `sobre-el-par.astro`, `como-colaborar.astro`).
- Despliegue automático en Cloudflare Pages y Cloudflare Web Analytics activo.

### Pospuesto deliberadamente (Fuera de alcance inicial)
- **Formulario web propio en el servidor:** Se mantiene el enlace/iframe de Tally al final de la guía fotográfica conforme a [marca/04-flujo-de-colaboracion.md](../../../marca/04-flujo-de-colaboracion.md).
- **Almacenamiento en Cloudflare R2:** Las fotografías optimizadas en WebP viajan en el repositorio en esta fase.
- **Panel de administración o CMS:** La publicación se realiza exclusivamente en local mediante Markdown y Git.
- **Capa interactiva de cotas vectoriales sobre la fotografía:** Pospuesta para versiones posteriores; las fotografías v1 se presentan limpias.
- **Directorio de Armarios (`armarios.astro`):** Registrado como intención futura en [TAREAS.md](../../TAREAS.md).
