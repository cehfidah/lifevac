import React from "react";
import ProductFeaturew from "../../../assest/image/ProductFeature.webp";

const features = [
  {
    id: 1,
    title: "Easy Grip Handle",
    description: "Easy Grip Handle",
  },
  {
    id: 2,
    title: "Interchangeable Mask",
    description: "Sizes for Adults and Children",
  },
  {
    id: 3,
    title: "Transparent Design",
    description: "Lets you see the removed obstruction",
  },
  {
    id: 4,
    title: "Patented One Way Valve",
    description: "Prevents air from being pushed through the mask",
  },
];

export default function ProductFeature() {
  return (
    <div className="bg-gradient-to-b from-[#e6f6fd] to-white py-10 px-4 md:px-10 lg:px-20">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
        <div className="relative w-full max-w-[300px] lg:max-w-[400px]">
          <img src={ProductFeaturew} alt="Product" className="w-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white p-4 rounded shadow text-center"
            >
              <div className="flex justify-center items-center mb-2">
                <div className="bg-blue-500 text-white w-8 h-8 text-sm font-bold rounded-full flex items-center justify-center">
                  {feature.id}
                </div>
              </div>
              <h3 className="font-bold text-lg text-[#162950]">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center mt-10">
        <button className="bg-green-600 text-white px-6 py-3 rounded font-semibold hover:bg-green-700 transition">
          TAKE ACTION TODAY
        </button>
        <p className="text-xs text-[#162950] font-bold mt-2">
          100% MONEY BACK GUARANTEE
        </p>
      </div>
    </div>
  );
}
