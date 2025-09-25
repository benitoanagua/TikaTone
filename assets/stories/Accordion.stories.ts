import type { Meta, StoryObj } from "@storybook/html";
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
  render: (args: AccordionStoryProps) => {
    const accordion = document.createElement("wc-accordion");

    // Set properties
    if (args.multiple) accordion.setAttribute("multiple", "");
    accordion.setAttribute("variant", args.variant || "default");

    // Generate accordion items
    const itemCount = args.itemsCount || 3;

    for (let i = 0; i < itemCount; i++) {
      const accordionItem = document.createElement("wc-accordion-item");
      accordionItem.setAttribute(
        "title",
        `Accordion Item ${i + 1}: ${randPhrase()}`
      );
      accordionItem.setAttribute(
        "subtitle",
        `Additional information about item ${i + 1}`
      );

      // Open first item by default
      if (i === 0) {
        accordionItem.setAttribute("open", "");
      }

      // Disable last item for demonstration if there are multiple items
      if (i === itemCount - 1 && itemCount > 1) {
        accordionItem.setAttribute("disabled", "");
      }

      const content = document.createElement("div");
      content.className = "space-y-3";
      content.innerHTML = `
        <p class="text-onSurface leading-relaxed">${randParagraph()}</p>
        <div class="mt-4 p-3 bg-surfaceContainerLow border-l-4 border-l-primary">
          <p class="text-sm text-onSurfaceVariant font-medium">${randPhrase()}</p>
        </div>
        <p class="text-onSurfaceVariant text-sm">${randParagraph().substring(0, 150)}</p>
      `;

      accordionItem.appendChild(content);
      accordion.appendChild(accordionItem);
    }

    return accordion;
  },
} satisfies Meta<AccordionStoryProps>;

export default meta;
type Story = StoryObj<AccordionStoryProps>;

export const Default: Story = {
  args: {
    multiple: false,
    variant: "default",
    itemsCount: 3,
  },
};

export const MultipleOpen: Story = {
  args: {
    multiple: true,
    variant: "default",
    itemsCount: 4,
  },
};

export const Bordered: Story = {
  args: {
    multiple: false,
    variant: "bordered",
    itemsCount: 3,
  },
};

export const Separated: Story = {
  args: {
    multiple: true,
    variant: "separated",
    itemsCount: 4,
  },
};

export const FAQExample: Story = {
  render: () => {
    const accordion = document.createElement("wc-accordion");
    accordion.setAttribute("variant", "separated");

    const faqItems = [
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
    ];

    faqItems.forEach((item, index) => {
      const accordionItem = document.createElement("wc-accordion-item");
      accordionItem.setAttribute("title", item.question);

      if (index === 0) {
        accordionItem.setAttribute("open", "");
      }

      const content = document.createElement("p");
      content.className = "text-onSurface leading-relaxed";
      content.textContent = item.answer;

      accordionItem.appendChild(content);
      accordion.appendChild(accordionItem);
    });

    return accordion;
  },
};

export const WithRichContent: Story = {
  render: () => {
    const accordion = document.createElement("wc-accordion");
    accordion.setAttribute("variant", "bordered");
    accordion.setAttribute("multiple", "");

    const sections = [
      {
        title: "Features Overview",
        subtitle: "Discover what makes our components special",
        content: `
          <div class="space-y-4">
            <p class="text-onSurface">Our component library offers a comprehensive set of features designed for modern web development.</p>
            <ul class="list-disc list-inside space-y-2 text-onSurfaceVariant">
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
        content: `
          <div class="space-y-3">
            <p class="text-onSurface">Installation is straightforward with npm or yarn:</p>
            <pre class="bg-surfaceContainer p-3 text-sm text-onSurface font-mono overflow-x-auto">npm install @tikatone/components</pre>
            <p class="text-onSurfaceVariant text-sm">Then import the components you need in your project.</p>
          </div>
        `,
      },
      {
        title: "Customization Options",
        subtitle: "Make it your own",
        content: `
          <div class="space-y-3">
            <p class="text-onSurface">Customize the components using CSS custom properties:</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div class="p-3 bg-primaryContainer border-l-4 border-l-primary">
                <p class="text-onPrimaryContainer font-medium">Primary Colors</p>
              </div>
              <div class="p-3 bg-secondaryContainer border-l-4 border-l-secondary">
                <p class="text-onSecondaryContainer font-medium">Secondary Colors</p>
              </div>
            </div>
          </div>
        `,
      },
    ];

    sections.forEach((section, index) => {
      const accordionItem = document.createElement("wc-accordion-item");
      accordionItem.setAttribute("title", section.title);
      accordionItem.setAttribute("subtitle", section.subtitle);

      const content = document.createElement("div");
      content.innerHTML = section.content;

      accordionItem.appendChild(content);
      accordion.appendChild(accordionItem);
    });

    return accordion;
  },
};

export const Playground: Story = {
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
