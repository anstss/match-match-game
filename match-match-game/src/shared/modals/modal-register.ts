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
    this.getButtonCancel().addEventListener('click', () => {
      this.inputUserPhoto.getLabel().classList.remove('no-bg');
    });
  }

  initializeForm() {
    this.getForm().setAttribute('id', 'register-form');
  }

  initializeFormTitle() {
    this.getFormTitle().innerText = 'Register new Player';
  }

  initializeButtonAddUser() {
    this.getButtonAddUser().setAttribute('type', 'submit');
    this.getButtonAddUser().setAttribute('disabled', 'disabled');
    this.getButtonAddUser().innerText = 'Add user';
  }

  initializeButtonCancel() {
    this.getButtonCancel().setAttribute('type', 'button');
    this.getButtonCancel().setAttribute('data-dismiss', 'modal');
    this.getButtonCancel().setAttribute('onclick', 'window.location.href="#score"');
    this.getButtonCancel().innerText = 'Cancel';
  }

  getModalRegister() {
    return this.element;
  }

  getModalDialog() {
    return this.modalDialog.element;
  }

  getModalContent() {
    return this.modalContent.element;
  }

  getButtonCancel() {
    return this.buttonCancel.element;
  }

  getButtonAddUser() {
    return this.buttonAddUser.element;
  }

  getForm() {
    return this.form.element;
  }

  getFormTitle() {
    return this.formTitle.element;
  }

  getFormBody() {
    return this.formBody.element;
  }

  getFormButtons() {
    return this.formButtons.element;
  }

  render() {
    this.element.appendChild(this.getModalDialog());
    this.getModalDialog().appendChild(this.getModalContent());
    this.getModalContent().appendChild(this.getForm());
    this.getForm().append(this.getFormTitle(), this.getFormBody(),
      this.inputUserPhoto.render(), this.getFormButtons());
    this.getFormBody().append(this.inputFirstName.render(),
      this.inputLastName.render(), this.inputEmail.render());
    this.getFormButtons().append(this.getButtonAddUser(), this.getButtonCancel());

    return this.element;
  }
}
