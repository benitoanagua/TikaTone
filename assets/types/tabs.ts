export type TabsOrientation = "horizontal" | "vertical";
export type TabsVariant = "default" | "pills" | "underlined";

export interface TabsProps {
  orientation?: TabsOrientation;
  variant?: TabsVariant;
  activeTab?: number;
  disabled?: boolean;
}

export interface TabProps {
  label?: string;
  icon?: string;
  disabled?: boolean;
}

export interface TabPanelProps {
  label?: string;
}

export interface TabChangeEvent extends CustomEvent {
  detail: {
    activeTab: number;
    previousTab: number;
  };
}

export interface TabClickEvent extends CustomEvent {
  detail: {
    index: number;
  };
}

export interface TabRegisterEvent extends CustomEvent {
  detail: {
    index: number;
    label: string;
    disabled: boolean;
  };
}

declare global {
  interface HTMLElementEventMap {
    "tab-change": TabChangeEvent;
    "tab-click": TabClickEvent;
    "tab-register": TabRegisterEvent;
  }
}
