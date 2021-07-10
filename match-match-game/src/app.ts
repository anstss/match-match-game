import './app-components/_header.scss';
import $ from 'jquery';
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
import { DIFFICULTY_REGEXP } from './shared/constans';

export class App {
  private header: Header;
  private page: Page;
  private registerModal: ModalRegister;
  private aboutPage: AboutPage;
  private gamePage: GamePage;
  private settingPage: SettingPage;
  private settingsController: SettingsController;
  private gameController: GameController;
  private validator: Validator;
  private usersData: UsersData;
  private router: Router;

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
    this.initialize();
  }

  initialize() {
    this.router.updateRoute();
    window.onpopstate = () => {
      this.router.updateRoute();
    };

    this.settingsController.dropItemsGameCards.forEach((dropdownItem) => {
      const option = dropdownItem.getDropdownItem();
      option.addEventListener('click', () => {
        this.settingsController.getButtonGameCards().innerHTML = option.innerText;
        this.settingsController.setGameCards(option.innerText);
      });
    });

    this.settingsController.dropItemsDifficulty.forEach((dropdownItem) => {
      const option = dropdownItem.getDropdownItem();
      option.addEventListener('click', () => {
        this.settingsController.getButtonDifficulty().innerHTML = option.innerText;
        let selectedDifficulty = Number(option.innerText.match(DIFFICULTY_REGEXP));
        selectedDifficulty = selectedDifficulty * selectedDifficulty / 2;
        this.settingsController.setDifficulty(selectedDifficulty);
      });
    });

    const buttonStart = this.header.getButtonStart();
    const buttonStop = this.header.getButtonStop();

    buttonStart.addEventListener('click', () => {
      this.gameController.startGame();
      buttonStart.classList.add('hidden');
      buttonStop.classList.remove('hidden');
    });

    buttonStop.addEventListener('click', () => {
      this.gameController.stopGame();
      buttonStop.classList.add('hidden');
      buttonStart.classList.remove('hidden');
      this.gameController.getCardsField().innerHTML = '<div class="text-message">Click START GAME for a new game<div>';
    });

    this.registerModal.getModalRegister().addEventListener('submit', (event) => {
      event.preventDefault();
      try {
        this.usersData.addUser();
      } catch (e) {
        UsersData.clearStorage();
        this.usersData.addUser();
      }
      $('#register-modal').modal('hide');
      window.location.href = '#score';
    });

    this.gamePage.modalWin.getButtonNo().addEventListener('click', () => {
      $('#modal-win').modal('hide');
    });
  }

  getPage() {
    return this.page.element;
  }

  render(): HTMLElement {
    this.rootElement.append(this.header.render(), this.registerModal.render(), this.getPage());

    return this.rootElement;
  }
}
