import { BaseComponentInteractions } from "./base-interactions";

export class OverlayInteractions extends BaseComponentInteractions {
  async performInteractions(): Promise<boolean> {
    try {
      const overlay = this.page.locator("wc-overlay");

      // Hover sobre el overlay completo
      await overlay.hover();
      await this.wait(1000);

      // Interactuar con elementos internos si existen
      await this.hoverSequence(
        [".wc-overlay__title-link", ".wc-overlay__category"],
        800
      );

      // Click en el título si es enlace
      const titleLink = this.page.locator(".wc-overlay__title-link");
      if (await titleLink.isVisible()) {
        await titleLink.hover();
        await this.wait(500);
      }

      // Interactuar con meta información si existe
      const metaItems = this.page.locator(".wc-overlay__meta-item");
      const metaCount = await metaItems.count();

      if (metaCount > 0) {
        for (let i = 0; i < Math.min(metaCount, 3); i++) {
          await metaItems.nth(i).hover();
          await this.wait(300);
        }
      }

      return true;
    } catch (error) {
      console.warn("Overlay interactions failed:", error);
      return false;
    }
  }
}
