import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FiShoppingCart, 
  FiTruck, 
  FiRefreshCw, 
  FiPackage, 
  FiGlobe, 
  FiEdit3,
  FiAward,
  FiCreditCard,
  FiDollarSign,
  FiImage,
  FiLayers,
  FiSend
} from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  // Features data - can be easily replaced with API data
  const features = [
    {
      id: 1,
      icon: FiShoppingCart,
      title: 'Simple 5-Step Ordering',
      description: 'Browse → Select → Customize → Cart → Pay'
    },
    {
      id: 2,
      icon: FiRefreshCw,
      title: 'Easy Reordering',
      description: 'Reorder bestsellers with just a few clicks'
    },
    {
      id: 3,
      icon: FiPackage,
      title: '$1000 MOV & No MOQ on Samples',
      description: 'Start small, scale fast — perfect for all business sizes.'
    },
    {
      id: 4,
      icon: FiGlobe,
      title: 'Worldwide Shipping',
      description: 'Quick and trackable (except India)'
    },
    {
      id: 5,
      icon: FiLayers,
      title: 'Multiple Gemstone Options',
      description: 'One design, many stone choices'
    },
    {
      id: 6,
      icon: FiEdit3,
      title: 'Custom Branding Available',
      description: 'Put your logo on jewelry & packaging'
    },
    {
      id: 7,
      icon: FiSend,
      title: 'Ship-Now Styles',
      description: 'Fast delivery in just 7 days on ship now items'
    },
    {
      id: 8,
      icon: FiAward,
      title: 'Trusted Exporter',
      description: 'Years of experience + RJC Certified'
    },
    {
      id: 9,
      icon: FiTruck,
      title: 'Dedicated Account Manager',
      description: 'Get personalized support for quotes, queries & orders'
    },
    {
      id: 10,
      icon: FiCreditCard,
      title: 'Secure Online Payments',
      description: 'Safe and smooth transactions for global buyers'
    },
    {
      id: 11,
      icon: FiDollarSign,
      title: 'Transparent Pricing',
      description: 'No hidden fees — what you see is what you pay'
    },
    {
      id: 12,
      icon: FiImage,
      title: 'High-Quality Product Images & Videos',
      description: 'Professional visuals provided for easy listing on your store'
    }
  ];

  // Scroll-triggered animations
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
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate feature cards with stagger
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 40,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            delay: (index % 3) * 0.1
          }
        );
      }
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="why-choose-us-section py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            ref={titleRef}
            className="section-heading mb-4"
          >
            WHY CHOOSE US?
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            
            return (
              <div
                key={feature.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className="feature-card group"
              >
                <div className="bg-white rounded-lg p-6 md:p-8 border border-gray-100 hover:border-primary/30 transition-all duration-300 hover:shadow-lg h-full">
                  {/* Icon */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                      <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-gray-700 group-hover:text-primary transition-colors duration-300" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-body md:text-[15px] font-semibold text-gray-900 mb-2 leading-snug">
                        {feature.title}
                      </h3>
                      <p className="text-question text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
