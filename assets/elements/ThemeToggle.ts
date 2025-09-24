import { LitElement, html, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";
import mainCSS from "../main.css?inline";

@customElement("wc-theme-toggle")
export class WcThemeToggle extends LitElement {
  static styles = unsafeCSS(mainCSS);

  @state() private currentTheme: "light" | "dark" = "light";

  connectedCallback() {
    super.connectedCallback();
    this.loadTheme();
    this.setAttribute("data-theme", this.currentTheme);
  }

  private loadTheme() {
    const savedTheme = localStorage.getItem("wc-theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    this.currentTheme =
      (savedTheme as "light" | "dark") ||
      (systemPrefersDark ? "dark" : "light");
    this.applyTheme(this.currentTheme, false); // No dispatchar evento en carga inicial
  }

  private applyTheme(theme: "light" | "dark", dispatchEvent = true) {
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
    this.setAttribute("data-theme", theme);
    localStorage.setItem("wc-theme", theme);

    // Disparar evento global para Storybook
    if (dispatchEvent) {
      window.dispatchEvent(
        new CustomEvent("theme-change", {
          detail: { theme },
        })
      );
    }
  }

  private toggleTheme() {
    const newTheme = this.currentTheme === "light" ? "dark" : "light";
    this.applyTheme(newTheme);
  }

  render() {
    const themeLabel =
      this.currentTheme === "light"
        ? "Cambiar a tema oscuro"
        : "Cambiar a tema claro";

    return html`
      <button
        class="wc-theme-toggle"
        @click="${this.toggleTheme}"
        aria-label="${themeLabel}"
        title="${themeLabel}"
      >
        ${this.currentTheme === "light"
          ? html`
              <span
                class="wc-theme-toggle-icon icon-[garden--moon-stroke-16]"
              ></span>
            `
          : html`
              <span
                class="wc-theme-toggle-icon icon-[garden--sun-stroke-16]"
              ></span>
            `}
      </button>
    `;
  }
}
