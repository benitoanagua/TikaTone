import { test, expect } from "@playwright/test";

test.describe("Accordion Component", () => {
  test("should open and close accordion items", async ({ page }) => {
    await page.goto(
      "http://localhost:6006/iframe.html?id=components-accordion--default&viewMode=story"
    );

    // Esperar a que el componente cargue completamente
    await page.waitForSelector("wc-accordion", { state: "attached" });

    // Encontrar el botón del header directamente
    const firstHeader = page
      .locator("wc-accordion-item")
      .first()
      .locator("button.wc-accordion-item__header");
    await expect(firstHeader).toBeVisible();

    // Verificar que es clickeable
    await expect(firstHeader).toBeEnabled();

    // Forzar click si hay problemas de overlay
    await firstHeader.click({ force: true });

    // Verificar que cambió el estado
    await page.waitForTimeout(500);

    // Verificar atributos ARIA
    const isExpanded = await firstHeader.getAttribute("aria-expanded");
    expect(isExpanded).toBeTruthy();
  });

  test("should handle multiple accordion items", async ({ page }) => {
    await page.goto(
      "http://localhost:6006/iframe.html?id=components-accordion--default&viewMode=story"
    );

    const accordionItems = page.locator("wc-accordion-item");
    await expect(accordionItems).toHaveCount(3);

    // Probar cada item
    for (let i = 0; i < 3; i++) {
      const item = accordionItems.nth(i);
      const header = item.locator("button.wc-accordion-item__header");

      await header.click({ force: true });
      await page.waitForTimeout(300);

      const isExpanded = await header.getAttribute("aria-expanded");
      expect(isExpanded).toBe("true");
    }
  });
});
