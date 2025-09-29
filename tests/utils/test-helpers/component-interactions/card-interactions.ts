import { BaseComponentInteractions } from "./base-interactions";

export class CardInteractions extends BaseComponentInteractions {
  async performInteractions(): Promise<boolean> {
    try {
      // Hover sobre el card
      await this.safeHover("wc-card");
      await this.wait(800);

      // Hover sequence sobre elementos internos
      await this.hoverSequence([".wc-card__title-link", ".wc-card__tag"]);

      return true;
    } catch (error) {
      console.warn("Card interactions failed:", error);
      return false;
    }
  }
}
