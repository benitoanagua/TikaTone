export type Desktop = 1 | 2 | 3 | 4 | 5 | 6;
export type Mobile = 1 | 2 | 3 | 4 | 5 | 6;
export type Gap = "small" | "medium" | "large";

export interface GrilleProps {
  desktop: Desktop;
  mobile: Mobile;
  gap?: Gap;
}
