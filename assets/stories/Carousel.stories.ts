import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit-html";
import { randPhrase } from "@ngneat/falso";
import type { CarouselProps } from "../types/carousel.js";

const meta = {
  title: "Components/Carousel",
  component: "wc-carousel",
  tags: ["autodocs"],
  argTypes: {
    desktop: {
      control: { type: "range", min: 1, max: 6, step: 1 },
      description: "Number of columns on desktop",
    },
    mobile: {
      control: { type: "range", min: 1, max: 6, step: 1 },
      description: "Number of columns on mobile",
    },
    gap: {
      control: { type: "select" },
      options: ["none", "small", "medium", "large", "xlarge"],
      description: "Gap between items",
    },
    interval: {
      control: { type: "number" },
      description: "Auto-play interval in milliseconds",
    },
    autoPlay: {
      control: { type: "boolean" },
      description: "Enable auto-play",
    },
    showArrows: {
      control: { type: "boolean" },
      description: "Show navigation arrows",
    },
    showDots: {
      control: { type: "boolean" },
      description: "Show dot indicators",
    },
  },
} satisfies Meta<CarouselProps>;

export default meta;
type Story = StoryObj<CarouselProps>;

const renderCard = (index: number) => html`
  <div
    class="p-6 bg-surfaceContainerHigh border border-outlineVariant min-h-[200px] flex items-center justify-center"
  >
    <div class="text-center">
      <div class="text-4xl font-bold text-primary mb-2">${index + 1}</div>
      <p class="text-onSurfaceVariant">${randPhrase()}</p>
    </div>
  </div>
`;

export const Default: Story = {
  render: (args) => html`
    <div class="p-6 bg-background">
      <wc-carousel
        desktop=${args.desktop}
        mobile=${args.mobile}
        gap=${args.gap}
        interval=${args.interval}
        ?auto-play=${args.autoPlay}
        ?show-arrows=${args.showArrows}
        ?show-dots=${args.showDots}
      >
        ${Array.from(
          { length: 6 },
          (_, i) => html`
            <wc-carousel-item> ${renderCard(i)} </wc-carousel-item>
          `
        )}
      </wc-carousel>
    </div>
  `,
  args: {
    desktop: 3,
    mobile: 1,
    gap: "medium",
    interval: 3000,
    autoPlay: true,
    showArrows: true,
    showDots: true,
  },
};
