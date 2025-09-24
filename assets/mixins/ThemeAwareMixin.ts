import { LitElement, PropertyValues } from "lit";
import { THEME_CSS_VARS, type ThemeCssVar } from "../types/material.js";
import { type ThemeChangeEvent } from "../types/events.js";

export function ThemeAwareMixin<T extends new (...args: any[]) => LitElement>(
  Base: T
) {
  return class ThemeAware extends Base {
    protected currentTheme = "light";
    private themeObserver?: MutationObserver;

    static get properties() {
      return {
        currentTheme: { type: String },
      };
    }

    connectedCallback() {
      super.connectedCallback?.();
      this.setupThemeListener();
      this.updateThemeVars();
    }

    disconnectedCallback() {
      super.disconnectedCallback?.();
      this.cleanupThemeListener();
    }

    updated(changedProperties: PropertyValues) {
      super.updated?.(changedProperties);

      if (changedProperties.has("currentTheme")) {
        this.updateThemeVars();
      }
    }

    private setupThemeListener() {
      window.addEventListener(
        "theme-change",
        this.handleThemeChange as EventListener
      );

      this.themeObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "data-theme"
          ) {
            this.updateThemeVars();
          }
        });
      });

      this.themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });
    }

    private cleanupThemeListener() {
      window.removeEventListener(
        "theme-change",
        this.handleThemeChange as EventListener
      );
      this.themeObserver?.disconnect();
    }

    private handleThemeChange = (event: Event) => {
      const customEvent = event as ThemeChangeEvent;
      this.currentTheme = customEvent.detail?.theme || "light";
      this.updateThemeVars();
    };

    protected updateThemeVars() {
      const themeStyle = this.shadowRoot?.getElementById("theme-vars");
      if (!themeStyle) {
        this.ensureThemeStyleElement();
        return;
      }

      const theme =
        document.documentElement.getAttribute("data-theme") || "light";
      this.currentTheme = theme;

      const computedStyle = getComputedStyle(document.documentElement);

      const cssVars = THEME_CSS_VARS.map((varName: ThemeCssVar) => {
        const value = computedStyle
          .getPropertyValue(`--color-${varName}`)
          .trim();
        return `--color-${varName}: ${value || "#000000"};`;
      }).join("\n");

      themeStyle.textContent = `:host { ${cssVars} }`;
    }

    private ensureThemeStyleElement() {
      if (!this.shadowRoot) return;

      let themeStyle = this.shadowRoot.getElementById("theme-vars");
      if (!themeStyle) {
        themeStyle = document.createElement("style");
        themeStyle.id = "theme-vars";
        this.shadowRoot.appendChild(themeStyle);
      }

      setTimeout(() => this.updateThemeVars(), 0);
    }
  };
}
