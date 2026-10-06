export interface PairSection {
  title: string;
  paragraphs: string[];
  image: number;
  caption: string;
  detail?: boolean;
}
export interface Pair {
  slug: string;
  id: string;
  imageSet: string;
  photoAlt: string;
  focus: string;
  title: string;
  teaser: string;
  intro: string;
  credit: string;
  type: string;
  brand: string;
  hero: number;
  quote: string;
  sections: PairSection[];
}
// Contenido público seleccionado manualmente. Nunca importar respuestas de Tally.
export const pairs: Pair[] = [
  {
    slug: 'bailarinas-rejilla-flores',
    id: 'PAR-0003',
    imageSet: 'maria',
    focus: 'Rejilla, flores y puntos de brillo',
    photoAlt: 'Bailarinas de María, con rejilla oscura, flores y puntos de brillo',
    title: 'Flores sobre una rejilla',
    teaser:
      'Una forma sencilla por fuera. Una trama de flores, huecos y pequeños brillos cuando te acercas.',
    intro:
      'Las bailarinas de María tienen la puntera redondeada y una abertura larga. Pero lo que cambia al mirarlas de cerca está en la superficie: sobre una rejilla oscura, las flores se dibujan con líneas más densas y pequeños puntos de brillo.',
    credit: 'María',
    type: 'Bailarinas',
    brand: 'Zara',
    hero: 5,
    quote:
      'Este par de bailarinas de Zara, tienen un toque especial por los “brillitos” y el tejido estilo “rejilla”. Son perfectas para darle un toque a un look básico.',
    sections: [
      {
        title: 'El dibujo también deja huecos',
        image: 2,
        caption: 'De perfil se ven las zonas abiertas entre las líneas del dibujo.',
        paragraphs: [
          'La superficie no es uniforme. Unas zonas dejan pasar la vista y otras se cierran con líneas que dibujan pétalos y hojas. Ese contraste se aprecia especialmente en el lateral: el borde de una flor queda más marcado que el fondo que la rodea.',
          'El tejido abierto, la [[rejilla]], continúa por delante y por los lados. Los pequeños puntos brillantes aparecen separados, repartidos entre las formas del dibujo. No cubren el zapato entero: interrumpen la superficie oscura en lugares concretos.',
        ],
      },
      {
        title: 'La punta reúne el dibujo',
        image: 3,
        caption: 'La vista de frente permite comparar la forma de las dos punteras.',
        paragraphs: [
          'Por delante, la [[puntera]] termina en una curva ancha. No se estrecha hasta formar un pico. Las líneas del dibujo se juntan en esta zona y la hacen parecer más densa que algunos tramos del lateral.',
          'La parte que cubre los dedos, la [[pala]], es corta respecto a la abertura que queda detrás. Esa diferencia hace que desde arriba se vea una punta cerrada seguida de un hueco largo.',
        ],
      },
      {
        title: 'Un borde liso entre tantas líneas',
        image: 4,
        caption: 'Desde arriba, el borde oscuro separa la abertura del tejido exterior.',
        paragraphs: [
          'Alrededor de la abertura hay una franja oscura, continua y sin el dibujo de flores. Su línea se distingue bien porque todo lo que tiene al lado es más irregular.',
          'El borde delantero de esa abertura, la [[garganta]], forma una curva redondeada sobre los dedos. Desde ahí, la [[linea-de-calce|línea de calce]] recorre los lados hasta el talón. No hay tiras ni cierres que crucen el hueco.',
        ],
      },
      {
        title: 'El talón cierra la forma',
        image: 1,
        caption:
          'Por detrás se ve el contraste entre el talón cerrado y los laterales abiertos del tejido.',
        paragraphs: [
          'La parte trasera sube alrededor del talón y mantiene el mismo dibujo que los lados. Una línea vertical marca el centro de la trasera. El borde liso de la abertura continúa por arriba y cierra el recorrido.',
          'La vista desde atrás muestra también lo baja que queda la base. La superficie decorada llega casi hasta el suelo; debajo solo asoma una franja oscura.',
        ],
      },
      {
        title: 'Por debajo, otra superficie',
        image: 6,
        caption: 'La suela vista por debajo. Las marcas de uso forman parte del par.',
        paragraphs: [
          'Al dar la vuelta al zapato desaparecen las flores y los brillos. La suela tiene una zona delantera amplia y otra separada bajo el talón. Se ven marcas de uso, más claras que el resto de la superficie.',
          'Desde este ángulo se entiende el contraste del conjunto: una base baja y oscura que deja todo el protagonismo al tejido de la parte superior.',
        ],
      },
    ],
  },
  {
    slug: 'bailarinas-manchas-leopardo',
    id: 'PAR-0004',
    imageSet: 'maria-leopardo',
    focus: 'Manchas, textura y abertura lateral',
    photoAlt: 'Las bailarinas de María con manchas oscuras sobre una superficie de pelo corto',
    title: 'Manchas que siguen la forma',
    teaser:
      'Una punta redonda y un lateral que baja en el centro. El dibujo de leopardo recorre toda la superficie.',
    intro:
      'En este segundo par de María, las manchas oscuras se reparten sobre un fondo que cambia entre tonos claros y marrones. La forma es baja, sin tiras ni adornos añadidos. Al mirar de lado aparece otro rasgo: el borde baja en el centro y vuelve a subir hacia la punta y el talón.',
    credit: 'María',
    type: 'Bailarinas',
    brand: 'Zara',
    hero: 3,
    quote:
      'El animal print, un clásico para las bailarinas. Un tanto atrevidas, para darle originalidad al look.',
    sections: [
      {
        title: 'El dibujo no repite dos puntas iguales',
        image: 2,
        caption: 'Las manchas cambian de lugar de una puntera a la otra.',
        paragraphs: [
          'De frente, las dos puntas comparten la misma curva redondeada. Lo que cambia es el lugar que ocupa cada mancha: unas son compactas, otras dejan un centro más claro y otras se alargan hacia un lado.',
          'El dibujo llega hasta el borde de la [[puntera]]. No hay una pieza lisa que lo interrumpa ni un adorno que se coloque por encima. La diferencia entre los tonos claros y los oscuros es lo que se ve primero.',
        ],
      },
      {
        title: 'Un lateral que baja y vuelve a subir',
        image: 5,
        caption:
          'La vista de perfil muestra el descenso del borde y las uniones visibles del exterior.',
        paragraphs: [
          'El lateral no tiene la misma altura en todo su recorrido. Sube alrededor del talón, baja en el centro y vuelve a ganar altura al acercarse a los dedos. Esa curva abre el zapato por los lados.',
          'El borde que rodea la abertura, la [[linea-de-calce|línea de calce]], sigue ese recorrido sin una tira que lo cruce. Desde este ángulo también se ve una unión vertical cerca de la parte delantera y otra línea que continúa por encima.',
        ],
      },
      {
        title: 'Una superficie que se ve de cerca',
        image: 6,
        caption: 'La vista superior deja ver el dibujo alrededor de toda la abertura.',
        paragraphs: [
          'Al acercarse, la superficie muestra pelo corto. Sus pequeños filamentos se distinguen junto al borde de la abertura y cambian de dirección en algunas zonas. La foto permite ver esa textura, pero no asegura la composición del material.',
          'Por dentro asoma una superficie oscura que contrasta con el dibujo exterior. La [[pala]], la parte que cubre los dedos, queda por delante de una abertura larga y estrecha.',
        ],
      },
      {
        title: 'Por detrás, el dibujo continúa',
        image: 4,
        caption: 'Vista de tres cuartos por detrás, con el talón cerrado y el lateral a la vista.',
        paragraphs: [
          'Las manchas rodean la trasera sin cambiar a una pieza de otro color. El talón queda cerrado y más alto que la zona central de los lados.',
          'Debajo apenas asoma la base oscura. Vista desde atrás, esa base baja hace que el exterior dibujado ocupe casi toda la altura que vemos.',
        ],
      },
      {
        title: 'Una base sin dibujo',
        image: 1,
        caption: 'Por debajo, la suela oscura contrasta con el borde estampado.',
        paragraphs: [
          'La suela es oscura y deja de lado el dibujo del exterior. Se distingue una zona amplia bajo la parte delantera y otra bajo el talón, unidas por un tramo más estrecho.',
          'En el contorno todavía se ve una franja del dibujo de manchas. El contraste entre ese borde y la base resume lo que aparece en las demás vistas: una forma baja y sencilla con una superficie que se lleva la mirada.',
        ],
      },
    ],
  },
  {
    slug: 'slippers-burdeos-borde-rosa',
    id: 'PAR-0002',
    imageSet: 'maria-burdeos',
    focus: 'Contraste de color, abertura y textura',
    photoAlt: 'Las slippers burdeos de María, con borde rosa alrededor de la abertura y la base',
    title: 'Un borde rosa alrededor del burdeos',
    teaser:
      'La superficie oscura y una línea rosa que vuelve a aparecer junto al suelo. Dos colores para seguir toda la forma.',
    intro:
      'María ha compartido estas slippers de Flabelus, unos zapatos bajos que cubren más la parte delantera del pie que sus otras bailarinas. Sobre el burdeos de aspecto aterciopelado, el rosa sigue la abertura y vuelve a aparecer alrededor de la base.',
    credit: 'María',
    type: 'Slippers',
    brand: 'Flabelus',
    hero: 5,
    quote: 'Me encanta la originalidad de flabelus',
    sections: [
      {
        title: 'La abertura tiene su propio dibujo',
        image: 1,
        caption:
          'Desde arriba se ve el borde rosa y el recorte del extremo delantero de la abertura.',
        paragraphs: [
          'El borde rosa permite seguir la abertura completa de un vistazo. Recorre el talón y los lados, pero por delante no termina en una curva continua: baja un poco en el centro y cambia de dirección a cada lado.',
          'Ese recorte marca la [[garganta]], el borde delantero donde el zapato deja de cubrir el pie. Delante queda una zona amplia de burdeos, sin tiras, lazos ni adornos añadidos.',
        ],
      },
      {
        title: 'El color baja hasta la base',
        image: 6,
        caption: 'En el perfil, el rosa aparece tanto en la abertura como en el contorno inferior.',
        paragraphs: [
          'De lado se ven dos líneas rosas separadas por la superficie burdeos. Una rodea la abertura. La otra sigue la base, desde la punta hasta el talón.',
          'No tienen el mismo aspecto. La de arriba es lisa y estrecha; la inferior muestra una textura más irregular, con pequeños trazos que se repiten. En este ángulo también se aprecia lo baja que queda la base.',
        ],
      },
      {
        title: 'Una punta sin un adorno por encima',
        image: 4,
        caption: 'La vista de frente muestra la curva de las puntas y el borde rosa bajo ellas.',
        paragraphs: [
          'Por delante, la [[puntera]] termina en una curva amplia. La superficie burdeos ocupa toda la zona y cambia de tono donde la luz incide de otra manera.',
          'El aspecto aterciopelado se reconoce en esas variaciones: unas franjas se ven más oscuras y otras más claras. No hace falta atribuirle una composición concreta para apreciar lo que cambia en la foto.',
        ],
      },
      {
        title: 'La línea sigue por detrás',
        image: 3,
        caption:
          'Vista de tres cuartos por detrás: el contraste rosa continúa alrededor del talón.',
        paragraphs: [
          'El talón queda cerrado. El borde rosa pasa por su parte superior y vuelve hacia la abertura, mientras que otra franja del mismo color continúa por debajo.',
          'Desde atrás se ve también cuánto cubre la zona delantera. La [[pala]], la parte sobre los dedos, se alarga hacia el empeine más que en los otros dos pares de María.',
        ],
      },
      {
        title: 'Por debajo cambia la trama',
        image: 2,
        caption: 'La suela oscura tiene un dibujo que ocupa casi toda su superficie.',
        paragraphs: [
          'La suela no es lisa. Tiene una trama de trazos cortos que recorren la superficie oscura y siguen direcciones diferentes. El dibujo de la base contrasta con las zonas amplias de burdeos del exterior.',
          'Alrededor aún asoma el rosa. Es el color que conecta las vistas de este par: señala la abertura cuando lo miras desde arriba y delimita la base cuando lo giras.',
        ],
      },
    ],
  },
];
export const pairPath = (pair: Pair) => `/pares/${pair.slug}/`;
export const mariaImage = (view: number) =>
  `/imagenes/maria/vista-${String(view).padStart(2, '0')}`;

export const pairImage = (pair: Pair, view: number) =>
  `/imagenes/${pair.imageSet}/vista-${String(view).padStart(2, '0')}`;
