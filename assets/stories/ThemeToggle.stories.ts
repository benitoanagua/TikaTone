import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit-html";

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
} satisfies Meta;

export default meta;
type Story = StoryObj;

const renderThemeToggle = () => html` <wc-theme-toggle></wc-theme-toggle> `;

const renderDemoContainer = (content: unknown) => html`
  <div class="p-8 bg-background min-h-screen">
    <div class="max-w-2xl mx-auto space-y-6">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-onSurface mb-4">
          Theme Toggle Demo
        </h1>
        <p class="text-onSurfaceVariant">
          Click the theme toggle button to see the theme change in real-time
        </p>
      </div>

      <div
        class="flex flex-col items-center gap-4 p-6 bg-surfaceContainerHighest border border-outlineVariant"
      >
        <div class="text-lg font-medium text-onSurface">Theme Toggle</div>
        ${content}
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div class="p-4 bg-surfaceContainerLow border border-outlineVariant">
          <h3 class="text-lg font-semibold text-onSurface mb-2">
            Card Example
          </h3>
          <p class="text-onSurfaceVariant">
            This card will change appearance with the theme
          </p>
        </div>
        <div class="p-4 bg-surfaceContainerHigh border border-outlineVariant">
          <h3 class="text-lg font-semibold text-onSurface mb-2">
            Another Card
          </h3>
          <p class="text-onSurfaceVariant">
            All components adapt to the selected theme
          </p>
        </div>
      </div>
    </div>
  </div>
`;

export const Default: Story = {
  render: () => html` ${renderDemoContainer(renderThemeToggle())} `,
};

export const Standalone: Story = {
  name: "Standalone Toggle",
  render: () => html`
    <div class="p-6 bg-background">
      <div class="flex items-center justify-center gap-4">
        <span class="text-onSurface">Light</span>
        ${renderThemeToggle()}
        <span class="text-onSurface">Dark</span>
      </div>
    </div>
  `,
};

export const InNavigation: Story = {
  name: "In Navigation Context",
  render: () => html`
    <div class="p-6 bg-background">
      <div
        class="flex items-center justify-between p-4 bg-surfaceContainerHighest border border-outlineVariant"
      >
        <div class="flex items-center gap-4">
          <wc-logo class="h-8 fill-primary"></wc-logo>
          <span class="text-xl font-bold text-onSurface">MyApp</span>
        </div>

        <div class="flex items-center gap-3">
          <button
            class="p-2 hover:bg-surfaceContainerLow rounded transition-colors"
          >
            <span
              class="icon-[garden--bell-stroke-16] w-5 h-5 text-onSurfaceVariant"
            ></span>
          </button>
          ${renderThemeToggle()}
          <button
            class="px-4 py-2 bg-primary text-onPrimary hover:bg-primaryContainer hover:text-onPrimaryContainer transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  `,
};

export const DifferentSizes: Story = {
  name: "Different Sizes",
  render: () => html`
    <div class="p-6 bg-background space-y-6">
      <div class="flex items-center gap-4">
        <span class="text-onSurface">Small:</span>
        <wc-theme-toggle class="scale-75"></wc-theme-toggle>
      </div>

      <div class="flex items-center gap-4">
        <span class="text-onSurface">Default:</span>
        ${renderThemeToggle()}
      </div>

      <div class="flex items-center gap-4">
        <span class="text-onSurface">Large:</span>
        <wc-theme-toggle class="scale-125"></wc-theme-toggle>
      </div>
    </div>
  `,
};

export const WithLabels: Story = {
  name: "With Custom Labels",
  render: () => html`
    <div class="p-6 bg-background space-y-6">
      <div
        class="flex items-center gap-4 p-4 bg-surfaceContainerLow border border-outlineVariant"
      >
        <span class="text-onSurface font-medium">Theme:</span>
        ${renderThemeToggle()}
        <span class="text-onSurfaceVariant text-sm">Click to toggle</span>
      </div>

      <div
        class="flex flex-col gap-3 p-4 bg-surfaceContainerLow border border-outlineVariant"
      >
        <div class="flex items-center justify-between">
          <span class="text-onSurface">Interface Theme</span>
          ${renderThemeToggle()}
        </div>
        <p class="text-onSurfaceVariant text-sm">
          Switch between light and dark mode
        </p>
      </div>
    </div>
  `,
};
