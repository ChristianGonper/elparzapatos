// Comprobaciones ligeras de docs/CONVENCIONES.md sobre el código fuente. La ejecuta
// verify-build.mjs (y, con ella, verify y verify:review); también sirve sola:
// node scripts/check-conventions.mjs
import { readFile, readdir } from 'node:fs/promises';
import { basename, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
// El código de terceros (carpetas «terceros/») conserva su estilo y no se revisa.
// Única hoja dentro de un componente: la ayuda para medir puntos solo existe en la vista de
// revisión y así la compilación normal no lleva ni sus estilos.
const styleAllowed = new Set(['src/components/MeasurePoints.astro']);

const list = async (dir) =>
  (await readdir(join(root, dir), { withFileTypes: true, recursive: true }))
    .filter((entry) => entry.isFile())
    .map((entry) => relative(root, join(entry.parentPath, entry.name)));

export const checkConventions = async () => {
  const problems = [];
  const report = (file, line, message) => problems.push(`${file}:${line}: ${message}`);
  const sources = [
    ...(await list('src')),
    ...(await list('scripts')),
    ...(await list('tests')),
    ...(await list('functions')),
  ].filter((file) => /\.(astro|css|ts|mjs|js)$/.test(file) && !file.includes('/terceros/'));

  for (const file of sources) {
    const text = await readFile(join(root, file), 'utf8');
    const lines = text.split('\n');
    const isCss = file.endsWith('.css');
    const css = isCss ? text : (text.match(/<style\b[^>]*>([\s\S]*?)<\/style>/)?.[1] ?? '');

    if (file.endsWith('.astro') && css && !styleAllowed.has(file))
      report(file, 1, 'estilos dentro del componente: van en src/styles/');

    lines.forEach((line, index) => {
      const at = index + 1;
      if (/\/\/.*\bbloque \d|\/\*.*\bbloque \d|\{\/\*.*\bbloque \d/i.test(line))
        report(file, at, 'comentario con un bloque de trabajo: eso va en git o en docs/');
      if (isCss || (css && css.includes(line) && line.trim())) {
        if (/\b\d*\.?\d+ms\b/.test(line)) report(file, at, 'duración en ms: se escribe en s');
        for (const [hex] of line.matchAll(/#[0-9a-fA-F]+\b/g))
          if (/:\s/.test(line) && !/^#([0-9a-f]{6}|[0-9a-f]{8})$/.test(hex))
            report(file, at, `color ${hex}: hex en minúscula de 6 u 8 cifras`);
        if (/::(before|after)\b/.test(line)) report(file, at, ':before/:after con un solo «:»');
        if (/@layer\b/.test(line)) report(file, at, 'sin @layer: el orden lo fija index.css');
        if (/[{,]\s*$/.test(line))
          for (const [name] of line.matchAll(/(?<![\w-])\.[A-Za-z_][\w-]*/g))
            if (!name.startsWith('.pswp') && !/^\.[a-z0-9]+(-[a-z0-9]+)*$/.test(name))
              report(file, at, `clase ${name}: kebab-case en minúscula`);
        for (const [name] of line.matchAll(/--[\w-]+(?=\s*:)/g))
          if (!/^--[a-z0-9]+(-[a-z0-9]+)*$/.test(name))
            report(file, at, `variable ${name}: kebab-case en minúscula`);
      }
      if (/\.(ts|mjs|js)$/.test(file) || (file.endsWith('.astro') && !isCss)) {
        if (/^export default\b/.test(line) && !file.endsWith('.config.ts'))
          report(file, at, 'sin export default: exports con nombre');
        if (/^export (async )?function (?!getStaticPaths\b|onRequest\b)/.test(line))
          report(file, at, 'función exportada como export const … = (…) => …');
      }
    });

    const name = basename(file);
    if (/^src\/(data|scripts|styles)\//.test(file) && !/^[a-z0-9]+(-[a-z0-9]+)*\.\w+$/.test(name))
      report(file, 1, 'nombre de archivo en kebab-case');
    if (/^src\/components\//.test(file) && !/^[A-Z][A-Za-z0-9]*\.astro$/.test(name))
      report(file, 1, 'componente en PascalCase');
  }
  return problems;
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const problems = await checkConventions();
  if (problems.length) {
    console.error(problems.join('\n'));
    process.exitCode = 1;
  } else console.log('Convenciones: sin problemas.');
}
