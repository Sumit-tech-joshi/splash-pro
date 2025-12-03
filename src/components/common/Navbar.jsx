import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from "react-scroll";
import logo from "../../assets/spash-pro.webp";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md py-3 sticky top-0 z-50">
      <div className="flex justify-between items-center mx-auto px-6 md:px-40">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Splash Pro Cleaners logo"
            className="w-30 h-16 object-contain"
          />
        </Link>

        <div className="space-x-6 hidden md:flex items-center">

          {/* Scroll links */}

          <ScrollLink
            to="services"
            smooth={true}
            duration={600}
            offset={-60}
            className="cursor-pointer hover:text-accent text-gray-700"
          >
            Services
          </ScrollLink>

          <ScrollLink
            to="reviews"
            smooth={true}
            duration={600}
            offset={-60}
            className="cursor-pointer hover:text-accent text-gray-700"
          >
            Reviews
          </ScrollLink>

          <ScrollLink
            to="faq"
            smooth={true}
            duration={600}
            offset={-60}
            className="cursor-pointer hover:text-accent text-gray-700"
          >
            FAQ
          </ScrollLink>

          <Link to="/booking" className="btn-primary px-5 py-2">
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;