import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiMail } from 'react-icons/fi';
import whiteLogo from '../../assets/logos/white-logo.png';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Newsletter subscription logic (will be replaced with API call)
      console.log('Subscribed:', email);
      alert('Thank you for subscribing to our newsletter!');
      setEmail('');
    }
  };

  return (
    <footer className="footer bg-white">
      {/* Top Section with Links */}
      <div className="border-t border-gray-200 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {/* Column 1: Customer Care */}
            <div>
              <h3 className="font-sans text-body font-semibold text-gray-900 mb-4 uppercase tracking-wider">
                CUSTOMER CARE
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/contact" className="text-question text-gray-600 hover:text-primary transition-colors duration-300">
                    CONTACT US
                  </Link>
                </li>
                <li>
                  <Link to="/faqs" className="text-question text-gray-600 hover:text-primary transition-colors duration-300">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link to="/custom-orders" className="text-question text-gray-600 hover:text-primary transition-colors duration-300">
                    CUSTOM ORDERS
                  </Link>
                </li>
                <li>
                  <Link to="/sample-order" className="text-question text-gray-600 hover:text-primary transition-colors duration-300">
                    SAMPLE ORDER REQUEST
                  </Link>
                </li>
                <li>
                  <Link to="/client-services" className="text-question text-gray-600 hover:text-primary transition-colors duration-300">
                    CLIENT SERVICES
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Information */}
            <div>
              <h3 className="font-sans text-body font-semibold text-gray-900 mb-4 uppercase tracking-wider">
                INFORMATION
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-question text-gray-600 hover:text-primary transition-colors duration-300">
                    ABOUT US
                  </Link>
                </li>
                <li>
                  <Link to="/zed-certificate" className="text-question text-gray-600 hover:text-primary transition-colors duration-300">
                    ZED-CERTIFICATE
                  </Link>
                </li>
                <li>
                  <Link to="/sitemap" className="text-question text-gray-600 hover:text-primary transition-colors duration-300">
                    SITEMAP
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Policies */}
            <div>
              <h3 className="font-sans text-body font-semibold text-gray-900 mb-4 uppercase tracking-wider">
                POLICIES
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/terms" className="text-question text-gray-600 hover:text-primary transition-colors duration-300">
                    TERMS & CONDITIONS
                  </Link>
                </li>
                <li>
                  <Link to="/shipping" className="text-question text-gray-600 hover:text-primary transition-colors duration-300">
                    SHIPPING & DELIVERY
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-question text-gray-600 hover:text-primary transition-colors duration-300">
                    PRIVACY POLICY
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Resources */}
            <div>
              <h3 className="font-sans text-body font-semibold text-gray-900 mb-4 uppercase tracking-wider">
                RESOURCES
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/blog" className="text-question text-gray-600 hover:text-primary transition-colors duration-300">
                    BLOG
                  </Link>
                </li>
                <li>
                  <Link to="/stone-stories" className="text-question text-gray-600 hover:text-primary transition-colors duration-300">
                    STONE STORIES
                  </Link>
                </li>
              </ul>

              {/* Social Media */}
              <div className="mt-6">
                <h4 className="font-sans text-body font-semibold text-gray-900 mb-4 uppercase tracking-wider">
                  CONNECT US
                </h4>
                <div className="flex gap-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-primary transition-colors duration-300"
                    aria-label="Facebook"
                  >
                    <FiFacebook className="w-5 h-5" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-primary transition-colors duration-300"
                    aria-label="Instagram"
                  >
                    <FiInstagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-50 py-10 md:py-12 border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-sans text-[18px] font-semibold text-gray-900 mb-3 uppercase tracking-wider">
              NEWSLETTER
            </h3>
            <p className="text-question text-gray-600 mb-6">
              Subscribe here to receive updates, access to exclusive deals, discounts, and more.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-2xl">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-3 text-body text-gray-900 bg-white border-2 border-gray-300 focus:border-gray-900 focus:outline-none transition-colors duration-300 placeholder-gray-500"
                />
                <FiMail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5" />
              </div>
              <button
                type="submit"
                className="bg-white hover:bg-gray-900 text-gray-900 hover:text-white font-sans font-medium text-body px-8 py-3 border-2 border-gray-900 transition-all duration-300 uppercase tracking-wider"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Section - Company Info */}
      <div className="bg-primary py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Company Description */}
            <div className="text-center lg:text-left">
              <img 
                src={whiteLogo} 
                alt="Bhavan Silver Jewellery" 
                className="h-12 w-auto mx-auto lg:mx-0 mb-6"
              />
              <p className="text-white/80 text-body leading-relaxed max-w-xl mx-auto lg:mx-0 mb-4">
                A legacy of refined craftsmanship in silver jewellery. Bhavan Silver Jewellery brings exquisite designs and quality gemstone jewelry to wholesale buyers worldwide.
              </p>
              <Link
                to="/about"
                className="text-white hover:text-white/80 text-body font-medium underline transition-colors duration-300"
              >
                Know more about Bhavan Silver Jewellery
              </Link>
            </div>

            {/* Contact Information */}
            <div className="text-center lg:text-right">
              <h3 className="font-sans text-[18px] font-semibold text-white mb-4 uppercase tracking-wider">
                CONTACT
              </h3>
              <div className="text-white/90 text-body space-y-2">
                <p className="font-medium">Bhavan Silver Jewellery</p>
                <p className="text-white/80 leading-relaxed">
                  G-34-35, SEZ Phase 2, Sitapura Industrial Area, Jaipur,
                  <br />
                  Rajasthan 302022 (India)
                </p>
                <div className="pt-4 space-y-1">
                  <p>
                    Email:{' '}
                    <a
                      href="mailto:sales@bhavanjewellery.com"
                      className="text-white hover:text-white/80 underline transition-colors duration-300"
                    >
                      sales@bhavanjewellery.com
                    </a>
                  </p>
                  <p>
                    Phone:{' '}
                    <a
                      href="tel:+918107287333"
                      className="text-white hover:text-white/80 transition-colors duration-300"
                    >
                      +91 81072 87333
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-900 py-6">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <p className="text-center text-question text-gray-400">
            © {new Date().getFullYear()} Bhavan Silver Jewellery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
