import React from "react";

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
      <div className="max-w-7xl mx-auto grid md:grid-cols-2  items-center">
        {/* Left: Image */}
        <div className="flex flex-col justify-center">
          <img
            src="https://cdn.shopify.com/s/files/1/0638/0378/5380/files/hottogif-ezgif.com-speed.gif?v=1710187588"
            alt="AirwayClear Device"
            className="rounded-xl shadow-md w-full max-w-md"
          />
          <div className="mt-8">
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg w-full max-w-xs">
              TAKE ACTION TODAY
            </button>
            <p className="text-start text-sm text-[#13283e] font-semibold mt-3">
              100% MONEY BACK GUARANTEE
            </p>
          </div>
        </div>

        {/* Right: Steps with timeline */}
        <div className="relative pl-8">
          {/* Vertical Line */}
          <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-[#13283e]/70"></div>

          {steps.map((step, index) => (
            <div
              className="relative flex items-start space-x-4 mb-10"
              key={index}
            >
              {/* Step circle */}
              <div className="absolute -left-1.5 w-4 h-4 rounded-full bg-[#13283e] z-10"></div>

              {/* Step content */}
              <div className="ml-4">
                <h3 className="font-bold text-xl text-[#13283e]">
                  {step.title}
                </h3>
                <p className="text-lg text-gray-700 mt-1">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AntiChokingSteps;
