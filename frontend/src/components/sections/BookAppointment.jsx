import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LeadForm from '../forms/LeadForm';

gsap.registerPlugin(ScrollTrigger);

const BookAppointment = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);

  const handleFormSubmit = (formData) => {
    // Form submission logic (will be replaced with API call)
    console.log('Form submitted:', formData);
    alert('Appointment request submitted successfully!');
  };

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
      formRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="book-appointment-section py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="section-heading mb-12 md:mb-16"
        >
          BOOK AN APPOINTMENT
        </h2>

        {/* Form */}
        <div ref={formRef} className="max-w-5xl mx-auto">
          <LeadForm onSubmit={handleFormSubmit} />
        </div>
      </div>
    </section>
  );
};

export default BookAppointment;
