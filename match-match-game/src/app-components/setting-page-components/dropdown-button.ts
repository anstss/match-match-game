import { BaseComponent } from '../../shared/base-component';

export class DropdownButton extends BaseComponent {
  constructor(readonly text: string) {
    super('button', ['btn', 'button--dropdown', 'dropdown-toggle']);
    this.initialize();
  }

  initialize() {
    this.element.setAttribute('type', 'button');
    this.element.setAttribute('id', 'cards-type');
    this.element.setAttribute('data-toggle', 'dropdown');
    this.element.innerText = `${this.text}`;
  }
}
