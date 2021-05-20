import { SettingPage } from "../app-components/setting-page";
import { DropMenuGameCards } from "../app-components/setting-page-components/drop-menu-game-cards";
import { DropdownButton } from "../app-components/setting-page-components/dropdown-button";
import { DropdownItem } from "../app-components/setting-page-components/dropdown-item";
import { Component } from "../shared/component";

export class SettingsController /*implements Component*/ {
  settingsPage: SettingPage;
  buttonGameCards: DropdownButton;
  dropMenuGameCards: DropMenuGameCards;
  dropItemsGameCards: DropdownItem[];
  category: string;

  constructor(readonly settingPage: SettingPage) {
    this.settingsPage = settingPage;
    this.buttonGameCards = this.settingsPage.settingGameCards.button;
    this.dropMenuGameCards = this.settingsPage.dropdownMenuGameCards;
    this.dropItemsGameCards = this.dropMenuGameCards.dropItems;
    this.category = 'animals';
  }

  setGameCards(newCategory: string) {
    // let cat = this.category;
    // this.dropItemsGameCards.forEach((option) => {
    //   option.element.addEventListener('click', function() {
    //     cat = option.element.innerText;
    //   });
    // });
    // this.category = cat;
    this.category = newCategory;
    // console.log(this.category);
    // return this.category;
  }



  test() {
    console.log(this.dropItemsGameCards);
    
  }
  // render() {
  //   this.page.appendChild(this.settingsPage.element);
  //   return this.page;
  // }
}
