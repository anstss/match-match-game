import { BaseComponent } from '../base-component';

export class Input extends BaseComponent {
  label: BaseComponent;
  error: BaseComponent;
  input: HTMLInputElement;
  isValid: boolean;

  constructor(attributeValue: string, text: string, type: string) {
    super('div', ['form-group']);
    this.label = new BaseComponent('label', ['label-name']);
    this.label.element.setAttribute('for', attributeValue);
    this.label.element.innerText = text;
    this.input = document.createElement('input');
    this.input.classList.add('form-control');
    this.input.setAttribute('type', type);
    this.input.setAttribute('id', attributeValue);
    this.input.setAttribute('placeholder', `Enter your ${text}`);
    this.input.setAttribute('name', attributeValue);
    this.error = new BaseComponent('div', ['input-error']);
    this.isValid = false;
  }

  render() {
    this.element.append(this.label.element, this.input, this.error.element);
    return this.element;
  }
}
