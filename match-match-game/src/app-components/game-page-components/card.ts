import { BaseComponent } from '../../shared/base-component';

export class Card extends BaseComponent {
  isFlipped = false;
  correct: BaseComponent;
  incorrect: BaseComponent;
  card: BaseComponent;
  cardFrontSide: BaseComponent;
  cardBackSide: BaseComponent;

  constructor(readonly image: string) {
    super('div', ['card__container', 'card-hover-inactive']);
    this.correct = new BaseComponent('div', ['correct', 'hidden']);
    this.incorrect = new BaseComponent('div', ['incorrect', 'hidden']);
    this.card = new BaseComponent('div', ['card']);
    this.cardFrontSide = new BaseComponent('div', ['card__front']);
    this.cardBackSide = new BaseComponent('div', ['card__back']);
    this.initialize();
  }

  initialize() {
    this.cardFrontSide.element.setAttribute('style', `background-image: url('./images/${this.image}')`);
  }

  render() {
    this.element.appendChild(this.card.element);
    this.card.element.append(this.cardFrontSide.element, this.cardBackSide.element);
    this.cardFrontSide.element.append(this.correct.element, this.incorrect.element);

    return this.element;
  }
}
