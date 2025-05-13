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
    <div className="bg-[#D9E9F0] py-12 px-4 md:px-16 ">
      <div className="max-w-6xl mx-auto">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md">
              <div className="bg-[#121212] text-cyan-400 text-4xl font-bold text-center py-6 rounded-t-lg">
                {item.number}
              </div>
              <div className="p-4 text-center text-gray-700 text-sm md:text-base">
                {item.description}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md transition duration-300">
            TAKE ACTION TODAY
          </button>
        </div>

        {/* Guarantee Text */}
        <div className="text-center mt-4 font-semibold text-blue-900 text-sm md:text-base">
          100% MONEY BACK GUARANTEE
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
