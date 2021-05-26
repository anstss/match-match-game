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
import { DEFAULT_DIFFICULTY, FLIP_CLASS, FLIP_DELAY, TIME_DELAY_BEFORE_SHOW_CORRECTNESS, TIME_SHOW_CARDS_BEFORE_GAME } from '../shared/constans';
import { App } from '../app';

export class GameController {
  cardsField: CardsField;
  cards: Card[] = [];
  gameTimer: BaseComponent;
  timer: Timer;
  isAnimation = false;
  activeCard?: Card;
  gameDifficulty: number;
  timerId: number;
  totalTime: number;
  score: number;
  amountMismatches: number;
  amountMatches: number;
  comparisonsAmount: number;
  startTime: number;

  constructor(readonly gamePage: GamePage,
    private readonly settingsController: SettingsController,
    private app: App) {
    this.gamePage = gamePage;
    this.gameDifficulty = settingsController.difficulty;
    this.cardsField = this.gamePage.cardsField;
    this.cards = this.cardsField.cards;
    this.gameTimer = new BaseComponent('div', ['game__timer']);
    this.timer = new Timer();
    this.timerId = 0;
    this.totalTime = 0;
    this.score = 0;
    this.amountMismatches = 0;
    this.amountMatches = 0;
    this.comparisonsAmount = 0;
    this.startTime = 0;
  }

  showTime() {
    let min = Math.floor((this.totalTime / 60));
    let sec = Math.floor(this.totalTime % 60);
    if (min === 100) {
      throw new Error('Too long');
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
      let currentTime = Date.now();
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
  }

  clearGameInfo() {
    this.totalTime = 0;
    this.score = 0;
    this.amountMismatches = 0;
    this.amountMatches = 0;
    this.comparisonsAmount = 0;
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
    this.score = (this.comparisonsAmount - this.amountMismatches) * 100 - this.totalTime * 10;
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
    setTimeout(() => {
      this.cards.forEach((card) => GameController.flipCardToBack(card));
    }, TIME_SHOW_CARDS_BEFORE_GAME);
  }

  // add static for eslint
  static flipCardToBack(card: Card) {
    const currentCard = card; // add no-param-reassign special for eslint
    currentCard.isFlipped = true;
    return GameController.flipCard(currentCard, true);
  }

  // add static for eslint
  static flipCardToFront(card: Card) {
    const currentCard = card; // add no-param-reassign special for eslint
    currentCard.isFlipped = false;
    return GameController.flipCard(currentCard);
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
    this.timer.element.innerHTML = `00:00`;
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
      this.comparisonsAmount += 1;
      this.amountMismatches += 1;
      await delay(TIME_DELAY_BEFORE_SHOW_CORRECTNESS);
      GameController.notMatch(this.activeCard, card);
      await delay(FLIP_DELAY);
      await Promise.all([GameController.flipCardToBack(this.activeCard),
        GameController.flipCardToBack(card)]);
      GameController.removeClassIncorrect(this.activeCard, card);
    } else {
      this.amountMatches += 1;
      this.comparisonsAmount += 1;
      await delay(TIME_DELAY_BEFORE_SHOW_CORRECTNESS);
      GameController.match(this.activeCard, card);
      await delay(FLIP_DELAY);
      this.activeCard = undefined;
      this.isAnimation = false;
    }
    this.activeCard = undefined;
    this.isAnimation = false;
    if (this.amountMatches === this.gameDifficulty) {
      this.finishGame();
    }
  }

  // add static for eslint
  static match(activeCard: Card, card: Card) {
    const activeMatch = activeCard.correct;
    const cardMath = card.correct;
    activeMatch?.element.classList.remove('hidden');
    cardMath?.element.classList.remove('hidden');
  }

  // add static for eslint
  static notMatch(activeCard: Card, card: Card) {
    const activeMatch = activeCard.incorrect;
    const cardMath = card.incorrect;
    activeMatch?.element.classList.remove('hidden');
    cardMath?.element.classList.remove('hidden');
  }

  // add static for eslint
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
