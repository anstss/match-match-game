import { App } from '../app';
import { AboutPage } from '../app-components/about-page';
import { GamePage } from '../app-components/game-page';
import { ScorePage } from '../app-components/score-page';
import { SettingPage } from '../app-components/setting-page';

export class Router {
  page: HTMLElement;
  aboutPage: AboutPage;
  gamePage: GamePage;
  settingPage: SettingPage;
  app: App;

  constructor(app: App, aboutPage: AboutPage,
    gamePage: GamePage, settingPage: SettingPage) {
    this.app = app;
    this.page = app.getPage();
    this.aboutPage = aboutPage;
    this.gamePage = gamePage;
    this.settingPage = settingPage;
  }

  startPageRoute = {
    routeName: 'about',
    component: () => {
      this.page.innerHTML = '';
      this.page.appendChild(this.aboutPage.render());
      this.clearActiveRoute();
      this.app.header.getNavItemAbout().classList.add('active-link');
    },
  };

  routes = [
    {
      routeName: 'score',
      component: () => {
        this.page.innerHTML = '';
        const scorePage = new ScorePage(this.page);
        this.page.appendChild(scorePage.render());
        this.clearActiveRoute();
        this.app.header.getNavItemScore().classList.add('active-link');
      },
    },
    {
      routeName: 'settings',
      component: () => {
        this.page.innerHTML = '';
        this.page.appendChild(this.settingPage.render());
        this.clearActiveRoute();
        this.app.header.getNavItemSettings().classList.add('active-link');
      },
    },
    {
      routeName: 'game',
      component: () => {
        this.page.innerHTML = '';
        this.page.appendChild(this.gamePage.render());
        this.clearActiveRoute();
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

  clearActiveRoute() {
    this.app.header.navItems.forEach((navItem) => {
      const item = navItem.element;
      item.classList.remove('active-link');
    });
  }
}
