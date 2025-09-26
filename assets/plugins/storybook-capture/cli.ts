#!/usr/bin/env node

import { captureVideo } from "./video-capture";
import { captureScreenshots } from "./screenshot-capture";
import { Command } from "commander";

const program = new Command();

program
  .name("storybook-capture")
  .description("CLI para capturar videos y screenshots de Storybook")
  .version("1.0.0");

// Comando para video
program
  .command("video")
  .description("Capturar video de las stories")
  .option(
    "-s, --stories <stories...>",
    "Stories a capturar (ej: card overlay stack)"
  )
  .option("-o, --output-dir <dir>", "Directorio de salida", "storybook-videos")
  .option("-d, --delay <ms>", "Delay entre stories", "1000")
  .option("-f, --format <format>", "Formato de video", "mp4")
  .action(async (options) => {
    console.log("🎬 Iniciando captura de video...");

    const result = await captureVideo({
      stories: options.stories,
      outputDir: options.outputDir,
      delay: parseInt(options.delay),
      format: options.format as any,
    });

    if (result.success) {
      console.log(`✅ Video guardado en: ${result.outputPath}`);
      console.log(`⏱️  Duración: ${result.duration}ms`);
      console.log(`📹 Stories: ${result.stories.join(", ")}`);
    } else {
      console.error("❌ Error en la captura de video");
      process.exit(1);
    }
  });

// Comando para screenshots
program
  .command("screenshots")
  .description("Capturar screenshots de todas las stories")
  .option("-s, --stories <stories...>", "Stories a capturar")
  .option(
    "-o, --output-dir <dir>",
    "Directorio de salida",
    "storybook-screenshots"
  )
  .option("-d, --delay <ms>", "Delay antes de capturar", "2000")
  .action(async (options) => {
    console.log("📸 Iniciando captura de screenshots...");

    const result = await captureScreenshots({
      stories: options.stories,
      outputDir: options.outputDir,
      delay: parseInt(options.delay),
    });

    if (result.success) {
      console.log(`✅ Screenshots guardados en: ${result.outputPath}`);
      console.log(`📊 Total: ${result.stories.length} stories`);
      console.log(`🖼️  Stories: ${result.stories.join(", ")}`);
    } else {
      console.error("❌ Error en la captura de screenshots");
      process.exit(1);
    }
  });

// Comando interactivo
program
  .command("interactive")
  .description("Modo interactivo para seleccionar stories")
  .action(async () => {
    const inquirer = await import("inquirer");

    const { storyType } = await inquirer.default.prompt([
      {
        type: "list",
        name: "storyType",
        message: "¿Qué tipo de captura deseas?",
        choices: [
          { name: "🎬 Video de stories específicas", value: "video" },
          { name: "📸 Screenshots de todas las stories", value: "screenshots" },
        ],
      },
    ]);

    const { selectedStories } = await inquirer.default.prompt([
      {
        type: "checkbox",
        name: "selectedStories",
        message: "Selecciona las stories a capturar:",
        choices: [
          { name: "Card", value: "card" },
          { name: "Overlay", value: "overlay" },
          { name: "Stack", value: "stack" },
          { name: "Carousel", value: "carousel" },
          { name: "Grille", value: "grille" },
          { name: "Navbar", value: "navbar" },
          { name: "ThemeToggle", value: "theme-toggle" },
          { name: "Accordion", value: "accordion" },
          { name: "Tabs", value: "tabs" },
          { name: "Slideshow", value: "slideshow" },
        ],
      },
    ]);

    if (storyType === "video") {
      await captureVideo({ stories: selectedStories });
    } else {
      await captureScreenshots({ stories: selectedStories });
    }
  });

program.parse();
