import type { Meta, StoryObj } from "@storybook/html";
import {
  randParagraph,
  randUrl,
  randMusicGenre,
  randPhrase,
} from "@ngneat/falso";

const meta = {
  title: "Components/Offcanvas",
  component: "wc-offcanvas",
  tags: ["autodocs"],
  decorators: [
    (story) => {
      const container = document.createElement("div");
      container.className = "p-8 bg-background min-h-screen";

      const header = document.createElement("div");
      header.className =
        "mb-6 p-6 bg-surfaceContainerHighest border border-outlineVariant";
      header.innerHTML = `
        <h2 class="text-2xl font-bold text-onSurface mb-2">Offcanvas Demo</h2>
        <p class="text-onSurfaceVariant">Click the menu button to open the offcanvas navigation</p>
      `;

      container.appendChild(header);

      const storyResult = story();
      if (typeof storyResult === "string") {
        container.innerHTML += storyResult;
      } else {
        container.appendChild(storyResult);
      }

      return container;
    },
  ],
  render: () => {
    const offcanvas = document.createElement("wc-offcanvas");

    // Add content to the offcanvas
    const content = document.createElement("div");
    content.innerHTML = `
      <h2 class="text-2xl font-medium text-onSurface mb-6 border-b-2 border-outlineVariant py-3">Navigation</h2>
      <nav class="flex flex-col gap-0">
        ${Array.from(
          { length: 5 },
          (_, i) => `
          <a href="${randUrl()}" class="text-onSurfaceVariant hover:text-primary py-3 px-4 border-l-4 border-transparent hover:border-primary hover:bg-surfaceContainerLow transition-colors ${i === 0 ? "text-primary border-l-4 border-primary bg-surfaceContainerLow" : ""}">
            ${i === 0 ? "Home" : randMusicGenre()}
          </a>
        `
        ).join("")}
      </nav>
      <div class="mt-8 pt-6 border-t border-outlineVariant">
        <p class="text-onSurfaceVariant text-sm mb-4">${randParagraph().substring(0, 120)}...</p>
        <button class="w-full py-2 px-4 bg-primary text-onPrimary border-2 border-primary transition-colors hover:bg-primaryContainer hover:text-onPrimaryContainer">
          Sign In
        </button>
      </div>
    `;

    offcanvas.appendChild(content);
    return offcanvas;
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const WithUserProfile: Story = {
  name: "With User Profile",
  render: () => {
    const offcanvas = document.createElement("wc-offcanvas");

    const content = document.createElement("div");
    content.innerHTML = `
      <div class="flex items-center gap-3 mb-6 pb-4 border-b-2 border-outlineVariant">
        <div class="w-12 h-12 bg-primaryContainer flex items-center justify-center">
          <span class="text-onPrimaryContainer font-bold text-lg">U</span>
        </div>
        <div>
          <h3 class="text-onSurface font-medium">User Name</h3>
          <p class="text-onSurfaceVariant text-sm">user@example.com</p>
        </div>
      </div>
      
      <h2 class="text-xl font-medium text-onSurface mb-4">Menu</h2>
      <nav class="flex flex-col gap-0 mb-6">
        ${Array.from(
          { length: 4 },
          () => `
          <a href="${randUrl()}" class="text-onSurfaceVariant hover:text-primary py-3 px-4 border-l-4 border-transparent hover:border-primary hover:bg-surfaceContainerLow transition-colors">
            ${randMusicGenre()}
          </a>
        `
        ).join("")}
      </nav>
      
      <div class="space-y-2">
        <button class="w-full text-left py-2 px-4 text-onSurfaceVariant hover:text-primary border-l-4 border-transparent hover:border-primary hover:bg-surfaceContainerLow transition-colors">
          Settings
        </button>
        <button class="w-full text-left py-2 px-4 text-onSurfaceVariant hover:text-primary border-l-4 border-transparent hover:border-primary hover:bg-surfaceContainerLow transition-colors">
          Help & Support
        </button>
      </div>
      
      <div class="mt-8 pt-6 border-t border-outlineVariant">
        <button class="w-full py-2 px-4 bg-error text-onError border-2 border-error transition-colors hover:bg-errorContainer hover:text-onErrorContainer">
          Sign Out
        </button>
      </div>
    `;

    offcanvas.appendChild(content);
    return offcanvas;
  },
};

export const WithCategories: Story = {
  name: "With Categories",
  render: () => {
    const offcanvas = document.createElement("wc-offcanvas");

    const content = document.createElement("div");
    content.innerHTML = `
      <h2 class="text-2xl font-medium text-onSurface mb-6 border-b-2 border-outlineVariant py-3">Categories</h2>
      
      <div class="space-y-4">
        ${Array.from(
          { length: 4 },
          () => `
          <div class="border border-outlineVariant">
            <h3 class="text-onSurface font-medium p-4 border-b border-outlineVariant bg-surfaceContainerLow">${randMusicGenre()}</h3>
            <div class="flex flex-col">
              ${Array.from(
                { length: 3 },
                () => `
                <a href="${randUrl()}" class="text-onSurfaceVariant hover:text-primary py-3 px-4 border-l-4 border-transparent hover:border-primary hover:bg-surfaceContainerLow transition-colors">
                  ${randPhrase()}
                </a>
              `
              ).join("")}
            </div>
          </div>
        `
        ).join("")}
      </div>
      
      <div class="mt-6 p-4 bg-surfaceContainerLow border border-outlineVariant">
        <p class="text-onSurfaceVariant text-sm mb-3">${randParagraph().substring(0, 80)}</p>
        <button class="w-full py-2 px-4 bg-primary text-onPrimary border-2 border-primary transition-colors hover:bg-primaryContainer hover:text-onPrimaryContainer">
          Explore All
        </button>
      </div>
    `;

    offcanvas.appendChild(content);
    return offcanvas;
  },
};

export const MinimalNavigation: Story = {
  name: "Minimal Navigation",
  render: () => {
    const offcanvas = document.createElement("wc-offcanvas");

    const content = document.createElement("div");
    content.innerHTML = `
      <nav class="flex flex-col gap-0">
        ${Array.from(
          { length: 6 },
          () => `
          <a href="${randUrl()}" class="text-onSurface py-3 px-4 border-l-4 border-transparent hover:border-primary transition-colors">
            ${randMusicGenre()}
          </a>
        `
        ).join("")}
      </nav>
    `;

    offcanvas.appendChild(content);
    return offcanvas;
  },
};
