export const glossary = [
  {
    slug: 'bailarina',
    name: 'Bailarina',
    definition:
      'Zapato plano, o casi, que deja al aire buena parte del empeine. Viene de las zapatillas de ballet: puntera redondeada, pala corta y, a veces, un lazo pequeño en el borde.',
  },
  {
    slug: 'cuña',
    name: 'Cuña',
    definition:
      'Suela que sube hacia el talón en una sola pieza, sin hueco bajo el arco del pie. Hace de tacón y de suela a la vez.',
  },
  {
    slug: 'destalonado',
    name: 'Destalonado',
    definition:
      'Zapato que deja el talón al aire. Suele sujetarse con una tira fina por detrás; si no la lleva, se suele llamar mule.',
  },
  {
    slug: 'empeine',
    name: 'Empeine',
    definition:
      'La parte de arriba del pie, entre los dedos y el tobillo. En un zapato importa cuánto empeine deja a la vista y qué lo cruza: una tira, un lazo, el borde de la pala.',
  },
  {
    slug: 'garganta',
    name: 'Garganta',
    definition:
      'El borde delantero de la abertura, justo donde la pala deja de cubrir el pie. Puede ser recta, redondeada, en pico o con forma de corazón.',
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
      'La pieza de delante, la que cubre los dedos y sube hacia el empeine. Si es corta, el zapato enseña más pie; si es larga, cubre casi todo el empeine.',
  },
  {
    slug: 'plataforma',
    name: 'Plataforma',
    definition:
      'Suela gruesa también por delante, bajo los dedos. Eleva todo el pie y, si hay tacón, hace que el pie vaya menos inclinado de lo que haría pensar la altura.',
  },
  {
    slug: 'puntera',
    name: 'Puntera',
    definition:
      'La parte delantera del zapato, la que cubre la punta de los dedos. Según su forma, es redonda, almendrada, cuadrada o en punta.',
  },
  {
    slug: 'rejilla',
    name: 'Rejilla',
    definition:
      'Tejido de malla, con huecos regulares entre los hilos. En un zapato deja ver lo que hay debajo: el forro, otro color o el propio pie.',
  },
  {
    slug: 'salon',
    name: 'Salón',
    definition:
      'Zapato cerrado por delante y por detrás, sin cordones ni tiras, con un escote que deja el empeine al aire. Casi siempre lleva tacón.',
  },
  {
    slug: 'tacon-bloque',
    name: 'Tacón bloque',
    definition:
      'Tacón ancho y de caras planas, casi igual de grueso abajo que arriba. Visto de lado parece un bloque, y reparte mejor el apoyo que uno fino.',
  },
] as const;
export type GlossarySlug = (typeof glossary)[number]['slug'];
