import { BaseComponentInteractions } from "./base-interactions";

export class AccordionInteractions extends BaseComponentInteractions {
  async performInteractions(): Promise<boolean> {
    try {
      // Usar selectores más específicos que eviten elementos que intercepten clicks
      const accordionHeaders = this.page.locator("wc-accordion-item");
      const count = await accordionHeaders.count();

      if (count === 0) {
        console.log("No accordion items found");
        return true;
      }

      console.log(`Found ${count} accordion items`);

      // Abrir todos los items secuencialmente usando force click si es necesario
      for (let i = 0; i < count; i++) {
        const header = accordionHeaders.nth(i);

        // Intentar click normal primero
        try {
          await header.click({ timeout: 5000 });
        } catch (error) {
          // Si falla, usar force click
          console.log(`Using force click for accordion item ${i + 1}`);
          await header.click({ force: true });
        }

        await this.wait(1000);
      }

      // Cerrar items en orden inverso (excepto el primero)
      for (let i = count - 1; i > 0; i--) {
        const header = accordionHeaders.nth(i);

        try {
          await header.click({ timeout: 5000 });
        } catch (error) {
          await header.click({ force: true });
        }

        await this.wait(800);
      }

      // Hover effects sobre todos los headers
      for (let i = 0; i < count; i++) {
        await accordionHeaders.nth(i).hover();
        await this.wait(400);
      }

      return true;
    } catch (error) {
      console.warn("Accordion interactions failed:", error);
      return false;
    }
  }
}
