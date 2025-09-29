// Configuración compartida entre tests y storybook-capture
export const VIEWPORT_SIZES = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1200, height: 800 },
};

export const TEST_DELAYS = {
  short: 200,
  medium: 500,
  long: 1000,
  componentRender: 300,
  animation: 1000,
};

export const COMPONENT_IDS = [
  "card",
  "overlay",
  "stack",
  "carousel",
  "grille",
  "navbar",
  "theme-toggle",
  "accordion",
  "tabs",
  "slideshow",
] as const;
