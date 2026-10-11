// Laboratorio de interacción y movimiento de El Par (solo en la vista de revisión). Se carga en
// <head>, antes de pintar, y aplica la combinación guardada. Con ?lab=N3E2R2 en la dirección se
// aplica y se guarda esa combinación.
(function () {
  if (window.elParLaboratorio) return;
  var clave = 'elpar-laboratorio-7';
  var leer = function () {
    try {
      return JSON.parse(localStorage.getItem(clave) || '{}') || {};
    } catch (error) {
      return {};
    }
  };
  var estado = leer();
  var codigo = new URLSearchParams(location.search).get('lab');
  if (codigo) {
    estado = {};
    codigo.replace(/([nerdvfl])\s*(\d+)/gi, function (_, letra, numero) {
      estado[letra.toLowerCase()] = Number(numero);
      return '';
    });
    try {
      localStorage.setItem(clave, JSON.stringify(estado));
    } catch (error) {
      // Sin almacenamiento, la combinación solo dura esta página.
    }
  }
  var raiz = document.documentElement;
  var aplicar = function () {
    estado = leer();
    raiz.getAttributeNames().forEach(function (nombre) {
      if (/^data-lab-[a-z]$/.test(nombre) || nombre === 'data-visor-zoom')
        raiz.removeAttribute(nombre);
    });
    Object.keys(estado).forEach(function (letra) {
      if (estado[letra] > 1) raiz.setAttribute('data-lab-' + letra, String(estado[letra]));
    });
    // El visor lee este atributo al abrir una foto (ver PhotoViewer.astro).
    if (estado.v > 1) raiz.setAttribute('data-visor-zoom', '');
    var medir = false;
    try {
      medir = localStorage.getItem(clave + '-medir') === '1';
    } catch (error) {
      medir = false;
    }
    if (medir) raiz.setAttribute('data-lab-medir', '');
    else raiz.removeAttribute('data-lab-medir');
  };
  window.elParLaboratorio = { clave: clave, aplicar: aplicar };
  aplicar();
  // Al navegar sin recargar, Astro sustituye los atributos de <html>: se vuelven a poner antes de
  // pintar la página nueva.
  document.addEventListener('astro:after-swap', aplicar);
  // Con «N1 · Ninguna», los enlaces y el botón de volver cargan la página entera, como en la web
  // publicada. Se decide antes de que el enrutador de Astro vea el clic.
  var sinTransicion = function () {
    return !(leer().n > 1);
  };
  window.addEventListener(
    'click',
    function (evento) {
      var enlace = evento.target instanceof Element && evento.target.closest('a[href]');
      if (!enlace) return;
      if (sinTransicion()) enlace.setAttribute('data-astro-reload', '');
      else enlace.removeAttribute('data-astro-reload');
    },
    true,
  );
  var ruta = location.pathname;
  window.addEventListener('popstate', function (evento) {
    if (location.pathname !== ruta && sinTransicion()) {
      evento.stopImmediatePropagation();
      location.reload();
    }
    ruta = location.pathname;
  });
  document.addEventListener('astro:page-load', function () {
    ruta = location.pathname;
  });
})();
