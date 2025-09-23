import { html, TemplateResult } from "lit";
import type { CardHeading } from "../types/card.js";

export interface TitleRendererInterface {
  heading: CardHeading;
  title: string;
}

export function TitleRendererMixin<T extends new (...args: any[]) => any>(
  Base: T
) {
  return class extends Base implements TitleRendererInterface {
    heading!: CardHeading;
    title!: string;

    protected getHeadingClass(): string {
      return `m-0 font-medium headline-${this.heading}`;
    }

    protected renderTitle(additionalClasses: string = ""): TemplateResult {
      const titleClass = this.getHeadingClass();
      const fullClass = additionalClasses
        ? `${titleClass} ${additionalClasses}`
        : titleClass;

      // Usar switch en lugar de template dinámico
      switch (this.heading) {
        case 1:
          return html`<h1 class="${fullClass}">${this.title}</h1>`;
        case 2:
          return html`<h2 class="${fullClass}">${this.title}</h2>`;
        case 3:
          return html`<h3 class="${fullClass}">${this.title}</h3>`;
        case 4:
          return html`<h4 class="${fullClass}">${this.title}</h4>`;
        case 5:
          return html`<h5 class="${fullClass}">${this.title}</h5>`;
        case 6:
          return html`<h6 class="${fullClass}">${this.title}</h6>`;
        default:
          return html`<h2 class="${fullClass}">${this.title}</h2>`;
      }
    }
  };
}
