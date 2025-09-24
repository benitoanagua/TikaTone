import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming";

const systemPrefersDark =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
    : false;

const theme = create({
  base: systemPrefersDark ? "dark" : "light",
  brandTitle: "TikaTone Components",
  brandUrl: "/",
});

addons.setConfig({
  theme,
});
