// assets/stories/Carousel.stories.ts
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit-html";
import {
  randPhrase,
  randParagraph,
  randNumber,
  randUrl,
  randFullName,
  randAvatar,
} from "@ngneat/falso";
import type { CarouselProps } from "../types/carousel.js";

interface CarouselStoryProps extends CarouselProps {
  itemsCount?: number;
}

const meta = {
  title: "Components/Carousel",
  component: "wc-carousel",
  tags: ["autodocs"],
  argTypes: {
    layout: {
      control: { type: "object" },
      description: "Layout configuration for desktop and mobile",
    },
    interval: {
      control: { type: "range", min: 1000, max: 10000, step: 500 },
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
    itemsCount: {
      control: { type: "range", min: 3, max: 12, step: 1 },
      description: "Number of carousel items",
    },
  },
} satisfies Meta<CarouselStoryProps>;

export default meta;
type Story = StoryObj<CarouselStoryProps>;

const renderCarousel = (args: CarouselStoryProps, items: unknown) => html`
  <wc-carousel
    layout=${JSON.stringify(args.layout || { desktop: 3, mobile: 1, gap: 16 })}
    interval=${(args.interval || 5000).toString()}
    ?auto-play=${args.autoPlay ?? true}
    ?show-arrows=${args.showArrows ?? true}
    ?show-dots=${args.showDots ?? true}
  >
    ${items}
  </wc-carousel>
`;

const renderCardItem = (index: number) => html`
  <wc-carousel-item>
    <wc-card
      title="Card ${index + 1}: ${randPhrase()}"
      excerpt=${randParagraph().substring(0, 120)}
      feature-image=${`https://picsum.photos/400/300?random=${randNumber({ min: 1, max: 1000 })}`}
      author-name=${randFullName()}
      author-profile-image=${randAvatar()}
      url=${randUrl()}
      heading="4"
      media-align="top"
    ></wc-card>
  </wc-carousel-item>
`;

const renderOverlayItem = (index: number) => html`
  <wc-carousel-item>
    <wc-overlay
      title="Overlay ${index + 1}: ${randPhrase()}"
      tag-name=${`Category ${index + 1}`}
      author-name=${randFullName()}
      feature-image=${`https://picsum.photos/600/400?random=${randNumber({ min: 1, max: 1000 })}`}
      heading="3"
      aspect-ratio="video"
      align="center"
      position="center"
      fill="gradient"
    ></wc-overlay>
  </wc-carousel-item>
`;

export const Default: Story = {
  render: (args) => html`
    <div class="p-6 bg-background">
      ${renderCarousel(
        args,
        Array.from({ length: args.itemsCount || 8 }, (_, i) =>
          renderCardItem(i)
        )
      )}
    </div>
  `,
  args: {
    layout: {
      desktop: 3,
      mobile: 1,
      gap: 16,
    },
    interval: 5000,
    autoPlay: true,
    showArrows: true,
    showDots: true,
    itemsCount: 8,
  },
};

export const SingleColumn: Story = {
  render: (args) => html`
    <div class="p-6 bg-background">
      ${renderCarousel(
        args,
        Array.from({ length: args.itemsCount || 6 }, (_, i) =>
          renderCardItem(i)
        )
      )}
    </div>
  `,
  args: {
    layout: {
      desktop: 1,
      mobile: 1,
      gap: 20,
    },
    interval: 4000,
    autoPlay: true,
    showArrows: true,
    showDots: true,
    itemsCount: 6,
  },
};

export const FiveColumns: Story = {
  render: (args) => html`
    <div class="p-6 bg-background">
      ${renderCarousel(
        args,
        Array.from({ length: args.itemsCount || 10 }, (_, i) =>
          renderCardItem(i)
        )
      )}
    </div>
  `,
  args: {
    layout: {
      desktop: 5,
      mobile: 2,
      gap: 12,
    },
    interval: 6000,
    autoPlay: false,
    showArrows: true,
    showDots: true,
    itemsCount: 10,
  },
};

export const NoAutoPlay: Story = {
  render: (args) => html`
    <div class="p-6 bg-background">
      ${renderCarousel(
        args,
        Array.from({ length: args.itemsCount || 8 }, (_, i) =>
          renderCardItem(i)
        )
      )}
    </div>
  `,
  args: {
    layout: {
      desktop: 3,
      mobile: 1,
      gap: 16,
    },
    interval: 5000,
    autoPlay: false,
    showArrows: true,
    showDots: true,
    itemsCount: 8,
  },
};

export const NavigationOnly: Story = {
  render: (args) => html`
    <div class="p-6 bg-background">
      ${renderCarousel(
        args,
        Array.from({ length: args.itemsCount || 6 }, (_, i) =>
          renderCardItem(i)
        )
      )}
    </div>
  `,
  args: {
    layout: {
      desktop: 2,
      mobile: 1,
      gap: 24,
    },
    interval: 3000,
    autoPlay: false,
    showArrows: true,
    showDots: false,
    itemsCount: 6,
  },
};

export const DotsOnly: Story = {
  render: (args) => html`
    <div class="p-6 bg-background">
      ${renderCarousel(
        args,
        Array.from({ length: args.itemsCount || 12 }, (_, i) =>
          renderCardItem(i)
        )
      )}
    </div>
  `,
  args: {
    layout: {
      desktop: 4,
      mobile: 2,
      gap: 16,
    },
    interval: 4000,
    autoPlay: true,
    showArrows: false,
    showDots: true,
    itemsCount: 12,
  },
};

export const MinimalControls: Story = {
  render: (args) => html`
    <div class="p-6 bg-background">
      ${renderCarousel(
        args,
        Array.from({ length: args.itemsCount || 8 }, (_, i) =>
          renderCardItem(i)
        )
      )}
    </div>
  `,
  args: {
    layout: {
      desktop: 3,
      mobile: 1,
      gap: 16,
    },
    interval: 5000,
    autoPlay: false,
    showArrows: false,
    showDots: false,
    itemsCount: 8,
  },
};

export const WithOverlayCards: Story = {
  render: () => html`
    <div class="p-6 bg-background">
      <wc-carousel
        layout=${JSON.stringify({ desktop: 2, mobile: 1, gap: 16 })}
        interval="5000"
        auto-play
        show-arrows
        show-dots
      >
        ${Array.from({ length: 6 }, (_, i) => renderOverlayItem(i))}
      </wc-carousel>
    </div>
  `,
};

export const LayoutComparison: Story = {
  render: () => html`
    <div class="p-6 bg-background space-y-8">
      <h2 class="text-2xl font-bold text-onSurface mb-4">
        Carousel Layout Comparison
      </h2>

      ${[
        { desktop: 1, mobile: 1, name: "Single Column" },
        { desktop: 2, mobile: 1, name: "Two Columns" },
        { desktop: 3, mobile: 2, name: "Three Columns" },
        { desktop: 4, mobile: 2, name: "Four Columns" },
      ].map(
        (layout) => html`
          <div>
            <h3 class="text-lg font-medium text-onSurface mb-3">
              ${layout.name}
            </h3>
            <wc-carousel
              layout=${JSON.stringify({ ...layout, gap: 16 })}
              show-arrows
              show-dots
            >
              ${Array.from({ length: 8 }, (_, i) => renderCardItem(i))}
            </wc-carousel>
          </div>
        `
      )}
    </div>
  `,
};

export const Playground: Story = {
  render: (args) => html`
    <div class="p-6 bg-background">
      ${renderCarousel(
        args,
        Array.from({ length: args.itemsCount || 8 }, (_, i) =>
          renderCardItem(i)
        )
      )}
    </div>
  `,
  args: {
    layout: {
      desktop: 3,
      mobile: 1,
      gap: 16,
    },
    interval: 5000,
    autoPlay: true,
    showArrows: true,
    showDots: true,
    itemsCount: 8,
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};
