import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import mainCSS from "../main.css?inline";
import type { StackItem, StackProps } from "../types/stack.js";

@customElement("wc-stack")
export class WcStack extends LitElement implements StackProps {
  static styles = [unsafeCSS(mainCSS)];

  @property({ type: Number }) maxItems = 3;
  @state() private items: StackItem[] = [];
  @state() private containerHeight = 0;
  @state() private itemOrders: number[] = [0, 1, 2];

  protected createRenderRoot() {
    return this;
  }

  private resizeObserver?: ResizeObserver;

  connectedCallback() {
    super.connectedCallback();
    this.setupResizeObserver();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanupResizeObserver();
  }

  protected firstUpdated() {
    setTimeout(() => {
      this.initializeItems();
      this.calculateContainerHeight();
    }, 0);
  }

  private initializeItems() {
    const children = Array.from(this.children).filter(
      (child) => child.tagName.toLowerCase() === "wc-stack-item"
    );

    const visibleElements = children.slice(0, this.maxItems);

    this.items = visibleElements.map((element, index) => {
      const htmlElement = element as HTMLElement;
      const title = htmlElement.getAttribute("title") || `Item ${index + 1}`;

      return {
        height: htmlElement.offsetHeight || 0,
        order: this.itemOrders[index],
        element: htmlElement,
        title,
      };
    });

    this.calculateContainerHeight();
  }

  private setupResizeObserver() {
    this.resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        const itemIndex = this.items.findIndex(
          (item) => item.element === target
        );

        if (itemIndex !== -1) {
          this.items[itemIndex].height = Math.round(entry.contentRect.height);
          this.calculateContainerHeight();
        }
      });
    });

    this.items.forEach((item) => {
      this.resizeObserver?.observe(item.element);
    });
  }

  private cleanupResizeObserver() {
    this.resizeObserver?.disconnect();
  }

  private calculateContainerHeight() {
    if (this.items.length === 0) {
      this.containerHeight = 0;
      return;
    }

    const maxHeight = Math.max(...this.items.map((item) => item.height));
    this.containerHeight = maxHeight + 100;
  }

  private bringToFront(clickedIndex: number) {
    this.itemOrders = this.itemOrders.map(
      (order) => (order + clickedIndex * 2) % 3
    );

    this.items = this.items.map((item, index) => ({
      ...item,
      order: this.itemOrders[index],
    }));

    this.requestUpdate();

    this.dispatchEvent(
      new CustomEvent("stack-change", {
        detail: {
          activeItem: clickedIndex,
        },
      })
    );
  }

  private getTopZindexClass(order: number): string {
    switch (order) {
      case 2:
        return "wc-stack-item--bottom";
      case 1:
        return "wc-stack-item--middle";
      case 0:
        return "wc-stack-item--top";
      default:
        return "wc-stack-item--bottom";
    }
  }

  private getButtonColor(order: number): string {
    return order === 0 ? "secondary" : "primary";
  }

  private getStackBgClass(order: number): string {
    const bgClasses = [
      "wc-stack__content--top",
      "wc-stack__content--middle",
      "wc-stack__content--bottom",
    ];
    return bgClasses[order] || bgClasses[0];
  }

  private getStackItemClasses(order: number): string {
    return `wc-stack-item ${this.getTopZindexClass(order)}`;
  }

  private handleSlotChange() {
    this.initializeItems();
  }

  render() {
    return html`
      <div class="wc-stack" style="height: ${this.containerHeight}px">
        <slot @slotchange="${this.handleSlotChange}"></slot>

        ${this.items.map((item, index) => {
          const order = item.order;
          return html`
            <div class="${this.getStackItemClasses(order)}">
              <!-- Botón de encabezado - igual que Vue pero flat -->
              <div class="wc-stack__button-container">
                <button
                  class="wc-stack__button wc-stack__button--${this.getButtonColor(
                    order
                  )}"
                  @click="${() => this.bringToFront(index)}"
                  aria-label="Bring ${item.title} to front"
                >
                  ${item.title}
                </button>
              </div>

              <!-- Contenido del item con flat design -->
              <div class="wc-stack__content ${this.getStackBgClass(order)}">
                ${item.element}
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }
}
