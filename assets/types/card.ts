export type CardHeading = 1 | 2 | 3 | 4 | 5 | 6;
export type CardDensity = "normal" | "compact" | "minimal";
export type CardMediaAlign = "left" | "right" | "top" | "bottom";
export type CardMediaWidth =
  | "is-half"
  | "is-two-fifths"
  | "is-one-third"
  | "is-one-quarter"
  | "is-one-fifth";
export type CardAspectRatio = "monitor" | "square" | "video";
export type CardElevation = 0 | 1 | 2 | 3;

export interface CardProps {
  title: string;
  url: string;
  excerpt: string;
  feature_image: string;
  tag_name: string;
  tag_url: string;
  author_name: string;
  author_url: string;
  author_profile_image: string;
  reading_time: string;
  published_at: string;
  heading: CardHeading;
  density: CardDensity;
  media_align: CardMediaAlign;
  media_width: CardMediaWidth;
  aspect_ratio: CardAspectRatio;
  elevation: CardElevation;
}
