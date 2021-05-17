import { BaseComponent } from '../../shared/base-component';

export class DropdownMenu extends BaseComponent {
  constructor() {
    super('div', ['dropdown-menu']);
    this.element.setAttribute('aria-labelledby', 'cards-type');
  }
}
