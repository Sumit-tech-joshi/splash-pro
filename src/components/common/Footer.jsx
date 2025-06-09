import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center py-6 text-lg text-gray-700">
      <div>© {new Date().getFullYear()} CleanEase. All rights reserved.</div>
      <div className="mt-1">Contact: contact@cleanease.com</div>
    </footer>
  );
};

export default Footer;
