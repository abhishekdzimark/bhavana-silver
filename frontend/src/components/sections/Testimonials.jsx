import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FiStar } from 'react-icons/fi';
import testimonialsData from '../../data/testimonials.json';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const swiperRef = useRef(null);

  // Get testimonials from JSON
  const testimonials = testimonialsData.testimonials;

  // Scroll-triggered animations
  useGSAP(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="testimonials-section py-16 md:py-20 lg:py-24 bg-white w-full"
    >
      <div className="w-full">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="section-heading mb-12 md:mb-16 container mx-auto px-4"
        >
          TESTIMONIALS
        </h2>

        {/* Testimonials Slider */}
        <div className="relative w-full">
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay]}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            spaceBetween={20}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            pagination={{
              clickable: true,
              el: '.testimonial-pagination',
              bulletClass: 'testimonial-bullet',
              bulletActiveClass: 'testimonial-bullet-active'
            }}
            navigation={{
              nextEl: '.testimonial-button-next',
              prevEl: '.testimonial-button-prev'
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 24,
                centeredSlides: true
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
                centeredSlides: true
              }
            }}
            loop={true}
            speed={800}
            className="testimonial-swiper pb-16 px-4 md:px-6 lg:px-20"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                {({ isActive }) => (
                  <div 
                    className={`testimonial-card bg-white shadow-lg transition-all duration-500 rounded-xl p-6 md:p-8 min-h-[300px] md:min-h-[320px] flex flex-col justify-between ${
                      isActive 
                        ? 'border-2 border-primary blur-none scale-100' 
                        : 'border-0 blur-sm scale-95 opacity-80'
                    }`}
                  >
                    {/* Flag and Name */}
                    <div className="text-center mb-6">
                      <div className="text-5xl md:text-6xl mb-4">
                        {testimonial.flag}
                      </div>
                      <h3 className="font-sans text-[15px] md:text-body font-semibold text-gray-900 mb-1">
                        {testimonial.name}
                      </h3>
                      <p className="text-question text-gray-500">
                        {testimonial.country}
                      </p>
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-question md:text-body text-center leading-relaxed mb-6 text-gray-700">
                      {testimonial.text}
                    </p>

                    {/* Rating */}
                    <div className="flex justify-center gap-1">
                      {[...Array(testimonial.rating)].map((_, index) => (
                        <FiStar
                          key={index}
                          className="w-4 h-4 fill-primary text-primary"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button
            className="testimonial-button-prev absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white hover:bg-primary/10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl group border border-gray-200 hover:border-primary"
            aria-label="Previous testimonial"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-gray-700 group-hover:text-primary transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            className="testimonial-button-next absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white hover:bg-primary/10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl group border border-gray-200 hover:border-primary"
            aria-label="Next testimonial"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-gray-700 group-hover:text-primary transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Custom Pagination */}
          <div className="testimonial-pagination flex justify-center gap-2 mt-8"></div>
        </div>
      </div>

      <style jsx>{`
        .testimonial-bullet {
          width: 10px;
          height: 10px;
          background-color: #d1d5db;
          border-radius: 50%;
          opacity: 1;
          transition: all 0.3s;
          cursor: pointer;
        }

        .testimonial-bullet:hover {
          background-color: #9ca3af;
          transform: scale(1.2);
        }

        .testimonial-bullet-active {
          background-color: #997BB7 !important;
          width: 12px;
          height: 12px;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
