// Import all components to register them
import { WcAccordion } from "./Accordion.js";
import { WcAccordionItem } from "./AccordionItem.js";
import { WcCard } from "./Card.js";
import { WcCarousel } from "./Carousel.js";
import { WcCarouselItem } from "./CarouselItem.js";
import { WcGrille } from "./Grille.js";
import { WcLogo } from "./Logo.js";
import { WcNavbar } from "./Navbar.js";
import { WcOffcanvas } from "./Offcanvas.js";
import { WcOverlay } from "./Overlay.js";
import { WcSlideshow } from "./Slideshow.js";
import { WcSlideshowItem } from "./SlideshowItem.js";
import { WcStack } from "./Stack.js";
import { WcStackItem } from "./StackItem.js";
import { WcTab } from "./Tab.js";
import { WcTabPanel } from "./TabPanel.js";
import { WcTabs } from "./Tabs.js";
import { WcThemeToggle } from "./ThemeToggle.js";

// Export all components and types
export {
  WcAccordion,
  WcAccordionItem,
  WcCard,
  WcCarousel,
  WcCarouselItem,
  WcGrille,
  WcLogo,
  WcNavbar,
  WcOffcanvas,
  WcOverlay,
  WcSlideshow,
  WcSlideshowItem,
  WcStack,
  WcStackItem,
  WcTab,
  WcTabPanel,
  WcTabs,
  WcThemeToggle,
};

// Global type declarations
declare global {
  interface HTMLElementTagNameMap {
    "wc-accordion": WcAccordion;
    "wc-accordion-item": WcAccordionItem;
    "wc-card": WcCard;
    "wc-carousel": WcCarousel;
    "wc-carousel-item": WcCarouselItem;
    "wc-grille": WcGrille;
    "wc-logo": WcLogo;
    "wc-navbar": WcNavbar;
    "wc-offcanvas": WcOffcanvas;
    "wc-overlay": WcOverlay;
    "wc-slideshow": WcSlideshow;
    "wc-slideshow-item": WcSlideshowItem;
    "wc-stack": WcStack;
    "wc-stack-item": WcStackItem;
    "wc-tab": WcTab;
    "wc-tab-panel": WcTabPanel;
    "wc-tabs": WcTabs;
    "wc-theme-toggle": WcThemeToggle;
  }
}
