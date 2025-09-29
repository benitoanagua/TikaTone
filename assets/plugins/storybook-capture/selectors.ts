export const COMPONENT_SELECTORS = {
  themeToggle: {
    button: "wc-theme-toggle button",
    fallback: "button[data-theme]",
  },
  accordion: {
    header: "wc-accordion-item button.wc-accordion-item__header",
    firstHeader:
      "wc-accordion-item:first-child button.wc-accordion-item__header",
    fallback: "button[aria-expanded]",
  },
  tabs: {
    button: "wc-tab .wc-tab__button",
    secondButton: "wc-tab:nth-child(2) .wc-tab__button",
    fallback: '[role="tab"] button',
  },
  carousel: {
    next: ".wc-carousel__arrow--next",
    prev: ".wc-carousel__arrow--prev",
    fallback: 'button[aria-label*="next"]',
  },
  stack: {
    button: ".wc-stack__button",
    firstButton: ".wc-stack__button:first-child",
    fallback: "button",
  },
};

export async function safeClick(
  page: any,
  selectors: string[],
  timeout = 10000
) {
  for (const selector of selectors) {
    try {
      const element = await page.waitForSelector(selector, {
        timeout: Math.min(timeout, 5000),
        state: "visible",
      });
      if (element) {
        // Intentar click normal primero
        try {
          await element.click({ timeout: 2000 });
          return true;
        } catch {
          // Fallback a click forzado
          await element.click({ force: true });
          return true;
        }
      }
    } catch (error) {
      continue;
    }
  }
  console.warn(
    `No se pudo hacer click en ningún selector: ${selectors.join(", ")}`
  );
  return false;
}
