import React from "react";
import medic from "./../assest/image/Airwayclear.svg";
import one from "./../assest/image/payment1.svg";
import tow from "./../assest/image/payment2.svg";
import third from "./../assest/image/payment3.svg";
import four from "./../assest/image/payment4.svg";
import five from "./../assest/image/payment5.svg";

const EmergencyGuide = () => {
  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left - Image & Box */}
        <div className="flex flex-col items-center lg:items-start">
          <div className="">
            <div className="flex justify-center mb-4">
              <img
                src={medic} // Replace with correct image if hosted locally
                alt="Home Medic Icon"
                className=""
              />
            </div>
          </div>
        </div>

        {/* Right - Info */}
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#162950] mb-4 tracking-wide">
            Guide For Household Emergencies
          </h2>
          <div className="flex items-center mb-4 space-x-3">
            <span className="text-2xl font-semibold text-[#162950]">
              Rs. 1,200.00
            </span>
            <span className="line-through text-[#162950]">Rs. 4,400.00</span>
            <span className="bg-[#162950] text-white text-sm font-medium px-2 py-1 rounded">
              SAVE 72%
            </span>
          </div>
          <button className="bg-[#162950] hover:bg-blue-900 text-white px-6 py-3 rounded font-semibold w-full  mb-6">
            ADD TO CART
          </button>

          {/* Payment Icons */}
          <div className="flex items-center gap-2 flex-wrap mb-6">
            <img src={one} alt="Amazon" className="h-6" />
            <img src={tow} alt="Visa" className="h-6" />
            <img src={third} alt="Mastercard" className="h-6" />
            <img src={four} alt="Discover" className="h-6" />
            <img src={five} alt="GPay" className="h-6" />
            {/* Add more as needed */}
          </div>

          {/* Description */}
          <div className="text-[#162950] text-base space-y-3 max-w-2xl">
            <p>
              Introduction: As a paramedic, I've seen many situations where
              people were unsure if they needed to go to the hospital. Some
              going for minor issues, while others stay home when they really
              need help.
            </p>
            <p>
              I believe everyone should have the basic knowledge to keep
              themselves and their loved ones safe in an emergency. This guide
              is designed to help you recognize symptoms, understand what
              actions to take, and know when it's time to seek professional
              care. I hope that Home Medic can be a helpful tool in those
              critical moments.
            </p>
            <p>
              I encourage you to read through this guide now, before an
              emergency. By familiarizing yourself with the information here,
              you'll be more prepared and able to think clearly when you need it
              most.
            </p>
            <p>
              This guide is not a substitute for professional medical care, but
              a resource to help you navigate emergencies until help arrives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyGuide;
