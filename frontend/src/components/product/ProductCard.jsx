import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FiStar, FiTruck } from 'react-icons/fi';

/**
 * Reusable Product Card Component
 */
const ProductCard = ({ 
  id,
  image,
  name,
  category,
  priceRange,
  originalPrice = null,
  rating = 0,
  isNew = false,
  onSale = false,
  readyToShip = false
}) => {
  // Calculate discount percentage if on sale
  const discountPercent = onSale && originalPrice 
    ? Math.round(((originalPrice.min - priceRange.min) / originalPrice.min) * 100)
    : null;
  return (
    <Link to={`/product/${id}`}>
      <div className="group bg-white border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Badges - Top Left */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {isNew && (
              <span className="bg-primary text-white text-xs px-3 py-1 uppercase tracking-wider font-semibold shadow-md">
                New
              </span>
            )}
            {onSale && discountPercent && (
              <span className="bg-red-500 text-white text-xs px-3 py-1 uppercase tracking-wider font-semibold shadow-md">
                Sale -{discountPercent}%
              </span>
            )}
          </div>

          {/* Ready to Ship Badge - Top Right */}
          {readyToShip && (
            <div className="absolute top-4 right-4">
              <div className="bg-green-500 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                <FiTruck className="w-3 h-3" />
                <span className="font-semibold uppercase tracking-wide">Ships Now</span>
              </div>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          {/* Category */}
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            {category}
          </p>

          {/* Product Name */}
          <h3 className="font-sans text-base font-normal text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
            {name}
          </h3>

          {/* Rating */}
          {rating > 0 && (
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`w-3 h-3 ${
                    i < rating ? 'fill-primary text-primary' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Price */}
          <div className="space-y-1">
            {/* Original Price (if on sale) */}
            {onSale && originalPrice && (
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-400 line-through">
                  ${originalPrice.min.toFixed(2)}
                </p>
                {originalPrice.max !== originalPrice.min && (
                  <>
                    <span className="text-gray-300">-</span>
                    <p className="text-sm text-gray-400 line-through">
                      ${originalPrice.max.toFixed(2)}
                    </p>
                  </>
                )}
              </div>
            )}
            
            {/* Current Price */}
            <div className="flex items-center gap-2">
              <p className={`text-lg font-light ${onSale ? 'text-red-600 font-semibold' : 'text-gray-900'}`}>
                ${priceRange.min.toFixed(2)}
              </p>
              {priceRange.max !== priceRange.min && (
                <>
                  <span className="text-gray-400">-</span>
                  <p className={`text-lg font-light ${onSale ? 'text-red-600 font-semibold' : 'text-gray-900'}`}>
                    ${priceRange.max.toFixed(2)}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

ProductCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  priceRange: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
  }).isRequired,
  originalPrice: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
  }),
  rating: PropTypes.number,
  isNew: PropTypes.bool,
  onSale: PropTypes.bool,
  readyToShip: PropTypes.bool,
};

export default ProductCard;
