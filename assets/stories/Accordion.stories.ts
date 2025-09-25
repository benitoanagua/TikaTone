import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit-html";
import { randPhrase, randParagraph } from "@ngneat/falso";
import type { AccordionProps } from "../types/accordion.js";

interface AccordionStoryProps extends AccordionProps {
  itemsCount?: number;
}

const meta = {
  title: "Components/Accordion",
  component: "wc-accordion",
  tags: ["autodocs"],
  argTypes: {
    multiple: {
      control: { type: "boolean" },
      description: "Allow multiple items to be open simultaneously",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "bordered", "separated"],
      description: "Visual variant of the accordion",
    },
    itemsCount: {
      control: { type: "range", min: 1, max: 6, step: 1 },
      description: "Number of accordion items",
    },
  },
} satisfies Meta<AccordionStoryProps>;

export default meta;
type Story = StoryObj<AccordionStoryProps>;

const renderAccordion = (args: AccordionStoryProps, items: unknown) => html`
  <wc-accordion
    ?multiple=${args.multiple ?? false}
    variant=${args.variant || "default"}
  >
    ${items}
  </wc-accordion>
`;

const renderAccordionItem = (
  index: number,
  total: number,
  args: AccordionStoryProps
) => html`
  <wc-accordion-item
    title="Accordion Item ${index + 1}: ${randPhrase()}"
    subtitle="Additional information about item ${index + 1}"
    ?open=${index === 0}
    ?disabled=${index === total - 1 && total > 1}
  >
    <div class="space-y-3">
      <p class="text-onSurface leading-relaxed">${randParagraph()}</p>
      <div class="mt-4 p-3 bg-surfaceContainerLow border-l-4 border-l-primary">
        <p class="text-sm text-onSurfaceVariant font-medium">${randPhrase()}</p>
      </div>
      <p class="text-onSurfaceVariant text-sm">
        ${randParagraph().substring(0, 150)}
      </p>
    </div>
  </wc-accordion-item>
`;

export const Default: Story = {
  render: (args) => html`
    <div class="p-6 bg-background">
      ${renderAccordion(
        args,
        Array.from({ length: args.itemsCount || 3 }, (_, i) =>
          renderAccordionItem(i, args.itemsCount || 3, args)
        )
      )}
    </div>
  `,
  args: {
    multiple: false,
    variant: "default",
    itemsCount: 3,
  },
};

export const MultipleOpen: Story = {
  render: (args) => html`
    <div class="p-6 bg-background">
      ${renderAccordion(
        args,
        Array.from({ length: args.itemsCount || 4 }, (_, i) =>
          renderAccordionItem(i, args.itemsCount || 4, args)
        )
      )}
    </div>
  `,
  args: {
    multiple: true,
    variant: "default",
    itemsCount: 4,
  },
};

export const Bordered: Story = {
  render: (args) => html`
    <div class="p-6 bg-background">
      ${renderAccordion(
        args,
        Array.from({ length: args.itemsCount || 3 }, (_, i) =>
          renderAccordionItem(i, args.itemsCount || 3, args)
        )
      )}
    </div>
  `,
  args: {
    multiple: false,
    variant: "bordered",
    itemsCount: 3,
  },
};

export const Separated: Story = {
  render: (args) => html`
    <div class="p-6 bg-background">
      ${renderAccordion(
        args,
        Array.from({ length: args.itemsCount || 4 }, (_, i) =>
          renderAccordionItem(i, args.itemsCount || 4, args)
        )
      )}
    </div>
  `,
  args: {
    multiple: true,
    variant: "separated",
    itemsCount: 4,
  },
};

export const FAQExample: Story = {
  render: () => html`
    <div class="p-6 bg-background">
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-onSurface mb-2">
          Frequently Asked Questions
        </h2>
        <p class="text-onSurfaceVariant">
          Find answers to common questions about our product.
        </p>
      </div>

      <wc-accordion variant="separated">
        ${[
          {
            question: "How do I get started with this component library?",
            answer:
              "To get started, simply install the package via npm and import the components you need. Each component is fully documented with examples and usage guidelines.",
          },
          {
            question: "Is this library compatible with my framework?",
            answer:
              "Yes! These web components work with any framework or vanilla JavaScript. They're built on web standards and are completely framework-agnostic.",
          },
          {
            question: "Can I customize the styling and themes?",
            answer:
              "Absolutely. The components use CSS custom properties for theming. You can easily customize colors, spacing, and other design tokens to match your brand.",
          },
          {
            question: "What about accessibility?",
            answer:
              "All components follow WCAG guidelines and include proper ARIA attributes, keyboard navigation, and screen reader support out of the box.",
          },
        ].map(
          (item, index) => html`
            <wc-accordion-item title=${item.question} ?open=${index === 0}>
              <p class="text-onSurface leading-relaxed">${item.answer}</p>
            </wc-accordion-item>
          `
        )}
      </wc-accordion>
    </div>
  `,
};

export const WithRichContent: Story = {
  render: () => html`
    <div class="p-6 bg-background">
      <wc-accordion variant="bordered" multiple>
        ${[
          {
            title: "Features Overview",
            subtitle: "Discover what makes our components special",
            content: html`
              <div class="space-y-4">
                <p class="text-onSurface">
                  Our component library offers a comprehensive set of features
                  designed for modern web development.
                </p>
                <ul
                  class="list-disc list-inside space-y-2 text-onSurfaceVariant"
                >
                  <li>Flat design principles</li>
                  <li>Full accessibility support</li>
                  <li>Theme customization</li>
                  <li>Responsive design</li>
                  <li>TypeScript support</li>
                </ul>
              </div>
            `,
          },
          {
            title: "Installation Guide",
            subtitle: "Get up and running quickly",
            content: html`
              <div class="space-y-3">
                <p class="text-onSurface">
                  Installation is straightforward with npm or yarn:
                </p>
                <pre
                  class="bg-surfaceContainer p-3 text-sm text-onSurface font-mono overflow-x-auto"
                >
npm install @tikatone/components</pre
                >
                <p class="text-onSurfaceVariant text-sm">
                  Then import the components you need in your project.
                </p>
              </div>
            `,
          },
          {
            title: "Customization Options",
            subtitle: "Make it your own",
            content: html`
              <div class="space-y-3">
                <p class="text-onSurface">
                  Customize the components using CSS custom properties:
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div
                    class="p-3 bg-primaryContainer border-l-4 border-l-primary"
                  >
                    <p class="text-onPrimaryContainer font-medium">
                      Primary Colors
                    </p>
                  </div>
                  <div
                    class="p-3 bg-secondaryContainer border-l-4 border-l-secondary"
                  >
                    <p class="text-onSecondaryContainer font-medium">
                      Secondary Colors
                    </p>
                  </div>
                </div>
              </div>
            `,
          },
        ].map(
          (section, index) => html`
            <wc-accordion-item
              title=${section.title}
              subtitle=${section.subtitle}
            >
              ${section.content}
            </wc-accordion-item>
          `
        )}
      </wc-accordion>
    </div>
  `,
};

export const Playground: Story = {
  render: (args) => html`
    <div class="p-6 bg-background">
      ${renderAccordion(
        args,
        Array.from({ length: args.itemsCount || 3 }, (_, i) =>
          renderAccordionItem(i, args.itemsCount || 3, args)
        )
      )}
    </div>
  `,
  args: {
    multiple: false,
    variant: "default",
    itemsCount: 3,
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};
