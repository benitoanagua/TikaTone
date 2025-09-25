import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import mainCSS from "../main.css?inline";

interface CarouselLayout {
  desktop: number;
  mobile: number;
  gap: number;
}

@customElement("wc-carousel")
export class WcCarousel extends LitElement {
  static styles = [unsafeCSS(mainCSS)];

  @property({ type: Object }) layout: CarouselLayout = {
    desktop: 3,
    mobile: 1,
    gap: 16,
  };

  @property({ type: Number }) interval = 5000;
  @property({ type: Boolean, attribute: "auto-play" }) autoPlay = true;
  @property({ type: Boolean, attribute: "show-arrows" }) showArrows = true;
  @property({ type: Boolean, attribute: "show-dots" }) showDots = true;

  @state() private currentIndex = 0;
  @state() private itemWidth = 0;
  @state() private isMobile = false;
  @state() private childCount = 0;
  @state() private maxIndex = 0;

  @query(".wc-carousel__container") private containerElement?: HTMLElement;
  @query("slot") private slotElement?: HTMLSlotElement;

  private autoPlayTimer?: number;
  private resizeObserver?: ResizeObserver;
  private mediaQuery?: MediaQueryList;
  private isScrolling = false;

  connectedCallback() {
    super.connectedCallback();
    this.setupMediaQuery();
    this.setupResizeObserver();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanupAutoPlay();
    this.cleanupResizeObserver();
    this.cleanupMediaQuery();
  }

  protected firstUpdated() {
    this.updateLayout();
    this.setupAutoPlay();
  }

  private setupMediaQuery() {
    this.mediaQuery = window.matchMedia("(max-width: 768px)");
    this.isMobile = this.mediaQuery.matches;
    this.mediaQuery.addEventListener("change", this.handleMediaChange);
  }

  private cleanupMediaQuery() {
    this.mediaQuery?.removeEventListener("change", this.handleMediaChange);
  }

  private handleMediaChange = (e: MediaQueryListEvent) => {
    this.isMobile = e.matches;
    this.updateLayout();
  };

  private setupResizeObserver() {
    this.resizeObserver = new ResizeObserver(() => {
      this.updateLayout();
    });

    if (this.containerElement) {
      this.resizeObserver.observe(this.containerElement);
    }
  }

  private cleanupResizeObserver() {
    this.resizeObserver?.disconnect();
  }

  private updateLayout() {
    if (!this.containerElement || !this.slotElement) return;

    const assignedElements = this.slotElement.assignedElements();
    this.childCount = assignedElements.length;

    if (this.childCount === 0) return;

    const containerWidth = this.containerElement.offsetWidth;
    const columns = this.isMobile ? this.layout.mobile : this.layout.desktop;
    const gaps = (columns - 1) * this.layout.gap;

    this.itemWidth = (containerWidth - gaps) / columns;
    this.maxIndex = Math.max(0, this.childCount - columns);

    // Update item widths
    assignedElements.forEach((element) => {
      if (element instanceof HTMLElement) {
        element.style.width = `${this.itemWidth}px`;
        element.style.flexShrink = "0";
      }
    });

    // Ensure current index is valid
    if (this.currentIndex > this.maxIndex) {
      this.currentIndex = this.maxIndex;
    }

    this.scrollToIndex(this.currentIndex, false);
  }

  private setupAutoPlay() {
    if (!this.autoPlay) return;

    this.cleanupAutoPlay();
    this.autoPlayTimer = window.setInterval(() => {
      if (!this.isScrolling) {
        this.goNext();
      }
    }, this.interval);
  }

  private cleanupAutoPlay() {
    if (this.autoPlayTimer) {
      window.clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = undefined;
    }
  }

  private scrollToIndex(index: number, smooth = true) {
    if (!this.containerElement) return;

    const scrollPosition = index * (this.itemWidth + this.layout.gap);
    this.containerElement.scrollTo({
      left: scrollPosition,
      behavior: smooth ? "smooth" : "instant",
    });
  }

  private goNext() {
    if (this.currentIndex < this.maxIndex) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Loop back to start
    }
    this.scrollToIndex(this.currentIndex);
  }

  private goPrev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.maxIndex; // Loop to end
    }
    this.scrollToIndex(this.currentIndex);
  }

  private goToIndex(index: number) {
    if (index >= 0 && index <= this.maxIndex) {
      this.currentIndex = index;
      this.scrollToIndex(this.currentIndex);
    }
  }

  private handleScroll = () => {
    this.isScrolling = true;
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = window.setTimeout(() => {
      this.isScrolling = false;
      this.syncCurrentIndex();
    }, 150);
  };

  private scrollTimeout?: number;

  private syncCurrentIndex() {
    if (!this.containerElement) return;

    const scrollLeft = this.containerElement.scrollLeft;
    const itemStep = this.itemWidth + this.layout.gap;
    const calculatedIndex = Math.round(scrollLeft / itemStep);

    this.currentIndex = Math.max(0, Math.min(calculatedIndex, this.maxIndex));
  }

  private renderArrows() {
    if (!this.showArrows) return html``;

    return html`
      <div class="wc-carousel__arrows">
        <button
          class="wc-carousel__arrow wc-carousel__arrow--prev"
          @click="${this.goPrev}"
          ?disabled="${this.currentIndex === 0 && !this.autoPlay}"
          aria-label="Previous slide"
        >
          <span class="icon-[garden--arrow-left-stroke-16] w-6 h-6"></span>
        </button>
        <button
          class="wc-carousel__arrow wc-carousel__arrow--next"
          @click="${this.goNext}"
          ?disabled="${this.currentIndex === this.maxIndex && !this.autoPlay}"
          aria-label="Next slide"
        >
          <span class="icon-[garden--arrow-right-stroke-16] w-6 h-6"></span>
        </button>
      </div>
    `;
  }

  private renderDots() {
    if (!this.showDots || this.maxIndex === 0) return html``;

    const dotCount = this.maxIndex + 1;
    const dots = Array.from({ length: dotCount }, (_, i) => i);

    return html`
      <div class="wc-carousel__dots">
        ${dots.map(
          (index) => html`
            <button
              class="wc-carousel__dot ${this.currentIndex === index
                ? "wc-carousel__dot--active"
                : ""}"
              @click="${() => this.goToIndex(index)}"
              aria-label="Go to slide ${index + 1}"
            ></button>
          `
        )}
      </div>
    `;
  }

  render() {
    return html`
      <div class="wc-carousel wc-carousel--flat">
        <div class="wc-carousel__navigation">
          ${this.renderArrows()} ${this.renderDots()}
        </div>

        <div
          class="wc-carousel__container"
          @scroll="${this.handleScroll}"
          @slotchange="${this.updateLayout}"
        >
          <slot></slot>
        </div>
      </div>
    `;
  }
}
