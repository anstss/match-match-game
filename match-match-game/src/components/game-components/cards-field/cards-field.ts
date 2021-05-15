import './cards-field.scss';
import { BaseComponent } from '../../base-component';
import { Card } from '../card/card';

const TIME_SHOW_CARDS_BEFORE_GAME = 5000;

export class CardsField extends BaseComponent {
  private cards: Card[] = [];

  constructor() {
    super('div', ['cards-field']);
  }

  clear() {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards(cards: Card[]) {
    this.cards = cards;
    this.cards.forEach(card => this.element.appendChild(card.element));
    setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack())
    }, TIME_SHOW_CARDS_BEFORE_GAME);
  }
}