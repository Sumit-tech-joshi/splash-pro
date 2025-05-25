import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="text-xl font-bold text-primary">CleanEase</Link>
        <div className="space-x-6 hidden md:flex">
          <Link to="/" className="text-gray-700 hover:text-accent">Home</Link>
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
