export type AccordionVariant = "default" | "bordered" | "separated";

export interface AccordionProps {
  multiple?: boolean;
  variant?: AccordionVariant;
}

export interface AccordionItemProps {
  title?: string;
  subtitle?: string;
  open?: boolean;
  disabled?: boolean;
}

export interface AccordionChangeEvent extends CustomEvent {
  detail: {
    openItems: number[];
    changedItem: number;
  };
}

export interface AccordionItemToggleEvent extends CustomEvent {
  detail: {
    index: number;
    open: boolean;
  };
}

declare global {
  interface HTMLElementEventMap {
    "accordion-change": AccordionChangeEvent;
    "accordion-item-toggle": AccordionItemToggleEvent;
  }
}
