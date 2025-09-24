import type { Meta, StoryObj } from "@storybook/html";

const meta = {
  title: "Components/ThemeToggle",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Theme toggle component for switching between light and dark modes with Flat Design",
      },
    },
  },
  decorators: [
    (story) => {
      const container = document.createElement("div");
      container.className = "p-8 bg-background min-h-screen";

      // Demo section to show theme changes
      const demoSection = document.createElement("div");
      demoSection.className = "max-w-2xl mx-auto space-y-6";

      const header = document.createElement("div");
      header.className = "text-center mb-8";
      header.innerHTML = `
        <h1 class="text-3xl font-bold text-onSurface mb-4">Theme Toggle Demo</h1>
        <p class="text-onSurfaceVariant">Click the theme toggle button to see the theme change in real-time</p>
      `;

      // Theme toggle container
      const toggleContainer = document.createElement("div");
      toggleContainer.className =
        "flex flex-col items-center gap-4 p-6 bg-surfaceContainerHighest border border-outlineVariant";

      const toggleLabel = document.createElement("div");
      toggleLabel.className = "text-lg font-medium text-onSurface";
      toggleLabel.textContent = "Theme Toggle";

      const storyResult = story();

      toggleContainer.appendChild(toggleLabel);
      if (typeof storyResult === "string") {
        toggleContainer.innerHTML += storyResult;
      } else {
        toggleContainer.appendChild(storyResult);
      }

      // Demo content that changes with theme
      const demoContent = document.createElement("div");
      demoContent.className = "grid grid-cols-1 md:grid-cols-2 gap-6 mt-8";
      demoContent.innerHTML = `
        <div class="p-4 bg-surfaceContainerLow border border-outlineVariant">
          <h3 class="text-lg font-semibold text-onSurface mb-2">Card Example</h3>
          <p class="text-onSurfaceVariant">This card will change appearance with the theme</p>
        </div>
        <div class="p-4 bg-surfaceContainerHigh border border-outlineVariant">
          <h3 class="text-lg font-semibold text-onSurface mb-2">Another Card</h3>
          <p class="text-onSurfaceVariant">All components adapt to the selected theme</p>
        </div>
      `;

      demoSection.appendChild(header);
      demoSection.appendChild(toggleContainer);
      demoSection.appendChild(demoContent);
      container.appendChild(demoSection);

      return container;
    },
  ],
  render: () => {
    const toggle = document.createElement("wc-theme-toggle");
    return toggle;
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};
