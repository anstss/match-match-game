// import 'popper.js';
// require('bootstrap');
// import 'popper.js';
// import 'jquery';
// import '@popperjs/core';
// import bootstrap from 'bootstrap';
import $ from 'jquery';
import 'bootstrap';
// import "~bootstrap/scss/bootstrap.scss";
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
  const page = app.page.element;
  // if (!page) throw new Error('No page');
  const aboutPage = new AboutPage(page);
  const gamePage = new GamePage(page);
  const settingPage = new SettingPage(page);
  const router = new Router(page, aboutPage, gamePage, settingPage);
  router.updateRoute();
  window.onpopstate = () => router.updateRoute();

  const settingsController = new SettingsController(settingPage);
  const gameController = new GameController(gamePage, settingsController);

  settingsController.dropItemsGameCards.forEach((option) => {
    option.element.addEventListener('click', () => {
      settingsController.buttonGameCards.element.innerHTML = option.element.innerText;
      settingsController.setGameCards(option.element.innerText);
    });
  });

  settingsController.dropItemsDifficulty.forEach((option) => {
    option.element.addEventListener('click', () => {
      settingsController.buttonDifficulty.element.innerHTML = option.element.innerText;
      let selectedDifficulty = Number(option.element.innerText.match(DIFFICULTY_REGEXP));
      selectedDifficulty = selectedDifficulty * selectedDifficulty / 2;
      settingsController.setDifficulty(selectedDifficulty);
    });
  });

  const { buttonStart } = app.header;
  const { buttonStop } = app.header;

  buttonStart.element.addEventListener('click', () => {
    gameController.startGame();
    buttonStart.element.classList.add('hidden');
    buttonStop.element.classList.remove('hidden');
  });

  buttonStop.element.addEventListener('click', () => {
    gameController.stopGame();
    buttonStop.element.classList.add('hidden');
    buttonStart.element.classList.remove('hidden');
    gameController.cardsField.element.innerHTML = '<div class="text-message">Click START GAME for a new game<div>';
  });

  const registerForm = app.registerModal;
  // const usersData = new UsersData(registerForm, gameController);
  const validator = new Validator(registerForm);
  const usersData = new UsersData(registerForm, gameController);

  $('#register-form').on('submit', (event) => {
    event.preventDefault();
    usersData.addUser();
    // validator.getUser();
  });

  // function submitForm(event: MouseEvent) {
  //   event.preventDefault();
  //   validator.getUser();
  // }

  // registerForm.buttonCancel.element.addEventListener('click', () => {
  //   registerForm.inputs.forEach((inputElem) => {
  //     inputElem.input.value = '';
  //     inputElem.input.classList.remove('valid');
  //     inputElem.error.element.innerText = '';
  //     // input.value = '';
  //     // input.element.innerText = '';
  //   });
  // });

  // inputs.forEach((inputElem) => {
  //   inputElem.input.addEventListener('change', () => {
  //     console.log(inputElem.input.value);
  //   });
  // });

  // inputs.forEach((input) => {
  //   input.input.element.addEventListener('change', () => {
  //     console.log(input.input.element.nodeValue);
  //   });

  // });
};
