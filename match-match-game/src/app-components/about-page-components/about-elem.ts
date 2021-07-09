import { BaseComponent } from '../../shared/base-component';

export class AboutElem extends BaseComponent {
  constructor(readonly step: string, readonly info: string) {
    super('div', ['about__elem']);
    this.initialize();
  }

  initialize() {
    this.element.innerHTML = `
    <div class="about__card">
        <div class="about__step">${this.step}</div>
        <div class="about__info">${this.info}</div>
    </div>
    <img class="about__img" src="images/about/about-${this.step}.jpg" alt=${this.info}>
    `;
  }
}
