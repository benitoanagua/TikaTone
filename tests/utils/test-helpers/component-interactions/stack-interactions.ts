import { BaseComponentInteractions } from "./base-interactions";

export class StackInteractions extends BaseComponentInteractions {
  async performInteractions(): Promise<boolean> {
    try {
      // Usar el método robusto
      await this.robustElementCycle(".wc-stack__button", 1000);

      // Volver al primer elemento
      await this.robustClick([".wc-stack__button:first-child"]);
      await this.wait(800);

      return true;
    } catch (error) {
      console.warn("Stack interactions failed:", error);
      return false;
    }
  }
}
