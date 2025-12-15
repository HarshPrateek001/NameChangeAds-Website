document.addEventListener('DOMContentLoaded', function () {
  // Check if Swiper is available
  if (typeof Swiper === 'undefined') {
    console.error('Swiper library is not loaded.');
    return;
  }

  // Target only the hero slider to avoid conflicts
  const heroSwiperElement = document.querySelector('.hero-swiper');

  if (heroSwiperElement) {
    // Check if it's not already initialized by another script
    if (heroSwiperElement.swiper) {
      return;
    }
    
    new Swiper(heroSwiperElement, {
      // === Configuration ===
      direction: 'horizontal',
      loop: true,
      slidesPerView: 1,
      spaceBetween: 30,
      centeredSlides: true,
      
      // === Autoplay ===
      autoplay: {
        delay: 3000,
        disableOnInteraction: false, // Continue autoplay after user interaction
      },

      // === Navigation ===
      navigation: {
        nextEl: '.hero-swiper .swiper-button-next',
        prevEl: '.hero-swiper .swiper-button-prev',
      },

      // === Animation ===
      effect: 'slide', // Use the default slide effect
      
      // Adding a class-based transition for smoother appearance
      on: {
        init: function () {
          // Show the slider gracefully after init
          this.el.style.opacity = 1;
        },
        slideChangeTransitionStart: function () {
          // Fade out all slides
          this.slides.forEach(slide => {
            slide.style.opacity = 0;
            slide.style.transition = 'opacity 0.3s ease-out';
          });
        },
        slideChangeTransitionEnd: function () {
          // Fade in the active slide
          this.slides[this.activeIndex].style.opacity = 1;
          this.slides[this.activeIndex].style.transition = 'opacity 0.3s ease-in';
        }
      }
    });

    // Ensure the wrapper has an initial opacity for the fade-in effect
    heroSwiperElement.style.opacity = 0;
    heroSwiperElement.style.transition = 'opacity 0.5s ease-in';
  }
});
