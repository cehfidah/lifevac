import React from "react";
import video from "../../../assest/image/video2.webp";

const AirwayClearHero = () => {
  return (
    <div className="bg-[#eaf6fc] py-12 px-4 md:px-16">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#0d1a4a] mb-12">
        Airway Clear™
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
        {/* Image Section */}
        <div className="max-w-md w-full">
          <img
            src={video} // Replace with your actual image path
            alt="Man using Airway Clear"
            className="rounded-xl w-full object-cover shadow-lg"
          />
        </div>

        {/* Text Section */}
        <div className="bg-white rounded-xl p-6 shadow-lg max-w-xl">
          <h3 className="text-xl md:text-2xl font-bold text-[#0d1a4a] mb-4">
            The Life-Saving Device You Can’t Afford to Be Without
          </h3>
          <p className="text-gray-700 mb-4">
            Choking poses a grave risk to people of all ages, but taking swift,
            proactive measures can mean the difference between life and death.
          </p>
          <p className="text-gray-700">
            With <strong>Airway Clear™</strong>, you hold the power to protect
            your loved ones from this silent, often fatal threat—transforming a
            potential tragedy into a life-saving moment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AirwayClearHero;
