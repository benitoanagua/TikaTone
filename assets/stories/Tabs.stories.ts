import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit-html";
import { randSentence } from "@ngneat/falso";
import type { TabsProps } from "../types/tabs.js";

const meta = {
  title: "Components/Tabs",
  component: "wc-tabs",
  tags: ["autodocs"],
  argTypes: {
    activeTab: {
      control: { type: "range", min: 0, max: 3, step: 1 },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<TabsProps>;

export default meta;
type Story = StoryObj<TabsProps>;

const getActiveTab = (args: TabsProps) => args.activeTab ?? 0;

const renderTabs = (args: TabsProps) => {
  const activeTab = getActiveTab(args);

  return html`
    <wc-tabs active-tab="${activeTab}" ?disabled="${args.disabled ?? false}">
      <!-- Tabs con contenido flexible via slot -->
      <wc-tab slot="tabs" ?active="${activeTab === 0}">
        <span class="icon-[garden--home-stroke-16] w-5 h-5"></span>
        <span>Home</span>
      </wc-tab>

      <wc-tab slot="tabs" ?active="${activeTab === 1}">
        <span class="icon-[garden--adjust-stroke-16] w-5 h-5"></span>
        <span>Settings</span>
      </wc-tab>

      <wc-tab slot="tabs" ?active="${activeTab === 2}">
        <span class="icon-[garden--messenger-stroke-16] w-5 h-5"></span>
        <span>Help</span>
      </wc-tab>

      <wc-tab
        slot="tabs"
        ?active="${activeTab === 3}"
        ?disabled="${args.disabled ?? false}"
      >
        <span class="icon-[garden--user-circle-stroke-16] w-5 h-5"></span>
        <span>Profile</span>
      </wc-tab>

      <!-- Panels -->
      <wc-tab-panel slot="panels" ?active="${activeTab === 0}">
        <div class="p-6">
          <h3 class="text-lg font-medium">Home Panel</h3>
          <p>${randSentence()}</p>
        </div>
      </wc-tab-panel>

      <wc-tab-panel slot="panels" ?active="${activeTab === 1}">
        <div class="p-6">
          <h3 class="text-lg font-medium">Settings Panel</h3>
          <p>${randSentence()}</p>
        </div>
      </wc-tab-panel>

      <wc-tab-panel slot="panels" ?active="${activeTab === 2}">
        <div class="p-6">
          <h3 class="text-lg font-medium">Help Panel</h3>
          <p>${randSentence()}</p>
        </div>
      </wc-tab-panel>

      <wc-tab-panel slot="panels" ?active="${activeTab === 3}">
        <div class="p-6">
          <h3 class="text-lg font-medium">Profile Panel</h3>
          <p>${randSentence()}</p>
        </div>
      </wc-tab-panel>
    </wc-tabs>
  `;
};

export const Basic: Story = {
  render: (args) => html` <div class="p-6">${renderTabs(args)}</div> `,
  args: {
    activeTab: 0,
    disabled: false,
  },
};

export const TextOnly: Story = {
  render: () => html`
    <div class="p-6">
      <wc-tabs active-tab="1">
        <wc-tab slot="tabs" ?active="${false}">Overview</wc-tab>
        <wc-tab slot="tabs" ?active="${true}">Features</wc-tab>
        <wc-tab slot="tabs" ?active="${false}">Documentation</wc-tab>

        <wc-tab-panel slot="panels" ?active="${false}">
          <div class="p-6">
            <h3>Overview</h3>
            <p>${randSentence()}</p>
          </div>
        </wc-tab-panel>

        <wc-tab-panel slot="panels" ?active="${true}">
          <div class="p-6">
            <h3>Features</h3>
            <p>${randSentence()}</p>
          </div>
        </wc-tab-panel>

        <wc-tab-panel slot="panels" ?active="${false}">
          <div class="p-6">
            <h3>Documentation</h3>
            <p>${randSentence()}</p>
          </div>
        </wc-tab-panel>
      </wc-tabs>
    </div>
  `,
};

export const CustomContent: Story = {
  render: () => html`
    <div class="p-6">
      <wc-tabs active-tab="0">
        <wc-tab slot="tabs" ?active="${true}">
          <span
            class="icon-[garden--star-stroke-16] w-5 h-5 text-yellow-500"
          ></span>
          <span>Featured</span>
          <span class="ml-2 px-2 py-1 bg-primary text-onPrimary text-xs rounded"
            >New</span
          >
        </wc-tab>

        <wc-tab slot="tabs" ?active="${false}">
          <span class="icon-[garden--bar-chart-stroke-16] w-5 h-5"></span>
          <span>Analytics</span>
          <span class="ml-2 px-2 py-1 bg-error text-onError text-xs rounded"
            >3</span
          >
        </wc-tab>

        <wc-tab slot="tabs" ?active="${false}">
          <img
            src="https://i.pravatar.cc/300"
            class="w-6 h-6 rounded"
            alt="User"
          />
          <span>Account</span>
        </wc-tab>

        <wc-tab-panel slot="panels" ?active="${true}">
          <div class="p-6">
            <h3 class="text-lg font-medium">Featured Content</h3>
            <p>${randSentence()}</p>
          </div>
        </wc-tab-panel>

        <wc-tab-panel slot="panels" ?active="${false}">
          <div class="p-6">
            <h3 class="text-lg font-medium">Analytics</h3>
            <p>${randSentence()}</p>
          </div>
        </wc-tab-panel>

        <wc-tab-panel slot="panels" ?active="${false}">
          <div class="p-6">
            <h3 class="text-lg font-medium">Account Settings</h3>
            <p>${randSentence()}</p>
          </div>
        </wc-tab-panel>
      </wc-tabs>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <div class="p-6">
      <wc-tabs active-tab="0" disabled>
        <wc-tab slot="tabs" ?active="${true}">
          <span class="icon-[garden--home-stroke-16] w-5 h-5"></span>
          <span>Home</span>
        </wc-tab>

        <wc-tab slot="tabs" ?active="${false}">
          <span class="icon-[garden--cutlery-stroke-16] w-5 h-5"></span>
          <span>Settings</span>
        </wc-tab>

        <wc-tab-panel slot="panels" ?active="${true}">
          <div class="p-6">
            <h3 class="text-lg font-medium">Disabled Tabs</h3>
            <p>Tabs cannot be clicked when disabled.</p>
          </div>
        </wc-tab-panel>

        <wc-tab-panel slot="panels" ?active="${false}">
          <div class="p-6">
            <h3 class="text-lg font-medium">Settings</h3>
            <p>This panel is not active.</p>
          </div>
        </wc-tab-panel>
      </wc-tabs>
    </div>
  `,
};
