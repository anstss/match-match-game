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
import { DEFAULT_DIFFICULTY } from '../shared/constans';

const TIME_SHOW_CARDS_BEFORE_GAME = 5000;
const FLIP_CLASS = 'flipped';
const FLIP_DELAY = 1000;
const TIME_DELAY_BEFORE_SHOW_CORRECTNESS = 300;

export class GameController {
  cardsField: CardsField;

  cards: Card[] = [];

  gameTimer: BaseComponent;

  timer: Timer;

  min: number;

  sec: number;

  isAnimation = false;

  activeCard?: Card;

  // cardsCategory: string;

  gameDifficulty: number;

  timerId: number;

  totalTime: number;

  score: number;

  amountMismatches: number;

  amountMatches: number;

  comparisonsAmount: number;

  constructor(readonly gamePage: GamePage,
    private readonly settingsController: SettingsController) {
    this.gamePage = gamePage;
    // this.cardsCategory = settingsController.category;
    this.gameDifficulty = settingsController.difficulty;
    this.cardsField = this.gamePage.cardsField;
    this.cards = this.cardsField.cards;
    this.gameTimer = new BaseComponent('div', ['game__timer']);
    this.timer = new Timer();
    this.min = 0;
    this.sec = -1;
    this.timerId = 0;
    this.totalTime = 0;
    this.score = 0;
    this.amountMismatches = 0;
    this.amountMatches = 0;
    this.comparisonsAmount = 0;
  }

  startTimer() {
    this.totalTime += 1;
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
  }

  // FIXME: redo timer
  // !=====================================

  timeTick() {
    this.timerId = window.setInterval(() => {
      this.startTimer();
    }, 1000);
  }

  clearTimer() {
    this.sec = -1;
    this.min = 0;
    clearInterval(this.timerId);
  }

  stopGame() {
    this.clearGameInfo();
    this.clearField();
    this.clearTimer();
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
    You successfully found all matches on ${this.min}.${this.sec} minutes.
    Your score is ${this.score}.<br>Do you want to add your result to the high score table?`;
    this.clearTimer();
    console.log(this.score);
    console.log(this.totalTime);
    $('#modal-win').modal('show');
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
      // this => GameControllers because of static eslint
      this.cards.forEach((card) => GameController.flipCardToBack(card));
    }, TIME_SHOW_CARDS_BEFORE_GAME);
  }

  // add static for eslint
  static flipCardToBack(card: Card) {
    const currentCard = card; // add no-param-reassign special for eslint
    currentCard.isFlipped = true; // card => currentCard because of no-param-reassign
    // this => GameControllers because of static eslint
    // card => currentCard because of no-param-reassign
    return GameController.flipCard(currentCard, true);
  }

  // add static for eslint
  static flipCardToFront(card: Card) {
    const currentCard = card; // add no-param-reassign special for eslint
    currentCard.isFlipped = false; // card => currentCard because of no-param-reassign
    // this => GameControllers because of static eslint
    // card => currentCard because of no-param-reassign
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
    // this.clearGameInfo();
    // this.clearTimer();
    // this.clearField();
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
    this.timeTick();
  }

  async cardHandler(card: Card) {
    if (this.isAnimation) return;
    if (!card.isFlipped) return;
    this.isAnimation = true;
    // this => GameControllers because of static eslint
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
      // this => GameControllers because of static eslint
      GameController.notMatch(this.activeCard, card);
      await delay(FLIP_DELAY);
      // this => GameControllers because of static eslint !!!BOTH!!!!
      await Promise.all([GameController.flipCardToBack(this.activeCard),
        GameController.flipCardToBack(card)]);
      // this => GameControllers because of static eslint
      GameController.removeClassIncorrect(this.activeCard, card);
    } else {
      this.amountMatches += 1;
      this.comparisonsAmount += 1;
      await delay(TIME_DELAY_BEFORE_SHOW_CORRECTNESS);
      // this => GameControllers because of static eslint
      GameController.match(this.activeCard, card);
      await delay(FLIP_DELAY);
      // console.log("YES");
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
    // const activeMatch = activeCard.element.querySelector('.correct');
    // const cardMath = card.element.querySelector('.correct');
    // activeMatch?.classList.remove('hidden');
    // cardMath?.classList.remove('hidden');
  }

  // add static for eslint
  static notMatch(activeCard: Card, card: Card) {
    const activeMatch = activeCard.incorrect;
    const cardMath = card.incorrect;
    activeMatch?.element.classList.remove('hidden');
    cardMath?.element.classList.remove('hidden');
    // const activeMatch = activeCard.element.querySelector('.incorrect');
    // const cardMath = card.element.querySelector('.incorrect');
    // activeMatch?.classList.remove('hidden');
    // cardMath?.classList.remove('hidden');
  }

  // add static for eslint
  static removeClassIncorrect(activeCard: Card, card: Card) {
    const activeMatch = activeCard.incorrect;
    const cardMath = card.incorrect;
    activeMatch?.element.classList.add('hidden');
    cardMath?.element.classList.add('hidden');
    // const activeMatch = activeCard.element.querySelector('.incorrect');
    // const cardMath = card.element.querySelector('.incorrect');
    // activeMatch?.classList.add('hidden');
    // cardMath?.classList.add('hidden');
  }

  async startGame(currentCategory = this.settingsController.category,
    currentDifficulty = this.settingsController.difficulty) {
    // currentCategory = this.settingsController.category;
    // currentDifficulty = this.settingsController.difficulty;
    // console.log(this.settingsController.category);

    // const currentCategory = categor;
    const response = await fetch('./images.json');
    const imagesJson: ImageCategoryModel[] = await response.json();
    // console.log(imagesJson);

    const selectedCategory = imagesJson.find((elem) => elem.category === currentCategory.toLowerCase());
    if (!selectedCategory) throw new Error('Category not found');
    // console.log(selectedCategory);

    // const selectedCategory = imagesJson[categor];
    const selectedCategoryWithDifficulty = selectedCategory.images.slice(0, currentDifficulty);
    // console.log(selectedCategory.category);

    const images = selectedCategoryWithDifficulty.map((fileName) => `${selectedCategory.category}/${fileName}`);
    this.createNewGame(images, currentDifficulty);
  }
}
