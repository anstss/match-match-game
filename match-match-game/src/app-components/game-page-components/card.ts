import { BaseComponent } from '../../shared/base-component';

export class Card extends BaseComponent {
  isFlipped = false;

  constructor(readonly image: string) {
    super('div', ['card__container']);

    this.element.innerHTML = `
    <div class="card">
      <div class="card__front" style="background-image: url('./images/${image}')">
        <div class="correct hidden"></div>
        <div class="incorrect hidden"></div></div>
      <div class="card__back"></div>
    </div>
    `;
  }
}
