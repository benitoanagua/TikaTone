import type { Preview } from "@storybook/html";

import "../public/tika-tone-elements.css";
import "../public/tika-tone-elements.es.js";

const applyTheme = () => {
  const savedTheme = localStorage.getItem("wc-theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const theme = savedTheme || (systemPrefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
};

applyTheme();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: "color-contrast",
            reviewOnFail: true,
          },
        ],
      },
    },
    options: {
      storySort: {
        order: ["Intro", "Components", "*"],
      },
    },
  },
};

export default preview;
