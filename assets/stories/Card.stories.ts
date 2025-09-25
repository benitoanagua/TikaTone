import type { Meta, StoryObj } from "@storybook/html";
import { html, render, TemplateResult } from "lit-html";
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
    const container = document.createElement("div");
    render(renderCard(args), container);
    return container;
  },
} satisfies Meta<CardProps>;

export default meta;
type Story = StoryObj<CardProps>;

const renderCard = (args: CardProps): TemplateResult => html`
  <wc-card
    title=${args.title || ""}
    url=${args.url || ""}
    excerpt=${args.excerpt || ""}
    feature-image=${args.feature_image || ""}
    tag-name=${args.tag_name || ""}
    tag-url=${args.tag_url || ""}
    author-name=${args.author_name || ""}
    author-url=${args.author_url || ""}
    author-profile-image=${args.author_profile_image || ""}
    reading-time=${args.reading_time || ""}
    published-at=${args.published_at || ""}
    heading=${args.heading || 4}
    media-align=${args.media_align || "left"}
    media-width=${args.media_width || "is-half"}
    aspect-ratio=${args.aspect_ratio || "monitor"}
    ?auto-layout=${args.auto_layout ?? false}
  ></wc-card>
`;

const generateCardData = (): Omit<
  CardProps,
  "heading" | "media_align" | "media_width" | "aspect_ratio" | "auto_layout"
> => ({
  title: randCatchPhrase(),
  url: randUrl(),
  excerpt: randParagraph(),
  feature_image: `https://picsum.photos/400/300?random=${randNumber({
    min: 1,
    max: 1000,
  })}`,
  tag_name: randWord(),
  tag_url: randUrl(),
  author_name: randFullName(),
  author_url: randUrl(),
  author_profile_image: randAvatar(),
  reading_time: `${randNumber({ min: 5, max: 25 })} min read`,
  published_at: `${randMonth({ abbreviation: true })} ${randNumber({
    min: 1,
    max: 30,
  })}, ${randNumber({ min: 2020, max: 2024 })}`,
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
  args: { ...Default.args, auto_layout: true },
};

export const FixedLayout: Story = {
  name: "With Fixed Layout",
  args: { ...Default.args, media_width: "is-one-third" },
};

export const TopAligned: Story = {
  name: "Top Aligned Media",
  args: { ...Default.args, media_align: "top", aspect_ratio: "video" },
};

export const RightAligned: Story = {
  name: "Right Aligned Media",
  args: { ...Default.args, media_align: "right", media_width: "is-one-third" },
};

export const NoImage: Story = {
  name: "Without Image",
  args: { ...Default.args, feature_image: "" },
};

export const MinimalContent: Story = {
  name: "Minimal Content",
  args: {
    title: randCatchPhrase(),
    url: randUrl(),
    feature_image: `https://picsum.photos/400/300?random=${randNumber({ min: 1, max: 1000 })}`,
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
    container.className = "grid grid-cols-1 md:grid-cols-2 gap-6 p-6";
    ([1, 2, 3, 4, 5, 6] as CardHeading[]).forEach((h) => {
      render(
        renderCard({ ...generateCardData(), heading: h }),
        container.appendChild(document.createElement("div"))
      );
    });
    return container;
  },
};

export const LayoutComparison: Story = {
  name: "Layout Variations",
  render: () => {
    const container = document.createElement("div");
    container.className = "grid grid-cols-1 md:grid-cols-2 gap-6 p-6";
    [
      { align: "left", width: "is-half" },
      { align: "right", width: "is-one-third" },
      { align: "top", width: "is-half" },
      { align: "bottom", width: "is-two-fifths" },
    ].forEach((layout) => {
      render(
        renderCard({
          ...generateCardData(),
          heading: 4,
          media_align: layout.align as CardMediaAlign,
          media_width: layout.width as CardMediaWidth,
          auto_layout: true,
        }),
        container.appendChild(document.createElement("div"))
      );
    });
    return container;
  },
};

export const AspectRatios: Story = {
  name: "Aspect Ratio Variations",
  render: () => {
    const container = document.createElement("div");
    container.className = "grid grid-cols-1 md:grid-cols-3 gap-6 p-6";
    [
      { ratio: "monitor", height: 300 },
      { ratio: "square", height: 400 },
      { ratio: "video", height: 225 },
    ].forEach((r) => {
      render(
        renderCard({
          ...generateCardData(),
          heading: 4,
          media_align: "top",
          media_width: "is-half",
          aspect_ratio: r.ratio as CardAspectRatio,
          feature_image: `https://picsum.photos/400/${r.height}?random=${randNumber(
            { min: 1, max: 1000 }
          )}`,
          auto_layout: true,
        }),
        container.appendChild(document.createElement("div"))
      );
    });
    return container;
  },
};

export const AutoVsFixed: Story = {
  name: "Auto vs Fixed Layout",
  render: () => {
    const container = document.createElement("div");
    container.className = "grid grid-cols-1 md:grid-cols-2 gap-6 p-6";
    [true, false].forEach((auto) => {
      render(
        renderCard({
          ...generateCardData(),
          heading: 4,
          media_align: "left",
          media_width: "is-half",
          aspect_ratio: "monitor",
          auto_layout: auto,
        }),
        container.appendChild(document.createElement("div"))
      );
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
    (
      [
        "is-half",
        "is-two-fifths",
        "is-one-third",
        "is-one-quarter",
        "is-one-fifth",
      ] as CardMediaWidth[]
    ).forEach((w) => {
      render(
        renderCard({
          ...generateCardData(),
          heading: 4,
          media_align: "left",
          media_width: w,
          auto_layout: true,
        }),
        container.appendChild(document.createElement("div"))
      );
    });
    return container;
  },
};

export const Playground: Story = {
  args: { ...Default.args },
  parameters: { controls: { expanded: true } },
};
