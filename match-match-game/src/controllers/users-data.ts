import * as _ from 'lodash';
import { UsersDataInterface } from '../models/users-data-interface';
import { MATCH_USER_ID, MAX_SIZE_IMG_BYTES } from '../shared/constans';
import { ModalRegister } from '../shared/modals/modal-register';
import { GameController } from './game-controller';

export class UsersData {
  registerForm: ModalRegister;

  user: UsersDataInterface;

  gameController: GameController;

  constructor(registerForm: ModalRegister, gameController: GameController) {
    this.user = {};
    this.registerForm = registerForm;
    this.gameController = gameController;
    this.registerForm.inputUserPhoto.input.addEventListener('change', () => this.readImg());
  }

  readImg() {
    const file = this.registerForm.inputUserPhoto.input.files![0];
    if (file === undefined) return;
    if (file.size > MAX_SIZE_IMG_BYTES) {
      this.registerForm.inputUserPhoto.error.element.innerText = `Allowed extensions: .png .jpg .jpeg.
      Max file size is 0.1MB`;
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      this.registerForm.inputUserPhoto.input.setAttribute('data-URL', reader.result!.toString());
      this.registerForm.inputUserPhoto.label.element.classList.add('no-bg');
      this.registerForm.inputUserPhoto.userImg.element.setAttribute('src', reader.result!.toString());
    });
  }

  getUserInfo() {
    this.registerForm.inputs.forEach((inputElem) => {
      if (inputElem.input.name === 'user-photo') {
        this.user[inputElem.input.name] = inputElem.input.getAttribute('data-URL')!;
      } else {
        this.user[inputElem.input.name] = inputElem.input.value;
      }
    });
    this.user.score = this.gameController.score.toString();

    return this.user;
  }

  addUser() {
    const user = JSON.stringify(this.getUserInfo());
    const userID = MATCH_USER_ID + Date.now();
    window.localStorage.setItem(userID, user);
  }

  static clearStorage() {
    const topTen = UsersData.getTopTen();
    window.localStorage.clear();
    topTen.forEach((player) => {
      localStorage.setItem(MATCH_USER_ID + Date.now(), JSON.stringify(player));
    });
  }

  static getTopTen() {
    const allUsers = [];
    // const keys = Object.keys(window.localStorage);
    // for (const key of keys) {
    //   allUsers.push(JSON.parse(window.localStorage.getItem(key)!));
    // }
    // special for eslint "no-restricted-syntax"
    for (let i = 0; i < window.localStorage.length; i += 1) {
      const key = window.localStorage.key(i);
      if (key?.includes(MATCH_USER_ID)) {
        allUsers.push(JSON.parse(window.localStorage.getItem(key)!));
      }
    }
    const topTen = _.sortBy(allUsers, 'score').reverse().slice(0, 10);
    return topTen;
  }
}
