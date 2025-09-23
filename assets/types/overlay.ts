import type { CardHeading, CardAspectRatio } from "./card.js";

export type OverlayAlign = "start" | "center" | "end";
export type OverlayPosition = "top" | "center" | "bottom";
export type OverlayFill = "full" | "gradient" | "none";
export type OverlayBox = "border" | "background" | "transparent";

export interface OverlayProps {
  title?: string;
  url?: string;
  feature_image?: string;
  tag_name?: string;
  author_name?: string;
  published_at?: string;
  reading_time?: string;
  aspect_ratio?: CardAspectRatio;
  heading?: CardHeading;
  align?: OverlayAlign;
  position?: OverlayPosition;
  box?: OverlayBox;
  fill?: OverlayFill;
}
