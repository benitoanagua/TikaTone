import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import mainCSS from "../main.css?inline";
import type { TabPanelProps } from "../types/tabs.js";

@customElement("wc-tab-panel")
export class WcTabPanel extends LitElement implements TabPanelProps {
  static styles = [unsafeCSS(mainCSS)];

  @property({ type: Boolean, reflect: true }) active = false;

  // Deshabilitar Shadow DOM para mejor integración
  protected createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div
        class="wc-tab-panel__content"
        role="tabpanel"
        ?hidden="${!this.active}"
      >
        <slot></slot>
      </div>
    `;
  }
}
