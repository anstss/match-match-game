// import 'popper.js';
// require('bootstrap');
// import 'popper.js';
// import 'bootstrap';
// import "~bootstrap/scss/bootstrap.scss";
import './styles.scss';

import { App } from './app';
import { Router } from './controllers/router';

window.onload = () => {
  const rootElement = document.getElementById('app');
  if (!rootElement) throw new Error('No root element');
  new App(rootElement).render();
  const page = document.getElementById('page');
  if (!page) throw new Error('No page');
  const router = new Router(page);
  router.updateRoute();
  window.onpopstate = () => router.updateRoute();
};
