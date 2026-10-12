// Prepara cada página al cargarla y otra vez después de cada navegación sin recarga (las
// transiciones de Astro, `astro:page-load`). `init` se puede repetir: lo que ya está preparado
// se marca y no se vuelve a preparar.
export const enCadaPagina = (init: () => void) => {
  init();
  document.addEventListener('astro:page-load', init);
};

/** Devuelve true la primera vez que se prepara un elemento, y false las siguientes. */
export const primeraVez = (element: HTMLElement, clave = 'listo') => {
  if (element.dataset[clave]) return false;
  element.dataset[clave] = '1';
  return true;
};
