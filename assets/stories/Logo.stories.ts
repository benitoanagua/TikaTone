import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit-html";

interface LogoProps {
  className: string;
}

const meta = {
  title: "Components/Logo",
  component: "wc-logo",
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: { type: "text" },
      description: "Tailwind CSS classes to apply to the logo",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "h-8 fill-primary" },
      },
    },
  },
} satisfies Meta<LogoProps>;

export default meta;
type Story = StoryObj<LogoProps>;

const renderLogo = (args: LogoProps) => html`
  <wc-logo class=${args.className || ""}></wc-logo>
`;

export const Default: Story = {
  render: (args) => renderLogo(args),
  args: {
    className: "",
  },
};

export const Small: Story = {
  render: (args) => renderLogo(args),
  args: {
    className: "h-4",
  },
};

export const Large: Story = {
  render: (args) => renderLogo(args),
  args: {
    className: "h-12",
  },
};

export const Colored: Story = {
  render: (args) => renderLogo(args),
  args: {
    className: "h-8 fill-red-500",
  },
};

export const OnDark: Story = {
  name: "On Dark Background",
  render: (args) => html`
    <div class="bg-gray-900 p-4 rounded">${renderLogo(args)}</div>
  `,
  args: {
    className: "h-8 fill-white",
  },
};
