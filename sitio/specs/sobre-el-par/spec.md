# Spec: Página Institucional y Explicativa «Sobre El Par»

**Superficie que rige:** [src/pages/sobre-el-par.astro](../../src/pages/sobre-el-par.astro) (ruta `/sobre-el-par`; prototipo previo archivado en [archivo-prototipos/sobre-el-par.html](../../archivo-prototipos/sobre-el-par.html))  
**Sistema visual:** [sitio/DESIGN.md](../../DESIGN.md)

---

## 1. Propósito y Función

Página institucional y explicativa de **El Par — Zapatos en detalle**. Unifica en una sola vista el manifiesto editorial de la publicación (la mirada al calzado como objeto de diseño por derecho propio y la distancia con el consumismo de temporada) y la explicación de cómo se construye la colección a partir de fotografías compartidas por la comunidad.

Sirve como carta de presentación ante visitantes nuevos, respuesta integral a dudas sobre el espíritu de la publicación y espacio de contacto para sugerencias de calzado.

---

## 2. Estructura y Conducta

### 2.1. Encabezado y Presentación
- **Kicker:** `SOBRE EL PAR` en JetBrains Mono mayúscula con espaciado amplio.
- **Titular:** *El calzado visto de cerca* en Newsreader serif.
- **Bajada:** Declaración condensada: publicación editorial independiente dedicada a fijarse en el diseño de los zapatos que tenemos en casa, sus formas y las piezas que construyen cada silueta.

### 2.2. Bloques Temáticos Secuenciados (Sin numeración ordinal)
1. **La mirada (El calzado en el centro):** Rótulo `LA MIRADA`. Explica la inversión de prioridades frente a la moda convencional: el zapato deja de ser un simple complemento de la ropa y se mira como una pieza de diseño con proporciones, equilibrios y decisiones de patronaje propias.
2. **Criterio (Lejos de la última tendencia):** Rótulo `CRITERIO`. Explica la selección por diseño, independientemente de marca, precio o antigüedad, sin seguir el calendario de tendencias ni excluir piezas por su procedencia. El foco son modelos con siluetas que destacan por sus formas, líneas y proporciones propias, independientemente de su firma o antigüedad.
3. **Formas y detalles (Punto de partida en tacones y bailarinas):** Rótulo `FORMAS Y DETALLES`. Explica el punto de partida en tacones y bailarinas por su variedad de formas y posibilidades de observación, sin comparaciones de superioridad con otras tipologías ni medidas arbitrarias. Deja explícita la apertura a incorporar otras siluetas en el futuro.
4. **El método (Fotografías cercanas y naturales):** Rótulo `EL MÉTODO`. Explica el origen comunitario de las imágenes. Fotografías tomadas con el móvil en su entorno cotidiano, con la cercanía de quien enseña sus zapatos a unas amigas. Sin imágenes de catálogo ni escenografías de estudio.
5. **Conversación y participación (Sugerencias y colaboración):** Rótulo `CONVERSACIÓN`. Espacio abierto para compartir recomendaciones o dudas, con buzón directo (correo institucional y canal reservado para redes), rematando con una invitación a enviar fotografías y comentarios del par, sin promesas de duración, hacia `/como-colaborar` ([src/pages/como-colaborar.astro](../../src/pages/como-colaborar.astro)).

### 2.3. Acompañamiento Visual
- **Módulo comparativo (Formas y detalles):** Inserción de un marco sobrio con fotografías de la colección en fondo neutro y proporción íntegra (reglas transversales de [sitio/ESPECIFICACION.md](../../ESPECIFICACION.md) §3), enseñando las líneas de un salón y una bailarina en formato WebP optimizado.
- **Muestra doméstica real (El método):** Composición editorial asimétrica con 3 fotografías tomadas con móvil en entorno cotidiano. Funcionan como ejemplo puro de naturalidad visual.

---

## 3. Canales y Enlaces

- **Correo oficial:** `elparzapatos@proton.me` (enlace directo `mailto:`).
- **Instagram oficial:** `@elparzapatos` (identidad de marca visible pero inerte sin enlace externo activo hasta su lanzamiento público).
- **Puente de colaboración:** Enlace directo a `/como-colaborar` ([src/pages/como-colaborar.astro](../../src/pages/como-colaborar.astro)).
- **Navegación general:** Retorno directo a la colección en `/#coleccion` ([src/pages/index.astro#coleccion](../../src/pages/index.astro)).

## Adaptación móvil

Por debajo de 768 px, la marca y la navegación ocupan filas separadas. Los enlaces permanecen visibles, permiten salto de línea entre destinos y ofrecen al menos 44 px de altura táctil. El pie distribuye sus enlaces en varias líneas según el espacio disponible, sin desplazamiento horizontal.

---

## 4. Decisiones y Alternativas Descartadas

- **ADR-SOB-01: Página unificada «Sobre El Par» vs. dos páginas independientes:**
  - *Contexto:* Comunicación institucional del manifiesto editorial, criterios formales de selección y explicación de cómo se construye la colección a partir de fotos domésticas.
  - *Decisión:* Unificar en una única página ([src/pages/sobre-el-par.astro](../../src/pages/sobre-el-par.astro)) la mirada al calzado y el método fotográfico de la comunidad, incorporándola como el tercer pilar visible en la navegación de cabecera y pie (`Colección`, `Sobre El Par` y `Cómo colaborar`).
  - *Descarte:* Mantener dos páginas separadas (`sobre-el-par.html` y `como-se-construye.html`), lo cual fragmentaba el relato y generaba páginas excesivamente breves en v1.
  - *Consecuencias:* Ofrece una explicación integral y serena de un solo vistazo, evitando duplicar introducciones de principios.

---

## 5. Alcance y Delimitación

### Dentro de v1
- Página única institucional que unifica el manifiesto editorial (la mirada al calzado y criterios formales de selección) con el método fotográfico de la comunidad.
- Integración en la navegación pública principal de cabecera y pie.
- Espacio de contacto para sugerencias y acceso directo hacia el flujo de colaboración.

### Fuera de v1 (Pospuesto a Versiones Posteriores)
- Ninguna funcionalidad adicional proyectada en esta superficie para v1.



