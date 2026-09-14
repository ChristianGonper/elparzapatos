# Cómo trabajar aquí

Responde en español.

Al empezar, lee [ESTADO.md](ESTADO.md). El trabajo abierto está en [TAREAS.md](TAREAS.md). Si el chat y un archivo chocan, gana el archivo. Si el criterio cambia, se actualiza el archivo en el mismo turno.

Enlaces locales siempre `[texto](ruta/al/archivo.md)`, nunca backticks aislados ni rutas en texto plano.

## Cuatro funciones documentales de gobierno

Todo criterio gobernante cumple estrictamente una de estas cuatro funciones. No existen quintas verdades: activos, manuales, skills, prototipos e índices declaran qué fuente los rige.

| Función | Qué es | Dónde reside |
| --- | --- | --- |
| **Constitución / Mapa** | Cómo se trabaja, jerarquía de fuentes y reglas de actualización | [AGENTS.md](AGENTS.md) |
| **Spec viva** | Qué es verdad hoy en una parte del sistema; qué archivos rige | `marca/01`–`04`; `sitio/specs/<parte>/spec.md`; índice en [sitio/ESPECIFICACION.md](sitio/ESPECIFICACION.md) |
| **Decisión (ADR)** | Por qué se eligió algo frente a alternativas reales y qué se descartó definitivamente | [sitio/DECISIONES.md](sitio/DECISIONES.md) |
| **Trabajo** | Intenciones conceptuales (futuro) y tareas de build | [TAREAS.md](TAREAS.md) (global) + `tasks.md` de cada spec |

[ESTADO.md](ESTADO.md) es un tablero ejecutivo de 10–12 líneas para situarse de un vistazo al arrancar la sesión.

## Mapa del repositorio

| Área | Qué contiene | Documentos de gobierno |
| --- | --- | --- |
| [marca/](marca/README.md) | Identidad, contenidos, colaboración y activos de captación | [01](marca/01-identidad-editorial.md) a [04](marca/04-flujo-de-colaboracion.md) y [activos/](marca/activos/) |
| [sitio/](sitio/README.md) | Especificaciones modulares por superficie, sistema visual y prototipos | [ESPECIFICACION.md](sitio/ESPECIFICACION.md), [DESIGN.md](sitio/DESIGN.md), [DECISIONES.md](sitio/DECISIONES.md) y `sitio/specs/` |
| [TAREAS.md](TAREAS.md) | Foco inmediato, catálogo de intenciones futuras y operativa diferida | — |
| [ESTADO.md](ESTADO.md) | Tablero sobrio del día (foco, bloqueos e hito reciente) | — |

## Jerarquía y reglas de prevalencia

1. **Prevalencia de Marca:** Rige la jerarquía canónica `marca → spec de superficie → implementación`. Cuando una spec web amplía un criterio de Marca, Marca prevalece. La spec de superficie puede concretarlo, pero no rebajarlo ni contradecirlo. Marca no requiere plan de software ni `tasks.md`.
2. **Sistema visual agnóstico:** [sitio/DESIGN.md](sitio/DESIGN.md) gobierna la atmósfera, tokens y patrones transversales. No contiene composiciones de pantallas específicas ni navegación, cuya lógica reside en cada spec de superficie. Si un nuevo componente funcional introduce además un patrón visual reutilizable, se actualizan la spec de superficie y DESIGN.
3. **Copy sin espejo:** El texto descriptivo literal vive exclusivamente en los archivos HTML. La spec viva guarda el contrato de copy (función, tono, fórmulas fijas, destino de enlaces y temas obligatorios). Excepción canónica compartida: los lemas, nombres de canales oficiales y el protocolo de retirada centralizados en Marca son la única fuente de verdad compartida y regulada, y prevalecen sobre el HTML.
4. **Ciclo de vida en software (`plan.md` y `tasks.md`):** Cada spec de superficie cuenta con archivos de trabajo permanentes:
   - *Durante un build activo:* `plan.md` detalla la arquitectura técnica y `tasks.md` desglosa las tareas secuenciadas (`Hecho cuando`).
   - *En reposo:* se simplifican a un cierre técnico sobrio (enfoque aplicado, validación realizada y deuda técnica pendiente).
   - *Cambios posteriores:* un cambio menor actualiza la spec viva directamente; un cambio amplio vuelve a desarrollar `plan.md` y `tasks.md`, simplificándose de nuevo al concluir sin acumular tickets obsoletos.
5. **Frontera de Trabajo y Decisiones:**
   - Deseo conceptual a futuro (sin spec aún) &rarr; [TAREAS.md](TAREAS.md) § Intenciones (plantilla Qué / Para qué / Por qué te interesa / Qué no es).
   - Elección de alcance o arquitectura adoptada para la versión actual &rarr; [sitio/DECISIONES.md](sitio/DECISIONES.md) §2 (ADR).
   - Alternativa técnica rechazada definitivamente tras evaluación &rarr; [sitio/DECISIONES.md](sitio/DECISIONES.md) §4 (Descartada).
   - Bloqueo que detiene el turno actual &rarr; [sitio/DECISIONES.md](sitio/DECISIONES.md) §3 (Abierto).
