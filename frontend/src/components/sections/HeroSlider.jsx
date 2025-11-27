import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const HeroSlider = () => {
  const swiperRef = useRef(null);
  const contentRef = useRef(null);

  // GSAP animation for slide content
  const animateSlideContent = () => {
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Reset and animate
    timeline
      .fromTo(
        '.slide-image',
        { 
          opacity: 0, 
          scale: 0.8,
          rotation: -5
        },
        { 
          opacity: 1, 
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: 'back.out(1.2)'
        }
      )
      .fromTo(
        '.slide-subtitle',
        { 
          opacity: 0, 
          y: 30,
          x: -20
        },
        { 
          opacity: 1, 
          y: 0,
          x: 0,
          duration: 0.8
        },
        '-=0.8'
      )
      .fromTo(
        '.slide-title',
        { 
          opacity: 0, 
          y: 40,
          x: -30
        },
        { 
          opacity: 1, 
          y: 0,
          x: 0,
          duration: 1,
          ease: 'power2.out'
        },
        '-=0.6'
      )
      .fromTo(
        '.slide-button',
        { 
          opacity: 0, 
          y: 30,
          scale: 0.9
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.5)'
        },
        '-=0.5'
      )
      .fromTo(
        '.slide-badges',
        { 
          opacity: 0, 
          y: 40,
          scale: 0.8
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1
        },
        '-=0.6'
      );
  };

  // Add hover animation for images
  useGSAP(() => {
    const images = gsap.utils.toArray('.slide-image img');
    
    images.forEach((img) => {
      const hoverTl = gsap.timeline({ paused: true });
      hoverTl.to(img, {
        scale: 1.1,
        rotation: 2,
        duration: 0.6,
        ease: 'power2.out'
      });

      img.parentElement.addEventListener('mouseenter', () => hoverTl.play());
      img.parentElement.addEventListener('mouseleave', () => hoverTl.reverse());
    });
  }, { scope: contentRef });

  useEffect(() => {
    // Animate on initial load
    setTimeout(() => {
      animateSlideContent();
    }, 100);
  }, []);

  const slides = [
    {
      id: 1,
      title: 'Turn this Christmas into Record Breaking Season',
      subtitle: '',
      buttonText: 'Shop now',
      buttonLink: '/gold-jewelry',
      bgColor: 'bg-gradient-to-r from-red-600 to-red-500',
      textColor: 'text-white',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop',
    },
    {
      id: 2,
      title: 'Order Fast. Delivered Faster. Sells Fastest.',
      subtitle: 'With Ship Now, you don\'t need to stock up',
      buttonText: 'SHIP NOW',
      buttonLink: '/ship-now',
      bgColor: 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100',
      textColor: 'text-gray-800',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop',
    },
    {
      id: 3,
      title: 'Luxury Gold Jewelry',
      subtitle: 'Timeless Beauty',
      buttonText: 'Discover More',
      buttonLink: '/gold-jewelry',
      bgColor: 'bg-gradient-to-r from-purple-50 to-purple-100',
      textColor: 'text-gray-800',
      image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&h=800&fit=crop',
    },
    {
      id: 4,
      title: 'Exquisite Silver Collection',
      subtitle: 'Elegance Redefined',
      buttonText: 'Shop Collection',
      buttonLink: '/silver-jewelry',
      bgColor: 'bg-gradient-to-r from-slate-100 to-gray-200',
      textColor: 'text-gray-800',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop',
    },
  ];

  return (
    <div className="hero-slider-container relative w-full h-[80vh]" ref={contentRef}>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination-custom',
          bulletClass: 'swiper-pagination-bullet-custom',
          bulletActiveClass: 'swiper-pagination-bullet-active-custom',
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        speed={800}
        loop={true}
        onSlideChange={() => {
          // Trigger GSAP animation on slide change
          animateSlideContent();
        }}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className={`relative w-full h-full ${slide.bgColor} flex items-center justify-center overflow-hidden`}>
              {/* Split Layout: Left side for jewelry image, Right side for content */}
              <div className="container mx-auto px-4 h-full flex items-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full h-full items-center">
                  
                  {/* Left Side - Jewelry Image */}
                  <div className="relative h-full flex items-center justify-center lg:justify-start">
                    <div className="relative w-full max-w-md lg:max-w-lg">
                      {/* Real Jewelry Image */}
                      <div className="aspect-square relative overflow-hidden rounded-2xl shadow-2xl slide-image">
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                      
                      {/* Badges/Certifications (only for slides that need them) */}
                      {(slide.id === 1 || slide.id === 2) && (
                        <div className="absolute bottom-4 left-4 flex gap-4 items-center slide-badges">
                          <div className="bg-white/95 backdrop-blur-sm px-4 py-3 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
                            <p className="text-[10px] font-semibold text-gray-700 leading-tight">RESPONSIBLE</p>
                            <p className="text-[10px] font-semibold text-gray-700 leading-tight">JEWELLERY</p>
                            <p className="text-[10px] font-semibold text-gray-700 leading-tight">COUNCIL</p>
                          </div>
                          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow duration-300">
                            <div className="w-11 h-11 bg-red-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-xl">★</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Side - Content */}
                  <div className={`relative z-10 text-center lg:text-left px-4 lg:px-0 ${slide.textColor}`}>
                    {slide.subtitle && (
                      <p className="text-body font-light mb-4 opacity-90 tracking-wide slide-subtitle">
                        {slide.subtitle}
                      </p>
                    )}
                    <h1 className="font-sans text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-8 max-w-2xl mx-auto lg:mx-0 slide-title">
                      {slide.title}
                    </h1>
                    <a
                      href={slide.buttonLink}
                      className={`slide-button inline-block px-8 md:px-12 py-3 md:py-4 text-body font-medium transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 ${
                        slide.id === 1
                          ? 'bg-white/95 text-red-600 hover:bg-white shadow-xl hover:shadow-2xl'
                          : slide.id === 2
                          ? 'bg-blue-400 text-white hover:bg-blue-500 shadow-xl hover:shadow-2xl'
                          : 'bg-primary text-white hover:bg-primary/90 shadow-xl hover:shadow-2xl'
                      }`}
                      aria-label={`${slide.buttonText} - ${slide.title}`}
                    >
                      {slide.buttonText}
                    </a>
                    
                    {/* Decorative accent - removed for cleaner look with real images */}
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-black/10 to-transparent"></div>
                <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-white/5 to-transparent"></div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button
        className="swiper-button-prev-custom absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 shadow-xl hover:shadow-2xl group hover:scale-110 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6 md:w-7 md:h-7 text-gray-800 group-hover:text-primary transition-colors duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        className="swiper-button-next-custom absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 shadow-xl hover:shadow-2xl group hover:scale-110 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6 md:w-7 md:h-7 text-gray-800 group-hover:text-primary transition-colors duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Custom Pagination */}
      <div className="swiper-pagination-custom absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3"></div>
    </div>
  );
};

export default HeroSlider;
