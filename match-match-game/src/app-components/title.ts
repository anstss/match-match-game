import { BaseComponent } from '../shared/base-component';

export class Title extends BaseComponent {
  constructor(readonly title: string, readonly style: string[]) {
    super('h2', ['main-title', ...style]);
    this.initialize();
  }

  initialize() {
    this.element.innerHTML = this.title;
  }
}
