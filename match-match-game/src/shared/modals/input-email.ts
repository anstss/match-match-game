import { BaseComponent } from '../base-component';

export class InputEmail extends BaseComponent {
  label: BaseComponent;
  error: BaseComponent;
  input: HTMLInputElement;
  isValid: boolean;

  constructor() {
    super('div', ['form-group']);
    this.label = new BaseComponent('label', ['label-name']);
    this.label.element.setAttribute('for', 'email');
    this.label.element.innerText = 'Email';
    this.input = document.createElement('input');
    this.input.classList.add('form-control');
    this.input.setAttribute('type', 'email');
    this.input.setAttribute('id', 'email');
    this.input.setAttribute('placeholder', 'Enter your email');
    this.input.setAttribute('name', 'email');
    this.error = new BaseComponent('div', ['input-error']);
    this.isValid = false;
  }

  render() {
    this.element.append(this.label.element, this.input, this.error.element);
    return this.element;
  }
}
