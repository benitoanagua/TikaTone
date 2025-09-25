import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import mainCSS from "../main.css?inline";

@customElement("wc-accordion-item")
export class WcAccordionItem extends LitElement {
  static styles = [unsafeCSS(mainCSS)];

  @property({ type: String }) title = "";
  @property({ type: String }) subtitle = "";
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Boolean }) disabled = false;

  @state() private index = 0;
  @state() private variant: "default" | "bordered" | "separated" = "default";
  @state() private multiple = false;

  // Deshabilitar Shadow DOM para mejor integración con el sistema
  protected createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupAttributes();
  }

  private setupAttributes() {
    // Get configuration from parent accordion
    const indexAttr = this.getAttribute("data-index");
    const variantAttr = this.getAttribute("data-variant");
    const multipleAttr = this.getAttribute("data-multiple");

    if (indexAttr) this.index = parseInt(indexAttr, 10);
    if (variantAttr)
      this.variant = variantAttr as "default" | "bordered" | "separated";
    if (multipleAttr) this.multiple = multipleAttr === "true";

    this.classList.add("wc-accordion-item");
    this.updateClasses();
  }

  private updateClasses() {
    // Reset classes
    this.className = this.className
      .split(" ")
      .filter((cls) => !cls.startsWith("wc-accordion-item--"))
      .join(" ");

    // Add current state classes
    this.classList.add("wc-accordion-item");
    this.classList.add("wc-accordion-item--flat");
    this.classList.add(`wc-accordion-item--${this.variant}`);

    if (this.open) {
      this.classList.add("wc-accordion-item--open");
    }

    if (this.disabled) {
      this.classList.add("wc-accordion-item--disabled");
    }
  }

  protected updated() {
    this.updateClasses();
  }

  private toggleItem() {
    if (this.disabled) return;

    this.open = !this.open;

    // Dispatch toggle event to parent accordion
    this.dispatchEvent(
      new CustomEvent("accordion-item-toggle", {
        detail: {
          index: this.index,
          open: this.open,
        },
        bubbles: true,
      })
    );
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.toggleItem();
    }
  }

  render() {
    const headerClass = `
      wc-accordion-item__header
      ${this.disabled ? "wc-accordion-item__header--disabled" : ""}
    `.trim();

    return html`
      <div class="wc-accordion-item__container">
        <button
          class="${headerClass}"
          @click="${this.toggleItem}"
          @keydown="${this.handleKeyDown}"
          ?disabled="${this.disabled}"
          aria-expanded="${this.open}"
          aria-controls="content-${this.index}"
        >
          <div class="wc-accordion-item__header-content">
            <div class="wc-accordion-item__header-text">
              <h3 class="wc-accordion-item__title">${this.title}</h3>
              ${this.subtitle
                ? html`<p class="wc-accordion-item__subtitle">
                    ${this.subtitle}
                  </p>`
                : ""}
            </div>
            <div
              class="wc-accordion-item__icon ${this.open
                ? "wc-accordion-item__icon--open"
                : ""}"
            >
              <span
                class="icon-[garden--plus-stroke-16] w-5 h-5 transition-transform duration-200"
              ></span>
            </div>
          </div>
        </button>

        <div
          class="wc-accordion-item__content ${this.open
            ? "wc-accordion-item__content--open"
            : ""}"
          id="content-${this.index}"
          role="region"
          aria-labelledby="header-${this.index}"
        >
          <div class="wc-accordion-item__body">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}
