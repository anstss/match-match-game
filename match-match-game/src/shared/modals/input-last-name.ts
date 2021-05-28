import { BaseComponent } from '../base-component';

export class InputLastName extends BaseComponent {
  label: BaseComponent;

  error: BaseComponent;

  input: HTMLInputElement;

  isValid: boolean;

  constructor() {
    super('div', ['form-group']);
    this.label = new BaseComponent('label', ['label-name']);
    this.label.element.setAttribute('for', 'last-name');
    this.label.element.innerText = 'Last Name';
    this.input = document.createElement('input');
    this.input.classList.add('form-control');
    this.input.setAttribute('type', 'text');
    this.input.setAttribute('id', 'last-name');
    this.input.setAttribute('placeholder', 'Enter your Last Name');
    this.input.setAttribute('name', 'last-name');
    this.error = new BaseComponent('div', ['input-error']);
    this.isValid = false;
  }

  render() {
    this.element.append(this.label.element, this.input, this.error.element);
    return this.element;
  }
}
