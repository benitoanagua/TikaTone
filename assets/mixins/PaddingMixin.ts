import type { CardHeading } from "../types/card.js";

export interface PaddingMixinInterface {
  heading: CardHeading;
}

export function PaddingMixin<T extends new (...args: any[]) => any>(Base: T) {
  return class extends Base implements PaddingMixinInterface {
    heading!: CardHeading;

    protected getPaddingClass(): string {
      const paddingMap: Record<CardHeading, string> = {
        1: "p-6",
        2: "p-5",
        3: "p-4",
        4: "p-3",
        5: "p-2",
        6: "p-1",
      };
      return paddingMap[this.heading] || "p-3";
    }
  };
}
