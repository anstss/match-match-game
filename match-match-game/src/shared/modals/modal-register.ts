import { BaseComponent } from '../base-component';
import { InputPhoto } from './input-photo';
import { Input } from './input';

export class ModalRegister extends BaseComponent {
  modalDialog: BaseComponent;
  modalContent: BaseComponent;
  form: BaseComponent;
  formTitle: BaseComponent;
  formBody: BaseComponent;
  inputFirstName: Input;
  inputLastName: Input;
  inputEmail: Input;
  inputUserPhoto: InputPhoto;
  formButtons: BaseComponent;
  buttonAddUser: BaseComponent;
  buttonCancel: BaseComponent;
  inputs: (Input | InputPhoto)[];

  constructor() {
    super('div', ['modal']);
    this.modalDialog = new BaseComponent('div', ['modal-dialog', 'modal-dialog-centered']);
    this.modalContent = new BaseComponent('div', ['modal-content']);
    this.form = new BaseComponent('form', ['register-form']);
    this.formTitle = new BaseComponent('div', ['register-form__title']);
    this.formBody = new BaseComponent('div', ['register-form__body']);
    this.inputFirstName = new Input('first-name', 'First Name', 'text');
    this.inputLastName = new Input('last-name', 'Last Name', 'text');
    this.inputEmail = new Input('email', 'Email', 'email');
    this.inputUserPhoto = new InputPhoto();
    this.formButtons = new BaseComponent('div', ['form-buttons']);
    this.buttonAddUser = new BaseComponent('button', ['btn', 'button', 'button--blue', 'button--add-user', 'disabled']);
    this.buttonCancel = new BaseComponent('button', ['btn', 'button']);
    this.inputs = [this.inputFirstName, this.inputLastName, this.inputEmail, this.inputUserPhoto];
    this.initialize();
  }

  initialize() {
    this.element.setAttribute('id', 'register-modal');
    this.element.setAttribute('role', 'dialog');
    this.initializeForm();
    this.initializeFormTitle();
    this.initializeButtonAddUser();
    this.initializeButtonCancel();
  }

  initializeForm() {
    this.form.element.setAttribute('id', 'register-form');
  }

  initializeFormTitle() {
    this.formTitle.element.innerText = 'Register new Player';
  }

  initializeButtonAddUser() {
    this.buttonAddUser.element.setAttribute('type', 'submit');
    this.buttonAddUser.element.setAttribute('disabled', 'disabled');
    this.buttonAddUser.element.innerText = 'Add user';
  }

  initializeButtonCancel() {
    this.buttonCancel.element.setAttribute('type', 'button');
    this.buttonCancel.element.setAttribute('data-dismiss', 'modal');
    this.buttonCancel.element.setAttribute('onclick', 'window.location.href="#score"');
    this.buttonCancel.element.innerText = 'Cancel';
  }

  render() {
    this.element.appendChild(this.modalDialog.element);
    this.modalDialog.element.appendChild(this.modalContent.element);
    this.modalContent.element.appendChild(this.form.element);
    this.form.element.append(this.formTitle.element, this.formBody.element,
      this.inputUserPhoto.render(), this.formButtons.element);
    this.formBody.element.append(this.inputFirstName.render(),
      this.inputLastName.render(), this.inputEmail.render());
    this.formButtons.element.append(this.buttonAddUser.element, this.buttonCancel.element);

    return this.element;
  }
}
