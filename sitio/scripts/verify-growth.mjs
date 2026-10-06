import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { cp, mkdir, mkdtemp, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { promisify } from 'node:util';

// Compila una copia temporal: los ejemplos nunca entran en el catálogo real ni en su dist.
const execute = promisify(execFile);
const source = resolve('.');
const temp = await mkdtemp(join(tmpdir(), 'el-par-crecimiento-'));
const json = (path, value) => writeFile(path, JSON.stringify(value, null, 2));
const build = () =>
  execute(process.execPath, [join(source, 'node_modules/astro/bin/astro.mjs'), 'build'], {
    cwd: temp,
    env: Object.fromEntries(
      Object.entries(process.env).filter(
        ([key]) =>
          !['PUBLIC_SITE_URL', 'PUBLIC_LAUNCH_READY', 'PUBLIC_INSTAGRAM_READY'].includes(key),
      ),
    ),
    maxBuffer: 5_000_000,
  });

try {
  for (const path of ['src', 'public', 'astro.config.mjs', 'package.json'])
    await cp(join(source, path), join(temp, path), { recursive: true });
  await symlink(join(source, 'node_modules'), join(temp, 'node_modules'), 'dir');
  const content = join(temp, 'src/content');
  const example = JSON.parse(await readFile(join(content, 'pares/par-0003.json'), 'utf8'));
  await mkdir(join(content, 'colaboradoras'), { recursive: true });
  await json(join(content, 'colaboradoras/prueba.json'), {
    slug: 'prueba',
    name: 'Colaboradora de prueba',
    wardrobe: true,
  });
  await json(join(content, 'colaboradoras/un-par.json'), {
    slug: 'un-par',
    name: 'Un solo par',
    wardrobe: true,
  });
  await json(join(content, 'colaboradoras/sin-armario.json'), {
    slug: 'sin-armario',
    name: 'Sin armario autorizado',
    wardrobe: false,
  });

  for (let i = 0; i < 60; i++) {
    const collaborator =
      i < 20
        ? 'maria'
        : i < 40
          ? 'prueba'
          : i === 40
            ? 'un-par'
            : i < 43
              ? 'sin-armario'
              : undefined;
    await json(join(content, `pares/prueba-${i}.json`), {
      ...example,
      id: `PAR-${1000 + i}`,
      slug: `par-de-prueba-${i}`,
      title: `Par de prueba ${i}`,
      collaborator,
      order: 100 + i,
    });
  }
  await build();
  const page = (path) => readFile(join(temp, 'dist', path, 'index.html'), 'utf8');
  const cards = (html) => (html.match(/class="pair-card"/g) ?? []).length;
  assert.equal(cards(await page('pares')), 63);
  assert.equal(cards(await page('armarios/maria')), 23);
  assert.equal(cards(await page('armarios/prueba')), 20);
  await assert.rejects(page('armarios/un-par'), { code: 'ENOENT' });
  await assert.rejects(page('armarios/sin-armario'), { code: 'ENOENT' });
  assert.match(await page('pares/par-de-prueba-59'), /Colaboración anónima/);
  for (let i = 0; i < 60; i++) assert.match(await page(`pares/par-de-prueba-${i}`), /<h1>/);

  const invalidPath = join(content, 'pares/error.json');
  await json(invalidPath, {
    ...example,
    id: 'PAR-9999',
    collaborator: 'no-existe',
    slug: 'referencia-invalida',
  });
  await assert.rejects(build(), (error) =>
    /colaboradora inexistente/.test(error.stdout + error.stderr),
  );
  await json(invalidPath, { ...example, id: 'PAR-9999' });
  await assert.rejects(build(), (error) =>
    /Duplicado: ruta de par/.test(error.stdout + error.stderr),
  );
  console.log(
    'Crecimiento verificado: 63 pares, armarios automáticos, anonimato y datos inválidos rechazados.',
  );
} finally {
  await rm(temp, { recursive: true, force: true });
}
