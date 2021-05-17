import { BaseComponent } from "../../shared/base-component";

export class Timer extends BaseComponent {
  constructor() {
    super('div', ['timer']);
    this.element.innerHTML = `00:00`;
  }
}