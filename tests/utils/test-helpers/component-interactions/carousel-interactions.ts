import { BaseComponentInteractions } from "./base-interactions";
import { COMPONENT_SELECTORS } from "../../component-selectors";

export class CarouselInteractions extends BaseComponentInteractions {
  async performInteractions(): Promise<boolean> {
    try {
      // Navegación con flechas usando clicks robustos
      await this.robustClick([COMPONENT_SELECTORS.carousel.next]);
      await this.wait(1200);

      await this.robustClick([COMPONENT_SELECTORS.carousel.next]);
      await this.wait(1200);

      await this.robustClick([COMPONENT_SELECTORS.carousel.prev]);
      await this.wait(1200);

      // Resto del código igual...
      return true;
    } catch (error) {
      console.warn("Carousel interactions failed:", error);
      return false;
    }
  }
}
