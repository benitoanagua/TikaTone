// assets/stories/Tabs.stories.ts
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit-html";
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
} satisfies Meta<TabsProps>;

export default meta;
type Story = StoryObj<TabsProps>;

const renderTabs = (args: TabsProps, tabs: unknown, panels: unknown) => html`
  <wc-tabs
    orientation=${args.orientation || "horizontal"}
    variant=${args.variant || "default"}
    active-tab=${(args.activeTab || 0).toString()}
    ?disabled=${args.disabled ?? false}
  >
    ${tabs} ${panels}
  </wc-tabs>
`;

const renderTab = (label: string, icon?: string, disabled?: boolean) => html`
  <wc-tab
    slot="tabs"
    label=${label}
    icon=${icon || ""}
    ?disabled=${disabled ?? false}
  ></wc-tab>
`;

const renderPanel = (content: unknown) => html`
  <wc-tab-panel slot="panels">${content}</wc-tab-panel>
`;

const renderBasicPanel = (label: string) => html`
  <div class="space-y-4">
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
  </div>
`;

export const Default: Story = {
  render: (args) => html`
    <div class="p-6 bg-background">
      ${renderTabs(
        args,
        ["Overview", "Features", "Documentation", "Support", "Settings"].map(
          (label, index) =>
            renderTab(
              label,
              index === 2
                ? "icon-[garden--book-stroke-16]"
                : index === 4
                  ? "icon-[garden--settings-stroke-16]"
                  : "",
              index === 4 && args.variant !== "underlined"
            )
        ),
        ["Overview", "Features", "Documentation", "Support", "Settings"].map(
          (label) => renderPanel(renderBasicPanel(label))
        )
      )}
    </div>
  `,
  args: {
    orientation: "horizontal",
    variant: "default",
    activeTab: 0,
    disabled: false,
  },
};

export const Vertical: Story = {
  render: (args) => html`
    <div class="p-6 bg-background">
      ${renderTabs(
        args,
        ["Overview", "Features", "Documentation", "Support"].map((label) =>
          renderTab(label)
        ),
        ["Overview", "Features", "Documentation", "Support"].map((label) =>
          renderPanel(renderBasicPanel(label))
        )
      )}
    </div>
  `,
  args: {
    orientation: "vertical",
    variant: "default",
    activeTab: 1,
    disabled: false,
  },
};

export const Pills: Story = {
  render: (args) => html`
    <div class="p-6 bg-background">
      ${renderTabs(
        args,
        ["Dashboard", "Analytics", "Messages", "Settings"].map((label) =>
          renderTab(label)
        ),
        ["Dashboard", "Analytics", "Messages", "Settings"].map((label) =>
          renderPanel(renderBasicPanel(label))
        )
      )}
    </div>
  `,
  args: {
    orientation: "horizontal",
    variant: "pills",
    activeTab: 0,
    disabled: false,
  },
};

export const VerticalPills: Story = {
  render: (args) => html`
    <div class="p-6 bg-background">
      ${renderTabs(
        args,
        ["Profile", "Security", "Notifications", "Billing"].map((label) =>
          renderTab(label)
        ),
        ["Profile", "Security", "Notifications", "Billing"].map((label) =>
          renderPanel(renderBasicPanel(label))
        )
      )}
    </div>
  `,
  args: {
    orientation: "vertical",
    variant: "pills",
    activeTab: 2,
    disabled: false,
  },
};

export const Underlined: Story = {
  render: (args) => html`
    <div class="p-6 bg-background">
      ${renderTabs(
        args,
        ["Home", "Products", "Services", "About", "Contact"].map((label) =>
          renderTab(label)
        ),
        ["Home", "Products", "Services", "About", "Contact"].map((label) =>
          renderPanel(renderBasicPanel(label))
        )
      )}
    </div>
  `,
  args: {
    orientation: "horizontal",
    variant: "underlined",
    activeTab: 1,
    disabled: false,
  },
};

export const DisabledState: Story = {
  render: (args) => html`
    <div class="p-6 bg-background">
      ${renderTabs(
        args,
        ["Overview", "Features", "Documentation"].map((label) =>
          renderTab(label)
        ),
        ["Overview", "Features", "Documentation"].map((label) =>
          renderPanel(renderBasicPanel(label))
        )
      )}
    </div>
  `,
  args: {
    orientation: "horizontal",
    variant: "default",
    activeTab: 0,
    disabled: true,
  },
};

export const WithIcons: Story = {
  render: () => html`
    <div class="p-6 bg-background">
      <wc-tabs orientation="horizontal" variant="pills">
        ${[
          { label: "Dashboard", icon: "icon-[garden--home-stroke-16]" },
          { label: "Analytics", icon: "icon-[garden--chart-bar-stroke-16]" },
          { label: "Messages", icon: "icon-[garden--mail-stroke-16]" },
          { label: "Settings", icon: "icon-[garden--settings-stroke-16]" },
        ].map((tabData) => renderTab(tabData.label, tabData.icon))}
        ${[
          { label: "Dashboard", icon: "icon-[garden--home-stroke-16]" },
          { label: "Analytics", icon: "icon-[garden--chart-bar-stroke-16]" },
          { label: "Messages", icon: "icon-[garden--mail-stroke-16]" },
          { label: "Settings", icon: "icon-[garden--settings-stroke-16]" },
        ].map(
          (tabData) => html`
            <wc-tab-panel slot="panels">
              <div class="p-6 space-y-4">
                <div class="flex items-center gap-3 mb-4">
                  <span class="${tabData.icon} w-8 h-8 text-primary"></span>
                  <h2 class="text-2xl font-medium text-onSurface">
                    ${tabData.label}
                  </h2>
                </div>
                <p class="text-onSurfaceVariant leading-relaxed">
                  ${randParagraph()}
                </p>
                <div
                  class="mt-6 p-4 bg-primaryContainer border-l-4 border-l-primary"
                >
                  <p class="text-onPrimaryContainer font-medium">
                    ${randPhrase()}
                  </p>
                </div>
              </div>
            </wc-tab-panel>
          `
        )}
      </wc-tabs>
    </div>
  `,
};

export const IconsOnly: Story = {
  render: () => html`
    <div class="p-6 bg-background">
      <wc-tabs orientation="horizontal" variant="pills">
        ${[
          { icon: "icon-[garden--home-stroke-16]", content: "Home" },
          { icon: "icon-[garden--user-stroke-16]", content: "Profile" },
          { icon: "icon-[garden--bell-stroke-16]", content: "Notifications" },
          { icon: "icon-[garden--settings-stroke-16]", content: "Settings" },
        ].map((data) => renderTab("", data.icon))}
        ${[
          { icon: "icon-[garden--home-stroke-16]", content: "Home" },
          { icon: "icon-[garden--user-stroke-16]", content: "Profile" },
          { icon: "icon-[garden--bell-stroke-16]", content: "Notifications" },
          { icon: "icon-[garden--settings-stroke-16]", content: "Settings" },
        ].map(
          (data) => html`
            <wc-tab-panel slot="panels">
              <div class="text-center p-8">
                <span
                  class="${data.icon} w-16 h-16 text-primary mx-auto mb-4 block"
                ></span>
                <h2 class="text-2xl font-medium text-onSurface mb-4">
                  ${data.content}
                </h2>
                <p class="text-onSurfaceVariant">${randParagraph()}</p>
              </div>
            </wc-tab-panel>
          `
        )}
      </wc-tabs>
    </div>
  `,
};

export const SimpleContent: Story = {
  render: () => html`
    <div class="p-6 bg-background">
      <wc-tabs>
        ${["Tab 1", "Tab 2", "Tab 3"].map((label) => renderTab(label))}
        ${["First", "Second", "Third"].map(
          (content) => html`
            <wc-tab-panel slot="panels">
              <div class="p-4">
                <h3 class="text-lg font-medium text-onSurface mb-3">
                  ${content} Panel
                </h3>
                <p class="text-onSurfaceVariant">${randPhrase()}</p>
              </div>
            </wc-tab-panel>
          `
        )}
      </wc-tabs>
    </div>
  `,
};

export const VariantComparison: Story = {
  render: () => html`
    <div class="p-6 bg-background space-y-8">
      <h2 class="text-2xl font-bold text-onSurface">Tab Variant Comparison</h2>

      ${["default", "pills", "underlined"].map(
        (variant) => html`
          <div>
            <h3 class="text-lg font-medium text-onSurface mb-3 capitalize">
              ${variant} Variant
            </h3>
            <wc-tabs variant=${variant} active-tab="0">
              ${["Overview", "Features", "Settings"].map((label) =>
                renderTab(label)
              )}
              ${["Overview", "Features", "Settings"].map((label) =>
                renderPanel(html`
                  <div class="p-4">
                    <h4 class="font-medium text-onSurface mb-2">
                      ${label} Content
                    </h4>
                    <p class="text-onSurfaceVariant">
                      This is the ${label.toLowerCase()} panel with ${variant}
                      styling.
                    </p>
                  </div>
                `)
              )}
            </wc-tabs>
          </div>
        `
      )}
    </div>
  `,
};

export const Playground: Story = {
  render: (args) => html`
    <div class="p-6 bg-background">
      ${renderTabs(
        args,
        ["Overview", "Features", "Documentation", "Support", "Settings"].map(
          (label, index) =>
            renderTab(
              label,
              index === 2
                ? "icon-[garden--book-stroke-16]"
                : index === 4
                  ? "icon-[garden--settings-stroke-16]"
                  : "",
              index === 4 && args.variant !== "underlined"
            )
        ),
        ["Overview", "Features", "Documentation", "Support", "Settings"].map(
          (label) => renderPanel(renderBasicPanel(label))
        )
      )}
    </div>
  `,
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
