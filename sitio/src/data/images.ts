// Set de PAR-0003 elegido para la guía y las imágenes de presentación.
const guideSet = 'maria';
const viewName = (view: number) => `vista-${String(view).padStart(2, '0')}`;
export const guideImage = (view: number) => `/imagenes/${guideSet}/${viewName(view)}`;
// Resolver público aislado del catálogo; se adaptará aquí si cambia el alojamiento de imágenes.
export const pairImage = (pair: { imageSet: string }, view: number) =>
  `/imagenes/${pair.imageSet}/${viewName(view)}`;
