import { BaseComponent } from '../base-component';
import { Component } from '../component';

export class ModalWin extends BaseComponent implements Component {
  modalDialog: BaseComponent;

  modalContent: BaseComponent;

  modalWin: BaseComponent;

  modalText: BaseComponent;

  modalButtons: BaseComponent;

  buttonNo: BaseComponent;

  buttonYes: BaseComponent;

  constructor() {
    super('div', ['modal']);
    this.element.setAttribute('id', 'modal-win');
    this.modalDialog = new BaseComponent('div', ['modal-dialog', 'modal-dialog-centered']);
    this.modalContent = new BaseComponent('div', ['modal-content']);
    this.modalWin = new BaseComponent('div', ['modal-win']);
    this.modalText = new BaseComponent('div', ['modal-win__text']);
    this.modalButtons = new BaseComponent('div', ['modal-win__buttons']);
    this.buttonNo = new BaseComponent('a', ['btn', 'button']);
    this.buttonNo.element.setAttribute('href', '#score');
    this.buttonNo.element.innerText = 'No, thanks';
    this.buttonYes = new BaseComponent('button', ['btn', 'button', 'button_blue']);
    this.buttonYes.element.setAttribute('type', 'button');
    this.buttonYes.element.setAttribute('data-dismiss', 'modal');
    this.buttonYes.element.setAttribute('data-toggle', 'modal');
    this.buttonYes.element.setAttribute('data-target', '#register-modal');
    this.buttonYes.element.innerText = 'Yes, register me';
  }

  render() {
    this.element.appendChild(this.modalDialog.element);
    this.modalDialog.element.appendChild(this.modalContent.element);
    this.modalContent.element.appendChild(this.modalWin.element);
    this.modalWin.element.append(this.modalText.element, this.modalButtons.element);
    this.modalButtons.element.append(this.buttonNo.element, this.buttonYes.element);

    return this.element;
  }
}
