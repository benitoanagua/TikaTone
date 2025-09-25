// Import all components to register them
import { WcCard } from "./Card.js";
import { WcGrille } from "./Grille.js";
import { WcLogo } from "./Logo.js";
import { WcNavbar } from "./Navbar.js";
import { WcOverlay } from "./Overlay.js";
import { WcOffcanvas } from "./Offcanvas.js";
import { WcThemeToggle } from "./ThemeToggle.js";
import { WcStack } from "./Stack.js";
import { WcStackItem } from "./StackItem.js";

// Export all components and types
export {
  WcCard,
  WcGrille,
  WcLogo,
  WcNavbar,
  WcOverlay,
  WcOffcanvas,
  WcThemeToggle,
  WcStack,
  WcStackItem,
};

// Global type declarations
declare global {
  interface HTMLElementTagNameMap {
    "wc-card": WcCard;
    "wc-grille": WcGrille;
    "wc-logo": WcLogo;
    "wc-navbar": WcNavbar;
    "wc-overlay": WcOverlay;
    "wc-offcanvas": WcOffcanvas;
    "wc-theme-toggle": WcThemeToggle;
    "wc-stack": WcStack;
    "wc-stack-item": WcStackItem;
  }
}
