import { UsersData } from '../controllers/users-data';
import { UsersDataInterface } from '../models/users-data-interface';
import { BaseComponent } from '../shared/base-component';
import { Component } from '../shared/component';
import { Player } from './score-page-component.ts/player';
import { Title } from './title';
import './_score-page.scss';

export class ScorePage extends BaseComponent implements Component {
  container: HTMLElement;
  scorePageInner: HTMLElement;
  scoreTitle: HTMLElement;
  topTen: UsersDataInterface[];
  top: BaseComponent;
  constructor(private readonly page: HTMLElement, usersData: UsersData) {
    super('div', ['best-players']);
    this.container = new BaseComponent('div', ['container']).element;
    this.scorePageInner = new BaseComponent('div', ['best-players__inner']).element;
    this.scoreTitle = new Title('Best players', ['best-players__title']).element;
    this.top = new BaseComponent('div', ['top-ten']);
    // this.top.element.innerText = `No registered players`;
    // window.onload = () => {

    // }
    this.topTen = usersData.getTopTen();
    this.topTen.forEach((user) => {
      if (user['user-photo'] === null) {
        user['user-photo'] = `./icons/avatar.png`;
      }
      // console.log(user['first-name']);
      
      // for (let key in user) {
      //   console.log(key);
        
      // }
      this.top.element.appendChild(new Player(user['user-photo'], user['first-name'],
      user['last-name'], user['email'], user['score']).render());
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