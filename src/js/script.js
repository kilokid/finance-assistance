import { loginPopup } from './modules/login-popup';
import { menu } from './modules/menu';
import sliderCarousel from '../../plugins/sliderCarousel/sliderCarousel';

loginPopup();
menu();

const carousel = new sliderCarousel({
  main: '.reviews',
  wrap: '.reviews__cards',
  prev: '.reviews__prev',
  next: '.reviews__next',
  slidesToShow: 1,
  infinity: true,

  responsive: [{
      breakpoint: 1020,
      slideToShow: 1
  },
  {
      breakpoint: 768,
      slideToShow: 1
  }]
});
carousel.init();
