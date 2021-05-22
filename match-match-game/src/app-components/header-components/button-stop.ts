import { BaseComponent } from '../../shared/base-component';

export class ButtonStop extends BaseComponent {
  constructor() {
    super('button', ['btn', 'button', 'hidden']);
    this.element.setAttribute('id', 'button-stop');
    this.element.innerText = 'Stop game';
  }
}
