
import { useState, useRef, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Breadcrumb, FilterSidebar } from '../components/common';
import { ProductGrid } from '../components/product';
import { searchProducts } from '../utils/productData';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Search Results Page Component
 * Displays search results with filters and sorting
 */
const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  // Refs for animations
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const filterRef = useRef(null);
  const gridRef = useRef(null);
  
  // State management
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    collections: [],
  });
  const [sortBy, setSortBy] = useState('new-to-old');

  // Get search results
  const searchResults = useMemo(() => {
    return searchProducts(query);
  }, [query]);

  // Filter products based on filters
  const filteredProducts = searchResults.filter(product => {
    // Price filter
    if (filters.priceMin && product.priceRange.min < parseFloat(filters.priceMin)) {
      return false;
    }
    if (filters.priceMax && product.priceRange.max > parseFloat(filters.priceMax)) {
      return false;
    }
    
    // Collection filter - only apply if collections are selected
    if (filters.collections && Array.isArray(filters.collections) && filters.collections.length > 0) {
      if (!product.collection || !filters.collections.includes(product.collection)) {
        return false;
      }
    }
    
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low-high':
        return a.priceRange.min - b.priceRange.min;
      case 'price-high-low':
        return b.priceRange.min - a.priceRange.min;
      case 'name-a-z':
        return a.name.localeCompare(b.name);
      case 'name-z-a':
        return b.name.localeCompare(a.name);
      default: // new-to-old
        return 0;
    }
  });

  // Handle filter change
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Handle filter reset
  const handleFilterReset = () => {
    setFilters({
      priceMin: '',
      priceMax: '',
      collections: [],
    });
  };

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'HOME', link: '/' },
    { label: 'SEARCH RESULTS', active: true }
  ];

  // GSAP scroll animations
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

    gsap.fromTo(
      filterRef.current,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(
      gridRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, { scope: sectionRef });

  // Scroll to top on query change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [query]);

  return (
    <section ref={sectionRef} className="search-results-page py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Page Title */}
        <div ref={titleRef} className="mb-8 md:mb-12">
          <h1 className="section-heading mb-4">
            SEARCH RESULTS
          </h1>
          {query && (
            <p className="text-center text-gray-600 text-lg">
              Showing results for: <span className="font-semibold text-gray-900">"{query}"</span>
            </p>
          )}
        </div>

        {/* No Query Message */}
        {!query && (
          <div className="text-center py-16">
            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h2 className="text-2xl font-medium text-gray-900 mb-2">No search query</h2>
            <p className="text-gray-600 mb-6">Please enter a search term to find products</p>
            <Link to="/" className="text-primary hover:underline">
              Return to Homepage
            </Link>
          </div>
        )}

        {/* No Results Message */}
        {query && searchResults.length === 0 && (
          <div className="text-center py-16">
            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-medium text-gray-900 mb-2">No results found</h2>
            <p className="text-gray-600 mb-6">We couldn't find any products matching "{query}"</p>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Try:</p>
              <ul className="list-disc list-inside">
                <li>Checking your spelling</li>
                <li>Using more general terms</li>
                <li>Using different keywords</li>
              </ul>
            </div>
            <Link to="/" className="inline-block mt-6 text-primary hover:underline">
              Return to Homepage
            </Link>
          </div>
        )}

        {/* Results with Filters */}
        {query && searchResults.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Filter Sidebar */}
            <div ref={filterRef} className="lg:col-span-1">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleFilterReset}
                productCount={sortedProducts.length}
                availableProducts={searchResults}
              />
            </div>

            {/* Products Grid */}
            <div ref={gridRef} className="lg:col-span-3">
              {/* Sort Bar */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <p className="text-[14px] text-gray-600">
                  {sortedProducts.length} products
                </p>
                <div className="flex items-center gap-3">
                  <label className="text-[13px] text-gray-600 uppercase tracking-wide">
                    SORT BY
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 text-[13px] uppercase tracking-wide focus:border-primary focus:outline-none"
                  >
                    <option value="new-to-old">NEW TO OLD</option>
                    <option value="price-low-high">PRICE: LOW TO HIGH</option>
                    <option value="price-high-low">PRICE: HIGH TO LOW</option>
                    <option value="name-a-z">NAME: A TO Z</option>
                    <option value="name-z-a">NAME: Z TO A</option>
                  </select>
                </div>
              </div>

              {/* Product Grid */}
              <ProductGrid products={sortedProducts} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResultsPage;
