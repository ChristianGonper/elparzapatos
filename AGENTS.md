# Cómo trabajar aquí

Responde en español.

Al empezar, lee [ESTADO.md](ESTADO.md). El trabajo abierto está en [TAREAS.md](TAREAS.md). Si el chat y un archivo chocan, gana el archivo. Si el criterio cambia, se actualiza el archivo en el mismo turno.

Enlaces locales siempre `[texto](ruta/al/archivo.md)`, nunca backticks aislados ni rutas en texto plano.

## Mapa del repositorio

| Área | Qué contiene | Documentos de gobierno |
| --- | --- | --- |
| [marca/](marca/README.md) | Identidad editorial, contenidos, canales y flujo de colaboración | [01](marca/01-identidad-editorial.md) a [04](marca/04-flujo-de-colaboracion.md) y [activos/](marca/activos/) |
| [sitio/](sitio/README.md) | Especificación global, sistema visual, especificaciones modulares y prototipos | [ESPECIFICACION.md](sitio/ESPECIFICACION.md), [DESIGN.md](sitio/DESIGN.md) y `sitio/specs/` |
| [TAREAS.md](TAREAS.md) | Agenda de trabajo del usuario e intenciones futuras | — |
| [ESTADO.md](ESTADO.md) | Tablero ejecutivo del día (foco, bloqueos e hito reciente) | — |

## Jerarquía y reglas de prevalencia

1. **Prevalencia de Marca:** Rige la jerarquía canónica `marca → especificación (global / de superficie) → código/HTML`. Cuando una spec web amplía un criterio de Marca, Marca prevalece. La spec de superficie puede concretarlo, pero no rebajarlo ni contradecirlo.
2. **Sistema visual agnóstico:** [sitio/DESIGN.md](sitio/DESIGN.md) gobierna la atmósfera, los tokens semánticos y los patrones visuales transversales. La estructura, maquetación y conducta particular de cada pantalla residen en su respectiva especificación de superficie.
3. **Copy sin espejo:** El texto descriptivo literal vive en los archivos de marcado (HTML/Astro). La especificación viva guarda el contrato de copy (función, tono, fórmulas fijas, destino de enlaces y temas obligatorios). Los elementos de identidad centralizados en Marca (como lemas o canales oficiales) prevalecen sobre el código.
4. **Frontera de Trabajo y Decisiones:**
   - Trabajo del usuario e intenciones futuras: [TAREAS.md](TAREAS.md).
   - Decisiones arquitectónicas y alternativas descartadas: en la especificación que las gobierna (globales en [sitio/ESPECIFICACION.md](sitio/ESPECIFICACION.md); locales en su respectiva especificación viva bajo `sitio/specs/`).

## Cursor Cloud specific instructions

El producto que hay que poder abrir es el prototipo HTML estático. No hay `package.json`, gestor de paquetes, lint, tests ni build: la migración a Astro sigue abierta en [TAREAS.md](TAREAS.md) y no forma parte del arranque.

En cada arranque el entorno sirve la raíz del repositorio en el puerto `8080` con el módulo estándar `http.server` de Python 3. La raíz tiene que ser el repositorio, y no [sitio/](sitio/README.md), para que los enlaces de [cómo colaborar](sitio/como-colaborar.html) hacia [marca/activos/](marca/activos/) resuelvan.

Comprobación manual, con el servidor ya en marcha:

- Portada: `http://127.0.0.1:8080/sitio/index.html`
- Institucional: `http://127.0.0.1:8080/sitio/sobre-el-par.html`
- Colaboración: `http://127.0.0.1:8080/sitio/como-colaborar.html`
- Monografía: `http://127.0.0.1:8080/sitio/entradas/salon-aguja.html` (el botón «Cotas anatómicas» y los términos del glosario son la interacción propia de la pieza)

Newsreader, Plus Jakarta Sans, JetBrains Mono y Tailwind llegan por CDN (`fonts.googleapis.com`, `fonts.gstatic.com`, `cdn.tailwindcss.com`). Sin salida a internet el HTML se sirve igual y los estilos no cargan. No hay secretos ni servicios externos propios.


