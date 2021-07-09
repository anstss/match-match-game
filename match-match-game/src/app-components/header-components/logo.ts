import { BaseComponent } from '../../shared/base-component';

export class Logo extends BaseComponent {
  constructor(readonly href: string) {
    super('a', ['nav-link', 'nav-link_logo']);
    this.initialize();
  }

  initialize() {
    this.element.innerHTML = `
    <div class="logo">
      <div class="logo__match">Match</div>
      <div class="logo__match logo__match--highlighted">Match</div>
    </div>
    `;
    this.element.setAttribute('href', this.href);
  }
}
