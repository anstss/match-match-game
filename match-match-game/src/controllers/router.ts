import { AboutPage } from '../app-components/about-page';
import { GameControllers } from './game-controllers';

export class Router {
  page: HTMLElement;

  constructor(page: HTMLElement) {
    this.page = page;
  }

  startPageRoute = {
    routeName: 'about',
    component: () => {
      this.page.innerHTML = '';
      const aboutPage = new AboutPage(this.page);
      this.page.appendChild(aboutPage.render());
    },
  };

  routes = [
    {
      routeName: 'score',
      component: () => {
        this.page.innerHTML = 'score page';
      },
    },
    {
      routeName: 'settings',
      component: () => {
        this.page.innerHTML = 'settings page';
      },
    },
    {
      routeName: 'game',
      component: () => {
        this.page.innerHTML = '';
        // const gamePage = new GamePage(this.page);
        // this.page.appendChild(gamePage.render());
        const gameController = new GameControllers(this.page);
        this.page.appendChild(gameController.gamePage.render());
        gameController.startGame();
      },
    },
  ];

  updateRoute() {
    const currentRouteName = window.location.hash.slice(1);
    const currentRoute = this.routes.find((route) => route.routeName === currentRouteName);
    if (currentRoute) {
      currentRoute.component();
    } else {
      this.startPageRoute.component();
    }
  }
}
