import { Page } from "@playwright/test"; // Eliminar expect y Locator no utilizados

export interface ComponentDiagnostics {
  exists: boolean;
  tagName?: string;
  classes?: string;
  children?: number;
  visible?: boolean;
  clickableElements?: number;
}

export class ComponentTestHelpers {
  constructor(private page: Page) {}

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

    // Additional wait for any internal rendering with retry
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
      } catch (error) {
        await this.page.waitForTimeout(200);
        retries--;
      }
    }
  }

  /**
   * Diagnostic function to check component health
   */
  async diagnoseComponent(selector: string): Promise<ComponentDiagnostics> {
    const diagnostics = await this.page.evaluate((sel: string) => {
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

    return diagnostics;
  }

  /**
   * Check ARIA attributes
   */
  async checkAccessibility(
    selector: string
  ): Promise<Record<string, string | null>> {
    const element = this.page.locator(selector);

    const attributes = await element.evaluate((el: Element) => {
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

    return attributes;
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
}
