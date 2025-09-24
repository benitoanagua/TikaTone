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
      options: ["monitor", "square", "video"],
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
  render: (args: OverlayProps) => {
    const overlay = document.createElement("wc-overlay");

    Object.entries(args).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        overlay.setAttribute(key.replace(/_/g, "-"), String(value));
      }
    });

    return overlay;
  },
} satisfies Meta<OverlayProps>;

export default meta;
type Story = StoryObj<OverlayProps>;

const generateOverlayData = (): OverlayProps => ({
  title: randPhrase(),
  url: randUrl(),
  feature_image: `https://picsum.photos/800/600?random=${randNumber({ min: 1, max: 1000 })}`,
  tag_name: randWord(),
  author_name: randFullName(),
  published_at: `${randMonth({ abbreviation: true })} ${randNumber({ min: 1, max: 30 })}, ${randNumber({ min: 2020, max: 2024 })}`,
  reading_time: `${randNumber({ min: 5, max: 25 })} min read`,
  heading: 3,
  aspect_ratio: "monitor",
  align: "center",
  position: "center",
  box: "background",
  fill: "gradient",
});

export const Default: Story = {
  args: generateOverlayData(),
};

export const ContentVariations: Story = {
  name: "Content Variations",
  args: {
    ...generateOverlayData(),
  },
  render: (args) => {
    const container = document.createElement("div");
    container.className = "grid grid-cols-1 md:grid-cols-2 gap-6 p-6";

    const variations = [
      {
        name: "Full Content",
        data: {
          tag_name: randWord(),
          author_name: randFullName(),
          published_at: `${randMonth({ abbreviation: true })} ${randNumber({ min: 1, max: 30 })}, ${randNumber({ min: 2020, max: 2024 })}`,
          reading_time: `${randNumber({ min: 5, max: 25 })} min read`,
        },
      },
      {
        name: "Title Only",
        data: {
          tag_name: "",
          author_name: "",
          published_at: "",
          reading_time: "",
        },
      },
      {
        name: "With Tag Only",
        data: {
          tag_name: randWord(),
          author_name: "",
          published_at: "",
          reading_time: "",
        },
      },
      {
        name: "Minimal",
        data: {
          tag_name: "",
          author_name: "",
          published_at: "",
          reading_time: "",
          fill: "none",
          box: "transparent",
        },
      },
    ];

    variations.forEach((variation) => {
      const overlay = document.createElement("wc-overlay");

      // Usar args base y aplicar variación
      const combinedData = {
        ...args,
        ...variation.data,
        title: `${args.title} (${variation.name})`,
      };

      Object.entries(combinedData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          overlay.setAttribute(key.replace(/_/g, "-"), String(value));
        }
      });

      container.appendChild(overlay);
    });

    return container;
  },
};

export const StyleVariations: Story = {
  name: "Style Variations",
  args: {
    ...generateOverlayData(),
  },
  render: (args) => {
    const container = document.createElement("div");
    container.className = "grid grid-cols-1 md:grid-cols-2 gap-6 p-6";

    const styles = [
      { fill: "full", box: "background", name: "Full + Background" },
      { fill: "gradient", box: "border", name: "Gradient + Border" },
      { fill: "none", box: "transparent", name: "None + Transparent" },
      { fill: "gradient", box: "background", name: "Gradient + Background" },
    ];

    styles.forEach((style) => {
      const overlay = document.createElement("wc-overlay");

      const combinedData = {
        ...args,
        ...style,
        title: `${args.title} (${style.name})`,
        feature_image: `https://picsum.photos/600/400?random=${randNumber({ min: 1, max: 1000 })}`,
      };

      Object.entries(combinedData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          overlay.setAttribute(key.replace(/_/g, "-"), String(value));
        }
      });

      container.appendChild(overlay);
    });

    return container;
  },
};

export const PositioningVariations: Story = {
  name: "Positioning Variations",
  args: {
    ...generateOverlayData(),
  },
  render: (args) => {
    const container = document.createElement("div");
    container.className = "grid grid-cols-1 md:grid-cols-2 gap-6 p-6";

    const positions = [
      { align: "start", position: "top", name: "Top Start" },
      { align: "center", position: "center", name: "Center" },
      { align: "end", position: "bottom", name: "Bottom End" },
      { align: "start", position: "bottom", name: "Bottom Start" },
    ];

    positions.forEach((pos) => {
      const overlay = document.createElement("wc-overlay");

      const combinedData = {
        ...args,
        ...pos,
        title: `${args.title} (${pos.name})`,
        feature_image: `https://picsum.photos/700/500?random=${randNumber({ min: 1, max: 1000 })}`,
      };

      Object.entries(combinedData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          overlay.setAttribute(key.replace(/_/g, "-"), String(value));
        }
      });

      container.appendChild(overlay);
    });

    return container;
  },
};

export const AspectRatioVariations: Story = {
  name: "Aspect Ratio Variations",
  args: {
    ...generateOverlayData(),
  },
  render: (args) => {
    const container = document.createElement("div");
    container.className = "grid grid-cols-1 md:grid-cols-3 gap-6 p-6";

    const ratios = [
      { ratio: "monitor", name: "Monitor (4:3)", height: "450" },
      { ratio: "square", name: "Square (1:1)", height: "600" },
      { ratio: "video", name: "Video (16:9)", height: "400" },
    ];

    ratios.forEach((item) => {
      const overlay = document.createElement("wc-overlay");

      const combinedData = {
        ...args,
        aspect_ratio: item.ratio,
        title: `${args.title} (${item.name})`,
        feature_image: `https://picsum.photos/600/${item.height}?random=${randNumber({ min: 1, max: 1000 })}`,
      };

      Object.entries(combinedData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          overlay.setAttribute(key.replace(/_/g, "-"), String(value));
        }
      });

      container.appendChild(overlay);
    });

    return container;
  },
};

export const Playground: Story = {
  args: generateOverlayData(),
  parameters: {
    controls: {
      expanded: true,
      sort: "requiredFirst",
    },
  },
};
