import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit-html";
import { randSentence, randParagraph, randWord } from "@ngneat/falso";
import type { AccordionProps } from "../types/accordion.js";

const meta = {
  title: "Components/Accordion",
  component: "wc-accordion",
  tags: ["autodocs"],
  argTypes: {
    multiple: {
      control: { type: "boolean" },
    },
    variant: {
      control: { type: "select" },
      options: ["default", "bordered", "separated"],
    },
  },
} satisfies Meta<AccordionProps>;

export default meta;
type Story = StoryObj<AccordionProps>;

const renderAccordion = (args: AccordionProps) => html`
  <wc-accordion
    ?multiple="${args.multiple ?? false}"
    variant="${args.variant || "default"}"
  >
    <wc-accordion-item ?open="${true}">
      <div slot="header" class="flex items-center gap-3">
        <span class="icon-[carbon--translate] w-5 h-5 text-primary"></span>
        <span class="font-medium">Getting Started</span>
      </div>
      <p class="text-onSurfaceVariant">${randParagraph()}</p>
      <div class="mt-3 p-3 bg-primaryContainer border-l-4 border-l-primary">
        <p class="text-onPrimaryContainer text-sm">${randSentence()}</p>
      </div>
    </wc-accordion-item>

    <wc-accordion-item>
      <div slot="header" class="flex items-center gap-3">
        <span class="icon-[carbon--game-console] w-5 h-5 text-primary"></span>
        <span class="font-medium">Configuration</span>
      </div>
      <p class="text-onSurfaceVariant">${randParagraph()}</p>
      <ul class="mt-3 space-y-2">
        ${Array.from(
          { length: 3 },
          () => html`
            <li class="flex items-center gap-2 text-onSurfaceVariant">
              <span class="w-1.5 h-1.5 bg-primary rounded-full"></span>
              <span>${randWord()}</span>
            </li>
          `
        )}
      </ul>
    </wc-accordion-item>

    <wc-accordion-item ?disabled="${true}">
      <div slot="header" class="flex items-center gap-3">
        <span
          class="icon-[carbon--calendar-heat-map] w-5 h-5 text-onSurfaceVariant"
        ></span>
        <span class="font-medium text-onSurfaceVariant">Advanced Settings</span>
      </div>
      <p class="text-onSurfaceVariant">${randParagraph()}</p>
    </wc-accordion-item>
  </wc-accordion>
`;

export const Default: Story = {
  name: "Default Flat",
  render: (args) => html`
    <div class="p-6 bg-background">
      <div
        class="mb-6 p-4 bg-surfaceContainerHigh border border-outlineVariant"
      >
        <h3 class="text-lg font-medium text-onSurface">Flat Accordion</h3>
        <p class="text-onSurfaceVariant text-sm">
          Clean, minimal design with left border accent
        </p>
      </div>
      ${renderAccordion(args)}
    </div>
  `,
  args: {
    multiple: false,
    variant: "default",
  },
};

export const MultipleOpen: Story = {
  name: "Multiple Open",
  render: (args) => html`
    <div class="p-6 bg-background">${renderAccordion(args)}</div>
  `,
  args: {
    multiple: true,
    variant: "default",
  },
};

export const Bordered: Story = {
  name: "Bordered Variant",
  render: (args) => html`
    <div class="p-6 bg-background">
      <div
        class="mb-6 p-4 bg-surfaceContainerHigh border border-outlineVariant"
      >
        <h3 class="text-lg font-medium text-onSurface">Bordered Accordion</h3>
        <p class="text-onSurfaceVariant text-sm">
          Full border container with individual item borders
        </p>
      </div>
      ${renderAccordion(args)}
    </div>
  `,
  args: {
    multiple: false,
    variant: "bordered",
  },
};

export const Separated: Story = {
  name: "Separated Variant",
  render: (args) => html`
    <div class="p-6 bg-background">
      <div
        class="mb-6 p-4 bg-surfaceContainerHigh border border-outlineVariant"
      >
        <h3 class="text-lg font-medium text-onSurface">Separated Accordion</h3>
        <p class="text-onSurfaceVariant text-sm">
          Individual cards with spacing between items
        </p>
      </div>
      ${renderAccordion(args)}
    </div>
  `,
  args: {
    multiple: true,
    variant: "separated",
  },
};

export const FAQExample: Story = {
  name: "FAQ Example",
  render: () => html`
    <div class="p-6 bg-background">
      <div class="mb-6 text-center">
        <h2 class="text-2xl font-bold text-onSurface mb-2">
          Frequently Asked Questions
        </h2>
        <p class="text-onSurfaceVariant">Common questions about our product</p>
      </div>

      <wc-accordion variant="bordered">
        ${[
          {
            question: "How do I get started?",
            answer: randParagraph(),
          },
          {
            question: "Is there a free trial available?",
            answer: randParagraph(),
          },
          {
            question: "What support options are available?",
            answer: randParagraph(),
          },
          {
            question: "Can I cancel my subscription anytime?",
            answer: randParagraph(),
          },
        ].map(
          (item, index) => html`
            <wc-accordion-item ?open="${index === 0}">
              <span slot="header" class="font-medium">${item.question}</span>
              <p class="text-onSurfaceVariant">${item.answer}</p>
            </wc-accordion-item>
          `
        )}
      </wc-accordion>
    </div>
  `,
};
