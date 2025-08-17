import React from "react";
import { FaSyncAlt, FaMoneyBillWave } from "react-icons/fa";

// **FIXED**: Accept 'onTakeAction' as a prop
const Card = ({ onTakeAction }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Free Replacements Card */}
        <div className="flex-1 border-2 border-dashed border-gray-400 rounded-xl bg-[#E8F2F4] p-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <FaSyncAlt className="text-[#162950] text-4xl shrink-0" />
            <div>
              <h3 className="font-bold text-[#162950] text-lg">
                FREE LIFE-TIME REPLACEMENTS
              </h3>
              <p className="text-sm text-[#162950] mt-1">
                If <span className="font-bold">LifeVac™</span> is used in a
                choking emergency, we will send you a free replacement.
              </p>
            </div>
          </div>
        </div>

        {/* Money Back Guarantee Card */}
        <div className="flex-1 border-2 border-dashed border-gray-400 rounded-xl bg-[#E8F2F4] p-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <FaMoneyBillWave className="text-blue-900 text-4xl shrink-0" />
            <div>
              <h3 className="font-bold text-blue-900 text-lg">
                100% MONEY BACK GUARANTEE
              </h3>
              <p className="text-sm text-[#162950] mt-1">
                If you are not satisfied within 30 days, you may return your
                purchase for a full refund.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* **FIXED**: Added the CTA Button */}
      <div className="mt-8 text-center">
        <button
          onClick={onTakeAction}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold md:px-24 py-4 rounded-lg text-lg shadow-lg w-full sm:w-auto transition-transform transform active:scale-95"
        >
          TAKE ACTION TODAY
        </button>
      </div>
    </div>
  );
};

export default Card;
