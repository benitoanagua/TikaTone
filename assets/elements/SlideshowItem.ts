import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import mainCSS from "../main.css?inline";
import type { SlideshowItemProps } from "../types/slideshow.js";

@customElement("wc-slideshow-item")
export class WcSlideshowItem extends LitElement implements SlideshowItemProps {
  static styles = [unsafeCSS(mainCSS)];

  @property({ type: Number }) order = 0;

  // Deshabilitar Shadow DOM para mejor integración
  protected createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add("wc-slideshow-item");
  }

  render() {
    return html`
      <div class="wc-slideshow-item__content">
        <slot></slot>
      </div>
    `;
  }
}
