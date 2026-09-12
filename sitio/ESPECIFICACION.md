# Especificación Funcional y de Componentes Web

Este documento define la especificación interactiva, modular y editorial para la web de **El Par — Zapatos en detalle**. Establece la estructura de la portada (índice), las monografías de calzado y la página puente de colaboración, uniendo la identidad editorial ([marca/README.md](../marca/README.md)) y el sistema de diseño ([sitio/DESIGN.md](DESIGN.md)).

---

## 1. Arquitectura General y Vistas del Sitio

El sitio se estructura como un archivo monográfico digital de ritmo pausado y lectura reposada:

```
sitio/
├── index.html                  # Portada: Pieza destacada, archivo adaptable y llamada a colaborar
├── como-colaborar.html         # Página puente: acogida, resolución de dudas, guía y acceso a Tally
├── como-se-construye.html      # (Fase 2) Manifiesto de rigor técnico, captura y estudio
├── armarios.html               # (Fase 2) Directorio de colaboradoras y armarios particulares
└── entradas/
    └── [slug].html             # Monografías de calzado (ej. salon-aguja-piel-grabada.html)
```

---

## 2. Especificación de la Entrada Monográfica

La página de cada par es el núcleo del proyecto: examina el zapato como una obra de diseño y artesanía en miniatura.

### 2.1. Bloque de Apertura y Cabecera
- **Retorno al Archivo:** Enlace superior discreto en tipografía mono: `← Volver al Archivo`.
- **Título de Observación:** Tipografía *Newsreader* / *Playfair Display* en gran escala. Expresa una constatación visual honesta del par demostrable en las fotografías (ej. *«Dos extremos, una silueta»* para un salón de tacón aguja y puntera fina; *«La cintura del tacón»* para un tacón bobina).
- **Subtítulo Descriptivo:** Bajo el título, en sans-serif neutra (*Plus Jakarta Sans* / *Inter*), la identificación rigurosa del par: `[Familia] con [Escote / Sujeción] en [Material] y [Tipo de tacón / Altura]`. Ejemplo: *Salón clásico con escote asimétrico en piel vacuno y tacón aguja de 90 mm*.
- **Atribución de Procedencia:** Situada junto al subtítulo: *«Armario de: [Nombre o alias acordado]»*. Si la colaboradora autorizó acreditar su cuenta en el formulario, se incluye la mención o enlace discreto a su `@Instagram`. El enlace a una página de armario dedicada se activará cuando dicha vista se incorpore al sitio público.
- **Entradilla / Abstract:** 2 párrafos sintéticos estructurados a dos columnas (estilo pliego editorial de arte) que sitúan la pieza agrupando sus rasgos de diseño dominantes.
- **Reflexión Testimonial de la Dueña:** Bloque puramente condicional. Si la colaboradora aporta una anécdota de uso, memoria sensorial o reflexión sobre el par, se formatea como cita destacada con filete fino a la izquierda. Si no existe, el espacio no se fuerza.

### 2.2. Sistema Modular y Paseo Visual (Ritmo Flexible)
A diferencia de una ficha rígida de comercio electrónico, el ritmo visual se adapta a las líneas y particularidades de cada modelo:

- **Volumen Fotográfico:** Cada monografía cuenta con un mínimo de 6 fotografías reales (las 6 perspectivas establecidas en la guía de colaboración), más las tomas de macro o detalle constructivo que justifiquen su inclusión.
- **Hero Specimen:** Fotografía de apertura en formato dominante (perspectiva tres cuartos exterior), mostrando el calzado en su actitud completa.
- **Tratamiento Fotográfico (`object-contain`):** Las fotografías se presentan íntegras sin recortes dentro de marcos de proporción normalizada sobre fondo neutro/blanco (`#FFFFFF` con filete perimetral `#E8E3DC`). Se conserva siempre la silueta completa (puntera, altura de tacón) y el suelo con su sombra natural de apoyo. Se prohíbe el silueteado o la extracción artificial de fondos.
- **Módulos de Análisis Flexibles:** El cuerpo del texto se articula mediante una secuencia modular según los rasgos del par.
- **Ratios de Retícula Alterna:**
  - `7:5`: Explicación amplia complementada con toma longitudinal o general.
  - `5:7`: Toma vertical (ej. trasera de tacón aguja o caña) con texto sintético.
  - `6:6`: Equilibrio estándar entre texto e imagen.
  - `Dípticos Visuales`: Dos fotografías contiguas (ej. perfil interior + perfil exterior, o frontal + cenital) vinculadas a un único bloque de texto explicativo conjunto.
- **Pies de Fotografía Limpios:** Las imágenes respiran solas sin textos de relleno. Únicamente se admite pie tipográfico breve en casos indispensables de diferenciación entre tomas contiguas (ej. dípticos: *«Lateral exterior»* / *«Lateral interior»*).
- **Titulación de Sección:**
  - **Supratítulo (mono versalitas tenue):** Parte del zapato examinada: `[ La pala y el escote ]`, `[ El fuste y el aplomo ]`, `[ El enfranque ]`.
  - **Título H2 (Newsreader serif):** Rasgo físico observable, descriptivo y directo: *«Escote asimétrico y caída lateral»*, *«Fuste vertical de 90 mm y apoyo dorsal»*.
- **Sin Alturas Forzadas:** El contenedor de texto respira libremente con espacio en blanco si el apunte concluye en pocas líneas.

### 2.3. Ampliación Fotográfica (Lightbox Minimalista)
Para apreciar el detalle constructivo, las costuras y la textura real de los materiales:
- Al pulsar sobre cualquier fotografía técnica o de detalle, se despliega una vista ampliada limpia a pantalla completa sobre fondo neutro `#FAF8F5` o blanco.
- Interfaz no invasiva: sin barras de herramientas pesadas ni iconos recargados. Cierre intuitivo mediante clic en cualquier zona exterior o pulsando la tecla `Esc`.

### 2.4. Sistema de Anotaciones sobre la Imagen (Cotas)
- **Fuera de v1:** Las primeras publicaciones se presentan con fotografía limpia, sin interruptor ni capa de cotas vectoriales. La arquitectura de cotas conmutables queda reservada para una versión posterior del sitio.

### 2.5. Glosario en Contexto (Popovers Flotantes) y Diccionario Canónico
- Los términos clave del calzado presentes en el texto llevan un subrayado de puntos sutil en color cuero `#9E6B55`.
- Al pasar el cursor (*hover*) o pulsar (*click / tap*), se despliega una tarjeta flotante adyacente que muestra:
  - Encabezado: `Término en español (Término en inglés)` en mono versalitas.
  - Definición funcional concisa: 1-2 frases sobre su función constructiva o biomecánica.
  - Cierre inmediato al mover el cursor, hacer clic fuera o pulsar `Esc`, sin oscurecer la pantalla.
- **Diccionario Canónico de Términos Iniciales:**
  | Término (ES) | Término (EN) | Definición Funcional y Biomecánica |
  | :--- | :--- | :--- |
  | **Pala** | *Vamp* | Pieza delantera del corte que cubre los dedos y el empeine hasta la línea de garganta; determina la flexión anterior del pie al caminar. |
  | **Garganta** | *Throat* | Borde o curva de corte que delimita la embocadura delantera de la pala en contacto con el empeine; su profundidad define cuánto pie queda al descubierto. |
  | **Línea de calce** | *Topline* | Contorno perimetral continuo por donde calza el pie, desde la garganta delantera hasta el collarín trasero. |
  | **Collarín** | *Collar* | Tramo trasero de la línea de calce que remata la embocadura a la altura del talón del pie. |
  | **Talonera** | *Quarter* | Panel o conjunto de paneles del corte que configuran la parte lateral y trasera envolviendo el talón del pie. |
  | **Puntera** | *Toe / Toe box* | Zona delantera del calzado que aloja los dedos; determina el contorno frontal (redonda, almendra o puntiaguda). |
  | **Capuchón** | *Toe cap* | Pieza de corte independiente en la punta, rematada con costura transversal propia que interrumpe la pala. |
  | **Empeine** | *Instep* | Zona dorsal anatómica del pie y del calzado situada entre la garganta y el tobillo, donde asientan las tiras de sujeción. |
  | **Corte** | *Upper* | Conjunto de todas las piezas y materiales exteriores del zapato, con exclusión del tacón y la suela. |
  | **Forro** | *Lining* | Capa interior de piel o textil que viste el calzado en contacto directo con el pie. |
  | **Enfranque** | *Waist* | Zona estrechada del zapato en planta situada bajo el arco del pie, entre la planta delantera y el tacón. |
  | **Arco** | *Arch* | Curva cóncava inferior del piso observable en el perfil longitudinal bajo el enfranque. |
  | **Cambrillón** | *Shank* | Refuerzo longitudinal rígido (de acero, madera o fibra) alojado en el enfranque que sostiene el arco óseo del pie e impide que el zapato parta por la mitad. |
  | **Palmilla** | *Insole* | Suela estructural interior sobre la que se monta y fija el corte del zapato; sirve de base inmediata a la planta del pie. |
  | **Suela** | *Outsole* | Piso exterior inferior del zapato que hace contacto con el pavimento. |
  | **Cerco** | *Welt* | Tira perimetral de cuero que une la pala, la palmilla y la suela exterior mediante cosido en las construcciones tradicionales de calidad. |
  | **Contrafuerte** | *Counter / Heel stiffener* | Refuerzo rígido oculto en el talón entre el corte exterior y el forro que estabiliza el calcáneo e impide el deslizamiento lateral del talón. |
  | **Plataforma** | *Platform* | Suplemento de grosor bajo el antepié que amortigua y reduce el desnivel efectivo del pie sin restar altura visual al tacón. |
  | **Fuste** | *Stem* | Columna vertical del tacón comprendida entre la base superior de asiento y la tapa de apoyo; su silueta y perfil definen el tipo de tacón. |
  | **Asiento** | *Heel seat* | Base superior de unión del tacón donde apoya y descarga el talón del pie sobre la suela. |
  | **Pecho** | *Breast* | Cara delantera del tacón orientada hacia la puntera; en perfil se lee como recto o cóncavo (*scoop*). |
  | **Tapa** | *Top piece* | Pieza inferior de desgaste en la base del tacón que hace contacto directo con el suelo. |
  | **Cintura del fuste** | *Stem waist* | Estrechamiento medio del cuerpo del tacón característico de la familia bobina o carrete (*spool*). |
  | **Aplomo** | *Balance / Pitch* | Distribución geométrica de ejes de carga que asegura que la tapa del tacón descanse plana sobre el suelo sin vencer hacia adelante o hacia atrás. |
  | **Vivo** | *Piping* | Cordón o tira fina de cuero doblada e insertada en una costura para reforzar la unión y perfilar visualmente los límites del patrón. |

### 2.6. Notas Editoriales Concisas (Caja Intercalada)
- Módulos secundarios intercalados en el flujo de lectura (estilo pósit / apunte de taller) bajo el párrafo de referencia:
  - Estilo: fondo suave `#F3EFEA` (*paper-muted*), filete de 1px `#E8E3DC` y tipografía sans o mono de escala reducida.
  - Uso: particularidades históricas del diseño, notas breves o comparaciones directas.

### 2.7. Ficha «Datos del Par» (Cédula de Museo)
- Bloque editorial sobrio al cierre del análisis, redactado como cédula de museo:
  1. *Silueta / Tipo:* Salón clásico (*pump*), merceditas (*mary jane*), bailarina...
  2. *Marca y Modelo:* Firma y modelo si se conocen (o con una linea --- si no se conocen).
  3. *Material y Acabado:* Tipo de piel o tejido y acabado observable (ej. *Piel vacuna grabada con acabado brillante*).
  4. *Geometría del tacón:* Silueta, altura aproximada y caída (ej. *Aguja · 90 mm · Pecho recto*, o *Plano · 10 mm*).
  5. *Procedencia:* «Armario de [Nombre/Alias]», acompañado de su usuario de Instagram si fue autorizado.

### 2.8. Navegación Secuencial al Pie
- Al término de la monografía (tras la cédula técnica y antes del bloque de cierre):
  - Enlaces secuenciales discretos: `← Entrega anterior: [Título]` y `Entrega siguiente: [Título] →`.
  - Permite navegar el catálogo ordenado de forma correlativa sin regresar forzosamente al índice. El módulo de piezas sugeridas queda reservado para cuando el archivo tenga mayor volumen.

### 2.9. Cierre de Colaboración Contextual
- En el remate de la monografía:
  - **Título:** `Comparte un par`
  - **Texto:**
    > «Este estudio ha sido posible gracias a [Nombre]. Si tienes algún par con detalles especiales, una silueta particular o un diseño que merezca verse de cerca, puedes proponérnoslo para formar parte del proyecto.»
  - **Botón de acción:** `Cómo colaborar →` (enlace directo a `como-colaborar.html`).

### 2.10. Nomenclatura de URLs (Slugs)
- Formato descriptivo enriquecido: `/entradas/[silueta]-[rasgo]-[material-o-detalle].html` (ej. `entradas/salon-aguja-piel-grabada.html`, `entradas/merceditas-doble-tira-burdeos.html`).
- En caso de coincidencia total de diseño entre dos piezas distintas, se desempata naturalmente incorporando la procedencia (`/entradas/salon-aguja-carmen.html`).

### 2.11. Metadatos y SEO Editorial
- `<title>`: `El Par — [Título de Observación] | [Familia]` (ej. *El Par — «Dos extremos, una silueta» | Salón clásico*).
- `<meta name="description">`: Resumen de 1-2 frases indicando identificación anatómica y procedencia.
- Metadatos OpenGraph y Twitter Cards (`summary_large_image`) configurados con la imagen Hero en tres cuartos exterior.

---

## 3. Especificación de la Home (Portada del Archivo)

La portada es la antesala y el índice vivo del archivo documental.

### 3.1. Cabecera y Navegación Esencial Activa
- Logotipo **El Par** en serif y descriptor **Zapatos en detalle** en sans neutra.
- Navegación esencial activa:
  - `Archivo`: Enlace o ancla directa a la colección.
  - `Cómo colaborar`: Acceso directo a la página puente `como-colaborar.html`.
- Se suprimen de la navegación pública los enlaces a vistas pospuestas (`Armarios`, `Sobre El Par`) y al perfil de Instagram inactivo hasta su respectivo lanzamiento.

### 3.2. Arquitectura Adaptativa al Volumen
La interfaz de portada se adapta orgánicamente a la escala real del fondo:
- **Pieza Destacada (Hero Piece):** La entrega más reciente asume el protagonismo superior a ancho completo.
- **Cuadrícula Inferior:** Muestra las demás entregas sin duplicar la pieza destacada.
- **Arranque inicial (1 sola entrega):** La portada destaca con amplitud la pieza inaugural y enlaza directamente al cierre colaborativo, sin mostrar rejillas vacías ni mensajes artificiales de catálogo incompleto.
- **Filtros por Tipología:** La barra de filtros por familia (*Salones*, *Merceditas*, *Bailarinas*, etc.) permanece latente e invisible hasta que existan al menos dos tipologías distintas catalogadas con suficiente volumen representativo.

### 3.3. Pieza Destacada (Hero Piece)
- Contenedor con fotografía en marco normalizado con paspartú amplio y limpio (`object-contain`).
- Ficha editorial:
  - Metadatos superiores: `Pieza Destacada` y `Armario de [Nombre]`.
  - Título observacional en Newsreader serif: ej. *«Dos extremos, una silueta»*.
  - Subtítulo taxonómico conciso en una sola línea.
  - Enlace sobrio: `Ver estudio →`.

### 3.4. Cuadrícula de Fichas del Archivo
- Tarjetas delimitadas por filete perimetral tenue `#E8E3DC` y fondo blanco `#FFFFFF` para el marco de la imagen.
- Fotografías presentadas mediante `object-contain` íntegro, garantizando que el calzado completo y su sombra de apoyo respiren sin recortes de puntera o tacón.
- Metadatos bajo la imagen:
  - Procedencia: `Armario de [Nombre]` en mono tenue.
  - Título: Observación editorial en serif.
  - Subtítulo: Identificación taxonómica en sans neutra.
- Interacción completa: La tarjeta entera actúa como enlace a la monografía.

### 3.5. Pie y Cierre de Portada
- Bloque en papel reposado `#F3EFEA` invitando a compartir calzado bajo el lema `Comparte un par` y botón hacia `como-colaborar.html`.
- Pie institucional sobrio con descriptor del proyecto y créditos de cortesía.

---

## 4. Especificación de la Página Puente «Cómo colaborar» (`como-colaborar.html`)

Página de aterrizaje integrada en el lanzamiento inicial, orientada a acoger a la lectora interesada, resolver dudas inmediatas y conducirla de forma natural por la guía fotográfica antes del formulario.

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

