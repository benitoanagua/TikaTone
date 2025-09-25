import type { Meta, StoryObj } from "@storybook/web-components";
import { html, TemplateResult } from "lit-html";
import { randPhrase, randWord, randCatchPhrase } from "@ngneat/falso";
import type { StackProps, StackItem } from "../types/stack";

const meta = {
  title: "Components/Stack",
  component: "wc-stack",
  tags: ["autodocs"],
  argTypes: {
    maxVisible: {
      control: { type: "range", min: 1, max: 5, step: 1 },
      description: "Maximum number of items visible at once",
    },
  },
} satisfies Meta<StackProps>;

export default meta;
type Story = StoryObj<StackProps>;

/** Renderiza un Stack */
const renderStack = (
  args: StackProps,
  content: TemplateResult | TemplateResult[]
) => html`
  <wc-stack
    max-visible=${args.maxVisible ?? 3}
    direction=${args.direction ?? "vertical"}
    spacing=${args.spacing ?? "medium"}
    animation-duration=${args.animationDuration ?? 300}
    ?reverse-order=${args.reverseOrder ?? false}
    ?auto-height=${args.autoHeight ?? false}
    shadow=${args.shadow ?? "medium"}
    rounded=${args.rounded ?? "medium"}
  >
    ${content}
  </wc-stack>
`;

/** Renderiza un item genérico */
const renderStackItem = (
  label: string,
  index: number,
  total: number
): TemplateResult => html`
  <div data-caption="${label}">
    <div
      class="p-6 border-2 border-outlineVariant min-h-[200px] flex flex-col justify-between"
      style="background: linear-gradient(135deg, var(--color-surfaceContainerHigh), var(--color-surfaceContainer))"
    >
      <div>
        <h3 class="text-xl font-medium text-onSurface mb-3">
          ${randCatchPhrase()}
        </h3>
        <p class="text-onSurfaceVariant leading-relaxed">${randPhrase()}</p>
        <p class="text-onSurfaceVariant mt-3 text-sm">${randPhrase()}</p>
      </div>
      <div class="mt-4 pt-3 border-t border-outlineVariant">
        <span class="text-xs text-onSurfaceVariant"
          >Item ${index + 1} of ${total}</span
        >
      </div>
    </div>
  </div>
`;

/** Contenedor para demos */
const DemoContainer = (content: TemplateResult | TemplateResult[]) => html`
  <div class="p-8 bg-background min-h-screen">
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold text-onSurface mb-2">Stack Component</h2>
      <p class="text-onSurfaceVariant">Interactive 3D stack demo</p>
    </div>
    ${content}
  </div>
`;

export const Default: Story = {
  render: (args) =>
    DemoContainer(
      renderStack(
        args,
        Array.from({ length: 5 }, (_, i) =>
          renderStackItem(`Card ${i + 1}`, i, 5)
        )
      )
    ),
  args: { maxVisible: 3 },
};

export const DifferentMaxVisible: Story = {
  name: "Different Max Visible Items",
  render: () =>
    DemoContainer(html`
      ${[2, 3, 4, 5].map(
        (max) => html`
          <div class="mb-8">
            <h3 class="text-lg font-medium text-onSurface mb-3">
              Max Visible: ${max}
            </h3>
            ${renderStack(
              { maxVisible: max },
              Array.from({ length: 5 }, (_, i) =>
                renderStackItem(`Card ${i + 1}`, i, 5)
              )
            )}
          </div>
        `
      )}
    `),
};

export const MixedContent: Story = {
  name: "Mixed Content Types",
  render: (args) =>
    DemoContainer(html`
      ${renderStack(args, [
        html`<div data-caption="Basic Card">
          <div class="p-6 bg-surfaceContainer border-2 border-outlineVariant">
            <h3 class="text-lg font-medium text-onSurface mb-2">Simple Card</h3>
            <p class="text-onSurfaceVariant">
              This is a basic card with minimal content.
            </p>
          </div>
        </div>`,
        html`<div data-caption="Image Card">
          <div class="border-2 border-outlineVariant bg-surfaceContainer">
            <img
              src="https://picsum.photos/300/200?random=1"
              class="w-full h-32 object-cover"
            />
            <div class="p-4">
              <h3 class="text-lg font-medium text-onSurface mb-2">
                Card with Image
              </h3>
              <p class="text-onSurfaceVariant">
                This card includes a header image.
              </p>
            </div>
          </div>
        </div>`,
        html`<div data-caption="Action Card">
          <div class="p-6 bg-surfaceContainer border-2 border-outlineVariant">
            <h3 class="text-lg font-medium text-onSurface mb-2">
              Card with Actions
            </h3>
            <p class="text-onSurfaceVariant mb-4">
              This card includes interactive elements.
            </p>
            <div class="flex gap-2">
              <button class="px-3 py-1 bg-primary text-onPrimary text-sm">
                Action</button
              ><button
                class="px-3 py-1 bg-surfaceContainerHigh text-onSurface text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>`,
      ])}
    `),
  args: { maxVisible: 3 },
};

export const Playground: Story = {
  render: (args) =>
    DemoContainer(
      renderStack(
        args,
        Array.from({ length: 5 }, (_, i) =>
          renderStackItem(`Card ${i + 1}`, i, 5)
        )
      )
    ),
  args: { maxVisible: 3 },
  parameters: { controls: { expanded: true } },
};
