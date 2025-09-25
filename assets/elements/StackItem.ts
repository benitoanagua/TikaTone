import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import mainCSS from "../main.css?inline";

@customElement("wc-stack-item")
export class WcStackItem extends LitElement {
  static styles = [unsafeCSS(mainCSS)];

  @property({ type: String }) title = "Title";

  // Deshabilitar Shadow DOM para mejor integración
  protected createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("title", this.title);
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has("title")) {
      this.setAttribute("title", this.title);
    }
  }

  render() {
    return html`
      <div class="wc-stack-item" style="display: none;">
        <slot></slot>
      </div>
    `;
  }
}
