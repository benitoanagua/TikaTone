import { LitElement, html, unsafeCSS } from "lit";
import {
  customElement,
  property,
  state,
  queryAssignedElements,
} from "lit/decorators.js";
import mainCSS from "../main.css?inline";
import type { TabsProps, TabChangeEvent } from "../types/tabs.js";

@customElement("wc-tabs")
export class WcTabs extends LitElement implements TabsProps {
  static styles = [unsafeCSS(mainCSS)];

  @property({ type: Number, attribute: "active-tab" }) activeTab = 0;
  @property({ type: Boolean, reflect: true }) disabled = false;

  @state() private selected = 0;

  @queryAssignedElements({ slot: "tabs", selector: "wc-tab" })
  private tabElements!: Element[];

  @queryAssignedElements({ slot: "panels", selector: "wc-tab-panel" })
  private panelElements!: Element[];

  connectedCallback() {
    super.connectedCallback();
    this.selected = this.activeTab;
  }

  protected firstUpdated() {
    this.updateTabs();
  }

  protected updated(changedProperties: Map<string, any>) {
    if (changedProperties.has("activeTab")) {
      this.selected = this.activeTab;
      this.updateTabs();
    }
  }

  private onSelect(index: number) {
    if (this.disabled || index === this.selected) return;

    const previousTab = this.selected;
    this.selected = index;
    this.updateTabs();

    this.dispatchEvent(
      new CustomEvent("tab-change", {
        detail: { activeTab: this.selected, previousTab },
        bubbles: true,
        composed: true,
      }) as TabChangeEvent
    );
  }

  private updateTabs() {
    // Update tabs - ahora usamos la propiedad 'active'
    this.tabElements.forEach((tab, index) => {
      const isActive = index === this.selected;

      // Actualizar la propiedad 'active' del tab
      (tab as any).active = isActive;

      if (this.disabled) {
        (tab as any).disabled = true;
      } else {
        (tab as any).disabled = false;
      }
    });

    // Update panels
    this.panelElements.forEach((panel, index) => {
      (panel as any).active = index === this.selected;
    });
  }

  private handleTabClick(e: Event) {
    const target = e.target as Element;
    const tab = target.closest("wc-tab");

    if (tab && !this.disabled) {
      const index = this.tabElements.indexOf(tab);
      if (index > -1) {
        this.onSelect(index);
      }
    }
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (this.disabled) return;

    const key = e.key;
    let newIndex = this.selected;

    switch (key) {
      case "ArrowLeft":
        e.preventDefault();
        newIndex =
          this.selected > 0 ? this.selected - 1 : this.tabElements.length - 1;
        break;
      case "ArrowRight":
        e.preventDefault();
        newIndex =
          this.selected < this.tabElements.length - 1 ? this.selected + 1 : 0;
        break;
      case "Home":
        e.preventDefault();
        newIndex = 0;
        break;
      case "End":
        e.preventDefault();
        newIndex = this.tabElements.length - 1;
        break;
      default:
        return;
    }

    if (newIndex !== this.selected) {
      this.onSelect(newIndex);
      (this.tabElements[newIndex] as HTMLElement)?.focus();
    }
  }

  render() {
    return html`
      <div class="wc-tabs">
        <div
          class="wc-tabs__header"
          role="tablist"
          @click="${this.handleTabClick}"
          @keydown="${this.handleKeyDown}"
        >
          <slot name="tabs"></slot>
        </div>

        <div class="wc-tabs__content">
          <slot name="panels"></slot>
        </div>
      </div>
    `;
  }
}
