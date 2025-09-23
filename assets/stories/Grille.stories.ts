import type { Meta, StoryObj } from "@storybook/html";
import { randPhrase } from "@ngneat/falso";

interface GrilleProps {
  desktop: number;
  mobile: number;
  gap: string;
}

const meta = {
  title: "Components/Grille",
  component: "wc-grille",
  tags: ["autodocs"],
  argTypes: {
    desktop: {
      control: { type: "range", min: 1, max: 6, step: 1 },
    },
    mobile: {
      control: { type: "range", min: 1, max: 3, step: 1 },
    },
    gap: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
  },
  render: (args: GrilleProps) => {
    const grille = document.createElement("wc-grille");

    // Establecer atributos
    grille.setAttribute("desktop", args.desktop.toString());
    grille.setAttribute("mobile", args.mobile.toString());
    grille.setAttribute("gap", args.gap);

    // Crear elementos DENTRO del slot
    for (let i = 0; i < 7; i++) {
      const div = document.createElement("div");
      div.textContent = `${i + 1}. ${randPhrase()}`;
      div.style.padding = "12px";
      div.style.minHeight = "60px";
      grille.appendChild(div);
    }

    return grille;
  },
} satisfies Meta<GrilleProps>;

export default meta;
type Story = StoryObj<GrilleProps>;

export const Default: Story = {
  args: {
    desktop: 3,
    mobile: 2,
    gap: "medium",
  },
};
