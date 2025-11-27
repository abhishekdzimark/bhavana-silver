import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import purpleLogo from '../../assets/logos/purple-logo.png';
import { SearchDropdown } from '../common';
import { searchProducts } from '../../utils/productData';
import './Navbar.css';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Menu data structure for megamenu
  const menuItems = [
    { name: 'HOME', path: '/', hasSubmenu: false },
    {
      name: 'GOLD JEWELRY',
      path: '/category/gold-jewelry',
      hasSubmenu: true,
      submenu: {
        categories: [
          {
            title: 'Rings',
            items: ['Gold Rings', 'Diamond Rings', 'Engagement Rings', 'Wedding Bands']
          },
          {
            title: 'Necklaces',
            items: ['Gold Chains', 'Pendants', 'Statement Necklaces', 'Chokers']
          },
          {
            title: 'Earrings',
            items: ['Studs', 'Hoops', 'Drop Earrings', 'Chandeliers']
          },
          {
            title: 'Bracelets',
            items: ['Bangles', 'Chain Bracelets', 'Charm Bracelets', 'Cuffs']
          }
        ]
      }
    },
    {
      name: 'SILVER JEWELRY',
      path: '/category/silver-jewelry',
      hasSubmenu: true,
      submenu: {
        categories: [
          {
            title: 'Rings',
            items: ['Silver Rings', 'Sterling Silver', 'Statement Rings', 'Band Rings']
          },
          {
            title: 'Necklaces',
            items: ['Silver Chains', 'Pendants', 'Lockets', 'Layered Necklaces']
          },
          {
            title: 'Earrings',
            items: ['Silver Studs', 'Hoops', 'Danglers', 'Jhumkas']
          },
          {
            title: 'Bracelets',
            items: ['Silver Bangles', 'Chain Bracelets', 'Kada', 'Anklets']
          }
        ]
      }
    },
    {
      name: 'FASHION JEWELRY',
      path: '/category/fashion-jewelry',
      hasSubmenu: true,
      submenu: {
        categories: [
          {
            title: 'Rings',
            items: ['Statement Rings', 'Band Sets', 'Adjustable Rings', 'Midi Rings']
          },
          {
            title: 'Necklaces',
            items: ['Layered Necklaces', 'Pendants', 'Chokers', 'Long Chains']
          },
          {
            title: 'Earrings',
            items: ['Drop Earrings', 'Studs', 'Hoops', 'Tassel Earrings']
          },
          {
            title: 'Bracelets',
            items: ['Beaded Bracelets', 'Cuffs', 'Bangles', 'Charm Bracelets']
          }
        ]
      }
    },
    { name: 'SHIP NOW', path: '/ship-now', hasSubmenu: false },
    { name: 'ABOUT US', path: '/about-us', hasSubmenu: false }
  ];

  const handleMouseEnter = (menuName) => {
    setActiveMenu(menuName);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim().length > 0) {
      const results = searchProducts(query);
      setSearchResults(results);
      setShowSearchDropdown(true);
    } else {
      setSearchResults([]);
      setShowSearchDropdown(false);
    }
  };

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearchDropdown(false);
      setSearchQuery('');
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Top Bar */}
        <div className="navbar-top">
          {/* Search Bar */}
          <div className="navbar-search" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="search-input"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery && setShowSearchDropdown(true)}
              />
              <button type="submit" className="search-icon-button">
                <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8" strokeWidth="2"/>
                  <path d="m21 21-4.35-4.35" strokeWidth="2"/>
                </svg>
              </button>
              
              {/* Search Dropdown */}
              {showSearchDropdown && (
                <SearchDropdown
                  results={searchResults}
                  query={searchQuery}
                  onClose={() => {
                    setShowSearchDropdown(false);
                    setSearchQuery('');
                  }}
                />
              )}
            </form>
          </div>

          {/* Logo */}
          <div className="navbar-logo">
            <Link to="/">
              <img 
                src={purpleLogo} 
                alt="Bhavana Silver Jewellers" 
                className="logo-image"
              />
            </Link>
          </div>

          {/* Right Icons */}
          <div className="navbar-icons">
            <Link to="/account" className="nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeWidth="2"/>
                <circle cx="12" cy="7" r="4" strokeWidth="2"/>
              </svg>
            </Link>
            <Link to="/wishlist" className="nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeWidth="2"/>
              </svg>
              <span className="icon-badge">0</span>
            </Link>
            <Link to="/cart" className="nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="9" cy="21" r="1" strokeWidth="2"/>
                <circle cx="20" cy="21" r="1" strokeWidth="2"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" strokeWidth="2"/>
              </svg>
              <span className="icon-badge">0</span>
            </Link>
            <div className="currency-selector">
              <select className="currency-select">
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="INR">INR</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}></span>
        </button>

        {/* Navigation Menu */}
        <div className={`navbar-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul className="nav-links">
            {menuItems.map((item) => (
              <li
                key={item.name}
                className={`nav-item ${item.hasSubmenu ? 'has-submenu' : ''} ${activeMenu === item.name ? 'active' : ''}`}
                onMouseEnter={() => item.hasSubmenu && handleMouseEnter(item.name)}
                onMouseLeave={() => item.hasSubmenu && handleMouseLeave()}
              >
                <Link to={item.path} className="nav-link">
                  {item.name}
                </Link>

                {/* Megamenu */}
                {item.hasSubmenu && activeMenu === item.name && (
                  <div className="megamenu">
                    <div className="megamenu-content">
                      {item.submenu.categories.map((category, index) => (
                        <div key={index} className="megamenu-column">
                          <h3 className="megamenu-title">
                            <Link to={`${item.path}/${category.title.toLowerCase()}`} className="megamenu-title-link">
                              {category.title}
                            </Link>
                          </h3>
                          <ul className="megamenu-list">
                            {category.items.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <Link to={`${item.path}/${category.title.toLowerCase()}`} className="megamenu-link">
                                  {subItem}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
