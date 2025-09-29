import { test, expect } from "../setup";

test.describe("Theme Integration Tests", () => {
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

  test("all components respond to theme changes", async ({ page }) => {
    // Set up multiple components
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <div>
          <wc-theme-toggle></wc-theme-toggle>
          
          <wc-card title="Theme Test Card" 
                   excerpt="This card should adapt to theme changes">
          </wc-card>
          
          <wc-navbar>
            <div slot="logo">Logo</div>
            <div slot="navigation">Nav</div>
          </wc-navbar>
          
          <wc-accordion>
            <wc-accordion-item>
              <span slot="header">Theme Test</span>
              <p>Accordion content</p>
            </wc-accordion-item>
          </wc-accordion>
        </div>
      `;
    });

    // Verify initial light theme
    let htmlTheme = await page.locator("html").getAttribute("data-theme");
    expect(htmlTheme).toBe("light");

    // Check initial component colors
    const card = page.locator("wc-card");
    const navbar = page.locator("wc-navbar");

    await expect(card).toBeVisible();
    await expect(navbar).toBeVisible();

    // Switch to dark theme
    const themeToggle = page.locator("wc-theme-toggle button");
    await themeToggle.click();
    await page.waitForTimeout(300);

    // Verify dark theme is applied
    htmlTheme = await page.locator("html").getAttribute("data-theme");
    expect(htmlTheme).toBe("dark");

    // Components should still be functional
    await expect(card).toBeVisible();
    await expect(navbar).toBeVisible();

    // Test accordion functionality in dark theme
    const accordionHeader = page.locator(".wc-accordion-item__header");
    await accordionHeader.click();
    const accordionPanel = page.locator(".wc-accordion-item__panel");
    await expect(accordionPanel).not.toHaveAttribute("hidden");
  });

  test("theme persists across page reload", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = "<wc-theme-toggle></wc-theme-toggle>";
    });

    // Switch to dark theme
    const themeToggle = page.locator("wc-theme-toggle button");
    await themeToggle.click();
    await page.waitForTimeout(100);

    // Verify dark theme
    let htmlTheme = await page.locator("html").getAttribute("data-theme");
    expect(htmlTheme).toBe("dark");

    // Reload page
    await page.reload();
    await page.waitForLoadState("networkidle");

    // Add theme toggle again
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = "<wc-theme-toggle></wc-theme-toggle>";
    });

    // Theme should persist
    htmlTheme = await page.locator("html").getAttribute("data-theme");
    expect(htmlTheme).toBe("dark");
  });
});
