import { DropdownItem } from './dropdown-item';
import { DropdownMenu } from './dropdown-menu';

export class DropMenuGameCards extends DropdownMenu {
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

  getDropItemAnimals() {
    return this.dropItemAnimals.element;
  }

  getDropItemNature() {
    return this.dropItemNature.element;
  }

  render() {
    this.element.appendChild(this.getDropItemAnimals());
    this.element.appendChild(this.getDropItemNature());

    return this.element;
  }
}
