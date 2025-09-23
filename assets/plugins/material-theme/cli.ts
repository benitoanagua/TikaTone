import { generateThemeFiles } from "./theme-generator";

const root = process.cwd();
const outputDir = "assets/styles";

console.log("👹 TikaTone - Generating Material Design theme...\n");
generateThemeFiles(root, outputDir);
