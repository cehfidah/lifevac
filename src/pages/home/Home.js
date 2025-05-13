import React from "react";
import SEO from "../../utils/SEO";
import Card from "./component/Card";
import ChokingTimeline from "./component/ChokingTimeline";
import Demo from "./component/Demo";
import StatsSection from "./component/StatsSection";

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
      <Demo />
      <Card />
      <ChokingTimeline />
      <StatsSection />
    </>
  );
};

export default Home;
