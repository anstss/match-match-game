import { SettingPage } from '../app-components/setting-page';
import { DropMenuDifficulty } from '../app-components/setting-page-components/drop-menu-difficulty';
import { DropMenuGameCards } from '../app-components/setting-page-components/drop-menu-game-cards';
import { DropdownButton } from '../app-components/setting-page-components/dropdown-button';
import { DropdownItem } from '../app-components/setting-page-components/dropdown-item';
import { DEFAULT_CATEGORY, DEFAULT_DIFFICULTY } from '../shared/constans';

export class SettingsController {
  settingsPage: SettingPage;
  buttonGameCards: DropdownButton;
  dropMenuGameCards: DropMenuGameCards;
  dropItemsGameCards: DropdownItem[];
  category: string;
  difficulty: number;
  buttonDifficulty: DropdownButton;
  dropMenuDifficulty: DropMenuDifficulty;
  dropItemsDifficulty: DropdownItem[];

  constructor(readonly settingPage: SettingPage) {
    this.settingsPage = settingPage;
    this.buttonGameCards = this.settingsPage.settingGameCards.button;
    this.dropMenuGameCards = this.settingsPage.dropdownMenuGameCards;
    this.dropItemsGameCards = this.dropMenuGameCards.dropItems;
    this.buttonDifficulty = this.settingsPage.settingDifficulty.button;
    this.dropMenuDifficulty = this.settingsPage.dropdownMenuDifficulty;
    this.dropItemsDifficulty = this.settingsPage.dropdownMenuDifficulty.dropItems;
    this.category = DEFAULT_CATEGORY;
    this.difficulty = DEFAULT_DIFFICULTY;
  }

  getButtonGameCards() {
    return this.buttonGameCards.element;
  }

  getButtonDifficulty() {
    return this.buttonDifficulty.element;
  }

  setGameCards(newCategory: string) {
    this.category = newCategory;
  }

  setDifficulty(newDifficulty: number) {
    this.difficulty = newDifficulty;
  }
}
