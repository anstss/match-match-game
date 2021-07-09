import { BaseComponent } from '../shared/base-component';
import { ButtonStart } from './header-components/button-start';
import { ButtonStop } from './header-components/button-stop';
import { Logo } from './header-components/logo';
import { NavLink } from './header-components/nav-link';

export class Header extends BaseComponent {
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
    this.initialize();
  }

  initialize() {
    this.navItemLogo.element.setAttribute('id', 'logo');
  }

  render(): HTMLElement {
    this.rootElement.appendChild(this.element);
    this.element.appendChild(this.nav.element);
    this.nav.element.appendChild(this.navList.element);
    this.navList.element.append(this.navItemLogo.element, this.navItemAbout.element,
      this.navItemScore.element, this.navItemSettings.element);
    this.navItemLogo.element.appendChild(this.logo.element);
    this.navItemAbout.element.appendChild(this.aboutGame.element);
    this.navItemScore.element.appendChild(this.bestScore.element);
    this.navItemSettings.element.appendChild(this.gameSettings.element);
    this.element.append(this.buttonStart.element, this.buttonStop.element);

    return this.element;
  }
}
