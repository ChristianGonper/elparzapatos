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
            ![
              'PUBLIC_SITE_URL',
              'PUBLIC_LAUNCH_READY',
              'PUBLIC_INSTAGRAM_READY',
              'PUBLIC_INCLUDE_DRAFTS',
            ].includes(key),
        ),
      ),
      ...overrides,
    },
    maxBuffer: 5_000_000,
  });

try {
  for (const path of ['src', 'public', 'astro.config.mjs', 'package.json'])
    await cp(join(source, path), join(temp, path), { recursive: true });
  await symlink(
    join(source, 'node_modules'),
    join(temp, 'node_modules'),
    process.platform === 'win32' ? 'junction' : 'dir',
  );
  const content = join(temp, 'src/content');
  const raw = (await readFile(join(content, 'pares/par-0003.mdx'), 'utf8')).replace(/\r\n?/g, '\n');
  const [, frontmatter, body] = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const example = parse(frontmatter);
  const article = (path, data, text = body) =>
    writeFile(
      path,
      '---\n' + stringify(data, { defaultStringType: 'QUOTE_SINGLE' }) + '---\n\n' + text,
    );
  await mkdir(join(content, 'colaboradoras'), { recursive: true });
  await json(join(content, 'colaboradoras/prueba.json'), {
    slug: 'prueba',
    anonymous: 7,
    wardrobe: true,
  });
  await json(join(content, 'colaboradoras/anonima-sin-armario.json'), {
    slug: 'colaboradora-12',
    anonymous: 12,
  });
  await json(join(content, 'colaboradoras/centena.json'), {
    slug: 'colaboradora-107',
    anonymous: 107,
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
            : i === 41
              ? 'sin-armario'
              : i === 42
                ? 'centena'
                : 'anonima-sin-armario';
    const bare = i >= 43;
    // Unos pocos de otros grupos, para contar por tipo en la portada.
    const type = { 50: 'Salones', 51: 'Salones', 52: 'Sandalias de tacón', 53: 'Cuñas' }[i];
    await article(
      join(content, `pares/prueba-${i}.mdx`),
      {
        ...example,
        id: `PAR-${1000 + i}`,
        slug: `par-de-prueba-${i}`,
        title: `Par de prueba ${i}`,
        imageSet: i === 20 ? 'maria-burdeos' : example.imageSet,
        collaborator,
        brand: bare ? undefined : example.brand,
        order: 100 + i,
        status: [0, 1, 20].includes(i) ? 'published' : 'draft',
        publishedAt:
          i === 0 ? '2026-10-01' : i === 1 ? '2026-10-02' : i === 20 ? '2026-10-03' : undefined,
        model: i === 20 ? 'Modelo de prueba' : undefined,
        type: type ?? example.type,
        // Sin invitación propia, el par cierra con la genérica.
        invitation: bare && i !== 50 ? undefined : example.invitation,
        homeDetail: [25, 51].includes(i)
          ? { label: 'Prueba', title: `Detalle de prueba ${i}`, text: 'Una frase.', image: 2 }
          : undefined,
      },
      bare ? body.replace(/<Cita>[\s\S]*?<\/Cita>\s*/g, '') : body,
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
          publishedAt: '2026-10-01',
        },
        reordered,
      );
    }
  }
  await build({ PUBLIC_INCLUDE_DRAFTS: 'true' });
  const page = (path) => readFile(join(temp, 'dist', path, 'index.html'), 'utf8');
  const cards = (html) => (html.match(/class="pair-card"/g) ?? []).length;
  assert.equal(cards(await page('pares')), 63);
  assert.equal(cards(await page('armarios/maria')), 23);
  assert.equal(cards(await page('armarios/prueba')), 20);
  assert.match(await page('armarios/prueba'), /Colaboradora 07/);
  assert.match(
    await page('armarios/prueba'),
    /content="Los 20 pares que han compartido con El Par, juntos y mirados de cerca\."/,
  );
  assert.match(
    await page('armarios/maria'),
    /content="Los 23 pares que María ha compartido con El Par/,
  );
  assert.match(await page('pares/par-de-prueba-20'), /Colaboradora 07/);
  assert.match(await page('pares/par-de-prueba-20'), /<dt>Modelo<\/dt><dd>Modelo de prueba/);
  await assert.rejects(page('armarios/un-par'), { code: 'ENOENT' });
  await assert.rejects(page('armarios/sin-armario'), { code: 'ENOENT' });
  assert.match(await page('pares/par-de-prueba-59'), /Colaboradora 12/);
  assert.match(await page('pares/par-de-prueba-42'), /Fotos de Colaboradora 107/);
  await assert.rejects(page('armarios/colaboradora-12'), { code: 'ENOENT' });
  assert.doesNotMatch(await page('pares/par-de-prueba-59'), /class="quote-block"|<dt>Marca<\/dt>/);
  for (let i = 0; i < 60; i++) assert.match(await page(`pares/par-de-prueba-${i}`), /<h1>/);

  // Portada con muchos pares y dos armarios: todo lo que depende de los datos aparece solo.
  const home = await page('');
  // La vista de revisión lleva la ayuda para medir puntos.
  assert.match(home, /measure-toggle/);
  const section = (html, name) =>
    html.match(new RegExp(`class="[^"]*${name}[\\s\\S]*?</section>`))?.[0] ?? '';
  assert.equal(cards(section(home, 'home-latest')), 4);
  assert.equal(cards(home), 4);
  assert.match(section(home, 'home-latest'), /Seguir mirando/);
  assert.equal((home.match(/class="home-wardrobe-card"/g) ?? []).length, 2);
  assert.match(section(home, 'home-wardrobes'), /href="\/armarios\/"[^>]*>\s*Ver los armarios/);
  assert.doesNotMatch(home, /class="wrap section home-wardrobe"/);
  const kind = (name, text) =>
    assert.match(home, new RegExp(`<h3>${name}</h3><p>${text}</p>`), name);
  kind('Bailarinas', '59 pares');
  kind('Tacones y tiras', '3 pares');
  kind('Cuñas y alpargatas', '1 par');
  kind('Plataformas', 'Aún no hay ninguno. ¿Tienes unos\\?');
  // Detalles: sin repetir grupo ni colaboradora mientras se pueda; sin fotos de ejemplo si sobran.
  const detailLinks = [
    ...section(home, 'home-details').matchAll(/<a class="text-link" href="([^"]+)"/g),
  ].map((match) => match[1]);
  assert.deepEqual(detailLinks, [
    '/pares/bailarinas-manchas-leopardo/',
    '/pares/par-de-prueba-51/',
    '/pares/slippers-burdeos-borde-rosa/',
  ]);
  assert.doesNotMatch(home, /Un tacón que cambia la silueta/);
  // Con más de un armario, cada armario lleva a los de otras colaboradoras.
  assert.match(
    await page('armarios/maria'),
    /href="\/armarios\/"[^>]*>\s*Ver pares de otras colaboradoras/,
  );
  assert.match(await page('armarios/maria'), /Un borde rosa, flores sobre rejilla/);
  assert.match(
    await page('armarios/prueba'),
    /20 pares de Colaboradora 07\. Míralos juntos y fíjate en lo que se repite\./,
  );
  // «Más retratos»: primero el mismo armario y, si no tiene, los más recientes. Máximo tres.
  const more = (html) => [
    ...(html.match(/class="wrap more-portraits"[\s\S]*?<\/section>/)?.[0] ?? '').matchAll(
      /class="pair-card" href="([^"]+)"[\s\S]*?<span>\s*([^<]*?)\s*<\/span>/g,
    ),
  ];
  const fromMaria = more(await page('pares/par-de-prueba-5'));
  assert.equal(fromMaria.length, 3);
  for (const [, href, meta] of fromMaria) {
    assert.notEqual(href, '/pares/par-de-prueba-5/');
    assert.match(meta, /María$/);
  }
  assert.deepEqual(
    more(await page('pares/par-de-prueba-41')).map((match) => match[1]),
    ['/pares/par-de-prueba-20/', '/pares/par-de-prueba-1/', '/pares/par-de-prueba-0/'],
  );
  // Invitación final: la propia del par, en su género, o la genérica.
  assert.match(
    await page('pares/par-de-prueba-5'),
    /¿Y las tuyas, de cerca\?[\s\S]*Manda las tuyas/,
  );
  assert.match(await page('pares/par-de-prueba-50'), /¿Y los tuyos\?[\s\S]*Manda los tuyos/);
  assert.match(await page('pares/par-de-prueba-59'), /¿Qué tendrán los tuyos\?[\s\S]*Manda tu par/);

  const reorderedPage = await page('pares/par-de-prueba-0');
  assert.ok(
    reorderedPage.indexOf('class="quote-block"') <
      reorderedPage.indexOf('class="article-hero wrap"'),
  );
  // La compilación por defecto excluye borradores aunque la indexación no esté activada.
  await build();
  // La compilación normal no lleva la ayuda para medir puntos ni nada del laboratorio.
  assert.doesNotMatch(await page(''), /measure-toggle|elpar-medir|lab-toggle|data-lab/);
  assert.equal(cards(await page('pares')), 3);
  await assert.rejects(page('pares/bailarinas-rejilla-flores'), { code: 'ENOENT' });
  assert.match(await page(''), /noindex, nofollow/);
  assert.match(await page(''), /home-feature-photo[^>]+par-de-prueba-20/);
  // Con tres pares y un armario: sin «Lo último», el armario como siempre y ningún detalle
  // marcado, así que salen las tres fotos de ejemplo, sin enlace.
  const smallHome = await page('');
  assert.doesNotMatch(smallHome, /home-latest|home-wardrobe-card/);
  assert.match(smallHome, /Entrar en el Armario de María/);
  assert.equal((smallHome.match(/class="look-card"/g) ?? []).length, 3);
  assert.doesNotMatch(smallHome, /Leer el retrato/);
  assert.match(smallHome, /<h3>Bailarinas<\/h3><p>3 pares<\/p>/);
  assert.match(await page('armarios/maria'), /href="\/pares\/"[^>]*>\s*Ver todos los pares/);
  await build({ PUBLIC_SITE_URL: 'https://example.com', PUBLIC_LAUNCH_READY: 'true' });
  assert.equal(cards(await page('pares')), 3);
  assert.equal(cards(await page('armarios/maria')), 2);
  // La imagen de compartir sale de la foto principal de ese par: Astro nombra cada variante con
  // el nombre y la huella de su foto de origen («vista-05.<huella>_…»).
  const photoOf = (html, pattern) => html.match(pattern)?.[1];
  const sharedPhoto = photoOf(
    await page('pares/par-de-prueba-20'),
    /og:image" content="https:\/\/example\.com\/_astro\/(vista-05\.[^_"]+)_[^"]+\.jpeg"/,
  );
  assert.ok(sharedPhoto);
  assert.equal(
    photoOf(await page('pares/par-de-prueba-20'), /class="article-hero[\s\S]*?\/_astro\/([^_"]+)_/),
    sharedPhoto,
  );
  const otherPhoto = photoOf(
    await page('pares/par-de-prueba-0'),
    /og:image" content="[^"]*\/_astro\/([^_"]+)_/,
  );
  assert.ok(otherPhoto);
  assert.notEqual(otherPhoto, sharedPhoto);
  await assert.rejects(page('pares/bailarinas-rejilla-flores'), { code: 'ENOENT' });
  await assert.rejects(page('armarios/prueba'), { code: 'ENOENT' });
  await assert.rejects(
    build({ PUBLIC_LAUNCH_READY: 'true', PUBLIC_INCLUDE_DRAFTS: 'true' }),
    (error) => /no puede incluir borradores/.test(error.stdout + error.stderr),
  );
  const invalidPath = join(content, 'pares/error.mdx');
  await article(invalidPath, {
    ...example,
    id: 'PAR-9999',
    slug: 'sin-fecha',
    status: 'published',
  });
  await assert.rejects(build(), (error) => /publishedAt/.test(error.stdout + error.stderr));
  await article(invalidPath, {
    ...example,
    id: 'PAR-9999',
    slug: 'fecha-invalida',
    status: 'published',
    publishedAt: '2026-02-30',
  });
  await assert.rejects(build(), (error) =>
    /fecha de publicación debe ser válida/.test(error.stdout + error.stderr),
  );
  await article(invalidPath, {
    ...example,
    id: 'PAR-9999',
    collaborator: 'no-existe',
    slug: 'referencia-invalida',
  });
  await assert.rejects(build(), (error) =>
    /colaboradora inexistente/.test(error.stdout + error.stderr),
  );
  await article(invalidPath, {
    ...example,
    id: 'PAR-9999',
    collaborator: undefined,
    slug: 'sin-colaboradora',
  });
  await assert.rejects(build(), (error) => /collaborator/.test(error.stdout + error.stderr));
  await article(invalidPath, { ...example, id: 'PAR-9998', slug: 'valida-temporal' });
  const invalidContributor = join(content, 'colaboradoras/doble.json');
  await json(invalidContributor, { slug: 'doble', name: 'Doble', anonymous: 3 });
  await assert.rejects(build(), (error) => /no ambos/.test(error.stdout + error.stderr));
  await rm(invalidContributor);
  await article(invalidPath, { ...example, id: 'PAR-9999' });
  await assert.rejects(build(), (error) =>
    /Duplicado: ruta de par/.test(error.stdout + error.stderr),
  );
  await rm(join(content, 'pares'), { recursive: true });
  await mkdir(join(content, 'pares'));
  // Con un solo par no hay otros retratos que enseñar.
  await article(join(content, 'pares/unico.mdx'), {
    ...example,
    id: 'PAR-1000',
    slug: 'unico',
    status: 'published',
    publishedAt: '2026-10-01',
  });
  await build();
  assert.doesNotMatch(await page('pares/unico'), /more-portraits|Más retratos/);
  await rm(join(content, 'pares/unico.mdx'));
  await build();
  assert.equal(cards(await page('pares')), 0);
  assert.doesNotMatch(await page(''), /class="home-feature"/);
  assert.equal((await page('')).match(/kind-card empty/g)?.length, 4);
  assert.match(await page('armarios'), /están por llegar/);
  console.log(
    'Crecimiento verificado: 63 pares, armarios automáticos, anonimato y datos inválidos rechazados.',
  );
} finally {
  await rm(temp, { recursive: true, force: true });
}
