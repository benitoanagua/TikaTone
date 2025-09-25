import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit-html";
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
    },
  },
} satisfies Meta<CardProps>;

export default meta;
type Story = StoryObj<CardProps>;

const renderCard = (args: CardProps) => html`
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
  render: (args) => renderCard(args),
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
  render: (args) => renderCard(args),
  args: {
    ...(Default.args as CardProps),
    auto_layout: true,
  },
};

export const FixedLayout: Story = {
  name: "With Fixed Layout",
  render: (args) => renderCard(args),
  args: {
    ...(Default.args as CardProps),
    media_width: "is-one-third",
  },
};

export const TopAligned: Story = {
  name: "Top Aligned Media",
  render: (args) => renderCard(args),
  args: {
    ...(Default.args as CardProps),
    media_align: "top",
    aspect_ratio: "video",
  },
};

export const RightAligned: Story = {
  name: "Right Aligned Media",
  render: (args) => renderCard(args),
  args: {
    ...(Default.args as CardProps),
    media_align: "right",
    media_width: "is-one-third",
  },
};

export const NoImage: Story = {
  name: "Without Image",
  render: (args) => renderCard(args),
  args: {
    ...(Default.args as CardProps),
    feature_image: "",
  },
};

export const MinimalContent: Story = {
  name: "Minimal Content",
  render: (args) => renderCard(args),
  args: {
    title: randCatchPhrase(),
    url: randUrl(),
    feature_image: `https://picsum.photos/400/300?random=${randNumber({ min: 1, max: 1000 })}`,
    heading: 4,
    media_align: "top",
    media_width: "is-half",
    aspect_ratio: "monitor",
    auto_layout: true,
  } as CardProps,
};

export const HeadingSizes: Story = {
  name: "Heading Sizes Comparison",
  render: () => html`
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      ${([1, 2, 3, 4, 5, 6] as CardHeading[]).map(
        (h) => html`
          <div>
            <h3 class="text-lg font-medium mb-3">Heading Level ${h}</h3>
            ${renderCard({ ...generateCardData(), heading: h })}
          </div>
        `
      )}
    </div>
  `,
};

export const LayoutComparison: Story = {
  name: "Layout Variations",
  render: () => html`
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      ${[
        { align: "left" as const, width: "is-half" as const },
        { align: "right" as const, width: "is-one-third" as const },
        { align: "top" as const, width: "is-half" as const },
        { align: "bottom" as const, width: "is-two-fifths" as const },
      ].map(
        (layout) => html`
          <div>
            <h3 class="text-lg font-medium mb-3">
              ${layout.align} aligned, ${layout.width}
            </h3>
            ${renderCard({
              ...generateCardData(),
              heading: 4,
              media_align: layout.align,
              media_width: layout.width,
              auto_layout: true,
            })}
          </div>
        `
      )}
    </div>
  `,
};

export const AspectRatios: Story = {
  name: "Aspect Ratio Variations",
  render: () => html`
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      ${[
        { ratio: "monitor" as const, height: 300 },
        { ratio: "square" as const, height: 400 },
        { ratio: "video" as const, height: 225 },
      ].map(
        (r) => html`
          <div>
            <h3 class="text-lg font-medium mb-3">${r.ratio} ratio</h3>
            ${renderCard({
              ...generateCardData(),
              heading: 4,
              media_align: "top",
              media_width: "is-half",
              aspect_ratio: r.ratio,
              feature_image: `https://picsum.photos/400/${r.height}?random=${randNumber({ min: 1, max: 1000 })}`,
              auto_layout: true,
            })}
          </div>
        `
      )}
    </div>
  `,
};

export const Playground: Story = {
  render: (args) => renderCard(args),
  args: { ...(Default.args as CardProps) },
  parameters: { controls: { expanded: true } },
};
