// Direcciones visuales de El Par (solo en la vista de revisión). Se carga en <head>, antes de
// pintar, y pone en <html> la dirección guardada (data-dir) para que no parpadee.
// Con ?dir=revista en la dirección se aplica y se guarda; con ?dir=actual se vuelve a la web actual.
(function () {
  if (window.elParDirecciones) return;
  var clave = 'elpar-direccion';
  var validas = ['revista', 'archivo', 'galeria', 'cuaderno'];
  var actual = '';
  try {
    actual = localStorage.getItem(clave) || '';
  } catch (error) {
    actual = '';
  }
  var pedida = new URLSearchParams(location.search).get('dir');
  if (pedida !== null) {
    actual = pedida;
    try {
      if (validas.indexOf(pedida) >= 0) localStorage.setItem(clave, pedida);
      else localStorage.removeItem(clave);
    } catch (error) {
      // Sin almacenamiento, la dirección solo dura esta página.
    }
  }
  var poner = function (raiz, valor) {
    if (validas.indexOf(valor) >= 0) raiz.setAttribute('data-dir', valor);
    else raiz.removeAttribute('data-dir');
  };
  window.elParDirecciones = {
    clave: clave,
    leer: function () {
      return document.documentElement.getAttribute('data-dir') || 'actual';
    },
    poner: function (valor) {
      actual = valor;
      try {
        if (validas.indexOf(valor) >= 0) localStorage.setItem(clave, valor);
        else localStorage.removeItem(clave);
      } catch (error) {
        // Sin almacenamiento, la dirección solo dura esta página.
      }
      poner(document.documentElement, valor);
    },
  };
  poner(document.documentElement, actual);
  // Las transiciones de Astro cambian los atributos de <html> por los de la página nueva:
  // la dirección se pone en la nueva antes del cambio.
  document.addEventListener('astro:before-swap', function (event) {
    poner(event.newDocument.documentElement, actual);
  });
})();
