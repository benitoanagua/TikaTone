import type { Meta, StoryObj } from "@storybook/html";
import { randPhrase, randWord, randCatchPhrase } from "@ngneat/falso";

interface StackProps {
  maxItems: number;
}

const meta = {
  title: "Components/Stack",
  component: "wc-stack",
  tags: ["autodocs"],
  argTypes: {
    maxItems: {
      control: { type: "range", min: 1, max: 5, step: 1 },
      description: "Maximum number of items to display",
    },
  },
  decorators: [
    (story) => {
      const container = document.createElement("div");
      container.className = "p-8 bg-background min-h-screen";

      const header = document.createElement("div");
      header.className = "mb-8 text-center";
      header.innerHTML = `
        <h2 class="text-2xl font-bold text-onSurface mb-2">Stack Component - 3D Effect</h2>
        <p class="text-onSurfaceVariant">Click the buttons to bring items to the front</p>
      `;

      container.appendChild(header);

      const storyResult = story();
      if (typeof storyResult === "string") {
        container.innerHTML += storyResult;
      } else {
        container.appendChild(storyResult);
      }

      return container;
    },
  ],
  render: (args: StackProps) => {
    const stack = document.createElement("wc-stack");
    stack.setAttribute("max-items", args.maxItems.toString());

    // Crear items como hijos directos (similar a Offcanvas)
    for (let i = 0; i < 5; i++) {
      const itemDiv = document.createElement("div");
      itemDiv.setAttribute("data-caption", `Card ${i + 1}`);

      itemDiv.innerHTML = `
        <div class="p-6 border-2 border-outlineVariant min-h-[200px] flex flex-col justify-between" 
             style="background: linear-gradient(135deg, var(--color-surfaceContainerHigh), var(--color-surfaceContainer))">
          <div>
            <h3 class="text-xl font-medium text-onSurface mb-3">${randCatchPhrase()}</h3>
            <p class="text-onSurfaceVariant leading-relaxed">${randPhrase()}</p>
            <p class="text-onSurfaceVariant mt-3 text-sm">${randPhrase()}</p>
          </div>
          <div class="mt-4 pt-3 border-t border-outlineVariant">
            <span class="text-xs text-onSurfaceVariant">Item ${i + 1} of 5</span>
          </div>
        </div>
      `;

      stack.appendChild(itemDiv);
    }

    return stack;
  },
} satisfies Meta<StackProps>;

export default meta;
type Story = StoryObj<StackProps>;

export const Default: Story = {
  args: {
    maxItems: 5,
  },
};

export const WithStackItems: Story = {
  name: "Using StackItem Components",
  render: (args) => {
    const stack = document.createElement("wc-stack");
    stack.setAttribute("max-items", args.maxItems.toString());

    for (let i = 0; i < 4; i++) {
      const stackItem = document.createElement("wc-stack-item");
      stackItem.setAttribute("caption", `Stack Item ${i + 1}`);
      stackItem.setAttribute("order", i.toString());

      stackItem.innerHTML = `
        <div class="p-6 border-2 border-outlineVariant bg-surfaceContainer min-h-[180px]">
          <h3 class="text-lg font-medium text-onSurface mb-3">${randWord()}</h3>
          <p class="text-onSurfaceVariant">${randPhrase()}</p>
          <p class="text-onSurfaceVariant mt-2">${randPhrase()}</p>
        </div>
      `;

      stack.appendChild(stackItem);
    }

    return stack;
  },
  args: {
    maxItems: 4,
  },
};
