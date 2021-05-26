import { AboutPage } from '../app-components/about-page';
import { GamePage } from '../app-components/game-page';
import { ScorePage } from '../app-components/score-page';
import { SettingPage } from '../app-components/setting-page';

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
      this.page.appendChild(this.aboutPage.render());
    },
  };

  routes = [
    {
      routeName: 'score',
      component: () => {
        this.page.innerHTML = '';
        const scorePage = new ScorePage(this.page);
        this.page.appendChild(scorePage.render());
      },
    },
    {
      routeName: 'settings',
      component: () => {
        this.page.innerHTML = '';
        this.page.appendChild(this.settingPage.render());
      },
    },
    {
      routeName: 'game',
      component: () => {
        this.page.innerHTML = '';
        this.page.appendChild(this.gamePage.render());
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
