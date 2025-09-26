export interface AccordionProps {
  multiple?: boolean;
  variant?: "default" | "bordered" | "separated";
}

export interface AccordionItemProps {
  open?: boolean;
  disabled?: boolean;
}

export interface AccordionToggleEvent extends CustomEvent {
  detail: {
    index: number;
  };
}

declare global {
  interface HTMLElementEventMap {
    "accordion-toggle": AccordionToggleEvent;
  }
}
