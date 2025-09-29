import { test, expect } from "../setup";

test.describe("Slideshow Component", () => {
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

  test("renders slideshow with items", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-slideshow>
          <wc-slideshow-item>Slide 1</wc-slideshow-item>
          <wc-slideshow-item>Slide 2</wc-slideshow-item>
          <wc-slideshow-item>Slide 3</wc-slideshow-item>
        </wc-slideshow>
      `;
    });

    const slideshow = page.locator("wc-slideshow");
    const items = slideshow.locator("wc-slideshow-item");

    await expect(slideshow).toBeVisible();
    await expect(items).toHaveCount(3);
  });

  test("shows navigation controls", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-slideshow show-nav="true" show-indicators="true">
          <wc-slideshow-item>Slide 1</wc-slideshow-item>
          <wc-slideshow-item>Slide 2</wc-slideshow-item>
          <wc-slideshow-item>Slide 3</wc-slideshow-item>
        </wc-slideshow>
      `;
    });

    const slideshow = page.locator("wc-slideshow");
    const prevButton = slideshow.locator(".wc-slideshow__nav-button--prev");
    const nextButton = slideshow.locator(".wc-slideshow__nav-button--next");
    const indicators = slideshow.locator(".wc-slideshow__indicator");
    const counter = slideshow.locator(".wc-slideshow__counter");

    await expect(prevButton).toBeVisible();
    await expect(nextButton).toBeVisible();
    await expect(indicators).toHaveCount(3);
    await expect(counter).toBeVisible();
  });

  test("navigates slides with buttons", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-slideshow show-nav="true" auto-play="false">
          <wc-slideshow-item>Slide 1</wc-slideshow-item>
          <wc-slideshow-item>Slide 2</wc-slideshow-item>
          <wc-slideshow-item>Slide 3</wc-slideshow-item>
        </wc-slideshow>
      `;
    });

    const nextButton = page.locator(".wc-slideshow__nav-button--next");
    const prevButton = page.locator(".wc-slideshow__nav-button--prev");
    const counter = page.locator(".wc-slideshow__counter");

    // Initially should show 1/3
    await expect(counter).toContainText("1/3");

    // Initially prev should be disabled
    await expect(prevButton).toHaveClass(/wc-slideshow__nav-button--disabled/);

    // Click next
    await nextButton.click();
    await page.waitForTimeout(200);
    await expect(counter).toContainText("2/3");

    // Prev should now be enabled
    await expect(prevButton).not.toHaveClass(
      /wc-slideshow__nav-button--disabled/
    );

    // Click next again to reach end
    await nextButton.click();
    await page.waitForTimeout(200);
    await expect(counter).toContainText("3/3");

    // Next should now be disabled
    await expect(nextButton).toHaveClass(/wc-slideshow__nav-button--disabled/);
  });

  test("navigates with indicators", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-slideshow show-indicators="true" auto-play="false">
          <wc-slideshow-item>Slide 1</wc-slideshow-item>
          <wc-slideshow-item>Slide 2</wc-slideshow-item>
          <wc-slideshow-item>Slide 3</wc-slideshow-item>
        </wc-slideshow>
      `;
    });

    const indicators = page.locator(".wc-slideshow__indicator");
    const counter = page.locator(".wc-slideshow__counter");

    // Click third indicator
    await indicators.nth(2).click();
    await page.waitForTimeout(200);
    await expect(counter).toContainText("3/3");

    // Third indicator should be active
    await expect(indicators.nth(2)).toHaveClass(
      /wc-slideshow__indicator--active/
    );
  });

  test("handles auto-play", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-slideshow auto-play="true" interval="400">
          <wc-slideshow-item>Slide 1</wc-slideshow-item>
          <wc-slideshow-item>Slide 2</wc-slideshow-item>
          <wc-slideshow-item>Slide 3</wc-slideshow-item>
        </wc-slideshow>
      `;
    });

    const counter = page.locator(".wc-slideshow__counter");

    // Should start at slide 1
    await expect(counter).toContainText("1/3");

    // Wait for auto-play to advance
    await page.waitForTimeout(500);
    await expect(counter).toContainText("2/3");

    // Wait for another advance
    await page.waitForTimeout(500);
    await expect(counter).toContainText("3/3");
  });

  test("pauses auto-play on hover", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-slideshow auto-play="true" interval="300">
          <wc-slideshow-item>Slide 1</wc-slideshow-item>
          <wc-slideshow-item>Slide 2</wc-slideshow-item>
          <wc-slideshow-item>Slide 3</wc-slideshow-item>
        </wc-slideshow>
      `;
    });

    const slideshow = page.locator("wc-slideshow");
    const counter = page.locator(".wc-slideshow__counter");

    // Hover over slideshow
    await slideshow.hover();

    // Wait longer than interval
    await page.waitForTimeout(500);

    // Should still be on first slide
    await expect(counter).toContainText("1/3");
  });

  test("supports touch/swipe navigation", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-slideshow auto-play="false">
          <wc-slideshow-item>Slide 1</wc-slideshow-item>
          <wc-slideshow-item>Slide 2</wc-slideshow-item>
          <wc-slideshow-item>Slide 3</wc-slideshow-item>
        </wc-slideshow>
      `;
    });

    const slideshowContainer = page.locator(".wc-slideshow__container");
    const counter = page.locator(".wc-slideshow__counter");

    // Simulate swipe left (next slide)
    const box = await slideshowContainer.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width * 0.8, box.y + box.height / 2);
      await page.mouse.down();
      await page.mouse.move(box.x + box.width * 0.2, box.y + box.height / 2);
      await page.mouse.up();
    }

    await page.waitForTimeout(200);
    await expect(counter).toContainText("2/3");
  });

  test("dispatches slideshow events", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-slideshow show-nav="true" auto-play="false">
          <wc-slideshow-item>Slide 1</wc-slideshow-item>
          <wc-slideshow-item>Slide 2</wc-slideshow-item>
        </wc-slideshow>
      `;

      // Usar un nombre único para evitar conflictos
      (window as any).testSlideshowEvents = [];
      document.addEventListener("slideshow-change", (e: CustomEvent) => {
        (window as any).testSlideshowEvents.push({
          type: "change",
          detail: e.detail,
        });
      });
      document.addEventListener("slideshow-navigation", (e: CustomEvent) => {
        (window as any).testSlideshowEvents.push({
          type: "navigation",
          detail: e.detail,
        });
      });
    });

    const nextButton = page.locator(".wc-slideshow__nav-button--next");
    await nextButton.click();

    const events = await page.evaluate(
      () => (window as any).testSlideshowEvents || []
    );
    expect(events.length).toBeGreaterThan(0);

    const changeEvent = events.find((e: any) => e.type === "change");
    const navEvent = events.find((e: any) => e.type === "navigation");

    expect(changeEvent).toBeDefined();
    expect(navEvent).toBeDefined();
    expect(changeEvent.detail.currentIndex).toBe(1);
    expect(navEvent.detail.direction).toBe("next");
  });

  test("handles modal mode", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-slideshow modal="true">
          <wc-slideshow-item>Slide 1</wc-slideshow-item>
          <wc-slideshow-item>Slide 2</wc-slideshow-item>
        </wc-slideshow>
      `;
    });

    const slideshow = page.locator("wc-slideshow");

    // In modal mode, navigation should be hidden
    await expect(slideshow).toHaveClass(/wc-slideshow--full-width/);
    await expect(
      slideshow.locator(".wc-slideshow__navigation")
    ).not.toBeVisible();
  });
});
