import { LitElement, html, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";
import mainCSS from "../main.css?inline";
import type { ThemeChangeEvent, ThemeMode } from "../types/events.js";

@customElement("wc-theme-toggle")
export class WcThemeToggle extends LitElement {
  static styles = unsafeCSS(mainCSS);

  @state() private currentTheme: ThemeMode = "light";

  connectedCallback() {
    super.connectedCallback();
    this.loadTheme();
  }

  private loadTheme() {
    const savedTheme = localStorage.getItem("wc-theme") as ThemeMode | null;
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    this.currentTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    this.applyTheme(this.currentTheme, false);
  }

  private applyTheme(theme: ThemeMode, dispatchEvent = true) {
    const htmlElement = document.documentElement;

    if (theme === "dark") {
      htmlElement.setAttribute("data-theme", "dark");
      htmlElement.classList.add("dark");
      htmlElement.classList.remove("light");
    } else {
      htmlElement.setAttribute("data-theme", "light");
      htmlElement.classList.add("light");
      htmlElement.classList.remove("dark");
    }

    this.currentTheme = theme;
    localStorage.setItem("wc-theme", theme);

    this.setAttribute("data-theme", theme);

    // Dispatch global event
    if (dispatchEvent) {
      const themeChangeEvent: ThemeChangeEvent = new CustomEvent(
        "theme-change",
        {
          detail: { theme },
        }
      ) as ThemeChangeEvent;

      window.dispatchEvent(themeChangeEvent);
    }
  }

  private toggleTheme() {
    const newTheme = this.currentTheme === "light" ? "dark" : "light";
    this.applyTheme(newTheme);
  }

  private getThemeLabel() {
    return this.currentTheme === "light"
      ? "Switch to dark mode"
      : "Switch to light mode";
  }

  render() {
    const themeLabel = this.getThemeLabel();

    return html`
      <button
        class="wc-theme-toggle"
        @click="${this.toggleTheme}"
        aria-label="${themeLabel}"
        title="${themeLabel}"
        data-theme="${this.currentTheme}"
      >
        ${this.currentTheme === "light"
          ? html`
              <span
                class="wc-theme-toggle-icon icon-[garden--sun-stroke-16]"
              ></span>
            `
          : html`
              <span
                class="wc-theme-toggle-icon icon-[garden--moon-stroke-16]"
              ></span>
            `}

        <!-- Visual mode indicator -->
        <span class="wc-theme-toggle-badge">
          ${this.currentTheme === "light" ? "L" : "D"}
        </span>
      </button>
    `;
  }
}
