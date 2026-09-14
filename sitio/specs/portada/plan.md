# Plan de Arquitectura: Portada

**Superficie:** [sitio/index.html](../../index.html)
**Estado:** Reposo (prototipo v1 maquetado y validado).

---

## 1. Enfoque Aplicado

- **Estructura estática HTML5 / CSS:** Maquetación responsiva con CSS Grid y Flexbox nativos, sin frameworks invasivos.
- **Jerarquía visual:** Split hero adaptativo en escritorio que colapsa limpiamente en móvil (`< 768px`) apilando la fotografía antes del titular.
- **Integración con DESIGN:** Implementación de tokens semánticos (fondos `paper`, `linen`, `specimen-white`, tipografía Newsreader e Inter/Plus Jakarta Sans).
- **Tratamiento fotográfico:** Contenedor de proporciones normalizadas con `object-contain` preservando sombra natural de suelo.

---

## 2. Validación Realizada

- Comprobada la adaptabilidad responsive en escritorio, tableta y móvil.
- Verificado el enlace hacia la monografía (`entradas/salon-aguja.html`) y hacia la página puente (`como-colaborar.html`).
- Verificada la ausencia de enlaces rotos y de elementos comerciales prohibidos (cabecera limpia).

---

## 3. Deuda Técnica y Pendientes Menores

- Parametrizar la conmutación automática de la cuadrícula cuando se añadan múltiples pares reales.
- Activar los filtros por tipología una vez ingresen pares de al menos dos familias diferentes.
