import { BaseComponent } from '../../shared/base-component';

export class Logo extends BaseComponent {
  constructor(href: string) {
    super('a', ['nav-link', 'nav-link_logo']);
    this.element.innerHTML = `
    <div class="logo">
      <div class="logo__match">Match</div>
      <div class="logo__match logo__match_highlighted">Match</div>
    </div>
    `;
    this.element.setAttribute('href', href);
  }
}
