# Especificación Global del Sitio: Marco General y Decisiones Transversales

Este documento define el marco de arquitectura general, las reglas transversales, las decisiones arquitectónicas globales y el índice de especificaciones vivas para el sitio web de **El Par — Zapatos en detalle**.

Conecta los principios de identidad editorial de [marca](../marca/README.md) con el sistema visual de [DESIGN.md](DESIGN.md).

---

## 1. Arquitectura y Árbol de Vistas del Sitio

El sitio se estructura como una colección monográfica digital de ritmo pausado y lectura reposada.

### Vistas v1 (Activas en Producción)

```
sitio/
├── index.html                  # Portada: Pieza destacada, colección adaptable y cierre colaborativo
├── sobre-el-par.html           # Página institucional: manifiesto, mirada al calzado y cómo se construye
├── como-colaborar.html         # Página puente: acogida, dudas, guía fotográfica y acceso a Tally
└── entradas/
    └── [slug].html             # Monografías de calzado (ej. salon-aguja.html)
```

### Vistas Futuras (Registradas como Intenciones en TAREAS.md)
- `armarios.html`: Directorio de colaboradoras y armarios particulares.

---

## 2. Alcance Global del Sitio (v1)

### Dentro del Sistema v1
- Arquitectura de publicación estática en Astro con TypeScript y edición exclusivamente local (ADR-GLO-03).
- Despliegue estático automatizado en Cloudflare Pages desde la rama `main` (ADR-GLO-04).
- Tratamiento fotográfico canónico e íntegro sin silueteado en todas las superficies (ADR-GLO-01).
- Navegación pública esencial y operativa, sin enlaces a páginas o secciones en construcción (ADR-GLO-02).
- Analítica web agregada y respetuosa con la privacidad mediante Cloudflare Web Analytics (ADR-GLO-05).

### Fuera del Sistema v1 (Pospuesto a Fases Posteriores)
- Panel de administración o CMS en servidor (el contenido se versiona localmente en Git).
- Almacenamiento externo desacoplado (Cloudflare R2 se evaluará cuando el volumen de activos lo exija).
- Redes sociales activas o canales integrados con widgets dinámicos en la web.
- Sistemas de analítica conductual invasiva o herramientas de registro de sesiones.


---

## 3. Reglas Transversales y Decisiones Arquitectónicas Globales

Estas reglas y decisiones aplican a cualquier superficie, plantilla o componente del sitio:

### 3.1. Tratamiento fotográfico íntegro vs. silueteado artificial (ADR-GLO-01)
- **Decisión:** Encuadre íntegro sin recortes ni reencuadres artificiales en marcos con fondo blanco neutro, preservando la silueta completa y el suelo con su sombra natural de apoyo.
- **Descarte definitivo:** Silueteado artificial en software de retoque o recorte por inteligencia artificial.
- **Consecuencias:** Exige disciplina de luz y fondo neutro en las fotos originales; asegura autenticidad estética y serenidad litográfica.

### 3.2. Navegación esencial activa vs. enlaces a secciones vacías (ADR-GLO-02)
- **Decisión:** Limitar la navegación pública en cabecera y pie a páginas terminadas y plenamente operativas.
- **Descarte definitivo:** Incluir accesos a secciones en construcción o enlaces a destinos que aún no están listos.
- **Consecuencias:** Garantiza un sitio sobrio, completamente navegable y sin promesas incumplidas.

### 3.3. Arquitectura de publicación estática con Astro y TypeScript (ADR-GLO-03)
- **Decisión:** Migrar el sitio a Astro con TypeScript, componentes compartidos y contenido versionado en Git. La edición se realiza siempre localmente; únicamente los cambios revisados y aprobados llegan al despliegue desde `main`.
- **Descarte definitivo:** CMS visual con panel de administración o aplicación completa SPA (React/Next) con renderizado cliente generalizado.
- **Consecuencias:** Generación puramente estática, mínima presencia de JavaScript (limitada a interacciones como ampliación de imagen o glosario) y código fácilmente versionable sin base de datos en servidor.

### 3.4. Despliegue en Cloudflare Pages y pipeline de activos WebP (ADR-GLO-04)
- **Decisión:** Desplegar en Cloudflare Pages. Las fotografías aprobadas, saneadas y preparadas para publicación se versionan como WebP bajo `src/assets/`; el material privado y de trabajo permanece en Drive. Cloudflare R2 queda reservado para cuando el volumen justifique separar los activos del repositorio.
- **Descarte definitivo:** Servir imágenes públicas directamente desde Drive o introducir un almacén de objetos independiente desde la fase inicial.
- **Consecuencias:** Despliegue unificado de código y activos públicos; los originales privados quedan fuera de Git.

### 3.5. Analítica esencial y privacidad (ADR-GLO-05)
- **Decisión:** Emplear Cloudflare Web Analytics para métricas agregadas esenciales (páginas vistas, procedencia y Core Web Vitals) sin requerir banners de cookies ni almacenar datos personales.
- **Descarte definitivo:** Google Analytics, herramientas de grabación de sesiones o perfilado conductual individual.
- **Consecuencias:** Información suficiente de tráfico y rendimiento con carga técnica mínima y respeto estricto a la privacidad.

### 3.6. Ritmo editorial compacto y cabecera en el flujo (ADR-GLO-06)
- **Decisión:** Ritmo editorial más compacto evitando desplazamientos verticales innecesarios, con marcos fotográficos estrechos y contraste térmico discreto. La cabecera forma parte del flujo normal: aparece arriba y sale de la vista al desplazarse; el pie repite las rutas esenciales.
- **Descarte definitivo:** Densidad excesivamente aireada y cabecera fija/pegajosa (*sticky*) durante toda la lectura.
- **Consecuencias:** Mayor fluidez de lectura sin perder el carácter de pliego editorial.


### 3.7. Silencio visual y descartes transversales adicionales
- **Prohibición de numeración de catálogo visible:** Queda estrictamente prohibido superponer etiquetas de inventario (`par * 0001`, `Lámina 03`) sobre las imágenes o maquetas.
- **Sin capitulares sistemáticas:** Se descartan capitulares (*drop caps*) mecánicas por recargar la lectura y competir con la tipografía Newsreader serif.
- **Proporción nativa de cámara:** Fotografías capturadas y presentadas en ratios nativos (predominantemente 3:4 vertical y 4:3 horizontal). Los ratios de columna (`7:5`, `5:7`, `6:6`) regulan la retícula web.

---

## 4. Índice de Especificaciones Vivas por Superficie

Cada superficie del sitio cuenta con su propia especificación viva, su plan de arquitectura y su archivo de tareas de trabajo:

| Superficie | Archivos que rige | Documentación gobernante |
| --- | --- | --- |
| **Plataforma Astro** | Todo `sitio/` (migración integral) | [sitio/specs/migracion-astro/spec.md](specs/migracion-astro/spec.md) |
| **Portada** | [sitio/index.html](index.html) | [sitio/specs/portada/spec.md](specs/portada/spec.md) · [Plan](specs/portada/plan.md) · [Tareas](specs/portada/tasks.md) |
| **Monografía** | [sitio/entradas/*.html](entradas/) | [sitio/specs/monografia/spec.md](specs/monografia/spec.md) · [Plan](specs/monografia/plan.md) · [Tareas](specs/monografia/tasks.md) |
| **Sobre El Par** | [sitio/sobre-el-par.html](sobre-el-par.html) | [sitio/specs/sobre-el-par/spec.md](specs/sobre-el-par/spec.md) · [Plan](specs/sobre-el-par/plan.md) · [Tareas](specs/sobre-el-par/tasks.md) |
| **Cómo colaborar** | [sitio/como-colaborar.html](como-colaborar.html) | [sitio/specs/como-colaborar/spec.md](specs/como-colaborar/spec.md) · [Plan](specs/como-colaborar/plan.md) · [Tareas](specs/como-colaborar/tasks.md) |

