import './_game-page.scss';
import { BaseComponent } from '../shared/base-component';
import { CardsField } from './game-page-components/cards-field';
import { ModalWin } from '../shared/modals/modal-win';

export class GamePage extends BaseComponent {
  cardsField: CardsField;
  container: BaseComponent;
  modalWin: ModalWin;

  constructor(private readonly page: HTMLElement) {
    super('div', ['game']);
    this.cardsField = new CardsField();
    this.container = new BaseComponent('div', ['container']);
    this.modalWin = new ModalWin();
  }

  getCardsField() {
    return this.cardsField.element;
  }

  getContainer() {
    return this.container.element;
  }

  render(): HTMLElement {
    this.page.append(this.element, this.modalWin.render());
    this.element.appendChild(this.getContainer());
    this.getContainer().appendChild(this.getCardsField());

    return this.element;
  }
}
