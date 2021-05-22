import { BaseComponent } from '../base-component';
import { Component } from '../component';

export class InputLastName extends BaseComponent implements Component {
  label: BaseComponent;

  input: BaseComponent;

  error: BaseComponent;

  constructor() {
    super('div', ['form-group']);
    this.label = new BaseComponent('label', ['label-name']);
    this.label.element.setAttribute('for', 'last-name');
    this.label.element.innerText = 'Last Name';
    this.input = new BaseComponent('input', ['form-control']);
    this.input.element.setAttribute('type', 'text');
    this.input.element.setAttribute('id', 'last-name');
    this.input.element.setAttribute('placeholder', 'Enter your Last Name');
    this.error = new BaseComponent('div', ['input-error']);
  }

  render() {
    this.element.append(this.label.element, this.input.element, this.error.element);
    return this.element;
  }
}
