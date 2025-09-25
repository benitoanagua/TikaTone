import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit-html";
import {
  randUrl,
  randPhrase,
  randWord,
  randFullName,
  randNumber,
  randMonth,
} from "@ngneat/falso";
import type {
  OverlayProps,
  OverlayAlign,
  OverlayPosition,
  OverlayFill,
  OverlayBox,
} from "../types/overlay.js";
import type { CardHeading, CardAspectRatio } from "../types/card.js";

const meta = {
  title: "Components/Overlay",
  tags: ["autodocs"],
  argTypes: {
    heading: {
      control: { type: "range", min: 1, max: 6, step: 1 },
      description: "Heading level (1-6) - affects padding size",
    },
    aspect_ratio: {
      control: { type: "inline-radio" },
      options: ["monitor", "square", "video"] as CardAspectRatio[],
      description: "Image aspect ratio",
    },
    align: {
      control: { type: "inline-radio" },
      options: ["start", "center", "end"] as OverlayAlign[],
      description: "Horizontal content alignment",
    },
    position: {
      control: { type: "inline-radio" },
      options: ["top", "center", "bottom"] as OverlayPosition[],
      description: "Vertical content position",
    },
    box: {
      control: { type: "select" },
      options: ["border", "background", "transparent"] as OverlayBox[],
      description: "Content container style",
    },
    fill: {
      control: { type: "select" },
      options: ["full", "gradient", "none"] as OverlayFill[],
      description: "Overlay effect type",
    },
  },
} satisfies Meta<OverlayProps>;

export default meta;
type Story = StoryObj<OverlayProps>;

/** Render function que asegura tipos literales correctos */
const renderOverlay = (args: OverlayProps) => html`
  <wc-overlay
    title=${args.title || ""}
    url=${args.url || ""}
    feature-image=${args.feature_image || ""}
    tag-name=${args.tag_name || ""}
    author-name=${args.author_name || ""}
    published-at=${args.published_at || ""}
    reading-time=${args.reading_time || ""}
    heading=${(args.heading ?? 3) as CardHeading}
    aspect-ratio=${(args.aspect_ratio ?? "monitor") as CardAspectRatio}
    align=${(args.align ?? "center") as OverlayAlign}
    position=${(args.position ?? "center") as OverlayPosition}
    box=${(args.box ?? "background") as OverlayBox}
    fill=${(args.fill ?? "gradient") as OverlayFill}
  ></wc-overlay>
`;

/** Generador de datos que asegura tipos literales */
const generateOverlayData = (): OverlayProps => ({
  title: randPhrase(),
  url: randUrl(),
  feature_image: `https://picsum.photos/800/600?random=${randNumber({
    min: 1,
    max: 1000,
  })}`,
  tag_name: randWord(),
  author_name: randFullName(),
  published_at: `${randMonth({ abbreviation: true })} ${randNumber({
    min: 1,
    max: 30,
  })}, ${randNumber({ min: 2020, max: 2024 })}`,
  reading_time: `${randNumber({ min: 5, max: 25 })} min read`,
  heading: 3 as CardHeading,
  aspect_ratio: "monitor" as CardAspectRatio,
  align: "center" as OverlayAlign,
  position: "center" as OverlayPosition,
  box: "background" as OverlayBox,
  fill: "gradient" as OverlayFill,
});

export const Default: Story = {
  render: (args) => renderOverlay(args),
  args: generateOverlayData(),
};

export const ContentVariations: Story = {
  name: "Content Variations",
  render: () => html`
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      ${[
        {
          name: "Full Content",
          data: {
            tag_name: randWord(),
            author_name: randFullName(),
            published_at: `${randMonth({ abbreviation: true })} ${randNumber({
              min: 1,
              max: 30,
            })}, ${randNumber({ min: 2020, max: 2024 })}`,
            reading_time: `${randNumber({ min: 5, max: 25 })} min read`,
          } as Partial<OverlayProps>,
        },
        {
          name: "Title Only",
          data: {
            tag_name: "",
            author_name: "",
            published_at: "",
            reading_time: "",
          } as Partial<OverlayProps>,
        },
        {
          name: "With Tag Only",
          data: {
            tag_name: randWord(),
            author_name: "",
            published_at: "",
            reading_time: "",
          } as Partial<OverlayProps>,
        },
        {
          name: "Minimal",
          data: {
            tag_name: "",
            author_name: "",
            published_at: "",
            reading_time: "",
            fill: "none" as OverlayFill,
            box: "transparent" as OverlayBox,
          } as Partial<OverlayProps>,
        },
      ].map(
        (variation) => html`
          <div>
            <h3 class="text-lg font-medium mb-3">${variation.name}</h3>
            ${renderOverlay({
              ...generateOverlayData(),
              ...variation.data,
              title: `${generateOverlayData().title} (${variation.name})`,
            })}
          </div>
        `
      )}
    </div>
  `,
};

export const StyleVariations: Story = {
  name: "Style Variations",
  render: () => html`
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      ${[
        {
          fill: "full" as OverlayFill,
          box: "background" as OverlayBox,
          name: "Full + Background",
        },
        {
          fill: "gradient" as OverlayFill,
          box: "border" as OverlayBox,
          name: "Gradient + Border",
        },
        {
          fill: "none" as OverlayFill,
          box: "transparent" as OverlayBox,
          name: "None + Transparent",
        },
        {
          fill: "gradient" as OverlayFill,
          box: "background" as OverlayBox,
          name: "Gradient + Background",
        },
      ].map(
        (style) => html`
          <div>
            <h3 class="text-lg font-medium mb-3">${style.name}</h3>
            ${renderOverlay({
              ...generateOverlayData(),
              ...style,
              title: `${generateOverlayData().title} (${style.name})`,
              feature_image: `https://picsum.photos/600/400?random=${randNumber(
                {
                  min: 1,
                  max: 1000,
                }
              )}`,
            })}
          </div>
        `
      )}
    </div>
  `,
};

export const PositioningVariations: Story = {
  name: "Positioning Variations",
  render: () => html`
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      ${[
        {
          align: "start" as OverlayAlign,
          position: "top" as OverlayPosition,
          name: "Top Start",
        },
        {
          align: "center" as OverlayAlign,
          position: "center" as OverlayPosition,
          name: "Center",
        },
        {
          align: "end" as OverlayAlign,
          position: "bottom" as OverlayPosition,
          name: "Bottom End",
        },
        {
          align: "start" as OverlayAlign,
          position: "bottom" as OverlayPosition,
          name: "Bottom Start",
        },
      ].map(
        (pos) => html`
          <div>
            <h3 class="text-lg font-medium mb-3">${pos.name}</h3>
            ${renderOverlay({
              ...generateOverlayData(),
              ...pos,
              title: `${generateOverlayData().title} (${pos.name})`,
              feature_image: `https://picsum.photos/700/500?random=${randNumber(
                {
                  min: 1,
                  max: 1000,
                }
              )}`,
            })}
          </div>
        `
      )}
    </div>
  `,
};

export const AspectRatioVariations: Story = {
  name: "Aspect Ratio Variations",
  render: () => html`
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      ${[
        {
          ratio: "monitor" as CardAspectRatio,
          name: "Monitor (4:3)",
          height: "450",
        },
        {
          ratio: "square" as CardAspectRatio,
          name: "Square (1:1)",
          height: "600",
        },
        {
          ratio: "video" as CardAspectRatio,
          name: "Video (16:9)",
          height: "400",
        },
      ].map(
        (item) => html`
          <div>
            <h3 class="text-lg font-medium mb-3">${item.name}</h3>
            ${renderOverlay({
              ...generateOverlayData(),
              aspect_ratio: item.ratio,
              title: `${generateOverlayData().title} (${item.name})`,
              feature_image: `https://picsum.photos/600/${item.height}?random=${randNumber(
                {
                  min: 1,
                  max: 1000,
                }
              )}`,
            })}
          </div>
        `
      )}
    </div>
  `,
};

export const Playground: Story = {
  render: (args) => renderOverlay(args),
  args: generateOverlayData(),
  parameters: {
    controls: {
      expanded: true,
      sort: "requiredFirst",
    },
  },
};
