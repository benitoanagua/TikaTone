import { BaseComponentInteractions } from "./base-interactions";
import { COMPONENT_SELECTORS } from "../../component-selectors";

export class ThemeToggleInteractions extends BaseComponentInteractions {
  async performInteractions(): Promise<boolean> {
    try {
      const themeToggle = this.page.locator(
        COMPONENT_SELECTORS.themeToggle.button
      );

      // Cambiar tema varias veces
      await this.clickSequence(
        [
          COMPONENT_SELECTORS.themeToggle.button,
          COMPONENT_SELECTORS.themeToggle.button,
        ],
        1200
      );

      // Hover effect
      await themeToggle.hover();
      await this.wait(800);

      return true;
    } catch (error) {
      console.warn("ThemeToggle interactions failed:", error);
      return false;
    }
  }
}
