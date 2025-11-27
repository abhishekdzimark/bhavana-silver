import HeroSlider from '../components/sections/HeroSlider';
import Collections from '../components/sections/Collections';
import RingBuilder from '../components/sections/RingBuilder';
import FeaturesSlider from '../components/sections/FeaturesSlider';
import BestSellers from '../components/sections/BestSellers';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import Testimonials from '../components/sections/Testimonials';
import BookAppointment from '../components/sections/BookAppointment';
import Certifications from '../components/sections/Certifications';

/**
 * Home Page Component
 * Combines all homepage sections
 */
const HomePage = () => {
  return (
    <>
      <HeroSlider />
      <Collections />
      <RingBuilder />
      <FeaturesSlider />
      <BestSellers />
      <WhyChooseUs />
      <Testimonials />
      <BookAppointment />
      <Certifications />
    </>
  );
};

export default HomePage;
