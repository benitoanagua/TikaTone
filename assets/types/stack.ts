export interface StackItem {
  label: string;
  slotName: string;
  bgColor?: string;
  textColor?: string;
  zIndex?: number;
  translateY?: number;
}

export interface StackProps {
  items?: StackItem[];
  direction?: "vertical" | "horizontal";
  spacing?: "none" | "small" | "medium" | "large";
  animationDuration?: number;
  maxVisible?: number;
  reverseOrder?: boolean;
  autoHeight?: boolean;
  shadow?: "none" | "small" | "medium" | "large";
  rounded?: "none" | "small" | "medium" | "large" | "full";
}
