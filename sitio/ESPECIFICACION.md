# Especificación Web: Marco General e Índice de Superficies

Este documento define el marco de arquitectura general, las reglas transversales y el índice de especificaciones vivas para el sitio web de **El Par — Zapatos en detalle**.

Une los principios de identidad editorial de [marca](../marca/README.md) con el sistema visual de [sitio](DESIGN.md).

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

## 2. Alcance v1 y Delimitación de Versión

### Dentro de v1
- Portada adaptable al volumen de la colección (foco en pieza destacada inaugural).
- Monografías completas con mínimo 6 fotografías reales por modelo.
- Inspección fotográfica a pantalla completa.
- Glosario contextual con popovers y diccionario canónico de términos iniciales.
- Ficha continua «Datos del par».
- Navegación secuencial al pie entre entregas publicadas.
- Página institucional «Sobre El Par» con manifiesto editorial, criterios de selección y método de la colección.
- Página puente «Cómo colaborar» con resolución de dudas y embudo guiado.
- Formulario de recepción provisional mediante enlace externo a Tally.

### Fuera de v1 (Pospuesto a Versiones Posteriores)
- Sistema de capas con cotas o anotaciones vectoriales sobre la foto (la v1 publica fotografía limpia).
- Módulo de piezas recomendadas o sugeridas al pie (requiere catálogo con volumen).
- Directorio y vistas individuales por armario particular.
- Formulario de subida propio integrado en la web.
- Fichas ampliadas dedicadas para cada término del glosario.
- Canal público de Instagram.

---

## 3. Reglas Transversales del Sitio

Estas reglas aplican a cualquier superficie, plantilla o componente maquetado:

1. **Tratamiento fotográfico íntegro:** Las imágenes se exhiben íntegras sin recortes ni reencuadres artificiales en marcos con fondo blanco neutro. Se preserva siempre la silueta completa y el suelo con su sombra natural de apoyo.
2. **Prohibición de silueteado artificial:** Queda estrictamente prohibido recortar los fondos, recortar sombras o aplicar silueteados automáticos mediante software de retoque o inteligencia artificial.
3. **Silencio visual:** Prohibida la superposición de insignias, etiquetas numéricas visibles de inventario (`par * 0001`, `Lámina 03`) o llamadas comerciales flotantes sobre las fotografías.
4. **Respeto a la proporción nativa:** Las fotografías se capturan y presentan en ratios nativos de cámara (predominantemente 3:4 vertical y 4:3 horizontal). Los ratios de columna (`7:5`, `5:7`, `6:6`) regulan la distribución de la retícula web.

---

## 4. Índice de Especificaciones Vivas por Superficie

Cada superficie del sitio cuenta con su propia especificación viva, su plan de arquitectura y su archivo de tareas de trabajo:

| Superficie | Archivos que rige | Documentación gobernante |
| --- | --- | --- |
| **Portada** | [sitio/index.html](index.html) | [sitio/specs/portada/spec.md](specs/portada/spec.md) · [Plan](specs/portada/plan.md) · [Tareas](specs/portada/tasks.md) |
| **Monografía** | [sitio/entradas/*.html](entradas/) | [sitio/specs/monografia/spec.md](specs/monografia/spec.md) · [Plan](specs/monografia/plan.md) · [Tareas](specs/monografia/tasks.md) |
| **Sobre El Par** | [sitio/sobre-el-par.html](sobre-el-par.html) | [sitio/specs/sobre-el-par/spec.md](specs/sobre-el-par/spec.md) · [Plan](specs/sobre-el-par/plan.md) · [Tareas](specs/sobre-el-par/tasks.md) |
| **Cómo colaborar** | [sitio/como-colaborar.html](como-colaborar.html) | [sitio/specs/como-colaborar/spec.md](specs/como-colaborar/spec.md) · [Plan](specs/como-colaborar/plan.md) · [Tareas](specs/como-colaborar/tasks.md) |

---

## 5. Dinámica de Trabajo con las Especificaciones

1. **La spec viva gobierna la superficie:** Cada parte grande del sitio (`portada`, `monografia`, `como-colaborar`) cuenta con su archivo `spec.md`, que define estructura, conducta, fórmulas nombradas y contrato funcional.
2. **Copy sin duplicar:** La spec viva no almacena el texto descriptivo público literal ni las respuestas redactadas, cuyo hogar exclusivo es el archivo HTML correspondiente. La spec fija el contrato: función del bloque, tono, fórmulas canónicas y cobertura obligatoria de temas.
3. **Archivos de trabajo permanentes (`plan.md` y `tasks.md`):**
   - *Durante build activo:* `plan.md` desglosa el enfoque técnico y `tasks.md` contiene la lista secuenciada de tareas con criterio observable (`Hecho cuando`).
   - *En reposo:* se simplifican a un cierre técnico sobrio (enfoque aplicado, validación realizada y deuda técnica pendiente).
   - *Cambios posteriores:* un cambio menor actualiza directamente `spec.md`; un cambio amplio o refactor vuelve a desarrollar `plan.md` y `tasks.md` en esa misma carpeta, simplificándose de nuevo al concluir sin acumular tickets obsoletos.
4. **Prevalencia canónica:** Rige `marca → spec de superficie → implementación`. Cuando una spec web amplía un criterio de Marca, Marca prevalece y la spec no puede rebajarlo ni contradecirlo.

