import { chromium } from "playwright";
import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import type { StorybookCaptureOptions, CaptureResult } from "./types";
import {
  getStoriesByNames,
  validateStorybookUrl,
  generateStoryUrl,
} from "./storybook-utils";

export class VideoCapture {
  private options: Required<StorybookCaptureOptions>;

  constructor(options: StorybookCaptureOptions = {}) {
    this.options = {
      outputDir: options.outputDir || "storybook-videos",
      stories: options.stories || [],
      viewport: options.viewport || { width: 1200, height: 800 },
      delay: options.delay || 1000,
      format: options.format || "mp4",
    };
  }

  async capture(): Promise<CaptureResult> {
    const startTime = Date.now();
    const stories = getStoriesByNames(this.options.stories);
    const outputDir = this.options.outputDir;

    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    console.log("🎬 Iniciando captura de video...");
    console.log(
      `📹 Stories seleccionadas: ${stories.map((s) => s.name).join(", ")}`
    );

    const browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-dev-shm-usage"],
    });

    const context = await browser.newContext({
      viewport: this.options.viewport,
      recordVideo: {
        dir: outputDir,
        size: this.options.viewport,
      },
    });

    const page = await context.newPage();
    const storybookUrl = validateStorybookUrl();

    try {
      // Navegar a la página principal primero
      await page.goto(storybookUrl, { waitUntil: "networkidle" });
      await page.waitForTimeout(1000);

      // Capturar cada story
      for (const story of stories) {
        console.log(`📹 Grabando: ${story.name}`);

        const storyUrl = generateStoryUrl(storybookUrl, story.id);
        await page.goto(storyUrl, { waitUntil: "networkidle" });

        // Esperar a que el componente se renderice
        await page.waitForTimeout(story.delay);

        // Interacciones específicas para cada componente
        await this.performComponentInteractions(page, story.id);
      }

      await context.close();
      await browser.close();

      const duration = Date.now() - startTime;
      const outputPath = join(
        outputDir,
        `storybook-demo-${Date.now()}.${this.options.format}`
      );

      console.log("✅ Video grabado exitosamente");

      return {
        success: true,
        outputPath,
        stories: stories.map((s) => s.name),
        duration,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      await context.close();
      await browser.close();

      console.error("❌ Error durante la captura de video:", error);

      return {
        success: false,
        outputPath: "",
        stories: [],
        duration: Date.now() - startTime,
        timestamp: new Date().toISOString(),
      };
    }
  }

  private async performComponentInteractions(page: any, componentId: string) {
    try {
      switch (componentId) {
        case "carousel":
          // Interactuar con el carousel
          await page.click(".wc-carousel__arrow--next");
          await page.waitForTimeout(1000);
          await page.click(".wc-carousel__arrow--prev");
          await page.waitForTimeout(1000);
          break;

        case "stack":
          // Click en botones del stack
          const stackButtons = await page.$$(".wc-stack__button");
          if (stackButtons.length > 0) {
            await stackButtons[0].click();
            await page.waitForTimeout(1000);
          }
          break;

        case "accordion":
          // Abrir/cerrar accordion
          const accordionHeaders = await page.$$(".wc-accordion-item__header");
          if (accordionHeaders.length > 0) {
            await accordionHeaders[0].click();
            await page.waitForTimeout(1000);
          }
          break;

        case "tabs":
          // Cambiar entre tabs
          const tabButtons = await page.$$(".wc-tab__button");
          if (tabButtons.length > 1) {
            await tabButtons[1].click();
            await page.waitForTimeout(1000);
          }
          break;

        case "theme-toggle":
          // Toggle del tema
          await page.click(".wc-theme-toggle");
          await page.waitForTimeout(1000);
          break;
      }
    } catch (error) {
      console.warn(
        `⚠️  No se pudieron realizar interacciones para ${componentId}:`,
        error instanceof Error ? error.message : String(error)
      );
    }
  }
}

export async function captureVideo(
  options?: StorybookCaptureOptions
): Promise<CaptureResult> {
  const capture = new VideoCapture(options);
  return await capture.capture();
}
