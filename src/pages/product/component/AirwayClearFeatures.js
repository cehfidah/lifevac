import React from "react";
import { FaExclamationTriangle, FaClock, FaShieldAlt } from "react-icons/fa";

const AirwayClearFeatures = () => {
  return (
    <div className="bg-[#eaf6fc] py-16 px-4 md:px-8 text-center">
      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
        {/* Card 1 */}
        <div className="border border-dashed border-gray-300 rounded-lg p-6">
          <div className="text-cyan-500 text-4xl mb-4 mx-auto flex justify-center items-center">
            <FaExclamationTriangle />
          </div>
          <h3 className="text-lg font-semibold text-[#0d1a4a] mb-2">
            Take Control of Safety
          </h3>
          <p className="text-gray-700">
            Airway Clear™ allows you to swiftly remove choking hazards, making
            your home safer for everyone.
          </p>
        </div>

        {/* Card 2 - Highlighted */}
        <div className="bg-gradient-to-b from-cyan-400 to-cyan-500 text-white rounded-lg p-6 shadow-md">
          <div className="text-4xl mb-4 mx-auto flex justify-center items-center">
            <FaClock />
          </div>
          <h3 className="text-lg font-semibold mb-2">Immediate Response</h3>
          <p>
            This device enables quick action in choking situations, ensuring you
            can act confidently when it matters most.
          </p>
        </div>

        {/* Card 3 */}
        <div className="border border-dashed border-gray-300 rounded-lg p-6">
          <div className="text-cyan-500 text-4xl mb-4 mx-auto flex justify-center items-center">
            <FaShieldAlt />
          </div>
          <h3 className="text-lg font-semibold text-[#0d1a4a] mb-2">
            Feel Secure
          </h3>
          <p className="text-gray-700">
            With Airway Clear™, you’ll enjoy peace of mind, knowing you’re ready
            to handle emergencies effectively.
          </p>
        </div>
      </div>

      {/* Call to Action Button */}
      <div className="mb-4">
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300">
          TAKE ACTION TODAY
        </button>
      </div>

      {/* Guarantee Text */}
      <p className="font-bold text-[#0d1a4a]">100% MONEY BACK GUARANTEE</p>
    </div>
  );
};

export default AirwayClearFeatures;
