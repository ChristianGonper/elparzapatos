# Plan de Arquitectura: Entrada Monográfica

**Superficie:** [sitio/entradas/*.html](../../entradas/)
**Estado:** Reposo (estructura de plantilla v1 validada en prototipo local).

---

## 1. Enfoque Aplicado

- **Plantilla HTML5 semántica:** Estructura modular articulada mediante `article`, `header`, `section` y `figure`.
- **Retícula fluida 12 columnas:** Distribución adaptable según módulo (7:5 para texto amplio + toma general, 5:7 para encuadres verticales dominantes, 6:6 simétrico y dípticos comparativos).
- **Inspección fotográfica (Lightbox):** Modal accesible y ligero mediante JavaScript nativo, centrado en la visualización limpia sobre fondo neutro/blanco con soporte de teclado (`Esc`) y clic exterior.
- **Micro-interacción de popovers:** Tarjetas adyacentes posicionadas contextualmente al interactuar con términos del diccionario técnico, activables tanto en cursor de escritorio como en pantalla táctil.
- **Cédula tipográfica continua:** Formato de 5 campos sin cajas rígidas de formulario, evocando catalogación de museo.

---

## 2. Validación Realizada

- Validado el prototipo local `entradas/salon-aguja.html` con las 6 tomas canónicas, títulos de observación, notas en papel tintado y cédula.
- Comprobado el funcionamiento no invasivo del lightbox y el renderizado fluido en dispositivos móviles.
- Verificada la resolución de términos del diccionario canónico inicial.

---

## 3. Deuda Técnica y Pendientes Menores

- Integrar el componente de lightbox y popover en un script modular reutilizable para evitar duplicación de código en cada nueva entrega maquetada.
- Verificar el comportamiento de la navegación secuencial (`← Anterior` / `Siguiente →`) cuando se publiquen las dos primeras piezas reales.
