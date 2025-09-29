import { test, expect } from "@playwright/test";

test.describe("Component Diagnostics", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.setContent(`
      <html>
        <head>
          <link rel="stylesheet" href="/tika-tone-elements.css">
        </head>
        <body>
          <div id="test-container"></div>
          <script type="module" src="/tika-tone-elements.es.js"></script>
        </body>
      </html>
    `);
    await page.waitForLoadState("networkidle");
  });

  test("should diagnose clickability issues for all components", async ({
    page,
  }) => {
    const components = [
      { name: "accordion", selector: "wc-accordion" },
      { name: "tabs", selector: "wc-tabs" },
      { name: "theme-toggle", selector: "wc-theme-toggle" },
      { name: "card", selector: "wc-card" },
      { name: "carousel", selector: "wc-carousel" },
      { name: "grille", selector: "wc-grille" },
      { name: "navbar", selector: "wc-navbar" },
      { name: "offcanvas", selector: "wc-offcanvas" },
      { name: "overlay", selector: "wc-overlay" },
      { name: "slideshow", selector: "wc-slideshow" },
      { name: "stack", selector: "wc-stack" },
    ];

    const diagnosticResults = [];

    for (const component of components) {
      console.log(`\n=== Diagnóstico de ${component.name} ===`);

      // Crear componente de prueba
      await page.evaluate((comp) => {
        const container = document.getElementById("test-container");
        let html = "";

        switch (comp.name) {
          case "accordion":
            html = `
              <wc-accordion>
                <wc-accordion-item>
                  <span slot="header">Test Item</span>
                  <p>Test content</p>
                </wc-accordion-item>
              </wc-accordion>
            `;
            break;
          case "tabs":
            html = `
              <wc-tabs>
                <wc-tab slot="tabs">Tab 1</wc-tab>
                <wc-tab-panel slot="panels">Panel 1</wc-tab-panel>
              </wc-tabs>
            `;
            break;
          case "card":
            html = `<wc-card title="Test Card"></wc-card>`;
            break;
          case "carousel":
            html = `
              <wc-carousel>
                <wc-carousel-item>Item 1</wc-carousel-item>
              </wc-carousel>
            `;
            break;
          case "grille":
            html = `
              <wc-grille>
                <wc-grille-item>Item 1</wc-grille-item>
              </wc-grille>
            `;
            break;
          case "navbar":
            html = `
              <wc-navbar>
                <div slot="logo">Logo</div>
                <div slot="navigation">Nav</div>
                <div slot="actions">Actions</div>
              </wc-navbar>
            `;
            break;
          case "stack":
            html = `
              <wc-stack>
                <wc-stack-item title="Item 1">Content 1</wc-stack-item>
              </wc-stack>
            `;
            break;
          default:
            html = `<${comp.selector}></${comp.selector}>`;
        }

        container!.innerHTML = html;
      }, component);

      await page.waitForTimeout(500); // Esperar renderizado

      // Verificar que el componente existe
      const componentElement = await page.$(component.selector);
      const exists = componentElement !== null;

      console.log(
        `${component.selector}: ${exists ? "✅ Encontrado" : "❌ No encontrado"}`
      );

      // Buscar elementos clickeables dentro del componente
      const clickableElements = await page.$$eval(
        `${component.selector} button, ${component.selector} [role="button"], ${component.selector} [tabindex="0"]`,
        (elements) =>
          elements.map((el) => ({
            tagName: el.tagName.toLowerCase(),
            classes: el.className,
            role: el.getAttribute("role"),
            tabindex: el.getAttribute("tabindex"),
            text: el.textContent?.trim().slice(0, 50) || "",
            isVisible: !!el.getClientRects().length, // Usar getClientRects en lugar de offsetWidth/Height
          }))
      );

      console.log(
        `Elementos clickeables encontrados: ${clickableElements.length}`
      );

      // Verificar funcionalidad de cada elemento clickeable
      const functionalityResults = [];
      for (let i = 0; i < clickableElements.length; i++) {
        const selector = `${component.selector} button, ${component.selector} [role="button"], ${component.selector} [tabindex="0"]`;
        const elements = await page.$$(selector);

        if (elements[i]) {
          const isVisible = await elements[i].isVisible();
          const isEnabled = await elements[i].isEnabled();
          const boundingBox = await elements[i].boundingBox();

          console.log(
            `- ${clickableElements[i].tagName} (${clickableElements[i].classes}): visible=${isVisible}, enabled=${isEnabled}`
          );

          // Probar click si está habilitado y visible
          if (isVisible && isEnabled && boundingBox) {
            try {
              await elements[i].click();
              await page.waitForTimeout(100);
              functionalityResults.push({
                element: clickableElements[i],
                clickable: true,
                error: null,
              });
            } catch (error: any) {
              // Type assertion para error
              functionalityResults.push({
                element: clickableElements[i],
                clickable: false,
                error: error.message,
              });
            }
          }
        }
      }

      diagnosticResults.push({
        component: component.name,
        exists,
        clickableElements: clickableElements.length,
        functionalityResults,
        issues: functionalityResults.filter((r) => !r.clickable).length,
      });

      // Limpiar contenedor para el siguiente componente
      await page.evaluate(() => {
        const container = document.getElementById("test-container");
        container!.innerHTML = "";
      });
    }

    // Generar reporte final
    console.log("\n=== REPORTE DE DIAGNÓSTICO FINAL ===");
    diagnosticResults.forEach((result) => {
      console.log(
        `${result.component}: ${result.exists ? "✅" : "❌"} ${result.clickableElements} clickeables, ${result.issues} problemas`
      );
    });

    // Verificar que al menos los componentes principales existen
    const criticalComponents = ["accordion", "tabs", "theme-toggle", "card"];
    const criticalResults = diagnosticResults.filter((r) =>
      criticalComponents.includes(r.component)
    );

    criticalResults.forEach((result) => {
      expect(result.exists).toBeTruthy();
    });
  });

  test("should verify ARIA attributes and accessibility", async ({ page }) => {
    const testComponents = [
      {
        name: "accordion",
        html: `
        <wc-accordion>
          <wc-accordion-item>
            <span slot="header">Accessibility Test</span>
            <p>Test content</p>
          </wc-accordion-item>
        </wc-accordion>
      `,
      },
      {
        name: "tabs",
        html: `
        <wc-tabs>
          <wc-tab slot="tabs">Tab 1</wc-tab>
          <wc-tab slot="tabs">Tab 2</wc-tab>
          <wc-tab-panel slot="panels">Panel 1</wc-tab-panel>
          <wc-tab-panel slot="panels">Panel 2</wc-tab-panel>
        </wc-tabs>
      `,
      },
    ];

    for (const comp of testComponents) {
      await page.evaluate((html) => {
        const container = document.getElementById("test-container");
        container!.innerHTML = html;
      }, comp.html);

      await page.waitForTimeout(300);

      // Verificar atributos ARIA básicos
      const buttons = await page.$$eval("button", (elements) =>
        elements.map((el) => ({
          hasAriaLabel: el.hasAttribute("aria-label"),
          hasAriaExpanded: el.hasAttribute("aria-expanded"),
          hasAriaSelected: el.hasAttribute("aria-selected"),
          hasRole: el.hasAttribute("role"),
          tagName: el.tagName,
          className: el.className,
        }))
      );

      console.log(`\n=== ARIA Attributes for ${comp.name} ===`);
      buttons.forEach((btn) => {
        console.log(`${btn.tagName}.${btn.className}:`);
        console.log(`  aria-label: ${btn.hasAriaLabel ? "✅" : "❌"}`);
        console.log(`  aria-expanded: ${btn.hasAriaExpanded ? "✅" : "❌"}`);
        console.log(`  aria-selected: ${btn.hasAriaSelected ? "✅" : "❌"}`);
        console.log(`  role: ${btn.hasRole ? "✅" : "❌"}`);
      });

      // Verificar que los elementos interactivos tengan los atributos ARIA necesarios
      const interactiveElements = buttons.filter(
        (btn) =>
          btn.className.includes("accordion") || btn.className.includes("tab")
      );

      interactiveElements.forEach((element) => {
        expect(element.hasRole).toBeTruthy();
      });
    }
  });

  test("should test responsive behavior", async ({ page }) => {
    const responsiveComponents = [
      {
        name: "grille",
        html: `
        <wc-grille desktop="3" mobile="1">
          <wc-grille-item>Item 1</wc-grille-item>
          <wc-grille-item>Item 2</wc-grille-item>
          <wc-grille-item>Item 3</wc-grille-item>
        </wc-grille>
      `,
      },
      {
        name: "navbar",
        html: `
        <wc-navbar>
          <div slot="logo">Logo</div>
          <div slot="navigation">
            <nav class="hidden md:flex">Desktop Nav</nav>
            <wc-offcanvas class="md:hidden">Mobile Nav</wc-offcanvas>
          </div>
        </wc-navbar>
      `,
      },
    ];

    const viewports = [
      { width: 375, height: 667, name: "mobile" },
      { width: 768, height: 1024, name: "tablet" },
      { width: 1200, height: 800, name: "desktop" },
    ];

    for (const comp of responsiveComponents) {
      console.log(`\n=== Responsive Test for ${comp.name} ===`);

      for (const viewport of viewports) {
        await page.setViewportSize(viewport);

        await page.evaluate((html) => {
          const container = document.getElementById("test-container");
          container!.innerHTML = html;
        }, comp.html);

        await page.waitForTimeout(500);

        const isVisible = await page.$eval(
          comp.name === "grille" ? "wc-grille" : "wc-navbar",
          (el) => !!(el.offsetWidth || el.offsetHeight)
        );

        console.log(
          `${viewport.name} (${viewport.width}x${viewport.height}): ${isVisible ? "✅ Visible" : "❌ Not visible"}`
        );

        expect(isVisible).toBeTruthy();
      }
    }
  });

  test("should measure performance metrics", async ({ page }) => {
    // Test de tiempo de renderizado
    const startTime = Date.now();

    await page.evaluate(() => {
      const container = document.getElementById("test-container");
      // Crear múltiples componentes para medir rendimiento
      container!.innerHTML = `
        <div>
          ${Array(5)
            .fill(0)
            .map(
              () => `
            <wc-card title="Performance Test Card"></wc-card>
          `
            )
            .join("")}
        </div>
      `;
    });

    await page.waitForSelector("wc-card", { timeout: 5000 });
    const renderTime = Date.now() - startTime;

    console.log(`\n=== Performance Metrics ===`);
    console.log(`Render time for 5 cards: ${renderTime}ms`);

    // El tiempo de renderizado debería ser razonable (menos de 2 segundos)
    expect(renderTime).toBeLessThan(2000);

    // Test de interactividad después del renderizado
    const cards = await page.$$("wc-card");
    expect(cards.length).toBe(5);

    // Verificar que los cards son interactivos
    for (const card of cards) {
      const isVisible = await card.isVisible();
      expect(isVisible).toBeTruthy();
    }
  });
});
