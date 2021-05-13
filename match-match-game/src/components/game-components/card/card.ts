import './card.scss';
import { BaseComponent } from "../../base-component";

const FLIP_CLASS = 'flipped';

export class Card extends BaseComponent {
  constructor(readonly image: string) {
    super('div', ['card__container']);

    this.element.innerHTML = `
    <div class="card">
      <div class="card__front" style="background-image: url('./images/${image}')"></div>
      <div class="card__back">Back</div>
    </div>
    `;
  }

  flipToBack() {
    this.element.classList.add(FLIP_CLASS);
  }

  flipToFront() {
    this.element.classList.remove(FLIP_CLASS);
  }
}