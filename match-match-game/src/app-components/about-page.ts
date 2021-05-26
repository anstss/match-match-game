import './_about-page.scss';
import { BaseComponent } from '../shared/base-component';
import { Component } from '../shared/component';
import { AboutElem } from './about-page-components/about-elem';
import { Title } from './title';

export class AboutPage extends BaseComponent implements Component {
  container: HTMLElement;

  aboutInner: HTMLElement;

  aboutTitle: HTMLElement;

  stepOne: HTMLElement;

  stepTwo: HTMLElement;

  stepThree: HTMLElement;

  constructor(private readonly page: HTMLElement) {
    super('div', ['about']);
    this.container = new BaseComponent('div', ['container']).element;
    this.aboutInner = new BaseComponent('div', ['about__inner']).element;
    this.aboutTitle = new Title('How to play?', ['about__title']).element;
    this.stepOne = new AboutElem('1', 'Register new player in game').element;
    this.stepTwo = new AboutElem('2', 'Configure your game settings').element;
    this.stepThree = new AboutElem('3', 'Configure your game settings').element;
  }

  render(): HTMLElement {
    this.page.appendChild(this.element);
    this.element.appendChild(this.container);
    this.container.appendChild(this.aboutInner);
    this.aboutInner.append(this.aboutTitle, this.stepOne, this.stepTwo, this.stepThree);

    return this.element;
  }
}
