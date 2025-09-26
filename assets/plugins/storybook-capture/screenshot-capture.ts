import { chromium } from "playwright";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import type { StorybookCaptureOptions, CaptureResult } from "./types";
import {
  getStoriesByNames,
  validateStorybookUrl,
  generateStoryUrl,
} from "./storybook-utils";

export class ScreenshotCapture {
  private options: Required<StorybookCaptureOptions>;

  constructor(options: StorybookCaptureOptions = {}) {
    this.options = {
      outputDir: options.outputDir || "storybook-screenshots",
      stories: options.stories || [],
      viewport: options.viewport || { width: 1200, height: 800 },
      delay: options.delay || 2000,
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

    console.log("📸 Iniciando captura de screenshots...");
    console.log(
      `🖼️  Stories seleccionadas: ${stories.map((s) => s.name).join(", ")}`
    );

    const browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-dev-shm-usage"],
    });

    const context = await browser.newContext({
      viewport: this.options.viewport,
    });

    const page = await context.newPage();
    const storybookUrl = validateStorybookUrl();

    const screenshotResults: Array<{ story: string; path: string }> = [];

    try {
      for (const story of stories) {
        console.log(`📸 Capturando: ${story.name}`);

        const storyUrl = generateStoryUrl(storybookUrl, story.id);
        await page.goto(storyUrl, { waitUntil: "networkidle" });

        await page.waitForTimeout(this.options.delay);

        const screenshotPath = join(
          outputDir,
          `${story.name.toLowerCase()}-${Date.now()}.png`
        );
        await page.screenshot({
          path: screenshotPath,
          fullPage: true,
        });

        screenshotResults.push({
          story: story.name,
          path: screenshotPath,
        });

        console.log(`✅ Screenshot guardado: ${screenshotPath}`);
      }

      await this.generateReport(screenshotResults, outputDir);

      await context.close();
      await browser.close();

      const duration = Date.now() - startTime;

      console.log("✅ Captura de screenshots completada");

      return {
        success: true,
        outputPath: outputDir,
        stories: stories.map((s) => s.name),
        duration,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      await context.close();
      await browser.close();

      console.error(
        "❌ Error durante la captura de screenshots:",
        error instanceof Error ? error.message : String(error)
      );

      return {
        success: false,
        outputPath: "",
        stories: [],
        duration: Date.now() - startTime,
        timestamp: new Date().toISOString(),
      };
    }
  }

  private async generateReport(
    screenshots: Array<{ story: string; path: string }>,
    outputDir: string
  ) {
    const report = {
      generatedAt: new Date().toISOString(),
      totalScreenshots: screenshots.length,
      viewport: this.options.viewport,
      stories: screenshots.map((s) => ({
        name: s.story,
        path: s.path,
        filename: s.path.split("/").pop(),
      })),
    };

    const reportPath = join(outputDir, "screenshots-report.json");
    writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📊 Reporte generado: ${reportPath}`);
  }
}

export async function captureScreenshots(
  options?: StorybookCaptureOptions
): Promise<CaptureResult> {
  const capture = new ScreenshotCapture(options);
  return await capture.capture();
}
