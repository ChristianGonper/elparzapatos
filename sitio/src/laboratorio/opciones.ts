// Laboratorio de interacción y movimiento (solo en la vista de revisión). Cada eje se aplica con
// un atributo data-lab-<clave> en <html>; la opción 1 es siempre la web actual y no lo pone.
export type Opcion = { nombre: string; nota: string; recomendada?: boolean };
export type Eje = { clave: string; letra: string; nombre: string; opciones: Opcion[] };

export const ejes: Eje[] = [
  {
    clave: 'n',
    letra: 'N',
    nombre: 'Navegación entre páginas',
    opciones: [
      { nombre: 'Ninguna', nota: 'Como ahora: cada enlace carga la página entera.' },
      {
        nombre: 'Fundido',
        nota: 'La página nueva aparece sobre la anterior con un fundido corto. La cabecera no se mueve.',
      },
      {
        nombre: 'Foto que crece',
        nota: 'La foto de la tarjeta que pulsas crece hasta ser la foto grande del retrato, y vuelve al volver. El resto, en fundido.',
        recomendada: true,
      },
      {
        nombre: 'Deslizamiento',
        nota: 'El contenido sale hacia un lado y entra el nuevo, como pasar página. Al volver, al revés.',
      },
    ],
  },
  {
    clave: 'e',
    letra: 'E',
    nombre: 'Entrada al aparecer',
    opciones: [
      { nombre: 'Ninguna', nota: 'Como ahora: todo está ya en su sitio.' },
      {
        nombre: 'Subida suave',
        nota: 'Fotos y tarjetas aparecen con un fundido y una subida corta al llegar a la pantalla.',
        recomendada: true,
      },
      {
        nombre: 'Cortina',
        nota: 'Las fotos se descubren de abajo arriba, como una cortina que se recoge; el texto, en fundido.',
      },
      {
        nombre: 'Escalonada',
        nota: 'Como la subida suave, pero en las rejillas cada tarjeta llega un instante después de la anterior.',
      },
    ],
  },
  {
    clave: 'r',
    letra: 'R',
    nombre: 'Al pasar el ratón',
    opciones: [
      {
        nombre: 'Como ahora',
        nota: 'Solo las tarjetas de pares acercan un poco la foto y las flechas se mueven.',
      },
      {
        nombre: 'Zoom lento',
        nota: 'Todas las fotos enlazadas se acercan despacio, como si te inclinaras sobre el zapato.',
        recomendada: true,
      },
      {
        nombre: 'Elevación',
        nota: 'Tarjetas y botones se levantan un poco, con una sombra suave debajo.',
      },
      {
        nombre: 'Subrayado',
        nota: 'Los enlaces y «Leer a fondo» se subrayan de izquierda a derecha al pasar por encima.',
      },
    ],
  },
  {
    clave: 'd',
    letra: 'D',
    nombre: 'Detalles en la foto',
    opciones: [
      { nombre: 'Ninguno', nota: 'Como ahora: el texto y la foto van juntos, sin señalar nada.' },
      {
        nombre: 'Puntos numerados',
        nota: 'Un punto numerado, siempre visible, en el sitio de la foto del que habla cada detalle, con el mismo número junto a su título.',
      },
      {
        nombre: 'Marco al leer',
        nota: 'Al pasar el ratón por el texto (o tocarlo en el móvil), aparece un círculo en ese sitio y el resto de la foto se oscurece un poco.',
        recomendada: true,
      },
      {
        nombre: 'Lupa',
        nota: 'Al pasar por el texto, una lupa redonda amplía ese sitio de la foto.',
      },
    ],
  },
  {
    clave: 'v',
    letra: 'V',
    nombre: 'Visor y glosario',
    opciones: [
      {
        nombre: 'Como ahora',
        nota: 'El visor se abre con un fundido; las definiciones aparecen de golpe.',
      },
      {
        nombre: 'Zoom desde la foto',
        nota: 'La foto crece desde su sitio hasta llenar el visor y vuelve al cerrar. Las definiciones aparecen con un fundido corto.',
        recomendada: true,
      },
      {
        nombre: 'Zoom y lupa',
        nota: 'Lo mismo, y sobre las fotos que se pueden ampliar el cursor es una lupa.',
      },
    ],
  },
  {
    clave: 'f',
    letra: 'F',
    nombre: 'Frase de la colaboradora',
    opciones: [
      { nombre: 'Al final', nota: 'Como ahora: la frase cierra el retrato, antes del resumen.' },
      {
        nombre: 'Tras la entradilla',
        nota: 'La frase abre el retrato, antes de la foto grande: primero lo que le gusta a ella.',
      },
      {
        nombre: 'Junto a la primera foto',
        nota: 'La frase va al lado del primer detalle, como una nota al margen.',
        recomendada: true,
      },
    ],
  },
  {
    clave: 'l',
    letra: 'L',
    nombre: 'Lectura del retrato',
    opciones: [
      { nombre: 'Sin barra', nota: 'Como ahora.' },
      {
        nombre: 'Barra fina',
        nota: 'Una línea arriba de la pantalla se llena según avanzas por el retrato.',
      },
      {
        nombre: 'Por detalles',
        nota: 'La línea se parte en un tramo por detalle: se ve cuántos quedan.',
      },
    ],
  },
];

export const codigoActual = ejes.map((eje) => `${eje.letra}1`).join(' · ');
