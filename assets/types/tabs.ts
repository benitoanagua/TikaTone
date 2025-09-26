export interface TabsProps {
  activeTab?: number;
  disabled?: boolean;
}

export interface TabProps {
  disabled?: boolean;
  active?: boolean;
}

export interface TabPanelProps {
  active?: boolean;
}

export interface TabChangeEvent extends CustomEvent {
  detail: {
    activeTab: number;
    previousTab: number;
  };
}

declare global {
  interface HTMLElementEventMap {
    "tab-change": TabChangeEvent;
  }
}
