import './app-components/_header.scss';
import { Header } from './app-components/header';
import { Page } from './app-components/page';
import { ModalRegister } from './shared/modals/modal-register';
import { AboutPage } from './app-components/about-page';
import { GamePage } from './app-components/game-page';
import { SettingPage } from './app-components/setting-page';
import { SettingsController } from './controllers/settings-controller';
import { GameController } from './controllers/game-controller';
import { Validator } from './controllers/validator';
import { UsersData } from './controllers/users-data';
import { Router } from './controllers/router';

export class App {
  private readonly header: Header;
  private page: Page;
  private readonly registerModal: ModalRegister;
  private readonly aboutPage: AboutPage;
  private readonly gamePage: GamePage;
  private readonly settingPage: SettingPage;
  private readonly settingsController: SettingsController;
  private readonly gameController: GameController;
  private validator: Validator;
  private usersData: UsersData;
  private router: Router;
  private buttonStart: HTMLElement;
  private buttonStop: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header(rootElement);
    this.registerModal = new ModalRegister();
    this.page = new Page();
    this.aboutPage = new AboutPage(this.getPage());
    this.gamePage = new GamePage(this.getPage());
    this.settingPage = new SettingPage(this.getPage());
    this.settingsController = new SettingsController(this.settingPage);
    this.gameController = new GameController(this.gamePage, this.settingsController, this.header);
    this.validator = new Validator(this.registerModal);
    this.usersData = new UsersData(this.registerModal, this.gameController);
    this.router = new Router(this.header, this.getPage(), this.aboutPage, this.gamePage, this.settingPage);
    this.buttonStart = this.header.getButtonStart();
    this.buttonStop = this.header.getButtonStop();
    this.initialize();
  }

  initialize() {
    this.router.updateRoute();
    window.onpopstate = () => {
      this.router.updateRoute();
    };

    this.buttonStart.addEventListener('click', () => this.startHandler());
    this.buttonStop.addEventListener('click', () => this.stopHandler());
  }

  getPage() {
    return this.page.element;
  }

  startHandler() {
    this.gameController.startGame();
    this.buttonStart.classList.add('hidden');
    this.buttonStop.classList.remove('hidden');
  }

  stopHandler() {
    this.gameController.stopGame();
    this.buttonStop.classList.add('hidden');
    this.buttonStart.classList.remove('hidden');
    this.gameController.getCardsField().innerHTML = '<div class="text-message">Click START GAME for a new game<div>';
  }

  render(): HTMLElement {
    this.rootElement.append(this.header.render(), this.registerModal.render(), this.getPage());

    return this.rootElement;
  }
}
