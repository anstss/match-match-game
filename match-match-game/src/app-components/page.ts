import { BaseComponent } from '../shared/base-component';

export class Page extends BaseComponent {
  constructor() {
    super('div');
    this.element.id = 'page';
  }
}
