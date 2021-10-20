import createElement from '../../assets/lib/create-element.js';
export default class Modal {
  constructor() {
    this.render();
    this.elem.addEventListener('click', (event) => this.onClick(event));
  }

  render() {
    this.elem = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `);
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');

    this._keydownEventListener = (event) => this.onDocumentKeyDown(event);
    document.addEventListener('keydown', this._keydownEventListener);

    if (this.elem.querySelector('[autofocus]')) {
      this.elem.querySelector('[autofocus]').focus();
    }
  }

  onClick(event) {
    if (event.target.closest('.modal__close')) {
      event.preventDefault();
      this.close();
    }
  }

  onDocumentKeyDown(event) {
    if (event.code === 'Escape') {
      event.preventDefault();
      this.close();
    }
  }

  setTitle(title) {
    let titleElem = this.elem.querySelector('.modal__title');
    titleElem.textContent = title;
  }

  setBody(node) {
    let modalBody = this.elem.querySelector('.modal__body');
    modalBody.innerHTML = '';
    modalBody.append(node);
  }

  close() {
    document.removeEventListener('keydown', this._keydownEventListener);
    document.body.classList.remove('is-modal-open');
    this.elem.remove();
  }
}

//увы, по прежнему не понятен подход, но хотя бы стало понятно, 
//что обращаться нужно не через document.querySelector
/*export default class Modal {
  constructor() {
    this.open();
    this.setTitle();
    this.setBody();
  }
  setTitle(title) {
    let modalTitle = document.querySelector('.modal__title');
    modalTitle.textContent = 'title';

  }
  setBody(node) {
    let modalBody = document.querySelector('.modal__body');
    modalBody.innerHTML = '';
   

  }
  open() {
    let body = document.querySelector('body');
    body.classList.add('is-modal-open');
    let container = document.querySelector('.container');
    let modalWindow = createElement(`<div class="modal">
    <!--Прозрачная подложка перекрывающая интерфейс-->
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
        <!--Кнопка закрытия модального окна-->
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title">
          111
        </h3>
      </div>

      <div class="modal__body">
       222
      </div>
    </div>

  </div>`);

    container.append(modalWindow);

  }
}*/
