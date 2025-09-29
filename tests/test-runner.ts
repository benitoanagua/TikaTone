import { execSync } from "child_process";
import { existsSync } from "fs";
import { join } from "path";

interface TestConfig {
  buildFirst?: boolean;
  parallel?: boolean;
  headed?: boolean;
  ui?: boolean;
  pattern?: string;
  timeout?: number;
}

class TestRunner {
  private readonly buildDir = "./public";
  private readonly requiredFiles = [
    "tika-tone-elements.es.js",
    "tika-tone-elements.css",
  ];

  constructor(private config: TestConfig = {}) {}

  async run(): Promise<void> {
    console.log("🧪 TikaTone Component Test Runner");
    console.log("================================\n");

    try {
      if (this.config.buildFirst !== false) {
        await this.ensureBuild();
      }

      await this.validateBuild();
      await this.runTests();

      console.log("\n✅ All tests completed successfully!");
    } catch (error) {
      console.error("\n❌ Test run failed:", (error as Error).message);
      process.exit(1);
    }
  }

  private async ensureBuild(): Promise<void> {
    console.log("📦 Ensuring build artifacts exist...");

    const buildExists = this.requiredFiles.every((file) =>
      existsSync(join(this.buildDir, file))
    );

    if (!buildExists) {
      console.log("🔨 Running build...");
      execSync("npm run build", { stdio: "inherit" });
      console.log("✅ Build completed\n");
    } else {
      console.log("✅ Build artifacts found\n");
    }
  }

  private async validateBuild(): Promise<void> {
    console.log("🔍 Validating build artifacts...");

    for (const file of this.requiredFiles) {
      const filePath = join(this.buildDir, file);
      if (!existsSync(filePath)) {
        throw new Error(`Required build artifact not found: ${file}`);
      }
    }

    console.log("✅ Build artifacts validated\n");
  }

  private async runTests(): Promise<void> {
    console.log("🚀 Running tests...\n");

    const args = this.buildTestArgs();
    const command = `npx playwright test ${args.join(" ")}`;

    console.log(`Command: ${command}\n`);

    execSync(command, { stdio: "inherit" });
  }

  private buildTestArgs(): string[] {
    const args: string[] = [];

    if (this.config.parallel) {
      args.push("--workers=4");
    }

    if (this.config.headed) {
      args.push("--headed");
    }

    if (this.config.ui) {
      args.push("--ui");
    }

    if (this.config.pattern) {
      args.push(`--grep="${this.config.pattern}"`);
    }

    if (this.config.timeout) {
      args.push(`--timeout=${this.config.timeout}`);
    }

    return args;
  }
}

// CLI Interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const config: TestConfig = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case "--no-build":
        config.buildFirst = false;
        break;
      case "--parallel":
        config.parallel = true;
        break;
      case "--headed":
        config.headed = true;
        break;
      case "--ui":
        config.ui = true;
        break;
      case "--pattern":
        config.pattern = args[++i];
        break;
      case "--timeout":
        config.timeout = parseInt(args[++i]);
        break;
      case "--help":
        console.log(`
TikaTone Component Test Runner

Usage: tsx tests/test-runner.ts [options]

Options:
  --no-build      Skip build step
  --parallel      Run tests in parallel
  --headed        Run tests in headed mode
  --ui            Run tests with Playwright UI
  --pattern       Run tests matching pattern
  --timeout       Set test timeout (ms)
  --help          Show this help
        `);
        process.exit(0);
    }
  }

  new TestRunner(config).run().catch((error) => {
    console.error("Test runner failed:", error);
    process.exit(1);
  });
}

// Eliminar o comentar la sección duplicada de ComponentTestSuite
// ya que no se está usando y causa conflictos
