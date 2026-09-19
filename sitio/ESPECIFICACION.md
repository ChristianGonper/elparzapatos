# Especificación Global del Sitio: Marco General y Decisiones Transversales

Este documento define el marco de arquitectura general, las reglas transversales, las decisiones arquitectónicas globales y el índice de especificaciones vivas para la plataforma web de **El Par — Zapatos en detalle**.

Conecta los principios de identidad editorial de [marca](../marca/README.md) con el sistema visual de [DESIGN.md](DESIGN.md).

---

## 1. Arquitectura y Árbol de Vistas del Sitio

El sitio se estructura como una colección monográfica digital de ritmo pausado y lectura reposada, implementada mediante generación estática pura (SSG) en Astro.

### Vistas v1 (Activas en Producción)

```text
sitio/src/pages/
├── index.astro                  # Portada (/): Pieza destacada, colección adaptable y cierre colaborativo
├── sobre-el-par.astro           # Página institucional (/sobre-el-par): manifiesto y método fotográfico
├── como-colaborar.astro         # Página puente (/como-colaborar): acogida ética, embudo y contacto
├── guia-fotografica/
│   └── index.astro              # Guía técnica interactiva (/guia-fotografica/) y acceso a Tally
└── entradas/
    └── [slug].astro             # Monografías de calzado (/entradas/[slug]/) alimentadas por colecciones
```

- **Colección de datos:** Los estudios monográficos residen como documentos estructurados en `sitio/src/content/pares/` validados estrictamente mediante esquema Zod en `src/content.config.ts`.
- **Archivo histórico:** Los prototipos previos HTML/CSS se conservan inertes como respaldo en [sitio/archivo-prototipos/](archivo-prototipos/).

### Vistas Futuras (Registradas como Intenciones en TAREAS.md)
- `armarios`: Directorio de colaboradoras y armarios particulares.

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
- **Decisión:** Encuadre íntegro sin recortes ni reencuadres artificiales en marcos con fondo blanco neutro, preservando la silueta completa y el suelo con su sombra natural de apoyo. Si una fotografía presenta un margen irregular o encuadre deficiente, se corrige el recorte localmente en la imagen original antes de incorporarla; el CSS nunca debe compensar un encuadre deficiente.
- **Descarte definitivo:** Silueteado artificial en software de retoque o recorte por inteligencia artificial.
- **Consecuencias:** Exige disciplina de luz y fondo neutro en las fotos originales; asegura autenticidad estética y serenidad litográfica.

### 3.2. Navegación esencial activa vs. enlaces a secciones vacías (ADR-GLO-02)
- **Decisión:** Limitar la navegación pública en cabecera y pie a páginas terminadas y plenamente operativas.
- **Descarte definitivo:** Incluir accesos a secciones en construcción o enlaces a destinos que aún no están listos.
- **Consecuencias:** Garantiza un sitio sobrio, completamente navegable y sin promesas incumplidas.

### 3.3. Arquitectura de publicación estática con Astro y TypeScript (ADR-GLO-03)
- **Decisión:** Desarrollar el sitio en Astro con TypeScript, componentes compartidos y contenido versionado en Git. La edición se realiza siempre localmente; únicamente los cambios revisados y aprobados llegan al despliegue desde `main`.
- **Descarte definitivo:** CMS visual con panel de administración o aplicación completa SPA (React/Next) con renderizado cliente generalizado.
- **Consecuencias:** Generación puramente estática, mínima presencia de JavaScript (limitada a interacciones como ampliación de imagen o glosario) y código fácilmente versionable sin base de datos en servidor.

### 3.4. Despliegue en Cloudflare Pages y gestión de activos (ADR-GLO-04)
- **Decisión:** Desplegar en Cloudflare Pages conectado al repositorio privado `ChristianGonper/elparzapatos` (rama `main`). Inicialmente bajo subdominio temporal `*.pages.dev` y con conexión posterior de dominio propio. Drive conserva el material fotográfico original y privado.
- **Punto abierto técnico:** El funcionamiento concreto del protocolo de optimización y conversión a WebP queda abierto a la espera de clarificar su operativa definitiva.
- **Descarte definitivo:** Servir imágenes públicas directamente desde Drive o introducir un almacén de objetos independiente (Cloudflare R2) desde la fase inicial.
- **Consecuencias:** Despliegue unificado de código y activos públicos; los originales privados quedan fuera de Git.

### 3.5. Analítica esencial y privacidad (ADR-GLO-05)
- **Decisión:** Emplear Cloudflare Web Analytics para métricas agregadas esenciales (páginas vistas, procedencia y Core Web Vitals) sin requerir banners de cookies ni almacenar datos personales.
- **Descarte definitivo:** Google Analytics, herramientas de grabación de sesiones o perfilado conductual individual.
- **Consecuencias:** Información suficiente de tráfico y rendimiento con carga técnica mínima y respeto estricto a la privacidad.

### 3.6. Ritmo editorial compacto y cabecera en el flujo (ADR-GLO-06)
- **Decisión:** Ritmo editorial compacto evitando desplazamientos verticales innecesarios, con marcos fotográficos estrechos y contraste térmico discreto. La cabecera forma parte del flujo normal: aparece arriba y sale de la vista al desplazarse; el pie repite las rutas esenciales.
- **Descarte definitivo:** Densidad excesivamente aireada y cabecera fija/pegajosa (*sticky*) durante toda la lectura.
- **Consecuencias:** Mayor fluidez de lectura sin perder el carácter de pliego editorial.

### 3.7. Silencio visual y descartes transversales adicionales
- **Prohibición de numeración de catálogo visible:** Queda estrictamente prohibido superponer etiquetas de inventario (`par * 0001`, `Lámina 03`) sobre las imágenes o maquetas.
- **Sin capitulares sistemáticas:** Se descartan capitulares (*drop caps*) mecánicas por recargar la lectura y competir con la tipografía Newsreader serif.
- **Proporción nativa de cámara:** Fotografías capturadas y presentadas en ratios nativos (predominantemente 3:4 vertical y 4:3 horizontal). Los ratios de columna (`7:5`, `5:7`, `6:6`) regulan la retícula web.

### 3.8. Flujo de trabajo editorial
- Christian elabora el borrador del contenido en Markdown; el agente de código ensambla los componentes y la estructura en local; Christian revisa y valida visualmente en su navegador antes de consolidar y desplegar a `main`.

---

## 4. Índice de Especificaciones Vivas por Superficie

Cada superficie del sitio cuenta con su propia especificación viva, su plan de arquitectura y su archivo de tareas de trabajo:

| Superficie | Archivos que rige | Documentación gobernante |
| --- | --- | --- |
| **Plataforma Astro** | Arquitectura global bajo `sitio/` | [specs/migracion-astro/spec.md](specs/migracion-astro/spec.md) · [Plan](specs/migracion-astro/plan.md) · [Tareas](specs/migracion-astro/tasks.md) |
| **Portada** | [src/pages/index.astro](src/pages/index.astro) | [specs/portada/spec.md](specs/portada/spec.md) · [Plan](specs/portada/plan.md) · [Tareas](specs/portada/tasks.md) |
| **Monografía** | [src/pages/entradas/[slug].astro](src/pages/entradas/[slug].astro) y `src/content/pares/` | [specs/monografia/spec.md](specs/monografia/spec.md) · [Plan](specs/monografia/plan.md) · [Tareas](specs/monografia/tasks.md) |
| **Sobre El Par** | [src/pages/sobre-el-par.astro](src/pages/sobre-el-par.astro) | [specs/sobre-el-par/spec.md](specs/sobre-el-par/spec.md) · [Plan](specs/sobre-el-par/plan.md) · [Tareas](specs/sobre-el-par/tasks.md) |
| **Cómo colaborar** | [src/pages/como-colaborar.astro](src/pages/como-colaborar.astro) y `src/pages/guia-fotografica/` | [specs/como-colaborar/spec.md](specs/como-colaborar/spec.md) · [Plan](specs/como-colaborar/plan.md) · [Tareas](specs/como-colaborar/tasks.md) |
