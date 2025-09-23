import type { Preview } from "@storybook/html";

// Importa tus estilos y custom elements
import "../public/tika-tone-elements.css";
import "../public/tika-tone-elements.es.js";

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
