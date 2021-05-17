import * as _ from 'lodash';
import { GamePage } from '../app-components/game-page';
import { Card } from '../app-components/game-page-components/card';
import { CardsField } from '../app-components/game-page-components/cards-field';
import { ImageCategoryModel } from '../models/image-category-model';
import { Component } from '../shared/component';
import { delay } from '../shared/delay';
import { BaseComponent } from '../shared/base-component';
import { Timer } from '../app-components/game-page-components/timer';

const TIME_SHOW_CARDS_BEFORE_GAME = 5000;
const FLIP_CLASS = 'flipped';
const FLIP_DELAY = 1000;
const TIME_DELAY_BEFORE_SHOW_CORRECTNESS = 300;

export class GameControllers implements Component {
  readonly gamePage: GamePage;

  cardsField: CardsField;

  cards: Card[] = [];

  gameTimer: BaseComponent;

  timer: Timer;

  min: number;

  sec: number;

  isAnimation = false;

  activeCard?: Card;

  constructor(private readonly page: HTMLElement) {
    this.gamePage = new GamePage(page);
    this.cardsField = this.gamePage.cardsField;
    this.cards = this.cardsField.cards;
    this.gameTimer = new BaseComponent('div', ['game__timer']);
    this.timer = new Timer();
    this.min = 0;
    this.sec = -1;
  }

  startTimer() {
    this.sec += 1;
    if (this.sec === 60) {
      this.min += 1;
      this.sec = 0;
      if (this.min === 100) {
        throw new Error('Too long');
      }
    }
    if (this.min < 10) {
      this.timer.min = `0${this.min}`;
    } else {
      this.timer.min = `${this.min}`;
    }
    if (this.sec < 10) {
      this.timer.sec = `0${this.sec}`;
    } else {
      this.timer.sec = `${this.sec}`;
    }
    this.timer.element.innerHTML = `${this.timer.min}:${this.timer.sec}`;

    setTimeout(() => {
      this.startTimer();
    }, 1000);
  }

  clearField() {
    this.cardsField.cards = [];
    this.cardsField.element.innerHTML = '';
  }

  fillField(cards: Card[]) {
    this.cards = cards;
    this.cardsField.element.appendChild(this.gameTimer.element);
    this.gameTimer.element.appendChild(this.timer.element);
    this.cards.forEach((card) => this.cardsField.element.appendChild(card.element));
    setTimeout(() => {
      // this => GameControllers because of static eslint
      this.cards.forEach((card) => GameControllers.flipCardToBack(card));
    }, TIME_SHOW_CARDS_BEFORE_GAME);
  }

  // add static for eslint
  static flipCardToBack(card: Card) {
    const currentCard = card; // add no-param-reassign special for eslint
    currentCard.isFlipped = true; // card => currentCard because of no-param-reassign
    // this => GameControllers because of static eslint
    // card => currentCard because of no-param-reassign
    return GameControllers.flipCard(currentCard, true);
  }

  // add static for eslint
  static flipCardToFront(card: Card) {
    const currentCard = card; // add no-param-reassign special for eslint
    currentCard.isFlipped = false; // card => currentCard because of no-param-reassign
    // this => GameControllers because of static eslint
    // card => currentCard because of no-param-reassign
    return GameControllers.flipCard(currentCard);
  }

  // add static for eslint
  static flipCard(card: Card, isBackSide = false): Promise<void> {
    return new Promise((resolve) => {
      card.element.classList.toggle(FLIP_CLASS, isBackSide);
      card.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }

  createNewGame(images: string[]) {
    this.clearField();
    let cards = images.concat(images).map((url) => new Card(url));
    cards = _.shuffle(cards);
    cards.forEach((card) => card.element.addEventListener('click', () => this.cardHandler(card)));

    this.fillField(cards);
    this.startTimer();
  }

  async cardHandler(card: Card) {
    if (this.isAnimation) return;
    if (!card.isFlipped) return;
    this.isAnimation = true;
    // this => GameControllers because of static eslint
    await GameControllers.flipCardToFront(card);
    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }
    if (this.activeCard.image !== card.image) {
      await delay(TIME_DELAY_BEFORE_SHOW_CORRECTNESS);
      // this => GameControllers because of static eslint
      GameControllers.notMatch(this.activeCard, card);
      await delay(FLIP_DELAY);
      // this => GameControllers because of static eslint !!!BOTH!!!!
      await Promise.all([GameControllers.flipCardToBack(this.activeCard),
        GameControllers.flipCardToBack(card)]);
      // this => GameControllers because of static eslint
      GameControllers.removeClassIncorrect(this.activeCard, card);
    } else {
      await delay(TIME_DELAY_BEFORE_SHOW_CORRECTNESS);
      // this => GameControllers because of static eslint
      GameControllers.match(this.activeCard, card);
      await delay(FLIP_DELAY);
      // console.log("YES");
      this.activeCard = undefined;
      this.isAnimation = false;
    }
    this.activeCard = undefined;
    this.isAnimation = false;
  }

  // add static for eslint
  static match(activeCard: Card, card: Card) {
    const activeMatch = activeCard.element.querySelector('.correct');
    const cardMath = card.element.querySelector('.correct');
    activeMatch?.classList.remove('hidden');
    cardMath?.classList.remove('hidden');
  }

  // add static for eslint
  static notMatch(activeCard: Card, card: Card) {
    const activeMatch = activeCard.element.querySelector('.incorrect');
    const cardMath = card.element.querySelector('.incorrect');
    activeMatch?.classList.remove('hidden');
    cardMath?.classList.remove('hidden');
  }

  // add static for eslint
  static removeClassIncorrect(activeCard: Card, card: Card) {
    const activeMatch = activeCard.element.querySelector('.incorrect');
    const cardMath = card.element.querySelector('.incorrect');
    activeMatch?.classList.add('hidden');
    cardMath?.classList.add('hidden');
  }

  async startGame(categor = 0, difficulty = 8) {
    const response = await fetch('./images.json');
    const imagesJson: ImageCategoryModel[] = await response.json();
    const selectedCategory = imagesJson[categor];
    const selectedCategoryWithDifficulty = selectedCategory.images.slice(0, difficulty);
    const images = selectedCategoryWithDifficulty.map((fileName) => `${selectedCategory.category}/${fileName}`);
    this.createNewGame(images);
  }

  render(): HTMLElement {
    this.page.appendChild(this.gamePage.element);
    return this.page;
  }
}
