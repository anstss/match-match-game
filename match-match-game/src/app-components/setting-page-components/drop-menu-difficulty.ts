import { DropdownItem } from './dropdown-item';
import { DropdownMenu } from './dropdown-menu';

export class DropMenuDifficulty extends DropdownMenu {
  options: string[];

  dropItems: DropdownItem[];

  dropItemEasy: DropdownItem;

  dropItemNormal: DropdownItem;

  constructor(options: string[]) {
    super();
    this.options = options;
    this.dropItemEasy = new DropdownItem(this.options[0]);
    this.dropItemNormal = new DropdownItem(this.options[1]);
    this.dropItems = [this.dropItemEasy, this.dropItemNormal];
  }

  render() {
    this.element.appendChild(this.dropItemEasy.element);
    this.element.appendChild(this.dropItemNormal.element);

    return this.element;
  }
}
