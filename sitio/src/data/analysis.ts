import type { Pair } from './pairs';

export function currentAnalysis(locals: App.Locals): Pair {
  if (!locals.analysis)
    throw new Error('Los bloques del retrato deben usarse dentro de una entrada de Pares.');
  return locals.analysis;
}
