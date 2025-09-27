import { test, expect } from "@playwright/test";

test.describe("Tabs Component", () => {
  test("should switch tabs when clicked", async ({ page }) => {
    await page.goto(
      "http://localhost:6006/iframe.html?id=components-tabs--basic&viewMode=story"
    );

    await page.waitForSelector("wc-tabs", { state: "attached" });

    // Encontrar botones de tabs
    const tabButtons = page.locator("wc-tab .wc-tab__button");
    await expect(tabButtons).toHaveCount(4);

    // Verificar estado inicial
    const firstTab = tabButtons.first();
    await expect(firstTab).toHaveAttribute("aria-selected", "true");

    // Click en segundo tab con force si es necesario
    const secondTab = tabButtons.nth(1);
    await secondTab.click({ force: true });

    // Verificar que cambió el estado
    await expect(secondTab).toHaveAttribute("aria-selected", "true");
    await expect(firstTab).toHaveAttribute("aria-selected", "false");
  });

  test("should navigate with keyboard", async ({ page }) => {
    await page.goto(
      "http://localhost:6006/iframe.html?id=components-tabs--basic&viewMode=story"
    );

    const tabButtons = page.locator("wc-tab .wc-tab__button");
    const firstTab = tabButtons.first();

    // Focus y navegación con teclado
    await firstTab.focus();
    await page.keyboard.press("ArrowRight");

    // Verificar que el segundo tab tiene focus
    const secondTab = tabButtons.nth(1);
    await expect(secondTab).toBeFocused();
  });
});
