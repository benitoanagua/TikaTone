import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import mainCSS from "../main.css?inline";

interface StackItem {
  height: number;
  order: number;
  element: HTMLElement;
  caption: string;
}

@customElement("wc-stack")
export class WcStack extends LitElement {
  static styles = [unsafeCSS(mainCSS)];

  @property({ type: Number }) maxItems = 5;
  @state() private items: StackItem[] = [];
  @state() private wrapHeight = 0;

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
    // Esperar a que el DOM esté completamente renderizado
    setTimeout(() => {
      this.initializeItems();
    }, 0);
  }

  private initializeItems() {
    const children = Array.from(this.children);
    const visibleElements = children.slice(0, this.maxItems);

    // Limpiar observadores anteriores
    this.items.forEach((item) => {
      this.resizeObserver?.unobserve(item.element);
    });

    this.items = visibleElements.map((element, index) => {
      const htmlElement = element as HTMLElement;
      const caption =
        htmlElement.getAttribute("data-caption") || `Item ${index + 1}`;

      // Observar este elemento
      this.resizeObserver?.observe(htmlElement);

      return {
        height: htmlElement.offsetHeight || 0,
        order: index,
        element: htmlElement,
        caption,
      };
    });

    this.updateWrapHeight();
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
          this.updateWrapHeight();
        }
      });
    });
  }

  private cleanupResizeObserver() {
    this.resizeObserver?.disconnect();
    this.items.forEach((item) => {
      this.resizeObserver?.unobserve(item.element);
    });
  }

  private updateWrapHeight() {
    if (this.items.length === 0) {
      this.wrapHeight = 0;
      return;
    }

    this.wrapHeight = Math.max(
      ...this.items.map(
        (item, index) => item.height + 32 * (this.items.length - index - 1)
      )
    );
  }

  private sendToFront(order: number) {
    const currentIndex = this.items.findIndex((item) => item.order === order);
    if (currentIndex === 0) return;

    const item = this.items[currentIndex];

    // Reordenar moviendo el item al frente
    const newItems = this.items.filter((_, index) => index !== currentIndex);
    newItems.unshift(item);

    // Actualizar órdenes manteniendo la secuencia
    this.items = newItems.map((item, index) => ({
      ...item,
      order: index,
    }));

    this.updateWrapHeight();
    this.requestUpdate();
  }

  // Preservar exactamente la lógica original del efecto 3D
  private getTopZindexClass(index: number): string {
    const zIndexValue = (this.items.length - index - 1) * 10;

    switch (zIndexValue) {
      case 50:
        return "translate-y-40 z-50 md:right-20";
      case 40:
        return "translate-y-32 z-40 md:right-16";
      case 30:
        return "translate-y-24 z-30 md:right-12";
      case 20:
        return "translate-y-16 z-20 md:right-8";
      case 10:
        return "translate-y-8 z-10 md:right-4";
      default:
        return "translate-y-0 z-0 md:right-0";
    }
  }

  private getMdLeftClass(index: number): string {
    const leftValue = index * 4;

    switch (leftValue) {
      case 20:
        return "md:left-20";
      case 16:
        return "md:left-16";
      case 12:
        return "md:left-12";
      case 8:
        return "md:left-8";
      case 4:
        return "md:left-4";
      default:
        return "md:left-0";
    }
  }

  private getBgClass(index: number): string {
    const bgClasses = [
      "bg-primaryContainer",
      "bg-surfaceContainerHigh",
      "bg-surfaceContainer",
      "bg-surfaceContainerLow",
      "bg-surfaceContainerLowest",
    ];

    return bgClasses[Math.min(index, bgClasses.length - 1)];
  }

  private getStackItemClasses(index: number): string {
    const baseClasses =
      "absolute transition-all duration-300 ease-out flex items-center flex-col w-full";
    const zIndexClass = this.getTopZindexClass(index);
    const leftClass = this.getMdLeftClass(index);

    return `${baseClasses} ${zIndexClass} ${leftClass}`
      .replace(/\s+/g, " ")
      .trim();
  }

  private getItemBgClass(index: number): string {
    const bgClass = this.getBgClass(index);
    return `pt-5 px-2 border border-outlineVariant ${bgClass}`;
  }

  private getButtonColor(index: number): string {
    return index === 0 ? "secondary" : "primary";
  }

  render() {
    return html`
      <div class="wc-stack relative" style="height: ${this.wrapHeight}px">
        ${this.items.map(
          (item, index) => html`
            <div class="${this.getStackItemClasses(index)}">
              <!-- Botón de encabezado -->
              <div class="-mb-3 z-10 w-full max-w-40">
                <button
                  class="wc-stack__button wc-stack__button--${this.getButtonColor(
                    index
                  )}"
                  @click="${() => this.sendToFront(item.order)}"
                  ?disabled="${index === 0}"
                  aria-label="Bring ${item.caption} to front"
                >
                  ${item.caption}
                </button>
              </div>

              <!-- Contenido del item - usar el elemento original -->
              <div class="${this.getItemBgClass(index)} w-full">
                ${item.element}
              </div>
            </div>
          `
        )}
      </div>
    `;
  }
}
