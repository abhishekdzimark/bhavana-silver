import { useState } from 'react';
import PropTypes from 'prop-types';
import { FiHeart } from 'react-icons/fi';

/**
 * Reusable Product Image Gallery with zoom on hover
 */
const ProductGallery = ({ 
  images, 
  productName,
  onWishlistToggle,
  isWishlisted = false 
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div 
        className="relative bg-white border border-gray-200 overflow-hidden aspect-square group cursor-zoom-in"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={images[selectedImage]}
          alt={productName}
          className={`w-full h-full object-contain p-8 transition-transform duration-500 ease-out ${
            isZoomed ? 'scale-125' : 'scale-100'
          }`}
          style={isZoomed ? {
            transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
          } : {}}
        />
        {/* Wishlist button */}
        <button
          onClick={onWishlistToggle}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300"
          aria-label="Add to wishlist"
        >
          <FiHeart className={`w-5 h-5 transition-colors ${
            isWishlisted ? 'fill-primary text-primary' : 'text-gray-600'
          }`} />
        </button>
      </div>

      {/* Thumbnail Images */}
      <div className="flex gap-2">
        {images.slice(0, 2).map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative bg-white border-2 overflow-hidden aspect-square transition-all duration-300 h-20 w-20 ${
              selectedImage === index ? 'border-primary' : 'border-gray-200 hover:border-gray-400'
            }`}
          >
            <img
              src={image}
              alt={`${productName} ${index + 1}`}
              className="w-full h-full object-contain p-2"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

ProductGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  productName: PropTypes.string.isRequired,
  onWishlistToggle: PropTypes.func,
  isWishlisted: PropTypes.bool,
};

export default ProductGallery;
