import { parse } from 'yaml';
import { test, expect } from '@playwright/test';
import { createRequire } from 'node:module';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
const require = createRequire(import.meta.url);
const axePath = require.resolve('axe-core/axe.min.js');
const readEntries = (folder: string) =>
  readdirSync(folder)
    .filter((file) => /\.(json|mdx)$/.test(file))
    .map((file) => ({
      id: file.replace(/\.(json|mdx)$/, ''),
      data: file.endsWith('.json')
        ? JSON.parse(readFileSync(join(folder, file), 'utf8'))
        : parse(readFileSync(join(folder, file), 'utf8').split('---')[1]),
    }));
const pairSources = readEntries('src/content/pares');
const expectedWardrobes = readEntries('src/content/colaboradoras')
  .filter((entry) => entry.data.wardrobe)
  .map((entry) => ({
    ...entry.data,
    pairs: pairSources.filter((pair) => pair.data.collaborator === entry.id),
  }))
  .filter((entry) => entry.pairs.length >= 2);
const routes = [
  '/',
  '/pares/',
  '/armarios/',
  ...expectedWardrobes.map((wardrobe) => `/armarios/${wardrobe.slug}/`),
  ...pairSources.map((pair) => `/pares/${pair.data.slug}/`),
  '/participa/',
  '/guia-de-fotos/',
  '/el-par/',
  '/glosario/',
  '/tus-fotos-y-tus-datos/',
];

for (const width of [320, 360, 390, 430, 768, 1024, 1440]) {
  test(`Todas las páginas funcionan sin desbordamientos a ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const pageErrors: string[] = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status(), route).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('h1')).toHaveCount(1);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
        route,
      ).toBe(true);
      const imagesLoaded = await page.locator('img[src]').evaluateAll(async (elements) => {
        return (
          await Promise.all(
            elements.map(async (element) => {
              if (!(element instanceof HTMLImageElement)) return false;
              element.loading = 'eager';
              try {
                await element.decode();
                return element.naturalWidth > 0;
              } catch {
                return false;
              }
            }),
          )
        ).every(Boolean);
      });
      expect(imagesLoaded, route).toBe(true);
      const emails = await page.locator('body').innerText();
      expect(
        (emails.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) ?? []).every(
          (email) => email === 'elparzapatos@proton.me',
        ),
      ).toBe(true);
    }
    expect(pageErrors).toEqual([]);
  });
}

test('El recorrido lleva de cualquier página a Cómo colaborar, a la guía y por último a Tally', async ({
  page,
}) => {
  const tally = 'a[href^="https://tally.so/"]';
  for (const route of routes) {
    await page.goto(route);
    const inPath = route === '/participa/' || route === '/guia-de-fotos/';
    await expect(page.locator('a.header-cta'), route).toHaveCount(inPath ? 0 : 1);
    if (!inPath) await expect(page.locator('a.header-cta')).toHaveAttribute('href', '/participa/');
    await expect(
      page.locator('.mobile-menu').getByRole('link', { name: 'Manda tu par', includeHidden: true }),
      route,
    ).toHaveCount(inPath ? 0 : 1);
    await expect(page.locator('iframe')).toHaveCount(0);
    if (route === '/guia-de-fotos/') {
      await expect(page.locator(tally)).toHaveCount(2);
      await expect(page.locator(`.quick-send ${tally}`)).toHaveCount(1);
      await expect(page.locator(`#enviar ${tally}`)).toHaveAttribute(
        'href',
        'https://tally.so/r/Npj2bl',
      );
    } else if (route === '/participa/') {
      await expect(page.locator(tally)).toHaveCount(1);
      await expect(page.locator(`.quick-send ${tally}`)).toHaveCount(1);
      await expect(page.locator(`.invitation ${tally}`)).toHaveCount(0);
    } else await expect(page.locator(tally), route).toHaveCount(0);
  }
  await page.goto('/');
  await page.locator('.invitation').getByRole('link', { name: 'Manda tu par' }).click();
  await expect(page).toHaveURL('/participa/');
  await expect(page.locator('main a[href^="/guia-de-fotos/"]')).toHaveCount(1);
  await page.locator('.invitation').getByRole('link', { name: 'Qué fotos hacer' }).click();
  await expect(page).toHaveURL('/guia-de-fotos/');
  await expect(page.locator('main a[href^="#"]')).toHaveCount(0);
  await expect(page.locator('.photo-checklist')).toHaveCount(0);
  const send = page.locator('#enviar').getByRole('link', { name: 'Enviar mis fotos' });
  await send.scrollIntoViewIfNeeded();
  await expect(send).toBeInViewport();
  await page.goto('/guia-de-fotos/#enviar');
  await expect(send).toBeInViewport();
});

test('Quien ya tiene las fotos encuentra arriba el acceso directo a Tally', async ({ page }) => {
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: width < 600 ? 844 : 800 });
    for (const route of ['/participa/', '/guia-de-fotos/']) {
      await page.goto(route);
      const quick = page
        .locator('.quick-send')
        .getByRole('link', { name: 'Envíalas directamente' });
      await expect(quick).toHaveAttribute('href', 'https://tally.so/r/Npj2bl');
      await expect(quick, `${route} a ${width}px`).toBeInViewport();
    }
  }
});

test('La portada saca sus detalles de los retratos y las fotos de ejemplo van sin enlace', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('.feature-footnote')).toHaveCount(0);
  await expect(page.locator('.home-feature')).not.toContainText('Fotos de');
  const details = page.locator('.home-details');
  await expect(details.locator('.editorial-intro .eyebrow')).toHaveText('En qué nos fijamos');
  await expect(details.locator('.look-card')).toHaveCount(3);
  await expect(page.locator('.look-note')).toHaveCount(0);
  await expect(page.locator('main')).not.toContainText('Fotos de ejemplo');
  const featured = await page.locator('.home-feature-photo').getAttribute('href');
  const withDetail = pairSources.filter(
    (pair) => pair.data.homeDetail && `/pares/${pair.data.slug}/` !== featured,
  );
  const linked = details.locator('.look-card a');
  await expect(linked).toHaveCount(Math.min(3, withDetail.length));
  for (const href of await linked.evaluateAll((links) => links.map((a) => a.getAttribute('href'))))
    expect(withDetail.map((pair) => `/pares/${pair.data.slug}/`)).toContain(href);
  await expect(details.getByRole('link', { name: 'Ver todos los pares' })).toHaveAttribute(
    'href',
    '/pares/',
  );
  // «Lo último que hemos mirado» espera a que haya cinco pares.
  await expect(page.locator('.home-latest')).toHaveCount(pairSources.length >= 5 ? 1 : 0);
  const kinds = page.locator('.home-final .kind-card');
  await expect(kinds).toHaveCount(4);
  await expect(kinds.first()).toContainText('Bailarinas');
  await expect(kinds.first()).toContainText(`${pairSources.length} pares`);
  await expect(page.locator('.home-final .kind-card.empty')).toHaveCount(3);
  await expect(page.locator('.home-final .kind-card.empty').first()).toContainText(
    'Aún no hay ninguno. ¿Tienes unos?',
  );
});

test('En móvil el destacado abre la portada y el lema viene después', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const photo = await page.locator('.home-feature-photo').boundingBox();
  const motto = await page.locator('.home-intro').boundingBox();
  expect(photo!.y).toBeLessThan(200);
  expect(motto!.y).toBeGreaterThan(photo!.y + photo!.height);
  await expect(
    page.locator('.home-intro').getByRole('link', { name: 'Enviar mis fotos' }),
  ).toHaveCount(0);
});

test('Los detalles se leen como título, foto y cuerpo en móvil', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/pares/bailarinas-rejilla-flores/');
  for (const section of await page.locator('.article-section').all()) {
    const heading = await section.locator('h2').boundingBox();
    const photo = await section.locator('figure').boundingBox();
    const body = await section.locator('.article-text').boundingBox();
    expect(heading!.y + heading!.height).toBeLessThanOrEqual(photo!.y);
    expect(photo!.y + photo!.height).toBeLessThanOrEqual(body!.y);
  }
});

test('La foto se abre en el visor al pulsarla en cualquier punto, entera y sin botón de ampliar', async ({
  page,
}) => {
  await page.goto('/pares/bailarinas-rejilla-flores/');
  await expect(page.locator('.zoom-mark')).toHaveCount(0);
  await expect(page.getByRole('button', { name: /agrandar|ampliar/i })).toHaveCount(0);
  const opener = page.locator('.article-hero a.photo-zoom');
  await expect(opener).toHaveAccessibleName(/^Ver en grande: .*María/);
  const thumbnail = (await opener.boundingBox())!;
  await opener.click({ position: { x: thumbnail.width - 12, y: thumbnail.height - 12 } });
  const viewer = page.getByRole('dialog', { name: 'Fotografía ampliada' });
  await expect(viewer).toBeVisible();
  const image = viewer.locator('[aria-hidden="false"] img.pswp__img:not(.pswp__img--placeholder)');
  await expect(image).toHaveAttribute('alt', /María/);
  await expect(viewer.locator('.photo-viewer-caption')).toContainText('María');
  const screen = page.viewportSize()!;
  await expect
    .poll(async () => {
      const box = (await image.boundingBox())!;
      return (
        box.x >= 0 &&
        box.y >= 0 &&
        box.x + box.width <= screen.width &&
        box.y + box.height <= screen.height
      );
    })
    .toBe(true);
  await page.keyboard.press('Escape');
  await expect(viewer).toBeHidden();
  await expect(opener).toBeFocused();
});

test('El visor acerca con un clic, con la rueda y con su botón, y se cierra con el botón', async ({
  page,
}) => {
  await page.goto('/pares/bailarinas-rejilla-flores/');
  const opener = page.locator('.article-hero a.photo-zoom');
  const viewer = page.getByRole('dialog', { name: 'Fotografía ampliada' });
  const image = viewer.locator('[aria-hidden="false"] img.pswp__img:not(.pswp__img--placeholder)');
  const width = async () => (await image.boundingBox())!.width;
  await opener.click();
  await expect(viewer).toHaveClass(/pswp--zoom-allowed/);
  await expect(viewer.getByRole('button', { name: 'Acercar o alejar' })).toBeVisible();
  const complete = await width();
  await image.click();
  await expect(viewer).toHaveClass(/pswp--zoomed-in/);
  await expect.poll(width).toBeGreaterThan(complete * 1.3);
  await viewer.getByRole('button', { name: 'Acercar o alejar' }).click();
  await expect(viewer).not.toHaveClass(/pswp--zoomed-in/);
  await expect.poll(width).toBeCloseTo(complete, 0);
  await page.mouse.move(640, 360);
  await page.mouse.wheel(0, -400);
  await expect.poll(width).toBeGreaterThan(complete * 1.1);
  await viewer.getByRole('button', { name: 'Cerrar fotografía' }).click();
  await expect(viewer).toBeHidden();
});

test('En móvil el visor también deja acercar la foto', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();
  await page.goto('http://localhost:4322/pares/bailarinas-rejilla-flores/');
  await page.locator('.article-section a.photo-zoom').first().tap();
  const viewer = page.getByRole('dialog', { name: 'Fotografía ampliada' });
  await expect(viewer).toBeVisible();
  await expect(viewer).toHaveClass(/pswp--zoom-allowed/);
  await expect(viewer.getByRole('button', { name: 'Acercar o alejar' })).toBeVisible();
  await context.close();
});

test('Compartir pares y armarios permite copiar o usar el menú del dispositivo', async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async (url: string) => {
          document.body.dataset.copiedUrl = url;
        },
      },
    });
    Object.defineProperty(navigator, 'share', {
      configurable: true,
      value: async (data: { title: string; url: string }) => {
        document.body.dataset.sharedUrl = data.url;
        document.body.dataset.sharedTitle = data.title;
      },
    });
  });
  for (const [route, kind] of [
    ['/pares/bailarinas-rejilla-flores/', 'par'],
    ['/armarios/maria/', 'armario'],
  ]) {
    await page.goto(route);
    await page.getByRole('button', { name: 'Copiar enlace', exact: true }).click();
    await expect(page.locator('body')).toHaveAttribute(
      'data-copied-url',
      `http://localhost:4322${route}`,
    );
    await page.getByRole('button', { name: `Compartir este ${kind}`, exact: false }).click();
    await expect(page.locator('body')).toHaveAttribute(
      'data-shared-url',
      `http://localhost:4322${route}`,
    );
    await expect(page.locator('.share-status')).toHaveText('Compartido.');
  }
});

test('Si el portapapeles no está disponible se puede copiar el enlace manualmente', async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async () => {
          throw new Error('No disponible');
        },
      },
    });
    Object.defineProperty(navigator, 'share', { configurable: true, value: undefined });
  });
  await page.goto('/armarios/maria/');
  await expect(page.getByRole('button', { name: 'Compartir este armario' })).not.toBeVisible();
  await page.getByRole('button', { name: 'Copiar enlace' }).click();
  await expect(page.getByRole('textbox', { name: 'Enlace de este armario' })).toHaveValue(
    'http://localhost:4322/armarios/maria/',
  );
  await expect(page.getByRole('textbox', { name: 'Enlace de este armario' })).toBeFocused();
});

test('Participación explica los pasos, el resultado y las condiciones vigentes', async ({
  page,
}) => {
  await page.goto('/participa/');
  await expect(page.locator('.steps li')).toHaveCount(4);
  await expect(page.locator('.steps li').last()).toContainText('tienes 48 horas');
  await expect(page.locator('.steps-notes, .participation-note')).toHaveCount(0);
  const faq = page.locator('.faq-list details');
  await expect(faq).toHaveCount(7);
  await expect(faq.filter({ hasText: '¿Puedo pedir que lo quitéis?' })).toContainText(
    'máximo de 48 horas',
  );
  // Que se pueden mandar varios pares se dice pronto: es la segunda pregunta.
  await expect(faq.nth(1)).toContainText('¿Puedo mandar más de un par?');
  await expect(faq.nth(1)).toContainText('desde el segundo, tienes tu armario');
  await expect(page.locator('.reassurance-strip li')).toHaveText([
    'Con el móvil',
    'Tantos pares como quieras',
    'Lo lees antes que nadie',
  ]);
  await expect(page.locator('.photo-guide-summary')).toHaveCount(0);
  const next = page.locator('.invitation.with-image');
  await expect(next).toContainText('Seis fotos');
  await expect(next.locator('img')).toBeVisible();
  await expect(next.getByRole('link', { name: 'Qué fotos hacer' })).toHaveAttribute(
    'href',
    '/guia-de-fotos/',
  );
  await expect(faq.filter({ hasText: '¿Cómo aparezco?' })).toContainText('«Colaboradora 07»');
  await expect(page.locator('.collaboration-hero .button')).toHaveCount(0);
  await page.goto('/guia-de-fotos/#vista-07');
  await expect(page.locator('#vista-07')).toBeInViewport();
  await page.goto('/participa/');
  await page.locator('.hero-image').getByRole('link').click();
  await expect(page).toHaveURL('/pares/bailarinas-rejilla-flores/');
});

test('El menú móvil abre por teclado y se cierra con Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const summary = page.locator('.mobile-menu summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.mobile-menu')).toHaveAttribute('open', '');
  await expect(
    page
      .getByRole('navigation', { name: 'Navegación móvil' })
      .getByRole('link', { name: 'Armarios', exact: true }),
  ).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('.mobile-menu')).not.toHaveAttribute('open', '');
  await expect(summary).toBeFocused();
});

test('Las definiciones abren, enlazan al glosario y se cierran', async ({ page }) => {
  await page.goto('/pares/bailarinas-rejilla-flores/');
  const button = page.getByRole('button', { name: 'rejilla', exact: true });
  const popover = page.locator('.term-popover:popover-open');
  // Al llegar con el teclado se abre; Tab entra en ella y Esc la cierra.
  await page.locator('.article-hero a.photo-zoom').focus();
  while (!(await button.evaluate((element) => element === document.activeElement)))
    await page.keyboard.press('Tab');
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Tab');
  await expect(popover.getByRole('button', { name: 'Cerrar definición' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(popover).toHaveCount(0);
  await expect(button).toBeFocused();
  // Intro la deja fija.
  await page.keyboard.press('Enter');
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await expect(popover).toBeVisible();
  await expect(popover.getByRole('link')).toHaveAttribute('href', '/glosario/#rejilla');
  await expect(popover.getByRole('link')).toContainText('Todas las palabras, en el glosario');
  await page.keyboard.press('Escape');
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await expect(button).toBeFocused();
});

test('En escritorio la definición se abre al pasar el ratón, junto a la palabra', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/pares/bailarinas-rejilla-flores/');
  const button = page.getByRole('button', { name: 'rejilla', exact: true });
  const popover = page.getByRole('dialog', { name: 'Definición de Rejilla' });
  await button.hover();
  await expect(popover).toBeVisible();
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  const word = (await button.boundingBox())!;
  const box = (await popover.boundingBox())!;
  expect(
    Math.min(Math.abs(box.y - (word.y + word.height)), Math.abs(word.y - (box.y + box.height))),
  ).toBeLessThan(20);
  // Se puede pasar de la palabra a la definición sin que se cierre.
  await popover.getByRole('link').hover();
  await expect(popover).toBeVisible();
  await page.mouse.move(5, 400);
  await expect(popover).toBeHidden();
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  // Con un clic se queda abierta aunque el ratón se vaya; un clic fuera la cierra.
  await button.click();
  await page.mouse.move(5, 400);
  await page.waitForTimeout(400);
  await expect(popover).toBeVisible();
  await page.mouse.click(5, 400);
  await expect(popover).toBeHidden();
});

test('En el móvil la definición se abre con un toque y se cierra con otro o tocando fuera', async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();
  await page.goto('http://localhost:4322/pares/bailarinas-rejilla-flores/');
  const button = page.getByRole('button', { name: 'rejilla', exact: true });
  const popover = page.getByRole('dialog', { name: 'Definición de Rejilla' });
  await button.tap();
  await expect(popover).toBeVisible();
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await button.tap();
  await expect(popover).toBeHidden();
  await button.tap();
  await expect(popover).toBeVisible();
  await page.locator('h1').tap();
  await expect(popover).toBeHidden();
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await context.close();
});

test('La guía contiene el set completo y se puede imprimir desde el navegador', async ({
  page,
}) => {
  await page.goto('/guia-de-fotos/');
  await expect(page.locator('.guide-card')).toHaveCount(7);
  const sources = await page
    .locator('.guide-card img')
    .evaluateAll((images) => images.map((img) => img.getAttribute('src')));
  expect(new Set(sources).size).toBe(6);
  await expect(page.locator('.guide-number')).toHaveCount(1);
  await expect(page.locator('.guide-card').last()).toContainText('Y además, los detalles');
  await expect(page.locator('#print-guide')).toHaveCount(0);
  // La guía de tacones, con su ilustración, vuelve cuando haya fotos de un par de tacón.
  await expect(page.locator('.tacon-guide, #tacones, .heel-note')).toHaveCount(0);
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.site-header')).not.toBeVisible();
  await expect(page.locator('.site-footer')).not.toBeVisible();
  await expect(page.locator('.guide-card').first()).toBeVisible();
});

test('En el móvil cada vista de la guía enseña la foto antes que su texto', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/guia-de-fotos/');
  const cards = await page.locator('.guide-card').all();
  expect(cards.length).toBe(7);
  const boxes = await Promise.all(
    cards.map(async (card) => ({
      photo: (await card.locator('a.photo-zoom').boundingBox())!,
      text: (await card.locator('figcaption').boundingBox())!,
    })),
  );
  boxes.forEach(({ photo, text }, index) => {
    expect(photo.y + photo.height).toBeLessThanOrEqual(text.y);
    expect(Math.abs(photo.x - text.x)).toBeLessThan(2);
    const next = boxes[index + 1];
    // El texto queda más cerca de su foto que de la foto de la vista siguiente.
    if (next)
      expect(next.photo.y - (text.y + text.height)).toBeGreaterThan(
        text.y - (photo.y + photo.height),
      );
  });
});

test('En escritorio la guía enseña tres vistas por fila, con fotos más pequeñas', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/guia-de-fotos/');
  const photos = page.locator('.guide-card a.photo-zoom');
  const first = (await photos.nth(0).boundingBox())!;
  const third = (await photos.nth(2).boundingBox())!;
  const detail = (await photos.nth(6).boundingBox())!;
  expect(first.width).toBeLessThan(400);
  expect(third.y).toBeCloseTo(first.y, 0);
  expect(detail.width).toBeCloseTo(first.width, 0);
});

test('Cada palabra del glosario lleva al par en el que aparece', async ({ page }) => {
  await page.goto('/glosario/');
  const links = page.locator('.glossary-list section a.text-link');
  expect(await links.count()).toBeGreaterThan(0);
  for (const link of await links.all()) {
    const name = await link.locator('xpath=..').locator('h2').innerText();
    const href = await link.getAttribute('href');
    const html = await (await page.request.get(href!)).text();
    expect(html, `${name} → ${href}`).toContain(`Definición de ${name}`);
    await expect(link).toContainText('Verlo en ');
  }
});

test('Cada armario reúne sus pares y conecta con sus retratos', async ({ page }) => {
  for (const wardrobe of expectedWardrobes) {
    await page.goto('/armarios/');
    await page.getByRole('link', { name: new RegExp(`Armario de ${wardrobe.name}`) }).click();
    await expect(page).toHaveURL(`/armarios/${wardrobe.slug}/`);
    await expect(page.locator('.pair-card')).toHaveCount(wardrobe.pairs.length);
    for (const pair of wardrobe.pairs)
      await expect(page.locator(`.pair-card[href="/pares/${pair.data.slug}/"]`)).toBeVisible();
    // Con un solo armario, el botón con borde lleva a Pares y queda centrado bajo las tarjetas.
    const back = page.locator('.wardrobe-back a.button.outline');
    await expect(back).toHaveText(/Ver todos los pares/);
    await expect(back).toHaveAttribute('href', '/pares/');
    const box = (await back.boundingBox())!;
    const viewport = page.viewportSize()!;
    expect(Math.abs(box.x + box.width / 2 - viewport.width / 2)).toBeLessThan(20);
    await expect(page.locator('.page-heading .lead')).toHaveText(
      wardrobe.wardrobeIntro ?? new RegExp(`pares de ${wardrobe.name}\\.`),
    );
    await page.locator('.pair-card').first().click();
    await expect(
      page.getByRole('link', { name: `Armario de ${wardrobe.name}`, exact: true }),
    ).toBeVisible();
    await expect(page.locator('.article-credit')).toContainText(`Fotos de ${wardrobe.name}`);
  }
});

test('La tarjeta de cada armario deja ver en abanico que tiene más pares', async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/armarios/');
    for (const wardrobe of expectedWardrobes) {
      const total = wardrobe.pairs.length;
      const card = page.locator(`.wardrobe-card[href="/armarios/${wardrobe.slug}/"]`);
      await expect(card).toHaveAccessibleName(new RegExp(`${total} pares`));
      await expect(card.locator('.wardrobe-more')).toHaveCount(0);
      const extra = total - 2;
      await expect(card.locator('img.wardrobe-behind')).toHaveCount(Math.min(extra, 2));
      if (extra === 0) continue;
      // Los pares de detrás asoman al menos 12 px por arriba y por la derecha del segundo, también
      // en el móvil, y el abanico no se sale de su hueco.
      const box = (await card.locator('.wardrobe-stack').boundingBox())!;
      const top = (await card.locator('.wardrobe-stack img:not(.wardrobe-behind)').boundingBox())!;
      const last = (await card.locator(`img.wardrobe-behind-${Math.min(extra, 2)}`).boundingBox())!;
      expect(top.y - last.y).toBeGreaterThan(12);
      expect(last.x + last.width - (top.x + top.width)).toBeGreaterThan(12);
      expect(last.x + last.width).toBeLessThanOrEqual(box.x + box.width + 1);
      expect(last.y).toBeGreaterThanOrEqual(box.y - 1);
      expect(top.y + top.height).toBeLessThanOrEqual(box.y + box.height + 1);
    }
  }
});

test('Las páginas pasan las reglas de accesibilidad automatizadas', async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    await page.addScriptTag({ path: axePath });
    const violations = await page.evaluate(async () => {
      const axe = (
        window as unknown as {
          axe: {
            run: (options: object) => Promise<{
              violations: { id: string; impact: string; nodes: { target: string[] }[] }[];
            }>;
          };
        }
      ).axe;
      const result = await axe.run({
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] },
      });
      return result.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        targets: v.nodes.map((n) => n.target),
      }));
    });
    expect(violations, route).toEqual([]);
  }
});

test('La página no encontrada permite volver a los pares', async ({ page }) => {
  const response = await page.goto('/esta-pagina-no-existe/');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Por aquí no era');
  await page.getByRole('link', { name: 'Ir a Pares' }).click();
  await expect(page).toHaveURL('/pares/');
});

test('El contenido y el envío siguen disponibles sin JavaScript', async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto('http://localhost:4322/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Flores sobre una rejilla');
  await page.locator('.mobile-menu summary').click();
  await expect(
    page
      .getByRole('navigation', { name: 'Navegación móvil' })
      .getByRole('link', { name: 'Manda tu par' }),
  ).toHaveAttribute('href', '/participa/');
  await page.goto('http://localhost:4322/guia-de-fotos/');
  await expect(
    page.locator('#enviar').getByRole('link', { name: 'Enviar mis fotos' }),
  ).toHaveAttribute('href', 'https://tally.so/r/Npj2bl');
  // Sin visor, pulsar la foto abre su versión grande.
  await page.goto('http://localhost:4322/pares/bailarinas-rejilla-flores/');
  await page.locator('.article-hero a.photo-zoom').click();
  await expect(page).toHaveURL(/\/_astro\/vista-0\d\.[^/]+\.webp$/);
  await context.close();
});

test('Cada par cierra con su propia invitación y Pares ya no lleva la común', async ({ page }) => {
  for (const pair of pairSources) {
    await page.goto(`/pares/${pair.data.slug}/`);
    const invitation = page.locator('.invitation');
    await expect(invitation).toHaveCount(1);
    if (pair.data.invitation) {
      await expect(invitation.locator('h2')).toContainText(pair.data.invitation.title[1]);
      await expect(invitation).toContainText(pair.data.invitation.text);
    } else await expect(invitation).toContainText('¿Qué tendrán los tuyos?');
    await expect(invitation.locator('a.button')).toHaveAttribute('href', '/participa/');
  }
  await page.goto('/pares/');
  await expect(page.locator('.invitation')).toHaveCount(0);
  await expect(page.locator('.index-note')).toContainText('los miramos todos');
});

test('Qué es El Par presenta la marca entera encima del título', async ({ page }) => {
  await page.goto('/el-par/');
  const brand = (await page.locator('.about-brand').boundingBox())!;
  const title = (await page.locator('h1').boundingBox())!;
  expect(brand.y + brand.height).toBeLessThanOrEqual(title.y);
  await expect(page.locator('.about-brand')).toContainText('Zapatos en detalle');
  await expect(page.locator('h1')).toHaveText(/Un zapato,\s*mirado de cerca\./);
  await expect(page.locator('.about-principles .principle')).toHaveCount(4);
  await expect(page.locator('.invitation')).toContainText('El siguiente puede ser el tuyo');
});

test('Cada retrato termina con «Más retratos»: su armario primero, sin repetirse', async ({
  page,
}) => {
  for (const pair of pairSources) {
    await page.goto(`/pares/${pair.data.slug}/`);
    const cards = page.locator('.more-portraits .pair-card');
    await expect(cards).toHaveCount(Math.min(3, pairSources.length - 1));
    const hrefs = await cards.evaluateAll((links) => links.map((a) => a.getAttribute('href')));
    expect(hrefs).not.toContain(`/pares/${pair.data.slug}/`);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    const sameWardrobe = pairSources.filter(
      (other) => other !== pair && other.data.collaborator === pair.data.collaborator,
    );
    const first = hrefs.slice(0, Math.min(3, sameWardrobe.length));
    for (const href of first)
      expect(sameWardrobe.map((other) => `/pares/${other.data.slug}/`)).toContain(href);
  }
});

test('Ningún texto visible dice «análisis»', async ({ page }) => {
  for (const route of [...routes, '/404/']) {
    await page.goto(route);
    const text = await page.evaluate(
      () =>
        document.body.innerText +
        document.title +
        [...document.querySelectorAll('[alt], [aria-label], [title], meta[content]')]
          .map((element) =>
            ['alt', 'aria-label', 'title', 'content'].map((name) => element.getAttribute(name)),
          )
          .join(' '),
    );
    expect(text, route).not.toMatch(/an[aá]lisis/i);
  }
});

// Laboratorio de interacción y movimiento (bloque 7). Solo existe en la vista de revisión, que es
// la que sirven estas pruebas; su ausencia en la compilación normal la comprueba verify-growth.
const retrato = `/pares/${pairSources.find((pair) => pair.id === 'par-0002')!.data.slug}/`;

test('El laboratorio se abre, aplica ?lab= y lo recuerda al navegar', async ({ page }) => {
  await page.goto('/pares/?lab=N2E2R3D3V2F2L2');
  const html = page.locator('html');
  await expect(html).toHaveAttribute('data-lab-n', '2');
  await expect(html).toHaveAttribute('data-lab-l', '2');
  await page.getByRole('button', { name: 'Abrir el laboratorio de interacción' }).click();
  const panel = page.getByRole('complementary', { name: 'Laboratorio de interacción' });
  await expect(panel).toBeVisible();
  await expect(panel.locator('.lab-code')).toHaveText('N2 · E2 · R3 · D3 · V2 · F2 · L2');
  await expect(panel.locator('fieldset')).toHaveCount(7);
  await panel.getByLabel(/E3 Cortina/).check();
  await expect(html).toHaveAttribute('data-lab-e', '3');
  await page.keyboard.press('Escape');
  await page.locator(`a.pair-card[href="${retrato}"]`).click();
  await expect(page).toHaveURL(retrato);
  await expect(html).toHaveAttribute('data-lab-e', '3');
  await expect(page.locator('.lab-barra')).toHaveCount(1);
  // F2: la frase de la colaboradora abre el retrato.
  await expect(
    page.locator('.analysis-content > .wrap').first().locator('.quote-block'),
  ).toHaveCount(1);
  await page.getByRole('button', { name: 'Abrir el laboratorio de interacción' }).click();
  await page.getByRole('button', { name: 'Volver a la actual' }).click();
  await expect(html).not.toHaveAttribute('data-lab-n', /./);
});

test('Tras navegar con transición, el visor y el glosario siguen funcionando', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/?lab=N3V2');
  await page.evaluate(() => ((window as unknown as { marca: number }).marca = 1));
  await page.locator('a[href="/pares/"]').first().click();
  await page.locator(`a.pair-card[href="${retrato}"]`).click();
  await expect(page).toHaveURL(retrato);
  // Sin recarga: la marca puesta en la portada sigue ahí.
  expect(await page.evaluate(() => (window as unknown as { marca?: number }).marca)).toBe(1);
  await expect(page.locator('h1')).toBeVisible();
  await page.locator('.article-section a.photo-zoom').first().click();
  await expect(page.locator('.pswp--open')).toBeVisible();
  await page.waitForTimeout(600);
  await page.keyboard.press('Escape');
  await expect(page.locator('.pswp')).toHaveCount(0);
  const term = page.locator('button.term').first();
  await term.click();
  await expect(page.locator('.term-popover:popover-open')).toHaveCount(1);
  await page.keyboard.press('Escape');
  await expect(page.locator('.term-popover:popover-open')).toHaveCount(0);
  // Y otra vez al volver atrás y entrar en otro retrato desde «Más retratos».
  await page.locator('.more-portraits a.pair-card').first().click();
  await expect(page.locator('.article-section a.photo-zoom').first()).toBeVisible();
  await page.locator('.article-section a.photo-zoom').first().click();
  await expect(page.locator('.pswp--open')).toBeVisible();
  expect(errors).toEqual([]);
});

test('Con «N1» los enlaces recargan la página, como en la web publicada', async ({ page }) => {
  await page.goto('/?lab=N1');
  await page.evaluate(() => ((window as unknown as { marca: number }).marca = 1));
  await page.locator('a[href="/pares/"]').first().click();
  await expect(page).toHaveURL('/pares/');
  expect(
    await page.evaluate(() => (window as unknown as { marca?: number }).marca),
  ).toBeUndefined();
});

test('Con «reducir movimiento» no hay animaciones del laboratorio', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/?lab=N2E2R2V2');
  await expect(page.locator('.lab-aparece')).toHaveCount(0);
  await page.locator('a[href="/pares/"]').first().click();
  // Mientras cambia la página no corre ninguna animación (tampoco la de la transición).
  const running = await page.evaluate(() => document.getAnimations().length);
  expect(running).toBe(0);
  await expect(page).toHaveURL('/pares/');
  await expect(page.locator('.lab-aparece')).toHaveCount(0);
  await page.goto(retrato);
  await page.locator('.article-section a.photo-zoom').first().click();
  await expect(page.locator('.pswp--open')).toBeVisible();
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
});

test('Los puntos sobre la foto se encienden al leer y la ayuda copia x/y', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const page = await context.newPage();
  await page.goto(`${retrato}?lab=D3`);
  const section = page.locator('.article-section:has(.detail-point)').first();
  await section.scrollIntoViewIfNeeded();
  await section.locator('.article-text').hover();
  await expect(section.locator('.detail-photo')).toHaveClass(/lab-activo/);
  await expect(section.locator('.detail-point')).toHaveAttribute(
    'aria-label',
    /Señalar en la foto/,
  );
  await page.getByRole('button', { name: 'Abrir el laboratorio de interacción' }).click();
  await page.getByLabel(/Medir puntos/).check();
  await page.keyboard.press('Escape');
  const photo = section.locator('a.photo-zoom');
  const box = (await photo.boundingBox())!;
  await page.mouse.click(box.x + box.width * 0.25, box.y + box.height * 0.75);
  await expect(page.locator('.pswp')).toHaveCount(0);
  await expect(page.locator('.lab-status')).toHaveText('Copiado: x={25} y={75}');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('x={25} y={75}');
  await context.close();
});
