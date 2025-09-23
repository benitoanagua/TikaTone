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
  CardDensity,
  CardMediaAlign,
  CardMediaWidth,
  CardAspectRatio,
  CardElevation,
} from "../types/card.js";

const meta = {
  title: "Components/Card",
  component: "wc-card",
  tags: ["autodocs"],
  argTypes: {
    heading: {
      control: { type: "range", min: 1, max: 6, step: 1 },
      description: "Heading level (1-6)",
    },
    density: {
      control: { type: "radio" },
      options: ["normal", "compact", "minimal"] as CardDensity[],
      description: "Content density",
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
      description: "Media width relative to content",
    },
    aspect_ratio: {
      control: { type: "radio" },
      options: ["monitor", "square", "video"] as CardAspectRatio[],
      description: "Image aspect ratio",
    },
    elevation: {
      control: { type: "range", min: 0, max: 3, step: 1 },
      description: "Visual elevation level (0-3)",
      table: {
        type: { summary: "number" },
      },
    },
    feature_image: {
      control: { type: "text" },
      description: "Main image URL",
    },
    author_profile_image: {
      control: { type: "text" },
      description: "Author avatar URL",
    },
    tag_name: {
      control: { type: "text" },
      description: "Tag/category name",
    },
    tag_url: {
      control: { type: "text" },
      description: "Tag/category URL",
    },
    author_name: {
      control: { type: "text" },
      description: "Author name",
    },
    author_url: {
      control: { type: "text" },
      description: "Author profile URL",
    },
    reading_time: {
      control: { type: "text" },
      description: "Estimated reading time",
    },
    published_at: {
      control: { type: "text" },
      description: "Publication date",
    },
  },
  render: (args: CardProps) => {
    const card = document.createElement("wc-card");

    Object.entries(args).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        card.setAttribute(key.replace(/_/g, "-"), String(value));
      }
    });

    return card;
  },
} satisfies Meta<CardProps>;

export default meta;
type Story = StoryObj<CardProps>;

const cardData = {
  title: randCatchPhrase(),
  url: randUrl(),
  excerpt: randParagraph(),
  feature_image: "https://picsum.photos/400/300",
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
};

export const Default: Story = {
  args: {
    ...cardData,
    heading: 4,
    density: "compact",
    media_align: "left",
    media_width: "is-half",
    aspect_ratio: "monitor",
    elevation: 2,
  },
};

export const Minimal: Story = {
  args: {
    ...cardData,
    heading: 6,
    density: "minimal",
    media_align: "top",
    media_width: "is-half",
    aspect_ratio: "square",
    elevation: 0,
    author_name: "",
    tag_name: "",
  },
};

export const Featured: Story = {
  args: {
    ...cardData,
    heading: 2,
    density: "normal",
    media_align: "top",
    media_width: "is-half",
    aspect_ratio: "video",
    elevation: 3,
    feature_image: "https://picsum.photos/600/400",
  },
};

export const RightAligned: Story = {
  args: {
    ...cardData,
    heading: 5,
    density: "compact",
    media_align: "right",
    media_width: "is-one-third",
    aspect_ratio: "monitor",
    elevation: 1,
  },
};

export const BottomAligned: Story = {
  args: {
    ...cardData,
    heading: 4,
    density: "normal",
    media_align: "bottom",
    media_width: "is-two-fifths",
    aspect_ratio: "square",
    elevation: 2,
    author_profile_image: "https://i.pravatar.cc/150?img=12",
  },
};

export const NoImage: Story = {
  args: {
    ...cardData,
    heading: 3,
    density: "normal",
    media_align: "top",
    aspect_ratio: "monitor",
    elevation: 2,
    feature_image: "",
  },
};

export const LongContent: Story = {
  args: {
    title: randCatchPhrase() + " " + randCatchPhrase(),
    url: randUrl(),
    excerpt: randParagraph() + " " + randParagraph() + " " + randParagraph(),
    feature_image: "https://picsum.photos/400/200",
    tag_name: randWord() + " " + randWord(),
    tag_url: randUrl(),
    author_name: randFullName(),
    author_url: randUrl(),
    author_profile_image: "https://i.pravatar.cc/150?img=32",
    reading_time: `${randNumber({ min: 15, max: 45 })} min read`,
    published_at: `${randMonth({ abbreviation: true })} ${randNumber({
      min: 1,
      max: 30,
    })}, ${randNumber({ min: 2020, max: 2024 })}`,
    heading: 4,
    density: "normal",
    media_align: "left",
    media_width: "is-one-third",
    aspect_ratio: "monitor",
    elevation: 2,
  },
};

export const CompactDensity: Story = {
  args: {
    ...cardData,
    heading: 5,
    density: "compact",
    media_align: "left",
    media_width: "is-one-quarter",
    aspect_ratio: "monitor",
    elevation: 1,
  },
};

export const NormalDensity: Story = {
  args: {
    ...cardData,
    heading: 3,
    density: "normal",
    media_align: "top",
    media_width: "is-half",
    aspect_ratio: "video",
    elevation: 2,
  },
};

export const ElevationComparison: Story = {
  args: {
    ...cardData,
    heading: 4,
    density: "compact",
    media_align: "left",
    media_width: "is-half",
    aspect_ratio: "monitor",
  },
  render: (args) => {
    const container = document.createElement("div");
    container.className =
      "grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-surfaceContainerLow";

    ([0, 1, 2, 3] as CardElevation[]).forEach((elevation) => {
      const card = document.createElement("wc-card");

      Object.entries(args).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          card.setAttribute(key.replace(/_/g, "-"), String(value));
        }
      });

      card.setAttribute("elevation", elevation.toString());
      card.setAttribute("title", `${args.title} (Elevation ${elevation})`);

      container.appendChild(card);
    });

    return container;
  },
};

export const MediaAlignmentShowcase: Story = {
  args: {
    ...cardData,
    heading: 4,
    density: "normal",
    media_width: "is-half",
    aspect_ratio: "monitor",
    elevation: 2,
  },
  render: (args) => {
    const container = document.createElement("div");
    container.className = "grid grid-cols-1 md:grid-cols-2 gap-6 p-6";

    (["left", "right", "top", "bottom"] as CardMediaAlign[]).forEach(
      (align) => {
        const card = document.createElement("wc-card");

        Object.entries(args).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            card.setAttribute(key.replace(/_/g, "-"), String(value));
          }
        });

        card.setAttribute("media-align", align);
        card.setAttribute("title", `${args.title} (${align} aligned)`);

        container.appendChild(card);
      }
    );

    return container;
  },
};

export const Playground: Story = {
  args: {
    ...cardData,
    heading: 4,
    density: "compact",
    media_align: "left",
    media_width: "is-half",
    aspect_ratio: "monitor",
    elevation: 2,
  },
  parameters: {
    controls: {
      expanded: true,
      sort: "alpha",
    },
  },
};
