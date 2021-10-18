import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = document.createElement('div');
    this.elem.classList.add('carousel');
    const carouselInner = document.createElement('div');
    carouselInner.classList.add('carousel__inner');
    for (let item of this.slides) {
      let slide = createElement(`
      <div class="carousel__slide" data-id="${item.id}">
  <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
  <div class="carousel__caption">
    <span class="carousel__price">€${item.price.toFixed(2)}</span>
    <div class="carousel__title">${item.name}</div>
    <button type="button" class="carousel__button">
      <img src="/assets/images/icons/plus-icon.svg" alt="icon">
    </button>
  </div>
</div>
      
      `);

      carouselInner.append(slide);

    }
    let arrowLeft = createElement(`<div class="carousel__arrow carousel__arrow_left">
    <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
  </div>`);
    let arrowRight = createElement(`<div class="carousel__arrow carousel__arrow_right">
  <img src="/assets/images/icons/angle-icon.svg" alt="icon">
</div>`);


    //хочу получить список элементов, дальше используя его длину,сделать карусель
    // но список приходит пустым, как сделать правильно?
    let slidesArray = document.querySelectorAll('.carousel__slide');
    let slideIndex = 1;
    let slideWidth = carouselInner.offsetWidth; // не получаю ширину, почему??
    if (slideIndex === 1) {
      arrowLeft.style.display = 'none';
    }
    arrowRight.addEventListener('click', function (event) {
      carouselInner.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
      if (slideIndex === slidesArray.length - 1) {
        arrowRight.style.display = 'none';
      };
      slideIndex++;
      if (slideIndex > 1) {
        arrowLeft.style.display = '';
      };

    });
    arrowLeft.addEventListener('click', function (event) {
      carouselInner.style.transform = `translateX(-${(slideIndex - 2) * slideWidth}px)`;
      if (slideIndex <= slidesArray.length) {
        arrowRight.style.display = '';
      };
      if (slideIndex <= 2) {
        arrowLeft.style.display = 'none';
      };
      slideIndex--;
    });

    this.elem.append(arrowRight);
    this.elem.append(arrowLeft);
    this.elem.append(carouselInner);


  }

}
