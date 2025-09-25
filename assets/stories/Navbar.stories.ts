import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit-html";
import { randMusicGenre, randUrl, randPhrase } from "@ngneat/falso";

const meta = {
  title: "Components/Navbar",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

const renderNavbar = () => html`
  <wc-navbar>
    <!-- Logo slot -->
    <wc-logo slot="logo" class="h-8 fill-primary"></wc-logo>

    <!-- Navigation slot -->
    <div slot="navigation">
      <nav class="hidden md:flex space-x-1">
        <a
          href="${randUrl()}"
          class="text-onSurface hover:text-primary transition-colors px-4 py-2 border-b-2 border-primary font-medium bg-primaryContainer"
        >
          ${randMusicGenre()}
        </a>
        ${Array.from(
          { length: 4 },
          () => html`
            <a
              href="${randUrl()}"
              class="text-onSurface hover:text-primary transition-colors px-4 py-2 border-b-2 border-transparent hover:border-primary"
            >
              ${randMusicGenre()}
            </a>
          `
        )}
      </nav>

      <wc-offcanvas class="md:hidden">
        <div class="mobile-navigation-content">
          <h2
            class="text-xl font-medium text-onSurface mb-4 border-b-2 border-outlineVariant pb-2"
          >
            Menu
          </h2>
          <nav class="flex flex-col gap-0">
            ${Array.from(
              { length: 6 },
              () => html`
                <a
                  href="${randUrl()}"
                  class="text-onSurface hover:text-primary transition-colors px-4 py-3 border-l-4 border-transparent hover:border-primary hover:bg-surfaceContainerLow"
                >
                  ${randMusicGenre()}
                </a>
              `
            )}
          </nav>
        </div>
      </wc-offcanvas>
    </div>

    <!-- Actions slot -->
    <div slot="actions" class="flex items-center space-x-1">
      <button
        class="hidden md:flex items-center space-x-2 px-4 py-2 bg-primary text-onPrimary border-2 border-primary transition-colors hover:bg-primaryContainer hover:text-onPrimaryContainer"
      >
        <span>${randMusicGenre()}</span>
      </button>
      <wc-theme-toggle></wc-theme-toggle>
      <button
        class="p-2 rounded-none hover:bg-surfaceContainerLow transition-colors"
        title="Search"
      >
        <span
          class="icon-[garden--search-stroke-16] w-5 h-5 text-onSurfaceVariant"
        ></span>
      </button>
    </div>
  </wc-navbar>
`;

const renderDemoContent = () => html`
  <div class="min-h-screen bg-background">
    <!-- Header section -->
    <div
      class="h-96 bg-surfaceContainerLow flex items-center justify-center border-b border-outlineVariant"
    >
      <div class="text-center">
        <h1 class="text-4xl font-bold text-onSurface mb-4">${randPhrase()}</h1>
        <p class="text-onSurfaceVariant">${randPhrase()}</p>
      </div>
    </div>

    <!-- Main content -->
    <div class="space-y-8 p-8">
      ${Array.from(
        { length: 10 },
        () => html`
          <div
            class="bg-surfaceContainerHighest p-6 border border-outlineVariant"
          >
            <h3 class="text-xl font-semibold text-onSurface mb-3">
              ${randPhrase()}
            </h3>
            <p class="text-onSurfaceVariant leading-relaxed">${randPhrase()}</p>
          </div>
        `
      )}
    </div>
  </div>
`;

export const Default: Story = {
  render: () => html` <div>${renderNavbar()} ${renderDemoContent()}</div> `,
};

export const Standalone: Story = {
  name: "Standalone Navbar",
  render: () => html` <div class="p-6 bg-background">${renderNavbar()}</div> `,
};

export const WithCustomContent: Story = {
  name: "With Custom Slots",
  render: () => html`
    <wc-navbar>
      <!-- Custom logo -->
      <div slot="logo" class="flex items-center space-x-2">
        <wc-logo class="h-8 fill-primary"></wc-logo>
        <span class="text-xl font-bold text-onSurface">MyApp</span>
      </div>

      <!-- Custom navigation -->
      <div slot="navigation" class="flex space-x-1">
        <a
          href="#"
          class="px-4 py-2 text-onSurface hover:text-primary border-b-2 border-primary"
          >Home</a
        >
        <a
          href="#"
          class="px-4 py-2 text-onSurface hover:text-primary border-b-2 border-transparent hover:border-primary"
          >About</a
        >
        <a
          href="#"
          class="px-4 py-2 text-onSurface hover:text-primary border-b-2 border-transparent hover:border-primary"
          >Contact</a
        >
      </div>

      <!-- Custom actions -->
      <div slot="actions" class="flex items-center space-x-2">
        <button class="p-2 hover:bg-surfaceContainerLow rounded">
          <span
            class="icon-[garden--bell-stroke-16] w-5 h-5 text-onSurfaceVariant"
          ></span>
        </button>
        <wc-theme-toggle></wc-theme-toggle>
        <button
          class="px-4 py-2 bg-secondary text-onSecondary hover:bg-secondaryContainer hover:text-onSecondaryContainer"
        >
          Sign In
        </button>
      </div>
    </wc-navbar>
  `,
};
