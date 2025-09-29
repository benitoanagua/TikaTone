import { test as base, Page, expect } from "@playwright/test";

// Definir interfaz para las fixtures personalizadas
interface CustomFixtures {
  loadComponents: void;
}

export const test = base.extend<CustomFixtures>({
  loadComponents: async (
    { page }: { page: Page },
    use: (r: void) => Promise<void>
  ) => {
    // Set up basic HTML structure
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="/tika-tone-elements.css">
        </head>
        <body>
          <div id="test-container"></div>
          <script type="module" src="/tika-tone-elements.es.js"></script>
        </body>
      </html>
    `);

    // Wait for components to load
    await page.waitForFunction(
      () =>
        customElements.get("wc-card") !== undefined &&
        customElements.get("wc-accordion") !== undefined
    );

    await use(undefined); // Pasar undefined como argumento
  },
});

export { expect };
