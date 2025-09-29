import { test, expect } from "../setup";

test.describe("Stack Component", () => {
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

  test("renders stack with items", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-stack max-items="3">
          <wc-stack-item title="First">Content 1</wc-stack-item>
          <wc-stack-item title="Second">Content 2</wc-stack-item>
          <wc-stack-item title="Third">Content 3</wc-stack-item>
        </wc-stack>
      `;
    });

    const stack = page.locator("wc-stack");
    const items = stack.locator(".wc-stack-item");

    await expect(stack).toBeVisible();
    await expect(items).toHaveCount(3);
  });

  test("shows correct stacking order", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-stack max-items="3">
          <wc-stack-item title="First">Content 1</wc-stack-item>
          <wc-stack-item title="Second">Content 2</wc-stack-item>
          <wc-stack-item title="Third">Content 3</wc-stack-item>
        </wc-stack>
      `;
    });

    await page.waitForTimeout(200);

    const items = page.locator(".wc-stack-item");

    // Check z-index classes are applied
    const topItem = items.locator(".wc-stack-item--top").first();
    const middleItem = items.locator(".wc-stack-item--middle").first();
    const bottomItem = items.locator(".wc-stack-item--bottom").first();

    await expect(topItem).toBeVisible();
    await expect(middleItem).toBeVisible();
    await expect(bottomItem).toBeVisible();
  });

  test("handles click to bring item to front", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-stack max-items="3">
          <wc-stack-item title="First">Content 1</wc-stack-item>
          <wc-stack-item title="Second">Content 2</wc-stack-item>
          <wc-stack-item title="Third">Content 3</wc-stack-item>
        </wc-stack>
      `;
    });

    await page.waitForTimeout(200);

    // Find a button that's not currently on top
    const buttons = page.locator(".wc-stack__button");
    const secondButton = buttons.nth(1);

    await secondButton.click();
    await page.waitForTimeout(200);

    // The stack order should have changed
    const items = page.locator(".wc-stack-item");
    await expect(items).toHaveCount(3);
  });

  test("dispatches stack-change event", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-stack max-items="3">
          <wc-stack-item title="First">Content 1</wc-stack-item>
          <wc-stack-item title="Second">Content 2</wc-stack-item>
          <wc-stack-item title="Third">Content 3</wc-stack-item>
        </wc-stack>
      `;

      // Usar un nombre único para evitar conflictos
      (window as any).testStackEvents = [];
      document.addEventListener("stack-change", (e: CustomEvent) => {
        (window as any).testStackEvents.push(e.detail);
      });
    });

    await page.waitForTimeout(200);

    const secondButton = page.locator(".wc-stack__button").nth(1);
    await secondButton.click();

    const events = await page.evaluate(
      () => (window as any).testStackEvents || []
    );
    expect(events).toHaveLength(1);
    expect(events[0]).toHaveProperty("activeItem");
  });

  test("adapts to content height", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-stack max-items="3">
          <wc-stack-item title="Short">
            <div style="height: 100px;">Short content</div>
          </wc-stack-item>
          <wc-stack-item title="Tall">
            <div style="height: 300px;">Much taller content that should affect the stack height</div>
          </wc-stack-item>
        </wc-stack>
      `;
    });

    await page.waitForTimeout(300);

    const stack = page.locator("wc-stack");

    // Stack should have adjusted its height based on content
    const boundingBox = await stack.boundingBox();
    expect(boundingBox?.height).toBeGreaterThan(300);
  });

  test("shows different button styles based on position", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-stack max-items="3">
          <wc-stack-item title="First">Content 1</wc-stack-item>
          <wc-stack-item title="Second">Content 2</wc-stack-item>
          <wc-stack-item title="Third">Content 3</wc-stack-item>
        </wc-stack>
      `;
    });

    await page.waitForTimeout(200);

    const buttons = page.locator(".wc-stack__button");

    // There should be buttons with different styling
    const primaryButton = buttons.locator(".wc-stack__button--primary").first();
    const secondaryButton = buttons
      .locator(".wc-stack__button--secondary")
      .first();

    await expect(primaryButton).toBeVisible();
    await expect(secondaryButton).toBeVisible();
  });
});
