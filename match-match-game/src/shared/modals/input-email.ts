import { BaseComponent } from '../base-component';
import { Component } from '../component';

export class InputEmail extends BaseComponent implements Component {
  label: BaseComponent;

  input: BaseComponent;

  error: BaseComponent;

  constructor() {
    super('div', ['form-group']);
    this.label = new BaseComponent('label', ['label-name']);
    this.label.element.setAttribute('for', 'email');
    this.label.element.innerText = 'Email';
    this.input = new BaseComponent('input', ['form-control']);
    this.input.element.setAttribute('type', 'email');
    this.input.element.setAttribute('id', 'email');
    this.input.element.setAttribute('placeholder', 'Enter your email');
    this.error = new BaseComponent('div', ['input-error']);
  }

  render() {
    this.element.append(this.label.element, this.input.element, this.error.element);
    return this.element;
  }
}
