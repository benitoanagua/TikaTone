import type { Plugin } from "vite";
import type { StorybookCaptureOptions } from "./types";
import { captureVideo } from "./video-capture";
import { captureScreenshots } from "./screenshot-capture";

export function storybookCapture(
  options: StorybookCaptureOptions = {}
): Plugin {
  return {
    name: "vite-plugin-storybook-capture",

    configureServer(server) {
      server.middlewares.use("/api/capture/video", async (_req, res) => {
        // ← USAR _req
        try {
          const result = await captureVideo(options);
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(result));
        } catch (error) {
          res.statusCode = 500;
          res.end(
            JSON.stringify({
              error: error instanceof Error ? error.message : String(error), // ← CORREGIR error.message
            })
          );
        }
      });

      server.middlewares.use("/api/capture/screenshots", async (_req, res) => {
        // ← USAR _req
        try {
          const result = await captureScreenshots(options);
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(result));
        } catch (error) {
          res.statusCode = 500;
          res.end(
            JSON.stringify({
              error: error instanceof Error ? error.message : String(error), // ← CORREGIR error.message
            })
          );
        }
      });
    },
  };
}

// Exportar correctamente
export { captureVideo } from "./video-capture";
export { captureScreenshots } from "./screenshot-capture";
