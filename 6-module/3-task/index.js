import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.currentSlideNumber = 0;
    this.render();
    this.addEventListeners();
  }

  render() {
    this.elem = createElement(`
        <div class="carousel">
          <div class="carousel__arrow carousel__arrow_right">
            <img src="/assets/images/icons/angle-icon.svg" alt="icon" />
          </div>
          <div class="carousel__arrow carousel__arrow_left">
            <img src="/assets/images/icons/angle-left-icon.svg" alt="icon" />
          </div>
          <div class="carousel__inner"></div>
        </div>
        `);

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
      this.sub('inner').append(slide);

    }

    this.update();
  }

  addEventListeners() {
    this.elem.onclick = ({
      target
    }) => {
      let button = target.closest('.carousel__button');
      if (button) {
        let id = target.closest('[data-id]').dataset.id;

        this.elem.dispatchEvent(new CustomEvent('product-add', {
          detail: id,
          bubbles: true
        }));
      }

      if (target.closest('.carousel__arrow_right')) {
        this.next();
      }

      if (target.closest('.carousel__arrow_left')) {
        this.prev();
      }
    };
  }

  sub(ref) {
    return this.elem.querySelector(`.carousel__${ref}`);
  }

  next() {
    this.currentSlideNumber++;
    this.update();
  }

  prev() {
    this.currentSlideNumber--;
    this.update();
  }

  update() {
    let offset = -this.elem.offsetWidth * this.currentSlideNumber;
    this.sub('inner').style.transform = `translateX(${offset}px)`;

    if (this.currentSlideNumber == this.slides.length - 1) {
      this.sub('arrow_right').style.display = 'none';
    } else {
      this.sub('arrow_right').style.display = '';
    }

    if (this.currentSlideNumber == 0) {
      this.sub('arrow_left').style.display = 'none';
    } else {
      this.sub('arrow_left').style.display = '';
    }
  }

}

/*
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
    let slideIndex = 1;
    let slideWidth = this.elem.offsetWidth; // не получаю ширину, почему??
    if (slideIndex === 1) {
      arrowLeft.style.display = 'none';
    }
    arrowRight.addEventListener('click', function (event) {
      carouselInner.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
      if (slideIndex === this.slides.length - 1) {
        arrowRight.style.display = 'none';
      };
      slideIndex++;
      if (slideIndex > 1) {
        arrowLeft.style.display = '';
      };

    });
    arrowLeft.addEventListener('click', function (event) {
      carouselInner.style.transform = `translateX(-${(slideIndex - 2) * slideWidth}px)`;
      if (slideIndex <= this.slides.length) {
        arrowRight.style.display = '';
      };
      if (slideIndex <= 2) {
        arrowLeft.style.display = 'none';
      };
      slideIndex--;
    });


    btn.addEventListener('click', () => {
      const customEvent = new CustomEvent("product-add", {
        detail: this.slides.id,
        bubbles: true
      });
      button.dispatchEvent(customEvent);
    });

    let btn = document.querySelectorAll('.carousel__button');
    btn.addEventListener('click', (event) => {
      alert('click');
    });

    this.elem.append(arrowRight);
    this.elem.append(arrowLeft);
    this.elem.append(carouselInner);


  }


}*/
