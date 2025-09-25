import type { Meta, StoryObj } from "@storybook/html";
import {
  randPhrase,
  randParagraph,
  randNumber,
  randUrl,
  randFullName,
  randAvatar,
} from "@ngneat/falso";

interface CarouselProps {
  layout: {
    desktop: number;
    mobile: number;
    gap: number;
  };
  interval: number;
  autoPlay: boolean;
  showArrows: boolean;
  showDots: boolean;
}

const meta = {
  title: "Components/Carousel",
  component: "wc-carousel",
  tags: ["autodocs"],
  argTypes: {
    "layout.desktop": {
      control: { type: "range", min: 1, max: 5, step: 1 },
      description: "Number of columns on desktop",
    },
    "layout.mobile": {
      control: { type: "range", min: 1, max: 3, step: 1 },
      description: "Number of columns on mobile",
    },
    "layout.gap": {
      control: { type: "range", min: 8, max: 32, step: 4 },
      description: "Gap between items in pixels",
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
  },
  render: (args: CarouselProps) => {
    const carousel = document.createElement("wc-carousel");

    // Set properties
    carousel.setAttribute("layout", JSON.stringify(args.layout));
    carousel.setAttribute("interval", args.interval.toString());
    if (args.autoPlay) carousel.setAttribute("auto-play", "");
    if (args.showArrows) carousel.setAttribute("show-arrows", "");
    if (args.showDots) carousel.setAttribute("show-dots", "");

    // Generate carousel items with cards
    for (let i = 0; i < 8; i++) {
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

    return carousel;
  },
} satisfies Meta<CarouselProps>;

export default meta;
type Story = StoryObj<CarouselProps>;

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
    carousel.setAttribute("auto-play", "");
    carousel.setAttribute("show-arrows", "");
    carousel.setAttribute("show-dots", "");

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
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};
