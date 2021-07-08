import { BaseComponent } from '../../shared/base-component';

export class DropdownButton extends BaseComponent {
  constructor(text: string) {
    super('button', ['btn', 'button--dropdown', 'dropdown-toggle']);
    this.element.setAttribute('type', 'button');
    this.element.setAttribute('id', 'cards-type');
    this.element.setAttribute('data-toggle', 'dropdown');
    this.element.innerText = `${text}`;
  }
}
