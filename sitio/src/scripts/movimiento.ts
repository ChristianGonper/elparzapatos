// Interacción y movimiento de la web (bloque 7). Se prepara al cargar y después de cada
// navegación sin recarga. Con «reducir movimiento», nada se anima: lo que aparece ya está.
import { enCadaPagina } from './cada-pagina';

const reducir = window.matchMedia('(prefers-reduced-motion: reduce)');

// Entrada al aparecer: fotos y tarjetas que aún están por debajo de la pantalla llegan con un
// fundido y una subida corta. Lo que ya se ve al cargar no se toca, para que nada parpadee.
const aparecen = [
  '.home-feature',
  '.look-card',
  '.pair-card',
  '.kind-card',
  '.wardrobe-card',
  '.home-wardrobe-card',
  '.home-wardrobe .wardrobe-pictures',
  '.example-grid figure',
  '.guide-card',
  '.article-hero',
  '.article-section',
  '.quote-block',
  '.at-a-glance',
  '.steps li',
  '.principle',
].join(', ');
let vigilante: IntersectionObserver | undefined;
const entrada = () => {
  vigilante?.disconnect();
  if (reducir.matches || !('IntersectionObserver' in window)) return;
  const limite = window.innerHeight * 0.92;
  const pendientes = [...document.querySelectorAll<HTMLElement>(aparecen)].filter(
    (element) =>
      !element.parentElement?.closest(aparecen) && element.getBoundingClientRect().top > limite,
  );
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        entrada.target.classList.add('is-visible');
        observador.unobserve(entrada.target);
      }
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
  );
  vigilante = observador;
  for (const element of pendientes) {
    element.classList.add('appears');
    observador.observe(element);
  }
};

// Marcas sobre la foto: se encienden mientras el ratón está en el texto del detalle o en la zona
// marcada, y se apagan al salir; un clic no las deja fijas. En el móvil, tocar el texto la
// enciende y se apaga al tocar en otro sitio o al seguir bajando.
type Marca = { seccion: HTMLElement; foto: HTMLElement };
let marcas: Marca[] = [];
let tocada: { marca: Marca; desde: number } | undefined;
const encender = (marca: Marca, encendida: boolean) =>
  marca.foto.classList.toggle('is-marked', encendida);
const enLaZona = (foto: HTMLElement, event: PointerEvent) => {
  const caja = foto.getBoundingClientRect();
  const estilo = getComputedStyle(foto);
  const x = caja.left + (parseFloat(estilo.getPropertyValue('--x')) / 100) * caja.width;
  const y = caja.top + (parseFloat(estilo.getPropertyValue('--y')) / 100) * caja.height;
  const radio = Math.max((parseFloat(estilo.getPropertyValue('--size')) / 200) * caja.width, 24);
  return Math.hypot(event.clientX - x, event.clientY - y) <= radio;
};
const prepararMarcas = () => {
  marcas = [];
  document.querySelectorAll<HTMLElement>('.article-section').forEach((seccion) => {
    const foto = seccion.querySelector<HTMLElement>('.detail-photo');
    const texto = seccion.querySelector<HTMLElement>('.article-text');
    if (!foto || !texto) return;
    const marca = { seccion, foto };
    marcas.push(marca);
    if (seccion.dataset.marca) return;
    seccion.dataset.marca = '1';
    let enTexto = false;
    let enZona = false;
    const actualizar = () => encender(marca, enTexto || enZona);
    texto.addEventListener('pointerenter', (event) => {
      if (event.pointerType !== 'mouse') return;
      enTexto = true;
      actualizar();
    });
    texto.addEventListener('pointerleave', (event) => {
      if (event.pointerType !== 'mouse') return;
      enTexto = false;
      actualizar();
    });
    foto.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse') return;
      enZona = enLaZona(foto, event);
      actualizar();
    });
    foto.addEventListener('pointerleave', () => {
      enZona = false;
      actualizar();
    });
    // Toque en el texto (no en una palabra del glosario ni en un enlace).
    texto.addEventListener('pointerup', (event) => {
      if (event.pointerType === 'mouse') return;
      if ((event.target as Element).closest('a, button, [popover]')) return;
      if (tocada) encender(tocada.marca, false);
      tocada = { marca, desde: window.scrollY };
      encender(marca, true);
    });
  });
};
document.addEventListener('pointerdown', (event) => {
  if (!tocada || event.pointerType === 'mouse') return;
  if (tocada.marca.seccion.querySelector('.article-text')?.contains(event.target as Node)) return;
  encender(tocada.marca, false);
  tocada = undefined;
});
window.addEventListener(
  'scroll',
  () => {
    if (tocada && Math.abs(window.scrollY - tocada.desde) > 60) {
      encender(tocada.marca, false);
      tocada = undefined;
    }
  },
  { passive: true },
);

// Lectura por detalles: una línea fina arriba, con un tramo por detalle, que se llena al leer.
let alDesplazar: (() => void) | undefined;
const lectura = () => {
  document.querySelector('.reading-bar')?.remove();
  if (alDesplazar) {
    window.removeEventListener('scroll', alDesplazar);
    window.removeEventListener('resize', alDesplazar);
    alDesplazar = undefined;
  }
  const tramos = [...document.querySelectorAll<HTMLElement>('.analysis-content .article-section')];
  if (tramos.length < 2) return;
  const barra = document.createElement('div');
  barra.className = 'reading-bar';
  barra.setAttribute('aria-hidden', 'true');
  const rellenos = tramos.map(() => {
    const tramo = document.createElement('span');
    const relleno = document.createElement('i');
    tramo.append(relleno);
    barra.append(tramo);
    return relleno;
  });
  document.body.append(barra);
  let pendiente = false;
  const medir = () => {
    pendiente = false;
    const linea = window.innerHeight * 0.6;
    tramos.forEach((tramo, indice) => {
      const caja = tramo.getBoundingClientRect();
      const avance = Math.min(Math.max((linea - caja.top) / Math.max(caja.height, 1), 0), 1);
      rellenos[indice].style.transform = `scaleX(${avance})`;
    });
  };
  alDesplazar = () => {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(medir);
  };
  window.addEventListener('scroll', alDesplazar, { passive: true });
  window.addEventListener('resize', alDesplazar);
  medir();
};

// Foto que crece: la foto de la tarjeta pulsada y la foto grande del retrato comparten nombre de
// transición, así que una se convierte en la otra (y al volver, al revés).
const nombre = 'foto-par';
const esRetrato = (ruta: string) => /^\/pares\/[^/]+\/$/.test(ruta);
window.addEventListener(
  'click',
  (event) => {
    // Un nombre de transición no puede repetirse: antes de dárselo a la foto pulsada se quita de
    // cualquier otra (también de la que lo recibió al volver a esta página).
    document.querySelectorAll<HTMLElement>('[data-crece]').forEach((foto) => {
      foto.style.viewTransitionName = '';
      delete foto.dataset.crece;
    });
    const enlace = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
    const foto = enlace?.querySelector<HTMLElement>('img');
    if (!enlace || !foto || !esRetrato(new URL(enlace.href).pathname)) return;
    // En un retrato, su foto grande cede el nombre a la tarjeta pulsada («Más retratos»).
    const grande = document.querySelector<HTMLElement>('.article-hero img');
    if (grande && grande !== foto) {
      grande.style.viewTransitionName = 'none';
      grande.dataset.crece = '1';
    }
    foto.style.viewTransitionName = nombre;
    foto.dataset.crece = '1';
  },
  true,
);
document.addEventListener('astro:before-swap', (event) => {
  if (event.newDocument.querySelector('.article-hero')) return;
  const tarjeta = event.newDocument.querySelector<HTMLElement>(
    `a[href="${event.from.pathname}"] img`,
  );
  if (!tarjeta) return;
  tarjeta.style.viewTransitionName = nombre;
  tarjeta.dataset.crece = '1';
});

let ultima: HTMLElement | undefined;
enCadaPagina(() => {
  // Astro avisa también de la carga inicial: solo se prepara una vez por página.
  if (ultima === document.body) return;
  ultima = document.body;
  tocada = undefined;
  entrada();
  prepararMarcas();
  lectura();
});
