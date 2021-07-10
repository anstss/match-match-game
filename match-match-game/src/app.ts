import './app-components/_header.scss';
import { Header } from './app-components/header';
import { Page } from './app-components/page';
import { ModalRegister } from './shared/modals/modal-register';

export class App {
  header: Header;
  page: Page;
  registerModal: ModalRegister;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header(rootElement);
    this.registerModal = new ModalRegister();
    this.page = new Page();
  }

  getPage() {
    return this.page.element;
  }

  render(): HTMLElement {
    this.rootElement.append(this.header.render(), this.registerModal.render(), this.getPage());

    return this.rootElement;
  }
}
