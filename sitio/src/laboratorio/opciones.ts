// Laboratorio de diseño (solo en la vista de revisión). Cada eje se aplica con un atributo
// data-lab-<clave> en <html>; la opción 1 es siempre la web actual y no pone atributo.
export type Opcion = { nombre: string; nota: string; recomendada?: boolean };
export type Eje = { clave: string; letra: string; nombre: string; opciones: Opcion[] };

export const ejes: Eje[] = [
  {
    clave: 'p',
    letra: 'P',
    nombre: 'Paleta',
    opciones: [
      { nombre: 'Crema y burdeos', nota: 'La actual: papel crema, tinta cálida y burdeos.' },
      {
        nombre: 'Papel y tinta',
        nota: 'Casi monocromo, como una revista impresa: blanco roto y negro.',
      },
      { nombre: 'Cuero', nota: 'Arena y terracota, con tinta tostada. Cálida, de taller.' },
      {
        nombre: 'Verde botella',
        nota: 'Papel claro con verde profundo de acento. Sobria, clásica.',
      },
      {
        nombre: 'Noche',
        nota: 'Fondo casi negro con rosa empolvado de acento. Las fotos destacan como en galería.',
      },
      { nombre: 'Pizarra', nota: 'Gris azulado frío y azul tinta. Limpia, más tecnológica.' },
      { nombre: 'Rosa y negro', nota: 'Rosa empolvado de fondo y negro de acento. Muy de moda.' },
    ],
  },
  {
    clave: 'f',
    letra: 'F',
    nombre: 'Fuentes',
    opciones: [
      { nombre: 'Newsreader y DM Sans', nota: 'La actual: serif de periódico y sans redonda.' },
      {
        nombre: 'Bodoni y Jost',
        nota: 'Didone de alto contraste con sans geométrica: portada de revista de moda.',
      },
      {
        nombre: 'Instrument',
        nota: 'Instrument Serif estrecha para títulos e Instrument Sans: contemporánea.',
      },
      { nombre: 'Toda sans', nota: 'Archivo en títulos y texto. Directa, de marca actual.' },
      {
        nombre: 'Cormorant y Work Sans',
        nota: 'Garamond de titular, fina y elegante, con sans amplia para leer.',
      },
      { nombre: 'Fraunces y Figtree', nota: 'Serif suave y con carácter con sans amable.' },
    ],
  },
  {
    clave: 't',
    letra: 'T',
    nombre: 'Tamaño de texto',
    opciones: [
      { nombre: '16 px', nota: 'El actual.' },
      { nombre: '17 px', nota: 'Un punto más grande.' },
      {
        nombre: '18 px',
        nota: 'Más cómodo en el móvil sin que la página se alargue mucho.',
        recomendada: true,
      },
      { nombre: '19 px', nota: 'Grande, de lectura tranquila.' },
    ],
  },
  {
    clave: 'h',
    letra: 'H',
    nombre: 'Títulos',
    opciones: [
      { nombre: 'Actual', nota: 'Los tamaños de ahora.' },
      { nombre: 'Contenida', nota: 'Unos 20 % más pequeños: más texto a la vista.' },
      {
        nombre: 'Media',
        nota: 'Un 10 % más pequeños: siguen mandando sin ocupar tanto.',
        recomendada: true,
      },
      { nombre: 'Editorial grande', nota: 'Más grandes en escritorio, como una portada.' },
    ],
  },
  {
    clave: 'm',
    letra: 'M',
    nombre: 'Marca',
    opciones: [
      { nombre: 'El Par.', nota: 'La actual: serif con el punto de color y el lema debajo.' },
      { nombre: 'Versalitas', nota: 'EL PAR en mayúsculas espaciadas, como una etiqueta.' },
      {
        nombre: 'Cursiva',
        nota: 'El Par en cursiva, con «Zapatos en detalle» al lado (oculto en el móvil).',
      },
      {
        nombre: 'minúsculas',
        nota: '«el par.» en sans gruesa y minúsculas, sin lema en el móvil.',
      },
      { nombre: 'Apilado', nota: 'EL sobre PAR, compacto, con el lema al lado.' },
      { nombre: 'Monograma', nota: 'Una P en un círculo de color junto al nombre.' },
    ],
  },
  {
    clave: 'a',
    letra: 'A',
    nombre: 'Armarios',
    opciones: [
      { nombre: 'Pila', nota: 'La actual: los demás pares asoman detrás del segundo.' },
      { nombre: 'Abanico', nota: 'Los pares de atrás se abren en abanico y se ven más.' },
      { nombre: 'Miniaturas', nota: 'Dos fotos grandes y una fila de miniaturas con el resto.' },
      { nombre: 'Mosaico', nota: 'Una foto grande y las demás más pequeñas a su lado.' },
      { nombre: 'Contador', nota: 'Dos fotos y un «+1 par» grande y en color.' },
    ],
  },
  {
    clave: 'd',
    letra: 'D',
    nombre: 'Aire en ordenador',
    opciones: [
      { nombre: 'Actual', nota: 'Los espacios de ahora entre secciones.' },
      { nombre: 'Compacta', nota: 'Un 30 % menos de aire entre bloques. Las fotos no cambian.' },
      { nombre: 'Muy compacta', nota: 'La mitad de aire: más contenido por pantalla.' },
    ],
  },
];

export const codigoActual = ejes.map((eje) => `${eje.letra}1`).join(' · ');
