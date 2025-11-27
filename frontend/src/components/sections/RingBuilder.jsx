import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import gemstone images
import peridotImg from '../../assets/gemstones/Peridot.png';
import labradoriteImg from '../../assets/gemstones/Labradorite.png';
import malachiteImg from '../../assets/gemstones/Malachite.png';
import blueTopazImg from '../../assets/gemstones/Blue-Topaz.png';
import tanzaniteImg from '../../assets/gemstones/Tanzanite.png';
import amethystImg from '../../assets/gemstones/Amethyst.png';
import garnetImg from '../../assets/gemstones/Garnet.png';
import citrineImg from '../../assets/gemstones/Citrine.png';
import opalImg from '../../assets/gemstones/Ethiopian-Opal.png';
import centerRingImg from '../../assets/gemstones/center-image.png';

gsap.registerPlugin(ScrollTrigger);

const RingBuilder = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gemRefs = useRef([]);
  const nameRef = useRef(null);
  
  const [activeGemIndex, setActiveGemIndex] = useState(0);

  const gemstones = [
    {
      id: 1,
      name: 'PERIDOT',
      color: '#9ACD32',
      image: peridotImg
    },
    {
      id: 2,
      name: 'LABRADORITE',
      color: '#4A5568',
      image: labradoriteImg
    },
    {
      id: 3,
      name: 'MALACHITE',
      color: '#047857',
      image: malachiteImg
    },
    {
      id: 4,
      name: 'BLUE TOPAZ',
      color: '#0EA5E9',
      image: blueTopazImg
    },
    {
      id: 5,
      name: 'TANZANITE',
      color: '#6366F1',
      image: tanzaniteImg
    },
    {
      id: 6,
      name: 'AMETHYST',
      color: '#9333EA',
      image: amethystImg
    },
    {
      id: 7,
      name: 'GARNET',
      color: '#DC2626',
      image: garnetImg
    },
    {
      id: 8,
      name: 'CITRINE',
      color: '#F59E0B',
      image: citrineImg
    },
    {
      id: 9,
      name: 'OPAL',
      color: '#E0E7FF',
      image: opalImg
    }
  ];

  // Auto-rotate gemstones
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveGemIndex((prev) => (prev + 1) % gemstones.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [gemstones.length]);

  // Animate gemstone change - just update the name
  useEffect(() => {
    if (nameRef.current) {
      const tl = gsap.timeline();
      
      tl.to(nameRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: 'power2.in'
      })
      .to(nameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  }, [activeGemIndex]);

  // Initial scroll animations
  useGSAP(() => {
    // Animate title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate ring and gemstones together
    gsap.fromTo(
      gemRefs.current,
      {
        opacity: 0,
        y: 30,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.5)',
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, { scope: sectionRef });

  const handleGemClick = (index) => {
    setActiveGemIndex(index);
  };

  return (
    <section
      ref={sectionRef}
      className="ring-builder-section py-16 md:py-20 lg:py-24 bg-white"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="section-heading mb-12 md:mb-16"
        >
          ONE DESIGN. MANY GEMSTONES.
        </h2>

        {/* Ring Builder Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Static Center Ring Background */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative w-56 h-56 md:w-64 md:h-64 lg:w-80 lg:h-80">
              <img 
                src={centerRingImg} 
                alt="Ring Setting"
                className="w-full h-full object-contain drop-shadow-xl"
              />
            </div>
          </div>

          {/* Animated Gemstones in Horizontal Layout */}
          <div className="flex items-center justify-center gap-4 md:gap-8 lg:gap-12 flex-wrap">
            {gemstones.map((gem, index) => {
              const isActive = index === activeGemIndex;
              
              return (
                <div
                  key={gem.id}
                  ref={(el) => (gemRefs.current[index] = el)}
                  className="cursor-pointer transition-all duration-500"
                  onClick={() => handleGemClick(index)}
                >
                  <div
                    className={`w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 ${
                      isActive
                        ? 'ring-4 ring-primary scale-110'
                        : 'hover:scale-110'
                    }`}
                  >
                    <img 
                      src={gem.image} 
                      alt={gem.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Gemstone Name */}
          <div
            ref={nameRef}
            className="mt-8 md:mt-12 text-center"
          >
            <p className="font-sans text-heading font-semibold tracking-widest text-gray-900">
              {gemstones[activeGemIndex].name}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RingBuilder;
