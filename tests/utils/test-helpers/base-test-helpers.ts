import { Page, expect } from "@playwright/test";
import type { ComponentDiagnostics } from "./types";

export class BaseTestHelpers {
  constructor(protected page: Page) {}

  /**
   * Setup a test page with proper HTML structure
   */
  async setupTestPage(): Promise<void> {
    await this.page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="/tika-tone-elements.css">
        </head>
        <body>
          <div id="test-container" style="padding: 20px;"></div>
          <script type="module" src="/tika-tone-elements.es.js"></script>
        </body>
      </html>
    `);

    await this.page.waitForFunction(
      () =>
        customElements.get("wc-card") !== undefined &&
        customElements.get("wc-accordion") !== undefined
    );

    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Wait for component to be fully rendered with retry logic
   */
  async waitForComponent(selector: string, timeout = 5000): Promise<void> {
    await this.page.waitForSelector(selector, { timeout });

    let retries = 3;
    while (retries > 0) {
      try {
        const isReady = await this.page.evaluate((sel: string) => {
          const element = document.querySelector(sel);
          return element && (element as HTMLElement).offsetWidth > 0;
        }, selector);

        if (isReady) break;
        await this.page.waitForTimeout(200);
        retries--;
      } catch {
        await this.page.waitForTimeout(200);
        retries--;
      }
    }
  }

  /**
   * Diagnostic function to check component health
   */
  async diagnoseComponent(selector: string): Promise<ComponentDiagnostics> {
    return await this.page.evaluate((sel: string) => {
      const element = document.querySelector(sel);
      if (!element) return { exists: false };

      const htmlElement = element as HTMLElement;
      return {
        exists: true,
        tagName: element.tagName,
        classes: element.className,
        children: element.children.length,
        visible: !!(htmlElement.offsetWidth || htmlElement.offsetHeight),
        clickableElements: element.querySelectorAll('button, [role="button"]')
          .length,
      };
    }, selector);
  }

  /**
   * Check ARIA attributes
   */
  async checkAccessibility(
    selector: string
  ): Promise<Record<string, string | null>> {
    const element = this.page.locator(selector);

    return await element.evaluate((el: Element) => {
      const attrs: Record<string, string | null> = {};
      const ariaAttributes = [
        "role",
        "aria-label",
        "aria-labelledby",
        "aria-describedby",
        "aria-expanded",
        "aria-selected",
        "aria-hidden",
        "tabindex",
      ];

      ariaAttributes.forEach((attr: string) => {
        if (el.hasAttribute(attr)) {
          attrs[attr] = el.getAttribute(attr);
        }
      });

      return attrs;
    });
  }

  /**
   * Add component HTML to test container
   */
  async addComponent(html: string): Promise<void> {
    await this.page.evaluate((componentHtml: string) => {
      const container = document.getElementById("test-container");
      if (container) {
        container.innerHTML = componentHtml;
      }
    }, html);
  }

  /**
   * Capture component screenshot
   */
  async captureComponentScreenshot(
    selector: string,
    name: string
  ): Promise<void> {
    const element = this.page.locator(selector);
    await expect(element).toBeVisible();
    await expect(element).toHaveScreenshot(`${name}.png`);
  }

  /**
   * Safe wait utility
   */
  async wait(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }

  /**
   * Safe hover utility
   */
  async safeHover(selector: string): Promise<boolean> {
    try {
      const element = this.page.locator(selector);
      if (await element.isVisible()) {
        await element.hover();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Safe click utility with fallback to force click
   */
  async safeClick(selector: string, timeout = 5000): Promise<boolean> {
    try {
      const element = this.page.locator(selector);
      if (await element.isVisible()) {
        await element.click({ timeout });
        return true;
      }
      return false;
    } catch (error) {
      console.log(`Normal click failed for ${selector}, trying force click`);
      try {
        const element = this.page.locator(selector);
        await element.click({ force: true });
        return true;
      } catch (forceError) {
        console.warn(`Force click also failed for ${selector}:`, forceError);
        return false;
      }
    }
  }

  /**
   * Click on element with multiple selector fallbacks
   */
  async robustClick(selectors: string[], timeout = 5000): Promise<boolean> {
    for (const selector of selectors) {
      try {
        const element = this.page.locator(selector);
        if (await element.isVisible({ timeout: 2000 })) {
          await element.click({ timeout });
          return true;
        }
      } catch (error) {
        continue;
      }
    }

    // If all normal clicks fail, try force clicks
    for (const selector of selectors) {
      try {
        const element = this.page.locator(selector);
        if (await element.isVisible({ timeout: 2000 })) {
          await element.click({ force: true });
          return true;
        }
      } catch (error) {
        continue;
      }
    }

    console.warn(
      `All click attempts failed for selectors: ${selectors.join(", ")}`
    );
    return false;
  }

  /**
   * Wait for element to be ready for interaction
   */
  async waitForInteractive(
    selector: string,
    timeout = 10000
  ): Promise<boolean> {
    try {
      await this.page.waitForSelector(selector, {
        timeout,
        state: "visible",
      });

      // Additional check that element is not covered
      const isActionable = await this.page.evaluate((sel) => {
        const element = document.querySelector(sel);
        if (!element) return false;

        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const topElement = document.elementFromPoint(centerX, centerY);
        return topElement === element || element.contains(topElement);
      }, selector);

      return isActionable;
    } catch (error) {
      return false;
    }
  }
}
