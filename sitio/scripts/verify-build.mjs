import { readFile, readdir, stat } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { imageSize } from 'image-size';

const root = resolve('dist');
const errors = [];
const files = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walk(path);
    else files.push(path);
  }
}
await walk(root);
const pages = files.filter((file) => file.endsWith('.html'));
const documents = new Map(
  await Promise.all(pages.map(async (file) => [file, await readFile(file, 'utf8')])),
);
const localTarget = (url, file) =>
  resolve(url.startsWith('/') ? root : dirname(file), `.${url.startsWith('/') ? url : `/${url}`}`);

for (const [file, html] of documents) {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  if (new Set(ids).size !== ids.length) errors.push(`${file}: identificadores duplicados`);
  if (!/<html\b[^>]*lang="es"/.test(html)) errors.push(`${file}: falta idioma español`);
  if ([...html.matchAll(/<h1\b/g)].length !== 1)
    errors.push(`${file}: debe tener un título principal`);
  if (!/<meta name="description" content="[^"]+"/.test(html))
    errors.push(`${file}: falta descripción`);

  for (const match of html.matchAll(/\b(?:href|src)="([^"\s]+)"/g)) {
    const url = match[1];
    if (/^(https?:|mailto:|data:)/.test(url)) continue;
    const [path, rawHash] = url.split('#');
    const hash = rawHash ? decodeURIComponent(rawHash) : undefined;
    let target = path ? localTarget(decodeURIComponent(path), file) : file;
    try {
      if ((await stat(target)).isDirectory()) target = join(target, 'index.html');
      await stat(target);
      if (hash) {
        const targetHtml = documents.get(target) ?? (await readFile(target, 'utf8'));
        if (!targetHtml.includes(`id="${hash}"`))
          errors.push(`${file}: destino de ancla inexistente ${url}`);
      }
    } catch {
      errors.push(`${file}: referencia local inexistente ${url}`);
    }
  }
  for (const match of html.matchAll(/\bsrcset="([^"]+)"/g)) {
    for (const candidate of match[1].split(',')) {
      const url = candidate.trim().split(/\s+/)[0];
      if (/^https?:/.test(url)) continue;
      try {
        const target = localTarget(url, file);
        await stat(target);
        const descriptor = candidate.trim().split(/\s+/)[1];
        if (descriptor?.endsWith('w')) {
          const metadata = imageSize(await readFile(target));
          if (metadata.width !== Number(descriptor.slice(0, -1)))
            errors.push(`${file}: anchura incorrecta en srcset ${candidate}`);
        }
      } catch {
        errors.push(`${file}: variante de imagen inexistente ${url}`);
      }
    }
  }
  for (const tag of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt="/.test(tag[0]) || !/\bwidth="/.test(tag[0]) || !/\bheight="/.test(tag[0]))
      errors.push(`${file}: imagen sin texto alternativo o dimensiones`);
  }
  if (html.includes('https://tally.so/embed') || html.includes('<iframe'))
    errors.push(`${file}: el formulario no debe cargarse antes de abrir Tally`);
  if (/(zapatos reales|personas reales|dueñas|archivo monográfico|cédula de museo)/i.test(html))
    errors.push(`${file}: expresión editorial descartada`);
}

for (const page of ['index.html', 'pares/index.html', 'armarios/index.html'])
  if (!documents.has(join(root, page))) errors.push(`Falta la página ${page}`);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else
  console.log(
    `Verificados ${pages.length} documentos: enlaces, anclas, imágenes, srcset y estructura.`,
  );
