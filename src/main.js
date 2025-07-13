import './styles/main.scss';
import Swiper from 'swiper/bundle';
import 'swiper/css';


document.addEventListener('DOMContentLoaded', () => {

  //init swiper
  const progressCircle = document.querySelector(".autoplay-progress svg");
  const swiper = new Swiper('#hero .swiper', {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '#hero .swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
    },
  });
  //click to next
  const nextTriggers = document.querySelectorAll('.hero__next');
  nextTriggers.forEach((el) => {
    el.addEventListener('click', () => {
      swiper.slideNext();
    });
  });
  // swiper custom functions
  swiper.on('slideChange', function () {
    playActiveVideo(swiper);
    resetAutoplayProgress(swiper);
  });

  const swiper_prods = new Swiper(".products__slides .swiper", {
    slidesPerView: 1.2,
    spaceBetween: 10,
    loop: true,
    centeredSlides: false,
    loopAdditionalSlides: 1,
    navigation: {
      nextEl: ".products .swiper-button-next",
      prevEl: ".products .swiper-button-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 2.2,
        spaceBetween: 15,
      },
      1024: {
        slidesPerView: 3.1,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 3.5,
        spaceBetween: 20,
      },
    },
  });

  //faqs
  document.querySelectorAll('.solutions__content__faqs__faq__question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const faq = btn.closest('.solutions__content__faqs__faq');
      faq.classList.toggle('is-open');
    });
  });

});


//swiper play video function
function playActiveVideo(swiper) {
  swiper.slides.forEach(slide => {
    const video = slide.querySelector('video');
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  });
  const activeSlide = swiper.slides[swiper.activeIndex];
  const activeVideo = activeSlide.querySelector('video');
  if (activeVideo) {
    activeVideo.play();
  }
}

//swiper progress bar function
const progressBar = document.querySelector('.autoplay-progress div');
let progressInterval;
function startAutoplayProgress(swiper) {
  if (!progressBar) return;
  progressBar.style.width = '0%';
  let startTime = Date.now();
  let delay = swiper.params.autoplay.delay;

  progressInterval = setInterval(() => {
    let elapsed = Date.now() - startTime;
    let progress = Math.min((elapsed / delay) * 100, 100);
    progressBar.style.width = `${progress}%`;
  }, 20);
}
function resetAutoplayProgress(swiper) {
  clearInterval(progressInterval);
  startAutoplayProgress(swiper);
}

//swiper custom pagination
function updatePaginationActive(swiper) {
  const bullets = document.querySelectorAll('.swiper-pagination-bullet');
  bullets.forEach((bullet, index) => {
    bullet.classList.toggle('active', index === swiper.realIndex);
  });
}