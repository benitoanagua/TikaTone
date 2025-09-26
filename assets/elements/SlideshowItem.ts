import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import mainCSS from "../main.css?inline";
import type { SlideshowItemProps } from "../types/slideshow.js";

@customElement("wc-slideshow-item")
export class WcSlideshowItem extends LitElement implements SlideshowItemProps {
  static styles = [unsafeCSS(mainCSS)];

  @property({ type: Number }) order = 0;
  @property({ type: Boolean }) active = false;

  protected createRenderRoot() {
    return this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    super.connectedCallback();

    this.setAttribute("role", "group");
    this.setAttribute("aria-roledescription", "slide");
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has("active")) {
      this.updateAriaAttributes();
    }
  }

  private updateAriaAttributes() {
    if (this.active) {
      this.removeAttribute("aria-hidden");
      this.setAttribute("tabindex", "0");
    } else {
      this.setAttribute("aria-hidden", "true");
      this.removeAttribute("tabindex");
    }
  }

  private handleFocus() {
    if (this.active) {
      this.focus();
    }
  }

  render() {
    return html`
      <div
        class="wc-slideshow-item__content"
        @focus="${this.handleFocus}"
        tabindex="${this.active ? "0" : "-1"}"
        aria-label="${`Slide ${this.order + 1}`}"
      >
        <slot></slot>
      </div>
    `;
  }
}
