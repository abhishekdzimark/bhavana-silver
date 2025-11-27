import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import collectionsData from '../../data/collections.json';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Collections = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  // Get collections from JSON
  const collections = collectionsData.collections;

  // GSAP scroll-triggered animations
  useGSAP(() => {
    // Animate title
    gsap.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate collection cards with stagger
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 60,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            delay: index * 0.1
          }
        );
      }
    });
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef}
      className="collections-section py-16 md:py-20 lg:py-24 bg-white"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Title */}
        <h2 
          ref={titleRef}
          className="section-heading mb-12 md:mb-16"
        >
          SHOP BY COLLECTION
        </h2>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="collection-card group cursor-pointer"
            >
              <Link to={`/collection/${collection.slug}`} className="block">
                {/* Image Container */}
                <div className="relative overflow-hidden bg-gray-100 aspect-square mb-4 shadow-md hover:shadow-xl transition-shadow duration-500">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                </div>

                {/* Collection Name */}
                <h3 className="text-center text-body font-medium tracking-wide text-gray-800 group-hover:text-primary transition-colors duration-300">
                  {collection.name}
                </h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
