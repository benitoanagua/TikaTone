import type { StorybookConfig } from "@storybook/html-vite";

const config: StorybookConfig = {
  stories: [
    "../assets/stories/**/*.mdx",
    "../assets/stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: ["@storybook/addon-essentials", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/html-vite",
    options: {},
  },
  staticDirs: ["../public"],
  // Configura Vite para observar los archivos public
  viteFinal: async (config) => {
    config.server = {
      ...config.server,
      watch: {
        ...config.server?.watch,
        ignored: ["!**/public/**"], // No ignorar la carpeta public
      },
    };
    return config;
  },
};

export default config;
