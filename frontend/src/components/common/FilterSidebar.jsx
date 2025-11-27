import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { getAllProducts } from '../../utils/productData';

/**
 * Reusable Filter Sidebar Component
 */
const FilterSidebar = ({ 
  filters = {},
  onFilterChange,
  onReset,
  productCount = 0,
  availableProducts = [] // Products available on current page/category
}) => {
  // Only one section open at a time (accordion behavior)
  const [expandedSection, setExpandedSection] = useState('price');

  // Price range state
  const minPrice = 38;
  const maxPrice = 1206;
  const [priceRange, setPriceRange] = useState([
    filters.priceMin || minPrice,
    filters.priceMax || maxPrice
  ]);

  // Get unique collections from available products (filtered by current category/page)
  const productsToFilter = availableProducts.length > 0 ? availableProducts : getAllProducts();
  const collections = [...new Set(productsToFilter.map(p => p.collection))].filter(Boolean).sort();

  const toggleSection = (section) => {
    setExpandedSection(prev => prev === section ? null : section);
  };

  const handlePriceInputChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = value === '' ? '' : Number(value);
    setPriceRange(newRange);
  };

  const handlePriceApply = () => {
    onFilterChange('priceMin', priceRange[0]);
    onFilterChange('priceMax', priceRange[1]);
  };

  const handleSliderChange = (e, index) => {
    const newRange = [...priceRange];
    newRange[index] = Number(e.target.value);
    
    // Ensure min doesn't exceed max and vice versa
    if (index === 0 && newRange[0] > priceRange[1]) {
      newRange[0] = priceRange[1];
    }
    if (index === 1 && newRange[1] < priceRange[0]) {
      newRange[1] = priceRange[0];
    }
    
    setPriceRange(newRange);
    onFilterChange('priceMin', newRange[0]);
    onFilterChange('priceMax', newRange[1]);
  };

  // Update local state when filters change externally
  useEffect(() => {
    setPriceRange([
      filters.priceMin || minPrice,
      filters.priceMax || maxPrice
    ]);
  }, [filters.priceMin, filters.priceMax]);

  return (
    <div className="filter-sidebar">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[15px] font-semibold text-gray-900 uppercase tracking-wider">
          FILTER BY
        </h3>
        <button
          onClick={onReset}
          className="text-[13px] text-primary hover:underline uppercase tracking-wide"
        >
          Reset all
        </button>
      </div>

      {/* Product Count */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <p className="text-[14px] text-gray-600">
          {productCount} products
        </p>
      </div>

      {/* Price Filter */}
      <div className="mb-4 border-b border-gray-200">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center gap-2 py-3 text-left"
        >
          {expandedSection === 'price' ? <FiChevronDown className="text-gray-600" /> : <FiChevronRight className="text-gray-600" />}
          <span className="text-[14px] font-medium text-gray-900 uppercase tracking-wide">
            PRICE
          </span>
        </button>
        <div 
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expandedSection === 'price' ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pb-6 space-y-4">
            {/* Price Input Fields */}
            <div className="flex items-center gap-2">
              <div className="flex items-center border border-gray-300 px-3 py-2 flex-1">
                <span className="text-gray-600 text-sm mr-1">$</span>
                <input
                  type="number"
                  className="w-full text-sm focus:outline-none"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceInputChange(0, e.target.value)}
                  onBlur={handlePriceApply}
                  min={minPrice}
                  max={maxPrice}
                />
              </div>
              <span className="text-gray-400">-</span>
              <div className="flex items-center border border-gray-300 px-3 py-2 flex-1">
                <span className="text-gray-600 text-sm mr-1">$</span>
                <input
                  type="number"
                  className="w-full text-sm focus:outline-none"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceInputChange(1, e.target.value)}
                  onBlur={handlePriceApply}
                  min={minPrice}
                  max={maxPrice}
                />
              </div>
              <button
                onClick={handlePriceApply}
                className="px-4 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-medium transition-colors"
              >
                Go
              </button>
            </div>

            {/* Range Slider */}
            <div className="relative pt-2 pb-4">
              {/* Slider Track */}
              <div className="relative h-1 bg-gray-300 rounded">
                {/* Active Range */}
                <div
                  className="absolute h-1 bg-primary rounded"
                  style={{
                    left: `${((priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100}%`,
                    right: `${100 - ((priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100}%`
                  }}
                />
              </div>

              {/* Min Slider */}
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={priceRange[0]}
                onChange={(e) => handleSliderChange(e, 0)}
                className="range-slider-input"
                style={{ zIndex: priceRange[0] > priceRange[1] - 100 ? 5 : 3 }}
              />

              {/* Max Slider */}
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => handleSliderChange(e, 1)}
                className="range-slider-input"
                style={{ zIndex: 4 }}
              />

              {/* Price Labels */}
              <div className="flex justify-between mt-6 text-xs text-gray-600">
                <span>{minPrice}</span>
                <span>{Math.round((maxPrice - minPrice) * 0.25 + minPrice)}</span>
                <span>{Math.round((maxPrice - minPrice) * 0.5 + minPrice)}</span>
                <span>{Math.round((maxPrice - minPrice) * 0.75 + minPrice)}</span>
                <span>{maxPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Collection Filter */}
      <div className="mb-4 border-b border-gray-200">
        <button
          onClick={() => toggleSection('collection')}
          className="w-full flex items-center gap-2 py-3 text-left"
        >
          {expandedSection === 'collection' ? <FiChevronDown className="text-gray-600" /> : <FiChevronRight className="text-gray-600" />}
          <span className="text-[14px] font-medium text-gray-900 uppercase tracking-wide">
            COLLECTION
          </span>
        </button>
        <div 
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expandedSection === 'collection' ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pb-4 space-y-3">
            {collections.map((collection) => {
              const count = productsToFilter.filter(p => p.collection === collection).length;
              return (
                <label
                  key={collection}
                  className="flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.collections?.includes(collection) || false}
                      onChange={(e) => {
                        const currentCollections = filters.collections || [];
                        const newCollections = e.target.checked
                          ? [...currentCollections, collection]
                          : currentCollections.filter(c => c !== collection);
                        onFilterChange('collections', newCollections);
                      }}
                      className="w-4 h-4 border-2 border-gray-300 rounded text-primary cursor-pointer focus:outline-none focus:ring-0 focus:border-primary checked:bg-primary checked:border-primary"
                    />
                    <span className="ml-3 text-[13px] text-gray-700 group-hover:text-gray-900 uppercase tracking-wide">
                      {collection.replace('-', ' ')}
                    </span>
                  </div>
                  <span className="text-[12px] text-gray-400">({count})</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* Weight Filter */}
      <div className="mb-4 border-b border-gray-200">
        <button
          onClick={() => toggleSection('weight')}
          className="w-full flex items-center gap-2 py-3 text-left"
        >
          {expandedSection === 'weight' ? <FiChevronDown className="text-gray-600" /> : <FiChevronRight className="text-gray-600" />}
          <span className="text-[14px] font-medium text-gray-900 uppercase tracking-wide">
            WEIGHT
          </span>
        </button>
        <div 
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expandedSection === 'weight' ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pb-4 space-y-2">
            <p className="text-[13px] text-gray-500 italic">Coming soon...</p>
          </div>
        </div>
      </div>

      {/* Stone Filter */}
      <div className="mb-4 border-b border-gray-200">
        <button
          onClick={() => toggleSection('stone')}
          className="w-full flex items-center gap-2 py-3 text-left"
        >
          {expandedSection === 'stone' ? <FiChevronDown className="text-gray-600" /> : <FiChevronRight className="text-gray-600" />}
          <span className="text-[14px] font-medium text-gray-900 uppercase tracking-wide">
            STONE
          </span>
        </button>
        <div 
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expandedSection === 'stone' ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pb-4 space-y-2">
            <p className="text-[13px] text-gray-500 italic">Coming soon...</p>
          </div>
        </div>
      </div>

      {/* Shape Filter */}
      <div className="mb-4 border-b border-gray-200">
        <button
          onClick={() => toggleSection('shape')}
          className="w-full flex items-center gap-2 py-3 text-left"
        >
          {expandedSection === 'shape' ? <FiChevronDown className="text-gray-600" /> : <FiChevronRight className="text-gray-600" />}
          <span className="text-[14px] font-medium text-gray-900 uppercase tracking-wide">
            SHAPE
          </span>
        </button>
        <div 
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expandedSection === 'shape' ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pb-4 space-y-2">
            <p className="text-[13px] text-gray-500 italic">Coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

FilterSidebar.propTypes = {
  filters: PropTypes.object,
  onFilterChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  productCount: PropTypes.number,
  availableProducts: PropTypes.array,
};

export default FilterSidebar;
