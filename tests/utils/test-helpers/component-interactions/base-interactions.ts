import { BaseTestHelpers } from "../base-test-helpers";
import type { ComponentInteractions } from "../types";

export abstract class BaseComponentInteractions
  extends BaseTestHelpers
  implements ComponentInteractions
{
  abstract performInteractions(): Promise<boolean>;

  protected async hoverSequence(
    selectors: string[],
    delay = 600
  ): Promise<void> {
    for (const selector of selectors) {
      await this.safeHover(selector);
      await this.wait(delay);
    }
  }

  protected async clickSequence(
    selectors: string[],
    delay = 800
  ): Promise<void> {
    for (const selector of selectors) {
      await this.robustClick([selector]);
      await this.wait(delay);
    }
  }

  protected async cycleThroughElements(
    selector: string,
    action: "click" | "hover" = "click",
    delay = 800
  ): Promise<void> {
    const elements = this.page.locator(selector);
    const count = await elements.count();

    for (let i = 0; i < count; i++) {
      if (action === "click") {
        await this.robustClick([selector]);
      } else {
        await elements.nth(i).hover();
      }
      await this.wait(delay);
    }
  }

  /**
   * Robust element cycling with force click fallback
   */
  protected async robustElementCycle(
    selector: string,
    delay = 800
  ): Promise<void> {
    const elements = this.page.locator(selector);
    const count = await elements.count();

    for (let i = 0; i < count; i++) {
      const element = elements.nth(i);

      // Try normal click first
      try {
        await element.click({ timeout: 5000 });
      } catch (error) {
        // Fallback to force click
        console.log(`Using force click for element ${i + 1} of ${selector}`);
        await element.click({ force: true });
      }

      await this.wait(delay);
    }
  }
}
