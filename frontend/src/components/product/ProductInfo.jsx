import PropTypes from 'prop-types';
import { FiStar, FiShare2 } from 'react-icons/fi';

/**
 * Reusable Product Information Display
 */
const ProductInfo = ({ 
  sku,
  name,
  category,
  subcategory,
  style,
  weight,
  priceRange,
  rating = 0,
  reviewCount = 0,
  onShare
}) => {
  return (
    <div className="space-y-6">
      {/* Product Code */}
      <p className="text-[13px] text-gray-600 uppercase tracking-wide">
        {sku}
      </p>

      {/* Product Title */}
      <h1 className="font-sans text-2xl md:text-3xl lg:text-4xl font-normal text-gray-900 leading-tight uppercase">
        {name}
      </h1>

      {/* Product Meta */}
      <div className="flex flex-wrap items-center gap-2 text-[13px] text-primary uppercase">
        <span>{category}</span>
        <span className="text-gray-400">|</span>
        <span>{subcategory}</span>
        <span className="text-gray-400">|</span>
        <span>{style}</span>
        <span className="text-gray-400">|</span>
        <span className="text-gray-600">{weight}</span>
      </div>

      {/* Rating & Reviews */}
      {rating > 0 && (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`w-4 h-4 ${
                  i < rating ? 'fill-primary text-primary' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({reviewCount} reviews)</span>
        </div>
      )}

      {/* Price Range */}
      <div className="py-4 border-t border-b border-gray-200">
        <p className="text-3xl md:text-4xl font-light text-gray-900">
          ${priceRange.min.toFixed(2)} - ${priceRange.max.toFixed(2)}
        </p>
      </div>

      {/* Share Button */}
      {onShare && (
        <button
          onClick={onShare}
          className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
        >
          <FiShare2 className="w-5 h-5" />
          <span className="text-sm uppercase tracking-wide">Share</span>
        </button>
      )}
    </div>
  );
};

ProductInfo.propTypes = {
  sku: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  subcategory: PropTypes.string,
  style: PropTypes.string,
  weight: PropTypes.string,
  priceRange: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
  }).isRequired,
  rating: PropTypes.number,
  reviewCount: PropTypes.number,
  onShare: PropTypes.func,
};

export default ProductInfo;
