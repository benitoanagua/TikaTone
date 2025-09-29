import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import mainCSS from "../main.css?inline";
import type { CarouselProps } from "../types/carousel.js";
import { ThemeAwareMixin } from "../mixins/ThemeAwareMixin.js";

const ThemeAwareBase = ThemeAwareMixin(LitElement);

@customElement("wc-carousel")
export class WcCarousel extends ThemeAwareBase implements CarouselProps {
  static styles = [unsafeCSS(mainCSS)];

  @property({ type: Number }) desktop = 3;
  @property({ type: Number }) mobile = 1;
  @property({ type: String }) gap:
    | "none"
    | "small"
    | "medium"
    | "large"
    | "xlarge" = "medium";
  @property({ type: Number }) interval = 5000;
  @property({ type: Boolean, attribute: "auto-play" }) autoPlay = true;
  @property({ type: Boolean, attribute: "show-arrows" }) showArrows = true;
  @property({ type: Boolean, attribute: "show-dots" }) showDots = true;

  @state() private currentIndex = 0;
  @state() private itemWidth = 0;
  @state() private isMobile = false;
  @state() private childCount = 0;
  @state() private maxIndex = 0;
  @state() private visibleSlides = 3;
  @state() private isDragging = false;
  @state() private startX = 0;
  @state() private currentTranslate = 0;
  @state() private prevTranslate = 0;

  @query(".wc-carousel__container") private containerElement?: HTMLElement;
  @query("slot") private slotElement?: HTMLSlotElement;

  private autoPlayTimer?: number;
  private resizeObserver?: ResizeObserver;
  private mediaQuery?: MediaQueryList;
  private isScrolling = false;
  private scrollTimeout?: number;
  private animationId?: number;

  private get gapClass(): string {
    const gapMap = {
      none: "gap-0",
      small: "gap-1",
      medium: "gap-2",
      large: "gap-3",
      xlarge: "gap-4",
    };
    return gapMap[this.gap] || "gap-2";
  }

  private get gapValue(): number {
    const gapValueMap = {
      none: 0,
      small: 4,
      medium: 8,
      large: 12,
      xlarge: 16,
    };
    return gapValueMap[this.gap] || 8;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupMediaQuery();
    this.setupResizeObserver();
    this.setupTouchEvents();
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
  }

  protected willUpdate(changedProperties: Map<string, any>) {
    if (
      changedProperties.has("desktop") ||
      changedProperties.has("mobile") ||
      changedProperties.has("gap")
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

    const containerWidth = this.containerElement.offsetWidth;
    const columns = this.isMobile ? this.mobile : this.desktop;
    this.visibleSlides = columns;
    const gaps = (columns - 1) * this.gapValue;

    this.itemWidth = (containerWidth - gaps) / columns;
    this.maxIndex = Math.max(0, this.childCount - columns);

    assignedElements.forEach((element) => {
      if (element instanceof HTMLElement) {
        element.style.transform = "scale(1)";
      }
    });

    assignedElements.forEach((element) => {
      if (element instanceof HTMLElement) {
        element.style.width = `${this.itemWidth}px`;
        element.style.flexShrink = "0";
        element.style.transition = "transform 0.3s ease";

        element.addEventListener("mouseenter", () => {
          if (!this.isDragging) {
            element.style.transform = "scale(1.02)";
          }
        });

        element.addEventListener("mouseleave", () => {
          element.style.transform = "scale(1)";
        });
      }
    });

    if (this.currentIndex > this.maxIndex) {
      this.currentIndex = this.maxIndex;
    }

    this.scrollToIndex(this.currentIndex, false);

    this.requestUpdate();
  }

  private scrollToIndex(index: number, smooth = true) {
    if (!this.containerElement) return;

    const scrollPosition = index * (this.itemWidth + this.gapValue);

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

  private syncCurrentIndex() {
    if (!this.containerElement || this.isDragging) return;

    const scrollLeft = this.containerElement.scrollLeft;
    const itemStep = this.itemWidth + this.gapValue;
    const calculatedIndex = Math.round(scrollLeft / itemStep);

    const newIndex = Math.max(0, Math.min(calculatedIndex, this.maxIndex));

    if (newIndex !== this.currentIndex) {
      this.currentIndex = newIndex;
      this.dispatchChangeEvent();
    }
  }

  private getContainerClasses(): string {
    const baseClasses =
      "wc-carousel__container flex overflow-x-auto scroll-smooth p-3 md:p-4 w-full";

    const currentGapClass = this.gapClass;

    return `${baseClasses} ${currentGapClass}`;
  }

  private setupTouchEvents() {
    if (!this.containerElement) return;

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

    if (movedBy < -50 && this.currentIndex < this.maxIndex) {
      this.goNext();
    } else if (movedBy > 50 && this.currentIndex > 0) {
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

  private setupAutoPlay() {
    if (!this.autoPlay || this.childCount <= this.visibleSlides) return;

    this.startAutoplay();
  }

  private startAutoplay() {
    this.stopAutoplay();
    this.autoPlayTimer = window.setInterval(() => {
      if (!this.isScrolling && !this.isDragging) {
        this.goNext();
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

  private goNext() {
    if (this.currentIndex < this.maxIndex) {
      this.currentIndex++;
    } else if (this.autoPlay) {
      this.currentIndex = 0;
    }
    this.scrollToIndex(this.currentIndex);
    this.dispatchChangeEvent();
    this.dispatchNavigationEvent("next");
  }

  private goPrev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else if (this.autoPlay) {
      this.currentIndex = this.maxIndex;
    }
    this.scrollToIndex(this.currentIndex);
    this.dispatchChangeEvent();
    this.dispatchNavigationEvent("prev");
  }

  private goToIndex(index: number) {
    if (index >= 0 && index <= this.maxIndex) {
      this.currentIndex = index;
      this.scrollToIndex(this.currentIndex);
      this.dispatchChangeEvent();
      this.dispatchNavigationEvent("goto", index);
    }
  }

  private dispatchChangeEvent() {
    this.dispatchEvent(
      new CustomEvent("carousel-change", {
        detail: {
          currentIndex: this.currentIndex,
          totalSlides: this.childCount,
          visibleSlides: this.visibleSlides,
          isAtStart: this.currentIndex === 0,
          isAtEnd: this.currentIndex === this.maxIndex,
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
      new CustomEvent("carousel-navigation", {
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

  private getAriaLabels() {
    return {
      container: `Carousel with ${this.childCount} items`,
      prevButton: `Previous item, ${this.currentIndex + 1} of ${this.childCount}`,
      nextButton: `Next item, ${this.currentIndex + 1} of ${this.childCount}`,
      dot: (index: number) => `Go to item ${index + 1} of ${this.childCount}`,
    };
  }

  private renderArrows() {
    if (!this.showArrows || this.childCount <= this.visibleSlides)
      return html``;

    const ariaLabels = this.getAriaLabels();
    const isAtStart = this.currentIndex === 0;
    const isAtEnd = this.currentIndex === this.maxIndex;

    return html`
      <div class="wc-carousel__arrows">
        <button
          class="wc-carousel__arrow wc-carousel__arrow--prev ${isAtStart
            ? "wc-carousel__arrow--disabled"
            : ""}"
          @click="${this.goPrev}"
          ?disabled="${isAtStart}"
          aria-label="${ariaLabels.prevButton}"
          aria-controls="carousel-items"
        >
          <span class="icon-[carbon--arrow-left] w-5 h-5 md:w-6 md:h-6"></span>
        </button>

        <button
          class="wc-carousel__arrow wc-carousel__arrow--next ${isAtEnd
            ? "wc-carousel__arrow--disabled"
            : ""}"
          @click="${this.goNext}"
          ?disabled="${isAtEnd}"
          aria-label="${ariaLabels.nextButton}"
          aria-controls="carousel-items"
        >
          <span class="icon-[carbon--arrow-right] w-5 h-5 md:w-6 md:h-6"></span>
        </button>
      </div>
    `;
  }

  private renderDots() {
    if (!this.showDots || this.maxIndex === 0) return html``;

    const dotCount = this.maxIndex + 1;
    const dots = Array.from({ length: dotCount }, (_, i) => i);
    const ariaLabels = this.getAriaLabels();

    return html`
      <div
        class="wc-carousel__dots"
        role="tablist"
        aria-label="Carousel navigation"
      >
        ${dots.map(
          (index) => html`
            <button
              class="wc-carousel__dot ${this.currentIndex === index
                ? "wc-carousel__dot--active"
                : ""}"
              @click="${() => this.goToIndex(index)}"
              aria-label="${ariaLabels.dot(index)}"
              aria-selected="${this.currentIndex === index}"
              role="tab"
            ></button>
          `
        )}
      </div>
    `;
  }

  private renderCounter() {
    if (this.childCount <= this.visibleSlides) return html``;

    return html`
      <div class="wc-carousel__counter" aria-live="polite" aria-atomic="true">
        <span class="text-sm text-onSurfaceVariant">
          ${this.currentIndex + 1} / ${this.maxIndex + 1}
        </span>
      </div>
    `;
  }

  private getCarouselClasses() {
    const classes = ["wc-carousel", "wc-carousel--flat"];

    if (this.isDragging) {
      classes.push("wc-carousel--dragging");
    }

    return classes.join(" ");
  }

  render() {
    const ariaLabels = this.getAriaLabels();

    return html`
      <div
        class="${this.getCarouselClasses()}"
        role="region"
        aria-label="${ariaLabels.container}"
      >
        <div class="wc-carousel__navigation">
          ${this.renderArrows()} ${this.renderCounter()} ${this.renderDots()}
        </div>

        <div
          id="carousel-items"
          class="${this.getContainerClasses()}"
          @scroll="${this.handleScroll}"
          @slotchange="${this.updateLayout}"
          @mouseenter="${this.stopAutoplay}"
          @mouseleave="${() => this.autoPlay && this.startAutoplay()}"
        >
          <slot></slot>
        </div>
      </div>
    `;
  }
}
