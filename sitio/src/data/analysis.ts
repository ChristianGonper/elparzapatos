import type { Pair } from './pairs';

export function currentAnalysis(locals: App.Locals): Pair {
  if (!locals.analysis)
    throw new Error('Los bloques de análisis deben usarse dentro de una entrada de Pares.');
  return locals.analysis;
}
