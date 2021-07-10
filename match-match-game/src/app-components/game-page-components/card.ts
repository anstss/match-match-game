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
    this.getCardFrontSide().setAttribute('style', `background-image: url('./images/${this.image}')`);
  }

  getCard() {
    return this.card.element;
  }

  getCardFrontSide() {
    return this.cardFrontSide.element;
  }

  getCardBackSide() {
    return this.cardBackSide.element;
  }

  getCorrect() {
    return this.correct.element;
  }

  getIncorrect() {
    return this.incorrect.element;
  }

  render() {
    this.element.appendChild(this.getCard());
    this.getCard().append(this.getCardFrontSide(), this.getCardBackSide());
    this.getCardFrontSide().append(this.getCorrect(), this.getIncorrect());

    return this.element;
  }
}
