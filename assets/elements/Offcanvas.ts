import { LitElement, html, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";
import mainCSS from "../main.css?inline";

@customElement("wc-offcanvas")
export class WcOffcanvas extends LitElement {
  static styles = unsafeCSS(mainCSS);

  @state() private showOffcanvas = false;

  // Usar Shadow DOM pero con estilos globales
  protected createRenderRoot() {
    const shadowRoot = super.createRenderRoot();

    // Aplicar estilos globales manualmente
    const style = document.createElement("style");
    style.textContent = (mainCSS as any).toString();
    shadowRoot.appendChild(style);

    return shadowRoot;
  }

  private toggleOffcanvas() {
    this.showOffcanvas = !this.showOffcanvas;

    if (this.showOffcanvas) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.body.style.overflow = "auto";
  }

  render() {
    return html`
      <!-- Botón de apertura -->
      <button
        class="wc-offcanvas-toggle wc-offcanvas-toggle--flat"
        @click="${this.toggleOffcanvas}"
        aria-label="Open navigation menu"
      >
        <span class="wc-offcanvas-toggle-icon"></span>
      </button>

      <!-- Offcanvas (solo visible cuando showOffcanvas es true) -->
      ${this.showOffcanvas
        ? html`
            <div
              class="wc-offcanvas-overlay wc-offcanvas-overlay--flat"
              @click="${this.toggleOffcanvas}"
            >
              <div
                class="wc-offcanvas-panel wc-offcanvas-panel--flat"
                @click="${(e: Event) => e.stopPropagation()}"
              >
                <button
                  class="wc-offcanvas-close wc-offcanvas-close--flat"
                  @click="${this.toggleOffcanvas}"
                  aria-label="Close offcanvas"
                >
                  <span class="wc-offcanvas-close-icon"></span>
                </button>
                <div class="wc-offcanvas-content">
                  <slot></slot>
                </div>
              </div>
            </div>
          `
        : ""}
    `;
  }
}
