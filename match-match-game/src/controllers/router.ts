import { AboutPage } from '../app-components/about-page';
import { GamePage } from '../app-components/game-page';
import { ScorePage } from '../app-components/score-page';
import { SettingPage } from '../app-components/setting-page';
import { Header } from '../app-components/header';

export class Router {
  private header: Header;
  private readonly appPage: HTMLElement;
  private aboutPage: AboutPage;
  private gamePage: GamePage;
  private settingPage: SettingPage;

  constructor(header: Header, appPage: HTMLElement, aboutPage: AboutPage,
    gamePage: GamePage, settingPage: SettingPage) {
    this.header = header;
    this.appPage = appPage;
    this.aboutPage = aboutPage;
    this.gamePage = gamePage;
    this.settingPage = settingPage;
  }

  startPageRoute = {
    routeName: 'about',
    component: () => {
      this.appPage.innerHTML = '';
      this.appPage.appendChild(this.aboutPage.render());
      this.clearActiveRoute();
      this.header.getNavItemAbout().classList.add('active-link');
    },
  };

  routes = [
    {
      routeName: 'score',
      component: () => {
        this.appPage.innerHTML = '';
        const scorePage = new ScorePage(this.appPage);
        this.appPage.appendChild(scorePage.render());
        this.clearActiveRoute();
        this.header.getNavItemScore().classList.add('active-link');
      },
    },
    {
      routeName: 'settings',
      component: () => {
        this.appPage.innerHTML = '';
        this.appPage.appendChild(this.settingPage.render());
        this.clearActiveRoute();
        this.header.getNavItemSettings().classList.add('active-link');
      },
    },
    {
      routeName: 'game',
      component: () => {
        this.appPage.innerHTML = '';
        this.appPage.appendChild(this.gamePage.render());
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
    this.header.navItems.forEach((navItem) => {
      const item = navItem.element;
      item.classList.remove('active-link');
    });
  }
}
