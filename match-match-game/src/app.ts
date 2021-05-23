import './app-components/_header.scss';
import { Component } from './shared/component';
import { Header } from './app-components/header';
import { Page } from './app-components/page';
import { ModalRegister } from './shared/modals/modal-register';

export class App implements Component {
  // private readonly header:
  header: Header;

  page: Page;

  registerModal: ModalRegister;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header(rootElement);
    this.registerModal = new ModalRegister();
    this.page = new Page();
  }

  render(): HTMLElement {
    this.rootElement.append(this.header.render(), this.registerModal.render(), this.page.element);
    // const page = new Page();
    // this.rootElement.appendChild(page.element);

    return this.rootElement;
  }
}

// private readonly game: Game;

// constructor(private readonly rootElement: HTMLElement) {
//   this.game = new Game();
//   this.rootElement.appendChild(this.game.element);
// }

// async createGame(/*category, difficulty*/) {
//   const response = await fetch('./images.json');
//   const categories: ImageCategoryModel[] = await response.json();
//   const selectedCategory = categories[0];

//   const images = selectedCategory.images.map((fileName) =>
// `${selectedCategory.category}/${fileName}`);
//   this.game.startNewGame(images);
// }
