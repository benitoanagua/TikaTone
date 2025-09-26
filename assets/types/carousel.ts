export interface CarouselProps {
  desktop: number;
  mobile: number;
  gap: "none" | "small" | "medium" | "large" | "xlarge";
  interval?: number;
  autoPlay?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
}

export interface CarouselItemProps {
  order?: number;
  active?: boolean;
}

export type CarouselChangeEvent = CustomEvent<{
  currentIndex: number;
  totalSlides: number;
  visibleSlides: number;
  isAtStart: boolean;
  isAtEnd: boolean;
}>;

export type CarouselNavigationEvent = CustomEvent<{
  direction: "next" | "prev" | "goto";
  index?: number;
  timestamp: number;
}>;

declare global {
  interface HTMLElementEventMap {
    "carousel-change": CarouselChangeEvent;
    "carousel-navigation": CarouselNavigationEvent;
  }
}
