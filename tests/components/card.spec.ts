import { test, expect } from "../setup";

test.describe("Card Component", () => {
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

  test("renders basic card with title", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-card 
          title="Test Title" 
          url="https://example.com"
        ></wc-card>
      `;
    });

    await page.waitForSelector("wc-card");

    // Check if card is rendered
    const card = page.locator("wc-card");
    await expect(card).toBeVisible();

    // Check title
    const title = card.locator(".wc-card__title-link");
    await expect(title).toHaveText("Test Title");
    await expect(title).toHaveAttribute("href", "https://example.com");
  });

  test("renders card with image", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-card 
          title="Test Title"
          feature-image="https://picsum.photos/400/300"
          aspect-ratio="square"
        ></wc-card>
      `;
    });

    const card = page.locator("wc-card");
    const image = card.locator(".wc-card__figure img");

    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute("src", "https://picsum.photos/400/300");
    await expect(image).toHaveClass(/aspect-square/);
  });

  // En el test "handles different heading levels", corregir:
  test("handles different heading levels", async ({ page }) => {
    for (const heading of [1, 2, 3, 4, 5, 6]) {
      await page.evaluate((h) => {
        const container = document.getElementById("test-container");
        container!.innerHTML = `
        <wc-card 
          title="Test Title" 
          heading="${h}"
        ></wc-card>
      `;
      }, heading);

      await page.waitForSelector("wc-card"); // Agregar espera

      // Usar selector más robusto
      const titleElement = page
        .locator(
          `wc-card h1, wc-card h2, wc-card h3, wc-card h4, wc-card h5, wc-card h6`
        )
        .first();
      await expect(titleElement).toBeVisible();

      // Verificar que tiene la clase correcta
      const classList = await titleElement.getAttribute("class");
      expect(classList).toContain(`headline-${heading}`);
    }
  });

  test("shows author information when provided", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-card 
          title="Test Title"
          author-name="John Doe"
          author-url="https://example.com/author"
          author-profile-image="https://picsum.photos/50/50"
        ></wc-card>
      `;
    });

    const card = page.locator("wc-card");
    const authorSection = card.locator(".wc-card__author");
    const authorLink = authorSection.locator(".wc-card__author-link");
    const authorImage = authorSection.locator(".wc-card__author-image");

    await expect(authorSection).toBeVisible();
    await expect(authorLink).toHaveText("John Doe");
    await expect(authorLink).toHaveAttribute(
      "href",
      "https://example.com/author"
    );
    await expect(authorImage).toHaveAttribute(
      "src",
      "https://picsum.photos/50/50"
    );
  });

  test("handles different media alignments", async ({ page }) => {
    const alignments = ["left", "right", "top", "bottom"];

    for (const align of alignments) {
      await page.evaluate((alignment) => {
        const container = document.getElementById("test-container");
        container!.innerHTML = `
          <wc-card 
            title="Test Title"
            feature-image="https://picsum.photos/400/300"
            media-align="${alignment}"
          ></wc-card>
        `;
      }, align);

      const card = page.locator("wc-card");
      const cardContainer = card.locator(".wc-card__container");

      if (align === "left") {
        await expect(cardContainer).toHaveClass(/flex-row/);
      } else if (align === "right") {
        await expect(cardContainer).toHaveClass(/flex-row-reverse/);
      } else if (align === "top") {
        await expect(cardContainer).toHaveClass(/flex-col/);
      } else if (align === "bottom") {
        await expect(cardContainer).toHaveClass(/flex-col-reverse/);
      }
    }
  });

  test("responsive behavior with auto-layout", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-card 
          title="Test Title"
          feature-image="https://picsum.photos/400/300"
          media-align="left"
          auto-layout="true"
        ></wc-card>
      `;
    });

    const card = page.locator("wc-card");
    const cardContainer = card.locator(".wc-card__container");

    // Should have responsive classes
    await expect(cardContainer).toHaveClass(/flex-col/);
    await expect(cardContainer).toHaveClass(/md:flex-row/);

    // Test mobile viewport
    await page.setViewportSize({ width: 600, height: 800 });
    await expect(cardContainer).toBeVisible();

    // Test desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(cardContainer).toBeVisible();
  });

  test("shows meta information", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-card 
          title="Test Title"
          published-at="Jan 15, 2024"
          reading-time="5 min read"
          tag-name="Technology"
          tag-url="https://example.com/tech"
        ></wc-card>
      `;
    });

    const card = page.locator("wc-card");
    const meta = card.locator(".wc-card__meta");
    const tag = card.locator(".wc-card__tag");

    await expect(meta).toBeVisible();
    await expect(meta).toContainText("Jan 15, 2024");
    await expect(meta).toContainText("5 min read");

    await expect(tag).toBeVisible();
    await expect(tag).toHaveText("Technology");
    await expect(tag).toHaveAttribute("href", "https://example.com/tech");
  });

  test("applies flat design styling", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-card title="Test Title"></wc-card>
      `;
    });

    const card = page.locator("wc-card");

    // Check for flat design classes
    await expect(card).toHaveClass(/wc-card--flat/);

    // Verify no rounded corners or shadows in computed styles
    const computedStyle = await card.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        borderRadius: styles.borderRadius,
        boxShadow: styles.boxShadow,
      };
    });

    expect(computedStyle.borderRadius).toBe("0px");
    expect(computedStyle.boxShadow).toBe("none");
  });

  test("handles click events", async ({ page }) => {
    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      container!.innerHTML = `
        <wc-card 
          title="Clickable Card"
          url="https://example.com/article"
        ></wc-card>
      `;
    });

    const titleLink = page.locator("wc-card .wc-card__title-link");

    await expect(titleLink).toBeVisible();
    await expect(titleLink).toHaveAttribute(
      "href",
      "https://example.com/article"
    );
  });
});
