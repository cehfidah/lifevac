import React from "react";
import { FaUsers, FaUserMd, FaShieldAlt } from "react-icons/fa";

const TrustAirwayClear = () => {
  const cards = [
    {
      icon: <FaUsers className="text-[#00b8f1] text-6xl md:text-8xl md:mb-3" />,
      title: "Proven Track Record:",
      desc: "Trusted by over 11,000 families who prioritize safety.",
    },
    {
      icon: <FaUserMd className="text-[#00b8f1] text-6xl md:text-8xl md:mb-3" />,
      title: "Expert Endorsements:",
      desc: "Backed by medical professionals advocating for choking prevention.",
    },
    {
      icon: <FaShieldAlt className="text-[#00b8f1] text-6xl md:text-8xl md:mb-3" />,
      title: "Reliable Innovation:",
      desc: "Designed with the latest safety technology to provide peace of mind.",
    },
  ];

  return (
    <section className="bg-[#e6f6fd] py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#162950] mb-12">
          Why you should trust Airway Clear™
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-[#162950]"
            >
              <div className="flex justify-center items-center gap-4">
                <p className="hidden md:inline">{card.icon}</p>
                <h3 className="font-semibold mb-1 text-xl md:text-2xl text-start">
                  {card.title}
                </h3>
              </div>
              <div className="flex items-center justify-between gap-4">
                <p className="block md:hidden">{card.icon}</p>
                <p className="text-base md:text-xl text-start">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold md:px-24 py-4 rounded-lg text-sm shadow-lg w-full sm:w-auto">
            TAKE ACTION TODAY
          </button>
          <p className="text-xl font-semibold text-[#162950] mt-2">
            100% MONEY BACK GUARANTEE
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustAirwayClear;
