import { LitElement, html, unsafeCSS } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
} from "lit/decorators.js";
import mainCSS from "../main.css?inline";
import type { AccordionProps } from "../types/accordion.js";

@customElement("wc-accordion")
export class WcAccordion extends LitElement implements AccordionProps {
  static styles = [unsafeCSS(mainCSS)];

  @property({ type: Boolean, reflect: true }) multiple = false;
  @property({ type: String }) variant: "default" | "bordered" | "separated" =
    "default";

  @queryAssignedElements({ selector: "wc-accordion-item" })
  private items!: HTMLElement[];

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("accordion-toggle", this.onToggle as EventListener);
  }

  disconnectedCallback() {
    this.removeEventListener(
      "accordion-toggle",
      this.onToggle as EventListener
    );
    super.disconnectedCallback();
  }

  private onToggle(e: CustomEvent<{ index: number }>) {
    const { index } = e.detail;

    this.items.forEach((item, i) => {
      if (i === index) {
        (item as any).open = !(item as any).open;
      } else if (!this.multiple) {
        (item as any).open = false;
      }
    });
  }

  private getAccordionClasses() {
    return [
      "wc-accordion",
      "wc-accordion--flat",
      `wc-accordion--${this.variant}`,
    ].join(" ");
  }

  render() {
    return html`<div class="${this.getAccordionClasses()}"><slot></slot></div>`;
  }
}
