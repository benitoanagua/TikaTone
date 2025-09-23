import type { Meta, StoryObj } from "@storybook/html";

interface LogoProps {
  className: string;
}

const meta = {
  title: "Components/Logo",
  component: "wc-logo",
  tags: ["autodocs"],
  decorators: [
    (story) => {
      const container = document.createElement("div");
      const storyResult = story();
      if (typeof storyResult === "string") {
        container.innerHTML = storyResult;
      } else {
        container.appendChild(storyResult);
      }

      return container;
    },
  ],
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
  render: (args: LogoProps) => {
    const logo = document.createElement("wc-logo");

    if (args.className) {
      logo.className = args.className;
    }

    return logo;
  },
} satisfies Meta<LogoProps>;

export default meta;
type Story = StoryObj<LogoProps>;

export const Default: Story = {
  args: {
    className: "",
  },
};

export const Small: Story = {
  args: {
    className: "h-4",
  },
};

export const Large: Story = {
  args: {
    className: "h-12",
  },
};

export const Colored: Story = {
  args: {
    className: "h-8 fill-red-500",
  },
};

export const OnDark: Story = {
  args: {
    className: "h-8 fill-white",
  },
  decorators: [
    (story) => {
      const container = document.createElement("div");

      const wrapper = document.createElement("div");
      wrapper.className = "bg-gray-900 p-4 rounded";

      const storyResult = story();
      if (typeof storyResult === "string") {
        wrapper.innerHTML = storyResult;
      } else {
        wrapper.appendChild(storyResult);
      }

      container.appendChild(wrapper);
      return container;
    },
  ],
};
