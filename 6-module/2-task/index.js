export default class ProductCard {
  constructor(product) {
    this.obj = product;
    this.elem = document.createElement('div');
    this.elem.classList.add('card');
    const divTop = document.createElement('div');
    divTop.classList.add('card__top');

    const divBody = document.createElement('div');
    divBody.classList.add('card__body');

    const divTitle = document.createElement('div');
    divTitle.classList.add('card__title');
    divTitle.innerHTML = this.obj.name;
    divBody.append(divTitle);

    const img = document.createElement('img')
    img.classList.add('card__image');
    img.src = '/assets/images/products/' + this.obj.image;
    img.setAttribute('alt', 'product');
    divTop.append(img);


    const span = document.createElement('span');
    span.classList.add('card__price');
    span.innerHTML = '€' + this.obj.price.toFixed(2);
    divTop.append(span);

    const button = document.createElement('button');
    button.classList.add('card__button');
    button.setAttribute('type', "button");
    const buttonImg = document.createElement('img');
    buttonImg.src = '/assets/images/icons/plus-icon.svg';
    buttonImg.setAttribute('alt', 'icon')
    button.append(buttonImg);

    button.addEventListener('click', () => {
      const customEvent = new CustomEvent("product-add", {
        detail: this.obj.id,
        bubbles: true
      });
      button.dispatchEvent(customEvent);
    });

    divBody.append(button);

    this.elem.append(divTop);
    this.elem.append(divBody);
  }

}
