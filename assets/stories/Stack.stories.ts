import type { Meta, StoryObj } from "@storybook/web-components";
import { html, TemplateResult } from "lit-html";
import { randPhrase, randCatchPhrase } from "@ngneat/falso";

const meta = {
  title: "Components/Stack",
  component: "wc-stack",
  tags: ["autodocs"],
  argTypes: {
    maxItems: {
      control: { type: "range", min: 1, max: 5, step: 1 },
      description: "Maximum number of items visible at once",
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

/** Renderiza un Stack */
const renderStack = (items: TemplateResult[]) => html`
  <wc-stack> ${items} </wc-stack>
`;

/** Renderiza un item del stack */
const renderStackItem = (
  title: string,
  content: string
): TemplateResult => html`
  <wc-stack-item title="${title}">
    <div class="p-6 min-h-[200px] flex flex-col justify-between">
      <div>
        <h3 class="text-xl font-medium text-onSurface mb-3">
          ${randCatchPhrase()}
        </h3>
        <p class="text-onSurfaceVariant leading-relaxed">${content}</p>
      </div>
      <div class="mt-4 pt-3 border-t border-outlineVariant">
        <span class="text-xs text-onSurfaceVariant">${title} Content</span>
      </div>
    </div>
  </wc-stack-item>
`;

/** Contenedor para demos */
const DemoContainer = (content: TemplateResult) => html`
  <div class="p-8 bg-background min-h-screen">
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold text-onSurface mb-2">3D Stack Component</h2>
      <p class="text-onSurfaceVariant">Vue-like 3D stacking effect</p>
    </div>
    ${content}
  </div>
`;

export const Default: Story = {
  render: () =>
    DemoContainer(html`
      ${renderStack([
        renderStackItem("Today", "Daily tasks and priorities for today."),
        renderStackItem("Week", "Weekly goals and upcoming deadlines."),
        renderStackItem("Month", "Monthly objectives and long-term planning."),
      ])}
    `),
};

export const CustomTitles: Story = {
  name: "With Custom Titles",
  render: () =>
    DemoContainer(html`
      ${renderStack([
        renderStackItem(
          "Project Brief",
          "Critical project information and requirements."
        ),
        renderStackItem(
          "Meeting Notes",
          "Notes from the last team meeting and action items."
        ),
        renderStackItem(
          "Design Mockups",
          "Latest design concepts and UI mockups."
        ),
      ])}
    `),
};

export const DifferentContent: Story = {
  name: "Different Content Heights",
  render: () =>
    DemoContainer(html`
      ${renderStack([
        html`<wc-stack-item title="Short">
          <div class="p-4">
            <h3 class="font-medium">Brief Content</h3>
            <p>Short description.</p>
          </div>
        </wc-stack-item>`,
        html`<wc-stack-item title="Medium">
          <div class="p-4">
            <h3 class="font-medium">Medium Content</h3>
            <p>${randPhrase()}</p>
            <p class="mt-2">Additional details here.</p>
          </div>
        </wc-stack-item>`,
        html`<wc-stack-item title="Long">
          <div class="p-4">
            <h3 class="font-medium">Detailed Content</h3>
            <p>${randPhrase()}</p>
            <p class="mt-2">${randPhrase()}</p>
            <p class="mt-2">More information and extended content.</p>
          </div>
        </wc-stack-item>`,
      ])}
    `),
};
