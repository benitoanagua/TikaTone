import type { Meta, StoryObj } from "@storybook/html";
import { randParagraph, randUrl, randMusicGenre } from "@ngneat/falso";

const meta = {
  title: "Components/Offcanvas",
  component: "wc-offcanvas",
  tags: ["autodocs"],
  render: () => {
    const offcanvas = document.createElement("wc-offcanvas");

    // Add content to the offcanvas
    const content = document.createElement("div");
    content.innerHTML = `
      <h2 class="text-2xl font-medium text-onSurface mb-6">Navigation</h2>
      <nav class="flex flex-col gap-1">
        ${Array.from(
          { length: 5 },
          (_, i) => `
          <a href="${randUrl()}" class="text-onSurfaceVariant hover:text-primary py-3 px-4 rounded-lg hover:bg-surfaceContainerLow transition-colors ${i === 0 ? "bg-primaryContainer text-onPrimaryContainer" : ""}">
            ${i === 0 ? "Home" : randMusicGenre()}
          </a>
        `
        ).join("")}
      </nav>
      <div class="mt-8 pt-6 border-t border-outlineVariant">
        <p class="text-onSurfaceVariant text-sm">${randParagraph().substring(0, 120)}...</p>
        <button class="mt-4 px-4 py-2 bg-primary text-onPrimary rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
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
