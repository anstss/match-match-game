import { BaseComponent } from '../base-component';

export class Input extends BaseComponent {
  label: BaseComponent;
  error: BaseComponent;
  input: HTMLInputElement;
  isValid: boolean;

  constructor(readonly attributeValue: string, readonly text: string, readonly type: string) {
    super('div', ['form-group']);
    this.label = new BaseComponent('label', ['label-name']);
    this.input = document.createElement('input');
    this.error = new BaseComponent('div', ['input-error']);
    this.isValid = false;
    this.initialize();
  }

  initialize() {
    this.initializeLabel();
    this.initializeInput();
  }

  initializeLabel() {
    this.getLabel().setAttribute('for', this.attributeValue);
    this.getLabel().innerText = this.text;
  }

  initializeInput() {
    this.input.classList.add('form-control');
    this.input.setAttribute('type', this.type);
    this.input.setAttribute('id', this.attributeValue);
    this.input.setAttribute('placeholder', `Enter your ${this.text}`);
    this.input.setAttribute('name', this.attributeValue);
  }

  getLabel() {
    return this.label.element;
  }

  getError() {
    return this.error.element;
  }

  render() {
    this.element.append(this.getLabel(), this.input, this.getError());
    return this.element;
  }
}
