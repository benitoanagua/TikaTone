import { test, expect } from "../setup";

test.describe("Tabs Component", () => {
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

  test("renders tabs with panels", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-tabs active-tab="0">
          <wc-tab slot="tabs">Tab 1</wc-tab>
          <wc-tab slot="tabs">Tab 2</wc-tab>
          
          <wc-tab-panel slot="panels">Panel 1 Content</wc-tab-panel>
          <wc-tab-panel slot="panels">Panel 2 Content</wc-tab-panel>
        </wc-tabs>
      `;
    });

    await page.waitForSelector("wc-tabs");

    const tabs = page.locator("wc-tabs");
    const tabButtons = tabs.locator("wc-tab");
    const panels = tabs.locator("wc-tab-panel");

    await expect(tabs).toBeVisible();
    await expect(tabButtons).toHaveCount(2);
    await expect(panels).toHaveCount(2);
  });

  test("switches tabs on click", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-tabs active-tab="0">
          <wc-tab slot="tabs">Tab 1</wc-tab>
          <wc-tab slot="tabs">Tab 2</wc-tab>
          
          <wc-tab-panel slot="panels">Panel 1 Content</wc-tab-panel>
          <wc-tab-panel slot="panels">Panel 2 Content</wc-tab-panel>
        </wc-tabs>
      `;
    });

    await page.waitForSelector("wc-tabs");

    const tabButtons = page.locator("wc-tab button");
    const panels = page.locator("wc-tab-panel");

    // Inicialmente primer tab debería estar activo
    await expect(tabButtons.nth(0)).toHaveAttribute("aria-selected", "true");
    await expect(panels.nth(0)).toBeVisible();
    await expect(panels.nth(1)).toBeHidden();

    // Click segundo tab
    await tabButtons.nth(1).click();
    await page.waitForTimeout(100);

    // Segundo tab debería estar activo ahora
    await expect(tabButtons.nth(1)).toHaveAttribute("aria-selected", "true");
    await expect(panels.nth(0)).toBeHidden();
    await expect(panels.nth(1)).toBeVisible();
  });

  test("supports keyboard navigation", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-tabs active-tab="0">
          <wc-tab slot="tabs">Tab 1</wc-tab>
          <wc-tab slot="tabs">Tab 2</wc-tab>
          <wc-tab slot="tabs">Tab 3</wc-tab>
        </wc-tabs>
      `;
    });

    await page.waitForSelector("wc-tabs");

    const tabsContainer = page.locator(".wc-tabs__header");

    // Focus en el contenedor de tabs
    await tabsContainer.focus();

    // Presionar flecha derecha para mover al siguiente tab
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(100);

    const secondTab = page.locator("wc-tab button").nth(1);
    await expect(secondTab).toHaveAttribute("aria-selected", "true");

    // Presionar flecha izquierda para mover al tab anterior
    await page.keyboard.press("ArrowLeft");
    await page.waitForTimeout(100);

    const firstTab = page.locator("wc-tab button").nth(0);
    await expect(firstTab).toHaveAttribute("aria-selected", "true");
  });

  test("handles disabled state", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-tabs disabled>
          <wc-tab slot="tabs">Tab 1</wc-tab>
          <wc-tab slot="tabs">Tab 2</wc-tab>
        </wc-tabs>
      `;
    });

    await page.waitForSelector("wc-tabs");

    const tabButtons = page.locator("wc-tab button");

    // Los tabs deberían estar deshabilitados
    await expect(tabButtons.nth(0)).toBeDisabled();
    await expect(tabButtons.nth(1)).toBeDisabled();

    // Click no debería cambiar el tab activo
    await tabButtons.nth(1).click({ force: true });
    await page.waitForTimeout(100);
    await expect(tabButtons.nth(0)).toHaveAttribute("aria-selected", "true");
  });

  test("dispatches tab-change event", async ({ page }) => {
    const events: any[] = [];

    await page.exposeFunction("recordTabChange", (detail: any) => {
      events.push(detail);
    });

    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-tabs active-tab="0">
          <wc-tab slot="tabs">Tab 1</wc-tab>
          <wc-tab slot="tabs">Tab 2</wc-tab>
        </wc-tabs>
      `;

      document.addEventListener("tab-change", (e: any) => {
        (window as any).recordTabChange(e.detail);
      });
    });

    await page.waitForSelector("wc-tabs");

    const secondTab = page.locator("wc-tab button").nth(1);
    await secondTab.click();
    await page.waitForTimeout(100);

    // Esperar a que el evento se dispare
    await page.waitForFunction(() => (window as any).events !== undefined);

    const recordedEvents = await page.evaluate(
      () => (window as any).events || []
    );
    expect(recordedEvents).toHaveLength(1);
    expect(recordedEvents[0]).toEqual({ activeTab: 1, previousTab: 0 });
  });
});
