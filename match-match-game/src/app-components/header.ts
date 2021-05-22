import { BaseComponent } from '../shared/base-component';
import { Component } from '../shared/component';
import { ButtonStart } from './header-components/button-start';
import { ButtonStop } from './header-components/button-stop';
import { Logo } from './header-components/logo';
import { NavLink } from './header-components/nav-link';

export class Header extends BaseComponent implements Component {
  constructor(private readonly rootElement: HTMLElement) {
    super('header', ['header']);
  }

  render(): HTMLElement {
    this.rootElement.appendChild(this.element);
    const nav = new BaseComponent('nav', ['nav']).element;
    this.element.appendChild(nav);
    const navList = new BaseComponent('ul', ['nav-list']).element;
    nav.appendChild(navList);
    const navItemLogo = new BaseComponent('li', ['nav-item']).element;
    const navItemAbout = new BaseComponent('li', ['nav-item']).element;
    const navItemScore = new BaseComponent('li', ['nav-item']).element;
    const navItemSettings = new BaseComponent('li', ['nav-item']).element;
    navList.append(navItemLogo, navItemAbout, navItemScore, navItemSettings);
    const logo = new Logo('#about').element;
    navItemLogo.appendChild(logo);
    const aboutGame = new NavLink('About Game', 'about-icon.svg', '#about').element;
    navItemAbout.appendChild(aboutGame);
    const bestScore = new NavLink('Best Score', 'best-score-icon.svg', '#score').element;
    navItemScore.appendChild(bestScore);
    const gameSettings = new NavLink('Game Settings', 'setting-icon.svg', '#settings').element;
    navItemSettings.appendChild(gameSettings);
    const buttonStart = new ButtonStart().element;
    const buttonStop = new ButtonStop().element;
    this.element.append(buttonStart, buttonStop);

    return this.element;
  }
}
