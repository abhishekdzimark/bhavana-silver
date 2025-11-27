import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import certificate images
import rjcCert from '../../assets/certificates/responsible-jewellery-council.png';
import sgjiaCert from '../../assets/certificates/sgjia.png';
import gjepcCert from '../../assets/certificates/gjepc.png';
import jaipurCert from '../../assets/certificates/jaiput-jewellary-show.png';
import starExportCert from '../../assets/certificates/star-export.png';
import fieoCert from '../../assets/certificates/fieo.png';

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const certificatesRef = useRef([]);

  // Certification data - Using local certificate images
  const certifications = [
    {
      id: 1,
      name: 'Responsible Jewellery Council',
      image: rjcCert,
      alt: 'RJC Certification'
    },
    {
      id: 2,
      name: 'SGJIA Sitapura',
      image: sgjiaCert,
      alt: 'SGJIA Certification'
    },
    {
      id: 3,
      name: 'GJEPC India',
      image: gjepcCert,
      alt: 'GJEPC Certification'
    },
    {
      id: 4,
      name: 'Jaipur Jewellery Show',
      image: jaipurCert,
      alt: 'Jaipur Jewellery Show'
    },
    {
      id: 5,
      name: 'Star Export House',
      image: starExportCert,
      alt: 'Star Export Certification'
    },
    {
      id: 6,
      name: 'FIEO',
      image: fieoCert,
      alt: 'FIEO Certification'
    }
  ];

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

    // Animate certificates with stagger
    certificatesRef.current.forEach((cert, index) => {
      if (cert) {
        gsap.fromTo(
          cert,
          {
            opacity: 0,
            y: 30,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cert,
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
      className="certifications-section py-16 md:py-20 lg:py-24 bg-white"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="section-heading mb-12 md:mb-16"
        >
          OUR CERTIFICATES
        </h2>

        {/* Certifications Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 lg:gap-10 max-w-7xl mx-auto items-center">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              ref={(el) => (certificatesRef.current[index] = el)}
              className="certification-item group"
            >
              <div className="bg-white rounded-lg p-4 md:p-6 flex items-center justify-center transition-all duration-300 hover:shadow-lg border border-gray-100 hover:border-primary/30 h-32 md:h-36 lg:h-40">
                <img
                  src={cert.image}
                  alt={cert.alt}
                  className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 opacity-70 group-hover:opacity-100"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
