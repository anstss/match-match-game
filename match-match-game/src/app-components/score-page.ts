import { UsersData } from '../controllers/users-data';
import { UsersDataInterface } from '../interfaces/users-data-interface';
import { BaseComponent } from '../shared/base-component';
import { Player } from './score-page-component.ts/player';
import { Title } from './title';
import './_score-page.scss';

export class ScorePage extends BaseComponent {
  container: BaseComponent;
  scorePageInner: BaseComponent;
  scoreTitle: BaseComponent;
  topTen: UsersDataInterface[];
  top: BaseComponent;

  constructor(private readonly page: HTMLElement) {
    super('div', ['best-players']);
    this.container = new BaseComponent('div', ['container']);
    this.scorePageInner = new BaseComponent('div', ['best-players__inner']);
    this.scoreTitle = new Title('Best players', ['best-players__title']);
    this.top = new BaseComponent('div', ['top-ten']);
    this.topTen = UsersData.getTopTen(this);
    this.showTopTen();
  }

  getContainer() {
    return this.container.element;
  }

  getScorePageInner() {
    return this.scorePageInner.element;
  }

  getScoreTitle() {
    return this.scoreTitle.element;
  }

  getTop() {
    return this.top.element;
  }

  showTopTen() {
    this.topTen.forEach((user) => {
      const player = user;
      if (!player['user-photo']) {
        player['user-photo'] = './icons/avatar.png';
      }
      this.getTop().appendChild(new Player(player['user-photo'], player['first-name'],
        player['last-name'], player.email, player.score).render());
    });
  }

  render() {
    this.page.appendChild(this.element);
    this.element.appendChild(this.getContainer());
    this.getContainer().appendChild(this.getScorePageInner());
    this.getScorePageInner().append(this.getScoreTitle(), this.getTop());

    return this.element;
  }
}
