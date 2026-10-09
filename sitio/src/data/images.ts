import type { ImageMetadata } from 'astro';

// Fotos de origen en src/assets: Astro genera en la compilación los tamaños y formatos de cada una.
type Module = { default: ImageMetadata };
const pairPhotos = import.meta.glob<Module>('../assets/pares/*/vista-*.webp', { eager: true });
const examplePhotos = import.meta.glob<Module>('../assets/ejemplos/*.webp', { eager: true });

const find = (files: Record<string, Module>, path: string) => {
  const file = files[path];
  if (!file) throw new Error(`Falta la foto ${path.replace('../', 'src/')}`);
  return file.default;
};
const viewName = (view: number) => `vista-${String(view).padStart(2, '0')}`;

// Set de PAR-0003 elegido para la guía y las imágenes de presentación.
const guideSet = 'maria';
export const guideImage = (view: number) =>
  find(pairPhotos, `../assets/pares/${guideSet}/${viewName(view)}.webp`);
// Resolución aislada del catálogo; se adaptará aquí si cambia el alojamiento de imágenes.
export const pairImage = (pair: { imageSet: string }, view: number) =>
  find(pairPhotos, `../assets/pares/${pair.imageSet}/${viewName(view)}.webp`);
export const exampleImage = (name: string) =>
  find(examplePhotos, `../assets/ejemplos/${name}.webp`);
