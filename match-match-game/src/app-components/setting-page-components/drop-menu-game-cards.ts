import { Component } from '../../shared/component';
import { DropdownItem } from './dropdown-item';
import { DropdownMenu } from './dropdown-menu';

export class DropMenuGameCards extends DropdownMenu implements Component {
  options: string[];

  dropItems: DropdownItem[];

  dropItemAnimals: DropdownItem;

  dropItemNature: DropdownItem;

  constructor(options: string[]) {
    super();
    this.options = options;
    this.dropItemAnimals = new DropdownItem(this.options[0]);
    this.dropItemNature = new DropdownItem(this.options[1]);
    this.dropItems = [this.dropItemAnimals, this.dropItemNature];
  }

  render() {
    this.element.appendChild(this.dropItemAnimals.element);
    this.element.appendChild(this.dropItemNature.element);

    return this.element;
  }
}
