import React from "react";
import video from "../../../assest/image/video3.webp";

const AntiChokingSteps = () => {
  const steps = [
    {
      title: "Step 1: Familiarize Yourself",
      description:
        "Read the user manual to familiarize yourself with the device and practice its operation. Being prepared can make all the difference in an emergency.",
    },
    {
      title: "Step 2: Assess The Situation",
      description:
        "Assess the situation carefully: If the person can't speak, cough, or breathe, points to their throat, or makes unusual sounds, they require immediate assistance.",
    },
    {
      title: "Step 3: Position And Activate",
      description:
        "Place AirwayClear™ over the mouth and nose and press down to create a seal. Pull the handle firmly to deliver a thrust. Repeat if necessary until the obstruction is cleared.",
    },
  ];

  return (
    <div className="bg-[#f0fbff] py-12 px-4 sm:px-8 lg:px-32">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#162950] mb-12">
        How to use Airway Clear™
      </h2>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-start gap-10">
        {/* Left: Image and CTA */}
        <div className="flex flex-col justify-center items-center md:items-start">
          <img
            src={video}
            alt="AirwayClear Device"
            className="rounded-xl shadow-md w-full max-w-md"
          />
          <div className="mt-8 w-full flex flex-col items-center md:items-start">
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg w-full max-w-xs">
              TAKE ACTION TODAY
            </button>
            <p className="text-start text-sm text-[#162950] font-semibold mt-3">
              100% MONEY BACK GUARANTEE
            </p>
          </div>
        </div>

        {/* Right: Steps Timeline */}
        <div className="bg-[#f2fbff] py-12 px-4">
          <div className="mx-auto flex flex-col relative">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start relative pb-12">
                {/* Line */}
                {index !== steps.length - 1 && (
                  <span className="absolute left-4 top-4 h-full w-px bg-[#162950] z-0" />
                )}

                {/* Dot */}
                <span className="w-4 h-4 bg-[#162950] rounded-full z-10 absolute left-2 top-1.5" />

                {/* Step Content */}
                <div className="pl-10">
                  <h3 className="font-bold text-[#162950] text-lg mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AntiChokingSteps;
