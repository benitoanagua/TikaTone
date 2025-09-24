import { LitElement, html, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";
import mainCSS from "../main.css?inline";
import { ThemeAwareMixin } from "../mixins/ThemeAwareMixin.js";

const ThemeAwareBase = ThemeAwareMixin(LitElement);

@customElement("wc-offcanvas")
export class WcOffcanvas extends ThemeAwareBase {
  static styles = [unsafeCSS(mainCSS)];

  @state() private showOffcanvas = false;

  protected createRenderRoot() {
    const shadowRoot = super.createRenderRoot();

    // Ensure theme style element is created
    const themeStyle = document.createElement("style");
    themeStyle.id = "theme-vars";
    shadowRoot.appendChild(themeStyle);

    return shadowRoot;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.body.style.overflow = "auto";
  }

  private toggleOffcanvas() {
    this.showOffcanvas = !this.showOffcanvas;

    if (this.showOffcanvas) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }

  render() {
    return html`
      <button
        class="wc-offcanvas-toggle wc-offcanvas-toggle--flat"
        @click="${this.toggleOffcanvas}"
        aria-label="Open navigation menu"
      >
        <span class="wc-offcanvas-toggle-icon"></span>
      </button>

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
