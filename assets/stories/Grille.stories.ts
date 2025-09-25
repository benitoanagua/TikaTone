import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit-html";
import { randPhrase } from "@ngneat/falso";
import type { GrilleProps, Desktop, Mobile } from "../types/grille";

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
        <div class="p-3 min-h-[60px] bg-surfaceVariant rounded-lg">
          ${i + 1}. ${randPhrase()}
        </div>
      `
    )}
  </wc-grille>
`;

export const Default: Story = {
  render: (args) => renderGrille(args),
  args: { desktop: 3, mobile: 2, gap: "medium" },
};

export const Dense: Story = {
  name: "Dense Grid (small gap)",
  render: (args) => renderGrille(args),
  args: { desktop: 4, mobile: 2, gap: "small" },
};

export const Spacious: Story = {
  name: "Spacious Grid (large gap)",
  render: (args) => renderGrille(args),
  args: { desktop: 2, mobile: 1, gap: "large" },
};

export const MobileComparison: Story = {
  name: "Mobile vs Desktop",
  render: () => {
    const desktopValues: Desktop[] = [1, 2, 3, 4, 5, 6];
    const mobileValues: Mobile[] = [1, 2, 3, 4, 5, 6];

    return html`
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        ${desktopValues.map((dsk) =>
          mobileValues
            .filter((mbl) => mbl <= dsk)
            .map(
              (mbl) => html`
                <div>
                  <h4>Desktop: ${dsk}, Mobile: ${mbl}</h4>
                  ${renderGrille({ desktop: dsk, mobile: mbl, gap: "medium" })}
                </div>
              `
            )
        )}
      </div>
    `;
  },
};

export const Playground: Story = {
  render: (args) => renderGrille(args),
  args: { desktop: 3, mobile: 2, gap: "medium" },
  parameters: { controls: { expanded: true } },
};
