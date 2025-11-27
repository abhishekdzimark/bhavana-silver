import { useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getAllProducts } from '../../utils/productData';

gsap.registerPlugin(ScrollTrigger);

const BestSellers = () => {
  const [activeTab, setActiveTab] = useState('gold');
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const tabsRef = useRef(null);
  const productsRef = useRef([]);

  const categories = [
    { id: 'gold', label: 'GOLD JEWELRY' },
    { id: 'silver', label: 'SILVER JEWELRY' },
    { id: 'fashion', label: 'FASHION JEWELRY' }
  ];

  // Get products dynamically from JSON
  const allProducts = getAllProducts();
  
  const products = useMemo(() => ({
    gold: allProducts.filter(p => p.category === 'gold-jewelry').slice(0, 5),
    silver: allProducts.filter(p => p.category === 'silver-jewelry').slice(0, 5),
    fashion: allProducts.filter(p => p.category === 'fashion-jewelry').slice(0, 5)
  }), [allProducts]);

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

    gsap.fromTo(
      tabsRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, { scope: sectionRef });

  // Animate products when tab changes
  useGSAP(() => {
    if (productsRef.current.length > 0) {
      gsap.fromTo(
        productsRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.1
        }
      );
    }
  }, [activeTab]);

  return (
    <section
      ref={sectionRef}
      className="best-sellers-section py-16 md:py-20 lg:py-24 bg-white"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="section-heading mb-8 md:mb-12"
        >
          BEST SELLERS
        </h2>

        {/* Tabs */}
        <div
          ref={tabsRef}
          className="flex justify-center gap-6 md:gap-12 mb-12 md:mb-16 flex-wrap"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`font-sans text-body font-semibold tracking-wider transition-all duration-300 pb-2 ${
                activeTab === category.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {products[activeTab].slice(0, 5).map((product, index) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              ref={(el) => (productsRef.current[index] = el)}
              className="product-card group cursor-pointer block"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden bg-gray-50 aspect-square mb-4 shadow-md hover:shadow-xl transition-shadow duration-500">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-body font-bold text-gray-900">
                    ${product.priceRange.min.toFixed(2)}
                  </span>
                  {product.priceRange.max > product.priceRange.min && (
                    <span className="text-question text-gray-500">
                      - ${product.priceRange.max.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Product Code */}
                <p className="text-question text-gray-600 tracking-wide">
                  {product.id}
                </p>

                {/* Product Name */}
                <h3 className="text-body font-medium text-gray-800 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {product.name}
                </h3>

                {/* Category & Stone */}
                <div className="flex items-center gap-2 text-question text-gray-500">
                  <span>{product.material}</span>
                  {product.stone && (
                    <>
                      <span>•</span>
                      <span className="capitalize">{product.stone.replace('-', ' ')}</span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
