import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import mainCSS from "../main.css?inline";

@customElement("wc-accordion")
export class WcAccordion extends LitElement {
  static styles = [unsafeCSS(mainCSS)];

  @property({ type: Boolean }) multiple = false;
  @property({ type: String }) variant: "default" | "bordered" | "separated" =
    "default";

  @state() private openItems = new Set<number>();

  @query("slot") private slotElement?: HTMLSlotElement;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener(
      "accordion-item-toggle",
      this.handleItemToggle as EventListener
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener(
      "accordion-item-toggle",
      this.handleItemToggle as EventListener
    );
  }

  protected firstUpdated() {
    this.updateItems();
  }

  private updateItems() {
    if (!this.slotElement) return;

    const assignedElements = this.slotElement.assignedElements();

    assignedElements.forEach((element, index) => {
      if (
        element instanceof HTMLElement &&
        element.tagName.toLowerCase() === "wc-accordion-item"
      ) {
        element.setAttribute("data-index", index.toString());
        element.setAttribute("data-variant", this.variant);
        element.setAttribute("data-multiple", this.multiple.toString());

        // Set initial state
        const isOpen = this.openItems.has(index);
        if (isOpen) {
          element.setAttribute("open", "");
        } else {
          element.removeAttribute("open");
        }
      }
    });
  }

  private handleItemToggle = (event: CustomEvent) => {
    const { index, open } = event.detail;

    if (open) {
      if (!this.multiple) {
        // Close all other items if multiple is false
        this.openItems.clear();
      }
      this.openItems.add(index);
    } else {
      this.openItems.delete(index);
    }

    this.updateItems();
    this.requestUpdate();

    // Dispatch accordion change event
    this.dispatchEvent(
      new CustomEvent("accordion-change", {
        detail: {
          openItems: Array.from(this.openItems),
          changedItem: index,
        },
        bubbles: true,
      })
    );
  };

  private getAccordionClasses() {
    return [
      "wc-accordion",
      "wc-accordion--flat",
      `wc-accordion--${this.variant}`,
    ].join(" ");
  }

  render() {
    return html`
      <div class="${this.getAccordionClasses()}">
        <slot @slotchange="${this.updateItems}"></slot>
      </div>
    `;
  }
}
