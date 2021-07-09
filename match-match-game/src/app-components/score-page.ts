import { UsersData } from '../controllers/users-data';
import { UsersDataInterface } from '../interfaces/users-data-interface';
import { BaseComponent } from '../shared/base-component';
import { Player } from './score-page-component.ts/player';
import { Title } from './title';
import './_score-page.scss';

export class ScorePage extends BaseComponent {
  container: HTMLElement;
  scorePageInner: HTMLElement;
  scoreTitle: HTMLElement;
  topTen: UsersDataInterface[];
  top: BaseComponent;

  constructor(private readonly page: HTMLElement) {
    super('div', ['best-players']);
    this.container = new BaseComponent('div', ['container']).element;
    this.scorePageInner = new BaseComponent('div', ['best-players__inner']).element;
    this.scoreTitle = new Title('Best players', ['best-players__title']).element;
    this.top = new BaseComponent('div', ['top-ten']);
    this.topTen = UsersData.getTopTen(this);
    this.topTen.forEach((user) => {
      const player = user;
      if (!player['user-photo']) {
        player['user-photo'] = './icons/avatar.png';
      }
      this.top.element.appendChild(new Player(player['user-photo'], player['first-name'],
        player['last-name'], player.email, player.score).render());
    });
  }

  render() {
    this.page.appendChild(this.element);
    this.element.appendChild(this.container);
    this.container.appendChild(this.scorePageInner);
    this.scorePageInner.append(this.scoreTitle, this.top.element);

    return this.element;
  }
}
