import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit-html";
import { randPhrase } from "@ngneat/falso";
import type { SlideshowProps } from "../types/slideshow.js";

const meta = {
  title: "Components/Slideshow",
  component: "wc-slideshow",
  tags: ["autodocs"],
  argTypes: {
    showNav: {
      control: { type: "boolean" },
      description: "Show navigation arrows and counter",
    },
    modal: {
      control: { type: "boolean" },
      description: "Modal mode (hides navigation)",
    },
    interval: {
      control: { type: "number" },
      description: "Auto-play interval in milliseconds",
    },
    autoPlay: {
      control: { type: "boolean" },
      description: "Enable auto-play",
    },
    showIndicators: {
      control: { type: "boolean" },
      description: "Show progress indicators",
    },
  },
} satisfies Meta<SlideshowProps>;

export default meta;
type Story = StoryObj<SlideshowProps>;

const renderSlide = (index: number) => html`
  <div
    class="w-full h-64 md:h-80 flex items-center justify-center 
              bg-gradient-to-br from-primaryContainer to-secondaryContainer 
              border-2 border-outlineVariant"
  >
    <div class="text-center p-6 max-w-full">
      <div class="text-4xl font-bold text-onPrimaryContainer mb-3">
        ${index + 1}
      </div>
      <p class="text-onSecondaryContainer text-lg">${randPhrase()}</p>
    </div>
  </div>
`;

export const Default: Story = {
  render: (args) => html`
    <div class="p-6 bg-background">
      <div class="max-w-4xl mx-auto">
        <!-- 🆕 Contenedor limitado para mejor visualización -->
        <wc-slideshow
          ?show-nav=${args.showNav}
          ?modal=${args.modal}
          ?auto-play=${args.autoPlay}
          ?show-indicators=${args.showIndicators}
          interval=${args.interval}
        >
          ${Array.from(
            { length: 4 },
            (_, i) => html`
              <wc-slideshow-item> ${renderSlide(i)} </wc-slideshow-item>
            `
          )}
        </wc-slideshow>
      </div>
    </div>
  `,
  args: {
    showNav: true,
    modal: false,
    interval: 4000,
    autoPlay: true,
    showIndicators: true,
  },
};

export const Mobile: Story = {
  render: () => html`
    <div class="p-4 bg-background">
      <div class="max-w-sm mx-auto">
        <!-- 🆕 Ancho móvil específico -->
        <wc-slideshow show-nav show-indicators auto-play interval="3000">
          ${Array.from(
            { length: 3 },
            (_, i) => html`
              <wc-slideshow-item>
                <div
                  class="w-full h-48 bg-surfaceContainerHigh border border-outlineVariant 
                          flex items-center justify-center"
                >
                  <span class="text-2xl font-bold text-onSurface"
                    >Slide ${i + 1}</span
                  >
                </div>
              </wc-slideshow-item>
            `
          )}
        </wc-slideshow>
      </div>
    </div>
  `,
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export const Minimal: Story = {
  render: () => html`
    <div class="p-6 bg-background">
      <div class="max-w-2xl mx-auto">
        <wc-slideshow show-nav>
          ${Array.from(
            { length: 3 },
            (_, i) => html`
              <wc-slideshow-item>
                <div
                  class="w-full h-32 bg-surfaceContainerLow flex items-center justify-center"
                >
                  <span class="text-xl text-onSurface">Slide ${i + 1}</span>
                </div>
              </wc-slideshow-item>
            `
          )}
        </wc-slideshow>
      </div>
    </div>
  `,
};

export const Playground: Story = {
  render: (args) => html`
    <div class="p-6 bg-background">
      <div class="max-w-3xl mx-auto">
        <div
          class="mb-4 p-4 bg-surfaceContainerHigh border border-outlineVariant"
        >
          <h3 class="font-medium text-onSurface">Slideshow Playground</h3>
          <p class="text-sm text-onSurfaceVariant">
            Adjust controls to see changes
          </p>
        </div>

        <wc-slideshow
          ?show-nav=${args.showNav}
          ?modal=${args.modal}
          ?auto-play=${args.autoPlay}
          ?show-indicators=${args.showIndicators}
          interval=${args.interval}
        >
          ${Array.from(
            { length: 4 },
            (_, i) => html`
              <wc-slideshow-item>
                <div
                  class="w-full h-56 flex items-center justify-center
                          bg-gradient-to-r from-primary to-secondary"
                >
                  <div class="text-center text-white p-4">
                    <div class="text-3xl font-bold mb-2">#${i + 1}</div>
                    <p>${randPhrase()}</p>
                  </div>
                </div>
              </wc-slideshow-item>
            `
          )}
        </wc-slideshow>
      </div>
    </div>
  `,
  args: {
    showNav: true,
    modal: false,
    interval: 4000,
    autoPlay: true,
    showIndicators: true,
  },
  parameters: {
    controls: { expanded: true },
  },
};
