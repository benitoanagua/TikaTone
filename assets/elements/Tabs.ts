import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import mainCSS from "../main.css?inline";

@customElement("wc-tabs")
export class WcTabs extends LitElement {
  static styles = [unsafeCSS(mainCSS)];

  @property({ type: String }) orientation: "horizontal" | "vertical" =
    "horizontal";
  @property({ type: String }) variant: "default" | "pills" | "underlined" =
    "default";
  @property({ type: Number, attribute: "active-tab" }) activeTab = 0;
  @property({ type: Boolean }) disabled = false;

  @state() private tabCount = 0;
  @state() private tabs: Array<{
    label: string;
    disabled: boolean;
    index: number;
  }> = [];

  @query("slot[name='tabs']") private tabsSlotElement?: HTMLSlotElement;
  @query("slot[name='panels']") private panelsSlotElement?: HTMLSlotElement;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener(
      "tab-register",
      this.handleTabRegister as EventListener
    );
    this.addEventListener("tab-click", this.handleTabClick as EventListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener(
      "tab-register",
      this.handleTabRegister as EventListener
    );
    this.removeEventListener("tab-click", this.handleTabClick as EventListener);
  }

  protected firstUpdated() {
    this.updateTabsAndPanels();
  }

  private updateTabsAndPanels() {
    this.updateTabs();
    this.updatePanels();
  }

  private updateTabs() {
    if (!this.tabsSlotElement) return;

    const assignedElements = this.tabsSlotElement.assignedElements();
    this.tabCount = assignedElements.length;

    assignedElements.forEach((element, index) => {
      if (
        element instanceof HTMLElement &&
        element.tagName.toLowerCase() === "wc-tab"
      ) {
        element.setAttribute("data-index", index.toString());
        element.setAttribute("data-orientation", this.orientation);
        element.setAttribute("data-variant", this.variant);
        element.setAttribute(
          "data-active",
          (index === this.activeTab).toString()
        );

        if (this.disabled) {
          element.setAttribute("disabled", "");
        }
      }
    });
  }

  private updatePanels() {
    if (!this.panelsSlotElement) return;

    const assignedElements = this.panelsSlotElement.assignedElements();

    assignedElements.forEach((element, index) => {
      if (
        element instanceof HTMLElement &&
        element.tagName.toLowerCase() === "wc-tab-panel"
      ) {
        element.setAttribute("data-index", index.toString());
        element.setAttribute(
          "data-active",
          (index === this.activeTab).toString()
        );
      }
    });
  }

  private handleTabRegister = (event: CustomEvent) => {
    const { index, label, disabled } = event.detail;
    this.tabs[index] = { label, disabled, index };
    this.requestUpdate();
  };

  private handleTabClick = (event: CustomEvent) => {
    const { index } = event.detail;
    if (this.disabled || index === this.activeTab) return;

    this.setActiveTab(index);
  };

  private setActiveTab(index: number) {
    if (index < 0 || index >= this.tabCount) return;

    const oldIndex = this.activeTab;
    this.activeTab = index;

    this.updateTabsAndPanels();

    // Dispatch tab change event
    this.dispatchEvent(
      new CustomEvent("tab-change", {
        detail: {
          activeTab: this.activeTab,
          previousTab: oldIndex,
        },
        bubbles: true,
      })
    );
  }

  private handleKeyDown(event: KeyboardEvent, index: number) {
    if (this.disabled) return;

    const isHorizontal = this.orientation === "horizontal";
    let newIndex = index;

    switch (event.key) {
      case "ArrowLeft":
        if (isHorizontal) {
          event.preventDefault();
          newIndex = index > 0 ? index - 1 : this.tabCount - 1;
        }
        break;
      case "ArrowRight":
        if (isHorizontal) {
          event.preventDefault();
          newIndex = index < this.tabCount - 1 ? index + 1 : 0;
        }
        break;
      case "ArrowUp":
        if (!isHorizontal) {
          event.preventDefault();
          newIndex = index > 0 ? index - 1 : this.tabCount - 1;
        }
        break;
      case "ArrowDown":
        if (!isHorizontal) {
          event.preventDefault();
          newIndex = index < this.tabCount - 1 ? index + 1 : 0;
        }
        break;
      case "Home":
        event.preventDefault();
        newIndex = 0;
        break;
      case "End":
        event.preventDefault();
        newIndex = this.tabCount - 1;
        break;
    }

    if (newIndex !== index) {
      this.setActiveTab(newIndex);
    }
  }

  private getTabsClasses() {
    return [
      "wc-tabs",
      "wc-tabs--flat",
      `wc-tabs--${this.orientation}`,
      `wc-tabs--${this.variant}`,
      this.disabled ? "wc-tabs--disabled" : "",
    ]
      .filter(Boolean)
      .join(" ");
  }

  render() {
    return html`
      <div class="${this.getTabsClasses()}">
        <div
          class="wc-tabs__header"
          role="tablist"
          aria-orientation="${this.orientation}"
        >
          <slot name="tabs" @slotchange="${this.updateTabsAndPanels}"></slot>
        </div>

        <div class="wc-tabs__content">
          <slot name="panels" @slotchange="${this.updateTabsAndPanels}"></slot>
        </div>
      </div>
    `;
  }
}
