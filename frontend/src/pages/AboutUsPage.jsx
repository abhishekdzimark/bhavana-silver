import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Breadcrumb } from '../components/common';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * About Us Page Component
 */
const AboutUsPage = () => {
  const sectionRef = useRef(null);
  const videoBannerRef = useRef(null);
  const overlayContentRef = useRef(null);
  const stickyNavRef = useRef(null);
  const [activeSection, setActiveSection] = useState('our-story');
  const [navbarHeight, setNavbarHeight] = useState(0);

  // Navigation sections
  const navSections = [
    { id: 'our-story', label: 'OUR STORY' },
    { id: 'why-us', label: 'WHY US' },
    { id: 'how-to-order', label: 'HOW TO ORDER' },
    { id: 'meet-the-team', label: 'MEET THE TEAM' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'book-appointment', label: 'BOOK AN APPOINTMENT' }
  ];

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'HOME', link: '/' },
    { label: 'ABOUT US', active: true }
  ];

  // Calculate navbar height dynamically
  useEffect(() => {
    const calculateNavbarHeight = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
      }
    };

    // Calculate on mount
    calculateNavbarHeight();

    // Recalculate on window resize
    window.addEventListener('resize', calculateNavbarHeight);
    return () => window.removeEventListener('resize', calculateNavbarHeight);
  }, []);

  // Scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    const stickyNav = stickyNavRef.current;
    
    if (element && stickyNav) {
      const offset = navbarHeight + stickyNav.offsetHeight;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navSections.map(nav => document.getElementById(nav.id));
      const stickyNav = stickyNavRef.current;
      const scrollOffset = stickyNav ? navbarHeight + stickyNav.offsetHeight : 200;
      const scrollPosition = window.scrollY + scrollOffset;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navSections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navbarHeight]);

  // GSAP animations
  useGSAP(() => {
    // Fade in overlay content
    gsap.fromTo(
      overlayContentRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.3,
        ease: 'power3.out'
      }
    );
  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="about-us-page">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Video Banner Section */}
      <section ref={videoBannerRef} className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-black">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1920&h=1080&fit=crop"
          >
            {/* Multiple video sources for better compatibility */}
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-woman-working-on-a-piece-of-jewelry-5036-large.mp4"
              type="video/mp4"
            />
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-close-up-of-hands-working-on-jewelry-5037-large.mp4"
              type="video/mp4"
            />
            {/* Fallback image if video doesn't load */}
            Your browser does not support the video tag.
          </video>
          
          {/* Strong Black Overlay for text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>

        {/* Overlay Content */}
        <div ref={overlayContentRef} className="relative z-10 h-full flex items-center justify-center">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-6 tracking-wide text-white drop-shadow-lg">
              OUR STORY
            </h1>
            <div className="w-24 h-0.5 bg-white mx-auto mb-6 opacity-90"></div>
            <p className="text-lg md:text-xl lg:text-2xl font-light max-w-3xl mx-auto leading-relaxed text-white drop-shadow-md">
              Crafting timeless elegance since decades, where tradition meets modern artistry
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2 text-white animate-bounce drop-shadow-lg">
            <span className="text-sm uppercase tracking-wider font-medium">Scroll</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Sticky Navigation Bar - Sticks right after main navbar */}
      <div 
        ref={stickyNavRef}
        className="sticky z-[50] bg-white border-b border-gray-200 shadow-md"
        style={{ top: `${navbarHeight}px` }}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-center overflow-x-auto scrollbar-hide">
            <div className="flex gap-1 py-4">
              {navSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-6 py-2.5 text-xs md:text-sm font-medium uppercase tracking-wider whitespace-nowrap transition-all duration-300 rounded-full ${
                    activeSection === section.id
                      ? 'bg-primary text-white shadow-md'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="bg-white">
        {/* Our Story Section */}
        <section id="our-story" className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-8">Our Story</h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto">
              Content for Our Story section...
            </p>
          </div>
        </section>

        {/* Why Us Section */}
        <section id="why-us" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-8">Why Us</h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto">
              Content for Why Us section...
            </p>
          </div>
        </section>

        {/* How to Order Section */}
        <section id="how-to-order" className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-8">How to Order</h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto">
              Content for How to Order section...
            </p>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section id="meet-the-team" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-8">Meet the Team</h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto">
              Content for Meet the Team section...
            </p>
          </div>
        </section>

        {/* FAQs Section */}
        <section id="faqs" className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-8">FAQs</h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto">
              Content for FAQs section...
            </p>
          </div>
        </section>

        {/* Book an Appointment Section */}
        <section id="book-appointment" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-8">Book an Appointment</h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto">
              Content for Book an Appointment section...
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUsPage;
