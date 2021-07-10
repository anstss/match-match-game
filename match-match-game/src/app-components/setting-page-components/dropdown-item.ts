import { BaseComponent } from '../../shared/base-component';

export class DropdownItem extends BaseComponent {
  constructor(option: string) {
    super('div', ['dropdown-item']);
    this.element.innerText = `${option}`;
  }

  getDropdownItem() {
    return this.element;
  }
}
