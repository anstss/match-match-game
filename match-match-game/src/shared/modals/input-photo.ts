import { BaseComponent } from '../base-component';
import { Component } from '../component';

export class InputPhoto extends BaseComponent implements Component {
  input: BaseComponent;

  label: BaseComponent;

  constructor() {
    super('div', ['custom-file']);
    this.input = new BaseComponent('input', ['custom-file-input']);
    this.input.element.setAttribute('type', 'file');
    this.input.element.setAttribute('id', 'add-user-photo');
    this.label = new BaseComponent('label', ['custom-file-label']);
    this.label.element.setAttribute('for', 'add-user-photo');
  }

  render() {
    this.element.append(this.input.element, this.label.element);
    return this.element;
  }
}
