import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import mainCSS from "../main.css?inline";
import type { CarouselItemProps } from "../types/carousel.js";

@customElement("wc-carousel-item")
export class WcCarouselItem extends LitElement implements CarouselItemProps {
  static styles = [unsafeCSS(mainCSS)];

  @property({ type: Number }) order = 0;

  // Deshabilitar Shadow DOM para mejor integración
  protected createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add("wc-carousel-item");
  }

  render() {
    return html`
      <div class="wc-carousel-item__content">
        <slot></slot>
      </div>
    `;
  }
}
