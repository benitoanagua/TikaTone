/**
 * Main entry point for TikaTone theme components
 * WordPress-compatible version
 */

// Import styles
import "./main.css";

// Import and register all custom elements
import "./elements/index.js";

// Global registration for WordPress
if (typeof window !== "undefined") {
  // Marcar que los elementos están listos
  window.dispatchEvent(new CustomEvent("tikatone-elements-ready"));

  // También exponer globalmente para acceso directo
  (window as any).TikaToneElements = {
    version: "0.1.0",
    ready: true,
  };

  console.log("TikaTone Elements registered successfully");
}

// Export all components for external use
export * from "./elements/index.js";
