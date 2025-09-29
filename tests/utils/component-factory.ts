import { mockData } from "./mock-data";

// Definir interfaces para las opciones
interface CardOptions {
  url?: string;
  heading?: number;
  media_align?: string;
  aspect_ratio?: string;
  auto_layout?: boolean;
}

interface CarouselOptions {
  desktop?: number;
  mobile?: number;
  items?: Array<{ title: string; content: string }>;
  [key: string]: any;
}

interface AccordionOptions {
  items?: Array<{ header: string; content: string }>;
  variant?: string;
  multiple?: boolean;
}

interface TabsOptions {
  items?: Array<{ label: string; content: string }>;
  activeTab?: number;
}

interface GrilleOptions {
  items?: Array<{ title: string; content: string }>;
  desktop?: number;
  mobile?: number;
  gap?: string;
}

interface SlideshowOptions {
  items?: number;
  showNav?: boolean;
  showIndicators?: boolean;
  autoPlay?: boolean;
}

interface StackOptions {
  items?: number;
  maxItems?: number;
}

export class ComponentFactory {
  static createCard(overrides: CardOptions = {}) {
    const data = { ...mockData.card, ...overrides };
    return `
      <wc-card 
        title="${data.title}"
        url="${data.url || "https://example.com"}"
        excerpt="${data.excerpt}"
        feature-image="${data.feature_image}"
        author-name="${data.author_name}"
        author-url="${data.author_url}"
        author-profile-image="${data.author_profile_image}"
        published-at="${data.published_at}"
        reading-time="${data.reading_time}"
        tag-name="${data.tag_name}"
        tag-url="${data.tag_url}"
        ${data.heading ? `heading="${data.heading}"` : ""}
        ${data.media_align ? `media-align="${data.media_align}"` : ""}
        ${data.aspect_ratio ? `aspect-ratio="${data.aspect_ratio}"` : ""}
        ${data.auto_layout ? 'auto-layout="true"' : ""}
      ></wc-card>
    `;
  }

  static createCarousel(options: CarouselOptions = {}) {
    const {
      desktop = 3,
      mobile = 1,
      items = mockData.carousel.items,
      ...props
    } = options;

    const itemsHtml = items
      .map(
        (item: { title: string; content: string }) => `
      <wc-carousel-item>
        <div class="p-4 bg-surface border border-outline min-h-[200px] flex items-center justify-center">
          <div class="text-center">
            <h3 class="text-lg font-medium mb-2">${item.title}</h3>
            <p class="text-onSurfaceVariant">${item.content}</p>
          </div>
        </div>
      </wc-carousel-item>
    `
      )
      .join("");

    const propsStr = Object.entries(props)
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ");

    return `
      <wc-carousel desktop="${desktop}" mobile="${mobile}" ${propsStr}>
        ${itemsHtml}
      </wc-carousel>
    `;
  }

  static createAccordion(options: AccordionOptions = {}) {
    const {
      items = mockData.accordion.items,
      variant = "default",
      multiple = false,
    } = options;

    const itemsHtml = items
      .map(
        (item: { header: string; content: string }, index: number) => `
      <wc-accordion-item ${index === 0 ? 'open="true"' : ""}>
        <span slot="header">${item.header}</span>
        <p>${item.content}</p>
      </wc-accordion-item>
    `
      )
      .join("");

    return `
      <wc-accordion variant="${variant}" ${multiple ? 'multiple="true"' : ""}>
        ${itemsHtml}
      </wc-accordion>
    `;
  }

  static createTabs(options: TabsOptions = {}) {
    const { items = mockData.tabs.items, activeTab = 0 } = options;

    const tabsHtml = items
      .map(
        (item: { label: string; content: string }) => `
      <wc-tab slot="tabs">${item.label}</wc-tab>
    `
      )
      .join("");

    const panelsHtml = items
      .map(
        (item: { label: string; content: string }) => `
      <wc-tab-panel slot="panels">
        <div class="p-4">
          <h3 class="text-lg font-medium mb-2">${item.label} Content</h3>
          <p>${item.content}</p>
        </div>
      </wc-tab-panel>
    `
      )
      .join("");

    return `
      <wc-tabs active-tab="${activeTab}">
        ${tabsHtml}
        ${panelsHtml}
      </wc-tabs>
    `;
  }

  static createGrille(options: GrilleOptions = {}) {
    const {
      items = mockData.grille.items,
      desktop = 3,
      mobile = 2,
      gap = "medium",
    } = options;

    const itemsHtml = items
      .map(
        (item: { title: string; content: string }) => `
      <wc-grille-item>
        <div class="p-4 bg-surface border border-outline min-h-[120px] flex items-center justify-center">
          <div class="text-center">
            <h4 class="font-medium mb-2">${item.title}</h4>
            <p class="text-sm text-onSurfaceVariant">${item.content}</p>
          </div>
        </div>
      </wc-grille-item>
    `
      )
      .join("");

    return `
      <wc-grille desktop="${desktop}" mobile="${mobile}" gap="${gap}">
        ${itemsHtml}
      </wc-grille>
    `;
  }

  static createSlideshow(options: SlideshowOptions = {}) {
    const {
      items = 3,
      showNav = true,
      showIndicators = true,
      autoPlay = false,
    } = options;

    const slidesHtml = Array.from(
      { length: items },
      (_, i: number) => `
      <wc-slideshow-item>
        <div class="w-full h-64 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <div class="text-center text-white">
            <h2 class="text-3xl font-bold mb-2">Slide ${i + 1}</h2>
            <p class="text-lg opacity-90">Content for slide ${i + 1}</p>
          </div>
        </div>
      </wc-slideshow-item>
    `
    ).join("");

    return `
      <wc-slideshow 
        ${showNav ? 'show-nav="true"' : ""}
        ${showIndicators ? 'show-indicators="true"' : ""}
        ${autoPlay ? 'auto-play="true"' : 'auto-play="false"'}
        interval="2000"
      >
        ${slidesHtml}
      </wc-slideshow>
    `;
  }

  static createStack(options: StackOptions = {}) {
    const { items = 3, maxItems = 3 } = options;

    const stackItemsHtml = Array.from(
      { length: items },
      (_, i: number) => `
      <wc-stack-item title="Layer ${i + 1}">
        <div class="p-6 min-h-[200px]">
          <h3 class="text-lg font-medium mb-3">Stack Layer ${i + 1}</h3>
          <p class="text-onSurfaceVariant">
            This is content for stack layer ${i + 1}. Each layer can contain different content
            and will be stacked with a 3D effect.
          </p>
        </div>
      </wc-stack-item>
    `
    ).join("");

    return `
      <wc-stack max-items="${maxItems}">
        ${stackItemsHtml}
      </wc-stack>
    `;
  }
}
