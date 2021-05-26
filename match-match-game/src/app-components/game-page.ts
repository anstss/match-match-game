import './_game-page.scss';
import { BaseComponent } from '../shared/base-component';
import { Component } from '../shared/component';
import { CardsField } from './game-page-components/cards-field';
import { ModalWin } from '../shared/modals/modal-win';

export class GamePage extends BaseComponent implements Component {
  cardsField: CardsField;

  container: BaseComponent;

  modalWin: ModalWin;

  constructor(private readonly page: HTMLElement) {
    super('div', ['game']);
    this.cardsField = new CardsField();
    this.container = new BaseComponent('div', ['container']);
    this.modalWin = new ModalWin();
  }

  render(): HTMLElement {
    this.page.append(this.element, this.modalWin.render());
    this.element.appendChild(this.container.element);
    this.container.element.appendChild(this.cardsField.element);

    return this.element;
  }
}
