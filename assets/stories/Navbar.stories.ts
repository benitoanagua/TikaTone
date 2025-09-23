import type { Meta, StoryObj } from "@storybook/html";
import { randMusicGenre, randUrl, randPhrase } from "@ngneat/falso";

const meta = {
  title: "Components/Navbar",
  component: "wc-navbar",
  tags: ["autodocs"],
  decorators: [
    (story) => {
      const container = document.createElement("div");
      container.className = "min-h-screen";

      const beforeContent = document.createElement("div");
      beforeContent.className =
        "h-96 bg-gradient-to-b from-primary/20 to-secondary/20 flex items-center justify-center";
      beforeContent.innerHTML = `
        <div class="text-center">
          <h1 class="text-4xl font-bold text-onSurface mb-4">${randPhrase()}</h1>
          <p class="text-onSurfaceVariant">${randPhrase()}</p>
        </div>
      `;

      const storyResult = story();

      const afterContent = document.createElement("div");
      afterContent.className = "space-y-8 p-8";
      afterContent.innerHTML = Array.from(
        { length: 10 },
        (_, i) => `
          <div class="bg-surface p-6 rounded-lg border border-outline/20">
            <h3 class="text-xl font-semibold text-onSurface mb-3">${randPhrase()}</h3>
            <p class="text-onSurfaceVariant leading-relaxed">${randPhrase()}</p>
          </div>
        `
      ).join("");

      container.appendChild(beforeContent);
      if (typeof storyResult === "string") {
        container.innerHTML += storyResult;
      } else {
        container.appendChild(storyResult);
      }
      container.appendChild(afterContent);
      return container;
    },
  ],
  render: () => {
    const navbar = document.createElement("wc-navbar");

    // Logo slot
    const logo = document.createElement("wc-logo");
    logo.slot = "logo";
    logo.className = "h-8";
    navbar.appendChild(logo);

    // Navigation slot - Solo navegación desktop visible
    const navigationContainer = document.createElement("div");
    navigationContainer.slot = "navigation";

    // Navegación Desktop
    const desktopNav = document.createElement("nav");
    desktopNav.innerHTML = `
      <div class="hidden md:flex space-x-6">
        <a href="${randUrl()}" class="text-onSurface hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-surfaceContainerLow font-medium bg-primaryContainer text-onPrimaryContainer">${randMusicGenre()}</a>
        ${Array.from(
          { length: 4 },
          () => `
          <a href="${randUrl()}" class="text-onSurface hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-surfaceContainerLow">${randMusicGenre()}</a>
        `
        ).join("")}
      </div>

      <!-- Mobile menu toggle - Solo visible en mobile -->
      <wc-offcanvas class="md:hidden">
        <div class="mobile-navigation-content">
          <h2 class="text-xl font-medium text-onSurface mb-4">Menu</h2>
          <nav class="flex flex-col gap-1">
          ${Array.from(
            { length: 6 },
            () => `
            <a href="${randUrl()}" class="text-onSurface hover:text-primary transition-colors px-4 py-3 rounded-lg hover:bg-surfaceContainerLow text-lg">${randMusicGenre()}</a>
          `
          ).join("")}
          </nav>
        </div>
      </wc-offcanvas>
    `;

    navigationContainer.appendChild(desktopNav);
    navbar.appendChild(navigationContainer);

    // Actions slot
    const actions = document.createElement("div");
    actions.slot = "actions";
    actions.className = "flex items-center space-x-2";
    actions.innerHTML = `
      <button class="hidden md:flex items-center space-x-2 px-4 py-2 bg-primary text-onPrimary rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
        <span>${randMusicGenre()}</span>
      </button>
      <button class="p-2 rounded-lg hover:bg-surfaceContainer transition-colors" title="Search">
        <svg class="w-5 h-5 text-onSurfaceVariant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </button>
    `;

    navbar.appendChild(actions);

    return navbar;
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};
