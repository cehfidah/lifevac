import React from "react";
import SEO from "../../utils/SEO";
import AirwayClearFeatures from "./component/AirwayClearFeatures";
import AirwayClearHero from "./component/AirwayClearHero";
import AntiChokingSteps from "./component/AntiChokingSteps";
import Card from "./component/Card";
import ChokingTimeline from "./component/ChokingTimeline";
import ComparisonTable from "./component/ComparisonTable";
import FacebookTestimonials from "./component/FacebookTestimonials";
import FAQSection from "./component/FAQSection";
import ImageMarquee from "./component/ImageMarquee";
import ProductFeature from "./component/ProductFeature";
import ReviewGrid from "./component/ReviewGrid";
import StatsSection from "./component/StatsSection";
import TestimonialCarousel from "./component/TestimonialCarousel";
import TrustAirwaySection from "./component/TrustAirwaySection";
import TrustedByFamilies from "./component/TrustedByFamilies";
import ProductShowcase from "./component/ProductShowcase";

const Home = () => {
  return (
    <>
      <SEO
        title="AirwayClear - Innovative Air Solutions for Your Space"
        description="Discover AirwayClear’s advanced air purification systems. Clean air technology for homes, businesses, and industries. Breathe better today."
        keywords="Air purifier, AirwayClear, clean air systems, air filtration, home air cleaner"
        ogTitle="AirwayClear - Innovative Air Solutions"
        ogDescription="Explore advanced clean air technology with AirwayClear. Healthier air for your home and workspace."
        twitterTitle="AirwayClear | airwayclear.co"
        twitterDescription="Clean air solutions for everyone. Explore AirwayClear products."
      />
      <ProductShowcase />
      <Card />
      <ChokingTimeline />
      <StatsSection />
      <AirwayClearHero />
      <AirwayClearFeatures />
      <AntiChokingSteps />
      <ProductFeature />
      <ImageMarquee />
      <TestimonialCarousel />
      <FacebookTestimonials />
      <TrustedByFamilies />
      <ComparisonTable />
      <TrustAirwaySection />
      <FAQSection />
      <ReviewGrid />
    </>
  );
};

export default Home;
