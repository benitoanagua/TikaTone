export interface StorybookCaptureOptions {
  outputDir?: string;
  stories?: string[];
  viewport?: { width: number; height: number };
  delay?: number;
  format?: "mp4" | "gif" | "webm";
}

export interface StoryConfig {
  id: string;
  name: string;
  delay: number;
  interactions?: string[];
}

export interface CaptureResult {
  success: boolean;
  outputPath: string;
  stories: string[];
  duration: number;
  timestamp: string;
}
