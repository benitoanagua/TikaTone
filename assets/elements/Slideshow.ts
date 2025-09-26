import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import mainCSS from "../main.css?inline";
import type { SlideshowProps } from "../types/slideshow.js";

@customElement("wc-slideshow")
export class WcSlideshow extends LitElement implements SlideshowProps {
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
  @state() private isMobile = false;
  @state() private canGoLeft = false;
  @state() private canGoRight = true;
  @state() private isDragging = false;
  @state() private startX = 0;
  @state() private currentTranslate = 0;
  @state() private prevTranslate = 0;

  @query(".wc-slideshow__container") private containerElement?: HTMLElement;
  @query("slot") private slotElement?: HTMLSlotElement;

  private autoPlayTimer?: number;
  private resizeObserver?: ResizeObserver;
  private mediaQuery?: MediaQueryList;
  private isScrolling = false;
  private scrollTimeout?: number;
  private animationId?: number;
  private forward = true;

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
    this.cleanupTouchEvents();
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  protected firstUpdated() {
    this.updateLayout();
    this.setupAutoPlay();
    this.setupTouchEvents();
  }

  protected updated(changedProperties: Map<string, any>) {
    if (
      changedProperties.has("modal") ||
      changedProperties.has("showNav") ||
      changedProperties.has("showIndicators")
    ) {
      this.scheduleLayoutUpdate();
    }

    if (changedProperties.has("autoPlay")) {
      if (this.autoPlay) {
        this.setupAutoPlay();
      } else {
        this.cleanupAutoPlay();
      }
    }
  }

  private scheduleLayoutUpdate() {
    requestAnimationFrame(() => {
      this.updateLayout();
    });
  }

  private updateLayout() {
    if (!this.containerElement || !this.slotElement) return;

    const assignedElements = this.slotElement.assignedElements();
    this.childCount = assignedElements.length;

    if (this.childCount === 0) return;

    this.itemWidth = this.containerElement.offsetWidth;

    assignedElements.forEach((element) => {
      if (element instanceof HTMLElement) {
        if (!element.classList.contains("wc-slideshow-item")) {
          element.classList.add("wc-slideshow-item");
        }
      }
    });

    this.updateNavigationState();
    this.scrollToIndex(this.currentIndex, false);

    this.requestUpdate();
  }

  private setupTouchEvents() {
    if (!this.containerElement) {
      setTimeout(() => this.setupTouchEvents(), 100);
      return;
    }

    this.containerElement.addEventListener("touchstart", this.touchStart);
    this.containerElement.addEventListener("touchmove", this.touchMove);
    this.containerElement.addEventListener("touchend", this.touchEnd);
    this.containerElement.addEventListener("mousedown", this.touchStart);
    this.containerElement.addEventListener("mousemove", this.touchMove);
    this.containerElement.addEventListener("mouseup", this.touchEnd);
    this.containerElement.addEventListener("mouseleave", this.touchEnd);
  }

  private cleanupTouchEvents() {
    if (!this.containerElement) return;

    this.containerElement.removeEventListener("touchstart", this.touchStart);
    this.containerElement.removeEventListener("touchmove", this.touchMove);
    this.containerElement.removeEventListener("touchend", this.touchEnd);
    this.containerElement.removeEventListener("mousedown", this.touchStart);
    this.containerElement.removeEventListener("mousemove", this.touchMove);
    this.containerElement.removeEventListener("mouseup", this.touchEnd);
    this.containerElement.removeEventListener("mouseleave", this.touchEnd);
  }

  private touchStart = (e: TouchEvent | MouseEvent) => {
    this.isDragging = true;
    this.startX = this.getClientX(e);
    this.prevTranslate = this.currentTranslate;

    if (this.autoPlayTimer) {
      this.stopAutoplay();
    }
  };

  private touchMove = (e: TouchEvent | MouseEvent) => {
    if (!this.isDragging) return;

    const currentX = this.getClientX(e);
    const diff = currentX - this.startX;
    this.currentTranslate = this.prevTranslate + diff;

    this.animationId = requestAnimationFrame(() => {
      if (this.containerElement) {
        this.containerElement.style.transform = `translateX(${this.currentTranslate}px)`;
      }
    });
  };

  private touchEnd = () => {
    if (!this.isDragging) return;

    this.isDragging = false;

    const movedBy = this.currentTranslate - this.prevTranslate;

    if (movedBy < -50 && this.canGoRight) {
      this.goNext();
    } else if (movedBy > 50 && this.canGoLeft) {
      this.goPrev();
    } else {
      this.scrollToIndex(this.currentIndex);
    }

    if (this.autoPlay) {
      this.startAutoplay();
    }
  };

  private getClientX(e: TouchEvent | MouseEvent): number {
    return "touches" in e ? e.touches[0].clientX : e.clientX;
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

  private updateNavigationState() {
    this.canGoLeft = this.currentIndex > 0;
    this.canGoRight = this.currentIndex < this.childCount - 1;
  }

  private setupAutoPlay() {
    if (!this.autoPlay || this.childCount <= 1) return;

    this.startAutoplay();
  }

  private startAutoplay() {
    this.stopAutoplay();
    this.autoPlayTimer = window.setInterval(() => {
      if (!this.isScrolling && !this.isDragging) {
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

  private stopAutoplay() {
    if (this.autoPlayTimer) {
      window.clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = undefined;
    }
  }

  private cleanupAutoPlay() {
    this.stopAutoplay();
  }

  private scrollToIndex(index: number, smooth = true) {
    if (!this.containerElement) return;

    const scrollPosition = index * this.itemWidth;

    if (smooth) {
      this.containerElement.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    } else {
      this.containerElement.scrollLeft = scrollPosition;
    }

    this.currentTranslate = -scrollPosition;
  }

  private goNext() {
    if (this.canGoRight) {
      this.currentIndex++;
      this.updateNavigationState();
      this.scrollToIndex(this.currentIndex);
      this.dispatchChangeEvent();
      this.dispatchNavigationEvent("next");
    }
  }

  private goPrev() {
    if (this.canGoLeft) {
      this.currentIndex--;
      this.updateNavigationState();
      this.scrollToIndex(this.currentIndex);
      this.dispatchChangeEvent();
      this.dispatchNavigationEvent("prev");
    }
  }

  private goToIndex(index: number) {
    if (index >= 0 && index < this.childCount) {
      this.currentIndex = index;
      this.updateNavigationState();
      this.scrollToIndex(this.currentIndex);
      this.dispatchChangeEvent();
      this.dispatchNavigationEvent("goto", index);
    }
  }

  private dispatchChangeEvent() {
    this.dispatchEvent(
      new CustomEvent("slideshow-change", {
        detail: {
          currentIndex: this.currentIndex,
          totalSlides: this.childCount,
          isAtStart: this.currentIndex === 0,
          isAtEnd: this.currentIndex === this.childCount - 1,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private dispatchNavigationEvent(
    direction: "next" | "prev" | "goto",
    index?: number
  ) {
    this.dispatchEvent(
      new CustomEvent("slideshow-navigation", {
        detail: {
          direction,
          index,
          timestamp: Date.now(),
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleScroll = () => {
    this.isScrolling = true;
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = window.setTimeout(() => {
      this.isScrolling = false;
      this.syncCurrentIndex();
    }, 100);
  };

  private syncCurrentIndex() {
    if (!this.containerElement || this.isDragging) return;

    const scrollLeft = this.containerElement.scrollLeft;
    const calculatedIndex = Math.round(scrollLeft / this.itemWidth);

    const newIndex = Math.max(
      0,
      Math.min(calculatedIndex, this.childCount - 1)
    );

    if (newIndex !== this.currentIndex) {
      this.currentIndex = newIndex;
      this.updateNavigationState();
      this.dispatchChangeEvent();
    }
  }

  private getAriaLabels() {
    return {
      container: `Slideshow with ${this.childCount} slides`,
      prevButton: `Previous slide, ${this.currentIndex + 1} of ${this.childCount}`,
      nextButton: `Next slide, ${this.currentIndex + 1} of ${this.childCount}`,
      indicator: (index: number) =>
        `Go to slide ${index + 1} of ${this.childCount}`,
    };
  }

  private renderNavigation() {
    if (!this.showNav || this.childCount <= 1) return html``;

    const ariaLabels = this.getAriaLabels();

    return html`
      <div class="wc-slideshow__navigation">
        <button
          class="wc-slideshow__nav-button wc-slideshow__nav-button--prev ${!this
            .canGoLeft
            ? "wc-slideshow__nav-button--disabled"
            : ""}"
          @click="${() => {
            this.goPrev();
            this.dispatchNavigationEvent("prev");
          }}"
          ?disabled="${!this.canGoLeft}"
          aria-label="${ariaLabels.prevButton}"
          aria-controls="slideshow-items"
        >
          <span
            class="icon-[garden--arrow-up-stroke-16] w-5 h-5 md:w-6 md:h-6"
          ></span>
        </button>

        <div
          class="wc-slideshow__counter"
          aria-live="polite"
          aria-atomic="true"
        >
          <span class="text-sm md:text-base font-medium">
            ${this.currentIndex + 1}/${this.childCount}
          </span>
        </div>

        <button
          class="wc-slideshow__nav-button wc-slideshow__nav-button--next ${!this
            .canGoRight
            ? "wc-slideshow__nav-button--disabled"
            : ""}"
          @click="${() => {
            this.goNext();
            this.dispatchNavigationEvent("next");
          }}"
          ?disabled="${!this.canGoRight}"
          aria-label="${ariaLabels.nextButton}"
          aria-controls="slideshow-items"
        >
          <span
            class="icon-[garden--arrow-down-stroke-16] w-5 h-5 md:w-6 md:h-6"
          ></span>
        </button>
      </div>
    `;
  }

  private renderIndicators() {
    if (!this.showIndicators || this.childCount <= 1) return html``;

    const indicators = Array.from({ length: this.childCount }, (_, i) => i);
    const ariaLabels = this.getAriaLabels();

    return html`
      <div
        class="wc-slideshow__indicators"
        role="tablist"
        aria-label="Slideshow navigation"
      >
        ${indicators.map(
          (index) => html`
            <button
              class="wc-slideshow__indicator ${this.currentIndex === index
                ? "wc-slideshow__indicator--active"
                : ""}"
              @click="${() => {
                this.goToIndex(index);
                this.dispatchNavigationEvent("goto", index);
              }}"
              aria-label="${ariaLabels.indicator(index)}"
              aria-selected="${this.currentIndex === index}"
              role="tab"
            ></button>
          `
        )}
      </div>
    `;
  }

  private getSlideshowClasses() {
    const classes = [
      "wc-slideshow",
      "wc-slideshow--flat",
      this.modal || this.childCount < 2
        ? "wc-slideshow--full-width"
        : "wc-slideshow--with-nav",
    ];

    if (this.isDragging) {
      classes.push("wc-slideshow--dragging");
    }

    return classes.join(" ");
  }

  render() {
    const ariaLabels = this.getAriaLabels();

    return html`
      <div
        class="${this.getSlideshowClasses()}"
        role="region"
        aria-label="${ariaLabels.container}"
      >
        <div class="wc-slideshow__content">
          <div
            id="slideshow-items"
            class="wc-slideshow__container"
            @scroll="${this.handleScroll}"
            @slotchange="${this.updateLayout}"
            @mouseenter="${this.stopAutoplay}"
            @mouseleave="${() => this.autoPlay && this.startAutoplay()}"
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
