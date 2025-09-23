import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import mainCSS from "../main.css?inline";

@customElement("wc-grille")
export class WcGrille extends LitElement {
  static styles = [unsafeCSS(mainCSS)];

  @property({ type: Number }) desktop = 3;
  @property({ type: Number }) mobile = 2;
  @property({ type: String }) gap = "medium";

  @query("slot", true)
  private slotElement!: HTMLSlotElement;

  @query(".wc-grille__container", true)
  private containerElement!: HTMLElement;

  firstUpdated() {
    this.setupResizeObserver();
    this.gridRendering();
  }

  updated() {
    this.gridRendering();
  }

  setupResizeObserver() {
    if (this.containerElement && window.ResizeObserver) {
      const resizeObserver = new ResizeObserver(() => {
        this.gridRendering();
      });
      resizeObserver.observe(this.containerElement);
    }

    // Fallback para cambios de viewport
    window.addEventListener("resize", () => {
      setTimeout(() => this.gridRendering(), 100);
    });
  }

  grid(breakpoint: number, index: number, length: number) {
    const divInt = Math.floor(length / breakpoint);
    const divMod = length % breakpoint;
    const rows = divMod > 0 ? divInt + 1 : divInt;
    const row = Math.floor(index / breakpoint) + 1;
    const col = index - Math.floor(index / breakpoint) * breakpoint;
    return { rows, row, col };
  }

  gridRendering() {
    if (!this.slotElement || !this.containerElement) return;

    const assignedElements = this.slotElement.assignedElements();

    assignedElements.forEach((element: Element, i: number) => {
      if (!(element instanceof HTMLElement)) return;

      // Reset styles
      element.style.cssText = "";

      const isMobile = window.innerWidth < 768;
      const dsk = this.grid(this.desktop, i, assignedElements.length);
      const mbl = this.grid(this.mobile, i, assignedElements.length);

      const padding =
        this.gap === "small" ? 8 : this.gap === "medium" ? 16 : 24;

      element.style.boxSizing = "content-box";

      // Calcular ancho
      if (isMobile) {
        const widthM = Math.floor(
          (this.containerElement.clientWidth -
            2 * padding * (this.mobile - 1)) /
            this.mobile
        );
        const borderM = (i + 1) % this.mobile !== 0 ? 1 : 0;
        element.style.width = `${widthM - borderM}px`;
      } else {
        const widthd = Math.floor(
          (this.containerElement.clientWidth -
            2 * padding * (this.desktop - 1)) /
            this.desktop
        );
        const borderD = (i + 1) % this.desktop !== 0 ? 1 : 0;
        element.style.width = `${widthd - borderD}px`;
      }

      let hasRightBorder = false;
      let hasBottomBorder = false;
      const borderColor = "var(--color-outline)";

      // Línea derecha
      if (
        (dsk.col < this.desktop - 1 && !isMobile) ||
        (mbl.col < this.mobile - 1 && isMobile)
      ) {
        element.style.paddingRight = `${padding}px`;
        element.style.marginRight = `${padding}px`;
        element.style.borderRight = `1px solid ${borderColor}`;
        hasRightBorder = true;
      }

      // Línea abajo
      if (
        (dsk.row < dsk.rows && !isMobile) ||
        (mbl.row < mbl.rows && isMobile)
      ) {
        element.style.paddingBottom = `${padding}px`;
        element.style.marginBottom = `${padding}px`;
        element.style.borderBottom = `1px solid ${borderColor}`;
        hasBottomBorder = true;
      }

      // Esquina (donde se cruzan las líneas)
      if (hasRightBorder && hasBottomBorder) {
        const gradientSize = Math.round((2 * padding * Math.sqrt(2)) / 4 + 1);
        element.style.borderImage = `linear-gradient(315deg, transparent ${gradientSize}px, ${borderColor} 0) 1`;
      }
    });
  }

  render() {
    return html`
      <div class="wc-grille__container">
        <slot @slotchange=${this.gridRendering}></slot>
      </div>
    `;
  }
}
