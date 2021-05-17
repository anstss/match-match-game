import { BaseComponent } from '../../shared/base-component';
import { Card } from './card';

export class CardsField extends BaseComponent {
  cards: Card[] = [];

  constructor() {
    super('div', ['game__field']);
  }
}
