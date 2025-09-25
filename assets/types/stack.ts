export interface StackItem {
  height: number;
  order: number;
  element: HTMLElement;
  title: string;
}

export interface StackProps {
  maxItems?: number;
}

export type StackChangeEvent = CustomEvent<{
  activeItem: number;
  previousItem: number;
}>;
