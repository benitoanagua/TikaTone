import { test, expect } from "../setup";
import { COMPONENT_SELECTORS } from "../utils/component-selectors";

test.describe("Carousel Component", () => {
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

  test("renders carousel with items", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-carousel desktop="3" mobile="1">
          ${Array.from(
            { length: 5 },
            (_, i) => `<wc-carousel-item>Item ${i + 1}</wc-carousel-item>`
          ).join("")}
        </wc-carousel>
      `;
    });

    const carousel = page.locator("wc-carousel");
    const items = carousel.locator("wc-carousel-item");

    await expect(carousel).toBeVisible();
    await expect(items).toHaveCount(5);
  });

  test("shows navigation arrows and dots", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
      <wc-carousel desktop="2" mobile="1" show-arrows="true" show-dots="true">
        ${Array.from(
          { length: 4 },
          (_, i) => `<wc-carousel-item>Item ${i + 1}</wc-carousel-item>`
        ).join("")}
      </wc-carousel>
    `;
    });

    await page.waitForSelector("wc-carousel");

    const carousel = page.locator("wc-carousel");
    const prevArrow = carousel.locator(COMPONENT_SELECTORS.carousel.prev);
    const nextArrow = carousel.locator(COMPONENT_SELECTORS.carousel.next);
    const dots = carousel.locator('[role="tab"]');

    await expect(prevArrow).toBeVisible();
    await expect(nextArrow).toBeVisible();
    await expect(dots).toHaveCount(2);
  });

  test("navigates with arrow buttons", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-carousel desktop="2" mobile="1" show-arrows="true" auto-play="false">
          ${Array.from(
            { length: 4 },
            (_, i) => `<wc-carousel-item>Item ${i + 1}</wc-carousel-item>`
          ).join("")}
        </wc-carousel>
      `;
    });

    await page.waitForTimeout(200);

    const nextArrow = page.locator(COMPONENT_SELECTORS.carousel.next);
    const prevArrow = page.locator(COMPONENT_SELECTORS.carousel.prev);

    // Initially prev arrow should be disabled
    await expect(prevArrow).toHaveClass(/wc-carousel__arrow--disabled/);

    // Click next arrow
    await nextArrow.click();
    await page.waitForTimeout(200);

    // Now prev arrow should be enabled
    await expect(prevArrow).not.toHaveClass(/wc-carousel__arrow--disabled/);
  });

  test("handles touch/drag interactions", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-carousel desktop="2" mobile="1" auto-play="false">
          ${Array.from(
            { length: 4 },
            (_, i) => `<wc-carousel-item>Item ${i + 1}</wc-carousel-item>`
          ).join("")}
        </wc-carousel>
      `;
    });

    const carouselContainer = page.locator(".wc-carousel__container");

    // Get initial scroll position
    const initialScroll = await carouselContainer.evaluate(
      (el) => el.scrollLeft
    );

    // Simulate swipe gesture
    const box = await carouselContainer.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width * 0.8, box.y + box.height / 2);
      await page.mouse.down();
      await page.mouse.move(box.x + box.width * 0.2, box.y + box.height / 2);
      await page.mouse.up();
    }

    await page.waitForTimeout(200);

    // Scroll position should have changed
    const newScroll = await carouselContainer.evaluate((el) => el.scrollLeft);
    expect(newScroll).toBeGreaterThan(initialScroll);
  });

  test("auto-play functionality", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-carousel desktop="2" mobile="1" auto-play="true" interval="500">
          ${Array.from(
            { length: 4 },
            (_, i) => `<wc-carousel-item>Item ${i + 1}</wc-carousel-item>`
          ).join("")}
        </wc-carousel>
      `;
    });

    const carouselContainer = page.locator(".wc-carousel__container");

    // Get initial scroll position
    const initialScroll = await carouselContainer.evaluate(
      (el) => el.scrollLeft
    );

    // Wait for auto-play to trigger
    await page.waitForTimeout(700);

    // Should have advanced
    const newScroll = await carouselContainer.evaluate((el) => el.scrollLeft);
    expect(newScroll).toBeGreaterThan(initialScroll);
  });

  test("pauses auto-play on hover", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-carousel desktop="2" mobile="1" auto-play="true" interval="300">
          ${Array.from(
            { length: 4 },
            (_, i) => `<wc-carousel-item>Item ${i + 1}</wc-carousel-item>`
          ).join("")}
        </wc-carousel>
      `;
    });

    const carousel = page.locator("wc-carousel");
    const carouselContainer = page.locator(".wc-carousel__container");

    // Hover over carousel
    await carousel.hover();

    const initialScroll = await carouselContainer.evaluate(
      (el) => el.scrollLeft
    );

    // Wait longer than interval
    await page.waitForTimeout(500);

    // Should not have advanced while hovering
    const scrollAfterHover = await carouselContainer.evaluate(
      (el) => el.scrollLeft
    );
    expect(scrollAfterHover).toBe(initialScroll);
  });
});
