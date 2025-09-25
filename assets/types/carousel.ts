export interface CarouselLayout {
  desktop: number;
  mobile: number;
  gap: number;
}

export interface CarouselProps {
  layout?: CarouselLayout;
  interval?: number;
  autoPlay?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
}

export interface CarouselItemProps {
  order?: number;
}

export type CarouselChangeEvent = CustomEvent<{
  currentIndex: number;
  totalSlides: number;
  visibleSlides: number;
}>;

export type CarouselNavigationEvent = CustomEvent<{
  direction: "next" | "prev" | "goto";
  index?: number;
}>;

declare global {
  interface HTMLElementEventMap {
    "carousel-change": CarouselChangeEvent;
    "carousel-navigation": CarouselNavigationEvent;
  }
}
