import { BaseComponent } from '../shared/base-component';
import { Component } from '../shared/component';
import { ButtonStart } from './header-components/button-start';
import { ButtonStop } from './header-components/button-stop';
import { Logo } from './header-components/logo';
import { NavLink } from './header-components/nav-link';

export class Header extends BaseComponent implements Component {
  nav: BaseComponent;

  navList: BaseComponent;

  navItemLogo: BaseComponent;

  navItemAbout: BaseComponent;

  navItemScore: BaseComponent;

  navItemSettings: BaseComponent;

  logo: Logo;

  aboutGame: NavLink;

  bestScore: NavLink;

  gameSettings: NavLink;

  buttonStart: ButtonStart;

  buttonStop: ButtonStop;

  navItems: BaseComponent[];

  constructor(private readonly rootElement: HTMLElement) {
    super('header', ['header']);
    this.nav = new BaseComponent('nav', ['nav']);
    this.navList = new BaseComponent('ul', ['nav-list']);
    this.navItemLogo = new BaseComponent('li', ['nav-item']);
    this.navItemLogo.element.setAttribute('id', 'logo');
    this.navItemAbout = new BaseComponent('li', ['nav-item']);
    this.navItemScore = new BaseComponent('li', ['nav-item']);
    this.navItemSettings = new BaseComponent('li', ['nav-item']);
    this.logo = new Logo('#about');
    this.aboutGame = new NavLink('About Game', 'about-icon.svg', '#about');
    this.bestScore = new NavLink('Best Score', 'best-score-icon.svg', '#score');
    this.gameSettings = new NavLink('Game Settings', 'setting-icon.svg', '#settings');
    this.buttonStart = new ButtonStart();
    this.buttonStop = new ButtonStop();
    this.navItems = [this.navItemLogo, this.navItemAbout, this.navItemScore, this.navItemSettings];
  }

  render(): HTMLElement {
    this.rootElement.appendChild(this.element);
    // const nav = new BaseComponent('nav', ['nav']).element;
    this.element.appendChild(this.nav.element);
    // const navList = new BaseComponent('ul', ['nav-list']).element;
    this.nav.element.appendChild(this.navList.element);
    // const navItemLogo = new BaseComponent('li', ['nav-item']).element;
    // const navItemAbout = new BaseComponent('li', ['nav-item']).element;
    // const navItemScore = new BaseComponent('li', ['nav-item']).element;
    // const navItemSettings = new BaseComponent('li', ['nav-item']).element;
    this.navList.element.append(this.navItemLogo.element, this.navItemAbout.element,
      this.navItemScore.element, this.navItemSettings.element);
    // const logo = new Logo('#about').element;
    this.navItemLogo.element.appendChild(this.logo.element);
    // const aboutGame = new NavLink('About Game', 'about-icon.svg', '#about').element;
    this.navItemAbout.element.appendChild(this.aboutGame.element);
    // const bestScore = new NavLink('Best Score', 'best-score-icon.svg', '#score').element;
    this.navItemScore.element.appendChild(this.bestScore.element);
    // const gameSettings = new NavLink('Game Settings', 'setting-icon.svg', '#settings').element;
    this.navItemSettings.element.appendChild(this.gameSettings.element);
    // const buttonStart = new ButtonStart().element;
    // const buttonStop = new ButtonStop().element;
    this.element.append(this.buttonStart.element, this.buttonStop.element);

    return this.element;
  }
}
