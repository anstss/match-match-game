import { Component } from '../../shared/component';
import { DropdownItem } from './dropdown-item';
import { DropdownMenu } from './dropdown-menu';

export class DropMenuDifficulty extends DropdownMenu implements Component {
  options: string[];

  constructor(options: string[]) {
    super();
    this.options = options;
  }

  render() {
    const dropItemEasy = new DropdownItem(this.options[0]);
    const dropItemNormal = new DropdownItem(this.options[1]);
    this.element.appendChild(dropItemEasy.element);
    this.element.appendChild(dropItemNormal.element);

    return this.element;
  }
}
