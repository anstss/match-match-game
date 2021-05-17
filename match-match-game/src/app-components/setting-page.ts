import { BaseComponent } from '../shared/base-component';
import { Component } from '../shared/component';
import { DropMenuDifficulty } from './setting-page-components/drop-menu-difficulty';
import { DropMenuGameCards } from './setting-page-components/drop-menu-game-cards';
import { Setting } from './setting-page-components/setting';
import './_setting-page.scss';

export class SettingPage extends BaseComponent implements Component {
  constructor(private readonly page: HTMLElement) {
    super('div', ['settings']);
  }

  render() {
    this.page.appendChild(this.element);
    const container = new BaseComponent('div', ['container']).element;
    this.element.appendChild(container);
    const settingsInner = new BaseComponent('div', ['settings__inner']).element;
    container.appendChild(settingsInner);
    const settingGameCards = new Setting('Game cards', 'Select game cards type').render();
    settingsInner.appendChild(settingGameCards);
    const dropdownMenuGameCards = new DropMenuGameCards(['Animals', 'Nature']).render();
    settingGameCards.appendChild(dropdownMenuGameCards);
    const settingDifficulty = new Setting('Difficulty', 'Select game type').render();
    settingsInner.appendChild(settingDifficulty);
    const dropdownMenuDifficulty = new DropMenuDifficulty(['4x4', '6x6']).render();
    settingDifficulty.appendChild(dropdownMenuDifficulty);

    return this.element;
  }
}
