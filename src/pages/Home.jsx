import React from "react";
import Seo from "../components/common/Seo";
import StickyCta from "../components/common/StickyCta";

import HeroSection from "../components/home/HeroSection";
import ServicesShowcase from "../components/home/ServicesShowcase";
import ReviewsTrust from "../components/home/ReviewsTrust";
import ServiceAreas from "../components/home/ServiceAreas";
import BenefitSection from "../components/home/BenefitSection";
import Faq from "../components/home/Faq";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { scroller } from "react-scroll";
export default function Home() {

    const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      scroller.scrollTo(location.state.scrollTo, {
        smooth: true,
        duration: 600,
        offset: -60,
      });
    }
  }, [location]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Splash Pro Cleaners",
    image: "https://www.yoursite.com/logo.png",
    telephone: "+1-(250)612-2277",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Courtenay",
      addressRegion: "BC",
      addressCountry: "CA",
    },
    areaServed: ["Courtenay", "Comox", "Cumberland", "Royston", "Union Bay"],
    url: "https://www.yoursite.com",
    priceRange: "$$",
  };

  return (
    <>
      <Seo
        title="Splash Pro Cleaners – Trusted Cleaning in Courtenay & Comox Valley"
        description="Residential, commercial, and post‑construction cleaning by Splash Pro Cleaners. Friendly crews, fair pricing, and great local reviews."
        jsonLd={jsonLd}
      />
      <HeroSection />
      <BenefitSection />

      <ServicesShowcase />
      <ReviewsTrust />
      <ServiceAreas />
      <Faq />

      <StickyCta />
    </>
  );
}
