import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import mainCSS from "../main.css?inline";

@customElement("wc-tab-panel")
export class WcTabPanel extends LitElement {
  static styles = [unsafeCSS(mainCSS)];

  @property({ type: String }) label = "";

  @state() private index = 0;
  @state() private active = false;

  // Deshabilitar Shadow DOM para mejor integración
  protected createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupPanel();
  }

  protected updated() {
    this.updateClasses();
  }

  private setupPanel() {
    // Get configuration from parent tabs
    const indexAttr = this.getAttribute("data-index");
    const activeAttr = this.getAttribute("data-active");

    if (indexAttr) this.index = parseInt(indexAttr, 10);
    if (activeAttr) this.active = activeAttr === "true";

    this.updateClasses();
  }

  private updateClasses() {
    // Reset classes
    this.className = this.className
      .split(" ")
      .filter((cls) => !cls.startsWith("wc-tab-panel--"))
      .join(" ");

    // Add current state classes
    this.classList.add("wc-tab-panel");
    this.classList.add("wc-tab-panel--flat");

    if (this.active) {
      this.classList.add("wc-tab-panel--active");
    } else {
      this.classList.add("wc-tab-panel--hidden");
    }
  }

  render() {
    return html`
      <div
        class="wc-tab-panel__content"
        role="tabpanel"
        tabindex="0"
        aria-labelledby="tab-${this.index}"
        id="panel-${this.index}"
        ?hidden="${!this.active}"
      >
        <slot></slot>
      </div>
    `;
  }
}
