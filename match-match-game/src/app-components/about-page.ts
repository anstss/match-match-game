import './_about-page.scss';
import { BaseComponent } from '../shared/base-component';
import { AboutElem } from './about-page-components/about-elem';
import { Title } from './title';

export class AboutPage extends BaseComponent {
  container: BaseComponent;
  aboutInner: BaseComponent;
  aboutTitle: BaseComponent;
  stepOne: BaseComponent;
  stepTwo: BaseComponent;
  stepThree: BaseComponent;

  constructor(private readonly page: HTMLElement) {
    super('div', ['about']);
    this.container = new BaseComponent('div', ['container']);
    this.aboutInner = new BaseComponent('div', ['about__inner']);
    this.aboutTitle = new Title('How to play?', ['about__title']);
    this.stepOne = new AboutElem('1', 'Register new player in game');
    this.stepTwo = new AboutElem('2', 'Configure your game settings');
    this.stepThree = new AboutElem('3',
      'Start you new game! Remember card positions and match it before times up.');
  }

  getContainer() {
    return this.container.element;
  }

  getAboutInner() {
    return this.aboutInner.element;
  }

  getAboutTitle() {
    return this.aboutTitle.element;
  }

  getStepOne() {
    return this.stepOne.element;
  }

  getStepTwo() {
    return this.stepTwo.element;
  }

  getStepThree() {
    return this.stepThree.element;
  }

  render(): HTMLElement {
    this.page.appendChild(this.element);
    this.element.appendChild(this.getContainer());
    this.getContainer().appendChild(this.getAboutInner());
    this.getAboutInner().append(this.getAboutTitle(), this.getStepOne(), this.getStepTwo(), this.getStepThree());

    return this.element;
  }
}
