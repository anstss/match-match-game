import * as _ from 'lodash';
import $ from 'jquery';
import { ScorePage } from '../app-components/score-page';
import { UsersDataInterface } from '../interfaces/users-data-interface';
import { MATCH_USER_ID, MAX_SIZE_IMG_BYTES } from '../shared/constans';
import { InputPhoto } from '../shared/modals/input-photo';
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
    this.initialize();
  }

  initialize() {
    this.registerForm.inputUserPhoto.input.addEventListener('change', () => this.readImg());
    this.registerForm.getModalRegister().addEventListener('submit', (event) => this.registerHandler(event));
  }

  registerHandler(event: Event) {
    event.preventDefault();
    try {
      this.addUser();
    } catch (e) {
      UsersData.clearStorage();
      this.addUser();
    }
    $('#register-modal').modal('hide');
    window.location.href = '#score';
  }

  readImg() {
    const { inputUserPhoto } = this.registerForm;
    const file = inputUserPhoto.input.files![0];
    if (file === undefined) return;
    if (file.size > MAX_SIZE_IMG_BYTES) {
      inputUserPhoto.getError().innerText = `Allowed extensions: .png .jpg .jpeg.
      Max file size is 0.1MB`;
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      const result = reader.result!.toString();
      inputUserPhoto.imgValue = result;
      inputUserPhoto.getLabel().classList.add('no-bg');
      inputUserPhoto.getUserImg().setAttribute('src', result);
    });
  }

  getUserInfo() {
    this.registerForm.inputs.forEach((inputElem) => {
      if (inputElem instanceof InputPhoto) {
        this.user[inputElem.input.name] = inputElem.imgValue;
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

  static getTopTen(scorePage?: ScorePage) {
    const allUsers: UsersDataInterface[] = [];
    for (let i = 0; i < window.localStorage.length; i += 1) {
      const key = window.localStorage.key(i);
      if (key?.includes(MATCH_USER_ID)) {
        allUsers.push(JSON.parse(window.localStorage.getItem(key)!));
      }
    }
    if (scorePage) {
      const currentScorePage = scorePage;
      if (allUsers.length === 0) {
        currentScorePage.getTop().innerText = 'No registered users';
      } else {
        currentScorePage.getTop().innerText = '';
      }
    }

    allUsers.forEach((elem: UsersDataInterface) => {
      const user = elem;
      user.score = +user.score;
    });
    const topTen = _.sortBy(allUsers, 'score').slice(-10).reverse();

    return topTen;
  }
}
