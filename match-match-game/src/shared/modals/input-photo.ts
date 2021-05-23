import { BaseComponent } from '../base-component';
import { Component } from '../component';

export class InputPhoto extends BaseComponent implements Component {
  label: BaseComponent;

  input: HTMLInputElement;

  isValid: boolean;

  error: BaseComponent;

  constructor() {
    super('div', ['custom-file']);
    this.input = document.createElement('input');
    this.input.classList.add('custom-file-input');
    // this.input = new BaseComponent('input', ['custom-file-input']);
    this.input.setAttribute('type', 'file');
    this.input.setAttribute('id', 'add-user-photo');
    this.input.setAttribute('name', 'user-photo');
    this.input.setAttribute('accept', 'image/jpeg,image/png,image/jpg');
    this.label = new BaseComponent('label', ['custom-file-label']);
    this.label.element.setAttribute('for', 'add-user-photo');
    this.error = new BaseComponent('div', ['input-error']);
    this.isValid = true;
  }

  render() {
    this.element.append(this.input, this.label.element, this.error.element);
    return this.element;
  }
}
