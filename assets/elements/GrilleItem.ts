import { LitElement, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import mainCSS from "../main.css?inline";

@customElement("wc-grille-item")
export class WcGrilleItem extends LitElement {
  static styles = [unsafeCSS(mainCSS)];

  protected createRenderRoot() {
    const shadowRoot = super.createRenderRoot();

    const themeStyle = document.createElement("style");
    themeStyle.id = "theme-vars";
    shadowRoot.appendChild(themeStyle);

    return shadowRoot;
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add("wc-grille-item");
  }

  render() {
    return html`
      <div class="wc-grille-item__content">
        <slot></slot>
      </div>
    `;
  }
}
