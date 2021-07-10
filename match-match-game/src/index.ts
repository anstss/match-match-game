import $ from 'jquery';
import 'bootstrap';
import './styles.scss';

import { App } from './app';
import { Router } from './controllers/router';
import { SettingsController } from './controllers/settings-controller';
import { AboutPage } from './app-components/about-page';
import { GamePage } from './app-components/game-page';
import { GameController } from './controllers/game-controller';
import { SettingPage } from './app-components/setting-page';
import { DIFFICULTY_REGEXP } from './shared/constans';
import { Validator } from './controllers/validator';
import { UsersData } from './controllers/users-data';

window.onload = () => {
  const rootElement = document.getElementById('app');
  if (!rootElement) throw new Error('No root element');
  const app = new App(rootElement);
  app.render();

  const page = app.getPage();

  const aboutPage = new AboutPage(page);
  const gamePage = new GamePage(page);
  const settingPage = new SettingPage(page);

  const registerForm = app.registerModal;

  registerForm.getButtonCancel().addEventListener('click', () => {
    registerForm.inputUserPhoto.getLabel().classList.remove('no-bg');
  });

  const settingsController = new SettingsController(settingPage);
  const gameController = new GameController(gamePage, settingsController, app);
  const validator = new Validator(registerForm);
  const usersData = new UsersData(registerForm, gameController);

  const router = new Router(app, aboutPage, gamePage, settingPage);
  router.updateRoute();
  window.onpopstate = () => {
    router.updateRoute();
  };

  settingsController.dropItemsGameCards.forEach((dropdownItem) => {
    const option = dropdownItem.getDropdownItem();
    option.addEventListener('click', () => {
      settingsController.getButtonGameCards().innerHTML = option.innerText;
      settingsController.setGameCards(option.innerText);
    });
  });

  settingsController.dropItemsDifficulty.forEach((dropdownItem) => {
    const option = dropdownItem.getDropdownItem();
    option.addEventListener('click', () => {
      settingsController.getButtonDifficulty().innerHTML = option.innerText;
      let selectedDifficulty = Number(option.innerText.match(DIFFICULTY_REGEXP));
      selectedDifficulty = selectedDifficulty * selectedDifficulty / 2;
      settingsController.setDifficulty(selectedDifficulty);
    });
  });

  const buttonStart = app.header.getButtonStart();
  const buttonStop = app.header.getButtonStop();

  buttonStart.addEventListener('click', () => {
    gameController.startGame();
    buttonStart.classList.add('hidden');
    buttonStop.classList.remove('hidden');
  });

  buttonStop.addEventListener('click', () => {
    gameController.stopGame();
    buttonStop.classList.add('hidden');
    buttonStart.classList.remove('hidden');
    gameController.getCardsField().innerHTML = '<div class="text-message">Click START GAME for a new game<div>';
  });

  registerForm.getModalRegister().addEventListener('submit', (event) => {
    event.preventDefault();
    try {
      usersData.addUser();
    } catch (e) {
      UsersData.clearStorage();
      usersData.addUser();
    }
    $('#register-modal').modal('hide');
    window.location.href = '#score';
  });

  gamePage.modalWin.getButtonNo().addEventListener('click', () => {
    $('#modal-win').modal('hide');
  });
};
