import type { Meta, StoryObj } from "@storybook/html";
import {
  randUrl,
  randParagraph,
  randFullName,
  randAvatar,
  randNumber,
  randMonth,
  randWord,
  randCatchPhrase,
} from "@ngneat/falso";
import type {
  CardProps,
  CardHeading,
  CardMediaAlign,
  CardMediaWidth,
  CardAspectRatio,
} from "../types/card.js";

const meta = {
  title: "Components/Card",
  component: "wc-card",
  tags: ["autodocs"],
  argTypes: {
    heading: {
      control: { type: "range", min: 1, max: 6, step: 1 },
      description: "Heading level (1-6) - affects padding size",
    },
    media_align: {
      control: { type: "select" },
      options: ["left", "right", "top", "bottom"] as CardMediaAlign[],
      description: "Media alignment",
    },
    media_width: {
      control: { type: "select" },
      options: [
        "is-half",
        "is-two-fifths",
        "is-one-third",
        "is-one-quarter",
        "is-one-fifth",
      ] as CardMediaWidth[],
      description: "Media width relative to content (desktop only)",
    },
    aspect_ratio: {
      control: { type: "radio" },
      options: ["monitor", "square", "video"] as CardAspectRatio[],
      description: "Image aspect ratio",
    },
    auto_layout: {
      control: { type: "boolean" },
      description: "Auto switch to column layout on mobile",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
  render: (args: CardProps) => {
    const card = document.createElement("wc-card");

    Object.entries(args).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        if (typeof value === "boolean") {
          if (value === true) {
            card.setAttribute(key.replace(/_/g, "-"), "");
          }
        } else {
          card.setAttribute(key.replace(/_/g, "-"), String(value));
        }
      }
    });

    return card;
  },
} satisfies Meta<CardProps>;

export default meta;
type Story = StoryObj<CardProps>;

const generateCardData = (): Omit<
  CardProps,
  "heading" | "media_align" | "media_width" | "aspect_ratio" | "auto_layout"
> => ({
  title: randCatchPhrase(),
  url: randUrl(),
  excerpt: randParagraph(),
  feature_image: `https://picsum.photos/400/300?random=${randNumber({ min: 1, max: 1000 })}`,
  tag_name: randWord(),
  tag_url: randUrl(),
  author_name: randFullName(),
  author_url: randUrl(),
  author_profile_image: randAvatar(),
  reading_time: `${randNumber({ min: 5, max: 25 })} min read`,
  published_at: `${randMonth({ abbreviation: true })} ${randNumber({ min: 1, max: 30 })}, ${randNumber({ min: 2020, max: 2024 })}`,
});

export const Default: Story = {
  name: "Default (Fixed Layout)",
  args: {
    ...generateCardData(),
    heading: 4,
    media_align: "left",
    media_width: "is-half",
    aspect_ratio: "monitor",
    auto_layout: false,
  },
};

export const AutoLayout: Story = {
  name: "With Auto Layout",
  args: {
    ...generateCardData(),
    heading: 4,
    media_align: "left",
    media_width: "is-half",
    aspect_ratio: "monitor",
    auto_layout: true,
  },
};

export const FixedLayout: Story = {
  name: "With Fixed Layout",
  args: {
    ...generateCardData(),
    heading: 4,
    media_align: "left",
    media_width: "is-one-third",
    aspect_ratio: "monitor",
    auto_layout: false,
  },
};

export const TopAligned: Story = {
  name: "Top Aligned Media",
  args: {
    ...generateCardData(),
    heading: 3,
    media_align: "top",
    media_width: "is-half",
    aspect_ratio: "video",
    auto_layout: true,
  },
};

export const RightAligned: Story = {
  name: "Right Aligned Media",
  args: {
    ...generateCardData(),
    heading: 4,
    media_align: "right",
    media_width: "is-one-third",
    aspect_ratio: "monitor",
    auto_layout: true,
  },
};

export const NoImage: Story = {
  name: "Without Image",
  args: {
    ...generateCardData(),
    heading: 3,
    media_align: "top",
    aspect_ratio: "monitor",
    auto_layout: true,
    feature_image: "",
  },
};

export const MinimalContent: Story = {
  name: "Minimal Content",
  args: {
    title: randCatchPhrase(),
    url: randUrl(),
    excerpt: "",
    feature_image: `https://picsum.photos/400/300?random=${randNumber({ min: 1, max: 1000 })}`,
    tag_name: "",
    tag_url: "",
    author_name: "",
    author_url: "",
    author_profile_image: "",
    reading_time: "",
    published_at: "",
    heading: 4,
    media_align: "top",
    media_width: "is-half",
    aspect_ratio: "monitor",
    auto_layout: true,
  },
};

export const HeadingSizes: Story = {
  name: "Heading Sizes Comparison",
  render: () => {
    const container = document.createElement("div");
    container.className =
      "grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-surfaceContainerLow";

    const headings: CardHeading[] = [1, 2, 3, 4, 5, 6];

    headings.forEach((heading) => {
      const cardData = generateCardData();
      const card = document.createElement("wc-card");

      Object.entries(cardData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          card.setAttribute(key.replace(/_/g, "-"), String(value));
        }
      });

      card.setAttribute("heading", heading.toString());
      card.setAttribute("media-align", "left");
      card.setAttribute("media-width", "is-half");
      card.setAttribute("aspect-ratio", "monitor");

      container.appendChild(card);
    });

    return container;
  },
};

export const LayoutComparison: Story = {
  name: "Layout Variations",
  render: () => {
    const container = document.createElement("div");
    container.className = "grid grid-cols-1 md:grid-cols-2 gap-6 p-6";

    const layouts = [
      {
        align: "left" as CardMediaAlign,
        width: "is-half" as CardMediaWidth,
        name: "Left Aligned",
        auto_layout: true,
      },
      {
        align: "right" as CardMediaAlign,
        width: "is-one-third" as CardMediaWidth,
        name: "Right Aligned",
        auto_layout: true,
      },
      {
        align: "top" as CardMediaAlign,
        width: "is-half" as CardMediaWidth,
        name: "Top Aligned",
        auto_layout: true,
      },
      {
        align: "bottom" as CardMediaAlign,
        width: "is-two-fifths" as CardMediaWidth,
        name: "Bottom Aligned",
        auto_layout: true,
      },
    ];

    layouts.forEach((layout) => {
      const cardData = generateCardData();
      const card = document.createElement("wc-card");

      Object.entries(cardData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          card.setAttribute(key.replace(/_/g, "-"), String(value));
        }
      });

      card.setAttribute("heading", "4");
      card.setAttribute("media-align", layout.align);
      card.setAttribute("media-width", layout.width);
      card.setAttribute("aspect-ratio", "monitor");
      if (layout.auto_layout) {
        card.setAttribute("auto-layout", "");
      }

      container.appendChild(card);
    });

    return container;
  },
};

export const AspectRatios: Story = {
  name: "Aspect Ratio Variations",
  render: () => {
    const container = document.createElement("div");
    container.className = "grid grid-cols-1 md:grid-cols-3 gap-6 p-6";

    const ratios = [
      { ratio: "monitor" as CardAspectRatio, height: "300" },
      { ratio: "square" as CardAspectRatio, height: "400" },
      { ratio: "video" as CardAspectRatio, height: "225" },
    ];

    ratios.forEach((item) => {
      const cardData = generateCardData();
      const card = document.createElement("wc-card");

      Object.entries(cardData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          card.setAttribute(key.replace(/_/g, "-"), String(value));
        }
      });

      card.setAttribute("heading", "4");
      card.setAttribute("media-align", "top");
      card.setAttribute("media-width", "is-half");
      card.setAttribute("aspect-ratio", item.ratio);
      card.setAttribute("auto-layout", "");
      card.setAttribute(
        "feature-image",
        `https://picsum.photos/400/${item.height}?random=${randNumber({ min: 1, max: 1000 })}`
      );

      container.appendChild(card);
    });

    return container;
  },
};

export const AutoVsFixed: Story = {
  name: "Auto vs Fixed Layout",
  render: () => {
    const container = document.createElement("div");
    container.className = "grid grid-cols-1 md:grid-cols-2 gap-6 p-6";

    const cardData = generateCardData();

    [true, false].forEach((autoLayout) => {
      const card = document.createElement("wc-card");

      Object.entries(cardData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          card.setAttribute(key.replace(/_/g, "-"), String(value));
        }
      });

      card.setAttribute("heading", "4");
      card.setAttribute("media-align", "left");
      card.setAttribute("media-width", "is-half");
      card.setAttribute("aspect-ratio", "monitor");

      if (autoLayout) {
        card.setAttribute("auto-layout", "");
      }

      container.appendChild(card);
    });

    return container;
  },
};

export const MediaWidthShowcase: Story = {
  name: "Media Width Variations",
  render: () => {
    const container = document.createElement("div");
    container.className =
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6";

    const widths: CardMediaWidth[] = [
      "is-half",
      "is-two-fifths",
      "is-one-third",
      "is-one-quarter",
      "is-one-fifth",
    ];

    widths.forEach((width) => {
      const cardData = generateCardData();
      const card = document.createElement("wc-card");

      Object.entries(cardData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          card.setAttribute(key.replace(/_/g, "-"), String(value));
        }
      });

      card.setAttribute("heading", "4");
      card.setAttribute("media-align", "left");
      card.setAttribute("media-width", width);
      card.setAttribute("aspect-ratio", "monitor");
      card.setAttribute("auto-layout", "");

      container.appendChild(card);
    });

    return container;
  },
};

export const Playground: Story = {
  args: {
    ...generateCardData(),
    heading: 4,
    media_align: "left",
    media_width: "is-half",
    aspect_ratio: "monitor",
    auto_layout: false,
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};
