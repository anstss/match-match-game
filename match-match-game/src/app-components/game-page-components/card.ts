import { BaseComponent } from '../../shared/base-component';

export class Card extends BaseComponent {
  isFlipped = false;

  correct: BaseComponent;

  incorrect: BaseComponent;

  card: BaseComponent;

  cardFrontSide: BaseComponent;

  cardBackSide: BaseComponent;

  constructor(readonly image: string) {
    super('div', ['card__container']);
    this.correct = new BaseComponent('div', ['correct', 'hidden']);
    this.incorrect = new BaseComponent('div', ['incorrect', 'hidden']);
    this.card = new BaseComponent('div', ['card']);
    this.cardFrontSide = new BaseComponent('div', ['card__front']);
    this.cardFrontSide.element.setAttribute('style', `background-image: url('./images/${image}')`);
    this.cardBackSide = new BaseComponent('div', ['card__back']);
  }

  render() {
    this.element.appendChild(this.card.element);
    this.card.element.append(this.cardFrontSide.element, this.cardBackSide.element);
    this.cardFrontSide.element.append(this.correct.element, this.incorrect.element);

    return this.element;
  }
}
