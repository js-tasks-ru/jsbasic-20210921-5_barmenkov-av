function initCarousel() {
  let arrowRight = document.querySelector('.carousel__arrow_right');
  let arrowLeft = document.querySelector('.carousel__arrow_left');
  let slideIndex = 1;
  let slides = document.querySelectorAll('.carousel__slide');
  let carouselInner = document.querySelector('.carousel__inner');
  let slideWidth = carouselInner.offsetWidth;
  if (slideIndex === 1) {
    arrowLeft.style.display = 'none';
  };

  arrowRight.addEventListener('click', function (event) {
    carouselInner.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
    if (slideIndex === slides.length - 1) {
      arrowRight.style.display = 'none';
    };
    slideIndex++;
    if (slideIndex > 1) {
      arrowLeft.style.display = '';
    };

  });
  arrowLeft.addEventListener('click', function (event) {
    carouselInner.style.transform = `translateX(-${(slideIndex - 2) * slideWidth}px)`;
    if (slideIndex <= slides.length) {
      arrowRight.style.display = '';
    };
    if (slideIndex <= 2) {
      arrowLeft.style.display = 'none';
    };
    slideIndex--;
  });


}
