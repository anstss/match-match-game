import { GamePage } from "../app-components/game-page";
import { Card } from "../app-components/game-page-components/card";
import { CardsField } from "../app-components/game-page-components/cards-field";
import { ImageCategoryModel } from "../models/image-category-model";
import { Component } from "../shared/component";
import { delay } from "../shared/delay";
import * as _ from "lodash";

const TIME_SHOW_CARDS_BEFORE_GAME = 5000;
const FLIP_CLASS = 'flipped';
const FLIP_DELAY = 1000;
const TIME_DELAY_BEFORE_SHOW_CORRECTNESS = 300;

export class GameControllers implements Component {
  readonly gamePage: GamePage;
  cardsField: CardsField;
  cards: Card[] = [];

  isAnimation = false;
  activeCard?: Card;

  constructor(private readonly page: HTMLElement) {
    this.gamePage = new GamePage(page);
    this.cardsField = this.gamePage.cardsField;
    this.cards = this.cardsField.cards;
  }

  clearField() {
    this.cardsField.cards = [];
    this.cardsField.element.innerHTML = '';
  }

  addCards(cards: Card[]) {
    this.cards = cards;
    this.cards.forEach((card) => this.cardsField.element.appendChild(card.element));
    setTimeout(() => {
      this.cards.forEach(card => this.flipCardToBack(card));
    }, TIME_SHOW_CARDS_BEFORE_GAME);
  }

  flipCardToBack(card: Card) {
    card.isFlipped = true;
    return this.flipCard(card, true);
  }

  flipCardToFront(card: Card) {
    card.isFlipped = false;
    return this.flipCard(card);
  }

  flipCard(card: Card, isBackSide = false): Promise<void> {
    return new Promise((resolve) => {
      card.element.classList.toggle(FLIP_CLASS, isBackSide);
      card.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    })
  }

  createNewGame(images: string[]) {
    this.clearField();
    let cards = images.concat(images).map(url => new Card(url));
    cards = _.shuffle(cards);
    cards.forEach((card) => card.element.addEventListener('click', () => this.cardHandler(card)));

    this.addCards(cards);
  }

  async cardHandler(card: Card) {
    if (this.isAnimation) return;
    if (!card.isFlipped) return;
    this.isAnimation = true;
    await this.flipCardToFront(card);
    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }
    if (this.activeCard.image !== card.image) {
      await delay(TIME_DELAY_BEFORE_SHOW_CORRECTNESS);
      this.notMatch(this.activeCard, card);
      await delay(FLIP_DELAY);
      await Promise.all([this.flipCardToBack(this.activeCard), this.flipCardToBack(card)]);
      this.removeClassIncorrect(this.activeCard, card);
    }
    else {
      await delay(TIME_DELAY_BEFORE_SHOW_CORRECTNESS);
      this.match(this.activeCard, card);
      await delay(FLIP_DELAY);
      // console.log("YES");
      this.activeCard = undefined;
      this.isAnimation = false;
    }
    this.activeCard = undefined;
    this.isAnimation = false;
  }

  match(activeCard: Card, card: Card) {
    const activeMatch = activeCard.element.querySelector('.correct');
    const cardMath = card.element.querySelector('.correct');
    activeMatch?.classList.remove('hidden');
    cardMath?.classList.remove('hidden');
  }

  notMatch(activeCard: Card, card: Card) {
    const activeMatch = activeCard.element.querySelector('.incorrect');
    const cardMath = card.element.querySelector('.incorrect');
    activeMatch?.classList.remove('hidden');
    cardMath?.classList.remove('hidden');
  }

  removeClassIncorrect(activeCard: Card, card: Card) {
    const activeMatch = activeCard.element.querySelector('.incorrect');
    const cardMath = card.element.querySelector('.incorrect');
    activeMatch?.classList.add('hidden');
    cardMath?.classList.add('hidden');
  }

  async startGame(categor: number = 0, difficulty: number = 8) {
    const response = await fetch('./images.json');
    const imagesJson: ImageCategoryModel[] = await response.json();
    const selectedCategory = imagesJson[categor];
    const selectedCategoryWithDifficulty = selectedCategory.images.slice(0, difficulty);
    const images = selectedCategoryWithDifficulty.map(fileName => `${selectedCategory.category}/${fileName}`);
    this.createNewGame(images);
  }

  render(): HTMLElement {
    this.page.appendChild(this.gamePage.element);
    return this.page;
  }
}