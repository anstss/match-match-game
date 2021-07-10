import { BaseComponent } from '../shared/base-component';
import { DropMenuDifficulty } from './setting-page-components/drop-menu-difficulty';
import { DropMenuGameCards } from './setting-page-components/drop-menu-game-cards';
import { Setting } from './setting-page-components/setting';
import './_setting-page.scss';

export class SettingPage extends BaseComponent {
  settingGameCards: Setting;
  dropdownMenuGameCards: DropMenuGameCards;
  settingDifficulty: Setting;
  dropdownMenuDifficulty: DropMenuDifficulty;
  container: BaseComponent;
  settingsInner: BaseComponent;

  constructor(private readonly page: HTMLElement) {
    super('div', ['settings']);
    this.container = new BaseComponent('div', ['container']);
    this.settingsInner = new BaseComponent('div', ['settings__inner']);
    this.settingGameCards = new Setting('Game cards', 'Animals');
    this.dropdownMenuGameCards = new DropMenuGameCards(['Animals', 'Nature']);
    this.settingDifficulty = new Setting('Difficulty', '4x4');
    this.dropdownMenuDifficulty = new DropMenuDifficulty(['4x4', '6x6']);
  }

  getContainer() {
    return this.container.element;
  }

  getSettingsInner() {
    return this.settingsInner.element;
  }

  getSettingGameCards() {
    return this.settingGameCards.element;
  }

  getSettingDifficulty() {
    return this.settingDifficulty.element;
  }

  render() {
    this.page.appendChild(this.element);
    this.element.appendChild(this.getContainer());
    this.getContainer().appendChild(this.getSettingsInner());
    this.getSettingsInner().appendChild(this.settingGameCards.render());
    this.getSettingGameCards().appendChild(this.dropdownMenuGameCards.render());
    this.getSettingsInner().appendChild(this.settingDifficulty.render());
    this.getSettingDifficulty().appendChild(this.dropdownMenuDifficulty.render());

    return this.element;
  }
}
