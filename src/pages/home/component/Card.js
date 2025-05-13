import React from "react";
import { FaSyncAlt, FaMoneyBillWave } from "react-icons/fa";

function Card() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Free Replacements Card */}
        <div className="flex-1 border-2 border-dotted border-gray-400 rounded-xl bg-blue-50 p-6">
          <div className="flex items-start gap-4">
            <FaSyncAlt className="text-blue-900 text-3xl mt-1 shrink-0" />
            <div>
              <h3 className="font-bold text-blue-900 text-lg md:text-xl">
                FREE LIFE-TIME REPLACEMENTS
              </h3>
              <p className="text-sm md:text-base text-blue-900 mt-2">
                If <span className="font-bold">AirwayClear™</span> is used in a
                choking emergency, we will send you free replacement. Our
                mission is to equip your home for life.
              </p>
            </div>
          </div>
        </div>

        {/* Money Back Guarantee Card */}
        <div className="flex-1 border-2 border-dotted border-gray-400 rounded-xl bg-blue-50 p-6">
          <div className="flex items-start gap-4">
            <FaMoneyBillWave className="text-blue-900 text-3xl mt-1 shrink-0" />
            <div>
              <h3 className="font-bold text-blue-900 text-lg md:text-xl">
                100% MONEY BACK GUARANTEE
              </h3>
              <p className="text-sm md:text-base text-blue-900 mt-2">
                If within 30 days of receiving your package, you are not
                satisfied with your purchase, you may return it for a full
                refund.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
