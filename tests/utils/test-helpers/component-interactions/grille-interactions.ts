import { BaseComponentInteractions } from "./base-interactions";

export class GrilleInteractions extends BaseComponentInteractions {
  async performInteractions(): Promise<boolean> {
    try {
      const grilleItems = this.page.locator("wc-grille-item");
      const count = await grilleItems.count();

      if (count === 0) {
        console.log("No grille items found");
        return true;
      }

      // Hover secuencial sobre items (máximo 6 para no hacer muy largo)
      const itemsToHover = Math.min(count, 6);

      for (let i = 0; i < itemsToHover; i++) {
        await grilleItems.nth(i).hover();

        // Espera variable: más tiempo en los primeros items
        const delay = i < 2 ? 800 : 500;
        await this.wait(delay);
      }

      // Patrón de hover en zig-zag para mostrar la estructura de la grilla
      if (count >= 4) {
        // Primer row: 0, 1, 2
        await grilleItems.nth(0).hover();
        await this.wait(400);
        await grilleItems.nth(2).hover();
        await this.wait(400);

        // Segundo row: 3, 4, 5 si existen
        if (count >= 5) {
          await grilleItems.nth(3).hover();
          await this.wait(400);
          await grilleItems.nth(4).hover();
          await this.wait(400);
        }
      }

      // Volver al primer item
      await grilleItems.nth(0).hover();
      await this.wait(500);

      return true;
    } catch (error) {
      console.warn("Grille interactions failed:", error);
      return false;
    }
  }
}
