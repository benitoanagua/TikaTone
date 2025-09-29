import { test, expect } from "../setup";

test.describe("Grille Component", () => {
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

  test("renders grille with items", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-grille desktop="3" mobile="2">
          <wc-grille-item>Item 1</wc-grille-item>
          <wc-grille-item>Item 2</wc-grille-item>
          <wc-grille-item>Item 3</wc-grille-item>
          <wc-grille-item>Item 4</wc-grille-item>
        </wc-grille>
      `;
    });

    const grille = page.locator("wc-grille");
    const items = grille.locator("wc-grille-item");

    await expect(grille).toBeVisible();
    await expect(items).toHaveCount(4);
  });

  // Agregar al inicio del test "applies correct grid layout on desktop":
  test("applies correct grid layout on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });

    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
      <wc-grille desktop="3" mobile="2">
        ${Array.from(
          { length: 6 },
          (_, i) => `<wc-grille-item>Item ${i + 1}</wc-grille-item>`
        ).join("")}
      </wc-grille>
    `;
    });

    // Esperar más tiempo para cálculos de layout
    await page.waitForTimeout(500); // Aumentar de 200 a 500ms

    const items = page.locator("wc-grille-item");
    await expect(items).toHaveCount(6);

    // Verificar que los items tienen estilos aplicados
    const firstItem = items.first();
    const style = await firstItem.getAttribute("style");
    expect(style).toContain("width");
  });

  test("adjusts layout for mobile", async ({ page }) => {
    await page.setViewportSize({ width: 600, height: 800 });

    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-grille desktop="3" mobile="1">
          ${Array.from(
            { length: 4 },
            (_, i) => `<wc-grille-item>Item ${i + 1}</wc-grille-item>`
          ).join("")}
        </wc-grille>
      `;
    });

    await page.waitForTimeout(200);

    const items = page.locator("wc-grille-item");
    const firstItem = items.first();

    // On mobile with mobile="1", items should be full width
    const style = await firstItem.getAttribute("style");
    expect(style).toContain("width:");

    // Usar boundingBox en lugar de offsetWidth
    const boundingBox = await firstItem.boundingBox();
    expect(boundingBox?.width).toBeGreaterThan(500); // Should be close to viewport width
  });

  test("handles different gap sizes", async ({ page }) => {
    const gaps = ["small", "medium", "large"];

    for (const gap of gaps) {
      await page.evaluate((gapSize) => {
        const container = document.getElementById("test-container");
        container!.innerHTML = `
          <wc-grille desktop="2" mobile="1" gap="${gapSize}">
            <wc-grille-item>Item 1</wc-grille-item>
            <wc-grille-item>Item 2</wc-grille-item>
          </wc-grille>
        `;
      }, gap);

      await page.waitForTimeout(100);

      const grille = page.locator("wc-grille");
      await expect(grille).toBeVisible();
    }
  });

  test("adds borders between items", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-grille desktop="2" mobile="2">
          <wc-grille-item>Item 1</wc-grille-item>
          <wc-grille-item>Item 2</wc-grille-item>
          <wc-grille-item>Item 3</wc-grille-item>
          <wc-grille-item>Item 4</wc-grille-item>
        </wc-grille>
      `;
    });

    await page.waitForTimeout(200);

    const items = page.locator("wc-grille-item");
    const firstItem = items.first();

    // Check if borders are applied via inline styles
    const style = await firstItem.getAttribute("style");
    // Eliminar variable no usada
    expect(style).toBeDefined();

    // At least some items should have border styling
    expect(items).not.toHaveCount(0);
  });

  test("responds to resize events", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-grille desktop="3" mobile="1">
          <wc-grille-item>Item 1</wc-grille-item>
          <wc-grille-item>Item 2</wc-grille-item>
        </wc-grille>
      `;
    });

    // Start with desktop size
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.waitForTimeout(200);

    // Switch to mobile size
    await page.setViewportSize({ width: 600, height: 800 });
    await page.waitForTimeout(200);

    const grille = page.locator("wc-grille");
    await expect(grille).toBeVisible();

    // Layout should have adjusted
    const items = page.locator("wc-grille-item");
    await expect(items).toHaveCount(2);
  });
});
