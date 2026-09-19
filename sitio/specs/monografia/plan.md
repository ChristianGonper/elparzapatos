# Plan de Arquitectura: Entrada Monográfica

**Superficie:** [src/pages/entradas/[slug].astro](../../src/pages/entradas/[slug].astro) y `src/content/pares/`
**Estado:** Reposo (estructura de monografía v1 migrada a Astro y validada).

---

## 1. Enfoque Aplicado

- **Generación dinámica estática en Astro:** Rutas generadas mediante `getStaticPaths()` alimentadas por la colección tipada `pares` en `src/content/pares/`.
- **Retícula fluida 12 columnas:** Distribución adaptable según módulo (7:5 para texto amplio + toma general, 5:7 para encuadres verticales dominantes, 6:6 simétrico y dípticos comparativos).
- **Inspección fotográfica (Lightbox):** Modal accesible y ligero nativo con `<dialog>`, centrado en la visualización limpia sobre fondo neutro/blanco con soporte de teclado (`Esc`) y clic exterior.
- **Micro-interacción de popovers:** Tarjetas adyacentes posicionadas contextualmente al interactuar con términos del diccionario técnico, activables tanto en cursor de escritorio como en pantalla táctil.
- **Cédula tipográfica continua:** Formato de 5 campos (Variante 3A de museo) sin cajas rígidas de formulario.

---

## 2. Validación Realizada

- Validada la monografía inaugural `/entradas/salon-aguja/` con las 6 tomas canónicas, títulos de observación, notas y cédula.
- Comprobado el funcionamiento no invasivo del lightbox y el renderizado fluido en dispositivos móviles.
- Verificada la resolución de términos del diccionario canónico inicial.

---

## 3. Deuda Técnica y Pendientes Menores

- Integrar el componente de lightbox y popover en un script modular reutilizable para evitar duplicación de código en cada nueva entrega maquetada.
- Verificar el comportamiento de la navegación secuencial (`← Anterior` / `Siguiente →`) cuando se publiquen las dos primeras piezas reales.
