import React from "react";
const ProductFeaturew = "https://ik.imagekit.io/g2qcghvoj/ProductFeature.webp";
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-20 max-w-xl">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white p-4 rounded shadow text-center relative"
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-14 md:w-16 h-14 md:h-16 rounded-full text-white flex items-center justify-center text-2xl font-bold shadow-md"
                  style={{ backgroundImage: 'linear-gradient(270deg, #3CBBF2 0%, #4DC5F6 47%, #64D3FC 100%)' }}
                >
                  {feature.id}
                </div>
              </div>
              <div className="mt-10">
                <h3 className="font-bold text-2xl text-[#162950]">
                  {feature.title}
                </h3>
                <p className="text-base text-[#162950] mt-1 font-normal">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold md:px-24 py-4 rounded-lg text-sm shadow-lg w-full sm:w-auto">
          TAKE ACTION TODAY
        </button>
        <p className="text-xl font-semibold text-[#162950] mt-2">
          100% MONEY BACK GUARANTEE
        </p>
      </div>
    </div>
  );
}
