import React from 'react';
import { Link } from 'react-router-dom';
import hero from '../../assets/hero.jpg';

export default function HeroSection() {
  return (
    <section
      className="relative h-[84vh] min-h-[560px] bg-center bg-cover"
      style={{ backgroundImage: `url(${hero})` }}
      aria-label="Splash Pro Cleaners – Courtenay & Comox Valley"
      id="hero" 
    >
      {/* Gradient overlay: darker on the left for copy, fades to show the image */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/15" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center md:justify-start">
        <div className="px-5 md:px-40  max-w-3xl text-center md:text-left">
          <h1 className="text-white text-shadow-lg text-4xl md:text-5xl font-extrabold leading-tight">
            Discover Top‑Tier Residential Cleaning Services in the Comox Valley
          </h1>

          <p className="mt-4 text-white/90 text-base md:text-lg leading-relaxed max-w-2xl mx-auto md:mx-0">
            Enjoy a spotless home without the hassle — our friendly, efficient team brings a fresh sparkle to every space.
          </p>

          {/* CTA Row */}
          <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
            <Link
              to="/booking"
              className="btn-primary px-6 py-3 rounded-md text-white font-semibold shadow-md shadow-black/10"
            >
              Book a Free Estimate
            </Link>

            <a
              href="tel:+2506122277"
              className="btn-ghost px-6 py-3 rounded-md font-semibold"
              aria-label="Call Splash Pro Cleaners at (250) 612-2277"
            >
              Call (250) 612-2277
            </a>
          </div>

          {/* Trust chips – small, helpful, and subtle */}
          <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start">
            <span className="chip">Bonded &amp; Insured</span>
            <span className="chip">Eco‑friendly Options</span>
            <span className="chip">5★ Local Reviews</span>
          </div>
        </div>
      </div>

      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-[72px]"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
        >
          <path d="M0,32 C480,80 960,0 1440,48 L1440,80 L0,80 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* Accessibility: skip link target (optional) */}
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-accent px-3 py-2 rounded">
        Skip to content
      </a>
    </section>
  );
}