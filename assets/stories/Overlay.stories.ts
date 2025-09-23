import type { Meta, StoryObj } from "@storybook/html";
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

const meta: Meta<OverlayProps> = {
  title: "Components/Overlay",
  component: "wc-overlay",
  tags: ["autodocs"],
  argTypes: {
    heading: {
      control: { type: "range", min: 1, max: 6, step: 1 },
      description: "Heading level (1-6)",
    },
    aspect_ratio: {
      control: { type: "inline-radio" },
      options: ["monitor", "square", "video"],
      description: "Image aspect ratio",
    },
    show_meta: {
      control: { type: "boolean" },
      description: "Show author and date information",
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
    feature_image: {
      control: { type: "text" },
      description: "Background image URL",
    },
    tag_name: {
      control: { type: "text" },
      description: "Category or tag name",
    },
    author_name: {
      control: { type: "text" },
      description: "Author name",
    },
    published_at: {
      control: { type: "text" },
      description: "Publication date",
    },
    reading_time: {
      control: { type: "text" },
      description: "Estimated reading time",
    },
  },
  render: (args: OverlayProps) => {
    const overlay = document.createElement("wc-overlay");

    Object.entries(args).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        overlay.setAttribute(key.replace(/_/g, "-"), String(value));
      }
    });

    return overlay;
  },
};

export default meta;
type Story = StoryObj<OverlayProps>;

const baseOverlayData = {
  url: randUrl(),
  feature_image: "https://picsum.photos/800/600",
  author_name: randFullName(),
  published_at: `${randMonth({ abbreviation: true })} ${randNumber({
    min: 1,
    max: 30,
  })}, ${randNumber({ min: 2020, max: 2024 })}`,
  reading_time: `${randNumber({ min: 5, max: 25 })} min read`,
};

export const StandardConfiguration: Story = {
  name: "Standard Configuration",
  args: {
    ...baseOverlayData,
    title: randPhrase(),
    tag_name: randWord(),
    heading: 3,
    aspect_ratio: "monitor",
    show_meta: true,
    align: "center",
    position: "center",
    box: "background",
    fill: "gradient",
  },
};

export const MinimalPresentation: Story = {
  name: "Minimal Presentation",
  args: {
    ...baseOverlayData,
    title: randPhrase(),
    tag_name: "",
    heading: 2,
    aspect_ratio: "square",
    show_meta: false,
    align: "center",
    position: "center",
    box: "transparent",
    fill: "none",
    feature_image: "https://picsum.photos/600/600",
  },
};

export const TopAlignedContent: Story = {
  name: "Top Aligned Content",
  args: {
    ...baseOverlayData,
    title: randPhrase(),
    tag_name: randWord(),
    heading: 4,
    aspect_ratio: "monitor",
    show_meta: true,
    align: "start",
    position: "top",
    box: "border",
    fill: "full",
  },
};

export const BottomAlignedContent: Story = {
  name: "Bottom Aligned Content",
  args: {
    ...baseOverlayData,
    title: randPhrase(),
    tag_name: randWord(),
    heading: 3,
    aspect_ratio: "video",
    show_meta: false,
    align: "end",
    position: "bottom",
    box: "background",
    fill: "gradient",
    feature_image: "https://picsum.photos/800/450",
  },
};

export const FullOverlayEffect: Story = {
  name: "Full Overlay Effect",
  args: {
    ...baseOverlayData,
    title: randPhrase(),
    tag_name: randWord(),
    heading: 2,
    aspect_ratio: "monitor",
    show_meta: true,
    align: "center",
    position: "center",
    box: "transparent",
    fill: "full",
  },
};

export const GradientOverlayEffect: Story = {
  name: "Gradient Overlay Effect",
  args: {
    ...baseOverlayData,
    title: randPhrase(),
    tag_name: randWord(),
    heading: 1,
    aspect_ratio: "square",
    show_meta: true,
    align: "center",
    position: "bottom",
    box: "background",
    fill: "gradient",
    feature_image: "https://picsum.photos/600/600",
  },
};

export const NoOverlayEffect: Story = {
  name: "No Overlay Effect",
  args: {
    ...baseOverlayData,
    title: randPhrase(),
    tag_name: randWord(),
    heading: 4,
    aspect_ratio: "monitor",
    show_meta: true,
    align: "center",
    position: "center",
    box: "border",
    fill: "none",
  },
};

export const BorderContainerStyle: Story = {
  name: "Border Container Style",
  args: {
    ...baseOverlayData,
    title: randPhrase(),
    tag_name: randWord(),
    heading: 3,
    aspect_ratio: "video",
    show_meta: false,
    align: "end",
    position: "top",
    box: "border",
    fill: "gradient",
    feature_image: "https://picsum.photos/800/450",
  },
};

export const TransparentContainerStyle: Story = {
  name: "Transparent Container Style",
  args: {
    ...baseOverlayData,
    title: randPhrase(),
    tag_name: randWord(),
    heading: 2,
    aspect_ratio: "monitor",
    show_meta: true,
    align: "start",
    position: "center",
    box: "transparent",
    fill: "full",
  },
};

export const ContentAlignmentShowcase: Story = {
  name: "Content Alignment Showcase",
  render: () => {
    const container = document.createElement("div");
    container.className = "grid grid-cols-1 md:grid-cols-3 gap-6 p-6";

    const alignments = ["start", "center", "end"] as OverlayAlign[];
    const positions = ["top", "center", "bottom"] as OverlayPosition[];

    alignments.forEach((align) => {
      positions.forEach((position) => {
        const overlay = document.createElement("wc-overlay");
        overlay.setAttribute("title", `Align: ${align}\nPosition: ${position}`);
        overlay.setAttribute("feature-image", "https://picsum.photos/400/250");
        overlay.setAttribute("aspect-ratio", "monitor");
        overlay.setAttribute("heading", "4");
        overlay.setAttribute("align", align);
        overlay.setAttribute("position", position);
        overlay.setAttribute("box", "background");
        overlay.setAttribute("fill", "gradient");
        overlay.setAttribute("show-category", "true");
        overlay.setAttribute("tag-name", `${align}-${position}`);

        container.appendChild(overlay);
      });
    });

    return container;
  },
};

export const InteractiveConfiguration: Story = {
  name: "Interactive Configuration",
  args: {
    title: "Customize this overlay",
    url: randUrl(),
    feature_image: "https://picsum.photos/800/500",
    tag_name: "Custom",
    author_name: randFullName(),
    published_at: "Current date",
    reading_time: "5 min read",
    heading: 3,
    aspect_ratio: "monitor",
    show_meta: true,
    align: "center",
    position: "center",
    box: "background",
    fill: "gradient",
  },
  parameters: {
    controls: {
      expanded: true,
      sort: "requiredFirst",
    },
  },
};
