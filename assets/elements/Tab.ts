import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import mainCSS from "../main.css?inline";
import type { TabsOrientation, TabsVariant } from "../types/tabs.js";

@customElement("wc-tab")
export class WcTab extends LitElement {
  static styles = [unsafeCSS(mainCSS)];

  @property({ type: String }) label = "";
  @property({ type: String }) icon = "";
  @property({ type: Boolean }) disabled = false;

  @state() private index = 0;
  @state() private active = false;
  @state() private orientation: TabsOrientation = "horizontal";
  @state() private variant: TabsVariant = "default";

  // Deshabilitar Shadow DOM para mejor integración
  protected createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupTab();
  }

  protected updated() {
    this.updateClasses();
  }

  private setupTab() {
    // Get configuration from parent tabs
    const indexAttr = this.getAttribute("data-index");
    const activeAttr = this.getAttribute("data-active");
    const orientationAttr = this.getAttribute("data-orientation");
    const variantAttr = this.getAttribute("data-variant");

    if (indexAttr) this.index = parseInt(indexAttr, 10);
    if (activeAttr) this.active = activeAttr === "true";
    if (orientationAttr) this.orientation = orientationAttr as TabsOrientation;
    if (variantAttr) this.variant = variantAttr as TabsVariant;

    this.updateClasses();

    // Register with parent
    this.dispatchEvent(
      new CustomEvent("tab-register", {
        detail: {
          index: this.index,
          label: this.label,
          disabled: this.disabled,
        },
        bubbles: true,
      })
    );
  }

  private updateClasses() {
    // Reset classes
    this.className = this.className
      .split(" ")
      .filter((cls) => !cls.startsWith("wc-tab--"))
      .join(" ");

    // Add current state classes
    this.classList.add("wc-tab");
    this.classList.add("wc-tab--flat");
    this.classList.add(`wc-tab--${this.orientation}`);
    this.classList.add(`wc-tab--${this.variant}`);

    if (this.active) {
      this.classList.add("wc-tab--active");
    }

    if (this.disabled) {
      this.classList.add("wc-tab--disabled");
    }
  }

  private handleClick() {
    if (this.disabled) return;

    this.dispatchEvent(
      new CustomEvent("tab-click", {
        detail: { index: this.index },
        bubbles: true,
      })
    );
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (this.disabled) return;

    // Let parent handle keyboard navigation
    this.dispatchEvent(
      new CustomEvent("tab-keydown", {
        detail: {
          index: this.index,
          key: event.key,
          event: event,
        },
        bubbles: true,
      })
    );
  }

  render() {
    return html`
      <div class="wc-tab__container" role="presentation">
        <button
          class="wc-tab__button"
          role="tab"
          tabindex="${this.active ? "0" : "-1"}"
          ?disabled="${this.disabled}"
          aria-selected="${this.active}"
          aria-controls="panel-${this.index}"
          id="tab-${this.index}"
          @click="${this.handleClick}"
          @keydown="${this.handleKeyDown}"
        >
          ${this.icon
            ? html`<span class="${this.icon} wc-tab__icon"></span>`
            : ""}
          ${this.label
            ? html`<span class="wc-tab__label">${this.label}</span>`
            : ""}
          ${!this.label && !this.icon ? html`<slot></slot>` : ""}
        </button>
      </div>
    `;
  }
}
