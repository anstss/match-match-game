import 'bootstrap';
import './styles.scss';

import { App } from './app';

window.onload = () => {
  const rootElement = document.getElementById('app');
  if (!rootElement) throw new Error('No root element');
  const app = new App(rootElement);
  app.render();
};
