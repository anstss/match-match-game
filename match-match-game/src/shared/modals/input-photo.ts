import { BaseComponent } from '../base-component';

export class InputPhoto extends BaseComponent {
  label: BaseComponent;

  input: HTMLInputElement;

  isValid: boolean;

  error: BaseComponent;

  userImg: BaseComponent;

  imgValue: string;

  constructor() {
    super('div', ['custom-file']);
    this.input = document.createElement('input');
    this.input.classList.add('custom-file-input');
    this.input.setAttribute('type', 'file');
    this.input.setAttribute('id', 'add-user-photo');
    this.input.setAttribute('name', 'user-photo');
    this.input.setAttribute('accept', 'image/jpeg,image/jpg,image/png');
    this.input.setAttribute('title', '');
    this.imgValue = '';
    this.label = new BaseComponent('label', ['custom-file-label']);
    this.label.element.setAttribute('for', 'add-user-photo');
    this.userImg = new BaseComponent('img', ['selected-img']);
    this.error = new BaseComponent('div', ['input-error']);
    this.isValid = true;
  }

  render() {
    this.label.element.appendChild(this.userImg.element);
    this.element.append(this.input, this.label.element, this.error.element);
    return this.element;
  }
}
