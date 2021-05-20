// import 'popper.js';
// require('bootstrap');
// import 'popper.js';
// import 'jquery';
// import '@popperjs/core';
// import 'bootstrap';
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

window.onload = () => {
  const rootElement = document.getElementById('app');
  if (!rootElement) throw new Error('No root element');
  new App(rootElement).render();
  const page = document.getElementById('page');
  if (!page) throw new Error('No page');
  const aboutPage = new AboutPage(page);
  const gamePage = new GamePage(page);
  const settingPage = new SettingPage(page);

  const settingsController = new SettingsController(settingPage);
    // settingsController.setGameCards(settingsController.category);
  const gameController = new GameController(gamePage, settingsController);


  settingsController.dropItemsGameCards.forEach((option) => {
    option.element.addEventListener('click', () => {
      settingsController.buttonGameCards.element.innerHTML = option.element.innerText;
      settingsController.setGameCards(option.element.innerText);
      // console.log(option.element.innerText);
      
    });
  });

  settingsController.dropItemsDifficulty.forEach((option) => {
    option.element.addEventListener('click', () => {
      settingsController.buttonDifficulty.element.innerHTML = option.element.innerText;
      let selectedDifficulty = Number(option.element.innerText.match(DIFFICULTY_REGEXP));
      selectedDifficulty = selectedDifficulty * selectedDifficulty / 2;
      // console.log(selectedDifficulty);
      settingsController.setDifficulty(selectedDifficulty);
      // console.log(option.element.innerText);
      
    });
  });
  // console.log(settingsController.category);
  
  // settingsController.test();
  const router = new Router(page, aboutPage, settingsController, gameController);
  router.updateRoute();
  window.onpopstate = () => router.updateRoute();
};
