import { BaseComponent } from '../../shared/base-component';

export class NavLink extends BaseComponent {
  constructor(pageName: string, pageIcon: string, href: string) {
    super('a', ['nav-link']);
    this.element.innerHTML = `
      <img class="nav-icon" src="./icons/${pageIcon}" alt="${pageName} Icon">
      ${pageName}
    `;
    this.element.setAttribute('href', href);
  }
}
