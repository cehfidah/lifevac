import React from "react";
import { FaUsers, FaUserMd, FaShieldAlt } from "react-icons/fa";

const TrustAirwaySection = () => {
  return (
    <section className="bg-[#e6f6fd] pt-20 pb-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-[28px] sm:text-[32px] font-extrabold text-[#0c1d3c] mb-12">
          Why you should trust Airway Clear™
        </h2>

        {/* Feature Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 px-4 sm:px-0">
          {/* Box 1 */}
          <div className="bg-white shadow-md rounded-md p-6 text-[#0c1d3c]">
            <FaUsers className="text-[#00b8f1] text-3xl mb-4 mx-auto" />
            <p className="font-bold mb-1">Proven Track Record:</p>
            <p className="text-sm">
              Trusted by over 11,000 families who prioritize safety.
            </p>
          </div>

          {/* Box 2 */}
          <div className="bg-white shadow-md rounded-md p-6 text-[#0c1d3c]">
            <FaUserMd className="text-[#00b8f1] text-3xl mb-4 mx-auto" />
            <p className="font-bold mb-1">Expert Endorsements:</p>
            <p className="text-sm">
              Backed by medical professionals advocating for choking prevention.
            </p>
          </div>

          {/* Box 3 */}
          <div className="bg-white shadow-md rounded-md p-6 text-[#0c1d3c]">
            <FaShieldAlt className="text-[#00b8f1] text-3xl mb-4 mx-auto" />
            <p className="font-bold mb-1">Reliable Innovation:</p>
            <p className="text-sm">
              Designed with the latest safety technology to provide peace of
              mind.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mb-4">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded shadow-md transition">
            TAKE ACTION TODAY
          </button>
        </div>

        {/* Guarantee Text */}
        <p className="text-[#0c1d3c] font-bold text-sm tracking-wide">
          100% MONEY BACK GUARANTEE
        </p>
      </div>
    </section>
  );
};

export default TrustAirwaySection;
