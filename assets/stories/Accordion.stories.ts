import type { Meta, StoryObj } from "@storybook/html";
import { randPhrase, randParagraph, randWord } from "@ngneat/falso";

interface AccordionProps {
  multiple: boolean;
  variant: "default" | "bordered" | "separated";
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
  },
  render: (args: AccordionProps) => {
    const accordion = document.createElement("wc-accordion");

    // Set properties
    if (args.multiple) accordion.setAttribute("multiple", "");
    accordion.setAttribute("variant", args.variant);

    // Generate accordion items
    const faqData = [
      {
        title: "What is this component library?",
        subtitle: "Learn about the basics",
        content: `${randParagraph()} This library provides a comprehensive set of web components built with Lit and following flat design principles.`
      },
      {
        title: "How do I install and use it?",
        subtitle: "Installation guide",
        content: `${randParagraph()} You can install the library via npm and import the components you need. Each component is fully documented with examples.`
      },
      {
        title: "Is it compatible with my framework?",
        subtitle: "Framework compatibility",
        content: `${randParagraph()} These web components work with any framework or vanilla JavaScript. They're built on web standards and are framework-agnostic.`
      },
      {
        title: "Can I customize the styling?",
        subtitle: "Theming and customization",
        content: `${randParagraph()} The components use CSS custom properties for theming. You can easily customize colors, spacing, and other design tokens.`
      },
      {
        title: "What about accessibility?",
        subtitle: "Accessibility features",
        content: `${randParagraph()} All components follow WCAG guidelines and include proper ARIA attributes, keyboard navigation, and screen reader support.`
      }
    ];

    faqData.forEach((item, index) => {
      const accordionItem = document.createElement("wc-accordion-item");
      accordionItem.setAttribute("title", item.title);
      accordionItem.setAttribute("subtitle", item.subtitle);
      
      // Open first item by default
      if (index === 0) {
        accordionItem.setAttribute("open", "");
      }

      // Disable last item for demonstration
      if (index === faqData.length - 1) {
        accordionItem.setAttribute("disabled", "");
      }

      const content = document.createElement("div");
      content.className = "space-y-3";
      content.innerHTML = `
        <p class="text-onSurface leading-relaxed">${item.content}</p>
        <div class="mt-4 p-3 bg-surfaceContainerLow border-l-4 border-l-primary">
          <p class="text-sm text-onSurfaceVariant font-medium">${randPhrase()}</p>
        </div>
      `;

      accordionItem.appendChild(content);
      accordion.appendChild(accordionItem);
    });

    return accordion;
  },
} satisfies Meta<AccordionProps>;

export default meta;
type Story = StoryObj<AccordionProps>;

export const Default: Story = {
  args: {
    multiple: false,
    variant: "default",
  },
};

export const Multiple: Story = {
  args: {
    multiple: true,
    variant: "default",
  },
};

export const Bordered: Story = {
  args: {
    multiple: false,
    variant: "bordered",
  },
};

export const Separated: Story = {
  args: {
    multiple: true,
    variant: "separated",
  },
};

export const SimpleFAQ: Story = {
  render: () => {
    const accordion = document.createElement("wc-accordion");

    const faqItems = [
      {
        question: "How do I get started?",
        answer: "Getting started is easy! Simply install the package and import the components you need."
      },
      {
        question: "Is there documentation available?",
        answer: "Yes, comprehensive documentation is available with examples and API references."
      },
      {
        question: "Can I contribute to the project?",
        answer: "Absolutely! We welcome contributions. Check out our contribution guidelines on GitHub."
      }
    ];

    faqItems.forEach((item, index) => {
      const accordionItem = document.createElement("wc-accordion-item");
      accordionItem.setAttribute("title", item.question);

      const content = document.createElement("p");
      content.className = "text-onSurface";
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
    accordion.setAttribute("variant", "separated");
    accordion.setAttribute("multiple", "");

    const sections = [
      {
        title: "Features Overview",
        subtitle: