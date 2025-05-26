import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../../assets/hero.jpg";

const HeroSection = () => {
  return (
    <section
      className="relative h-[85vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 " />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center md:justify-start">
        <div className="text-white px-4 md:pl-40 max-w-2xl space-y-5 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight primary-color">
            Discover Top-Tier Residential Cleaning Services in the Heart of
            Comox Valley
          </h1>
          <p className="text-base md:text-lg primary-color">
            Enjoy a spotless home without the hassle—our friendly, efficient
            team brings a fresh sparkle to every space.
          </p>
          <Link
            to="/booking"
            className="btn-primary inline-block mt-10 md:mt-6 !mt-32"
          >
            Book a Free Estimate
          </Link>
        </div>
      </div>

      {/* Bottom SVG Shape */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-[80px]"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
        >
          <path
            d="M0,32 C480,80 960,0 1440,48 L1440,80 L0,80 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
