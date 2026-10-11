import type { Eje } from './opciones';

// Panel del laboratorio. Persiste entre páginas (transition:persist), así que se prepara una vez.
type Global = { clave: string; aplicar: () => void };
const global = () => (window as unknown as { elParLaboratorio: Global }).elParLaboratorio;

/** Avisa de un cambio de combinación para que el movimiento se vuelva a preparar. */
export const avisarCambio = () => document.dispatchEvent(new CustomEvent('lab:cambio'));

export const prepararPanel = (ejes: Eje[]) => {
  const panel = document.querySelector<HTMLElement>('#laboratorio');
  const abrir = document.querySelector<HTMLButtonElement>('.lab-toggle');
  if (!panel || !abrir || panel.dataset.listo) return;
  panel.dataset.listo = '1';
  const { clave } = global();
  const codigo = panel.querySelector<HTMLOutputElement>('.lab-code')!;
  const aviso = panel.querySelector<HTMLElement>('.lab-status')!;
  const medir = panel.querySelector<HTMLInputElement>('.lab-medir')!;
  const leer = (): Record<string, number> => {
    try {
      return JSON.parse(localStorage.getItem(clave) ?? '{}') ?? {};
    } catch {
      return {};
    }
  };
  const guardar = (estado: Record<string, number>) => {
    try {
      localStorage.setItem(clave, JSON.stringify(estado));
    } catch {
      // Sin almacenamiento, la combinación solo dura esta página.
    }
  };
  const texto = () => {
    const estado = leer();
    return ejes.map((eje) => `${eje.letra}${estado[eje.clave] ?? 1}`).join(' · ');
  };
  const pintar = () => {
    const estado = leer();
    for (const eje of ejes) {
      const grupo = panel.querySelector<HTMLElement>(`[data-eje="${eje.clave}"]`);
      const elegido = grupo?.querySelector<HTMLInputElement>(
        `input[value="${estado[eje.clave] ?? 1}"]`,
      );
      if (elegido) {
        elegido.checked = true;
        grupo!.querySelector('.lab-note')!.textContent = elegido.dataset.nota ?? '';
      }
    }
    medir.checked = document.documentElement.hasAttribute('data-lab-medir');
    codigo.textContent = texto();
  };
  const aplicar = () => {
    global().aplicar();
    pintar();
    avisarCambio();
  };
  pintar();
  panel.addEventListener('change', (event) => {
    const input = event.target as HTMLInputElement;
    if (input === medir) {
      try {
        localStorage.setItem(`${clave}-medir`, medir.checked ? '1' : '0');
      } catch {
        // Sin almacenamiento, el interruptor no se recuerda.
      }
      aplicar();
      aviso.textContent = medir.checked
        ? 'Pulsa una foto de un retrato para medir el punto.'
        : 'Las fotos vuelven a abrirse en el visor.';
      return;
    }
    if (input.type !== 'radio') return;
    guardar({ ...leer(), [input.name.replace('lab-', '')]: Number(input.value) });
    aplicar();
  });
  const mostrar = (abierto: boolean) => {
    panel.hidden = !abierto;
    abrir.hidden = abierto;
    abrir.setAttribute('aria-expanded', String(abierto));
    if (abierto) panel.querySelector<HTMLElement>('.lab-close')?.focus();
    else abrir.focus();
  };
  abrir.addEventListener('click', () => mostrar(true));
  panel.querySelector('.lab-close')?.addEventListener('click', () => mostrar(false));
  panel.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') mostrar(false);
  });
  panel.querySelector('.lab-reset')?.addEventListener('click', () => {
    guardar({});
    aplicar();
    aviso.textContent = 'Vuelves a la web actual.';
  });
  const copiar = async (valor: string, elemento: HTMLElement) => {
    try {
      await navigator.clipboard.writeText(valor);
      return true;
    } catch {
      const seleccion = window.getSelection();
      const rango = document.createRange();
      rango.selectNodeContents(elemento);
      seleccion?.removeAllRanges();
      seleccion?.addRange(rango);
      return false;
    }
  };
  panel.querySelector('.lab-copy')?.addEventListener('click', async () => {
    aviso.textContent = (await copiar(texto(), codigo))
      ? 'Código copiado.'
      : 'Código seleccionado: cópialo con el menú.';
  });
  // La herramienta de medir avisa aquí del punto que ha copiado.
  document.addEventListener('lab:medido', async (event) => {
    const valor = (event as CustomEvent<string>).detail;
    aviso.textContent = valor;
    aviso.textContent = (await copiar(valor, aviso))
      ? `Copiado: ${valor}`
      : `${valor} (selecciónalo y cópialo)`;
  });
  // El código y las opciones siguen a la dirección (?lab=) después de navegar.
  document.addEventListener('astro:page-load', pintar);
};
