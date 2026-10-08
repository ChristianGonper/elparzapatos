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
  await expect(page.locator('main a[href^="#"]')).toHaveCount(1);
  await expect(page.locator('main a[href^="#"]')).toHaveAttribute('href', '#tacones');
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

test('Las fotos de ejemplo se distinguen de las entradas del catálogo', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.editorial-intro .eyebrow')).toHaveText('Fotos de ejemplo');
  await expect(page.locator('.look-note')).toContainText('Son fotos de ejemplo.');
  await expect(page.locator('.look-row').getByRole('link')).toHaveCount(0);
  await page.goto('/pares/');
  await expect(page.locator('.pair-card')).toHaveCount(pairSources.length);
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
  await expect(faq.filter({ hasText: '¿Puedo mandar más de un par?' })).toContainText(
    'segundo publicado',
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
  await button.focus();
  await page.keyboard.press('Enter');
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  const popover = page.locator('.term-popover:popover-open');
  await expect(popover).toBeVisible();
  await expect(popover.getByRole('link')).toHaveAttribute('href', '/glosario/#rejilla');
  await expect(popover.getByRole('link')).toContainText('Todas las palabras, en el glosario');
  await page.keyboard.press('Escape');
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await expect(button).toBeFocused();
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
  await page.locator('.tacon-guide summary').click();
  await expect(page.locator('.tacon-guide')).toContainText('hecha con IA');
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.site-header')).not.toBeVisible();
  await expect(page.locator('.site-footer')).not.toBeVisible();
  await expect(page.locator('.guide-card').first()).toBeVisible();
});

test('«¿Son tacones?» baja hasta la sección de tacones y la abre', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/guia-de-fotos/');
  const heels = page.locator('#tacones');
  await expect(heels).not.toHaveAttribute('open', '');
  await page.getByRole('link', { name: 'Mira lo que cambia.' }).click();
  await expect(heels).toHaveAttribute('open', '');
  await expect(heels.locator('summary')).toBeInViewport();
  await page.goto('/participa/');
  await page.goto('/guia-de-fotos/#tacones');
  await expect(page.locator('#tacones')).toHaveAttribute('open', '');
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

test('Cada armario reúne sus pares y conecta con sus análisis', async ({ page }) => {
  for (const wardrobe of expectedWardrobes) {
    await page.goto('/armarios/');
    await page.getByRole('link', { name: new RegExp(`Armario de ${wardrobe.name}`) }).click();
    await expect(page).toHaveURL(`/armarios/${wardrobe.slug}/`);
    await expect(page.locator('.pair-card')).toHaveCount(wardrobe.pairs.length);
    for (const pair of wardrobe.pairs)
      await expect(page.locator(`.pair-card[href="/pares/${pair.data.slug}/"]`)).toBeVisible();
    await expect(page.locator('.wardrobe-back a')).toHaveText(/Ver todos los pares/);
    await expect(page.locator('.wardrobe-back a')).toHaveAttribute('href', '/pares/');
    await page.locator('.pair-card').first().click();
    await expect(
      page.getByRole('link', { name: `Armario de ${wardrobe.name}`, exact: true }),
    ).toBeVisible();
    await expect(page.locator('.article-credit')).toContainText(`Fotos de ${wardrobe.name}`);
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
