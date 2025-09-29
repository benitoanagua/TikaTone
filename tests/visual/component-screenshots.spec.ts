import { test, expect } from "../setup";

test.describe("Visual Regression Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.setContent(`
      <html>
        <head>
          <link rel="stylesheet" href="/tika-tone-elements.css">
          <style>
            body { margin: 0; padding: 20px; background: var(--color-background); }
            #test-container { max-width: 800px; }
          </style>
        </head>
        <body>
          <div id="test-container"></div>
          <script type="module" src="/tika-tone-elements.es.js"></script>
        </body>
      </html>
    `);
    await page.waitForLoadState("networkidle");
  });

  test("card component visual test", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-card 
          title="Visual Test Card"
          excerpt="This is a test card for visual regression testing. It should maintain consistent appearance across different builds and browser versions."
          feature-image="https://picsum.photos/400/300"
          author-name="Test Author"
          published-at="Jan 15, 2024"
          reading-time="5 min read"
          tag-name="Testing"
        ></wc-card>
      `;
    });

    const card = page.locator("wc-card");
    await expect(card).toBeVisible();

    // Take screenshot for visual comparison
    await expect(card).toHaveScreenshot("card-component.png");
  });

  test("navbar component visual test", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-navbar>
          <wc-logo slot="logo" class="h-8 fill-primary"></wc-logo>
          <nav slot="navigation">
            <a href="#" class="px-4 py-2 text-onSurface border-b-2 border-primary">Home</a>
            <a href="#" class="px-4 py-2 text-onSurface border-b-2 border-transparent hover:border-primary">About</a>
            <a href="#" class="px-4 py-2 text-onSurface border-b-2 border-transparent hover:border-primary">Contact</a>
          </nav>
          <div slot="actions">
            <wc-theme-toggle></wc-theme-toggle>
          </div>
        </wc-navbar>
      `;
    });

    const navbar = page.locator("wc-navbar");
    await expect(navbar).toBeVisible();

    await expect(navbar).toHaveScreenshot("navbar-component.png");
  });

  test("theme toggle states visual test", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <div style="display: flex; gap: 20px; align-items: center;">
          <div>
            <p>Light Theme:</p>
            <wc-theme-toggle></wc-theme-toggle>
          </div>
        </div>
      `;
    });

    // Test light theme state
    await expect(page.locator("wc-theme-toggle").first()).toHaveScreenshot(
      "theme-toggle-light.png"
    );

    // Switch to dark theme
    const toggle = page.locator("wc-theme-toggle button");
    await toggle.click();
    await page.waitForTimeout(200);

    // Test dark theme state
    await expect(page.locator("wc-theme-toggle").first()).toHaveScreenshot(
      "theme-toggle-dark.png"
    );
  });

  test("accordion component visual test", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-accordion variant="bordered">
          <wc-accordion-item open="true">
            <span slot="header">Expanded Item</span>
            <p>This accordion item is expanded by default to show the content area styling.</p>
          </wc-accordion-item>
          <wc-accordion-item>
            <span slot="header">Collapsed Item</span>
            <p>This content is hidden by default.</p>
          </wc-accordion-item>
          <wc-accordion-item disabled="true">
            <span slot="header">Disabled Item</span>
            <p>This item is disabled.</p>
          </wc-accordion-item>
        </wc-accordion>
      `;
    });

    const accordion = page.locator("wc-accordion");
    await expect(accordion).toBeVisible();

    await expect(accordion).toHaveScreenshot("accordion-component.png");
  });

  test("responsive layout visual test", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-grille desktop="3" mobile="1">
          <wc-grille-item>
            <wc-card title="Card 1" excerpt="Content 1"></wc-card>
          </wc-grille-item>
          <wc-grille-item>
            <wc-card title="Card 2" excerpt="Content 2"></wc-card>
          </wc-grille-item>
          <wc-grille-item>
            <wc-card title="Card 3" excerpt="Content 3"></wc-card>
          </wc-grille-item>
        </wc-grille>
      `;
    });

    // Test desktop layout
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.waitForTimeout(200);

    const grille = page.locator("wc-grille");
    await expect(grille).toHaveScreenshot("grille-desktop.png");

    // Test mobile layout
    await page.setViewportSize({ width: 400, height: 800 });
    await page.waitForTimeout(200);

    await expect(grille).toHaveScreenshot("grille-mobile.png");
  });
});
