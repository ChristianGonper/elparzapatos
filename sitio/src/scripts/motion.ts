// Interacción y movimiento de la web. Se prepara al cargar y después de cada navegación sin
// recarga. Con «reducir movimiento», nada se anima: lo que aparece ya está.
import { firstTime, onEveryPage } from './every-page';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Entrada al aparecer: fotos y tarjetas que aún están por debajo de la pantalla llegan con un
// fundido y una subida corta. Lo que ya se ve al cargar no se toca, para que nada parpadee.
const appearing = [
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
let observer: IntersectionObserver | undefined;
const reveal = () => {
  observer?.disconnect();
  if (reduceMotion.matches || !('IntersectionObserver' in window)) return;
  const fold = window.innerHeight * 0.92;
  const below = [...document.querySelectorAll<HTMLElement>(appearing)].filter(
    (element) =>
      !element.parentElement?.closest(appearing) && element.getBoundingClientRect().top > fold,
  );
  const nextObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        nextObserver.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
  );
  observer = nextObserver;
  for (const element of below) {
    element.classList.add('appears');
    nextObserver.observe(element);
  }
};

// Marcas sobre la foto: se encienden mientras el ratón está en el texto del detalle o en la zona
// marcada, y se apagan al salir; un clic no las deja fijas. En el móvil, tocar el texto la
// enciende y se apaga al tocar en otro sitio o al seguir bajando.
type Mark = { section: HTMLElement; photo: HTMLElement };
let marks: Mark[] = [];
let touched: { mark: Mark; scrollY: number } | undefined;
const light = (mark: Mark, on: boolean) => mark.photo.classList.toggle('is-marked', on);
const inZone = (photo: HTMLElement, event: PointerEvent) => {
  const box = photo.getBoundingClientRect();
  const style = getComputedStyle(photo);
  const x = box.left + (parseFloat(style.getPropertyValue('--x')) / 100) * box.width;
  const y = box.top + (parseFloat(style.getPropertyValue('--y')) / 100) * box.height;
  const radius = Math.max((parseFloat(style.getPropertyValue('--size')) / 200) * box.width, 24);
  return Math.hypot(event.clientX - x, event.clientY - y) <= radius;
};
const setUpMarks = () => {
  marks = [];
  document.querySelectorAll<HTMLElement>('.article-section').forEach((section) => {
    const photo = section.querySelector<HTMLElement>('.detail-photo');
    const text = section.querySelector<HTMLElement>('.article-text');
    if (!photo || !text) return;
    const mark = { section, photo };
    marks.push(mark);
    if (!firstTime(section, 'marksReady')) return;
    let onText = false;
    let onZone = false;
    const update = () => light(mark, onText || onZone);
    text.addEventListener('pointerenter', (event) => {
      if (event.pointerType !== 'mouse') return;
      onText = true;
      update();
    });
    text.addEventListener('pointerleave', (event) => {
      if (event.pointerType !== 'mouse') return;
      onText = false;
      update();
    });
    photo.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse') return;
      onZone = inZone(photo, event);
      update();
    });
    photo.addEventListener('pointerleave', () => {
      onZone = false;
      update();
    });
    // Toque en el texto (no en una palabra del glosario ni en un enlace).
    text.addEventListener('pointerup', (event) => {
      if (event.pointerType === 'mouse') return;
      if ((event.target as Element).closest('a, button, [popover]')) return;
      if (touched) light(touched.mark, false);
      touched = { mark, scrollY: window.scrollY };
      light(mark, true);
    });
  });
};
document.addEventListener('pointerdown', (event) => {
  if (!touched || event.pointerType === 'mouse') return;
  if (touched.mark.section.querySelector('.article-text')?.contains(event.target as Node)) return;
  light(touched.mark, false);
  touched = undefined;
});
window.addEventListener(
  'scroll',
  () => {
    if (touched && Math.abs(window.scrollY - touched.scrollY) > 60) {
      light(touched.mark, false);
      touched = undefined;
    }
  },
  { passive: true },
);

// Lectura por detalles: una línea fina arriba, con un tramo por detalle, que se llena al leer.
let onScroll: (() => void) | undefined;
const readingBar = () => {
  document.querySelector('.reading-bar')?.remove();
  if (onScroll) {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    onScroll = undefined;
  }
  const sections = [
    ...document.querySelectorAll<HTMLElement>('.analysis-content .article-section'),
  ];
  if (sections.length < 2) return;
  const bar = document.createElement('div');
  bar.className = 'reading-bar';
  bar.setAttribute('aria-hidden', 'true');
  const fills = sections.map(() => {
    const segment = document.createElement('span');
    const fill = document.createElement('i');
    segment.append(fill);
    bar.append(segment);
    return fill;
  });
  document.body.append(bar);
  let pending = false;
  const measure = () => {
    pending = false;
    const line = window.innerHeight * 0.6;
    sections.forEach((section, index) => {
      const box = section.getBoundingClientRect();
      const progress = Math.min(Math.max((line - box.top) / Math.max(box.height, 1), 0), 1);
      fills[index].style.transform = `scaleX(${progress})`;
    });
  };
  onScroll = () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(measure);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  measure();
};

// Foto que crece: la foto de la tarjeta pulsada y la foto grande del retrato comparten nombre de
// transición, así que una se convierte en la otra (y al volver, al revés).
const transitionName = 'pair-photo';
const isPortrait = (path: string) => /^\/pares\/[^/]+\/$/.test(path);
window.addEventListener(
  'click',
  (event) => {
    // Un nombre de transición no puede repetirse: antes de dárselo a la foto pulsada se quita de
    // cualquier otra (también de la que lo recibió al volver a esta página).
    document.querySelectorAll<HTMLElement>('[data-grows]').forEach((photo) => {
      photo.style.viewTransitionName = '';
      delete photo.dataset.grows;
    });
    const link = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
    const photo = link?.querySelector<HTMLElement>('img');
    if (!link || !photo || !isPortrait(new URL(link.href).pathname)) return;
    // En un retrato, su foto grande cede el nombre a la tarjeta pulsada («Más retratos»).
    const hero = document.querySelector<HTMLElement>('.article-hero img');
    if (hero && hero !== photo) {
      hero.style.viewTransitionName = 'none';
      hero.dataset.grows = '1';
    }
    photo.style.viewTransitionName = transitionName;
    photo.dataset.grows = '1';
  },
  true,
);
document.addEventListener('astro:before-swap', (event) => {
  if (event.newDocument.querySelector('.article-hero')) return;
  const card = event.newDocument.querySelector<HTMLElement>(`a[href="${event.from.pathname}"] img`);
  if (!card) return;
  card.style.viewTransitionName = transitionName;
  card.dataset.grows = '1';
});

let lastBody: HTMLElement | undefined;
onEveryPage(() => {
  // Astro avisa también de la carga inicial: solo se prepara una vez por página.
  if (lastBody === document.body) return;
  lastBody = document.body;
  touched = undefined;
  reveal();
  setUpMarks();
  readingBar();
});
