import { BaseComponentInteractions } from "./base-interactions";
import { COMPONENT_SELECTORS } from "../../component-selectors";

export class SlideshowInteractions extends BaseComponentInteractions {
  async performInteractions(): Promise<boolean> {
    try {
      const nextButton = this.page.locator(COMPONENT_SELECTORS.slideshow.next);
      const prevButton = this.page.locator(COMPONENT_SELECTORS.slideshow.prev);
      const indicators = this.page.locator(
        COMPONENT_SELECTORS.slideshow.indicators
      );

      // Verificar que el slideshow esté funcionando
      const slideshow = this.page.locator("wc-slideshow");
      if (!(await slideshow.isVisible())) {
        console.log("Slideshow not visible");
        return true;
      }

      // Hover sobre el slideshow completo
      await slideshow.hover();
      await this.wait(800);

      // Navegación con botones de siguiente
      if (await nextButton.isEnabled()) {
        await this.clickSequence(
          [
            COMPONENT_SELECTORS.slideshow.next,
            COMPONENT_SELECTORS.slideshow.next,
          ],
          1200
        );
      }

      // Navegación con botón anterior
      if (await prevButton.isEnabled()) {
        await prevButton.click();
        await this.wait(1200);
      }

      // Navegación con indicadores (dots)
      await this.interactWithIndicators(indicators);

      // Interacción con contador si existe
      await this.interactWithCounter();

      // Hover sobre slides individuales
      await this.interactWithSlides();

      return true;
    } catch (error) {
      console.warn("Slideshow interactions failed:", error);
      return false;
    }
  }

  private async interactWithIndicators(indicators: any): Promise<void> {
    const indicatorCount = await indicators.count();

    if (indicatorCount > 0) {
      console.log(`Found ${indicatorCount} indicators`);

      // Click en indicadores específicos (no todos para no hacerlo muy largo)
      const indicatorsToClick = Math.min(indicatorCount, 3);

      for (let i = 0; i < indicatorsToClick; i++) {
        // Saltar algunos indicadores si hay muchos
        const indicatorIndex =
          i * Math.ceil(indicatorCount / indicatorsToClick);
        if (indicatorIndex < indicatorCount) {
          await indicators.nth(indicatorIndex).click();
          await this.wait(1000);
        }
      }

      // Hover sobre indicadores
      for (let i = 0; i < Math.min(indicatorCount, 4); i++) {
        await indicators.nth(i).hover();
        await this.wait(300);
      }
    }
  }

  private async interactWithCounter(): Promise<void> {
    const counter = this.page.locator(".wc-slideshow__counter");

    if (await counter.isVisible()) {
      await counter.hover();
      await this.wait(500);
    }
  }

  private async interactWithSlides(): Promise<void> {
    const slides = this.page.locator("wc-slideshow-item");
    const slideCount = await slides.count();

    if (slideCount > 0) {
      // Hover sobre slides activos
      for (let i = 0; i < Math.min(slideCount, 3); i++) {
        const slide = slides.nth(i);
        if (await slide.isVisible()) {
          await slide.hover();
          await this.wait(600);
        }
      }
    }
  }
}
