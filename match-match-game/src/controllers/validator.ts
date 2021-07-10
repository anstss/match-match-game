import { REGEXP_EMAIL, REGEXP_SPECIAL_CHARACTERS } from '../shared/constans';
import { InputPhoto } from '../shared/modals/input-photo';
import { ModalRegister } from '../shared/modals/modal-register';
import { Input } from '../shared/modals/input';

export class Validator {
  inputs: (Input | InputPhoto)[];
  registerForm: ModalRegister;

  constructor(registerForm: ModalRegister) {
    this.registerForm = registerForm;
    this.inputs = registerForm.inputs;
    this.initialize();
  }

  initialize() {
    this.inputs.forEach((inputElem) => {
      const { input } = inputElem;
      input.addEventListener('input', () => this.validateHandler(inputElem));
    });

    this.registerForm.getButtonCancel().addEventListener('click', () => this.clearHandler());
  }

  static validate(inputElem: Input | InputPhoto) {
    const currentInput = inputElem;
    const currentInnerInput = inputElem.input;
    const currentInputName = currentInnerInput.name;
    const currentInputValue = currentInnerInput.value;
    const currentError = currentInput.getError();
    if (currentInputValue.length > 30
      && currentInputName !== 'user-photo') {
      currentInput.isValid = false;
      currentInnerInput.classList.remove('valid');
      currentError.innerText = 'The value or name cannot be longer than 30 characters.';
      return;
    }
    if (currentInputName === 'first-name' || currentInputName === 'last-name') {
      if (currentInputValue === ''
      || currentInputValue.match(/[^0-9]/g) === null
      || currentInputValue.match(REGEXP_SPECIAL_CHARACTERS) !== null) {
        currentInput.isValid = false;
        currentInnerInput.classList.remove('valid');
        currentError.innerText = `Incorrect value.
        Cannot be empty, contain only numbers, or contain service characters.`;
        return;
      }
    }
    if (currentInputName === 'email') {
      if (currentInputValue === ''
      || currentInputValue.match(REGEXP_EMAIL) === null) {
        currentInput.isValid = false;
        currentInnerInput.classList.remove('valid');
        currentError.innerText = 'Incorrect value. Please enter a valid email.';
        return;
      }
    }
    currentInput.isValid = true;
    currentInnerInput.classList.add('valid');
    currentError.innerText = '';
  }

  checkValidityForm(inputs: (Input | InputPhoto)[]) {
    const validationValues: boolean[] = [];
    inputs.forEach((inputElem) => validationValues.push(inputElem.isValid));
    const buttonAddUser = this.registerForm.getButtonAddUser();
    if (validationValues.includes(false)) {
      buttonAddUser.setAttribute('disabled', 'disabled');
      buttonAddUser.classList.add('disabled');
      return;
    }
    buttonAddUser.removeAttribute('disabled');
    buttonAddUser.classList.remove('disabled');
  }

  static clearForm(inputs: (Input | InputPhoto)[]) {
    inputs.forEach((inputElem) => {
      const currentInput = inputElem;
      if (currentInput instanceof InputPhoto) {
        currentInput.isValid = true;
        currentInput.imgValue = '';
        currentInput.getUserImg().removeAttribute('src');
      } else {
        currentInput.isValid = false;
        currentInput.input.value = '';
        currentInput.input.classList.remove('valid');
      }
      currentInput.getError().innerText = '';
    });
  }

  validateHandler(inputElem: Input | InputPhoto) {
    Validator.validate(inputElem);
    this.checkValidityForm(this.inputs);
  }

  clearHandler() {
    Validator.clearForm(this.inputs);
    this.checkValidityForm(this.inputs);
  }
}
