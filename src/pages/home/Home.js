import React from "react";
import SEO from "../../utils/SEO";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import collections_img from "../../assest/lifevac.png";

const Home = () => {
  const navigate = useNavigate();

  const handleTakeAction = () => {
    navigate("/product/lifevac");
  };
  return (
    <>
 <SEO
 title="Lifevac Device | Official Choking Rescue Device"
 description="Shop the official LifeVac choking rescue device. Trusted by thousands for use on adults, children, and toddlers. Get your genuine, life-saving device today."
keywords="LifeVac, choking rescue device, lifevac home, anti-choking device, choke device, device for choking babies, child life vac, choking machine, life saving device"
ogTitle="Lifevac Device - The Official Choking Rescue Kit"
ogDescription="Secure a genuine LifeVac device for your family. We offer kits for all ages, backed by our promise of authenticity and fast shipping."
twitterTitle="LifeVac Choking Rescue Devices"
 twitterDescription="Shop official LifeVac kits for all ages. Protect your family from a choking emergency."
 />

      <Container>
        <div className="bg-white flex flex-col items-center paddingX py-4 md:py-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#162950]">
            Products
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-5xl w-full">
            {/* Left Image Side */}
            <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center">
              <img
                src={collections_img}
alt="LifeVac Choking Rescue Kit"
                className="w-full max-w-md object-contain"
              />
            </div>

            {/* Right Text Side */}
            <div className="text-center md:text-left w-full md:w-1/2 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#162950]">
                LifeVac™
              </h2>
              <p className="text-gray-700">
                Life and death is a matter of seconds in an emergency. Are you
                prepared?
              </p>
              <button
                onClick={handleTakeAction}
                className="bg-[#162950] text-white px-6 py-2 rounded-md font-semibold  transition"
              >
                Take action
              </button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
