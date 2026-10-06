import { test, expect } from '@playwright/test';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const axePath = require.resolve('axe-core/axe.min.js');
const routes = [
  '/',
  '/pares/',
  '/armarios/',
  '/armarios/maria/',
  '/pares/bailarinas-rejilla-flores/',
  '/pares/bailarinas-manchas-leopardo/',
  '/pares/slippers-burdeos-borde-rosa/',
  '/participa/',
  '/guia-de-fotos/',
  '/el-par/',
  '/glosario/',
  '/tus-fotos-y-tus-datos/',
];

for (const width of [360, 390, 768, 1024, 1440]) {
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

test('Inicio y participación abren el mismo Tally directamente', async ({ page }) => {
  for (const route of ['/', '/participa/']) {
    await page.goto(route);
    const actions = page.getByRole('link', { name: 'Enviar mis fotos', exact: false });
    expect(await actions.count()).toBeGreaterThanOrEqual(2);
    for (const link of await actions.all())
      await expect(link).toHaveAttribute('href', 'https://tally.so/r/Npj2bl');
    await expect(page.locator('iframe')).toHaveCount(0);
  }
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

test('Armario de María reúne tres pares y conecta con los análisis', async ({ page }) => {
  await page.goto('/armarios/');
  await page.getByRole('link', { name: /Armario de María/ }).click();
  await expect(page).toHaveURL('/armarios/maria/');
  await expect(page.locator('.pair-card')).toHaveCount(3);
  await page.locator('.pair-card').first().click();
  await expect(page.getByRole('link', { name: 'Armario de María', exact: true })).toBeVisible();
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
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Vuelve a mirar');
  await page.locator('.mobile-menu summary').click();
  await expect(
    page
      .getByRole('navigation', { name: 'Navegación móvil' })
      .getByRole('link', { name: 'Enviar mis fotos' }),
  ).toHaveAttribute('href', 'https://tally.so/r/Npj2bl');
  await context.close();
});
