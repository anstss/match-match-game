import { BaseComponent } from '../../shared/base-component';
import { Component } from '../../shared/component';
import { Title } from '../title';
import { DropMenuGameCards } from './drop-menu-game-cards';
import { DropdownButton } from './dropdown-button';

export class Setting extends BaseComponent implements Component {
  settingTitle: string;

  buttonText: string;

  constructor(settingTitle: string, buttonText: string) {
    super('div', ['setting']);
    this.settingTitle = settingTitle;
    this.buttonText = buttonText;
  }

  render() {
    const title = new Title(this.settingTitle, ['setting-title']).element;
    this.element.appendChild(title);
    const dropButtonGameCards = new DropdownButton(this.buttonText).element;
    this.element.appendChild(dropButtonGameCards);

    return this.element;
  }
}
