# Especificación Funcional y de Componentes Web

Este documento define la especificación interactiva, modular y de componentes para la interfaz web de **El Par — Zapatos en detalle**. Actúa de puente entre la identidad de marca (`marca/`), el sistema de diseño (`sitio/DESIGN.md`) y las pantallas desarrolladas en Stitch y código local.

---

## 1. Arquitectura General y Vistas del Sitio

El sitio se estructura como una monografía digital de acceso libre y ritmo pausado:

```
sitio/
├── index.html                  # Portada: Pieza destacada, archivo general y filtro de armarios
├── como-colaborar.html         # Página puente: proceso acogedor, resolución de dudas y paso por la guía
├── como-se-construye.html      # (Fase 2) Manifiesto de rigor técnico, captura y estudio
├── armarios.html               # (Fase 2) Directorio de colaboradoras y colecciones particulares
└── entradas/
    └── [slug].html             # Monografías de calzado (ej. salon-aguja.html)
```

---

## 2. Especificación de la Entrada Monográfica

La página de cada par es el núcleo del proyecto: un estudio morfológico profundo que trata el zapato como una obra de arquitectura en miniatura.

### 2.1. Bloque de Apertura y Cabecera
- **Título de Observación:** Tipografía *Newsreader* / *Playfair Display* en gran escala. Expresa una constatación visual honesta del par demostrable en las fotos (ej. *«Dos extremos, una silueta»* para un salón de tacón aguja y puntera fina; *«La cintura del tacón»* para un tacón bobina).
- **Subtítulo Taxonómico Completo:** Bajo el título, en sans-serif neutra (*Inter* / *Plus Jakarta Sans*), la identificación anatómica rigurosa: `[Familia] con [Escote / Sujeción] en [Material] y [Tipo de tacón / Altura]`. Ejemplo: *Salón clásico con escote redondeado en piel grabada y tacón aguja de 85 mm*.
- **Atribución de Procedencia:** Situada junto al subtítulo o en la entradilla: *«Armario de: [Nombre o alias acordado]»*. Funciona como enlace al fondo de pares de esa colaboradora.
- **Entradilla / Abstract:** 2 a 3 párrafos sintéticos que sitúan la pieza agrupando sus rasgos morfológicos dominantes, convirtiendo esta caracterización formal en la justificación implícita de su interés.
- **Reflexión Testimonial de la Dueña:** Bloque puramente condicional. Si la colaboradora aporta una anécdota de uso, memoria sensorial o reflexión lúcida sobre el par, se formatea como cita destacada con filete fino a la izquierda o como párrafo en cursiva. Si no existe, el espacio no se fuerza.

### 2.2. Sistema de Cuadrícula Flexible y Paseo Visual
A diferencia de un catálogo rígido de comercio electrónico, el ritmo visual se adapta a la morfología particular de cada par:

- **Hero Specimen:** Fotografía de apertura en formato dominante (perspectiva tres cuartos exterior), que muestra el zapato en su actitud completa sobre paspartú limpio.
- **Ratios de Retícula Alterna:**
  - `7:5`: Cuando la explicación anatómica requiere desarrollo conceptual y la fotografía complementa con una vista general o longitudinal.
  - `5:7`: Cuando la toma es marcadamente vertical (ej. vista trasera de un tacón de aguja, embocadura de una caña) y el texto es conciso.
  - `6:6`: Equilibrio entre texto e imagen para observaciones morfológicas estándar.
- **Dípticos Visuales:** Módulo compuesto por dos fotografías contiguas (ej. frontal + cenital para analizar la pala; o perfil interior + perfil exterior para contrastar el enfranque) vinculadas a un único bloque de texto que aborda ambas perspectivas conjuntamente.
- **Pies de Fotografía Limpios:** Las imágenes se presentan sin textos redundantes ni metadatos de maquetación forzados. La fotografía respira sola sobre fondo blanco con filete tenue. Únicamente se admite pie tipográfico breve en casos indispensables de diferenciación entre tomas contiguas (ej. dípticos: *«Cenital»* / *«Planta»*).
- **Titulación y Supratítulos de Sección:**
  - **Supratítulo (mono versalitas tenue):** Indica el componente o zona morfológica examinada en ese bloque: `[ La pala y el escote ]`, `[ El fuste y el aplomo ]`, `[ El enfranque ]`, `[ La planta ]`.
  - **Título H2 (Newsreader serif):** Rasgo físico principal observable, descriptivo y directo, sin exageración lírica ni tecnicismo oscuro: *«Escote asimétrico y caída lateral»*, *«Fuste vertical de 90 mm y apoyo dorsal»*, *«Curvatura del arco y refuerzo interior»*.
- **Sin Alturas Forzadas:** Si la descripción de una zona concluye en tres líneas, el contenedor de texto respira libremente con espacio en blanco; no se agregan párrafos de relleno.

### 2.3. Sistema de Anotaciones Anatómicas en Imagen (Pedagogía Gráfica)
**Fuera de v1.** Las primeras publicaciones van con fotografía limpia, sin interruptor ni capa de cotas. Este módulo se incorpora en una versión posterior de la web (1.5 o 2). El prototipo local puede conservarlo como avance de esa fase.

Para que el lector entienda con precisión lo que observa sin saturar la composición:

- **Control de Modo:** Cada fotografía técnica cuenta en su base o esquina superior con un micro-control conmutador: `[ + Cotas anatómicas ]` / `[ − Ocultar cotas ]`.
- **Capa Vectorial de Anotación (Toggle On):** Al activarse, se superpone una capa sutil con:
  - Líneas de cota ultra-finas (0.75px) en color tinta `#1C1A18` o cuero `#9E6B55`.
  - Flechas o puntos de anclaje que señalan el punto exacto de transición (ej. inicio de la curvatura del enfranque, profundidad de garganta, punto de apoyo del tacón).
  - Micro-etiquetas tipográficas en `JetBrains Mono` (10-11px, caja alta o versalitas).
- **Capa Desactivada (Toggle Off - Por defecto):** Fotografía limpia, respetando el silencio y la apreciación pura del objeto.

### 2.4. Glosario Anatómico en Contexto (Popovers Flotantes)
- Los términos anatómicos y geométricos universales presentes en el cuerpo del texto (`pala`, `garganta`, `collarín`, `enfranque`, `cambrillón`, `fuste`, etc.) se distinguen con un subrayado de puntos sutil en color cuero `#9E6B55`.
- Al pasar el cursor (*hover*) o pulsar el término (*click / tap*), se despliega un popover flotante adyacente a la palabra con:
  - Encabezado: `Término en español (Término en inglés)` en mono versalitas (ej. *Pala (Vamp)*, *Cambrillón (Shank)*, *Fuste (Stem)*).
  - Definición funcional concisa: 1-2 frases sobre su papel biomecánico o constructivo.
  - Cierre al mover el cursor, hacer clic fuera o pulsar la tecla `Esc`, sin bloquear ni oscurecer la pantalla.

### 2.5. Notas Editoriales Concisas (Caja Intercalada)
- Módulos secundarios intercalados en el flujo de lectura (estilo pósit / ficha de apunte), situados inmediatamente bajo el párrafo de referencia:
  - Estilo visual: fondo suave `#F3EFEA` (*paper-muted*), filete perimetral de 1px `#E8E3DC` y tipografía sans o mono de escala reducida.
  - Se descarta la nota marginal (*sidenote*) para garantizar consistencia total en diseño adaptable (móvil, tablet y escritorio) y preparar la retícula para posibles módulos adicionales o menciones en el futuro.
  - Destinados a: singularidades estéticas o históricas del modelo concreto, comparativas morfológicas entre pares del archivo o notas sobre curtidos y materiales singulares.

### 2.6. Ficha «Datos del Par»
- Bloque editorial sobrio integrado al cierre del análisis, concebido como una **cédula de museo**: telegráfica, exacta y sin duplicar la narración del texto.
- Estructura fija de 5 campos objetivos:
  1. *Silueta / Tipo:* Salón clásico (*pump*), merceditas (*mary jane*), bailarina, sandalia de tacón...
  2. *Marca y Modelo:* Firma y nombre del modelo si se conoce (ej. Christian Louboutin · *So Kate*).
  3. *Material y Acabado:* Piel vacuna, ante, satén... y tipo de acabado (charol brillante, grabado, mate...).
  4. *Geometría del tacón:* Familia morfológica, altura observable y perfil (ej. Aguja · 90 mm · Pecho recto).
  5. *Procedencia:* «Armario de [Nombre o colaboradora]» con enlace a su fondo particular.

### 2.7. Cierre de Colaboración Contextual
- En el remate de la monografía, un bloque sereno con tono de diálogo:
  - **Título:** `Comparte un par`
  - **Texto:**
    > «Este estudio ha sido posible gracias a [Nombre]. Si en tu armario descansa un par con detalles singulares, una silueta particular o una construcción que merezca ser compartida, puedes proponérnoslo para formar parte del proyecto.»
  - **Botón de acción:** `Cómo colaborar →` (enlace directo a la página puente `sitio/como-colaborar.html`).

---

## 3. Especificación de la Home (Portada del Archivo)

### 3.1. Cabecera
- Logotipo tipográfico **El Par** en serif y subtítulo **Zapatos en detalle**.
- Navegación minimalista: *Archivo*, *Ver Armarios*, *Sobre El Par* (o *Nuestra Mirada*).
- Ausencia total de botones de compra, suscripciones intrusivas o banners de reclamo.

### 3.2. Pieza Destacada (Hero Piece)
- Módulo protagonista superior a ancho completo que rompe la monotonía del grid.
- Fotografía en paspartú amplio y limpio.
- Bloque de texto depurado sin redundancias:
  - Metadatos superiores: `Pieza Destacada` y `Armario de [Nombre]`.
  - Título observacional en Newsreader serif: ej. *«Dos extremos, una silueta»*.
  - Subtítulo taxonómico conciso en una sola línea (se suprime el párrafo descriptivo secundario para maximizar el silencio visual).
  - Enlace sobrio y ligero: `Ver estudio →`.

### 3.3. Filtros y Organización del Archivo
- Barra de filtrado sobria:
  - Por familias de calzado: *Todos*, *Salones*, *Merceditas*, *Bailarinas*, *Tacón bajo*.
  - Contador de fondo documental: *6 especímenes catalogados*.
  - Acceso directo: *«Ver Armarios →»* (para explorar las aportaciones agrupadas de cada donante).

### 3.4. Cuadrícula de Fichas del Archivo
- Tarjetas limpias enmarcadas con filete de 1px `#E8E3DC` y fondo blanco para la imagen.
- Cero distintivos flotantes, badges de categoría o textos encima de la foto.
- Metadatos bajo la imagen con jerarquía y espaciado fluido:
  - Procedencia: `Armario de [Nombre]` en mono tenue.
  - Título: Observación editorial en serif.
  - Subtítulo: Identificación taxonómica en sans neutra.
- **Interacción pura:** Toda la tarjeta o la imagen y el título actúan como enlace interactivo natural. Se evita un botón concreto de `Ver análisis`.

### 3.5. Pie y Cierre de Portada
- Bloque en papel reposado `#F3EFEA` invitando a compartir calzado bajo el lema `Comparte un par` y botón hacia la página puente `Cómo colaborar →`.
- Pie institucional sobrio con descriptor taxonómico y enlaces de navegación secundaria.

---

## 4. Especificación de la Página Puente «Cómo colaborar» (`como-colaborar.html`)

Página de aterrizaje orientada a acoger a la lectora interesada, resolver dudas inmediatas y conducirla de forma natural por la guía fotográfica antes del formulario.

### 4.1. Encabezado y Propósito
- **Tono:** Cálido, de confianza y sin tecnicismos ni frialdad burocrática.
- **Mensaje central:** *«Tu calzado en El Par: no buscamos zapatos de pasarela, buscamos formas y detalles que cuenten algo.»*

### 4.2. El Proceso en 3 Pasos
1. **Elige tu calzado:** Puedes enviar un par o varios a la vez. Cualquier modelo con una silueta singular, un tacón especial o un detalle de diseño que te llame la atención.
2. **Fotos con tu móvil:** Con naturalidad y sin luces de estudio: simplemente colócalos sobre un fondo neutro y evita los reflejos.
3. **Envío ágil:** Subida directa por formulario indicando cómo prefieres figurar acreditada (con tu nombre, tu cuenta de Instagram o de forma anónima).

### 4.3. Resolución de Dudas Rápidas
- *«¿Tienen que ser zapatos de marca o caros?»* &rarr; En absoluto. Nos interesa la forma, la línea y los detalles decorativos, no el precio ni el logotipo.
- *«¿Salgo yo en las fotos o en la web?»* &rarr; No. El foco está 100% en el objeto y su arquitectura.
- *«¿Tengo control sobre mis fotos?»* &rarr; Total. Decides tu acreditación y puedes solicitar la retirada de cualquiera de tus pares en cualquier momento escribiendo a `elparzapatos@proton.me` o por Instagram (retirada en un máximo de 48 horas).

### 4.4. Embudo y Llamadas a la Acción (Paso por la Guía)
- Para asegurar que los envíos contengan las 6 perspectivas canónicas y evitar tomas inservibles, el flujo conduce prioritariamente a la lectura de la guía:
  - **Paso 1 (Recomendado):** Botón / Enlace destacado a la [Guía fotográfica *Tus zapatos en cámara*](https://christiangonper.github.io/elparzapatos/marca/activos/guia-fotografica-colaboradores.html) (lectura visual de 1 minuto con ejemplos).
  - **Paso 2:** Acceso al [Formulario de recepción](https://tally.so/r/Npj2bl) para subir las fotos una vez tomadas.

