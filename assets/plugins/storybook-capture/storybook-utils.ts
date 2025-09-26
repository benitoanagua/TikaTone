// import { THEME_CSS_VARS } from "../../types/material";

// Stories disponibles para captura
export const AVAILABLE_STORIES = [
  { id: "card", name: "Card", delay: 4000 },
  { id: "overlay", name: "Overlay", delay: 3500 },
  { id: "stack", name: "Stack", delay: 5000 },
  { id: "carousel", name: "Carousel", delay: 6000 },
  { id: "grille", name: "Grille", delay: 3000 },
  { id: "navbar", name: "Navbar", delay: 3500 },
  { id: "theme-toggle", name: "ThemeToggle", delay: 3000 },
  { id: "accordion", name: "Accordion", delay: 4500 },
  { id: "tabs", name: "Tabs", delay: 4000 },
  { id: "slideshow", name: "Slideshow", delay: 5000 },
];

export function getStoriesByNames(storyNames: string[] = []) {
  if (storyNames.length === 0) {
    return AVAILABLE_STORIES;
  }

  return AVAILABLE_STORIES.filter((story) =>
    storyNames.some(
      (name) =>
        story.id.toLowerCase().includes(name.toLowerCase()) ||
        story.name.toLowerCase().includes(name.toLowerCase())
    )
  );
}

export function validateStorybookUrl(port: number = 6006): string {
  return `http://localhost:${port}`;
}

export function generateStoryUrl(baseUrl: string, storyId: string): string {
  return `${baseUrl}/iframe.html?id=components-${storyId}&viewMode=story`;
}
