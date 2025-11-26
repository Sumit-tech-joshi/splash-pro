import React from 'react';
import { Link } from 'react-router-dom';

export default function StickyCta(){
  return (
    <div className="sticky-cta md:hidden bg-accent text-white">
      <div className="wrap py-3 flex items-center gap-3">
        <div className="flex-1">
          <div className="text-sm leading-tight">Free Estimate</div>
          <div className="text-xs text-white/90">Fast response • Splash Pro Cleaners</div>
        </div>
        <Link
          to="/booking"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-white text-accent font-semibold"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}