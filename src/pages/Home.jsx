import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ServiceSection from '../components/home/ServiceSection';
import ReviewSection from '../components/home/ReviewSection';
import ResidentialShowcase from '../components/home/ResidentialShowcase';
// import FinalQuoteSection from '../components/home/FinalQuoteSection';

const Home = () => {
  return (
    <main className="space-y-12">
      <HeroSection />
      <ServiceSection />
      <ReviewSection />
      {/* <ResidentialShowcase />
      <FinalQuoteSection /> */}
    </main>
  );
};

export default Home;
