import * as _ from 'lodash';
import $ from 'jquery';
import { GamePage } from '../app-components/game-page';
import { Card } from '../app-components/game-page-components/card';
import { CardsField } from '../app-components/game-page-components/cards-field';
import { ImageCategoryModel } from '../models/image-category-model';
import { delay } from '../shared/delay';
import { BaseComponent } from '../shared/base-component';
import { Timer } from '../app-components/game-page-components/timer';
import { SettingsController } from './settings-controller';
import {
  DEFAULT_DIFFICULTY, FLIP_CLASS, FLIP_DELAY, TIME_DELAY_BEFORE_SHOW_CORRECTNESS, TIME_SHOW_CARDS_BEFORE_GAME,
} from '../shared/constans';
import { App } from '../app';

export class GameController {
  cardsField: CardsField;

  cards: Card[] = [];

  gameTimer: BaseComponent;

  timer: Timer;

  isAnimation = false;

  activeCard?: Card;

  timerId: number;

  totalTime: number;

  score: number;

  amountMatches: number;

  startTime: number;

  showCard?: number;

  constructor(readonly gamePage: GamePage,
    private readonly settingsController: SettingsController,
    private app: App) {
    this.gamePage = gamePage;
    this.cardsField = this.gamePage.cardsField;
    this.cards = this.cardsField.cards;
    this.gameTimer = new BaseComponent('div', ['game__timer']);
    this.timer = new Timer();
    this.timerId = 0;
    this.totalTime = 0;
    this.score = 0;
    this.amountMatches = 0;
    this.startTime = 0;
  }

  showTime() {
    const min = Math.floor((this.totalTime / 60));
    const sec = this.totalTime % 60;
    if (min === 100) {
      this.stopGame();
    }
    if (min < 10) {
      this.timer.min = `0${min}`;
    } else {
      this.timer.min = `${min}`;
    }
    if (sec < 10) {
      this.timer.sec = `0${sec}`;
    } else {
      this.timer.sec = `${sec}`;
    }
    this.timer.element.innerHTML = `${this.timer.min}:${this.timer.sec}`;
  }

  startTimer() {
    let prevTime = 0;
    this.timerId = window.setInterval(() => {
      const currentTime = Date.now();
      this.totalTime = Math.floor((currentTime - this.startTime) / 1000);
      if (prevTime !== this.totalTime) {
        this.showTime();
        prevTime = this.totalTime;
      }
    }, 500);
  }

  stopGame() {
    this.clearGameInfo();
    this.clearField();
    clearInterval(this.timerId);
    clearTimeout(this.showCard);
  }

  clearGameInfo() {
    this.totalTime = 0;
    this.score = 0;
    this.amountMatches = 0;
  }

  finishGame() {
    this.countScore();
    this.gamePage.modalWin.modalText.element.innerHTML = `Congratulations!
    You successfully found all matches on ${this.timer.min}.${this.timer.sec} minutes.
    Your score is ${this.score}.<br>Do you want to add your result to the high score table?`;
    clearInterval(this.timerId);
    $('#modal-win').modal('show');
    this.app.header.buttonStop.element.classList.add('hidden');
    this.app.header.buttonStart.element.classList.remove('hidden');
  }

  countScore() {
    this.score = ((this.settingsController.difficulty * 100 - (this.totalTime - TIME_SHOW_CARDS_BEFORE_GAME / 1000) * 10))
    * this.settingsController.difficulty / 2;
    if (this.score < 0) {
      this.score = 0;
    }
  }

  clearField() {
    this.cardsField.cards = [];
    this.cardsField.element.innerHTML = '';
  }

  fillField(cards: Card[]) {
    this.cards = cards;
    this.cardsField.element.innerHTML = '';
    this.cardsField.element.appendChild(this.gameTimer.element);
    this.gameTimer.element.appendChild(this.timer.element);
    this.cards.forEach((card) => this.cardsField.element.appendChild(card.render()));
    this.showCard = window.setTimeout(() => {
      this.cards.forEach((card) => GameController.flipCardToBack(card));
      this.cards.forEach((card) => card.element.classList.remove('card-hover-inactive'));
    }, TIME_SHOW_CARDS_BEFORE_GAME);
  }

  static flipCardToBack(card: Card) {
    const currentCard = card;
    currentCard.isFlipped = true;
    return GameController.flipCard(currentCard, true);
  }

  static flipCardToFront(card: Card) {
    const currentCard = card;
    currentCard.isFlipped = false;
    return GameController.flipCard(currentCard);
  }

  static flipCard(card: Card, isBackSide = false): Promise<void> {
    return new Promise((resolve) => {
      card.element.classList.toggle(FLIP_CLASS, isBackSide);
      card.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }

  createNewGame(images: string[], currentDifficulty: number) {
    this.stopGame();
    let cards = images.concat(images).map((url) => new Card(url));
    if (currentDifficulty !== DEFAULT_DIFFICULTY) {
      cards.forEach((card) => card.card.element.classList.add('card_small'));
    } else {
      cards.forEach((card) => card.card.element.classList.remove('card_small'));
    }
    cards = _.shuffle(cards);
    cards.forEach((card) => card.element.addEventListener('click', () => this.cardHandler(card)));

    this.fillField(cards);
    this.timer.element.innerHTML = '00:00';
    this.startTime = Date.now();
    this.startTimer();
  }

  async cardHandler(card: Card) {
    if (this.isAnimation) return;
    if (!card.isFlipped) return;
    this.isAnimation = true;
    await GameController.flipCardToFront(card);
    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }
    if (this.activeCard.image !== card.image) {
      await delay(TIME_DELAY_BEFORE_SHOW_CORRECTNESS);
      GameController.notMatch(this.activeCard, card);
      await delay(FLIP_DELAY);
      await Promise.all([GameController.flipCardToBack(this.activeCard),
        GameController.flipCardToBack(card)]);
      GameController.removeClassIncorrect(this.activeCard, card);
    } else {
      this.amountMatches += 1;
      await delay(TIME_DELAY_BEFORE_SHOW_CORRECTNESS);
      GameController.match(this.activeCard, card);
      [this.activeCard, card].forEach((card) => card.element.classList.add('card-hover-inactive'));
      await delay(FLIP_DELAY);
      this.activeCard = undefined;
      this.isAnimation = false;
    }
    this.activeCard = undefined;
    this.isAnimation = false;
    if (this.amountMatches === this.settingsController.difficulty) {
      this.finishGame();
    }
  }

  static match(activeCard: Card, card: Card) {
    const activeMatch = activeCard.correct;
    const cardMath = card.correct;
    activeMatch?.element.classList.remove('hidden');
    cardMath?.element.classList.remove('hidden');
  }

  static notMatch(activeCard: Card, card: Card) {
    const activeMatch = activeCard.incorrect;
    const cardMath = card.incorrect;
    activeMatch?.element.classList.remove('hidden');
    cardMath?.element.classList.remove('hidden');
  }

  static removeClassIncorrect(activeCard: Card, card: Card) {
    const activeMatch = activeCard.incorrect;
    const cardMath = card.incorrect;
    activeMatch?.element.classList.add('hidden');
    cardMath?.element.classList.add('hidden');
  }

  async startGame(currentCategory = this.settingsController.category,
    currentDifficulty = this.settingsController.difficulty) {
    const response = await fetch('./images.json');
    const imagesJson: ImageCategoryModel[] = await response.json();

    const selectedCategory = imagesJson.find((elem) => elem.category === currentCategory.toLowerCase());
    if (!selectedCategory) throw new Error('Category not found');

    const selectedCategoryWithDifficulty = selectedCategory.images.slice(0, currentDifficulty);

    const images = selectedCategoryWithDifficulty.map((fileName) => `${selectedCategory.category}/${fileName}`);
    this.createNewGame(images, currentDifficulty);
  }
}
