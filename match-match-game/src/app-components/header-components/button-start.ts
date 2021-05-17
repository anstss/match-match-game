import { BaseComponent } from '../../shared/base-component';

export class ButtonStart extends BaseComponent {
  constructor() {
    super('a', ['btn', 'button']);
    this.element.setAttribute('href', '#game');
    this.element.innerText = 'Start game';
  }
}
