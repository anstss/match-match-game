import { BaseComponent } from '../../shared/base-component';

export class ButtonStop extends BaseComponent {
  constructor() {
    super('a', ['btn', 'button', 'hidden']);
    this.element.setAttribute('id', 'button-stop');
    this.element.setAttribute('href', '#about');
    this.element.innerText = 'Stop game';
  }
}
