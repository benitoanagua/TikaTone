export interface SlideshowProps {
  showNav?: boolean;
  modal?: boolean;
  interval?: number;
  autoPlay?: boolean;
  showIndicators?: boolean;
}

export interface SlideshowItemProps {
  order?: number;
}

export type SlideshowChangeEvent = CustomEvent<{
  currentIndex: number;
  totalSlides: number;
}>;

export type SlideshowNavigationEvent = CustomEvent<{
  direction: "next" | "prev" | "goto";
  index?: number;
}>;

declare global {
  interface HTMLElementEventMap {
    "slideshow-change": SlideshowChangeEvent;
    "slideshow-navigation": SlideshowNavigationEvent;
  }
}
