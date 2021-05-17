import './_about-page.scss';
import { BaseComponent } from '../shared/base-component';
import { Component } from '../shared/component';
import { AboutElem } from './about-page-components/about-elem';
import { Title } from './title';

export class AboutPage extends BaseComponent implements Component {
  constructor(private readonly page: HTMLElement) {
    super('div', ['about']);
  }

  render(): HTMLElement {
    this.page.appendChild(this.element);
    const container = new BaseComponent('div', ['container']).element;
    this.element.appendChild(container);
    const aboutInner = new BaseComponent('div', ['about__inner']).element;
    container.appendChild(aboutInner);
    const aboutTitle = new Title('How to play?', ['about__title']).element;
    const stepOne = new AboutElem('1', 'Register new player in game').element;
    const stepTwo = new AboutElem('2', 'Configure your game settings').element;
    const stepThree = new AboutElem('3', 'Configure your game settings').element;
    aboutInner.append(aboutTitle, stepOne, stepTwo, stepThree);
    return this.element;
  }
}
