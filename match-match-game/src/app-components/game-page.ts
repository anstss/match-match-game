import './_game-page.scss';
import { BaseComponent } from "../shared/base-component";
import { Component } from "../shared/component";
import { Timer } from "./game-page-components/timer";
import { CardsField } from './game-page-components/cards-field';

export class GamePage extends BaseComponent implements Component {
  cardsField: CardsField;

  constructor(private readonly page: HTMLElement) {
    super('div', ['game']);
    this.cardsField = new CardsField();
  }

  render(): HTMLElement {
    this.page.appendChild(this.element);
    const container = new BaseComponent('div', ['container']).element;
    this.element.appendChild(container);
    // const gameFiled = new BaseComponent('div', ['game__field']).element;
    container.appendChild(this.cardsField.element);
    const gameTimer = new BaseComponent('div', ['game__timer']).element;
    this.cardsField.element.appendChild(gameTimer);
    const timer = new Timer().element;
    gameTimer.appendChild(timer);
    // const cards = new Card('001-bee.png').element;
    return this.element;
  }
}