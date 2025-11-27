import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ProductCard from './ProductCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

/**
 * Reusable Related Products Carousel
 */
const RelatedProducts = ({ products, title = "RELATED PRODUCTS" }) => {
  return (
    <div className="border-t pt-12 mt-12">
      <h2 className="section-heading mb-12 md:mb-16">{title}</h2>
      
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{
            nextEl: '.related-button-next',
            prevEl: '.related-button-prev'
          }}
          pagination={{
            clickable: true,
            el: '.related-pagination',
            bulletClass: 'swiper-pagination-bullet-custom',
            bulletActiveClass: 'swiper-pagination-bullet-active-custom'
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 24
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 24
            }
          }}
          className="pb-12"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard {...product} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <button
          className="related-button-prev absolute left-0 md:left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 shadow-xl hover:shadow-2xl group hover:scale-110 backdrop-blur-sm"
          aria-label="Previous product"
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
          className="related-button-next absolute right-0 md:right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 shadow-xl hover:shadow-2xl group hover:scale-110 backdrop-blur-sm"
          aria-label="Next product"
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

        {/* Pagination */}
        <div className="related-pagination flex justify-center gap-2 mt-4"></div>
      </div>
    </div>
  );
};

RelatedProducts.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      priceRange: PropTypes.shape({
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
  title: PropTypes.string,
};

export default RelatedProducts;
