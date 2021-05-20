import { SettingPage } from "../app-components/setting-page";
import { DropMenuDifficulty } from "../app-components/setting-page-components/drop-menu-difficulty";
import { DropMenuGameCards } from "../app-components/setting-page-components/drop-menu-game-cards";
import { DropdownButton } from "../app-components/setting-page-components/dropdown-button";
import { DropdownItem } from "../app-components/setting-page-components/dropdown-item";
import { DEFAULT_CATEGORY, DEFAULT_DIFFICULTY } from "../shared/constans";

export class SettingsController /*implements Component*/ {
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

  setGameCards(newCategory: string) {
    // let cat = this.category;
    // this.dropItemsGameCards.forEach((option) => {
    //   option.element.addEventListener('click', function() {
    //     cat = option.element.innerText;
    //   });
    // });
    // this.category = cat;
    // this.buttonGameCards.element.innerHTML = this.dropItemsGameCards;
    // console.log(this.dropItemsGameCards);
    
    this.category = newCategory;
    // console.log(this.category);
    // return this.category;
  }

  setDifficulty(newDifficulty: number) {
    this.difficulty = newDifficulty;
  }



  // test() {
  //   console.log(this.dropItemsGameCards);
    
  // }
  // render() {
  //   this.page.appendChild(this.settingsPage.element);
  //   return this.page;
  // }
}
