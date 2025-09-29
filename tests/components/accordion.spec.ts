import { test, expect } from "../setup";
import { COMPONENT_SELECTORS } from "../utils/component-selectors";

test.describe("Accordion Component", () => {
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

  test("renders accordion with items", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-accordion>
          <wc-accordion-item>
            <span slot="header">Item 1</span>
            <p>Content 1</p>
          </wc-accordion-item>
          <wc-accordion-item>
            <span slot="header">Item 2</span>
            <p>Content 2</p>
          </wc-accordion-item>
        </wc-accordion>
      `;
    });

    await page.waitForSelector("wc-accordion");

    const accordion = page.locator("wc-accordion");
    const items = accordion.locator("wc-accordion-item");

    await expect(accordion).toBeVisible();
    await expect(items).toHaveCount(2);
  });

  test("expands and collapses items on click", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-accordion>
          <wc-accordion-item>
            <span slot="header">Clickable Header</span>
            <p>This content should toggle</p>
          </wc-accordion-item>
        </wc-accordion>
      `;
    });

    await page.waitForSelector("wc-accordion-item");

    const item = page.locator("wc-accordion-item");
    const header = item.locator(COMPONENT_SELECTORS.accordion.header);
    const panel = item.locator('[role="region"]');

    // Initially collapsed
    await expect(panel).toBeHidden();

    // Expand on click
    await header.click();
    await page.waitForTimeout(100);
    await expect(panel).toBeVisible();

    // Collapse on click
    await header.click();
    await page.waitForTimeout(100);
    await expect(panel).toBeHidden();
  });

  test("handles multiple mode correctly", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-accordion multiple>
          <wc-accordion-item>
            <span slot="header">Item 1</span>
            <p>Content 1</p>
          </wc-accordion-item>
          <wc-accordion-item>
            <span slot="header">Item 2</span>
            <p>Content 2</p>
          </wc-accordion-item>
        </wc-accordion>
      `;
    });

    await page.waitForSelector("wc-accordion-item");

    const items = page.locator("wc-accordion-item");
    const firstHeader = items
      .nth(0)
      .locator(COMPONENT_SELECTORS.accordion.header);
    const secondHeader = items
      .nth(1)
      .locator(COMPONENT_SELECTORS.accordion.header);

    // Click both headers
    await firstHeader.click();
    await page.waitForTimeout(100);
    await secondHeader.click();
    await page.waitForTimeout(100);

    // Both should be open in multiple mode
    const firstPanel = items.nth(0).locator('[role="region"]');
    const secondPanel = items.nth(1).locator('[role="region"]');

    await expect(firstPanel).toBeVisible();
    await expect(secondPanel).toBeVisible();
  });

  test("handles single mode correctly", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-accordion>
          <wc-accordion-item>
            <span slot="header">Item 1</span>
            <p>Content 1</p>
          </wc-accordion-item>
          <wc-accordion-item>
            <span slot="header">Item 2</span>
            <p>Content 2</p>
          </wc-accordion-item>
        </wc-accordion>
      `;
    });

    await page.waitForSelector("wc-accordion-item");

    const items = page.locator("wc-accordion-item");
    const firstHeader = items
      .nth(0)
      .locator(COMPONENT_SELECTORS.accordion.header);
    const secondHeader = items
      .nth(1)
      .locator(COMPONENT_SELECTORS.accordion.header);

    // Click first header
    await firstHeader.click();
    await page.waitForTimeout(100);

    let firstPanel = items.nth(0).locator('[role="region"]');
    await expect(firstPanel).toBeVisible();

    // Click second header - first should collapse
    await secondHeader.click();
    await page.waitForTimeout(100);

    firstPanel = items.nth(0).locator('[role="region"]');
    const secondPanel = items.nth(1).locator('[role="region"]');

    await expect(firstPanel).toBeHidden();
    await expect(secondPanel).toBeVisible();
  });

  test("handles disabled items", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-accordion>
          <wc-accordion-item disabled>
            <span slot="header">Disabled Item</span>
            <p>This content should not be accessible</p>
          </wc-accordion-item>
        </wc-accordion>
      `;
    });

    await page.waitForSelector("wc-accordion-item");

    const header = page.locator(COMPONENT_SELECTORS.accordion.header);
    const panel = page.locator('[role="region"]');

    // Should be disabled
    await expect(header).toBeDisabled();

    // Should not expand when clicked
    await header.click({ force: true });
    await page.waitForTimeout(100);
    await expect(panel).toBeHidden();
  });

  test("supports keyboard navigation", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-accordion>
          <wc-accordion-item>
            <span slot="header">Keyboard Item</span>
            <p>Content accessible via keyboard</p>
          </wc-accordion-item>
        </wc-accordion>
      `;
    });

    await page.waitForSelector("wc-accordion-item");

    const header = page.locator(COMPONENT_SELECTORS.accordion.header);
    const panel = page.locator('[role="region"]');

    // Focus and use keyboard
    await header.focus();

    // Expand with Enter
    await page.keyboard.press("Enter");
    await page.waitForTimeout(100);
    await expect(panel).toBeVisible();

    // Collapse with Space
    await page.keyboard.press("Space");
    await page.waitForTimeout(100);
    await expect(panel).toBeHidden();
  });

  test("shows correct ARIA attributes", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-accordion>
          <wc-accordion-item>
            <span slot="header">ARIA Test</span>
            <p>Content for ARIA testing</p>
          </wc-accordion-item>
        </wc-accordion>
      `;
    });

    await page.waitForSelector("wc-accordion-item");

    const header = page.locator(COMPONENT_SELECTORS.accordion.header);

    await expect(header).toHaveAttribute("aria-expanded", "false");

    // Expand and check ARIA
    await header.click();
    await page.waitForTimeout(100);
    await expect(header).toHaveAttribute("aria-expanded", "true");
  });
});
