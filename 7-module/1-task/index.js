import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.value = '';
    this.render();
    this.addEventListeners();
  }
  render() {
    this.elem = createElement(`<div class="ribbon">
    <!--Кнопка прокрутки влево-->
    <button class="ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>

    <!--Ссылки на категории-->
    <nav class="ribbon__inner">
    </nav>

    <!--Кнопка прокрутки вправо-->
    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>`);

    for (let item of this.categories) {
      let slide = createElement(`<a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`);
      this.sub('inner').append(slide);
    }
    this.sub('inner').firstElementChild.classList.add('ribbon__item_active');
    this.sub('inner').lastElementChild.dataset.id = this.sub('inner').lastElementChild.dataset.id + ' ' + 'ribbon__item_active';

  }
// свои попытки
  /*sub(ref) {
    return this.elem.querySelector(`.ribbon__${ref}`);
  }
  next() {
    this.updateRight();
  }

  prev() {
    this.updateLeft();
  }
  updateLeft() {
    let ribbonInner = this.sub('inner');
    let scrollLeft = ribbonInner.scrollLeft;
    let scrollWidth = ribbonInner.scrollWidth;
    let clientWidth = ribbonInner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    this.sub('inner').scrollBy(-350, 0);

    if (scrollRight < 1) {
      this.sub('arrow_right').classList.add('ribbon__arrow_visible');
      //this.sub('arrow_right').classList.remove('ribbon__arrow_visible');
    } else {
      //this.sub('arrow_right').classList.add('ribbon__arrow_visible');
      this.sub('arrow_right').classList.remove('ribbon__arrow_visible');
    }

    if (scrollLeft == 0) {
      this.sub('arrow_left').classList.add('ribbon__arrow_visible');
    } else {
      this.sub('arrow_left').classList.remove('ribbon__arrow_visible');
    }
  }
  updateRight() {
    let ribbonInner = this.sub('inner');
    let scrollLeft = ribbonInner.scrollLeft;
    let scrollWidth = ribbonInner.scrollWidth;
    let clientWidth = ribbonInner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    this.sub('inner').scrollBy(350, 0);

    if (scrollRight < 1) {
      this.sub('arrow_right').classList.add('ribbon__arrow_visible');
      //this.sub('arrow_right').classList.remove('ribbon__arrow_visible');
    } else {
      //this.sub('arrow_right').classList.add('ribbon__arrow_visible');
      this.sub('arrow_right').classList.remove('ribbon__arrow_visible');
    }

    if (scrollLeft == 0) {
      this.sub('arrow_left').classList.add('ribbon__arrow_visible');
    } else {
      this.sub('arrow_left').classList.remove('ribbon__arrow_visible');
    }
  }*/
  addEventListeners() {
    this.sub('arrow_left').onclick = (event) => this.onArrowLeftClick(event);
    this.sub('arrow_right').onclick = (event) => this.onArrowRightClick(event);

    this.elem.onclick = (event) => {
      let itemElem = event.target.closest('.ribbon__item');
      if (itemElem) {
        this.onItemClick(itemElem);
        event.preventDefault();
      }
    };

    this.sub('inner').onscroll = (event) => this.onScroll(event);
  }

  onArrowRightClick(event) {
    let offset = 350;
    this.sub('inner').scrollBy(offset, 0);
    this.updateArrows();
  }

  onArrowLeftClick(event) {
    let offset = 350;
    this.sub('inner').scrollBy(-offset, 0);
    this.updateArrows();
  }

  onItemClick(itemElem) {
    let oldActive = this.sub('item_active');
    if (oldActive) {
      oldActive.classList.remove('ribbon__item_active');
    }

    itemElem.classList.add('ribbon__item_active');

    this.value = itemElem.dataset.id;

    this.elem.dispatchEvent(
      new CustomEvent('ribbon-select', {
        detail: this.value,
        bubbles: true,
      })
    );
  }

  onScroll(event) {
    this.updateArrows();
  }

  sub(ref) {
    return this.elem.querySelector(`.ribbon__${ref}`);
  }

  scrollRight() {
    return this.sub('inner').scrollWidth - (this.sub('inner').scrollLeft + this.sub('inner').clientWidth);
  }

  scrollLeft() {
    return this.sub('inner').scrollLeft;
  }

  updateArrows() {
    if (this.scrollLeft() > 0) {
      this.sub('arrow_left').classList.add('ribbon__arrow_visible');
    } else {
      this.sub('arrow_left').classList.remove('ribbon__arrow_visible');
    }

    let scrollRight = this.scrollRight();
    scrollRight = scrollRight < 1 ? 0 : scrollRight; // Это нужно для ситуации, когда скролл произошел с погрешностью
    if (scrollRight > 0) {
      this.sub('arrow_right').classList.add('ribbon__arrow_visible');
    } else {
      this.sub('arrow_right').classList.remove('ribbon__arrow_visible');
    }
  }
}
