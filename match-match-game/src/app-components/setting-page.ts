import { BaseComponent } from '../shared/base-component';
import { Component } from '../shared/component';
import { DropMenuDifficulty } from './setting-page-components/drop-menu-difficulty';
import { DropMenuGameCards } from './setting-page-components/drop-menu-game-cards';
import { Setting } from './setting-page-components/setting';
import './_setting-page.scss';

export class SettingPage extends BaseComponent implements Component {
  settingGameCards: Setting;

  dropdownMenuGameCards: DropMenuGameCards;

  settingDifficulty: Setting;

  dropdownMenuDifficulty: DropMenuDifficulty;

  container: HTMLElement;

  settingsInner: HTMLElement;

  constructor(private readonly page: HTMLElement) {
    super('div', ['settings']);
    this.container = new BaseComponent('div', ['container']).element;
    this.settingsInner = new BaseComponent('div', ['settings__inner']).element;
    this.settingGameCards = new Setting('Game cards', 'Select game cards type');
    this.dropdownMenuGameCards = new DropMenuGameCards(['Animals', 'Nature']);
    this.settingDifficulty = new Setting('Difficulty', 'Select game type');
    this.dropdownMenuDifficulty = new DropMenuDifficulty(['4x4', '6x6']);
  }

  render() {
    this.page.appendChild(this.element);
    // const container = new BaseComponent('div', ['container']).element;
    this.element.appendChild(this.container);
    // const settingsInner = new BaseComponent('div', ['settings__inner']).element;
    this.container.appendChild(this.settingsInner);
    // const settingGameCards = new Setting('Game cards', 'Select game cards type').render();
    this.settingsInner.appendChild(this.settingGameCards.render());
    // const dropdownMenuGameCards = new DropMenuGameCards(['Animals', 'Nature']).render();
    this.settingGameCards.element.appendChild(this.dropdownMenuGameCards.render());
    // const settingDifficulty = new Setting('Difficulty', 'Select game type').render();
    this.settingsInner.appendChild(this.settingDifficulty.render());
    // const dropdownMenuDifficulty = new DropMenuDifficulty(['4x4', '6x6']).render();
    this.settingDifficulty.element.appendChild(this.dropdownMenuDifficulty.render());

    return this.element;
  }
}
