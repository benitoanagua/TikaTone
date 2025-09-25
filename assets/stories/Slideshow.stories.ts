// assets/stories/Slideshow.stories.ts
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit-html";
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
} satisfies Meta<SlideshowProps>;

export default meta;
type Story = StoryObj<SlideshowProps>;

const renderSlideshow = (args: SlideshowProps, items: unknown) => html`
  <wc-slideshow
    ?show-nav=${args.showNav ?? true}
    ?modal=${args.modal ?? false}
    ?auto-play=${args.autoPlay ?? true}
    ?show-indicators=${args.showIndicators ?? true}
    interval=${(args.interval || 5000).toString()}
  >
    ${items}
  </wc-slideshow>
`;

const renderOverlaySlide = (index: number) => html`
  <wc-slideshow-item>
    <wc-overlay
      title="Slide ${index + 1}: ${randPhrase()}"
      tag-name=${randWord()}
      author-name=${randFullName()}
      feature-image=${`https://picsum.photos/800/600?random=${randNumber({ min: 1, max: 1000 })}`}
      heading="2"
      aspect-ratio="video"
      align=${index % 3 === 0 ? "start" : index % 3 === 1 ? "center" : "end"}
      position=${index % 3 === 0
        ? "bottom"
        : index % 3 === 1
          ? "center"
          : "top"}
      fill="gradient"
      box="background"
    ></wc-overlay>
  </wc-slideshow-item>
`;

const renderCardSlide = (index: number) => html`
  <wc-slideshow-item>
    <wc-card
      title="Featured Article ${index + 1}: ${randPhrase()}"
      excerpt="This is a detailed excerpt for the slideshow. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      feature-image=${`https://picsum.photos/800/400?random=${randNumber({ min: 1, max: 1000 })}`}
      author-name=${randFullName()}
      tag-name=${randWord()}
      heading="2"
      media-align="top"
      aspect-ratio="video"
    ></wc-card>
  </wc-slideshow-item>
`;

export const Default: Story = {
  render: (args) => html`
    <div class="bg-background">
      ${renderSlideshow(
        args,
        Array.from({ length: 5 }, (_, i) => renderOverlaySlide(i))
      )}
    </div>
  `,
  args: {
    showNav: true,
    modal: false,
    interval: 5000,
    autoPlay: true,
    showIndicators: true,
  },
};

export const ModalMode: Story = {
  render: (args) => html`
    <div class="bg-background">
      ${renderSlideshow(
        args,
        Array.from({ length: 5 }, (_, i) => renderOverlaySlide(i))
      )}
    </div>
  `,
  args: {
    showNav: false,
    modal: true,
    interval: 4000,
    autoPlay: true,
    showIndicators: true,
  },
};

export const NoAutoPlay: Story = {
  render: (args) => html`
    <div class="bg-background">
      ${renderSlideshow(
        args,
        Array.from({ length: 5 }, (_, i) => renderOverlaySlide(i))
      )}
    </div>
  `,
  args: {
    showNav: true,
    modal: false,
    interval: 5000,
    autoPlay: false,
    showIndicators: true,
  },
};

export const NavigationOnly: Story = {
  render: (args) => html`
    <div class="bg-background">
      ${renderSlideshow(
        args,
        Array.from({ length: 5 }, (_, i) => renderOverlaySlide(i))
      )}
    </div>
  `,
  args: {
    showNav: true,
    modal: false,
    interval: 6000,
    autoPlay: false,
    showIndicators: false,
  },
};

export const IndicatorsOnly: Story = {
  render: (args) => html`
    <div class="bg-background">
      ${renderSlideshow(
        args,
        Array.from({ length: 5 }, (_, i) => renderOverlaySlide(i))
      )}
    </div>
  `,
  args: {
    showNav: false,
    modal: false,
    interval: 3000,
    autoPlay: true,
    showIndicators: true,
  },
};

export const MinimalSlideshow: Story = {
  render: (args) => html`
    <div class="bg-background">
      ${renderSlideshow(
        args,
        Array.from({ length: 5 }, (_, i) => renderOverlaySlide(i))
      )}
    </div>
  `,
  args: {
    showNav: false,
    modal: true,
    interval: 5000,
    autoPlay: true,
    showIndicators: false,
  },
};

export const WithCards: Story = {
  render: () => html`
    <div class="bg-background">
      <wc-slideshow show-nav show-indicators auto-play interval="4000">
        ${Array.from({ length: 4 }, (_, i) => renderCardSlide(i))}
      </wc-slideshow>
    </div>
  `,
};

export const MixedContent: Story = {
  render: () => html`
    <div class="bg-background">
      <wc-slideshow show-nav show-indicators auto-play interval="5000">
        <!-- Slide 1: Overlay -->
        <wc-slideshow-item>
          <wc-overlay
            title="Hero Banner: Discover New Features"
            tag-name="Featured"
            author-name="Admin"
            feature-image="https://picsum.photos/800/500?random=1"
            heading="1"
            aspect-ratio="video"
            align="center"
            position="center"
            fill="gradient"
            box="background"
          ></wc-overlay>
        </wc-slideshow-item>

        <!-- Slide 2: Card -->
        <wc-slideshow-item>
          <wc-card
            title="Latest Update: Enhanced Performance"
            excerpt="Our latest release includes significant performance improvements and new customization options."
            feature-image="https://picsum.photos/800/400?random=2"
            author-name="Development Team"
            tag-name="Update"
            heading="2"
            media-align="top"
            aspect-ratio="video"
          ></wc-card>
        </wc-slideshow-item>

        <!-- Slide 3: Custom Content -->
        <wc-slideshow-item>
          <div
            class="w-full h-96 bg-gradient-to-r from-primary to-secondary flex items-center justify-center"
          >
            <div class="text-center text-white p-8">
              <h2 class="text-4xl font-bold mb-4">Custom Slide</h2>
              <p class="text-xl opacity-90">
                Fully customizable content for any use case
              </p>
              <button
                class="mt-6 px-6 py-2 bg-white text-primary rounded-lg font-semibold"
              >
                Learn More
              </button>
            </div>
          </div>
        </wc-slideshow-item>
      </wc-slideshow>
    </div>
  `,
};

export const ControlVariations: Story = {
  render: () => html`
    <div class="p-6 bg-background space-y-8">
      <h2 class="text-2xl font-bold text-onSurface">
        Slideshow Control Variations
      </h2>

      ${[
        { showNav: true, showIndicators: true, name: "Full Controls" },
        { showNav: true, showIndicators: false, name: "Navigation Only" },
        { showNav: false, showIndicators: true, name: "Indicators Only" },
        { showNav: false, showIndicators: false, name: "Minimal" },
      ].map(
        (variation) => html`
          <div>
            <h3 class="text-lg font-medium text-onSurface mb-3">
              ${variation.name}
            </h3>
            <wc-slideshow
              ?show-nav=${variation.showNav}
              ?show-indicators=${variation.showIndicators}
              auto-play
              interval="4000"
            >
              ${Array.from({ length: 3 }, (_, i) => renderOverlaySlide(i))}
            </wc-slideshow>
          </div>
        `
      )}
    </div>
  `,
};

export const Playground: Story = {
  render: (args) => html`
    <div class="bg-background">
      ${renderSlideshow(
        args,
        Array.from({ length: 5 }, (_, i) => renderOverlaySlide(i))
      )}
    </div>
  `,
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
