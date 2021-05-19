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

window.onload = () => {
  const rootElement = document.getElementById('app');
  if (!rootElement) throw new Error('No root element');
  new App(rootElement).render();
  const page = document.getElementById('page');
  if (!page) throw new Error('No page');
  const settingsController = new SettingsController(page);
  settingsController.setGameCards(settingsController.category);
  settingsController.dropItemsGameCards.forEach((option) => {
    option.element.addEventListener('click', () => {
      settingsController.setGameCards(option.element.innerText);
    });
  });
  // console.log(settingsController.category);
  
  settingsController.test();
  const router = new Router(page, settingsController);
  router.updateRoute();
  window.onpopstate = () => router.updateRoute();
};
