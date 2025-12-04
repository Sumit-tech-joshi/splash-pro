import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink, scroller } from "react-scroll";
import logo from "../../assets/splash-pro.webp";

const Navbar = ({ showLogo = true }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (section) => {
    if (location.pathname === "/") {
      // Already on home page, just scroll
      scroller.scrollTo(section, {
        smooth: true,
        duration: 600,
        offset: -60,
      });
    } else {
      // Navigate to home and pass the section name
      navigate("/", { state: { scrollTo: section } });
    }
  };

  return (
    <nav className="bg-white shadow-md py-3 sticky top-0 z-40">
      <div className="flex justify-between items-center mx-auto px-6 md:px-40">

        <Link to="/" className="flex items-center gap-2" >
          <img
            id="site-logo"
            src={logo}
            alt="Splash Pro Cleaners logo"
            className={`w-30 h-16 object-contain transition-opacity duration-200 ${showLogo ? "opacity-100" : "opacity-0 pointer-events-none hidden-during-loader"}`}
          />
        </Link>

        <div className="space-x-6 hidden md:flex items-center">

          <button 
            onClick={() => handleNavClick("services")}
            className="cursor-pointer hover:text-accent text-gray-700"
          >
            Services
          </button>

          <button 
            onClick={() => handleNavClick("reviews")}
            className="cursor-pointer hover:text-accent text-gray-700"
          >
            Reviews
          </button>

          <button 
            onClick={() => handleNavClick("faq")}
            className="cursor-pointer hover:text-accent text-gray-700"
          >
            FAQ
          </button>

          <Link to="/booking" className="btn-primary px-5 py-2">Book Now</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;