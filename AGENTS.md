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


