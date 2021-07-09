import { BaseComponent } from '../../shared/base-component';

export class ButtonStart extends BaseComponent {
  constructor() {
    super('a', ['btn', 'button']);
    this.initialize();
  }

  initialize() {
    this.element.setAttribute('href', '#game');
    this.element.setAttribute('id', 'button-start');
    this.element.innerText = 'Start game';
  }
}
