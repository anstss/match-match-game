import { BaseComponent } from '../../shared/base-component';

export class Timer extends BaseComponent {
  min = '00';

  sec = '00';

  constructor() {
    super('div', ['timer']);
    this.element.innerHTML = '00:00';
  }
}
