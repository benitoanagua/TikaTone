export interface ThemeChangeEvent extends CustomEvent {
  detail: {
    theme: "light" | "dark";
  };
}

declare global {
  interface WindowEventMap {
    "theme-change": ThemeChangeEvent;
  }
}

export type ThemeMode = "light" | "dark";
