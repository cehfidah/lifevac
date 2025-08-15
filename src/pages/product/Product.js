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
  title="LifeVac Choking Rescue Device | A Must-Have for Every Home"
  description="Discover the official LifeVac, a non-invasive choking rescue device. Protect your loved ones with this proven, life-saving solution for all ages. Shop now for peace of mind."
  keywords="LifeVac, choking rescue device, anti-choking device, buy LifeVac, life-saving device, choking help for adults, choking help for kids, home safety, emergency preparedness"
  ogTitle="LifeVac: The Official Choking Rescue Device"
  ogDescription="Equip your family with the official LifeVac kit. Our patented suction device is a vital tool in any choking emergency. Get yours today for ultimate home safety."
  twitterTitle="LifeVac: The Official Choking Rescue Device"
  twitterDescription="Don't wait for a choking emergency. The LifeVac device is a simple, effective solution to protect your family. Get your official kit now."
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
