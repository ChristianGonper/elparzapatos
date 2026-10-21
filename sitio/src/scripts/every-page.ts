// Prepara cada página al cargarla y otra vez después de cada navegación sin recarga (las
// transiciones de Astro, `astro:page-load`). `init` se puede repetir: con `firstTime`, lo que ya
// está preparado se marca y no se vuelve a preparar.
export const onEveryPage = (init: () => void) => {
  init();
  document.addEventListener('astro:page-load', init);
};

/** Devuelve true la primera vez que se prepara un elemento, y false las siguientes. */
export const firstTime = (element: HTMLElement, key = 'ready') => {
  if (element.dataset[key]) return false;
  element.dataset[key] = '1';
  return true;
};
