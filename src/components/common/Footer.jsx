import React from 'react';

export default function Footer(){
  return (
    <footer id="contact" className="bg-gray-50 border-t mt-12">
      <div className="wrap py-8 grid md:grid-cols-3 gap-8 text-center">
        <div>
          <h4 className="text-lg font-semibold text-dark">Splash Pro Cleaners</h4>
          <p className="text-sm text-gray-600 mt-2">Friendly, reliable cleaning in Courtenay & Comox Valley.</p>
        </div>
        <div>
          <h5 className="text-sm font-semibold">Contact</h5>
          {/* TODO: Replace with confirmed business details */}
          <p className="text-sm text-gray-600 mt-2">Courtenay, BC</p>
          <a className="text-sm text-accent block" href="tel:+2506122277">(250) 612-2277</a>
          <a className="text-sm text-accent" href="mailto:SplashProCleaners@gmail.com">SplashProCleaners@gmail.com</a>
        </div>
        <div>
          <h5 className="text-sm font-semibold">Quick Links</h5>
          <ul className="mt-2 space-y-1 text-sm">
            <li><a href="#services" className="hover:text-accent">Services</a></li>
            <li><a href="#reviews" className="hover:text-accent">Reviews</a></li>
            <li><a href="#faq" className="hover:text-accent">FAQ</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t text-center text-xs text-gray-500 py-4">© {new Date().getFullYear()} Splash Pro Cleaners. All rights reserved.</div>
    </footer>
  );
}