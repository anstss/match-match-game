import { AboutPage } from '../app-components/about-page';
import { GamePage } from '../app-components/game-page';
import { SettingPage } from '../app-components/setting-page';
import { GameController } from './game-controller';
import { SettingsController } from './settings-controller';

export class Router {
  page: HTMLElement;

  aboutPage: AboutPage;

  gamePage: GamePage;

  settingPage: SettingPage;

  constructor(page: HTMLElement, aboutPage: AboutPage,
    gamePage: GamePage, settingPage: SettingPage) {
    this.page = page;
    this.aboutPage = aboutPage;
    this.gamePage = gamePage;
    this.settingPage = settingPage;
  }

  startPageRoute = {
    routeName: 'about',
    component: () => {
      this.page.innerHTML = '';
      // const aboutPage = new AboutPage(this.page);
      this.page.appendChild(this.aboutPage.render());
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
        // this.page.innerHTML = 'settings page';
        this.page.innerHTML = '';
        // const settingPage = new SettingsController(this.page).settingsPage.render;
        // this.settingsController.settingsPage.element.innerHTML = '';
        this.page.appendChild(this.settingPage.render());
        // console.log(this.settingsController.category + " result");

        // settingsController.setGameCards(settingsController.category);
        // settingsController.dropItemsGameCards.forEach((option) => {
        //   option.element.addEventListener('click', () => {
        //     settingsController.setGameCards(option.element.innerText);
        //   });
        // });
        // settingsController.test();
        // this.page.appendChild(this.settingsController.settingsPage.render());
      },
    },
    {
      routeName: 'game',
      component: () => {
        this.page.innerHTML = '';
        // const gamePage = new GamePage(this.page);
        // this.page.appendChild(gamePage.render());
        // const gameController = new GameController(this.page, this.settingsController);
        this.page.appendChild(this.gamePage.render());
        // this.gameController.stopGame();
        // this.gameController.startGame();
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
