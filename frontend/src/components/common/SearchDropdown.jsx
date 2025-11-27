import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Search Results Dropdown Component
 * Displays instant search results below search bar
 */
const SearchDropdown = ({ results, query, onClose }) => {
  if (!query || results.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-2xl rounded-lg border border-gray-200 max-h-[500px] overflow-y-auto z-50">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <p className="text-sm text-gray-600">
          Found <span className="font-semibold text-gray-900">{results.length}</span> results for "{query}"
        </p>
      </div>

      {/* Results List */}
      <div className="py-2">
        {results.slice(0, 8).map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            onClick={onClose}
            className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors group"
          >
            {/* Product Image */}
            <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                {product.name}
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                {product.subcategory} • {product.material}
              </p>
              <p className="text-sm font-semibold text-primary mt-1">
                ${product.priceRange.min.toFixed(2)} - ${product.priceRange.max.toFixed(2)}
              </p>
            </div>

            {/* Arrow Icon */}
            <div className="flex-shrink-0 text-gray-400 group-hover:text-primary transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* View All Link */}
      {results.length > 8 && (
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
          <Link
            to={`/search?q=${encodeURIComponent(query)}`}
            onClick={onClose}
            className="text-sm text-primary hover:underline font-medium"
          >
            View all {results.length} results →
          </Link>
        </div>
      )}
    </div>
  );
};

SearchDropdown.propTypes = {
  results: PropTypes.array.isRequired,
  query: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SearchDropdown;
