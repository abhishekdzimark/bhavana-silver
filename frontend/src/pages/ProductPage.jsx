import { useState, useRef, useEffect, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiShoppingCart, FiTruck, FiShield } from 'react-icons/fi';
import { getProductById, getRelatedProducts } from '../utils/productData';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

import { Modal, Breadcrumb } from '../components/common';
import { LeadForm } from '../components/forms';
import { 
  ProductGallery, 
  ProductInfo, 
  RelatedProducts, 
  CertificationGrid 
} from '../components/product';

// Import gemstone images
import amethystImg from '../assets/gemstones/Amethyst.png';
import blueTopazImg from '../assets/gemstones/Blue-Topaz.png';
import citrineImg from '../assets/gemstones/Citrine.png';
import ethiopianOpalImg from '../assets/gemstones/Ethiopian-Opal.png';
import garnetImg from '../assets/gemstones/Garnet.png';
import labradoriteImg from '../assets/gemstones/Labradorite.png';
import malachiteImg from '../assets/gemstones/Malachite.png';
import peridotImg from '../assets/gemstones/Peridot.png';
import tanzaniteImg from '../assets/gemstones/Tanzanite.png';

// Import certificate images
import rjcCert from '../assets/certificates/responsible-jewellery-council.png';
import sgjiaCert from '../assets/certificates/sgjia.png';
import gjepcCert from '../assets/certificates/gjepc.png';
import jaipurCert from '../assets/certificates/jaiput-jewellary-show.png';
import starExportCert from '../assets/certificates/star-export.png';
import fieoCert from '../assets/certificates/fieo.png';

const ProductPage = () => {
  const { id } = useParams();
  const sectionRef = useRef(null);
  
  // Get product by ID
  const product = getProductById(id);
  
  // If product not found, redirect to home
  if (!product) {
    return <Navigate to="/" replace />;
  }
  
  // State management
  const [showModal, setShowModal] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState('details');
  const [detailsTab, setDetailsTab] = useState('stone');
  
  // Handle form submission
  const handleFormSubmit = (formData) => {
    console.log('Form submitted:', formData);
    alert('Appointment request submitted successfully!');
    setShowModal(false);
  };
  
  // Handle wishlist toggle
  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
  };
  
  // Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      alert('Share functionality not supported on this browser');
    }
  };
  
  // Show modal after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, []);

  // Additional state for product interactions
  const [selectedStone, setSelectedStone] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [gemstoneQuantities, setGemstoneQuantities] = useState({});

  // Handle quantity change
  const handleQuantityChange = (action) => {
    if (action === 'increment') {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    console.log('Added to cart:', { product, selectedStone, quantity });
    alert('Product added to cart!');
  };

  // Get related products dynamically
  const relatedProducts = getRelatedProducts(product.id, product.category, 4).map(p => ({
    ...p,
    image: p.images[0] // Use first image for card
  }));

  // Prepare certifications data
  const certifications = [
    { name: 'Responsible Jewellery Council', image: rjcCert },
    { name: 'SGJIA', image: sgjiaCert },
    { name: 'GJEPC', image: gjepcCert },
    { name: 'Jaipur Jewellery Show', image: jaipurCert },
    { name: 'Star Export', image: starExportCert },
    { name: 'FIEO', image: fieoCert }
  ];

  // Generate breadcrumb items
  const breadcrumbItems = useMemo(() => {
    const items = [{ label: 'HOME', link: '/' }];
    
    if (product.category) {
      items.push({ 
        label: product.category.replace('-', ' ').toUpperCase(), 
        link: `/category/${product.category}` 
      });
    }
    
    if (product.subcategory) {
      items.push({ 
        label: product.subcategory.toUpperCase(), 
        link: `/category/${product.category}/${product.subcategory.toLowerCase()}` 
      });
    }
    
    if (product.stone) {
      items.push({ 
        label: product.stone.replace('-', ' ').toUpperCase(), 
        link: `/category/${product.category}/${product.stone}` 
      });
    }
    
    items.push({ 
      label: product.id, 
      active: true 
    });
    
    return items;
  }, [product]);

  // GSAP scroll animations
  useGSAP(() => {
    // Animate product sections on scroll
    const sections = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    
    sections?.forEach((section, index) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          delay: index * 0.1
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="product-page py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 animate-on-scroll">
          {/* Image Gallery Component */}
          <ProductGallery
            images={product.images}
            productName={product.name}
            onWishlistToggle={handleWishlistToggle}
            isWishlisted={isWishlisted}
          />

          {/* Product Info Component */}
          <div className="space-y-6">
            <ProductInfo
              sku={product.sku}
              name={product.name}
              category={product.category}
              subcategory={product.subcategory}
              style={product.style}
              weight={product.weight}
              priceRange={product.priceRange}
              rating={product.rating}
              reviewCount={product.reviews}
              onShare={handleShare}
            />

            {/* Details Collapsible Section */}
            <div className="border border-gray-200">
              <button
                onClick={() => setActiveAccordion(activeAccordion === 'details' ? '' : 'details')}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-body font-semibold text-gray-900 uppercase tracking-wider">DETAILS</span>
                <span className="text-2xl text-gray-600">{activeAccordion === 'details' ? '-' : '+'}</span>
              </button>
              
              {activeAccordion === 'details' && (
                <div className="px-6 pb-6 space-y-6">
                  {/* Stone/Product Tabs */}
                  <div className="flex gap-4 border-b">
                    <button 
                      onClick={() => setDetailsTab('stone')}
                      className={`px-4 py-2 text-[13px] font-semibold uppercase transition-colors ${
                        detailsTab === 'stone' 
                          ? 'text-gray-900 border-b-2 border-gray-900' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      STONE
                    </button>
                    <button 
                      onClick={() => setDetailsTab('product')}
                      className={`px-4 py-2 text-[13px] font-semibold uppercase transition-colors ${
                        detailsTab === 'product' 
                          ? 'text-gray-900 border-b-2 border-gray-900' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      PRODUCT
                    </button>
                  </div>

                  {/* Stone Tab Content */}
                  {detailsTab === 'stone' && (
                    <>
                      {/* Stone Details Label */}
                      <p className="text-[13px] text-gray-600">
                        approx stone weight
                      </p>

                      {/* Stone Details Table */}
                      <div className="space-y-3">
                        {product.stoneDetails.map((stone, index) => (
                          <div key={index} className="grid grid-cols-8 gap-2 text-[12px] leading-relaxed">
                            <div className="col-span-2">
                              <p className="font-medium text-gray-900">{stone.name}</p>
                            </div>
                            <div className="col-span-1 text-gray-700">{stone.shape}</div>
                            <div className="col-span-1 text-gray-700">{stone.size}</div>
                            <div className="col-span-1 text-gray-700">{stone.pieces}</div>
                            <div className="col-span-1 text-gray-700">{stone.weight}</div>
                            <div className="col-span-1 text-gray-700">{stone.setting}</div>
                            <div className="col-span-1 text-gray-700">{stone.quality}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Product Tab Content */}
                  {detailsTab === 'product' && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 py-2">
                        <span className="text-[13px] font-medium text-gray-900">SKU:</span>
                        <span className="text-[13px] text-gray-700">{product.sku}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 py-2">
                        <span className="text-[13px] font-medium text-gray-900">Material:</span>
                        <span className="text-[13px] text-gray-700">{product.material}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 py-2">
                        <span className="text-[13px] font-medium text-gray-900">Weight:</span>
                        <span className="text-[13px] text-gray-700">{product.weight}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 py-2">
                        <span className="text-[13px] font-medium text-gray-900">Gemstone:</span>
                        <span className="text-[13px] text-gray-700">{product.gemstone}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 py-2">
                        <span className="text-[13px] font-medium text-gray-900">Category:</span>
                        <span className="text-[13px] text-gray-700">{product.category}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 py-2">
                        <span className="text-[13px] font-medium text-gray-900">Style:</span>
                        <span className="text-[13px] text-gray-700">{product.style}</span>
                      </div>
                    </div>
                  )}

                  {/* Minimum Order Info */}
                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex items-start gap-2">
                      <span className="text-primary text-lg">✓</span>
                      <p className="text-[13px] text-gray-700">
                        Minimum Order Quantity {product.minOrderQuantity} pieces per design
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary text-lg">✓</span>
                      <p className="text-[13px] text-gray-700">
                        Minimum {product.minGemstonePieces} pieces per gemstone variation
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Description Accordion */}
            <div className="border border-gray-200">
              <button
                onClick={() => setActiveAccordion(activeAccordion === 'description' ? '' : 'description')}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-body font-semibold text-gray-900 uppercase tracking-wider">DESCRIPTION</span>
                <span className="text-2xl text-gray-600">{activeAccordion === 'description' ? '-' : '+'}</span>
              </button>
              
              {activeAccordion === 'description' && (
                <div className="px-6 pb-6 space-y-4">
                  <p className="text-body text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                  <h3 className="font-sans text-[16px] font-semibold text-gray-900 mt-6 mb-3">
                    Features:
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-body text-gray-700">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#A67C7C] hover:bg-[#956D6D] text-white font-sans font-medium text-[13px] px-8 py-4 transition-all duration-300 uppercase tracking-wider"
              >
                MAKE AN ORDER
              </button>
              <button
                className="flex-1 bg-[#A67C7C] hover:bg-[#956D6D] text-white font-sans font-medium text-[13px] px-8 py-4 transition-all duration-300 uppercase tracking-wider"
              >
                ALL STONE CUSTOMIZATION
              </button>
            </div>
          </div>
        </div>

        {/* Related Products Component */}
        <RelatedProducts products={relatedProducts} title="YOU MAY ALSO LIKE" />

        {/* Certifications Component */}
        <CertificationGrid certifications={certifications} />
      </div>

      {/* Lead Form Modal */}
      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        title="BOOK AN APPOINTMENT"
      >
        <LeadForm onSubmit={handleFormSubmit} />
      </Modal>
    </section>
  );
};

export default ProductPage;
