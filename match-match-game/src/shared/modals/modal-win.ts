import { BaseComponent } from '../base-component';

export class ModalWin extends BaseComponent {
  modalDialog: BaseComponent;
  modalContent: BaseComponent;
  modalWin: BaseComponent;
  modalText: BaseComponent;
  modalButtons: BaseComponent;
  buttonNo: BaseComponent;
  buttonYes: BaseComponent;

  constructor() {
    super('div', ['modal']);
    this.modalDialog = new BaseComponent('div', ['modal-dialog', 'modal-dialog-centered']);
    this.modalContent = new BaseComponent('div', ['modal-content']);
    this.modalWin = new BaseComponent('div', ['modal-win']);
    this.modalText = new BaseComponent('div', ['modal-win__text']);
    this.modalButtons = new BaseComponent('div', ['modal-win__buttons']);
    this.buttonNo = new BaseComponent('a', ['btn', 'button']);
    this.buttonYes = new BaseComponent('button', ['btn', 'button', 'button--blue']);
    this.initialize();
  }

  initialize() {
    this.element.setAttribute('id', 'modal-win');
    this.initializeButtonNo();
    this.initializeButtonYes();
  }

  initializeButtonNo() {
    this.getButtonNo().setAttribute('href', '#score');
    this.getButtonNo().innerText = 'No, thanks';
  }

  initializeButtonYes() {
    this.getButtonYes().setAttribute('type', 'button');
    this.getButtonYes().setAttribute('data-dismiss', 'modal');
    this.getButtonYes().setAttribute('data-toggle', 'modal');
    this.getButtonYes().setAttribute('data-target', '#register-modal');
    this.getButtonYes().innerText = 'Yes, register me';
  }

  getButtonNo() {
    return this.buttonNo.element;
  }

  getButtonYes() {
    return this.buttonYes.element;
  }

  getModalDialog() {
    return this.modalDialog.element;
  }

  getModalContent() {
    return this.modalContent.element;
  }

  getModalWin() {
    return this.modalWin.element;
  }

  getModalText() {
    return this.modalText.element;
  }

  getModalButtons() {
    return this.modalButtons.element;
  }

  render() {
    this.element.appendChild(this.getModalDialog());
    this.getModalDialog().appendChild(this.getModalContent());
    this.getModalContent().appendChild(this.getModalWin());
    this.getModalWin().append(this.getModalText(), this.getModalButtons());
    this.getModalButtons().append(this.getButtonNo(), this.getButtonYes());

    return this.element;
  }
}
