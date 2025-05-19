import React from "react";
import video from "../../../assest/image/video.webp";

const timelineData = [
  {
    time: "4-6 MINUTES",
    title: "",
    content: [
      "The clock is ticking. Within the first 4-6 minutes, the brain is starved of oxygen.",
      "Brain cells begin to die, leading to early signs of brain damage. Every second without air increases the risk of long-term injury.",
    ],
  },
  {
    time: "6-10 MINUTES",
    title: "CRITICAL.",
    content: [
      "As the minutes pass, the situation becomes CRITICAL.",
      "By 6-10 minutes, severe brain damage is almost certain.",
      "The body is still fighting, but without oxygen, irreversible damage sets in. Time is running out.",
    ],
  },
  {
    time: "10 MINUTES+",
    title: "",
    content: [
      "Beyond 10 minutes, survival becomes UNLIKELY……",
      "Brain death is imminent.",
      "With no oxygen reaching the brain, even if resuscitation occurs, the person may not survive or could suffer permanent, life-altering damage.",
    ],
  },
];

const ChokingTimeline = () => {
  return (
    <div className="bg-blue-50 py-12 px-4 md:px-20 font-sans">
      {/* Main Headline */}
      <h2 className="text-center text-2xl md:text-3xl font-bold text-[#162950] mb-12 leading-snug">
        Over 100,000 ER visits annually are due to
        <br className="hidden md:block" />
        choking incidents across the U.S
      </h2>

      {/* Flex Layout */}
      <div className="flex flex-col md:flex-row items-start">
        {/* Left Side – Image & Text */}
        <div className="text-center md:text-left overflow-x-auto md:sticky md:top-20 md:self-start w-full md:w-1/2">
          <div className="w-full md:w-auto">
            <img
              src={video}
              alt="Choking incident animation"
              className="rounded-xl border-[3px] border-[#162950] shadow-lg w-full max-w-xs md:max-w-lg mx-auto md:mx-0"
            />
            <p className="text-xl mt-7 text-gray-700 max-w-md mx-auto md:mx-0">
              Children and adults are at high risk of choking on food, toys, and
              small objects, which can lead to irreversible damage or death
              within minutes.
            </p>
            <p className="text-lg text-red-600 italic mt-4 font-medium">
              *Average emergency response time is 8-15 minutes
            </p>
          </div>
        </div>

        {/* Right Side – Timeline */}
        <div className="relative max-h-full w-full md:w-1/2 mt-10 md:mt-0  overflow-y-auto md:overflow-visible">
          {/* Title */}
          <h3 className="text-xl md:text-2xl font-extrabold text-[#162950] mb-6">
            Here’s What Happens When
            <br className="hidden md:block" /> Choking Occurs...
          </h3>

          {/* Timeline Cards */}
          <div className="flex flex-col  md:pl-10 relative z-10">
            {timelineData.map((step, index) => (
              <div key={index} className="flex items-start relative pb-12">
                {/* Line */}
                {index !== timelineData.length - 1 && (
                  <span className="absolute -left-6 top-4 h-full w-px bg-[#001f3f] z-0" />
                )}

                {/* Dot */}
                <span className="w-4 h-4 bg-[#001f3f] rounded-full z-10 absolute -left-8 top-1.5" />

                {/* Step Content */}
                <div className="bg-[#E4EEF2] rounded-lg pl-16 pr-4 py-4 shadow-md">
                  <p className="text-xs font-bold text-white bg-[#162950] inline-block px-2 py-2 rounded mb-3">
                    {step.time}
                  </p>
                  {step.title && (
                    <p className="text-gray-800 font-semibold mb-1">
                      {step.title}
                    </p>
                  )}
                  {step.content.map((line, i) => (
                    <p
                      key={i}
                      className={`text-xl text-gray-700 ${i > 0 ? "mt-2" : ""}`}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-24 py-4 rounded-lg text-sm shadow-lg w-full sm:w-auto">
          TAKE ACTION TODAY
        </button>
        <p className="text-xl font-semibold text-[#162950] mt-2">
          100% MONEY BACK GUARANTEE
        </p>
      </div>
    </div>
  );
};

export default ChokingTimeline;
