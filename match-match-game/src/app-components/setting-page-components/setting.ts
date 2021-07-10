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

  getSettingTitle() {
    return this.settingTitle.element;
  }

  getButton() {
    return this.button.element;
  }

  render() {
    this.element.appendChild(this.getSettingTitle());
    this.element.appendChild(this.getButton());

    return this.element;
  }
}
