import './_game-page.scss';
import { BaseComponent } from '../shared/base-component';
import { Component } from '../shared/component';
import { CardsField } from './game-page-components/cards-field';
import { ModalWin } from '../shared/modals/modal-win';

export class GamePage extends BaseComponent implements Component {
  cardsField: CardsField;

  container: BaseComponent;

  modalWin: ModalWin;
  // triggerModal: BaseComponent;

  constructor(private readonly page: HTMLElement) {
    super('div', ['game']);
    this.cardsField = new CardsField();
    this.container = new BaseComponent('div', ['container']);
    this.modalWin = new ModalWin();
  }

  render(): HTMLElement {
    this.page.append(this.element, this.modalWin.render());
    // const container = new BaseComponent('div', ['container']).element;
    this.element.appendChild(this.container.element);
    // const gameFiled = new BaseComponent('div', ['game__field']).element;
    this.container.element.appendChild(this.cardsField.element);
    // const gameTimer = new BaseComponent('div', ['game__timer']).element;
    // this.cardsField.element.appendChild(gameTimer);
    // const timer = new Timer().element;
    // gameTimer.appendChild(timer);
    // const cards = new Card('001-bee.png').element;
    return this.element;
  }
}
