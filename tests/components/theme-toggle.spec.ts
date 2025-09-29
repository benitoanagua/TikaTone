import { test, expect } from "../setup";

test.describe("ThemeToggle Component", () => {
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

  test("should toggle theme when clicked", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `<wc-theme-toggle></wc-theme-toggle>`;
    });

    await page.waitForSelector("wc-theme-toggle");

    // Verificar que el componente existe
    const toggle = page.locator("wc-theme-toggle");
    await expect(toggle).toBeVisible();

    // Verificar que el botón es clickeable
    const button = toggle.locator("button");
    await expect(button).toBeEnabled();

    // Verificar tema inicial
    let theme = await page.evaluate(() =>
      document.documentElement.getAttribute("data-theme")
    );
    expect(theme).toBe("light");

    // Click debería cambiar el tema
    await button.click();
    await page.waitForTimeout(100);

    // Verificar que cambió el tema
    theme = await page.evaluate(() =>
      document.documentElement.getAttribute("data-theme")
    );
    expect(theme).toBe("dark");

    // Click nuevamente debería volver a light
    await button.click();
    await page.waitForTimeout(100);

    theme = await page.evaluate(() =>
      document.documentElement.getAttribute("data-theme")
    );
    expect(theme).toBe("light");
  });

  test("should show correct icons for each theme", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `<wc-theme-toggle></wc-theme-toggle>`;
    });

    await page.waitForSelector("wc-theme-toggle");

    const toggle = page.locator("wc-theme-toggle");
    const button = toggle.locator("button");

    // Tema light debería mostrar icono de sol
    let icon = button.locator(".wc-theme-toggle-icon");
    await expect(icon).toHaveClass(/icon-\[carbon--sun\]/);

    // Cambiar a dark theme
    await button.click();
    await page.waitForTimeout(100);

    // Tema dark debería mostrar icono de luna
    icon = button.locator(".wc-theme-toggle-icon");
    await expect(icon).toHaveClass(/icon-\[carbon--moon\]/);
  });

  test("should persist theme across page reloads", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `<wc-theme-toggle></wc-theme-toggle>`;
    });

    await page.waitForSelector("wc-theme-toggle");

    const button = page.locator("wc-theme-toggle button");

    // Cambiar a dark theme
    await button.click();
    await page.waitForTimeout(100);

    // Recargar página
    await page.reload();
    await page.waitForLoadState("networkidle");

    // Volver a agregar el componente
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `<wc-theme-toggle></wc-theme-toggle>`;
    });

    await page.waitForSelector("wc-theme-toggle");

    // El tema debería persistir
    const theme = await page.evaluate(() =>
      document.documentElement.getAttribute("data-theme")
    );
    expect(theme).toBe("dark");
  });
});
