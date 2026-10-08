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
      await expect(page.locator(tally)).toHaveCount(1);
      await expect(page.locator(`#enviar ${tally}`)).toHaveAttribute(
        'href',
        'https://tally.so/r/Npj2bl',
      );
    } else if (route === '/participa/') {
      await expect(page.locator(tally)).toHaveCount(1);
      await expect(page.locator(`.invitation-done ${tally}`)).toHaveCount(1);
    } else await expect(page.locator(tally), route).toHaveCount(0);
  }
  await page.goto('/');
  await page.locator('.invitation').getByRole('link', { name: 'Manda tu par' }).click();
  await expect(page).toHaveURL('/participa/');
  await expect(page.locator('main a[href^="/guia-de-fotos/"]')).toHaveCount(1);
  await page.locator('.invitation').getByRole('link', { name: 'Qué fotos hacer' }).click();
  await expect(page).toHaveURL('/guia-de-fotos/');
  await page.getByRole('link', { name: 'Ya tengo mis fotos' }).click();
  await expect(page).toHaveURL('/guia-de-fotos/#enviar');
  await expect(
    page.locator('#enviar').getByRole('link', { name: 'Enviar mis fotos' }),
  ).toBeInViewport();
});

test('Las fotos de ejemplo se distinguen de las entradas del catálogo', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Fotos de ejemplo · Siempre hay algo que mirar')).toBeVisible();
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

test('El visor acerca de verdad, permite desplazarse y vuelve a la foto completa', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/pares/bailarinas-rejilla-flores/');
  const opener = page.locator('.article-hero button');
  await opener.click();
  const dialog = page.getByRole('dialog', { name: 'Fotografía ampliada' });
  const detail = dialog.getByRole('button', { name: 'Acercar' });
  await expect(detail).toBeEnabled();
  const completeWidth = (await dialog.locator('img').boundingBox())!.width;
  await detail.click();
  await expect(detail).toHaveAttribute('aria-pressed', 'true');
  expect((await dialog.locator('img').boundingBox())!.width).toBeGreaterThan(completeWidth * 2);
  const viewport = dialog.locator('.image-viewport');
  expect(await viewport.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(
    true,
  );
  await viewport.focus();
  const previousScroll = await viewport.evaluate((element) => element.scrollLeft);
  await page.keyboard.press('ArrowRight');
  await expect
    .poll(() => viewport.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(previousScroll);
  await dialog.getByRole('button', { name: 'Ver completa' }).click();
  expect((await dialog.locator('img').boundingBox())!.width).toBeCloseTo(completeWidth, 0);
  await page.keyboard.press('Escape');
  await expect(opener).toBeFocused();
  await opener.click();
  await expect(detail).toHaveAttribute('aria-pressed', 'false');
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
  await expect(page.locator('.steps li')).toHaveCount(3);
  await expect(page.locator('.steps-notes')).toContainText('tienes 48 horas');
  await expect(page.locator('.steps-notes')).toContainText('máximo de 48 horas');
  await expect(page.locator('.steps-notes')).toContainText('el formulario pide');
  await expect(page.locator('.participation-note')).toContainText('segundo publicado');
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
  await page.keyboard.press('Escape');
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await expect(button).toBeFocused();
});

test('Una foto se amplía y devuelve el foco al cerrar', async ({ page }) => {
  await page.goto('/pares/bailarinas-rejilla-flores/');
  const photo = page.locator('.article-hero button');
  await photo.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('dialog').locator('img')).toHaveAttribute('alt', /María/);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(photo).toBeFocused();
});

test('La guía contiene el set completo y conserva la impresión', async ({ page }) => {
  await page.goto('/guia-de-fotos/');
  await expect(page.locator('.guide-card')).toHaveCount(7);
  const sources = await page
    .locator('.guide-card img')
    .evaluateAll((images) => images.map((img) => img.getAttribute('src')));
  expect(new Set(sources).size).toBe(6);
  await expect(page.locator('.guide-card').last()).toContainText('Ampliación de una foto');
  await page.locator('.tacon-guide summary').click();
  await expect(page.locator('.tacon-guide')).toContainText('generada con IA');
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.site-header')).not.toBeVisible();
  await expect(page.locator('.site-footer')).not.toBeVisible();
  await expect(page.locator('.guide-card').first()).toBeVisible();
});

test('La guía carga todas sus fotos antes de imprimir sin recorrer la página', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 600 });
  await page.addInitScript(() => {
    window.print = () => {
      document.body.dataset.printReady = String(
        [...document.querySelectorAll<HTMLImageElement>('.guide-card img, .tacon-guide img')].every(
          (image) => image.complete && image.naturalWidth > 0,
        ),
      );
    };
  });
  await page.goto('/guia-de-fotos/');
  await page.getByRole('button', { name: 'Guardar o imprimir la guía' }).click();
  await expect(page.locator('body')).toHaveAttribute('data-print-ready', 'true');
  await expect(page.locator('#print-guide')).toBeEnabled();
});

test('Cada armario reúne sus pares y conecta con sus análisis', async ({ page }) => {
  for (const wardrobe of expectedWardrobes) {
    await page.goto('/armarios/');
    await page.getByRole('link', { name: new RegExp(`Armario de ${wardrobe.name}`) }).click();
    await expect(page).toHaveURL(`/armarios/${wardrobe.slug}/`);
    await expect(page.locator('.pair-card')).toHaveCount(wardrobe.pairs.length);
    for (const pair of wardrobe.pairs)
      await expect(page.locator(`.pair-card[href="/pares/${pair.data.slug}/"]`)).toBeVisible();
    await page.locator('.pair-card').first().click();
    await expect(
      page.getByRole('link', { name: `Armario de ${wardrobe.name}`, exact: true }),
    ).toBeVisible();
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
  await context.close();
});
