import { test, expect } from "@playwright/test";

test.describe("Component Diagnostics", () => {
  test("should diagnose clickability issues", async ({ page }) => {
    const components = ["accordion", "tabs", "theme-toggle"];

    for (const component of components) {
      await page.goto(
        `http://localhost:6006/iframe.html?id=components-${component}--default&viewMode=story`
      );

      console.log(`\n=== Diagnóstico de ${component} ===`);

      // Verificar que el componente existe
      const componentSelector = `wc-${component}`;
      const componentElement = await page.$(componentSelector);
      console.log(
        `${componentSelector}: ${componentElement ? "✅ Encontrado" : "❌ No encontrado"}`
      );

      // Buscar elementos clickeables
      const clickableElements = await page.$$(
        'button, [role="button"], [tabindex="0"]'
      );
      console.log(
        `Elementos clickeables encontrados: ${clickableElements.length}`
      );

      for (const element of clickableElements) {
        const tagName = await element.evaluate((el) =>
          el.tagName.toLowerCase()
        );
        const classes = await element.getAttribute("class");
        const isVisible = await element.isVisible();
        const isEnabled = await element.isEnabled();

        console.log(
          `- ${tagName} (${classes}): visible=${isVisible}, enabled=${isEnabled}`
        );
      }
    }
  });
});
