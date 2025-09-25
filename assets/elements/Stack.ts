import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import mainCSS from "../main.css?inline";
import type { StackItem, StackProps } from "../types/stack.js";

@customElement("wc-stack")
export class WcStack extends LitElement implements StackProps {
  static styles = [unsafeCSS(mainCSS)];

  @property({ type: Number }) maxItems = 3; // Fijo a 3 elementos como el Vue original
  @state() private items: StackItem[] = [];
  @state() private containerHeight = 0;
  @state() private itemOrders: number[] = [0, 1, 2]; // Orden inicial como Vue

  // Deshabilitar Shadow DOM para mejor integración con slots
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

    // Observar todos los elementos del stack
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

    // Calcular altura máxima como en Vue original
    const maxHeight = Math.max(...this.items.map((item) => item.height));
    this.containerHeight = maxHeight + 100; // Margen adicional como en Vue
  }

  private bringToFront(clickedIndex: number) {
    // Lógica similar a Vue: rotar los órdenes
    const newOrders = [...this.itemOrders];

    // Rotación circular como en Vue: (order + clickedIndex * 2) % 3
    this.itemOrders = this.itemOrders.map(
      (order, index) => (order + clickedIndex * 2) % 3
    );

    // Actualizar órdenes en los items
    this.items = this.items.map((item, index) => ({
      ...item,
      order: this.itemOrders[index],
    }));

    this.requestUpdate();

    // Emitir evento de cambio
    this.dispatchEvent(
      new CustomEvent("stack-change", {
        detail: {
          activeItem: clickedIndex,
          previousItem: this.findPreviousActive(clickedIndex),
        },
      })
    );
  }

  private findPreviousActive(currentIndex: number): number {
    return this.itemOrders.findIndex((order) => order === 0);
  }

  // Efecto 3D exacto como en Vue original
  private getTopZindexClass(order: number): string {
    switch (order) {
      case 2: // Bottom layer
        return "translate-y-0 z-0 md:right-0 md:left-8";
      case 1: // Middle layer
        return "translate-y-8 z-10 md:right-4 md:left-4";
      case 0: // Top layer
        return "translate-y-16 z-20 md:right-8 md:left-0";
      default:
        return "translate-y-0 z-0 md:right-0";
    }
  }

  private getButtonColor(order: number): string {
    return order === 0 ? "secondary" : "primary";
  }

  private getStackBgClass(order: number): string {
    const bgClasses = [
      "bg-primaryContainer", // Top (order 0)
      "bg-surfaceContainerHigh", // Middle (order 1)
      "bg-surfaceContainer", // Bottom (order 2)
    ];
    return bgClasses[order] || bgClasses[0];
  }

  private getStackItemClasses(order: number): string {
    return `absolute w-full flex flex-col transition-all duration-300 ease-out ${this.getTopZindexClass(order)}`;
  }

  private handleSlotChange() {
    this.initializeItems();
  }

  render() {
    return html`
      <div class="wc-stack relative" style="height: ${this.containerHeight}px">
        <slot @slotchange="${this.handleSlotChange}"></slot>

        ${this.items.map((item, index) => {
          const order = item.order;
          return html`
            <div class="${this.getStackItemClasses(order)}">
              <!-- Botón de encabezado - igual que Vue -->
              <div class="flex justify-center mb-2">
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

              <!-- Contenido del item con sombra Tailwind -->
              <div
                class="wc-stack__content ${this.getStackBgClass(
                  order
                )} shadow-lg rounded-lg border border-outlineVariant"
              >
                ${item.element}
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }
}
