import * as _ from 'lodash';
import { UsersDataInterface } from '../models/users-data-interface';
import { MAX_SIZE_IMG_BYTES } from '../shared/constans';
import { ModalRegister } from '../shared/modals/modal-register';
import { GameController } from './game-controller';

export class UsersData {
  registerForm: ModalRegister;

  user: UsersDataInterface;

  gameController: GameController;

  // userID: number;
  // counter: number;
  // user: {
  //   name: string,

  // }
  constructor(registerForm: ModalRegister, gameController: GameController) {
    this.user = {};
    // this.counter = 0;
    // this.userID = Date.now();
    this.registerForm = registerForm;
    this.gameController = gameController;
    this.registerForm.inputUserPhoto.input.addEventListener('change', () => this.readImg());
    // this.registerForm = registerForm;
  }

  readImg() {
    const file = this.registerForm.inputUserPhoto.input.files![0];
    if (file === undefined) return;
    if (file.size > MAX_SIZE_IMG_BYTES) {
      // this.registerForm.inputUserPhoto.isValid = false;
      this.registerForm.inputUserPhoto.error.element.innerText = `Allowed extensions: .png .jpg .jpeg.
      Max file size is 0.1MB`;
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      // this.registerForm.inputUserPhoto.inputValue = reader.result!.toString();
      this.registerForm.inputUserPhoto.input.setAttribute('data-URL', reader.result!.toString());
      this.registerForm.inputUserPhoto.userImg.element.setAttribute('src', reader.result!.toString());
      // value = reader.result!.toString();
      // console.log(typeof reader.result);
    });
  }

  getUserInfo() {
    // if (this.registerForm)
    // const user: { [key: string] : string} = {};
    this.registerForm.inputs.forEach((inputElem) => {
      if (inputElem.input.name === 'user-photo') {
        this.user[inputElem.input.name] = inputElem.input.getAttribute('data-URL')!;
      } else {
        this.user[inputElem.input.name] = inputElem.input.value;
      }
    });
    this.user.score = this.gameController.score.toString();
    // console.log(this.user);
    // this.userID += 1;
    return this.user;
  }

  addUser() {
    // window.localStorage.clear();
    const user = JSON.stringify(this.getUserInfo());
    const userID = Date.now();
    window.localStorage.setItem(userID.toString(), user);
    // console.log(user);
  }

  getTopTen() {
    let allUsers = [];
    let keys = Object.keys(window.localStorage);
    for (let key of keys) {
      allUsers.push(JSON.parse(window.localStorage.getItem(key)!));
    }
    const topTen = _.sortBy(allUsers, 'score').reverse().slice(0, 10);
    return topTen;
  }
}
