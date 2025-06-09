import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/spash-pro__logo.png";
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  console.log(location.pathname, {}); 
  return (
    <nav className="bg-white shadow-md py-4 sticky top-0 z-50">
      <div className="flex justify-between items-center mx-auto">
        <Link to="/" className="text-xl font-bold text-primary md:pl-40">
          <img class="w-16 h-16 " src={logo}></img>
        </Link>
        <div className="space-x-6 hidden md:flex  md:pr-40">
          {location?.pathname === "/request" &&
          <Link to="/" className="text-gray-700 hover:text-accent">Home</Link>

          }
          {/* Future routes */}
          {/* <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/booking">Book Now</Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
