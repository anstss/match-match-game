import './app-components/_header.scss';
// import './app-components/_about-page.scss';
// import './app-components/_game-page.scss';
import { Component } from './shared/component';
import { Header } from './app-components/header';
import { Page } from './app-components/page';

export class App implements Component {
  private readonly header: HTMLElement;
  // aboutPage: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header(rootElement).render();
    // this.aboutPage = new AboutPage(rootElement).render();
  }

  render(): HTMLElement {
    this.rootElement.appendChild(this.header);
    const page = new Page();
    this.rootElement.appendChild(page.element);
    // page.element.appendChild(this.aboutPage);
    // this.element.appendChild(new BaseComponent('ul', ['nav-list']).element);
    // this.element.appendChild(new BaseComponent('li', ['nav-item']).element);
    // let mainPage = new MainPage(this.element).render();
    // this.element.appendChild(mainPage);

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
