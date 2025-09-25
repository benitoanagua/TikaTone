import type { Meta, StoryObj } from "@storybook/html";
import { randPhrase, randNumber, randFullName, randWord } from "@ngneat/falso";
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
      control: { type: "range", min: 1000, max: 10000, step: 500 },
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
  render: (args: SlideshowProps) => {
    const slideshow = document.createElement("wc-slideshow");

    // Set properties using SlideshowProps interface
    slideshow.setAttribute("show-nav", args.showNav ? "true" : "false");
    slideshow.setAttribute("modal", args.modal ? "true" : "false");
    slideshow.setAttribute("auto-play", args.autoPlay ? "true" : "false");
    slideshow.setAttribute(
      "show-indicators",
      args.showIndicators ? "true" : "false"
    );
    slideshow.setAttribute("interval", (args.interval || 5000).toString());

    // Generate slideshow items with overlays
    for (let i = 0; i < 5; i++) {
      const item = document.createElement("wc-slideshow-item");

      const overlay = document.createElement("wc-overlay");
      overlay.setAttribute("title", `${randPhrase()} ${i + 1}`);
      overlay.setAttribute("tag-name", randWord());
      overlay.setAttribute("author-name", randFullName());
      overlay.setAttribute(
        "feature-image",
        `https://picsum.photos/800/600?random=${randNumber({ min: 1, max: 1000 })}`
      );
      overlay.setAttribute("heading", "2");
      overlay.setAttribute("aspect-ratio", "video");
      overlay.setAttribute(
        "align",
        i % 3 === 0 ? "start" : i % 3 === 1 ? "center" : "end"
      );
      overlay.setAttribute(
        "position",
        i % 3 === 0 ? "bottom" : i % 3 === 1 ? "center" : "top"
      );
      overlay.setAttribute("fill", "gradient");
      overlay.setAttribute("box", "background");

      item.appendChild(overlay);
      slideshow.appendChild(item);
    }

    // Add event listeners for demonstration
    slideshow.addEventListener("slideshow-change", (event: any) => {
      console.log("Slideshow changed:", event.detail);
    });

    slideshow.addEventListener("slideshow-navigation", (event: any) => {
      console.log("Slideshow navigation:", event.detail);
    });

    return slideshow;
  },
} satisfies Meta<SlideshowProps>;

export default meta;
type Story = StoryObj<SlideshowProps>;

// Las stories permanecen igual...
export const Default: Story = {
  args: {
    showNav: true,
    modal: false,
    interval: 5000,
    autoPlay: true,
    showIndicators: true,
  },
};

export const ModalMode: Story = {
  args: {
    showNav: false,
    modal: true,
    interval: 4000,
    autoPlay: true,
    showIndicators: true,
  },
};

export const NoAutoPlay: Story = {
  args: {
    showNav: true,
    modal: false,
    interval: 5000,
    autoPlay: false,
    showIndicators: true,
  },
};

export const NavigationOnly: Story = {
  args: {
    showNav: true,
    modal: false,
    interval: 6000,
    autoPlay: false,
    showIndicators: false,
  },
};

export const IndicatorsOnly: Story = {
  args: {
    showNav: false,
    modal: false,
    interval: 3000,
    autoPlay: true,
    showIndicators: true,
  },
};

export const MinimalSlideshow: Story = {
  args: {
    showNav: false,
    modal: true,
    interval: 5000,
    autoPlay: true,
    showIndicators: false,
  },
};

export const WithCards: Story = {
  render: () => {
    const slideshow = document.createElement("wc-slideshow");
    slideshow.setAttribute("show-nav", "true");
    slideshow.setAttribute("show-indicators", "true");
    slideshow.setAttribute("auto-play", "true");
    slideshow.setAttribute("interval", "4000");

    for (let i = 0; i < 4; i++) {
      const item = document.createElement("wc-slideshow-item");

      const card = document.createElement("wc-card");
      card.setAttribute("title", `Featured Article ${i + 1}: ${randPhrase()}`);
      card.setAttribute(
        "excerpt",
        `This is a detailed excerpt for slide ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
      );
      card.setAttribute(
        "feature-image",
        `https://picsum.photos/800/400?random=${randNumber({ min: 1, max: 1000 })}`
      );
      card.setAttribute("author-name", randFullName());
      card.setAttribute("tag-name", randWord());
      card.setAttribute("heading", "2");
      card.setAttribute("media-align", "top");
      card.setAttribute("aspect-ratio", "video");

      item.appendChild(card);
      slideshow.appendChild(item);
    }

    return slideshow;
  },
};

export const Playground: Story = {
  args: {
    showNav: true,
    modal: false,
    interval: 5000,
    autoPlay: true,
    showIndicators: true,
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};
