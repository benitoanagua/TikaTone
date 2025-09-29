import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import mainCSS from "../main.css?inline";
import type { TabPanelProps } from "../types/tabs.js";

@customElement("wc-tab-panel")
export class WcTabPanel extends LitElement implements TabPanelProps {
  static styles = [unsafeCSS(mainCSS)];

  @property({ type: Boolean, reflect: true }) active = false;

  protected createRenderRoot() {
    const shadowRoot = super.createRenderRoot();

    // Ensure theme style element is created
    const themeStyle = document.createElement("style");
    themeStyle.id = "theme-vars";
    shadowRoot.appendChild(themeStyle);

    return shadowRoot;
  }

  protected willUpdate(changedProperties: Map<string, any>) {
    if (changedProperties.has("active")) {
      this.style.display = this.active ? "block" : "none";
    }
  }

  render() {
    return html`
      <div
        class="wc-tab-panel__content"
        role="tabpanel"
        aria-hidden="${!this.active}"
      >
        <slot></slot>
      </div>
    `;
  }
}
