export const glossary = [
  {
    slug: 'bailarina',
    name: 'Bailarina',
    definition:
      'Zapato bajo y cerrado, con una abertura amplia sobre el empeine. Su forma recuerda a las zapatillas de ballet.',
  },
  {
    slug: 'cuña',
    name: 'Cuña',
    definition:
      'Suela que eleva el talón y continúa bajo el pie, en lugar de formar un tacón separado.',
  },
  {
    slug: 'destalonado',
    name: 'Destalonado',
    definition:
      'Zapato que deja el talón descubierto. Puede llevar una tira detrás para sujetarlo.',
  },
  {
    slug: 'empeine',
    name: 'Empeine',
    definition:
      'Parte superior del pie, entre los dedos y el tobillo. La abertura y las tiras del zapato dejan ver más o menos de esta zona.',
  },
  {
    slug: 'garganta',
    name: 'Garganta',
    definition:
      'Borde delantero de la abertura por la que entra el pie, donde el zapato deja de cubrir el empeine.',
  },
  {
    slug: 'linea-de-calce',
    name: 'Línea de calce',
    definition:
      'Recorrido del borde de la abertura del zapato alrededor del pie. Puede subir, bajar o ser diferente a cada lado.',
  },
  {
    slug: 'pala',
    name: 'Pala',
    definition:
      'Parte delantera del zapato que cubre los dedos y, según la forma, parte del empeine.',
  },
  {
    slug: 'plataforma',
    name: 'Plataforma',
    definition:
      'Suela gruesa que eleva la parte delantera del pie. Puede combinarse con un tacón o una cuña.',
  },
  {
    slug: 'puntera',
    name: 'Puntera',
    definition:
      'Extremo delantero del zapato, donde van los dedos. Su forma puede ser redonda, cuadrada o acabar en punta.',
  },
  {
    slug: 'rejilla',
    name: 'Rejilla',
    definition:
      'Tejido abierto que deja huecos entre sus hilos. En un zapato permite ver a través de algunas zonas.',
  },
  {
    slug: 'salon',
    name: 'Salón',
    definition:
      'Zapato cerrado por delante y por detrás, abierto sobre el empeine y normalmente con tacón.',
  },
  {
    slug: 'tacon-bloque',
    name: 'Tacón bloque',
    definition:
      'Tacón ancho, con caras que forman un volumen compacto. Visto de lado o por detrás conserva una base amplia.',
  },
] as const;
export type GlossarySlug = (typeof glossary)[number]['slug'];
