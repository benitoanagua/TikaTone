import { test, expect } from "../setup";

test.describe("Component Interaction Tests", () => {
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

  test("nested components work correctly", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-grille desktop="2" mobile="1">
          <wc-grille-item>
            <wc-card title="Card in Grid 1" excerpt="First card content">
            </wc-card>
          </wc-grille-item>
          <wc-grille-item>
            <wc-card title="Card in Grid 2" excerpt="Second card content">
            </wc-card>
          </wc-grille-item>
        </wc-grille>
      `;
    });

    const grille = page.locator("wc-grille");
    const cards = page.locator("wc-card");

    await expect(grille).toBeVisible();
    await expect(cards).toHaveCount(2);

    // Both cards should be visible and functional
    await expect(cards.nth(0).locator(".wc-card__title-link")).toHaveText(
      "Card in Grid 1"
    );
    await expect(cards.nth(1).locator(".wc-card__title-link")).toHaveText(
      "Card in Grid 2"
    );
  });

  test("carousel with cards works correctly", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-carousel desktop="2" mobile="1" show-arrows="true" auto-play="false">
          ${Array.from(
            { length: 4 },
            (_, i) => `
            <wc-carousel-item>
              <wc-card title="Carousel Card ${i + 1}" 
                       excerpt="Card ${i + 1} in carousel">
              </wc-card>
            </wc-carousel-item>
          `
          ).join("")}
        </wc-carousel>
      `;
    });

    const carousel = page.locator("wc-carousel");
    const cards = page.locator("wc-card");
    const nextButton = page.locator(".wc-carousel__arrow--next");

    await expect(carousel).toBeVisible();
    await expect(cards).toHaveCount(4);

    // Navigate carousel
    await nextButton.click();
    await page.waitForTimeout(200);

    // Cards should still be functional
    await expect(cards.first().locator(".wc-card__title-link")).toBeVisible();
  });

  test("tabs with different component types", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-tabs active-tab="0">
          <wc-tab slot="tabs">Cards Tab</wc-tab>
          <wc-tab slot="tabs">Accordion Tab</wc-tab>
          <wc-tab slot="tabs">Stack Tab</wc-tab>
          
          <wc-tab-panel slot="panels">
            <wc-grille desktop="2" mobile="1">
              <wc-grille-item>
                <wc-card title="Tab Card 1"></wc-card>
              </wc-grille-item>
              <wc-grille-item>
                <wc-card title="Tab Card 2"></wc-card>
              </wc-grille-item>
            </wc-grille>
          </wc-tab-panel>
          
          <wc-tab-panel slot="panels">
            <wc-accordion>
              <wc-accordion-item>
                <span slot="header">Tab Accordion Item</span>
                <p>Content in tab</p>
              </wc-accordion-item>
            </wc-accordion>
          </wc-tab-panel>
          
          <wc-tab-panel slot="panels">
            <wc-stack>
              <wc-stack-item title="Stack Item">Stack content in tab</wc-stack-item>
            </wc-stack>
          </wc-tab-panel>
        </wc-tabs>
      `;
    });

    const tabs = page.locator("wc-tabs");
    const tabButtons = page.locator("wc-tab .wc-tab__button");

    await expect(tabs).toBeVisible();

    // Test first tab (Cards)
    await expect(page.locator("wc-card")).toHaveCount(2);

    // Switch to second tab (Accordion)
    await tabButtons.nth(1).click();
    await page.waitForTimeout(100);

    const accordion = page.locator("wc-accordion");
    await expect(accordion).toBeVisible();

    // Test accordion functionality
    const accordionHeader = accordion.locator(".wc-accordion-item__header");
    await accordionHeader.click();
    const accordionPanel = accordion.locator(".wc-accordion-item__panel");
    await expect(accordionPanel).not.toHaveAttribute("hidden");

    // Switch to third tab (Stack)
    await tabButtons.nth(2).click();
    await page.waitForTimeout(100);

    const stack = page.locator("wc-stack");
    await expect(stack).toBeVisible();
  });
});
