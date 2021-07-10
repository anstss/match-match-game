import { BaseComponent } from '../../shared/base-component';

export class DropdownMenu extends BaseComponent {
  constructor() {
    super('div', ['dropdown-menu']);
    this.initialize();
  }

  initialize() {
    this.element.setAttribute('aria-labelledby', 'cards-type');
  }
}
