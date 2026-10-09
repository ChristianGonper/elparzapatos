// Laboratorio de diseño de El Par (solo en la vista de revisión). Se carga en <head>, antes de
// pintar, y aplica la combinación guardada para que no parpadee al cambiar de página.
// Con ?lab=P3F2T3H3M2A2D1 en la dirección se aplica y se guarda esa combinación.
(function () {
  var clave = 'elpar-laboratorio';
  var estado = {};
  try {
    estado = JSON.parse(localStorage.getItem(clave) || '{}') || {};
  } catch (error) {
    estado = {};
  }
  var codigo = new URLSearchParams(location.search).get('lab');
  if (codigo) {
    estado = {};
    codigo.replace(/([pfthmad])\s*(\d+)/gi, function (_, letra, numero) {
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
  Object.keys(estado).forEach(function (letra) {
    if (estado[letra] > 1) raiz.setAttribute('data-lab-' + letra, String(estado[letra]));
  });
  if (estado.m > 1) {
    var icono = document.querySelector('link[rel="icon"]');
    if (icono) icono.setAttribute('href', '/laboratorio/favicon-m' + estado.m + '.svg');
  }
})();
