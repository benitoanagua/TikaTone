import { Page } from "@playwright/test";
import { BaseTestHelpers } from "./base-test-helpers";
import type { ComponentInteractions } from "./types";

// Import all interaction classes
import { CardInteractions } from "./component-interactions/card-interactions";
import { OverlayInteractions } from "./component-interactions/overlay-interactions";
import { StackInteractions } from "./component-interactions/stack-interactions";
import { CarouselInteractions } from "./component-interactions/carousel-interactions";
import { GrilleInteractions } from "./component-interactions/grille-interactions";
import { NavbarInteractions } from "./component-interactions/navbar-interactions";
import { ThemeToggleInteractions } from "./component-interactions/theme-toggle-interactions";
import { AccordionInteractions } from "./component-interactions/accordion-interactions";
import { TabsInteractions } from "./component-interactions/tabs-interactions";
import { SlideshowInteractions } from "./component-interactions/slideshow-interactions";

export class ComponentTestHelpers extends BaseTestHelpers {
  private interactionMap: Map<string, ComponentInteractions>;

  constructor(page: Page) {
    super(page);
    this.interactionMap = new Map([
      ["card", new CardInteractions(page)],
      ["overlay", new OverlayInteractions(page)],
      ["stack", new StackInteractions(page)],
      ["carousel", new CarouselInteractions(page)],
      ["grille", new GrilleInteractions(page)],
      ["navbar", new NavbarInteractions(page)],
      ["themetoggle", new ThemeToggleInteractions(page)],
      ["accordion", new AccordionInteractions(page)],
      ["tabs", new TabsInteractions(page)],
      ["slideshow", new SlideshowInteractions(page)],
    ]);
  }

  /**
   * Perform component-specific interactions
   */
  async performComponentInteractions(componentId: string): Promise<boolean> {
    const interactions = this.interactionMap.get(componentId);

    if (!interactions) {
      console.warn(`No interactions defined for: ${componentId}`);
      return false;
    }

    try {
      console.log(`🔄 Performing interactions for: ${componentId}`);
      return await interactions.performInteractions();
    } catch (error) {
      console.warn(`Interactions failed for ${componentId}:`, error);
      return false;
    }
  }

  /**
   * Get available component IDs
   */
  getAvailableComponents(): string[] {
    return Array.from(this.interactionMap.keys());
  }

  /**
   * Check if component has interactions defined
   */
  hasInteractions(componentId: string): boolean {
    return this.interactionMap.has(componentId);
  }
}

// Re-export types and base class
export * from "./types";
export * from "./base-test-helpers";

// Re-export all interaction classes
export {
  CardInteractions,
  OverlayInteractions,
  StackInteractions,
  CarouselInteractions,
  GrilleInteractions,
  NavbarInteractions,
  ThemeToggleInteractions,
  AccordionInteractions,
  TabsInteractions,
  SlideshowInteractions,
};
