import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../../assets/hero.jpg';

const HeroSection = () => {
  return (
    <section
      className="relative h-[85vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 bg-black/50 flex items-center">
        <div className="text-white px-4 md:px-10 max-w-2xl space-y-5">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Experience Comox Valley’s Finest Residential Cleaning Services
          </h1>
          <p className="text-base md:text-lg">
            Clean homes. Peaceful lives. Book your free estimate today!
          </p>
          <Link to="/booking" className="bg-accent px-5 py-2 text-white rounded-md hover:bg-blue-800 transition">
            Book a Free Estimate
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
