# Spec: Entrada Monográfica

**Superficie que rige:** [sitio/entradas/*.html](../../entradas/)  
**Sistema visual:** [sitio/DESIGN.md](../../DESIGN.md)  

---

## 1. Propósito y Filosofía

La monografía es el núcleo de **El Par**: examina cada zapato como una obra autónoma de diseño y artesanía en miniatura, completamente desvinculada del estilo de vida, la venta o el estilismo de influencers. 

---

## 2. Estructura y Conducta de la Monografía

### 2.1. Bloque de Apertura y Cabecera
- **Retorno a la Colección:** Enlace superior discreto en tipografía mono: `← Volver a la Colección` con enlace a [sitio/index.html#coleccion](../../index.html#coleccion).
- **Título de Observación:** En tipografía Newsreader serif a gran escala. Expresa una constatación visual honesta del par demostrable en las fotografías (ej. *«Dos extremos, una silueta»*).
- **Subtítulo Descriptivo:** Bajo el título, en sans-serif neutra (*Plus Jakarta Sans* / *Inter*): `[Familia] con [Escote / Sujeción] en [Material] y [Tipo de tacón / Altura]`. Ejemplo: *Salón clásico con escote asimétrico en piel vacuno y tacón aguja de 90 mm*.
- **Atribución de Procedencia:** Situada junto al subtítulo: *«Armario de: [Nombre o alias acordado]»*. Si la colaboradora autorizó acreditar su cuenta en el formulario, se incluye la mención o enlace discreto a su `@Instagram`. El enlace a una página de armario dedicada se activará cuando dicha vista se incorpore al sitio público.
- **Entradilla / Abstract:** 2 párrafos sintéticos estructurados a dos columnas (estilo pliego editorial de arte) que sitúan la pieza agrupando sus rasgos de diseño dominantes.
- **Reflexión Testimonial de la Dueña:** Bloque puramente condicional. Si la colaboradora aporta una anécdota de uso, memoria sensorial o reflexión sobre el par, se formatea como cita destacada con filete fino a la izquierda. Si no existe, el espacio no se fuerza.

### 2.2. Paseo Visual Modular y Ritmo Flexible
- **Volumen Fotográfico:** Cada monografía cuenta con un mínimo de 6 fotografías reales (las 6 perspectivas canónicas establecidas en [marca/03-sistema-editorial-y-contenidos.md](../../../marca/03-sistema-editorial-y-contenidos.md)), más las tomas macro o de detalle constructivo que justifiquen su inclusión.
- **Hero Specimen:** Fotografía de apertura en formato dominante (perspectiva tres cuartos exterior), mostrando el calzado en su actitud completa.
- **Tratamiento Fotográfico (`object-contain`):** Las fotografías se presentan íntegras sin recortes dentro de marcos de proporción normalizada sobre fondo `Specimen White` con filete perimetral `Hairline Dust Border`. Se conserva siempre la silueta completa y el suelo con su sombra natural de apoyo. Se prohíbe el silueteado o la extracción artificial de fondos.
- **Módulos de Análisis Flexibles:** Secuencia adaptada a las particularidades de cada par.
- **Ratios de Retícula Alterna (Distribución de Columnas Web):**
  - `7:5`: Explicación amplia complementada con toma longitudinal o general.
  - `5:7`: Toma vertical (ej. trasera de tacón aguja o caña) con texto sintético.
  - `6:6`: Equilibrio estándar entre texto e imagen.
  - `Dípticos`: Dos fotografías contiguas (ej. lateral exterior + lateral interior, o frontal + cenital) vinculadas a un único bloque de texto explicativo conjunto.
- **Pies de Fotografía Limpios:** Las imágenes respiran solas sin textos de relleno. Únicamente se admite pie tipográfico breve en casos indispensables de diferenciación entre tomas contiguas (ej. dípticos: *«Lateral exterior»* / *«Lateral interior»*).
- **Titulación de Sección:**
  - **Supratítulo (mono versalitas tenue):** Parte del zapato examinada: `[ La pala y el escote ]`, `[ El fuste y el aplomo ]`, `[ El enfranque ]`.
  - **Título H2 (Newsreader serif):** Rasgo físico observable, descriptivo y directo: *«Escote asimétrico y caída lateral»*, *«Fuste vertical de 90 mm y apoyo dorsal»*.
- **Sin Alturas Forzadas:** El contenedor de texto respira libremente con espacio en blanco si el apunte concluye en pocas líneas.

### 2.3. Ampliación Fotográfica (Lightbox Minimalista)
- Al pulsar sobre cualquier fotografía técnica o de detalle, se despliega una vista ampliada limpia a pantalla completa sobre fondo neutro (`#FAF8F5` o blanco).
- Interfaz no invasiva: sin barras de herramientas pesadas ni iconos recargados. Cierre intuitivo mediante clic en cualquier zona exterior o pulsando la tecla `Esc`.

### 2.4. Delimitación de Cotas (Fuera de v1)
- Las primeras publicaciones se presentan con fotografía limpia, sin interruptor ni capa de cotas vectoriales. La arquitectura de cotas conmutables queda reservada para una versión posterior del sitio.

### 2.5. Glosario en Contexto (Popovers Flotantes)
- Los términos clave del calzado presentes en el texto llevan un subrayado de puntos sutil en color cuero `Cognac Leather` (`#9E6B55`).
- Al pasar el cursor (*hover*) o pulsar (*click / tap*), se despliega una tarjeta flotante adyacente sobre fondo `#FAF8F5` con filete `#E8E3DC`:
  - Encabezado: `Término en español (Término en inglés)` en mono versalitas.
  - Definición funcional concisa: 1–2 frases sobre su función constructiva o biomecánica.
  - Cierre inmediato al mover el cursor, hacer clic fuera o pulsar `Esc`, sin oscurecer la pantalla.

#### Diccionario Canónico de Términos Iniciales

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
- Módulos secundarios intercalados en el flujo de lectura (estilo apunte de taller) bajo el párrafo de referencia:
  - Estilo: fondo `Muted Linen Surface` (`#F3EFEA`), filete de 1px `#E8E3DC` y tipografía sans o mono de escala reducida.
  - Uso: particularidades históricas del diseño, notas breves o comparaciones directas.

### 2.7. Ficha «Datos del Par» (Cédula de Museo)
- Bloque editorial sobrio al cierre del análisis, redactado como cédula de museo con 5 campos obligatorios:
  1. *Silueta / Tipo:* Salón clásico (*pump*), merceditas (*mary jane*), bailarina...
  2. *Marca y Modelo:* Firma y modelo si se conocen (o raya `---` si no se conocen).
  3. *Material y Acabado:* Tipo de piel o tejido y acabado observable (ej. *Piel vacuna grabada con acabado brillante*).
  4. *Geometría del tacón:* Silueta, altura aproximada y caída (ej. *Aguja · 90 mm · Pecho recto*, o *Plano · 10 mm*).
  5. *Procedencia:* «Armario de [Nombre/Alias]», acompañado de su usuario de Instagram si fue autorizado.

### 2.8. Navegación Secuencial al Pie
- Al término de la monografía (tras la cédula técnica y antes del bloque de cierre):
  - Enlaces secuenciales discretos: `← [Título]` y `[Título] →`.
  - Permite navegar el catálogo ordenado de forma correlativa sin regresar forzosamente al índice. El módulo de sugeridos queda reservado para cuando la colección tenga mayor volumen.

### 2.9. Cierre de Colaboración Contextual
- En el remate de la monografía:
  - **Título:** fórmula fija `Comparte un par`
  - **Texto:** fórmula de reconocimiento hacia la colaboradora y llamada a proponer modelos con siluetas o detalles singulares.
  - **Botón de acción:** `Cómo colaborar →` (enlace a `../como-colaborar.html`).

### 2.10. Nomenclatura de URLs (Slugs)
- Formato descriptivo: `/entradas/[silueta]-[rasgo]-[material-o-detalle].html` (ej. `entradas/salon-aguja-piel-grabada.html`).
- Desempate por procedencia si existieran piezas idénticas: `/entradas/[silueta]-[rasgo]-[nombre].html`.

### 2.11. Metadatos y SEO Editorial
- `<title>`: `El Par — [Título de Observación] | [Familia]` (ej. *El Par — «Dos extremos, una silueta» | Salón clásico*).
- `<meta name="description">`: Resumen de 1–2 frases indicando identificación anatómica y procedencia.
- Metadatos OpenGraph y Twitter Cards (`summary_large_image`) con la imagen Hero en tres cuartos exterior.
