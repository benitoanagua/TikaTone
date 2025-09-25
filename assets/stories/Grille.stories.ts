import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit-html";
import { randPhrase } from "@ngneat/falso";
import type { GrilleProps } from "../types/grille";

const meta = {
  title: "Components/Grille",
  component: "wc-grille",
  tags: ["autodocs"],
  argTypes: {
    desktop: {
      control: { type: "range", min: 1, max: 6, step: 1 },
      description: "Number of columns on desktop",
    },
    mobile: {
      control: { type: "range", min: 1, max: 6, step: 1 },
      description: "Number of columns on mobile",
    },
    gap: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Gap between items",
    },
  },
} satisfies Meta<GrilleProps>;

export default meta;
type Story = StoryObj<GrilleProps>;

const renderGrille = (args: GrilleProps) => html`
  <wc-grille
    desktop=${args.desktop}
    mobile=${args.mobile}
    gap=${args.gap ?? "medium"}
  >
    ${Array.from(
      { length: 7 },
      (_, i) => html`
        <wc-grille-item>
          <div class="p-3 min-h-[60px] bg-surfaceVariant rounded-lg">
            ${i + 1}. ${randPhrase()}
          </div>
        </wc-grille-item>
      `
    )}
  </wc-grille>
`;

export const Default: Story = {
  render: (args) => renderGrille(args),
  args: { desktop: 3, mobile: 2, gap: "medium" },
};

export const Playground: Story = {
  render: (args) => renderGrille(args),
  args: { desktop: 3, mobile: 2, gap: "medium" },
  parameters: { controls: { expanded: true } },
};
