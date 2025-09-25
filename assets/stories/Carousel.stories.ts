import type { Meta, StoryObj } from "@storybook/html";
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
  render: (args: CarouselStoryProps) => {
    const carousel = document.createElement("wc-carousel");

    // Set properties using CarouselProps interface
    carousel.setAttribute(
      "layout",
      JSON.stringify(
        args.layout || {
          desktop: 3,
          mobile: 1,
          gap: 16,
        }
      )
    );
    carousel.setAttribute("interval", (args.interval || 5000).toString());
    carousel.setAttribute("auto-play", args.autoPlay ? "true" : "false");
    carousel.setAttribute("show-arrows", args.showArrows ? "true" : "false");
    carousel.setAttribute("show-dots", args.showDots ? "true" : "false");

    // Generate carousel items with cards
    const itemsCount = args.itemsCount || 8;
    for (let i = 0; i < itemsCount; i++) {
      const item = document.createElement("wc-carousel-item");

      const card = document.createElement("wc-card");
      card.setAttribute("title", randPhrase());
      card.setAttribute("excerpt", randParagraph().substring(0, 120));
      card.setAttribute(
        "feature-image",
        `https://picsum.photos/400/300?random=${randNumber({ min: 1, max: 1000 })}`
      );
      card.setAttribute("author-name", randFullName());
      card.setAttribute("author-profile-image", randAvatar());
      card.setAttribute("url", randUrl());
      card.setAttribute("heading", "4");
      card.setAttribute("media-align", "top");

      item.appendChild(card);
      carousel.appendChild(item);
    }

    // Add event listeners for demonstration
    carousel.addEventListener("carousel-change", (event: any) => {
      console.log("Carousel changed:", event.detail);
    });

    carousel.addEventListener("carousel-navigation", (event: any) => {
      console.log("Carousel navigation:", event.detail);
    });

    return carousel;
  },
} satisfies Meta<CarouselStoryProps>;

export default meta;
type Story = StoryObj<CarouselStoryProps>;

export const Default: Story = {
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
  render: () => {
    const carousel = document.createElement("wc-carousel");
    carousel.setAttribute(
      "layout",
      JSON.stringify({ desktop: 2, mobile: 1, gap: 16 })
    );
    carousel.setAttribute("interval", "5000");
    carousel.setAttribute("auto-play", "true");
    carousel.setAttribute("show-arrows", "true");
    carousel.setAttribute("show-dots", "true");

    for (let i = 0; i < 6; i++) {
      const item = document.createElement("wc-carousel-item");

      const overlay = document.createElement("wc-overlay");
      overlay.setAttribute("title", randPhrase());
      overlay.setAttribute("tag-name", `Category ${i + 1}`);
      overlay.setAttribute("author-name", randFullName());
      overlay.setAttribute(
        "feature-image",
        `https://picsum.photos/600/400?random=${randNumber({ min: 1, max: 1000 })}`
      );
      overlay.setAttribute("heading", "3");
      overlay.setAttribute("aspect-ratio", "video");
      overlay.setAttribute("align", "center");
      overlay.setAttribute("position", "center");
      overlay.setAttribute("fill", "gradient");

      item.appendChild(overlay);
      carousel.appendChild(item);
    }

    return carousel;
  },
};

export const Playground: Story = {
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
