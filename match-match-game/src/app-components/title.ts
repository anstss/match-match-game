import { BaseComponent } from "../shared/base-component";

export class Title extends BaseComponent {
  constructor(title: string, style: string[]) {
    super('h2', ['main-title', ...style]);
    this.element.innerHTML = title;
  }
}