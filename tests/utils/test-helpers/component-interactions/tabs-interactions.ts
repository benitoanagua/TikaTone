import { BaseComponentInteractions } from "./base-interactions";

export class TabsInteractions extends BaseComponentInteractions {
  async performInteractions(): Promise<boolean> {
    try {
      // Usar el elemento wc-tab directamente en lugar del botón interno
      const tabs = this.page.locator("wc-tab");
      const count = await tabs.count();

      if (count === 0) {
        console.log("No tabs found");
        return true;
      }

      console.log(`Found ${count} tabs`);

      // Navegar secuencialmente por todas las tabs
      for (let i = 0; i < count; i++) {
        const tab = tabs.nth(i);

        // Intentar click normal primero
        try {
          await tab.click({ timeout: 5000 });
        } catch (error) {
          // Si falla, usar force click
          console.log(`Using force click for tab ${i + 1}`);
          await tab.click({ force: true });
        }

        await this.wait(1000);

        // Espera adicional en la primera y última tab
        if (i === 0 || i === count - 1) {
          await this.wait(300);
        }
      }

      // Hover effects sobre todas las tabs
      for (let i = 0; i < count; i++) {
        await tabs.nth(i).hover();
        await this.wait(400);
      }

      // Volver a la primera tab
      await tabs.nth(0).click({ force: true });
      await this.wait(600);

      return true;
    } catch (error) {
      console.warn("Tabs interactions failed:", error);
      return false;
    }
  }
}
