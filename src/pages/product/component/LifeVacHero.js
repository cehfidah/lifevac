import React from "react";
const video ="https://ik.imagekit.io/g2qcghvoj/video2.webp";
const LifeVacHero = () => {
  return (
    <div className="bg-[#eaf6fc] py-12 px-4 md:px-16">
      <h2 className="text-3xl md:text-5xl font-extrabold text-center text-[#0d1a4a] mb-12">
        LifeVac™
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
        {/* Image Section */}
        <div className="max-w-md w-full">
          <img
            src={video} // Replace with your actual image path
            alt="Man using LifeVac"
            className="rounded-xl w-full object-cover shadow-lg border border-[#162950]"
          />
        </div>

        {/* Text Section */}
        <div className="md:bg-white md:rounded-xl md:p-6 md:shadow-lg max-w-xl">
          <h3 className="text-xl md:text-3xl font-bold text-[#162950] mb-4">
            The Life-Saving Device You Can’t Afford to Be Without
          </h3>
          <p className="text-gray-700 mb-4 text-lg md:text-xl">
            Choking poses a grave risk to people of all ages, but taking swift,
            proactive measures can mean the difference between life and death.
          </p>
          <p className="text-gray-700 text-lg md:text-xl">
            With <strong>LifeVac™</strong>, you hold the power to protect
            your loved ones from this silent, often fatal threat—transforming a
            potential tragedy into a life-saving moment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LifeVacHero;
