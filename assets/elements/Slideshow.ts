import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import mainCSS from "../main.css?inline";

@customElement("wc-slideshow")
export class WcSlideshow extends LitElement {
  static styles = [unsafeCSS(mainCSS)];

  @property({ type: Boolean, attribute: "show-nav" }) showNav = true;
  @property({ type: Boolean }) modal = false;
  @property({ type: Number }) interval = 5000;
  @property({ type: Boolean, attribute: "auto-play" }) autoPlay = true;
  @property({ type: Boolean, attribute: "show-indicators" }) showIndicators =
    true;

  @state() private currentIndex = 0;
  @state() private childCount = 0;
  @state() private itemWidth = 0;
  @state() private canGoLeft = false;
  @state() private canGoRight = true;

  @query(".wc-slideshow__container") private containerElement?: HTMLElement;
  @query("slot") private slotElement?: HTMLSlotElement;

  private autoPlayTimer?: number;
  private resizeObserver?: ResizeObserver;
  private isScrolling = false;
  private scrollTimeout?: number;
  private forward = true;

  connectedCallback() {
    super.connectedCallback();
    this.setupResizeObserver();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanupAutoPlay();
    this.cleanupResizeObserver();
  }

  protected firstUpdated() {
    this.updateLayout();
    this.setupAutoPlay();
  }

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

    this.itemWidth = this.containerElement.offsetWidth;

    // Update item widths to fill container
    assignedElements.forEach((element) => {
      if (element instanceof HTMLElement) {
        element.style.width = `${this.itemWidth}px`;
        element.style.flexShrink = "0";
      }
    });

    // Update navigation state
    this.updateNavigationState();
    this.scrollToIndex(this.currentIndex, false);
  }

  private updateNavigationState() {
    this.canGoLeft = this.currentIndex > 0;
    this.canGoRight = this.currentIndex < this.childCount - 1;
  }

  private setupAutoPlay() {
    if (!this.autoPlay || this.childCount <= 1) return;

    this.cleanupAutoPlay();
    this.autoPlayTimer = window.setInterval(() => {
      if (!this.isScrolling) {
        if (!this.canGoRight) {
          this.forward = false;
        }
        if (!this.canGoLeft) {
          this.forward = true;
        }

        if (this.forward) {
          this.goNext();
        } else {
          this.goPrev();
        }
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

    const scrollPosition = index * this.itemWidth;
    this.containerElement.scrollTo({
      left: scrollPosition,
      behavior: smooth ? "smooth" : "instant",
    });
  }

  private goNext() {
    if (this.canGoRight) {
      this.currentIndex++;
      this.updateNavigationState();
      this.scrollToIndex(this.currentIndex);
    }
  }

  private goPrev() {
    if (this.canGoLeft) {
      this.currentIndex--;
      this.updateNavigationState();
      this.scrollToIndex(this.currentIndex);
    }
  }

  private goToIndex(index: number) {
    if (index >= 0 && index < this.childCount) {
      this.currentIndex = index;
      this.updateNavigationState();
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

  private syncCurrentIndex() {
    if (!this.containerElement) return;

    const scrollLeft = this.containerElement.scrollLeft;
    const calculatedIndex = Math.round(scrollLeft / this.itemWidth);

    if (calculatedIndex !== this.currentIndex) {
      this.currentIndex = Math.max(
        0,
        Math.min(calculatedIndex, this.childCount - 1)
      );
      this.updateNavigationState();
    }
  }

  private renderNavigation() {
    if (!this.showNav || this.childCount <= 1) return html``;

    return html`
      <div class="wc-slideshow__navigation">
        <button
          class="wc-slideshow__nav-button wc-slideshow__nav-button--prev ${!this
            .canGoLeft
            ? "wc-slideshow__nav-button--disabled"
            : ""}"
          @click="${this.goPrev}"
          ?disabled="${!this.canGoLeft}"
          aria-label="Previous slide"
        >
          <span class="icon-[garden--arrow-up-stroke-16] w-5 h-5"></span>
        </button>

        <button
          class="wc-slideshow__nav-button wc-slideshow__nav-button--next ${!this
            .canGoRight
            ? "wc-slideshow__nav-button--disabled"
            : ""}"
          @click="${this.goNext}"
          ?disabled="${!this.canGoRight}"
          aria-label="Next slide"
        >
          <span class="icon-[garden--arrow-down-stroke-16] w-5 h-5"></span>
        </button>

        <div class="wc-slideshow__counter">
          <span class="text-sm font-medium">
            ${this.currentIndex + 1}/${this.childCount}
          </span>
        </div>
      </div>
    `;
  }

  private renderIndicators() {
    if (!this.showIndicators || this.childCount <= 1) return html``;

    const indicators = Array.from({ length: this.childCount }, (_, i) => i);

    return html`
      <div class="wc-slideshow__indicators">
        ${indicators.map(
          (index) => html`
            <button
              class="wc-slideshow__indicator ${this.currentIndex === index
                ? "wc-slideshow__indicator--active"
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
    const containerClass =
      this.modal || this.childCount < 2
        ? "wc-slideshow--full-width"
        : "wc-slideshow--with-nav";

    return html`
      <div class="wc-slideshow wc-slideshow--flat ${containerClass}">
        <div class="wc-slideshow__content">
          <div
            class="wc-slideshow__container"
            @scroll="${this.handleScroll}"
            @slotchange="${this.updateLayout}"
          >
            <slot></slot>
          </div>

          ${this.renderIndicators()}
        </div>

        ${this.renderNavigation()}
      </div>
    `;
  }
}
