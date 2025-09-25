import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import mainCSS from "../main.css?inline";

@customElement("wc-stack-item")
export class WcStackItem extends LitElement {
  static styles = [unsafeCSS(mainCSS)];

  @property({ type: String }) caption = "Title";
  @property({ type: Number }) order = 0;

  // Deshabilitar Shadow DOM para mejor integración
  protected createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-caption", this.caption);
    this.setAttribute("data-order", this.order.toString());
  }

  render() {
    return html`
      <div class="wc-stack-item">
        <slot></slot>
      </div>
    `;
  }
}
