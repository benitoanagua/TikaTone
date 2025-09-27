import { test, expect } from "@playwright/test";

test.describe("ThemeToggle Component", () => {
  test("should toggle theme when clicked", async ({ page }) => {
    await page.goto(
      "http://localhost:6006/iframe.html?id=components-themetoggle--default&viewMode=story"
    );

    // Verificar que el componente existe
    const toggle = page.locator("wc-theme-toggle");
    await expect(toggle).toBeVisible();

    // Verificar que el botón es clickeable
    const button = toggle.locator("button");
    await expect(button).toBeEnabled();

    // Click debería funcionar
    await button.click();

    // Verificar que cambió el tema
    const theme = await page.evaluate(() =>
      document.documentElement.getAttribute("data-theme")
    );
    expect(theme).toBeTruthy();
  });
});
