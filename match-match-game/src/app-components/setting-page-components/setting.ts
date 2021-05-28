import { BaseComponent } from '../../shared/base-component';
import { Title } from '../title';
import { DropdownButton } from './dropdown-button';

export class Setting extends BaseComponent {
  settingTitleText: string;

  buttonText: string;

  button: DropdownButton;

  settingTitle: Title;

  constructor(settingTitleText: string, buttonText: string) {
    super('div', ['setting']);
    this.settingTitleText = settingTitleText;
    this.buttonText = buttonText;
    this.button = new DropdownButton(this.buttonText);
    this.settingTitle = new Title(this.settingTitleText, ['setting-title']);
  }

  render() {
    this.element.appendChild(this.settingTitle.element);
    this.element.appendChild(this.button.element);

    return this.element;
  }
}
