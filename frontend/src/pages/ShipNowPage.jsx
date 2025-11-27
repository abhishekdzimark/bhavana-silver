import { useState, useRef, useMemo } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Breadcrumb, FilterSidebar } from '../components/common';
import { ProductGrid } from '../components/product';
import { getReadyToShipProducts } from '../utils/productData';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Ship Now Page Component
 * Displays products that are ready to ship immediately
 */
const ShipNowPage = () => {
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

  // Get all ready-to-ship products
  const allProducts = useMemo(() => {
    return getReadyToShipProducts();
  }, []);

  // Filter products based on filters
  const filteredProducts = allProducts.filter(product => {
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
    { label: 'SHIP NOW', active: true }
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

  return (
    <section ref={sectionRef} className="ship-now-page py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Page Header */}
        <div ref={titleRef} className="text-center mb-8 md:mb-12">
          <h1 className="section-heading mb-4">
            SHIP NOW
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ready to ship immediately! Browse our selection of {allProducts.length} products available for fast delivery.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-medium">In Stock & Ready to Ship</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Filter Sidebar */}
          <div ref={filterRef} className="lg:col-span-1">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleFilterReset}
              productCount={sortedProducts.length}
              availableProducts={allProducts}
            />
          </div>

          {/* Products Grid */}
          <div ref={gridRef} className="lg:col-span-3">
            {/* Sort Bar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <p className="text-[14px] text-gray-600">
                {sortedProducts.length} products ready to ship
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
      </div>
    </section>
  );
};

export default ShipNowPage;
