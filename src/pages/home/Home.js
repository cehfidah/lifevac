import React from "react";
import SEO from "../../utils/SEO";
import Demo from "./component/Demo";

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
      <div className="text-2xl text-rose-300">
        Home
        <Demo />
      </div>
    </>
  );
};

export default Home;
