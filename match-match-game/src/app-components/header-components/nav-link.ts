import { BaseComponent } from '../../shared/base-component';

export class NavLink extends BaseComponent {
  constructor(readonly pageName: string, readonly pageIcon: string, readonly href: string) {
    super('a', ['nav-link']);
    this.initialize();
  }

  initialize() {
    this.element.innerHTML = `
      <img class="nav-icon" src="./icons/${this.pageIcon}" alt="${this.pageName} Icon">${this.pageName}`;
    this.element.setAttribute('href', this.href);
  }
}
