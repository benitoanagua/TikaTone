import { LitElement, html, PropertyValueMap, unsafeCSS } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import mainCSS from "../main.css?inline";
import type {
  CardHeading,
  CardDensity,
  CardMediaAlign,
  CardMediaWidth,
  CardAspectRatio,
  CardElevation,
} from "../types/card.js";
import { TitleRendererMixin } from "../mixins/TitleRenderer.js";

// Aplicar el mixin a la clase base
const BaseClass = TitleRendererMixin(LitElement);

@customElement("wc-card")
export class WcCard extends BaseClass {
  static styles = [unsafeCSS(mainCSS)];

  @property({ type: String }) title = "";
  @property({ type: String }) url = "";
  @property({ type: String }) excerpt = "";
  @property({ type: String, attribute: "feature-image" }) feature_image = "";
  @property({ type: String, attribute: "tag-name" }) tag_name = "";
  @property({ type: String, attribute: "tag-url" }) tag_url = "";
  @property({ type: String, attribute: "author-name" }) author_name = "";
  @property({ type: String, attribute: "author-url" }) author_url = "";
  @property({ type: String, attribute: "author-profile-image" })
  author_profile_image = "";
  @property({ type: String, attribute: "media-align" })
  media_align: CardMediaAlign = "left";
  @property({ type: String, attribute: "media-width" })
  media_width: CardMediaWidth = "is-half";
  @property({ type: Number, reflect: true }) heading: CardHeading = 4;
  @property({ type: String }) density: CardDensity = "normal";
  @property({ type: String, attribute: "aspect-ratio" })
  aspect_ratio: CardAspectRatio = "monitor";
  @property({ type: String, attribute: "reading-time" }) reading_time = "";
  @property({ type: String, attribute: "published-at" }) published_at = "";
  @property({ type: Number }) elevation: CardElevation = 2;

  @state() private imageSize = { width: 0, height: 0 };

  @query("img") private imageElement?: HTMLImageElement;

  private metaObserver?: ResizeObserver;
  private imageObserver?: ResizeObserver;

  protected createRenderRoot() {
    return this;
  }

  protected updated(changedProperties: PropertyValueMap<any>) {
    super.updated(changedProperties);
    this.setupObservers();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanupObservers();
  }

  private setupObservers() {
    this.cleanupObservers();

    if (this.imageElement) {
      this.imageObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          this.imageSize = {
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          };
        }
      });
      this.imageObserver.observe(this.imageElement);
    }
  }

  private cleanupObservers() {
    this.metaObserver?.disconnect();
    this.imageObserver?.disconnect();
  }

  private getCardClasses() {
    const classes = ["wc-card", `wc-card--elevation-${this.elevation}`];
    return classes.join(" ");
  }

  private getFlexClass() {
    if (this.media_align === "left" && this.density !== "normal")
      return "flex-row";
    if (this.media_align === "left" && this.density === "normal")
      return "flex-col md:flex-row";
    if (this.media_align === "right" && this.density !== "normal")
      return "flex-row-reverse";
    if (this.media_align === "right" && this.density === "normal")
      return "flex-col-reverse md:flex-row-reverse";
    if (this.media_align === "top") return "flex-col";
    return "flex-col-reverse";
  }

  private getFigureClass() {
    const isHorizontal =
      this.media_align === "left" || this.media_align === "right";
    const isNormalDensity = this.density === "normal";

    if (!isHorizontal || (isHorizontal && isNormalDensity)) return "flex-1";

    switch (this.media_width) {
      case "is-one-fifth":
        return "w-1/5";
      case "is-one-quarter":
        return "w-1/4";
      case "is-one-third":
        return "w-1/3";
      case "is-two-fifths":
        return "w-2/5";
      default:
        return "w-1/2";
    }
  }

  private getImageClasses() {
    const sizeClass =
      this.imageSize.width < 240
        ? "rounded"
        : this.imageSize.width >= 240 && this.imageSize.width <= 440
          ? "rounded-md"
          : "rounded-lg";

    const aspectClass =
      this.aspect_ratio === "square"
        ? "aspect-square"
        : this.aspect_ratio === "video"
          ? "aspect-video"
          : "aspect-4/3";

    return `w-full object-cover ${sizeClass} ${aspectClass}`;
  }

  render() {
    return html`
      <div class="${this.getCardClasses()}">
        <div class="wc-card__container ${this.getFlexClass()}">
          ${this.feature_image
            ? html`
                <figure class="wc-card__figure ${this.getFigureClass()}">
                  <a href="${this.url}">
                    <img
                      src="${this.feature_image}"
                      alt="${this.title}"
                      class="${this.getImageClasses()}"
                    />
                  </a>
                </figure>
              `
            : ""}

          <div class="wc-card__content">
            ${this.author_name
              ? html`
                  <div class="wc-card__author">
                    ${this.author_profile_image
                      ? html`
                          <img
                            src="${this.author_profile_image}"
                            alt="${this.author_name}"
                            class="wc-card__author-image"
                          />
                        `
                      : html`<span class="wc-card__author-bullet"></span>`}
                    <a href="${this.author_url}" class="wc-card__author-link">
                      ${this.author_name}
                    </a>
                  </div>
                `
              : ""}

            <a href="${this.url}" class="wc-card__title-link">
              ${this.renderTitle()}
            </a>

            ${this.density === "normal"
              ? html`<p class="wc-card__excerpt">${this.excerpt}</p>`
              : ""}
            ${this.tag_name && this.density !== "minimal"
              ? html`
                  <div class="wc-card__meta">
                    <span class="wc-card__meta-item">${this.published_at}</span>
                    <span class="wc-card__meta-item">${this.reading_time}</span>
                    <a href="${this.tag_url}" class="wc-card__tag">
                      ${this.tag_name}
                    </a>
                  </div>
                `
              : ""}
          </div>
        </div>
      </div>
    `;
  }
}
