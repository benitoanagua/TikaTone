import { test, expect } from "../setup";

test.describe("Accordion Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.setContent(`
      <html>
        <head>
          <link rel="stylesheet" href="/tika-tone-elements.css">
        </head>
        <body>
          <div id="test-container"></div>
          <script type="module" src="/tika-tone-elements.es.js"></script>
        </body>
      </html>
    `);
    await page.waitForLoadState("networkidle");
  });

  test("renders accordion with items", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-accordion>
          <wc-accordion-item>
            <span slot="header">Item 1</span>
            <p>Content 1</p>
          </wc-accordion-item>
          <wc-accordion-item>
            <span slot="header">Item 2</span>
            <p>Content 2</p>
          </wc-accordion-item>
        </wc-accordion>
      `;
    });

    await page.waitForSelector("wc-accordion"); // Esperar a que se renderice

    const accordion = page.locator("wc-accordion");
    const items = accordion.locator("wc-accordion-item");

    await expect(accordion).toBeVisible();
    await expect(items).toHaveCount(2);
  });

  test("expands and collapses items on click", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-accordion>
          <wc-accordion-item>
            <span slot="header">Clickable Header</span>
            <p>This content should toggle</p>
          </wc-accordion-item>
        </wc-accordion>
      `;
    });

    await page.waitForSelector("wc-accordion-item");

    const item = page.locator("wc-accordion-item");
    const header = item.locator("button"); // Cambiar selector
    const panel = item.locator('[role="region"]'); // Usar atributo ARIA

    // Inicialmente colapsado
    await expect(panel).toBeHidden(); // Cambiar a toBeHidden

    // Click para expandir
    await header.click();
    await page.waitForTimeout(100); // Pequeña espera para la animación
    await expect(panel).toBeVisible();

    // Click para colapsar
    await header.click();
    await page.waitForTimeout(100);
    await expect(panel).toBeHidden();
  });

  test("handles multiple mode correctly", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-accordion multiple>
          <wc-accordion-item>
            <span slot="header">Item 1</span>
            <p>Content 1</p>
          </wc-accordion-item>
          <wc-accordion-item>
            <span slot="header">Item 2</span>
            <p>Content 2</p>
          </wc-accordion-item>
        </wc-accordion>
      `;
    });

    await page.waitForSelector("wc-accordion-item");

    const items = page.locator("wc-accordion-item");
    const firstHeader = items.nth(0).locator("button");
    const secondHeader = items.nth(1).locator("button");

    // Abrir ambos items
    await firstHeader.click();
    await page.waitForTimeout(100);
    await secondHeader.click();
    await page.waitForTimeout(100);

    // Ambos deberían permanecer abiertos en modo múltiple
    const firstPanel = items.nth(0).locator('[role="region"]');
    const secondPanel = items.nth(1).locator('[role="region"]');

    await expect(firstPanel).toBeVisible();
    await expect(secondPanel).toBeVisible();
  });

  test("handles single mode correctly", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-accordion>
          <wc-accordion-item>
            <span slot="header">Item 1</span>
            <p>Content 1</p>
          </wc-accordion-item>
          <wc-accordion-item>
            <span slot="header">Item 2</span>
            <p>Content 2</p>
          </wc-accordion-item>
        </wc-accordion>
      `;
    });

    await page.waitForSelector("wc-accordion-item");

    const items = page.locator("wc-accordion-item");
    const firstHeader = items.nth(0).locator("button");
    const secondHeader = items.nth(1).locator("button");

    // Abrir primer item
    await firstHeader.click();
    await page.waitForTimeout(100);

    let firstPanel = items.nth(0).locator('[role="region"]');
    await expect(firstPanel).toBeVisible();

    // Abrir segundo item - debería cerrar el primero
    await secondHeader.click();
    await page.waitForTimeout(100);

    firstPanel = items.nth(0).locator('[role="region"]');
    const secondPanel = items.nth(1).locator('[role="region"]');

    await expect(firstPanel).toBeHidden();
    await expect(secondPanel).toBeVisible();
  });

  test("handles disabled items", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-accordion>
          <wc-accordion-item disabled>
            <span slot="header">Disabled Item</span>
            <p>This content should not be accessible</p>
          </wc-accordion-item>
        </wc-accordion>
      `;
    });

    await page.waitForSelector("wc-accordion-item");

    const header = page.locator("wc-accordion-item button");
    const panel = page.locator('[role="region"]');

    // Debería estar deshabilitado
    await expect(header).toBeDisabled();

    // Click no debería expandir
    await header.click({ force: true }); // force para elementos disabled
    await page.waitForTimeout(100);
    await expect(panel).toBeHidden();
  });

  test("supports keyboard navigation", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-accordion>
          <wc-accordion-item>
            <span slot="header">Keyboard Item</span>
            <p>Content accessible via keyboard</p>
          </wc-accordion-item>
        </wc-accordion>
      `;
    });

    await page.waitForSelector("wc-accordion-item");

    const header = page.locator("wc-accordion-item button");
    const panel = page.locator('[role="region"]');

    // Focus en el header
    await header.focus();

    // Presionar Enter para alternar
    await page.keyboard.press("Enter");
    await page.waitForTimeout(100);
    await expect(panel).toBeVisible();

    // Presionar Space para alternar
    await page.keyboard.press("Space");
    await page.waitForTimeout(100);
    await expect(panel).toBeHidden();
  });

  test("shows correct ARIA attributes", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-accordion>
          <wc-accordion-item>
            <span slot="header">ARIA Test</span>
            <p>Content for ARIA testing</p>
          </wc-accordion-item>
        </wc-accordion>
      `;
    });

    await page.waitForSelector("wc-accordion-item");

    const header = page.locator("wc-accordion-item button");

    await expect(header).toHaveAttribute("aria-expanded", "false");

    // Expandir el item
    await header.click();
    await page.waitForTimeout(100);
    await expect(header).toHaveAttribute("aria-expanded", "true");
  });
});
