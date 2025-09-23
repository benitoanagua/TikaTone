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
      // Solo establecer atributos si el valor no es undefined, null o vacío
      if (value !== undefined && value !== null && value !== "") {
        overlay.setAttribute(key.replace(/_/g, "-"), String(value));
      }
    });

    return overlay;
  },
};

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
  render: () => {
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
          feature_image: "https://picsum.photos/800/500?random=1",
        },
      },
      {
        name: "Title Only",
        data: {
          tag_name: "",
          author_name: "",
          published_at: "",
          reading_time: "",
          feature_image: "https://picsum.photos/800/400?random=2",
        },
      },
      {
        name: "With Tag Only",
        data: {
          tag_name: randWord(),
          author_name: "",
          published_at: "",
          reading_time: "",
          feature_image: "https://picsum.photos/800/450?random=3",
        },
      },
      {
        name: "Minimal",
        data: {
          tag_name: "",
          author_name: "",
          published_at: "",
          reading_time: "",
          feature_image: "",
          fill: "none" as OverlayFill,
          box: "transparent" as OverlayBox,
        },
      },
    ];

    variations.forEach((variation) => {
      const baseData = generateOverlayData();
      const overlay = document.createElement("wc-overlay");

      Object.entries({ ...baseData, ...variation.data }).forEach(
        ([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            overlay.setAttribute(key.replace(/_/g, "-"), String(value));
          }
        }
      );

      overlay.setAttribute("title", `${baseData.title} (${variation.name})`);
      container.appendChild(overlay);
    });

    return container;
  },
};

export const FillAndBoxVariations: Story = {
  name: "Fill & Box Variations",
  render: () => {
    const container = document.createElement("div");
    container.className = "grid grid-cols-1 md:grid-cols-2 gap-6 p-6";

    const combinations = [
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
    ];

    combinations.forEach((combo) => {
      const baseData = generateOverlayData();
      const overlay = document.createElement("wc-overlay");

      Object.entries(baseData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          overlay.setAttribute(key.replace(/_/g, "-"), String(value));
        }
      });

      overlay.setAttribute("fill", combo.fill);
      overlay.setAttribute("box", combo.box);
      overlay.setAttribute("title", `${baseData.title} (${combo.name})`);
      overlay.setAttribute(
        "feature-image",
        `https://picsum.photos/600/400?random=${randNumber({ min: 1, max: 1000 })}`
      );

      container.appendChild(overlay);
    });

    return container;
  },
};

export const PositioningVariations: Story = {
  name: "Positioning Variations",
  render: () => {
    const container = document.createElement("div");
    container.className = "grid grid-cols-1 md:grid-cols-2 gap-6 p-6";

    const positions = [
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
    ];

    positions.forEach((pos) => {
      const baseData = generateOverlayData();
      const overlay = document.createElement("wc-overlay");

      Object.entries(baseData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          overlay.setAttribute(key.replace(/_/g, "-"), String(value));
        }
      });

      overlay.setAttribute("align", pos.align);
      overlay.setAttribute("position", pos.position);
      overlay.setAttribute("title", `${baseData.title} (${pos.name})`);
      overlay.setAttribute(
        "feature-image",
        `https://picsum.photos/700/500?random=${randNumber({ min: 1, max: 1000 })}`
      );

      container.appendChild(overlay);
    });

    return container;
  },
};

export const AspectRatioVariations: Story = {
  name: "Aspect Ratio Variations",
  render: () => {
    const container = document.createElement("div");
    container.className = "grid grid-cols-1 md:grid-cols-3 gap-6 p-6";

    const ratios = [
      { ratio: "monitor" as const, name: "Monitor (4:3)", height: "450" },
      { ratio: "square" as const, name: "Square (1:1)", height: "600" },
      { ratio: "video" as const, name: "Video (16:9)", height: "400" },
    ];

    ratios.forEach((item) => {
      const baseData = generateOverlayData();
      const overlay = document.createElement("wc-overlay");

      Object.entries(baseData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          overlay.setAttribute(key.replace(/_/g, "-"), String(value));
        }
      });

      overlay.setAttribute("aspect-ratio", item.ratio);
      overlay.setAttribute("title", `${baseData.title} (${item.name})`);
      overlay.setAttribute(
        "feature-image",
        `https://picsum.photos/600/${item.height}?random=${randNumber({ min: 1, max: 1000 })}`
      );

      container.appendChild(overlay);
    });

    return container;
  },
};

export const HeadingSizeVariations: Story = {
  name: "Heading Size Variations",
  render: () => {
    const container = document.createElement("div");
    container.className =
      "grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-surfaceContainerLow";

    const headings = [1, 3, 6] as const;

    headings.forEach((heading) => {
      const baseData = generateOverlayData();
      const overlay = document.createElement("wc-overlay");

      Object.entries(baseData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          overlay.setAttribute(key.replace(/_/g, "-"), String(value));
        }
      });

      overlay.setAttribute("heading", heading.toString());
      overlay.setAttribute("title", `Heading ${heading} Example`);

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
