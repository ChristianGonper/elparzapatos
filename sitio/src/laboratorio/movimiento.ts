// Movimiento del laboratorio: lo que necesita JavaScript (aparición al llegar a la pantalla,
// puntos sobre la foto, sitio de la frase, barra de lectura, foto que crece al navegar y medir
// puntos). Se prepara al cargar, tras cada navegación sin recarga y al cambiar el panel.
const raiz = document.documentElement;
const valor = (clave: string) => Number(raiz.getAttribute(`data-lab-${clave}`) ?? 1);
const reducir = window.matchMedia('(prefers-reduced-motion: reduce)');

// E · Entrada al aparecer. Solo lo que aún está por debajo de la pantalla; lo que ya se ve no se
// toca, para que nada parpadee al cargar. Sin IntersectionObserver o con «reducir movimiento»,
// todo queda como siempre.
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
let observador: IntersectionObserver | undefined;
const entrada = () => {
  // Ya preparada en esta página con esta variante: nada que hacer (Astro avisa de la carga inicial
  // después de que este archivo ya la haya preparado).
  const variante = valor('e');
  if (document.body.dataset.labEntrada === String(variante)) return;
  document.body.dataset.labEntrada = String(variante);
  observador?.disconnect();
  document
    .querySelectorAll('.lab-aparece')
    .forEach((element) => element.classList.remove('lab-aparece', 'lab-visto'));
  if (variante < 2 || reducir.matches || !('IntersectionObserver' in window)) return;
  const limite = window.innerHeight * 0.92;
  const pendientes = [...document.querySelectorAll<HTMLElement>(aparecen)].filter(
    (element) =>
      !element.parentElement?.closest(aparecen) && element.getBoundingClientRect().top > limite,
  );
  const vigilante = new IntersectionObserver(
    (entradas) => {
      entradas
        .filter((entrada) => entrada.isIntersecting)
        .sort(
          (a, b) =>
            a.boundingClientRect.top - b.boundingClientRect.top ||
            a.boundingClientRect.left - b.boundingClientRect.left,
        )
        .forEach((entrada, orden) => {
          const element = entrada.target as HTMLElement;
          // Escalonada: en una misma fila, cada tarjeta llega 90 ms después de la anterior.
          element.style.setProperty(
            '--lab-retraso',
            variante === 4 ? `${Math.min(orden, 5) * 90}ms` : '0ms',
          );
          element.classList.add('lab-visto');
          vigilante.unobserve(element);
        });
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
  );
  observador = vigilante;
  for (const element of pendientes) {
    element.classList.add('lab-aparece');
    vigilante.observe(element);
  }
};

// D · Detalles en la foto. El punto de cada detalle se enciende al pasar el ratón por su texto o
// por el propio punto, al llegar con el teclado y, en el móvil, al tocar el texto.
const lupa = (foto: HTMLElement) => {
  const lente = foto.querySelector<HTMLElement>('.detail-lens');
  const enlace = foto.querySelector<HTMLAnchorElement>('a.photo-zoom');
  if (!lente || !enlace) return;
  const caja = foto.getBoundingClientRect();
  const estilo = getComputedStyle(foto);
  const x = parseFloat(estilo.getPropertyValue('--x')) / 100;
  const y = parseFloat(estilo.getPropertyValue('--y')) / 100;
  const diametro = Math.round(Math.min(caja.width * 0.42, 260));
  const aumento = 2.4;
  const izquierda = Math.min(Math.max(x * caja.width - diametro / 2, 0), caja.width - diametro);
  const arriba = Math.min(Math.max(y * caja.height - diametro / 2, 0), caja.height - diametro);
  Object.assign(lente.style, {
    width: `${diametro}px`,
    height: `${diametro}px`,
    left: `${izquierda}px`,
    top: `${arriba}px`,
    backgroundImage: `url("${enlace.href}")`,
    backgroundSize: `${caja.width * aumento}px ${caja.height * aumento}px`,
    backgroundPosition: `${diametro / 2 - x * caja.width * aumento}px ${diametro / 2 - y * caja.height * aumento}px`,
  });
};
const detalles = () => {
  document.querySelectorAll<HTMLElement>('.article-section').forEach((seccion) => {
    const foto = seccion.querySelector<HTMLElement>('.detail-photo');
    const texto = seccion.querySelector<HTMLElement>('.article-text');
    const punto = seccion.querySelector<HTMLButtonElement>('.detail-point');
    if (!foto || !texto || !punto || seccion.dataset.labPunto) return;
    seccion.dataset.labPunto = '1';
    let fijo = false;
    const encender = (encendido: boolean) => {
      if (encendido && valor('d') === 4) lupa(foto);
      foto.classList.toggle('lab-activo', encendido);
      seccion.classList.toggle('lab-activo', encendido);
    };
    for (const zona of [texto, punto]) {
      zona.addEventListener('pointerenter', (event) => {
        if (event.pointerType === 'mouse') encender(true);
      });
      zona.addEventListener('pointerleave', (event) => {
        if (event.pointerType === 'mouse' && !fijo) encender(false);
      });
    }
    punto.addEventListener('focus', () => encender(true));
    punto.addEventListener('blur', () => !fijo && encender(false));
    punto.addEventListener('click', () => {
      fijo = !fijo;
      encender(fijo);
    });
    // En el móvil no hay ratón: tocar el texto enciende o apaga su punto.
    texto.addEventListener('click', (event) => {
      if ((event as PointerEvent).pointerType === 'mouse') return;
      if ((event.target as Element).closest('a, button, [popover]')) return;
      fijo = !fijo;
      encender(fijo);
    });
  });
};

// F · Frase de la colaboradora. Se mueve el bloque entero y se recuerda su sitio original.
const origenes = new WeakMap<HTMLElement, Comment>();
const frase = () => {
  const bloque = document.querySelector<HTMLElement>('.analysis-content .quote-block')
    ?.parentElement as HTMLElement | null;
  if (!bloque) return;
  if (!origenes.has(bloque)) {
    const marca = document.createComment('sitio de la frase');
    bloque.before(marca);
    origenes.set(bloque, marca);
  }
  const variante = valor('f');
  bloque.classList.toggle('lab-frase-lateral', variante === 3);
  const primerTexto = document.querySelector('.analysis-content .article-section .article-text');
  if (variante === 2) document.querySelector('.analysis-content')?.prepend(bloque);
  else if (variante === 3 && primerTexto) primerTexto.append(bloque);
  else origenes.get(bloque)!.after(bloque);
};

// L · Barra de lectura: una línea, o un tramo por detalle, que se llena al avanzar.
let barra: HTMLElement | undefined;
let alDesplazar: (() => void) | undefined;
const lectura = () => {
  barra?.remove();
  barra = undefined;
  if (alDesplazar) {
    window.removeEventListener('scroll', alDesplazar);
    window.removeEventListener('resize', alDesplazar);
  }
  const variante = valor('l');
  const contenido = document.querySelector<HTMLElement>('.analysis-content');
  if (variante < 2 || !contenido) return;
  const tramos =
    variante === 3 ? [...contenido.querySelectorAll<HTMLElement>('.article-section')] : [contenido];
  if (!tramos.length) return;
  const nueva = document.createElement('div');
  nueva.className = 'lab-barra';
  nueva.setAttribute('aria-hidden', 'true');
  const rellenos = tramos.map(() => {
    const tramo = document.createElement('span');
    tramo.append(document.createElement('i'));
    nueva.append(tramo);
    return tramo.firstElementChild as HTMLElement;
  });
  document.body.append(nueva);
  barra = nueva;
  let pendiente = false;
  const medir = () => {
    pendiente = false;
    const lectura = window.innerHeight * 0.6;
    tramos.forEach((tramo, indice) => {
      const caja = tramo.getBoundingClientRect();
      const avance = Math.min(Math.max((lectura - caja.top) / Math.max(caja.height, 1), 0), 1);
      rellenos[indice].style.transform = `scaleX(${avance})`;
    });
  };
  alDesplazar = () => {
    if (!pendiente) {
      pendiente = true;
      requestAnimationFrame(medir);
    }
  };
  window.addEventListener('scroll', alDesplazar, { passive: true });
  window.addEventListener('resize', alDesplazar);
  medir();
};

// V · Visor: con zoom, PhotoSwipe anima desde la miniatura; «cropped» le dice que la recorte bien.
const visor = () => {
  document.querySelectorAll<HTMLElement>('a.photo-zoom').forEach((enlace) => {
    if (valor('v') > 1) enlace.dataset.cropped = 'true';
    else delete enlace.dataset.cropped;
  });
};

// N3 · Foto que crece: la foto pulsada y la foto grande del retrato comparten nombre de transición.
const nombre = 'foto-par';
const esRetrato = (ruta: string) => /^\/pares\/[^/]+\/$/.test(ruta);
const navegacion = () => {
  window.addEventListener(
    'click',
    (event) => {
      document.querySelectorAll<HTMLElement>('[data-lab-crece]').forEach((foto) => {
        foto.style.viewTransitionName = '';
        delete foto.dataset.labCrece;
      });
      if (valor('n') !== 3) return;
      const enlace = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
      const foto = enlace?.querySelector<HTMLElement>('img');
      if (!enlace || !foto || !esRetrato(new URL(enlace.href).pathname)) return;
      // En un retrato, su foto grande cede el nombre a la tarjeta pulsada («Más retratos»).
      const grande = document.querySelector<HTMLElement>('.article-hero img');
      if (grande && grande !== foto) {
        grande.style.viewTransitionName = 'none';
        grande.dataset.labCrece = '1';
      }
      foto.style.viewTransitionName = nombre;
      foto.dataset.labCrece = '1';
    },
    true,
  );
  // Al volver de un retrato, la tarjeta que lleva a él recibe la foto.
  document.addEventListener('astro:before-swap', (event) => {
    if (valor('n') !== 3 || event.newDocument.querySelector('.article-hero')) return;
    const tarjeta = event.newDocument.querySelector<HTMLElement>(
      `a[href="${event.from.pathname}"] img`,
    );
    if (tarjeta) tarjeta.style.viewTransitionName = nombre;
  });
};

// Medir puntos: con el interruptor del panel, pulsar una foto de un retrato enseña y copia su x/y.
const medir = () => {
  window.addEventListener(
    'click',
    (event) => {
      if (!raiz.hasAttribute('data-lab-medir') || event.detail === 0) return;
      const enlace = (event.target as Element).closest<HTMLElement>(
        '.analysis-content a.photo-zoom',
      );
      const foto = enlace?.querySelector('img');
      if (!enlace || !foto) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      const caja = foto.getBoundingClientRect();
      const x = Math.round(((event.clientX - caja.left) / caja.width) * 100);
      const y = Math.round(((event.clientY - caja.top) / caja.height) * 100);
      const texto = `x={${x}} y={${y}}`;
      enlace.querySelector('.lab-medida')?.remove();
      const marca = document.createElement('span');
      marca.className = 'lab-medida';
      marca.style.left = `${x}%`;
      marca.style.top = `${y}%`;
      marca.append(Object.assign(document.createElement('span'), { textContent: texto }));
      enlace.append(marca);
      document.dispatchEvent(new CustomEvent('lab:medido', { detail: texto }));
    },
    true,
  );
};

export const prepararMovimiento = () => {
  const preparar = () => {
    entrada();
    detalles();
    frase();
    lectura();
    visor();
  };
  preparar();
  document.addEventListener('astro:page-load', preparar);
  document.addEventListener('lab:cambio', preparar);
  navegacion();
  medir();
};
