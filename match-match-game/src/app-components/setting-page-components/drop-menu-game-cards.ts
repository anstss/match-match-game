import { Component } from '../../shared/component';
import { DropdownItem } from './dropdown-item';
import { DropdownMenu } from './dropdown-menu';

export class DropMenuGameCards extends DropdownMenu implements Component {
  options: string[];

  constructor(options: string[]) {
    super();
    this.options = options;
  }

  render() {
    const dropItemAnimals = new DropdownItem(this.options[0]);
    const dropItemNature = new DropdownItem(this.options[1]);
    this.element.appendChild(dropItemAnimals.element);
    this.element.appendChild(dropItemNature.element);

    return this.element;
  }
}
