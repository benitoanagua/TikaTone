import { test, expect } from "../setup";
import { COMPONENT_SELECTORS } from "../utils/component-selectors";

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

    // Toggle should be visible
    const toggle = page.locator("wc-theme-toggle");
    await expect(toggle).toBeVisible();

    // Button should be enabled
    const button = toggle.locator(COMPONENT_SELECTORS.themeToggle.button);
    await expect(button).toBeEnabled();

    // Initially light theme
    let theme = await page.evaluate(() =>
      document.documentElement.getAttribute("data-theme")
    );
    expect(theme).toBe("light");

    // Click to toggle to dark
    await button.click();
    await page.waitForTimeout(100);

    // Should be dark theme
    theme = await page.evaluate(() =>
      document.documentElement.getAttribute("data-theme")
    );
    expect(theme).toBe("dark");

    // Click again to toggle back to light
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
    const button = toggle.locator(COMPONENT_SELECTORS.themeToggle.button);

    // Initially sun icon (light theme)
    let icon = button.locator(".wc-theme-toggle-icon");
    await expect(icon).toHaveClass(/icon-\[carbon--sun\]/);

    // Click to toggle to dark
    await button.click();
    await page.waitForTimeout(100);

    // Should show moon icon
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
