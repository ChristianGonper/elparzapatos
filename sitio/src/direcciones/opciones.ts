// Direcciones visuales del bloque 9: la misma web con otro aire, solo en la vista de revisión.
// La clave es el valor de ?dir= y de data-dir en <html>; «actual» es la web tal como está.
export interface Direccion {
  clave: string;
  nombre: string;
  nota: string;
}

export const direcciones: Direccion[] = [
  {
    clave: 'actual',
    nombre: 'Actual',
    nota: 'La web tal como está.',
  },
  {
    clave: 'revista',
    nombre: 'Revista',
    nota: 'Revista impresa: cabecera de periódico, rejilla con filetes, Fraunces.',
  },
  {
    clave: 'archivo',
    nombre: 'Archivo',
    nota: 'Archivo de museo: cada par es una ficha con referencia, Plex Sans y Plex Mono.',
  },
  {
    clave: 'galeria',
    nombre: 'Galería',
    nota: 'Galería mínima: fotos a sangre, texto pequeño de cartela, Inter Tight.',
  },
  {
    clave: 'cuaderno',
    nombre: 'Cuaderno',
    nota: 'Cuaderno de diseñadora: fotos pegadas con cinta, notas a mano, papel punteado.',
  },
];
