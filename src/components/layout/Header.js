import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import Container from '../Container';

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const menuRef = useRef(null);
  const cartCount = 4;

  const navLinks = [
    { name: 'Shipping Policy', path: '/shipping-policy' },
    { name: 'Refund Policy', path: '/refund-policy' },
    { name: 'Terms Of Service', path: '/terms-of-service' },
    { name: 'Contact', path: '/contact' },
  ];

  // Scroll logic for sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show sticky only if scrolled more than 200px and scrolling up
      if (currentScrollY > 200 && currentScrollY < lastScrollY) {
        setShowStickyHeader(true);
      }
      // Hide sticky header below 50px or scrolling down
      else if (currentScrollY < 50 || currentScrollY > lastScrollY) {
        setShowStickyHeader(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close menu on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (mobileMenuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [mobileMenuOpen]);

  // Lock body scroll when menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [mobileMenuOpen]);

  return (
    <header className={`bg-white border-b border-gray-200  z-50 font-harmonia transition-all duration-300 ${showStickyHeader ? 'fixed top-0 w-full shadow-md' : 'shadow-sm'}`}>
      <Container>
        <div className={`paddingX ${showStickyHeader ? 'py-5' : 'py-3'} flex items-center justify-between`}>
          {/* Icons & Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-2xl text-gray-700 lg:hidden focus:outline-none"
          >
            <FaBars />
          </button>

          {/* Desktop Nav */}
          <div className='flex items-center gap-10'>
            <nav className="hidden lg:flex gap-6 text-base font-medium text-[#121212]">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-1 rounded-md ${currentPath === link.path
                    ? 'bg-[#0e2243] text-white font-bold'
                    : 'hover:text-blue-600'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Logo */}
            <Link to="/" className="text-xl font-bold text-black text-center flex items-center gap-1">
              AirwayClear
              <div className="h-5 w-1.5 bg-gray-800"></div>
              <div className="h-5 w-1.5 bg-gray-800"></div>
              <div className="h-5 w-1.5 bg-gray-800"></div>
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <FaUser className="text-xl text-gray-700 cursor-pointer" />
            <div className="relative cursor-pointer">
              <FaShoppingCart className="text-xl text-gray-700" />
              <span className="absolute -top-2 -right-2 bg-blue-800 text-white text-xs px-1.5 rounded-full">
                {cartCount}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 z-40"></div>
        )}

        {/* Mobile Menu Drawer */}
        <div
          ref={menuRef}
          className={`fixed top-0 left-0 h-screen bg-white w-4/5 max-w-sm z-50 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            } transition-transform duration-300 ease-in-out shadow-lg`}
        >
          <div className="flex justify-between items-center paddingX py-4 border-b">
            <h2 className="text-lg font-bold">Menu</h2>
            <button onClick={() => setMobileMenuOpen(false)} className="text-2xl text-gray-700">
              <FaTimes />
            </button>
          </div>
          <nav className="flex flex-col gap-4 py-6 text-base font-medium text-[#121212]">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`py-2 px-6 ${currentPath === link.path
                  ? 'bg-[#12121266] text-[#121212] font-bold'
                  : 'hover:text-blue-600'
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/login"
              className={`flex items-center gap-4 font-bold py-2 px-6 ${currentPath === "/login"
                ? 'bg-[#12121212] text-[#121212]'
                : 'hover:text-blue-600'
                }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaUser className="text-xl text-gray-700 cursor-pointer" />
              Log In
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;
