# Especificación Funcional y de Componentes Web

Este documento define la especificación interactiva, modular y de componentes para la interfaz web de **El Par — Zapatos en detalle**. Actúa de puente entre la identidad de marca (`marca/`), el sistema de diseño (`sitio/DESIGN.md`) y las pantallas desarrolladas en Stitch y código local.

---

## 1. Arquitectura General y Vistas del Sitio

El sitio se estructura como una monografía digital de acceso libre y ritmo pausado:

```
sitio/
├── index.html                  # Portada: Pieza destacada, archivo general y filtro de armarios
├── armarios.html               # (Fase 2) Directorio de colaboradoras y colecciones particulares
├── como-se-construye.html      # (Fase 2) Manifiesto de rigor técnico, captura y estudio
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

- **Hero Specimen:** Fotografía de apertura en formato dominante (perspectiva tres cuartos exterior), que muestra el zapato en su actitud completa.
- **Ratios de Retícula Alterna:**
  - `7:5`: Cuando la explicación anatómica requiere desarrollo conceptual y la fotografía complementa con una vista general o longitudinal.
  - `5:7`: Cuando la toma es marcadamente vertical (ej. vista trasera de un tacón de aguja, embocadura de una caña) y el texto es conciso.
  - `6:6`: Equilibrio perfecto entre texto e imagen para observaciones morfológicas estándar.
- **Dípticos Visuales:** Módulo compuesto por dos fotografías contiguas (ej. frontal + cenital para analizar la pala; o perfil interior + perfil exterior para contrastar el enfranque) vinculadas a un único bloque de texto que aborda ambas perspectivas conjuntamente.
- **Sin Alturas Forzadas:** Si la descripción de una zona concluye en tres líneas, el contenedor de texto respira libremente con espacio en blanco; no se agregan párrafos de relleno.
- **Numeración Discreta:** Foliación sutil en el margen para orientar la lectura sin manchar la imagen ni evocar despieces industriales (opciones en definición: foliación minimalista romana `I, II, III`, viñeta editorial `· 01`, o código de lámina de moda `pl. 01`).

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
- Los términos de oficio presentes en el cuerpo del texto (`pala`, `garganta`, `collarín`, `enfranque`, `cambrillón`) se distinguen con un subrayado de puntos sutil en color cuero `#9E6B55`.
- Al pasar el cursor (*hover*) o pulsar el término (*click / tap*), se despliega un popover flotante adyacente a la palabra con:
  - Nombre del término y función biomecánica/constructiva sintética (1-2 frases).
  - Definición breve en el propio popover (1–2 frases). Sin ficha pedagógica enlazada desde este repositorio.
  - Cierre al mover el cursor, hacer clic fuera o pulsar la tecla `Esc`, sin bloquear ni oscurecer la pantalla.

### 2.5. Notas Concisas
- Módulos secundarios intercalados con fondo tintado suave (`#F3EFEA`), tipografía ligeramente menor y borde arquitectónico de 1px `#E8E3DC`.
- Destinados a:
  - Singularidades no presentes en el glosario general.
  - Micro-comparativas morfológicas directas con otras piezas del archivo.
  - Apuntes etimológicos o históricos del modelo concreto.

### 2.6. Ficha «Datos del Par»
- Bloque editorial fluido y creativo integrado al cierre del análisis (o en columna lateral según dispositivo), alejándose de la rigidez de una tabla técnica de fila por campo.
- Diseño sobrio sin iconos ni tecnificación innecesaria, priorizando una composición tipográfica refinada con filetes sutiles.
- **Campos esenciales confirmados:**
  - *Tipo:* Salón, bailarina, merceditas, sandalia de tacón…
  - *Marca y Modelo:*
  - *Material exterior:* Piel, ante, textil, satén…
  - *Acabado:* Grabado, cepillado, charol, mate…
  - *Color:* Color principal y, si procede, contraste o tonalidad de acento.
  - *Tacón / base:* Familia morfológica y altura observable.
  - *Colaboradora:* Nombre de la dueña y enlace a su colección.

### 2.7. Cierre de Colaboración Contextual
- En el remate de la página, un bloque sereno con tono de diálogo:
  *«Este análisis ha sido posible gracias a [Nombre]. Si en tu armario descansa un par con una silueta singular o una arquitectura que merezca ser estudiada, puedes proponérnoslo.»*
  - Enlace sutil al manual de colaboración / formulario privado.

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
- Bloque en papel reposado `#F3EFEA` invitando a *«abrir las puertas del propio armario»* con llamada sobria `Abrir mi armario →`. *(Nota de redacción: el texto exacto de este bloque y los enlaces del footer permanecen abiertos a afinarse en la fase de redacción de marca).*
- Pie institucional sobrio con descriptor taxonómico y enlaces de navegación secundaria.
