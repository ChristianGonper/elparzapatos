import { parse, stringify } from 'yaml';
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
const build = (overrides = {}) =>
  execute(process.execPath, [join(source, 'node_modules/astro/bin/astro.mjs'), 'build'], {
    cwd: temp,
    env: {
      ...Object.fromEntries(
        Object.entries(process.env).filter(
          ([key]) =>
            !['PUBLIC_SITE_URL', 'PUBLIC_LAUNCH_READY', 'PUBLIC_INSTAGRAM_READY'].includes(key),
        ),
      ),
      ...overrides,
    },
    maxBuffer: 5_000_000,
  });

try {
  for (const path of ['src', 'public', 'astro.config.mjs', 'package.json'])
    await cp(join(source, path), join(temp, path), { recursive: true });
  await symlink(join(source, 'node_modules'), join(temp, 'node_modules'), 'dir');
  const content = join(temp, 'src/content');
  const raw = await readFile(join(content, 'pares/par-0003.mdx'), 'utf8');
  const [, frontmatter, body] = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const example = parse(frontmatter);
  const article = (path, data, text = body) =>
    writeFile(path, '---\n' + stringify(data) + '---\n\n' + text);
  await mkdir(join(content, 'colaboradoras'), { recursive: true });
  await json(join(content, 'colaboradoras/prueba.json'), {
    slug: 'prueba',
    name: 'Colaboradora 07',
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
    await article(
      join(content, `pares/prueba-${i}.mdx`),
      {
        ...example,
        id: `PAR-${1000 + i}`,
        slug: `par-de-prueba-${i}`,
        title: `Par de prueba ${i}`,
        imageSet: i === 20 ? 'maria-burdeos' : example.imageSet,
        collaborator,
        brand: collaborator ? example.brand : undefined,
        order: 100 + i,
        status: [0, 1, 20].includes(i) ? 'published' : 'draft',
      },
      collaborator ? body : body.replace(/<Cita>[\s\S]*?<\/Cita>\s*/g, ''),
    );
    if (i === 0) {
      const quote = body.match(/<Cita>[\s\S]*?<\/Cita>/)[0];
      const reordered = body
        .replace(quote, '')
        .replace('<FotoPrincipal />', quote + '\n\n<FotoPrincipal />');
      await article(
        join(content, 'pares/prueba-0.mdx'),
        {
          ...example,
          id: 'PAR-1000',
          slug: 'par-de-prueba-0',
          collaborator: 'maria',
          order: 100,
          status: 'published',
        },
        reordered,
      );
    }
  }
  await build();
  const page = (path) => readFile(join(temp, 'dist', path, 'index.html'), 'utf8');
  const cards = (html) => (html.match(/class="pair-card"/g) ?? []).length;
  assert.equal(cards(await page('pares')), 63);
  assert.equal(cards(await page('armarios/maria')), 23);
  assert.equal(cards(await page('armarios/prueba')), 20);
  assert.match(await page('armarios/prueba'), /Colaboradora 07/);
  assert.match(await page('pares/par-de-prueba-20'), /Colaboradora 07/);
  await assert.rejects(page('armarios/un-par'), { code: 'ENOENT' });
  await assert.rejects(page('armarios/sin-armario'), { code: 'ENOENT' });
  assert.match(await page('pares/par-de-prueba-59'), /Colaboración anónima/);
  assert.doesNotMatch(await page('pares/par-de-prueba-59'), /class="quote-block"|<dt>Marca<\/dt>/);
  for (let i = 0; i < 60; i++) assert.match(await page(`pares/par-de-prueba-${i}`), /<h1>/);

  const reorderedPage = await page('pares/par-de-prueba-0');
  assert.ok(
    reorderedPage.indexOf('class="quote-block"') <
      reorderedPage.indexOf('class="article-hero wrap"'),
  );
  await build({ PUBLIC_SITE_URL: 'https://example.com', PUBLIC_LAUNCH_READY: 'true' });
  assert.equal(cards(await page('pares')), 3);
  assert.equal(cards(await page('armarios/maria')), 2);
  assert.match(
    await page('pares/par-de-prueba-20'),
    /og:image[^>]+maria-burdeos\/vista-05-1600.webp/,
  );
  await assert.rejects(page('pares/bailarinas-rejilla-flores'), { code: 'ENOENT' });
  await assert.rejects(page('armarios/prueba'), { code: 'ENOENT' });
  const invalidPath = join(content, 'pares/error.mdx');
  await article(invalidPath, {
    ...example,
    id: 'PAR-9999',
    collaborator: 'no-existe',
    slug: 'referencia-invalida',
  });
  await assert.rejects(build(), (error) =>
    /colaboradora inexistente/.test(error.stdout + error.stderr),
  );
  await article(invalidPath, { ...example, id: 'PAR-9999' });
  await assert.rejects(build(), (error) =>
    /Duplicado: ruta de par/.test(error.stdout + error.stderr),
  );
  await rm(join(content, 'pares'), { recursive: true });
  await mkdir(join(content, 'pares'));
  await build();
  assert.equal(cards(await page('pares')), 0);
  assert.doesNotMatch(await page(''), /class="home-feature"/);
  assert.match(await page('armarios'), /están por llegar/);
  console.log(
    'Crecimiento verificado: 63 pares, armarios automáticos, anonimato y datos inválidos rechazados.',
  );
} finally {
  await rm(temp, { recursive: true, force: true });
}
