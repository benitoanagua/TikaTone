import type { Meta, StoryObj } from "@storybook/html";
import { randPhrase, randParagraph, randWord } from "@ngneat/falso";
import type { TabsProps } from "../types/tabs.js";

const meta = {
  title: "Components/Tabs",
  component: "wc-tabs",
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
      description: "Tab orientation",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "pills", "underlined"],
      description: "Visual variant",
    },
    activeTab: {
      control: { type: "range", min: 0, max: 4, step: 1 },
      description: "Initially active tab index",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable entire tabs component",
    },
  },
  render: (args: TabsProps) => {
    const tabs = document.createElement("wc-tabs");

    // Set properties
    tabs.setAttribute("orientation", args.orientation || "horizontal");
    tabs.setAttribute("variant", args.variant || "default");
    tabs.setAttribute("active-tab", (args.activeTab || 0).toString());
    if (args.disabled) tabs.setAttribute("disabled", "");

    // Create tabs
    const tabLabels = [
      "Overview",
      "Features",
      "Documentation",
      "Support",
      "Settings",
    ];

    tabLabels.forEach((label, index) => {
      const tab = document.createElement("wc-tab");
      tab.slot = "tabs";
      tab.setAttribute("label", label);

      // Add some variation
      if (index === 2) {
        tab.setAttribute("icon", "icon-[garden--book-stroke-16]");
      } else if (index === 4) {
        tab.setAttribute("icon", "icon-[garden--settings-stroke-16]");
        if (args.variant !== "underlined") {
          tab.setAttribute("disabled", "");
        }
      }

      tabs.appendChild(tab);
    });

    // Create panels
    tabLabels.forEach((label, index) => {
      const panel = document.createElement("wc-tab-panel");
      panel.slot = "panels";

      const content = document.createElement("div");
      content.className = "space-y-4";

      content.innerHTML = `
        <h3 class="text-xl font-medium text-onSurface">${label} Content</h3>
        <p class="text-onSurfaceVariant">${randParagraph()}</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div class="p-4 bg-surfaceContainerLow border border-outlineVariant">
            <h4 class="font-medium text-onSurface mb-2">${randWord()}</h4>
            <p class="text-sm text-onSurfaceVariant">${randPhrase()}</p>
          </div>
          <div class="p-4 bg-surfaceContainerLow border border-outlineVariant">
            <h4 class="font-medium text-onSurface mb-2">${randWord()}</h4>
            <p class="text-sm text-onSurfaceVariant">${randPhrase()}</p>
          </div>
        </div>
      `;

      panel.appendChild(content);
      tabs.appendChild(panel);
    });

    return tabs;
  },
} satisfies Meta<TabsProps>;

export default meta;
type Story = StoryObj<TabsProps>;

export const Default: Story = {
  args: {
    orientation: "horizontal",
    variant: "default",
    activeTab: 0,
    disabled: false,
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    variant: "default",
    activeTab: 1,
    disabled: false,
  },
};

export const Pills: Story = {
  args: {
    orientation: "horizontal",
    variant: "pills",
    activeTab: 0,
    disabled: false,
  },
};

export const VerticalPills: Story = {
  args: {
    orientation: "vertical",
    variant: "pills",
    activeTab: 2,
    disabled: false,
  },
};

export const Underlined: Story = {
  args: {
    orientation: "horizontal",
    variant: "underlined",
    activeTab: 1,
    disabled: false,
  },
};

export const DisabledState: Story = {
  args: {
    orientation: "horizontal",
    variant: "default",
    activeTab: 0,
    disabled: true,
  },
};

export const WithIcons: Story = {
  render: () => {
    const tabs = document.createElement("wc-tabs");
    tabs.setAttribute("orientation", "horizontal");
    tabs.setAttribute("variant", "pills");

    // Tabs with icons
    const tabsData = [
      { label: "Dashboard", icon: "icon-[garden--home-stroke-16]" },
      { label: "Analytics", icon: "icon-[garden--chart-bar-stroke-16]" },
      { label: "Messages", icon: "icon-[garden--mail-stroke-16]" },
      { label: "Settings", icon: "icon-[garden--settings-stroke-16]" },
    ];

    tabsData.forEach((tabData, index) => {
      const tab = document.createElement("wc-tab");
      tab.slot = "tabs";
      tab.setAttribute("label", tabData.label);
      tab.setAttribute("icon", tabData.icon);
      tabs.appendChild(tab);
    });

    // Panels
    tabsData.forEach((tabData, index) => {
      const panel = document.createElement("wc-tab-panel");
      panel.slot = "panels";

      panel.innerHTML = `
        <div class="p-6 space-y-4">
          <div class="flex items-center gap-3 mb-4">
            <span class="${tabData.icon} w-8 h-8 text-primary"></span>
            <h2 class="text-2xl font-medium text-onSurface">${tabData.label}</h2>
          </div>
          <p class="text-onSurfaceVariant leading-relaxed">${randParagraph()}</p>
          <div class="mt-6 p-4 bg-primaryContainer border-l-4 border-l-primary">
            <p class="text-onPrimaryContainer font-medium">${randPhrase()}</p>
          </div>
        </div>
      `;

      tabs.appendChild(panel);
    });

    return tabs;
  },
};

export const IconsOnly: Story = {
  render: () => {
    const tabs = document.createElement("wc-tabs");
    tabs.setAttribute("orientation", "horizontal");
    tabs.setAttribute("variant", "pills");

    const iconsData = [
      { icon: "icon-[garden--home-stroke-16]", content: "Home" },
      { icon: "icon-[garden--user-stroke-16]", content: "Profile" },
      { icon: "icon-[garden--bell-stroke-16]", content: "Notifications" },
      { icon: "icon-[garden--settings-stroke-16]", content: "Settings" },
    ];

    iconsData.forEach((data, index) => {
      const tab = document.createElement("wc-tab");
      tab.slot = "tabs";
      tab.setAttribute("icon", data.icon);
      // Empty label for icon-only tabs
      tab.setAttribute("label", "");
      tabs.appendChild(tab);
    });

    iconsData.forEach((data, index) => {
      const panel = document.createElement("wc-tab-panel");
      panel.slot = "panels";

      panel.innerHTML = `
        <div class="text-center p-8">
          <span class="${data.icon} w-16 h-16 text-primary mx-auto mb-4 block"></span>
          <h2 class="text-2xl font-medium text-onSurface mb-4">${data.content}</h2>
          <p class="text-onSurfaceVariant">${randParagraph()}</p>
        </div>
      `;

      tabs.appendChild(panel);
    });

    return tabs;
  },
};

export const SimpleContent: Story = {
  render: () => {
    const tabs = document.createElement("wc-tabs");

    ["Tab 1", "Tab 2", "Tab 3"].forEach((label, index) => {
      const tab = document.createElement("wc-tab");
      tab.slot = "tabs";
      tab.setAttribute("label", label);
      tabs.appendChild(tab);
    });

    ["First", "Second", "Third"].forEach((content, index) => {
      const panel = document.createElement("wc-tab-panel");
      panel.slot = "panels";

      panel.innerHTML = `
        <div class="p-4">
          <h3 class="text-lg font-medium text-onSurface mb-3">${content} Panel</h3>
          <p class="text-onSurfaceVariant">${randPhrase()}</p>
        </div>
      `;

      tabs.appendChild(panel);
    });

    return tabs;
  },
};

export const Playground: Story = {
  args: {
    orientation: "horizontal",
    variant: "default",
    activeTab: 0,
    disabled: false,
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};
