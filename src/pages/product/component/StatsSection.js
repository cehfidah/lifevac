import React from "react";

const StatsSection = () => {
  const stats = [
    {
      number: "12K",
      description:
        "Fourth leading cause of death in U.S. for kids, with 12,000 incidents and about 140 deaths yearly.",
    },
    {
      number: "5K",
      description:
        "5000 thousand adults die from choking annually, making it the third leading cause of accidental death.",
    },
    {
      number: "100K",
      description:
        "Choking incidents lead to an estimated 100,000 ER visits annually across all age groups.",
    },
  ];

  return (
    <>
      <div
        role="presentation"
        className="w-full text-center"
      >
        <div className="pointer-events-auto h-full flex justify-center items-center">
          <img
            className="h-[187px] tablet:h-[187px] mobile:h-[53px] w-full object-cover max-w-full"
            src="https://airwayclear.us/cdn/shop/files/gempages_531350529968702561-aff62fcc-054a-474e-91c8-94fcef05da27.webp?v=11686212432226202013"
            alt=""
          />
        </div>
      </div>
      <div className="bg-[#D9E9F0] py-12 px-4 md:px-16 ">
        <div className="max-w-6xl mx-auto">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {stats.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md">
                <div className="bg-[#162950] text-cyan-400 text-7xl font-bold text-center py-6 rounded-t-lg">
                  {item.number}
                </div>
                <div className="p-4 text-center text-gray-700 text-sm md:text-lg">
                  {item.description}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-12 text-center">
            <button className="bg-green-600 hover:bg-[#162950] text-white font-semibold px-24 py-4 rounded-lg text-sm shadow-lg w-full sm:w-auto">
              TAKE ACTION TODAY
            </button>
            <p className="text-xl font-semibold text-[#162950] mt-2">
              100% MONEY BACK GUARANTEE
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsSection;
