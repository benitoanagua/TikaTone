import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import mainCSS from "../main.css?inline";
import type { AccordionItemProps } from "../types/accordion.js";
import { ThemeAwareMixin } from "../mixins/ThemeAwareMixin.js";

const ThemeAwareBase = ThemeAwareMixin(LitElement);

@customElement("wc-accordion-item")
export class WcAccordionItem
  extends ThemeAwareBase
  implements AccordionItemProps
{
  static styles = [unsafeCSS(mainCSS)];

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  protected createRenderRoot() {
    const shadowRoot = super.createRenderRoot();

    // Ensure theme style element is created
    const themeStyle = document.createElement("style");
    themeStyle.id = "theme-vars";
    shadowRoot.appendChild(themeStyle);

    return shadowRoot;
  }

  private toggle() {
    if (this.disabled) return;

    const index = Array.from(this.parentElement?.children || []).indexOf(this);

    this.dispatchEvent(
      new CustomEvent("accordion-toggle", {
        bubbles: true,
        composed: true,
        detail: { index },
      })
    );
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (this.disabled) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.toggle();
    }
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

    if (this.open) {
      this.classList.add("wc-accordion-item--open");
    }

    if (this.disabled) {
      this.classList.add("wc-accordion-item--disabled");
    }
  }

  protected willUpdate() {
    this.updateClasses();
  }

  render() {
    return html`
      <div class="wc-accordion-item">
        <button
          class="wc-accordion-item__header"
          @click="${this.toggle}"
          @keydown="${this.handleKeyDown}"
          ?disabled="${this.disabled}"
          aria-expanded="${this.open}"
          aria-disabled="${this.disabled}"
        >
          <span class="wc-accordion-item__label">
            <slot name="header"></slot>
          </span>
          <span class="wc-accordion-item__icon">
            <span
              class="icon-[carbon--chevron-down] w-5 h-5 transition-transform duration-200 ${this
                .open
                ? "rotate-180"
                : ""}"
            ></span>
          </span>
        </button>
        <div class="wc-accordion-item__panel" ?hidden="${!this.open}">
          <div class="wc-accordion-item__content">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}
