import { BaseComponent } from "../../shared/base-component";

export class AboutElem extends BaseComponent {
  constructor(step: string, info: string) {
    super('div', ['about__elem']);
    this.element.innerHTML = `
    <div class="about__card">
        <div class="about__step">${step}</div>
        <div class="about__info">${info}</div>
    </div>
    <img class="about__img" src="images/about/about-${step}.jpg" alt=${info}>
    `;
  }
}