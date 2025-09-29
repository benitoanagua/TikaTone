import { BaseComponentInteractions } from "./base-interactions";

export class NavbarInteractions extends BaseComponentInteractions {
  async performInteractions(): Promise<boolean> {
    try {
      // Hover sobre items de navegación principales
      const navItems = this.page.locator("wc-navbar a");
      const navCount = await navItems.count();

      if (navCount > 0) {
        // Hover sobre primeros 3 items de navegación
        for (let i = 0; i < Math.min(navCount, 3); i++) {
          await navItems.nth(i).hover();
          await this.wait(600);
        }
      }

      // Interactuar con offcanvas si está visible (vista móvil)
      await this.interactWithOffcanvas();

      // Interactuar con botones de acción
      await this.interactWithActionButtons();

      // Interactuar con theme toggle en navbar si existe
      await this.interactWithNavbarThemeToggle();

      return true;
    } catch (error) {
      console.warn("Navbar interactions failed:", error);
      return false;
    }
  }

  private async interactWithOffcanvas(): Promise<void> {
    const offcanvasToggle = this.page.locator("wc-offcanvas");

    if (await offcanvasToggle.isVisible()) {
      console.log("Interacting with offcanvas (mobile view)");

      // Abrir offcanvas
      await offcanvasToggle.click();
      await this.wait(1500);

      // Hover sobre items del offcanvas
      const offcanvasLinks = this.page.locator(".wc-offcanvas-content a");
      const offcanvasCount = await offcanvasLinks.count();

      for (let i = 0; i < Math.min(offcanvasCount, 3); i++) {
        await offcanvasLinks.nth(i).hover();
        await this.wait(400);
      }

      // Cerrar offcanvas
      const closeButton = this.page.locator(".wc-offcanvas-close");
      if (await closeButton.isVisible()) {
        await closeButton.click();
        await this.wait(800);
      } else {
        // Fallback: click fuera del panel
        await this.page.mouse.click(10, 10);
        await this.wait(800);
      }
    }
  }

  private async interactWithActionButtons(): Promise<void> {
    const actionButtons = this.page.locator("wc-navbar button");
    const buttonCount = await actionButtons.count();

    for (let i = 0; i < Math.min(buttonCount, 2); i++) {
      await actionButtons.nth(i).hover();
      await this.wait(500);
    }
  }

  private async interactWithNavbarThemeToggle(): Promise<void> {
    const navbarThemeToggle = this.page.locator("wc-navbar wc-theme-toggle");

    if (await navbarThemeToggle.isVisible()) {
      await navbarThemeToggle.hover();
      await this.wait(600);

      // Click para cambiar tema
      await navbarThemeToggle.click();
      await this.wait(1000);
    }
  }
}
