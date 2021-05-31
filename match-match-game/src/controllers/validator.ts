import { REGEXP_EMAIL, REGEXP_SPECIAL_CHARACTERS } from '../shared/constans';
import { InputEmail } from '../shared/modals/input-email';
import { InputFirstName } from '../shared/modals/input-first-name';
import { InputLastName } from '../shared/modals/input-last-name';
import { InputPhoto } from '../shared/modals/input-photo';
import { ModalRegister } from '../shared/modals/modal-register';

export class Validator {
  inputs: (InputFirstName | InputLastName | InputEmail | InputPhoto)[];

  registerForm: ModalRegister;

  constructor(registerForm: ModalRegister) {
    this.registerForm = registerForm;
    this.inputs = registerForm.inputs;
    this.inputs.forEach((inputElem) => {
      inputElem.input.addEventListener('input', () => Validator.validate(inputElem));
      inputElem.input.addEventListener('input', () => this.checkValidityForm(this.inputs));
    });
    this.registerForm.buttonCancel.element.addEventListener('click', () => {
      Validator.clearForm(this.inputs);
      this.checkValidityForm(this.inputs);
    });
  }

  static validate(inputElem: InputFirstName | InputLastName | InputEmail | InputPhoto) {
    const currentInput = inputElem;
    const currentInpuName = inputElem.input.name;
    const currentInputValue = inputElem.input.value;
    if (currentInputValue.length > 30
      && currentInpuName !== 'user-photo') {
      currentInput.isValid = false;
      currentInput.input.classList.remove('valid');
      currentInput.error.element.innerText = 'The value or name cannot be longer than 30 characters.';
      return;
    }
    if (currentInpuName === 'first-name' || currentInpuName === 'last-name') {
      if (currentInputValue === ''
      || currentInputValue.match(/[^0-9]/g) === null
      || currentInputValue.match(REGEXP_SPECIAL_CHARACTERS) !== null) {
        currentInput.isValid = false;
        currentInput.input.classList.remove('valid');
        currentInput.error.element.innerText = `Incorrect value.
        Cannot be empty, contain only numbers, or contain service characters.`;
        return;
      }
    }
    if (currentInpuName === 'email') {
      if (currentInputValue === ''
      || currentInputValue.match(REGEXP_EMAIL) === null) {
        currentInput.isValid = false;
        currentInput.input.classList.remove('valid');
        currentInput.error.element.innerText = 'Incorrect value. Please enter a valid email.';
        return;
      }
    }

    currentInput.isValid = true;
    currentInput.input.classList.add('valid');
    currentInput.error.element.innerText = '';
  }

  checkValidityForm(inputs: (InputFirstName | InputLastName | InputEmail | InputPhoto)[]) {
    const validationValues: boolean[] = [];
    inputs.forEach((inputElem) => validationValues.push(inputElem.isValid));
    if (validationValues.includes(false)) {
      this.registerForm.buttonAddUser.element.setAttribute('disabled', 'disabled');
      this.registerForm.buttonAddUser.element.classList.add('disabled');
      return;
    }
    this.registerForm.buttonAddUser.element.removeAttribute('disabled');
    this.registerForm.buttonAddUser.element.classList.remove('disabled');
  }

  static clearForm(inputs: (InputFirstName | InputLastName | InputEmail | InputPhoto)[]) {
    inputs.forEach((inputElem) => {
      const currentInput = inputElem;
      currentInput.isValid = false;
      if (currentInput instanceof InputPhoto) {
        currentInput.isValid = true;
        currentInput.imgValue = '';
        // currentInput.input.removeAttribute('data-URL');
        currentInput.userImg.element.removeAttribute('src');
        currentInput.error.element.innerText = '';
      } else {
        currentInput.input.value = '';
        currentInput.input.classList.remove('valid');
        currentInput.error.element.innerText = '';
      }
    });
  }
}
