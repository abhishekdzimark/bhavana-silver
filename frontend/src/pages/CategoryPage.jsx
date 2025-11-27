import { useState, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Breadcrumb, FilterSidebar } from '../components/common';
import { ProductGrid } from '../components/product';
import { getProductsByCategoryAndStone } from '../utils/productData';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Category/Archive Page Component
 * Displays products with filters and sorting
 */
const CategoryPage = () => {
  const { category, stone, collection } = useParams();
  
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

  // Get products based on category, stone, or collection from URL params
  const allProducts = useMemo(() => {
    return getProductsByCategoryAndStone(category, stone, collection);
  }, [category, stone, collection]);


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

  // Get page title
  const pageTitle = useMemo(() => {
    if (collection) {
      return `${collection.replace('-', ' ').toUpperCase()} COLLECTION`;
    }
    if (stone) {
      return `ALL ${stone.replace('-', ' ').toUpperCase()}`;
    }
    if (category) {
      return category.replace('-', ' ').toUpperCase();
    }
    return 'ALL PRODUCTS';
  }, [category, stone, collection]);

  // Generate breadcrumb items
  const breadcrumbItems = useMemo(() => {
    const items = [{ label: 'HOME', link: '/' }];
    
    if (collection) {
      items.push({ 
        label: collection.replace('-', ' ').toUpperCase(), 
        active: true 
      });
    } else {
      if (category) {
        items.push({ 
          label: category.replace('-', ' ').toUpperCase(), 
          link: stone ? `/category/${category}` : undefined,
          active: !stone
        });
      }
      if (stone) {
        items.push({ 
          label: stone.replace('-', ' ').toUpperCase(), 
          active: true 
        });
      }
    }
    
    return items;
  }, [category, stone, collection]);

  // GSAP scroll animations
  useGSAP(() => {
    // Animate title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate filter sidebar
    gsap.fromTo(
      filterRef.current,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: filterRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate product grid
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
    <section ref={sectionRef} className="category-page py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Page Title */}
        <h1 ref={titleRef} className="section-heading mb-8 md:mb-12">
          {pageTitle}
        </h1>

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
                {sortedProducts.length} products
              </p>
              <div className="flex items-center gap-3">
                <label className="text-[13px] text-gray-600 uppercase tracking-wide">
                  SORT BY
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 text-[13px] uppercase tracking-wide focus:border-primary focus:outline-none cursor-pointer"
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
            <ProductGrid products={sortedProducts} columns={3} gap={6} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
