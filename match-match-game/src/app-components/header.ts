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

  getNav() {
    return this.nav.element;
  }

  getNavList() {
    return this.navList.element;
  }

  getNavItemLogo() {
    return this.navItemLogo.element;
  }

  getNavItemAbout() {
    return this.navItemAbout.element;
  }

  getNavItemScore() {
    return this.navItemScore.element;
  }

  getNavItemSettings() {
    return this.navItemSettings.element;
  }

  getLogo() {
    return this.logo.element;
  }

  getAboutGame() {
    return this.aboutGame.element;
  }

  getBestScore() {
    return this.bestScore.element;
  }

  getGameSettings() {
    return this.gameSettings.element;
  }

  getButtonStart() {
    return this.buttonStart.element;
  }

  getButtonStop() {
    return this.buttonStop.element;
  }

  render(): HTMLElement {
    this.rootElement.appendChild(this.element);
    this.element.appendChild(this.getNav());
    this.getNav().appendChild(this.getNavList());
    this.getNavList().append(this.getNavItemLogo(), this.getNavItemAbout(),
      this.getNavItemScore(), this.getNavItemSettings());
    this.getNavItemLogo().appendChild(this.getLogo());
    this.getNavItemAbout().appendChild(this.getAboutGame());
    this.getNavItemScore().appendChild(this.getBestScore());
    this.getNavItemSettings().appendChild(this.getGameSettings());
    this.element.append(this.getButtonStart(), this.getButtonStop());

    return this.element;
  }
}
