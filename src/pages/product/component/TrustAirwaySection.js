import React from "react";
import { FaUsers, FaUserMd, FaShieldAlt } from "react-icons/fa";

const TrustAirwayClear = () => {
  const cards = [
    {
      icon: <FaUsers className="text-[#00b8f1] text-3xl mb-3" />,
      title: "Proven Track Record:",
      desc: "Trusted by over 11,000 families who prioritize safety.",
    },
    {
      icon: <FaUserMd className="text-[#00b8f1] text-3xl mb-3" />,
      title: "Expert Endorsements:",
      desc: "Backed by medical professionals advocating for choking prevention.",
    },
    {
      icon: <FaShieldAlt className="text-[#00b8f1] text-3xl mb-3" />,
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
              {card.icon}
              <h3 className="font-semibold mb-1 text-lg text-center">
                {card.title}
              </h3>
              <p className="text-sm text-center">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mb-4">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold text-sm sm:text-base px-8 py-3 rounded shadow-md transition">
            TAKE ACTION TODAY
          </button>
        </div>

        {/* Subtext */}
        <p className="text-[#162950] text-sm font-bold tracking-wide">
          100% MONEY BACK GUARANTEE
        </p>
      </div>
    </section>
  );
};

export default TrustAirwayClear;
