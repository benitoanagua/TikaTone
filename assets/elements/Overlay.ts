import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import mainCSS from "../main.css?inline";
import type {
  OverlayAlign,
  OverlayPosition,
  OverlayFill,
  OverlayBox,
} from "../types/overlay.js";
import type { CardHeading, CardAspectRatio } from "../types/card.js";
import { TitleRendererMixin } from "../mixins/TitleRenderer.js";

// Aplicar el mixin a la clase base
const BaseClass = TitleRendererMixin(LitElement);

@customElement("wc-overlay")
export class WcOverlay extends BaseClass {
  static styles = [unsafeCSS(mainCSS)];

  @property({ type: String }) title = "";
  @property({ type: String }) url = "";
  @property({ type: String, attribute: "feature-image" }) feature_image = "";
  @property({ type: String, attribute: "tag-name" }) tag_name = "";
  @property({ type: String, attribute: "author-name" }) author_name = "";
  @property({ type: String, attribute: "published-at" }) published_at = "";
  @property({ type: String, attribute: "reading-time" }) reading_time = "";
  @property({ type: String, attribute: "aspect-ratio" })
  aspect_ratio: CardAspectRatio = "monitor";
  @property({ type: Number, reflect: true }) heading: CardHeading = 4;
  @property({ type: Boolean, attribute: "show-meta" }) show_meta = false;
  @property({ type: String }) align: OverlayAlign = "center";
  @property({ type: String }) position: OverlayPosition = "center";
  @property({ type: String }) box: OverlayBox = "background";
  @property({ type: String }) fill: OverlayFill = "full";

  protected createRenderRoot() {
    return this;
  }

  private getOverlayClasses() {
    const classes = [
      "wc-overlay",
      `wc-overlay--align-${this.align}`,
      `wc-overlay--position-${this.position}`,
      `wc-overlay--aspect-${this.aspect_ratio}`,
    ];

    if (this.fill !== "none") {
      classes.push(`wc-overlay--fill-${this.fill}`);
    }

    // Añadir la clase del tipo de box al contenedor principal
    classes.push(`wc-overlay--box-${this.box}`);

    return classes.join(" ");
  }

  render() {
    return html`
      <div
        class="${this.getOverlayClasses()}"
        style="${this.feature_image
          ? `background-image: url(${this.feature_image})`
          : ""}"
      >
        <div class="wc-overlay__content">
          ${this.tag_name
            ? html` <span class="wc-overlay__category">${this.tag_name}</span> `
            : ""}

          <a href="${this.url}" class="wc-overlay__title-link">
            ${this.renderTitle("text-white")}
          </a>

          ${this.show_meta
            ? html`
                <ul class="wc-overlay__meta">
                  ${this.author_name
                    ? html`
                        <li class="wc-overlay__meta-item">
                          ${this.author_name}
                        </li>
                      `
                    : ""}
                  ${this.published_at
                    ? html`
                        <li class="wc-overlay__meta-item">
                          ${this.published_at}
                        </li>
                      `
                    : ""}
                  ${this.reading_time
                    ? html`
                        <li class="wc-overlay__meta-item">
                          ${this.reading_time}
                        </li>
                      `
                    : ""}
                </ul>
              `
            : ""}
        </div>
      </div>
    `;
  }
}
